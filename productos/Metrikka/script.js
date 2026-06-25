/* Archivo: C:\Users\luimi\Documents\jldynamics\LandingPage\productos\metrikka\script.js */

document.addEventListener("DOMContentLoaded", function() {
    
    // VARIABLES DEL SIMULADOR
    let metaSeleccionada = "Pagar Deudas";
    const objButtons = document.querySelectorAll(".obj-btn");
    const inputCosto = document.getElementById("meta-costo");
    const inputActivos = document.getElementById("activos");
    const inputPasivos = document.getElementById("pasivos");
    
    const txtAhorro = document.getElementById("ahorro-neto");
    const txtTiempo = document.getElementById("tiempo-estimado");
    const btnExportar = document.getElementById("btn-exportar");
    const toast = document.getElementById("copy-toast");

    // Intercambio de objetivos financieros
    objButtons.forEach(btn => {
        btn.addEventListener("click", function() {
            objButtons.forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            metaSeleccionada = this.getAttribute("data-target");
            calcularFinanzas();
        });
    });

    // Escucha de entradas numéricas en tiempo real
    [inputCosto, inputActivos, inputPasivos].forEach(input => {
        input.addEventListener("input", calcularFinanzas);
    });

    // Función Matemática de Cálculo en Tiempo Real
    function calcularFinanzas() {
        const costo = parseFloat(inputCosto.value) || 0;
        const activos = parseFloat(inputActivos.value) || 0;
        const pasivos = parseFloat(inputPasivos.value) || 0;

        // Capacidad de ahorro neta real
        const ahorroNeto = activos - pasivos;
        
        // Renderizado del Ahorro Neto (no permitimos mostrar negativos visualmente)
        txtAhorro.textContent = `$${ahorroNeto > 0 ? ahorroNeto.toFixed(2) : "0.00"}`;

        // Validación 1: Flujo de caja quebrado o en cero
        if (ahorroNeto <= 0) {
            txtTiempo.textContent = "Tiempo Infinito (Revisa tus pasivos)";
            txtTiempo.style.color = "#ff3b3b"; // Rojo de alerta terminal
            return;
        }

        // Validación 2: Meta sin costo configurado
        if (costo <= 0) {
            txtTiempo.textContent = "Define el costo de tu meta";
            txtTiempo.style.color = "#ff9800"; // Naranja de advertencia
            return;
        }

        // Si pasa los controles, el estado es óptimo
        txtTiempo.style.color = "#00e676"; // Verde fosforescente premium
        
        // Fórmula del tiempo estimado para lograr el objetivo financiero
        const meses = costo / ahorroNeto;
        txtTiempo.textContent = `${meses.toFixed(1)} Meses`;
    }

    // ========== EXPORTACIÓN DE PROMPT Y COPIADO AUTOMÁTICO ==========
    btnExportar.addEventListener("click", function() {
        const costo = parseFloat(inputCosto.value) || 0;
        const activos = parseFloat(inputActivos.value) || 0;
        const pasivos = parseFloat(inputPasivos.value) || 0;
        const ahorro = activos - pasivos;

        // Construcción estructurada del prompt experto con enfoque Snowball libre de errores
        const promptTexto = `Eres un experto en finanzas de alto nivel. Usando las métricas de la aplicación Metrikka, vas a ayudarme a cumplir mi meta estratégica de ${metaSeleccionada} en el menor tiempo posible.

Aquí está el estado detallado de mi flujo de caja actual:
- Costo total de la Meta establecida: $${costo.toFixed(2)}
- Flujo de Activos Mensuales (Ingresos): $${activos.toFixed(2)}
- Flujo de Pasivos Mensuales (Gastos Obligatorios/Frecuentes): $${pasivos.toFixed(2)}
- Capacidad Real de Ahorro Neto Mensual: $${ahorro > 0 ? ahorro.toFixed(2) : "0.00"}

Por favor, analiza de forma estricta mis gastos e ingresos. Diseña un plan estructurado aplicando la estrategia de la Bola de Nieve (Snowball) para priorizar la liquidación de mis deudas de menor a mayor y optimizar mis recursos sin recurrir a gastos innecesarios. Recuerda siempre resaltar que debo registrar minuciosamente cada movimiento dentro de la aplicación de Metrikka para sostener un control perimetral estricto de mi dinero.

Finaliza tu análisis con la siguiente frase de cierre motivacional imperativa: "Si tú no estás controlando tu dinero, el dinero te está dominando a ti."`;

        // API de portapapeles nativa moderna con manejo de promesas seguro
        navigator.clipboard.writeText(promptTexto).then(() => {
            // Muestra confirmación visual flotante (Toast)
            toast.classList.add("show");
            setTimeout(() => {
                toast.classList.remove("show");
            }, 3000);
        }).catch(err => {
            console.error("Error crítico al interactuar con el portapapeles del sistema: ", err);
            alert("No se pudo copiar automáticamente. Por favor selecciona el texto manualmente de la consola.");
        });
    });

    // Inicializar cálculo inmediato al cargar la página web
    calcularFinanzas();
});
