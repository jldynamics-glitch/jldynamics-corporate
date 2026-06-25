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

const phoneWrapperCard = document.getElementById("smartphone-wrapper-card");
const appScrollContainer = document.getElementById("app-scroll-container");
const sectionTimerView = document.getElementById("section-timer-view");
const sectionGladiadoresView = document.getElementById("section-gladiadores-view");
const feedbackBox = document.getElementById("gladiador-feedback-box");

let temporizadorInterno = null;
let estaCorriendo = false;
let estadoActual = "IDLE"; 
let roundActual = 1;
let tiempoRestante = 0;
let clicsGladiadores = 0;

const ctxAudio = new (window.AudioContext || window.webkitAudioContext)();

// MATRIZ DE 10 ALTERNATIVAS EXCLUSIVAS PARA EL EASTER EGG (PREMIOS Y RETOS DE LUCHA)
const alternativasEasterEgg = [
    "🎁 ¡GANASTE! Has obtenido una clase de prueba 100% gratuita en la academia central. ¡Reclámala!",
    "❌ Sigue participando... Tu nivel de Jiu-Jitsu es alto, pero la suerte hoy no te acompaña.",
    "💪 ¡RETROALIMENTACIÓN DE FUERZA! Llegaste aquí, haz 20 flexiones de pecho estructuradas ¡YA!",
    "🔥 ¡DESAFÍO EXTREMO! Mantén una plancha abdominal fija durante 45 segundos sin bajar la cadera.",
    "🎁 ¡PREMIO JLDYNAMICS! Desbloqueaste un cupón de 15% de descuento en parches corporativos para tu Gi.",
    "❌ Sigue participando... El tatami premia la constancia, vuelve a presionar el botón.",
    "🥋 ¡RETROALIMENTACIÓN TÁCTICA! Realiza 15 camarones (escapes de cadera) por lado en el piso.",
    "🔥 ¡CONDICIÓN DE CAMPEÓN! Ejecuta 10 Burpees explosivos para activar tus fibras musculares.",
    "🎁 ¡RECOMPENSA DIGITAL! Acceso libre temporal para la versión Premium sin publicidad de BJJ Timer Pro.",
    "❌ Sigue participando... Casi lo logras, dale otro intento al sistema analítico."
];

function dispararZumbidoYVibracion(duracionMs = 80) {
    if ("vibrate" in navigator) {
        navigator.vibrate(duracionMs);
    }
    if (phoneWrapperCard) {
        phoneWrapperCard.classList.remove("vibrar-interfaz");
        void phoneWrapperCard.offsetWidth; 
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
        console.log("AudioContext esperando interacción.");
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

// GESTIÓN DEL EASTER EGG REESTRUCTURADO DE MANERA COMPETITIVA
if (btnTimerSub && appScrollContainer && sectionGladiadoresView) {
    btnTimerSub.addEventListener("click", () => {
        clicsGladiadores++;
        emitirPitido(600, 0.05);
        dispararZumbidoYVibracion(50);
        
        sectionGladiadoresView.scrollIntoView({ behavior: "smooth" });

        if (clicsGladiadores >= 7) {
            clicsGladiadores = 0;
            emitirPitido(950, 0.3);
            dispararZumbidoYVibracion(250);
            
            // Selección aleatoria limpia del pool de 10 alternativas
            const indiceAleatorio = Math.floor(Math.random() * alternativasEasterEgg.length);
            const resultadoSeleccionado = alternativasEasterEgg[indiceAleatorio];
            
            statusBadge.textContent = "🎁 RULETA ACTIVADA";
            statusBadge.style.color = "#FBBF24";
            statusBadge.style.borderColor = "#FBBF24";
            
            if (feedbackBox) {
                feedbackBox.style.color = "#FBBF24";
                feedbackBox.style.borderColor = "rgba(251, 191, 36, 0.4)";
                feedbackBox.style.background = "rgba(251, 191, 36, 0.03)";
                feedbackBox.textContent = resultadoSeleccionado;
            }
        }
    });
}

const descripcionesModulos = {
    "RETAR": "🔒 Genera llaves de emparejamiento criptográficas y códigos QR únicos para lanzar desafíos directos en el tatami.",
    "ACEPTAR RETO": "🔒 Abre la cámara del dispositivo para escanear el código de tu oponente y sincronizar el registro de la lucha.",
    "RANKING": "🔒 Clasificación profesional en tiempo real segmentada por tu cinturón, ELO y ratio de sumisiones globales.",
    "LOGROS": "🔒 Vitrina digital donde se desbloquean medallas e insignias exclusivas al cumplir hitos de finalizaciones.",
    "HISTORIAL": "🔒 Bitácora detallada de auditoría con la fecha, oponentes y resultados de todos tus asaltos históricos."
};

document.querySelectorAll(".menu-item-lock").forEach(item => {
    item.style.cursor = "pointer";
    item.addEventListener("click", () => {
        emitirPitido(750, 0.03);
        dispararZumbidoYVibracion(40);
        
        const tituloModulo = item.querySelector("h4").textContent.trim();
        if (feedbackBox && descripcionesModulos[tituloModulo]) {
            feedbackBox.style.color = "var(--primary)";
            feedbackBox.style.borderColor = "rgba(0, 229, 255, 0.12)";
            feedbackBox.style.background = "rgba(0, 229, 255, 0.01)";
            feedbackBox.textContent = descripcionesModulos[tituloModulo];
        }
    });
});

actualizarCamposDeTexto();
