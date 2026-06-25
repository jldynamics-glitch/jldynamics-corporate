// CONTROLADOR DEL TIMER DE BJJ & INTERFACES MÁGICAS - JLDYNAMICS (2026)
document.addEventListener("DOMContentLoaded", () => {
    let tiempoLuchaInicial = 5 * 60;
    let tiempoDescansoInicial = 1 * 60;
    let totalRounds = 5;

    let tiempoRestante = tiempoLuchaInicial;
    let roundActual = 1;
    let estaCorriendo = false;
    let esPeriodoDeLucha = true; 
    let timerInterval = null;
    let clicsGladiadores = 0;

    // SELECTORES DOM
    const displayLucha = document.getElementById("display-lucha");
    const displayDescanso = document.getElementById("display-descanso");
    const displayRounds = document.getElementById("display-rounds");
    const statusBadge = document.getElementById("timer-status-badge");
    const btnMain = document.getElementById("btn-timer-main");
    const btnSub = document.getElementById("btn-timer-sub");
    
    const cardLucha = document.getElementById("card-lucha-env");
    const cardDescanso = document.getElementById("card-descanso-env");

    const inputLucha = document.getElementById("input-tiempo-lucha");
    const inputDescanso = document.getElementById("input-tiempo-descanso");
    const inputRounds = document.getElementById("input-total-rounds");

    // DATA MÁGICA ALTERNATIVA PARA EL EASTER EGG
    const poolsDeRespuestas = [
        { tipo: 'premio', msg: '¡Felicidades, ganaste 1 clase de prueba gratuita!', link: true },
        { tipo: 'premio', msg: '¡Felicidades, ganaste 3 clases de prueba gratuitas!', link: true },
        { tipo: 'premio', msg: '¡Espectacular! Ganaste 5 clases de prueba gratuitas. ¡Aprovecha!', link: true },
        { tipo: 'broma', msg: 'Siga participando. ¡El tatami no regala nada!', link: false },
        { tipo: 'broma', msg: '¿En serio buscas algo fácil por aquí?', link: false },
        { tipo: 'broma', msg: 'Mejor ponte a entrenar y deja de presionar botones.', link: false },
        { tipo: 'broma', msg: 'Vas a descifrar el secreto... pero hoy no es el día.', link: false }
    ];

    // INYECTOR DEL MODAL MÁGICO COMIENZA AQUÍ
    const crearModalMagico = () => {
        if (document.getElementById("easter-egg-modal")) return;

        // Selección aleatoria del contenido
        const indiceRandom = Math.floor(Math.random() * poolsDeRespuestas.length);
        const itemSeleccionado = poolsDeRespuestas[indiceRandom];

        const modal = document.createElement("div");
        modal.id = "easter-egg-modal";
        
        let bloqueBotonAccion = '';
        if (itemSeleccionado.link) {
            bloqueBotonAccion = `<a href="https://wa.me/593999999999?text=¡Gané%20el%20premio%20en%20BJJ%20Timer!" target="_blank" class="btn-modal-action">RECLAMAR RECOMPENSA</a>`;
        }

        modal.innerHTML = `
            <div class="modal-glow-card">
                <div class="modal-cyber-icon">${itemSeleccionado.link ? '🏆' : '💀'}</div>
                <h2>SISTEMA GLADIADOR</h2>
                <div class="modal-divider"></div>
                <p class="modal-prize">${itemSeleccionado.msg}</p>
                ${bloqueBotonAccion}
                <button id="close-cyber-modal" class="btn-modal-close">MEJOR QUE LO TOME OTRO</button>
            </div>
        `;

        const estilos = document.createElement("style");
        estilos.id = "easter-egg-styles";
        estilos.textContent = `
            #easter-egg-modal {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(5, 5, 10, 0.96); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
                display: flex; align-items: center; justify-content: center; z-index: 20000;
                animation: fadeInCyber 0.3s ease-out;
            }
            .modal-glow-card {
                background: #0A0A10; border: 2px solid ${itemSeleccionado.link ? '#00E5FF' : '#7000FF'};
                box-shadow: 0 0 30px rgba(0, 229, 255, 0.2); border-radius: 20px;
                padding: 35px 24px; max-width: 380px; width: 90%; text-align: center;
                animation: scaleUpCyber 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            .modal-cyber-icon { font-size: 45px; margin-bottom: 12px; }
            .modal-glow-card h2 { font-family: 'Montserrat', sans-serif; font-size: 20px; color: #FFF; letter-spacing: 1px; }
            .modal-divider { height: 1px; background: linear-gradient(90deg, transparent, #7000FF, #00E5FF, transparent); margin: 15px 0; }
            .modal-prize { color: #F3F4F6; font-size: 15px; margin-bottom: 25px; line-height: 1.5; }
            .btn-modal-action {
                display: block; width: 100%; padding: 12px; margin-bottom: 12px;
                background: linear-gradient(135deg, #7000FF, #00E5FF); color: #05050A;
                font-weight: 800; font-size: 12px; text-transform: uppercase; border: none;
                border-radius: 8px; cursor: pointer; text-decoration: none; transition: transform 0.2s;
            }
            .btn-modal-action:hover { transform: translateY(-1px); }
            .btn-modal-close {
                background: transparent; border: 1px solid rgba(255,255,255,0.1); color: #6B7280;
                padding: 10px; width: 100%; border-radius: 8px; font-size: 11px; font-weight: 600;
                text-transform: uppercase; cursor: pointer; transition: color 0.2s;
            }
            .btn-modal-close:hover { color: #FFF; border-color: rgba(255,255,255,0.25); }
            @keyframes fadeInCyber { from { opacity: 0; } to { opacity: 1; } }
            @keyframes scaleUpCyber { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        `;

        document.head.appendChild(estilos);
        document.body.appendChild(modal);

        document.getElementById("close-cyber-modal").addEventListener("click", () => {
            modal.remove();
            estilos.remove();
            clicsGladiadores = 0; 
        });
    };

    // MOTOR LÓGICO DEL CRONÓMETRO
    const formatearTiempo = (segundos) => {
        const min = Math.floor(segundos / 60).toString().padStart(2, '0');
        const sec = (segundos % 60).toString().padStart(2, '0');
        return `${min}:${sec}`;
    };

    const leerConfiguracionDinamica = () => {
        if (inputLucha && inputLucha.value) tiempoLuchaInicial = parseInt(inputLucha.value) * 60;
        if (inputDescanso && inputDescanso.value) tiempoDescansoInicial = parseInt(inputDescanso.value) * 60;
        if (inputRounds && inputRounds.value) totalRounds = parseInt(inputRounds.value);
    };

    const actualizarInterfaz = () => {
        if (esPeriodoDeLucha) {
            if (displayLucha) displayLucha.textContent = formatearTiempo(tiempoRestante);
            if (displayDescanso) displayDescanso.textContent = formatearTiempo(tiempoDescansoInicial);
            if (cardLucha) cardLucha.style.borderColor = "rgba(0, 229, 255, 0.4)";
            if (cardDescanso) cardDescanso.style.borderColor = "rgba(255,255,255,0.05)";
        } else {
            if (displayLucha) displayLucha.textContent = formatearTiempo(tiempoLuchaInicial);
            if (displayDescanso) displayDescanso.textContent = formatearTiempo(tiempoRestante);
            if (cardLucha) cardLucha.style.borderColor = "rgba(255,255,255,0.05)";
            if (cardDescanso) cardDescanso.style.borderColor = "rgba(112, 0, 255, 0.4)";
        }
        if (displayRounds) displayRounds.textContent = `Lucha ${roundActual} / ${totalRounds}`;
    };

    const ejecutarCiclo = () => {
        if (tiempoRestante > 0) {
            tiempoRestante--;
            actualizarInterfaz();
        } else {
            if (esPeriodoDeLucha) {
                if (roundActual < totalRounds) {
                    esPeriodoDeLucha = false;
                    tiempoRestante = tiempoDescansoInicial;
                    statusBadge.textContent = "⏳ DESCANSO";
                } else {
                    reiniciarTimerCompleto();
                    statusBadge.textContent = "🏆 COMPLETO";
                    return;
                }
            } else {
                esPeriodoDeLucha = true;
                roundActual++;
                tiempoRestante = tiempoLuchaInicial;
                statusBadge.textContent = "⚔️ LUCHA";
            }
            actualizarInterfaz();
        }
    };

    const alternarTimer = () => {
        if (estaCorriendo) {
            clearInterval(timerInterval);
            estaCorriendo = false;
            btnMain.textContent = "▶ REANUDAR";
            statusBadge.textContent = "⏸️ PAUSA";
        } else {
            if (tiempoRestante === tiempoLuchaInicial && roundActual === 1 && esPeriodoDeLucha) {
                leerConfiguracionDinamica();
                tiempoRestante = tiempoLuchaInicial;
            }
            estaCorriendo = true;
            btnMain.textContent = "⏸ PAUSAR";
            statusBadge.textContent = esPeriodoDeLucha ? "⚔️ LUCHA" : "⏳ DESCANSO";
            timerInterval = setInterval(ejecutarCiclo, 1000);
        }
    };

    const reiniciarTimerCompleto = () => {
        clearInterval(timerInterval);
        estaCorriendo = false;
        esPeriodoDeLucha = true;
        leerConfiguracionDinamica();
        tiempoRestante = tiempoLuchaInicial;
        roundActual = 1;
        if (btnMain) btnMain.textContent = "▶ Comenzar";
        if (statusBadge) statusBadge.textContent = "🛡️ Listo para rolar";
        actualizarInterfaz();
    };

    if (btnMain) btnMain.addEventListener("click", alternarTimer);
    if (btnSub) {
        btnSub.addEventListener("click", (e) => {
            e.preventDefault();
            clicsGladiadores++;
            if (clicsGladiadores === 7) crearModalMagico();
        });
    }

    [inputLucha, inputDescanso, inputRounds].forEach(input => {
        if (input) input.addEventListener("change", reiniciarTimerCompleto);
    });

    reiniciarTimerCompleto();
});
