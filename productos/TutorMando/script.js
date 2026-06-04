/* Archivo: productos/TutorMando/script.js */

document.addEventListener("DOMContentLoaded", function() {
    
    const msgInput = document.getElementById("msg-input");
    const displayMsg = document.getElementById("display-msg");
    const colorButtons = document.querySelectorAll(".color-btn");
    const phoneScreen = document.getElementById("phone-screen-theme");
    const lockTitle = document.querySelector(".lock-title");
    const appToggles = document.querySelectorAll(".app-toggle");

    // 1. Sincronización de Texto en Vivo (Mensaje del Padre)
    msgInput.addEventListener("input", function() {
        displayMsg.textContent = this.value || "Dispositivo Bloqueado de forma remota.";
    });

    // 2. Control de Personalización Libre: Cambio de Paleta de Colores
    colorButtons.forEach(btn => {
        btn.addEventListener("click", function() {
            colorButtons.forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            
            const selectedColor = this.getAttribute("data-color");
            
            // Cambiar acentos visuales en la interfaz del smartphone del niño
            lockTitle.style.color = selectedColor;
            phoneScreen.style.borderTop = `3px solid ${selectedColor}`;
            
            // Inyectar un degradado dinámico según la paleta elegida
            if(selectedColor === "#bc00dd") {
                phoneScreen.style.background = "linear-gradient(180deg, #0a0110 0%, #170224 100%)";
            } else if(selectedColor === "#00e676") {
                phoneScreen.style.background = "linear-gradient(180deg, #010a05 0%, #022410 100%)";
            } else if(selectedColor === "#ff3b3b") {
                phoneScreen.style.background = "linear-gradient(180deg, #0a0101 0%, #240202 100%)";
            } else if(selectedColor === "#00b0ff") {
                phoneScreen.style.background = "linear-gradient(180deg, #010810 0%, #021624 100%)";
            }
        });
    });

    // 3. Gestión de Excepciones: Habilitar hasta 3 aplicaciones dinámicas
    appToggles.forEach(checkbox => {
        checkbox.addEventListener("change", function() {
            const appName = this.getAttribute("data-app");
            const targetAppIcon = document.getElementById(`app-${appName}`);
            
            // Validar límites de selección en vivo
            const checkedApps = document.querySelectorAll(".app-toggle:checked");
            if(checkedApps.length > 3) {
                this.checked = false;
                alert("Restricción Estratégica: El tutor solo puede habilitar hasta 3 aplicaciones adicionales como recompensa simultáneamente.");
                return;
            }

            // Mostrar u ocultar el ícono de la app en el dock del smartphone
            if(this.checked) {
                targetAppIcon.classList.remove("hidden");
            } else {
                targetAppIcon.classList.add("hidden");
            }
        });
    });
});
