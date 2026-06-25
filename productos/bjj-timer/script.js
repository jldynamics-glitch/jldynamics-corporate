// CONTROLADORES DE ELEMENTOS DOM
const btnTimerMain = document.getElementById("btn-timer-main");
const btnTimerSub = document.getElementById("btn-timer-sub");
const displayLucha = document.getElementById("display-lucha");
const displayDescanso = document.getElementById("display-descanso");
const displayRounds = document.getElementById("display-rounds");
const statusBadge = document.getElementById("timer-status-badge");

const inputLucha = document.getElementById("input-tiempo-lucha");
const inputDescanso = document.getElementById("input-tiempo-descanso");
const inputRounds = document.getElementById("input-total-rounds");

const cardLuchaEnv = document.getElementById("card-lucha-env");
const cardDescansoEnv = document.getElementById("card-descanso-env");

// ELEMENTOS DE PANTALLA SECUNDARIA
const screenTimer = document.getElementById("screen-timer-view");
const screenGladiadores = document.getElementById("screen-gladiadores-view");
const btnGladiadorBack = document.getElementById("btn-gladiador-back");
const feedbackBox = document.getElementById("gladiador-feedback-box");

// ESTADOS DEL CRONÓMETRO
let temporizadorInterno = null;
let estaCorriendo = false;
let estadoActual = "IDLE"; // IDLE, LUCHA, DESCANSO
let roundActual = 1;
let tiempoRestante = 0;
let clicsGladiadores = 0;

// MOTOR DE AUDIO INTEGRADO CON WEB AUDIO API (PITIDOS DE BAJO NIVEL DE LA CPU)
const ctxAudio = new (window.AudioContext || window.webkitAudioContext)();

function emitirPitido(frecuencia, duracion) {
    if (ctxAudio.state === 'suspended') {
        ctxAudio.resume();
    }
    const oscilador = ctxAudio.createOscillator();
    const ganancia = ctxAudio.createGain();
    
    oscilador.type = 'sine';
    oscilador.frequency.setValueAtTime(frecuencia, ctxAudio.currentTime);
    ganancia.gain.setValueAtTime(0.15, ctxAudio.currentTime);
    
    oscilador.connect(ganancia);
    ganancia.connect(ctxAudio.destination);
    
    oscilador.start();
    oscilador.stop(ctxAudio.currentTime + duracion);
}

function sonarAlarmaCambio() {
    emitirPitido(880, 0.2);
    setTimeout(() => emitirPitido(880, 0.2), 250);
    setTimeout(() => emitirPitido(1200, 0.5), 500);
}

function formatearMinutosSegundos(segundosTotales) {
    const min = Math.floor(segundosTotales / 60);
    const seg = segundosTotales % 60;
    return `${min.toString().padStart(2, '0')}:${seg.toString().padStart(2, '0')}`;
}

function actualizarCamposDeTexto() {
    if (estadoActual === "LUCHA") {
        displayLucha.textContent = formatearMinutosSegundos(tiempoRestante);
    } else if (estadoActual === "DESCANSO") {
        displayDescanso.textContent = formatearMinutosSegundos(tiempoRestante);
    } else {
        displayLucha.textContent = formatearMinutosSegundos(parseInt(inputLucha.value) * 60);
        displayDescanso.textContent = formatearMinutosSegundos(parseInt(inputDescanso.value) * 60);
        displayRounds.textContent = `Lucha 1 / ${inputRounds.value}`;
    }
}

function ejecutarCicloCronometro() {
    if (tiempoRestante > 0) {
        tiempoRestante--;
        actualizarCamposDeTexto();
        if (tiempoRestante <= 3 && tiempoRestante > 0) {
            emitirPitido(440, 0.1); // Pitidos de advertencia de últimos 3 segundos
        }
    } else {
        // Transiciones de Fase
        if (estadoActual === "LUCHA") {
            const maxRounds = parseInt(inputRounds.value);
            if (roundActual < maxRounds) {
                estadoActual = "DESCANSO";
                tiempoRestante = parseInt(inputDescanso.value) * 60;
                statusBadge.textContent = "⌛ ¡Descanso!";
                statusBadge.style.color = "#A855F7";
                cardLuchaEnv.style.background = "transparent";
                cardDescansoEnv.style.background = "rgba(168, 85, 247, 0.15)";
                sonarAlarmaCambio();
            } else {
                detenerYReiniciarCronometro();
                statusBadge.textContent = "🏆 Entrenamiento Completo";
                statusBadge.style.color = "#4ADE80";
                sonarAlarmaCambio();
                return;
            }
        } else if (estadoActual === "DESCANSO") {
            roundActual++;
            estadoActual = "LUCHA";
            tiempoRestante = parseInt(inputLucha.value) * 60;
            statusBadge.textContent = "⚔️ ¡A la Lucha!";
            statusBadge.style.color = "var(--primary)";
            cardDescansoEnv.style.background = "transparent";
            cardLuchaEnv.style.background = "rgba(0, 229, 255, 0.15)";
            displayRounds.textContent = `Lucha ${roundActual} / ${inputRounds.value}`;
            sonarAlarmaCambio();
        }
        actualizarCamposDeTexto();
    }
}

function comenzarCronometro() {
    estaCorriendo = true;
    btnTimerMain.textContent = "⏸ Pausar";
    btnTimerMain.style.background = "linear-gradient(135deg, #EF4444, #B91C1C)";
    
    if (estadoActual === "IDLE") {
        estadoActual = "LUCHA";
        roundActual = 1;
        tiempoRestante = parseInt(inputLucha.value) * 60;
        statusBadge.textContent = "⚔️ ¡A la Lucha!";
        cardLuchaEnv.style.background = "rgba(0, 229, 255, 0.15)";
        displayRounds.textContent = `Lucha ${roundActual} / ${inputRounds.value}`;
        emitirPitido(660, 0.3);
    }
    
    temporizadorInterno = setInterval(ejecutarCicloCronometro, 1000);
}

function pausarCronometro() {
    estaCorriendo = false;
    btnTimerMain.textContent = "▶ Reanudar";
    btnTimerMain.style.background = "linear-gradient(135deg, var(--secondary), #5000CC)";
    statusBadge.textContent = "⏸ Pausado";
    clearInterval(temporizadorInterno);
}

function detenerYReiniciarCronometro() {
    estaCorriendo = false;
    clearInterval(temporizadorInterno);
    estadoActual = "IDLE";
    roundActual = 1;
    btnTimerMain.textContent = "▶ Comenzar";
    btnTimerMain.style.background = "linear-gradient(135deg, var(--secondary), #5000CC)";
    statusBadge.textContent = "🛡️ Listo para rolar";
    statusBadge.style.color = "var(--primary)";
    cardLuchaEnv.style.background = "transparent";
    cardDescansoEnv.style.background = "transparent";
    actualizarCamposDeTexto();
}

// ASIGNACIÓN DE ESCUCHAS DE EVENTOS PARA EL TIMER
if (btnTimerMain) {
    btnTimerMain.addEventListener("click", () => {
        if (estaCorriendo) {
            pausarCronometro();
        } else {
            comenzarCronometro();
        }
    });
}

[inputLucha, inputDescanso, inputRounds].forEach(input => {
    if (input) {
        input.addEventListener("input", () => {
            if (estadoActual === "IDLE") actualizarCamposDeTexto();
        });
    }
});

// CONTROL DE NAVEGACIÓN DE PANTALLAS (SMARTPHONE INTEGRADO)
if (btnTimerSub && screenTimer && screenGladiadores) {
    btnTimerSub.addEventListener("click", () => {
        clicsGladiadores++;
        emitirPitido(500, 0.05);
        
        // Simulación de Easter Egg original o entrada normal
        if (clicsGladiadores < 7) {
            screenTimer.style.display = "none";
            screenGladiadores.style.display = "flex";
        } else {
            statusBadge.textContent = "🔓 MODO ADMIN DESBLOQUEADO";
            clicsGladiadores = 0;
            alert("Acceso avanzado de desarrollo concedido a la consola de JLDynamics.");
        }
    });
}

if (btnGladiadorBack && screenTimer && screenGladiadores) {
    btnGladiadorBack.addEventListener("click", () => {
        emitirPitido(400, 0.05);
        screenGladiadores.style.display = "none";
        screenTimer.style.display = "flex";
        if (feedbackBox) {
            feedbackBox.textContent = "Selecciona un módulo para conocer su función técnica.";
        }
    });
}

// DICCIONARIO DE DESCRIPCIONES DE LA INTERFAZ GLADIADORES (1001102699.jpg)
const descripcionesModulos = {
    "RETAR": "🔒 Genera llaves de emparejamiento criptográficas y códigos QR únicos para lanzar desafíos directos en el tatami de entrenamiento.",
    "ACEPTAR RETO": "🔒 Abre la cámara del dispositivo para escanear el código de tu oponente y sincronizar el registro automático de la lucha.",
    "RANKING": "🔒 Clasificación profesional en tiempo real segmentada por tu cinturón, ELO y ratio de sumisiones globales.",
    "LOGROS": "🔒 Vitrina digital donde se desbloquean medallas e insignias exclusivas al cumplir hitos de finalizaciones (ej. Mata León).",
    "HISTORIAL": "🔒 Bitácora detallada de auditoría con la fecha, oponentes y resultados de todos tus asaltos históricos."
};

// CAPTURA DE INTERACCIÓN EN LA LISTA GLADIADORES
document.querySelectorAll(".menu-item-lock").forEach(item => {
    item.style.cursor = "pointer";
    item.addEventListener("click", () => {
        emitirPitido(700, 0.04);
        
        const tituloModulo = item.querySelector("h4").textContent.trim();
        if (feedbackBox && descripcionesModulos[tituloModulo]) {
            feedbackBox.textContent = descripcionesModulos[tituloModulo];
        }
    });
});

// INICIALIZACIÓN
actualizarCamposDeTexto();
