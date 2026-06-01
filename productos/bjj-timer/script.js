/* Archivo: C:\Users\luimi\Documents\jldynamics\LandingPage\productos\bjj-timer\script.js */

document.addEventListener("DOMContentLoaded", function() {
    
    // ========== BOTÓN RETORNO COHESIVO (JLDYNAMICS) ==========
    // Crea un botón flotante dinámico para regresar a la raíz corporativa
    const backBtn = document.createElement('a');
    backBtn.href = '../../index.html'; // Sube dos niveles para llegar a la raíz de JLDynamics
    backBtn.innerText = '← Volver a JLDynamics';
    backBtn.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        background: rgba(7, 7, 8, 0.75);
        backdrop-filter: blur(8px);
        color: #ffffff;
        padding: 8px 16px;
        border-radius: 6px;
        font-family: 'Montserrat', sans-serif;
        font-size: 12px;
        font-weight: 700;
        text-decoration: none;
        border: 1px solid rgba(255, 255, 255, 0.1);
        z-index: 9999;
        transition: all 0.2s ease;
    `;
    
    backBtn.addEventListener('mouseenter', () => {
        backBtn.style.borderColor = '#ff3b3b';
        backBtn.style.boxShadow = '0 0 15px rgba(255, 59, 59, 0.2)';
    });
    backBtn.addEventListener('mouseleave', () => {
        backBtn.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        backBtn.style.boxShadow = 'none';
    });
    document.body.appendChild(backBtn);


    // ========== INTERACCIÓN DE BOTONES DE TIENDA ==========
    const btnAndroid = document.getElementById('btn-android');
    const btnIos = document.getElementById('btn-ios');

    if (btnAndroid) {
        btnAndroid.addEventListener('click', function(e) {
            e.preventDefault();
            // ✅ Redirección limpia a producción (comenta o edita la ID cuando lances)
            window.location.href = 'https://play.google.com/store/apps/details?id=com.example.bjj_timer';
        });
    }

    if (btnIos) {
        btnIos.addEventListener('click', function(e) {
            e.preventDefault();
            alert('🍎 Versión iOS próximamente. ¡Síguenos para más novedades!');
        });
    }


    // ========== ANIMACIÓN DINÁMICA DEL TIMER EN EL MOCKUP ==========
    // Le da vida a la pantalla simulada del teléfono corriendo un contador real
    const timerDisplay = document.querySelector('.timer-display');
    if (timerDisplay) {
        let totalSeconds = 360; // 06:00
        
        setInterval(() => {
            if (totalSeconds > 350) { // Simula un bucle corto de combate de 10 segundos
                totalSeconds--;
            } else {
                totalSeconds = 360; // Resetea para mantener el dinamismo infinito
            }
            
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }


    // ========== OPTIMIZACIÓN DE ANIMACIÓN POR SCROLL ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Dejamos de observar el elemento una vez animado para ahorrar recursos de CPU
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Selecciona los componentes modulares y les aplica el estado inicial antes de observar
    document.querySelectorAll('.benefit-card, .step, .achievement-card, .prize-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)'; // Transición más suave y orgánica
        observer.observe(el);
    });

});