// ============================================
// BJJ TIMER PRO - JLDynamics
// Script Principal
// ============================================

// ============================================
// DATOS
// ============================================

const rankingData = [
    { pos: 1, nombre: "Gordon Ryan", pais: "USA", elo: 2567, cinturon: "Negro", topClass: "top-1" },
    { pos: 2, nombre: "Craig Jones", pais: "AUS", elo: 2453, cinturon: "Negro", topClass: "top-2" },
    { pos: 3, nombre: "Erich Munis dos Santos", pais: "BRA", elo: 2341, cinturon: "Negro", topClass: "top-3" },
    { pos: 4, nombre: "Tainan Dalpra Costa", pais: "BRA", elo: 2289, cinturon: "Negro", topClass: "" },
    { pos: 5, nombre: "Diego Oliveira Batista", pais: "BRA", elo: 2210, cinturon: "Negro", topClass: "" },
    { pos: 6, nombre: "Francisco Papasidero", pais: "ITA", elo: 2156, cinturon: "Marrón", topClass: "" },
    { pos: 7, nombre: "Vinicius Liberati", pais: "BRA", elo: 2098, cinturon: "Negro", topClass: "" },
    { pos: 8, nombre: "Seif-Eddine Houmine", pais: "MAR", elo: 2043, cinturon: "Marrón", topClass: "" },
    { pos: 9, nombre: "Luis Romo", pais: "ECU", elo: 1987, cinturon: "Violeta", topClass: "destacado" },
    { pos: 10, nombre: "Juan Cortez", pais: "ECU", elo: 1942, cinturon: "Azul", topClass: "" }
];

const logrosData = [
    // BLANCO
    { id: 1, nombre: "Coleccionista de Brazos", descripcion: "Realiza 5 palancas de brazo", icono: "💪", progreso: 5, total: 10, categoria: "blanco" },
    { id: 2, nombre: "Tengo tu Patita de Llavero", descripcion: "Realiza 7 llaves de tobillo", icono: "🦶", progreso: 3, total: 7, categoria: "blanco" },
    { id: 3, nombre: "Tienes el Cuello Débil", descripcion: "Realiza 10 mata leones", icono: "🦁", progreso: 8, total: 10, categoria: "blanco" },
    { id: 4, nombre: "Esto Toma Sentido", descripcion: "Finaliza a un cinturón blanco", icono: "🤔", progreso: 1, total: 1, categoria: "blanco" },
    { id: 5, nombre: "Primer Paso", descripcion: "Gana tu primer combate oficial", icono: "👣", progreso: 1, total: 1, categoria: "blanco" },
    // AZUL
    { id: 6, nombre: "Domador de Serpientes", descripcion: "Realiza 15 estrangulamientos", icono: "🐍", progreso: 6, total: 15, categoria: "azul" },
    { id: 7, nombre: "Rey de la Guardia", descripcion: "Barre a 10 oponentes desde la guardia", icono: "👑", progreso: 4, total: 10, categoria: "azul" },
    { id: 8, nombre: "Tornillo Humano", descripcion: "Aplica 8 omoplatas", icono: "🔄", progreso: 3, total: 8, categoria: "azul" },
    { id: 9, nombre: "Cazador de Piernas", descripcion: "Finaliza 12 combates con llave de pierna", icono: "🎯", progreso: 9, total: 12, categoria: "azul" },
    { id: 10, nombre: "Pac-Man", descripcion: "Aplica 20 estrangulamientos en combates", icono: "👾", progreso: 14, total: 20, categoria: "azul" },
    // VIOLETA
    { id: 11, nombre: "El Artista", descripcion: "Aplica 25 barridos con estilo", icono: "🎨", progreso: 12, total: 25, categoria: "violeta" },
    { id: 12, nombre: "Mata Gigantes", descripcion: "Vence a 5 cinturones azules", icono: "⚔️", progreso: 3, total: 5, categoria: "violeta" },
    { id: 13, nombre: "Raspadinha Pro", descripcion: "Aplica 20 raspadinhas en combates", icono: "🛹", progreso: 8, total: 20, categoria: "violeta" },
    { id: 14, nombre: "Estratega", descripcion: "Gana 10 combates por puntos", icono: "♟️", progreso: 6, total: 10, categoria: "violeta" },
    { id: 15, nombre: "La Roca", descripcion: "Sobrevive 15 minutos sin ser finalizado", icono: "🪨", progreso: 1, total: 1, categoria: "violeta" },
    // MARRÓN
    { id: 16, nombre: "Ni Masahiko Kimura lo Hizo", descripcion: "Realiza 100 Kimuras", icono: "🔥", progreso: 67, total: 100, categoria: "marron" },
    { id: 17, nombre: "Doctorado en Jiu-Jitsu", descripcion: "Vence a 15 cinturones violetas", icono: "🎓", progreso: 9, total: 15, categoria: "marron" },
    { id: 18, nombre: "El Invencible", descripcion: "Gana 20 combates seguidos", icono: "⭐", progreso: 12, total: 20, categoria: "marron" },
    { id: 19, nombre: "Mago de las Transiciones", descripcion: "Aplica 50 pases de guardia", icono: "🪄", progreso: 28, total: 50, categoria: "marron" },
    // NEGRO
    { id: 20, nombre: "Me Desayuno Faixas Preta", descripcion: "Vence a 100 cinturones negros", icono: "🍳", progreso: 87, total: 100, categoria: "negro" },
    { id: 21, nombre: "Leyenda Viviente", descripcion: "Alcanza 1000 combates oficiales", icono: "👑", progreso: 423, total: 1000, categoria: "negro" }
];

const mensajesEasterEgg = [
    "🎉 ¡Felicidades! Has ganado 1 clase de prueba en nuestra academia. ¡Contáctanos para reclamarla!",
    "🥋 ¿Estás buscando algo? Mejor ponte a entrenar, campeón.",
    "💪 Sigue participando y luchando. La constancia es la clave.",
    "🔥 Eres un crack. Ahora haz 20 flexiones de pecho ¡YA!",
    "⚡ Eres un Pro. Ejecuta 10 Burpees explosivos ahora mismo.",
    "🎁 ¡Premio JLDynamics! Has ganado 1 semana de clases en Roots Academy Ambato Ecuador. ¡Contáctanos!",
    "❌ Sigue participando... El tatami premia la perseverancia.",
    "🏆 ¡Logro desbloqueado! Eres un guerrero de élite.",
    "💡 Tip de campeón: La técnica vence a la fuerza. Sigue entrenando.",
    "🌟 ¡Estrella en ascenso! Has sido seleccionado para entrenamiento especial."
];

// ============================================
// RENDER RANKING
// ============================================
function renderRanking() {
    const tbody = document.getElementById('ranking-body');
    if (!tbody) return;
    
    tbody.innerHTML = rankingData.map(r => `
        <tr class="${r.topClass}">
            <td class="posicion ${r.topClass}">${r.pos}</td>
            <td class="nombre">${r.nombre}</td>
            <td>${r.pais}</td>
            <td class="elo">${r.elo}</td>
            <td>🥋 ${r.cinturon}</td>
        </tr>
    `).join('');
}

// ============================================
// RENDER LOGROS
// ============================================
function renderLogros(filtro = 'todos') {
    const grid = document.getElementById('logros-grid');
    if (!grid) return;
    
    const filtrados = filtro === 'todos' 
        ? logrosData 
        : logrosData.filter(l => l.categoria === filtro);

    const tagNames = {
        blanco: 'Blanco',
        azul: 'Azul',
        violeta: 'Violeta',
        marron: 'Marrón',
        negro: 'Negro'
    };

    grid.innerHTML = filtrados.map(l => {
        const porcentaje = Math.min(Math.round((l.progreso / l.total) * 100), 100);
        const desbloqueado = l.progreso >= l.total;
        const estadoEmoji = desbloqueado ? '🏅' : '🔒';
        const tagClass = `tag-${l.categoria}`;

        return `
            <div class="logro-item" data-categoria="${l.categoria}">
                <div class="logro-icono">${l.icono}</div>
                <div class="logro-info">
                    <div class="logro-nombre">
                        ${l.nombre}
                        <span class="logro-categoria-tag ${tagClass}">${tagNames[l.categoria]}</span>
                    </div>
                    <div class="logro-descripcion">${l.descripcion}</div>
                    <div class="logro-progreso">
                        <div class="logro-progreso-bar">
                            <div class="logro-progreso-fill" style="width: ${porcentaje}%; ${desbloqueado ? 'background: linear-gradient(90deg, #4ADE80, #22C55E);' : ''}"></div>
                        </div>
                        <span class="logro-progreso-texto">${l.progreso}/${l.total}</span>
                    </div>
                </div>
                <div class="logro-estado">${estadoEmoji}</div>
            </div>
        `;
    }).join('');
}

// ============================================
// LOGROS NAV
// ============================================
document.querySelectorAll('.logros-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.logros-nav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderLogros(btn.dataset.filtro);
    });
});

// ============================================
// TIMER - CORE
// ============================================
const btnTimerMain = document.getElementById("btn-timer-main");
const btnGladiadoresTrigger = document.getElementById("btn-gladiadores-trigger");
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

let temporizadorInterno = null;
let estaCorriendo = false;
let estadoActual = "IDLE";
let roundActual = 1;
let tiempoRestante = 0;
let clicsGladiadores = 0;

// ============================================
// AUDIO
// ============================================
const ctxAudio = new (window.AudioContext || window.webkitAudioContext)();

function dispararZumbidoYVibracion(duracionMs = 80) {
    if ("vibrate" in navigator) {
        navigator.vibrate(duracionMs);
    }
    if (phoneWrapperCard) {
        phoneWrapperCard.classList.remove("vibrar-interfaz");
        void phoneWrapperCard.offsetWidth;
        phoneWrapperCard.classList.add("vibrar-interfaz");
        setTimeout(() => {
            phoneWrapperCard.classList.remove("vibrar-interfaz");
        }, 200);
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
        // AudioContext silencioso
    }
}

function sonarAlarmaCambio() {
    emitirPitido(880, 0.15);
    setTimeout(() => emitirPitido(880, 0.15), 200);
    setTimeout(() => emitirPitido(1100, 0.4), 400);
}

// ============================================
// TIMER - LÓGICA
// ============================================
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

// ============================================
// TIMER - EVENTOS
// ============================================
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

// ============================================
// EASTER EGG + BOTÓN GLADIADORES
// ============================================
const easterOverlay = document.getElementById('easter-egg-overlay');
const easterMessage = document.getElementById('easter-egg-message');
const easterClose = document.getElementById('easter-egg-close');

function mostrarEasterEgg() {
    const indice = Math.floor(Math.random() * mensajesEasterEgg.length);
    easterMessage.textContent = mensajesEasterEgg[indice];
    easterOverlay.classList.add('active');
    
    // Sonido de celebración
    emitirPitido(880, 0.2);
    setTimeout(() => emitirPitido(1100, 0.2), 150);
    setTimeout(() => emitirPitido(1320, 0.3), 300);
    dispararZumbidoYVibracion(300);
}

function cerrarEasterEgg() {
    easterOverlay.classList.remove('active');
}

if (easterClose) {
    easterClose.addEventListener('click', cerrarEasterEgg);
}

if (easterOverlay) {
    easterOverlay.addEventListener('click', (e) => {
        if (e.target === easterOverlay) {
            cerrarEasterEgg();
        }
    });
}

// Botón Gladiadores: Easter Egg + scroll
if (btnGladiadoresTrigger) {
    btnGladiadoresTrigger.addEventListener("click", () => {
        clicsGladiadores++;
        
        // Vibración leve (visual)
        dispararZumbidoYVibracion(30);
        emitirPitido(600, 0.04);

        if (clicsGladiadores >= 7) {
            clicsGladiadores = 0;
            mostrarEasterEgg();
        }

        // Scroll suave a la sección Perfil
        const perfilSection = document.getElementById('seccion-perfil');
        if (perfilSection) {
            perfilSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

// ============================================
// SCROLL SUAVE PARA ENLACES INTERNOS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============================================
// INICIALIZAR
// ============================================
renderRanking();
renderLogros('todos');
actualizarCamposDeTexto();

console.log('✅ BJJ Timer Pro - JLDynamics');
console.log('🔥 Easter Egg: 7 clics en "Gladiadores"');
console.log('🥋 Ranking Top 10 cargado');
console.log('🏅 Sistema de Logros con progreso');