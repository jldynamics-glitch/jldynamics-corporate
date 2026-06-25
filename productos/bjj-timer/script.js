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

// ENTORNO DEL SMARTPHONE Y CONTENEDORES DE INTERACCIONES
const phoneWrapperCard = document.getElementById("smartphone-wrapper-card");
const appScrollContainer = document.getElementById("app-scroll-container");
const sectionTimerView = document.getElementById("section-timer-view");
const sectionGladiadoresView = document.getElementById("section-gladiadores-view");
const feedbackBox = document.getElementById("gladiador-feedback-box");

// ESTADOS OPERATIVOS
let temporizadorInterno = null;
let estaCorriendo = false;
let estadoActual = "IDLE"; 
let roundActual = 1;
let tiempoRestante = 0;
let clicsGladiadores = 0;

// MOTOR DE AUDIO Y SISTEMA HÁPTICO / VIBRACIÓN INTEGRADO
const ctxAudio = new (window.AudioContext || window.webkitAudioContext)();

function dispararZumbidoYVibracion(duracionMs = 80) {
    // 1. Vibración Física nativa si está soportada en el smartphone
    if ("vibrate" in navigator) {
        navigator.vibrate(duracionMs);
    }
    // 2. Vibración Visual en la web (Efecto de zumbido electrónico para quitar lo rústico)
    if (phoneWrapperCard) {
        phoneWrapperCard.classList.remove("vibrar-interfaz");
        void phoneWrapperCard.offsetWidth; // Forzar reflow para reiniciar la animación
        phoneWrapperCard.classList.add("vibrar-interfaz");
    }
}

function emitirPitido(frecuencia, duracion) {
    try {
        if (ctxAudio.state === 'suspended') {
            ctxAudio.resume();
        }
        const oscilador = ctxAudio.createOscillator();
        const ganancia = ctxAudio.createGain();
        
        oscilador.type = 'sine';
        oscilador.frequency.setValueAtTime(frecuencia, ctxAudio.currentTime);
        ganancia.gain.setValueAtTime(0.12, ctxAudio.currentTime);
        
        oscilador.connect(ganancia);
        ganancia.connect(ctxAudio.destination);
        
        oscilador.start();
        oscilador.stop(ctxAudio.currentTime + duracion);
    } catch (e) {
        console.log("AudioContext esperando interacción inicial.");
    }
}

function sonarAlarmaCambio() {
    emitirPitido(880, 0.15);
    setTimeout(() => emitirPitido(880, 0.15), 200);
    setTimeout(() => emitirPitido(1100, 0.4), 400);
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
            emitirPitido(440, 0.08);
            dispararZumbidoYVibracion(40);
        }
    } else {
        if (estadoActual === "LUCHA") {
            const maxRounds = parseInt(inputRounds.value);
            if (roundActual < maxRounds) {
                estadoActual = "DESCANSO";
                tiempoRestante = parseInt(inputDescanso.value) * 60;
                statusBadge.textContent = "⌛ ¡Descanso!";
                statusBadge.style.color = "#A855F7";
                statusBadge.style.borderColor = "rgba(168, 85, 247, 0.3)";
                cardLuchaEnv.style.background = "transparent";
                cardDescansoEnv.style.background = "rgba(168, 85, 247, 0.1)";
                sonarAlarmaCambio();
                dispararZumbidoYVibracion(250);
            } else {
                detenerYReiniciarCronometro();
                statusBadge.textContent = "🏆 Entrenamiento Completo";
                statusBadge.style.color = "#4ADE80";
                statusBadge.style.borderColor = "rgba(74, 222, 128, 0.3)";
                sonarAlarmaCambio();
                dispararZumbidoYVibracion(400);
                return;
            }
        } else if (estadoActual === "DESCANSO") {
            roundActual++;
            estadoActual = "LUCHA";
            tiempoRestante = parseInt(inputLucha.value) * 60;
            statusBadge.textContent = "⚔️ ¡A la Lucha!";
            statusBadge.style.color = "var(--primary)";
            statusBadge.style.borderColor = "rgba(0, 229, 255, 0.2)";
            cardDescansoEnv.style.background = "transparent";
            cardLuchaEnv.style.background = "rgba(0, 229, 255, 0.08)";
            displayRounds.textContent = `Lucha ${roundActual} / ${inputRounds.value}`;
            sonarAlarmaCambio();
            dispararZumbidoYVibracion(250);
        }
        actualizarCamposDeTexto();
    }
}

function comenzarCronometro() {
    estaCorriendo = true;
    btnTimerMain.textContent = "⏸ Pausar";
    btnTimerMain.style.background = "linear-gradient(135deg, #EF4444, #991B1B)";
    
    if (estadoActual === "IDLE") {
        estadoActual = "LUCHA";
        roundActual = 1;
        tiempoRestante = parseInt(inputLucha.value) * 60;
        statusBadge.textContent = "⚔️ ¡A la Lucha!";
        cardLuchaEnv.style.background = "rgba(0, 229, 255, 0.08)";
        displayRounds.textContent = `Lucha ${roundActual} / ${inputRounds.value}`;
        emitirPitido(660, 0.25);
        dispararZumbidoYVibracion(120);
    }
    temporizadorInterno = setInterval(ejecutarCicloCronometro, 1000);
}

function pausarCronometro() {
    estaCorriendo = false;
    btnTimerMain.textContent = "▶ Reanudar";
    btnTimerMain.style.background = "linear-gradient(135deg, var(--secondary), #4C00B0)";
    statusBadge.textContent = "⏸ Pausado";
    clearInterval(temporizadorInterno);
    emitirPitido(500, 0.1);
    dispararZumbidoYVibracion(60);
}

function detenerYReiniciarCronometro() {
    estaCorriendo = false;
    clearInterval(temporizadorInterno);
    estadoActual = "IDLE";
    roundActual = 1;
    btnTimerMain.textContent = "▶ Comenzar";
    btnTimerMain.style.background = "linear-gradient(135deg, var(--secondary), #4C00B0)";
    statusBadge.textContent = "🛡️ Listo para rolar";
    statusBadge.style.color = "var(--primary)";
    statusBadge.style.borderColor = "rgba(0, 229, 255, 0.15)";
    cardLuchaEnv.style.background = "transparent";
    cardDescansoEnv.style.background = "transparent";
    actualizarCamposDeTexto();
}

// ESCUCHAS DE EVENTOS DEL CRONÓMETRO
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

// CONTROL DE NAVEGACIÓN BASADO EN SCROLL CONTINUO Y RESTAURACIÓN DEL EASTER EGG
if (btnTimerSub && appScrollContainer && sectionGladiadoresView) {
    btnTimerSub.addEventListener("click", () => {
        clicsGladiadores++;
        emitirPitido(600, 0.05);
        dispararZumbidoYVibracion(50);
        
        // Comportamiento normal: Hace scroll fluido hacia abajo para leer Gladiadores sin perder el contexto
        sectionGladiadoresView.scrollIntoView({ behavior: "smooth" });

        // SISTEMA EASTER EGG RE-INTEGRADO (7 PULSACIONES SEGUIDAS)
        if (clicsGladiadores >= 7) {
            clicsGladiadores = 0;
            emitirPitido(950, 0.4);
            dispararZumbidoYVibracion(300);
            
            // Reacción visual avanzada en la cabecera del Smartphone
            statusBadge.textContent = "🔓 JLDYN CORE UNLOCKED";
            statusBadge.style.color = "#FBBF24";
            statusBadge.style.borderColor = "#FBBF24";
            
            if (feedbackBox) {
                feedbackBox.textContent = "🚀 [EASTER EGG ACTIVADO]: Consola root abierta. Entorno de desarrollo JLDynamics optimizado al 100%.";
                feedbackBox.style.color = "#FBBF24";
                feedbackBox.style.borderColor = "rgba(251, 191, 36, 0.3)";
            }
        }
    });
}

// DICCIONARIO DE DESCRIPCIONES DE LA INTERFAZ GLADIADORES
const descripcionesModulos = {
    "RETAR": "🔒 Genera llaves de emparejamiento criptográficas y códigos QR únicos para lanzar desafíos directos en el tatami de entrenamiento.",
    "ACEPTAR RETO": "🔒 Abre la cámara del dispositivo para escanear el código de tu oponente y sincronizar el registro automático de la lucha.",
    "RANKING": "🔒 Clasificación profesional en tiempo real segmentada por tu cinturón, ELO y ratio de sumisiones globales.",
    "LOGROS": "🔒 Vitrina digital donde se desbloquean medallas e insignias exclusivas al cumplir hitos de finalizaciones (ej. Mata León).",
    "HISTORIAL": "🔒 Bitácora detallada de auditoría con la fecha, oponentes y resultados de todos tus asaltos históricos."
};

// CAPTURA DE INTERACCIÓN SUAVE DE LA LISTA GLADIADORES
document.querySelectorAll(".menu-item-lock").forEach(item => {
    item.style.cursor = "pointer";
    item.addEventListener("click", () => {
        emitirPitido(750, 0.03);
        dispararZumbidoYVibracion(40);
        
        const tituloModulo = item.querySelector("h4").textContent.trim();
        if (feedbackBox && descripcionesModulos[tituloModulo]) {
            // Restaurar el color cian por defecto por si se activó el Easter Egg previamente
            feedbackBox.style.color = "var(--primary)";
            feedbackBox.style.borderColor = "rgba(0, 229, 255, 0.12)";
            feedbackBox.textContent = descripcionesModulos[tituloModulo];
        }
    });
});

// INICIALIZACIÓN COMPLETA
actualizarCamposDeTexto();
