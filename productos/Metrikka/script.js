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

    // Escucha de entradas numéricas
    [inputCosto, inputActivos, inputPasivos].forEach(input => {
        input.addEventListener("input", calcularFinanzas);
    });

    // Función Matemática de Cálculo en Tiempo Real
    function calcularFinanzas() {
        const costo = parseFloat(inputCosto.value) || 0;
        const activos = parseFloat(inputActivos.value) || 0;
        const pasivos = parseFloat(inputPasivos.value) || 0;

        // Capacidad de ahorro neta
        const ahorroNeto = activos - pasivos;
        txtAhorro.textContent = `$${ahorroNeto > 0 ? ahorroNeto : 0}`;

        if (ahorroNeto <= 0) {
            txtTiempo.textContent = "Tiempo Infinito (Revisa tus pasivos)";
            txtTiempo.style.color = "#ff3b3b";
            return;
        }

        txtTiempo.style.color = "#00e676";
        // Fórmula del tiempo estimado para lograr el objetivo financiero
        const meses = costo / ahorroNeto;
        
        if (meses <= 0) {
            txtTiempo.textContent = "0 Meses";
        } else {
            txtTiempo.textContent = `${meses.toFixed(1)} Meses`;
        }
    }

    // ========== EXPORTACIÓN DE PROMPT Y COPIADO AUTOMÁTICO ==========
    btnExportar.addEventListener("click", function() {
        const costo = inputCosto.value || "0";
        const activos = inputActivos.value || "0";
        const pasivos = inputPasivos.value || "0";
        const ahorro = parseFloat(activos) - parseFloat(pasivos);

        // Construcción estructurada del prompt experto con enfoque Snowball
        const promptTexto = `Eres un experto en finanzas de alto nivel. Usando las métricas de la aplicación Metrikka, vas a ayudarme a cumplir mi meta estratégica de ${metaSeleccionada} en el menor tiempo posible.

Aquí está el estado detallado de mi flujo de caja actual:
- Costo total de la Meta establecida: $${costo}
- Flujo de Activos Mensuales (Ingresos): $${activos}
- Flujo de Pasivos Mensuales (Gastos Obligatorios/Frecuentes): $${pasivos}
- Capacidad Real de Ahorro Neto Mensual: $${ahorro > 0 ? ahorro : 0}

Por favor, analiza de forma estricta mis gastos e ingresos. Diseña un plan estructurado aplicando la estrategia de la Bola de Nieve (Snowball) para priorizar la liquidación de mis deudas de menor a mayor y optimizar mis recursos sin recurrir a gastos innecesarios. Recuerda siempre resaltar que debo registrar minuciosamente cada movimiento dentro de la aplicación de Metrikka para sostener un control perimetral estricto de mi dinero.

Finaliza tu análisis con la siguiente frase de cierre motivacional imperativa: "Si tú no estás controlando tu dinero, el dinero te está dominando a ti."`;

        // Api de portapapeles nativa moderna
        navigator.clipboard.writeText(promptTexto).then(() => {
            // Muestra confirmación visual flotante (Toast)
            toast.classList.add("show");
            setTimeout(() => {
                toast.classList.remove("show");
            }, 3000);
        }).catch(err => {
            console.error("Error al copiar al portapapeles: ", err);
            alert("No se pudo copiar automáticamente. Por favor selecciona el texto manualmente.");
        });
    });

    // Inicializar cálculo al cargar la página web
    calcularFinanzas();
});