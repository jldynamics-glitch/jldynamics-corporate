/* ========================================
   METRIKKA - SCRIPT COMPLETO
   JLDynamics Ecosystem
   ======================================== */

document.addEventListener("DOMContentLoaded", function() {

    // ========================================
    // 1. FRASES MOTIVACIONALES (ROTATIVAS)
    // ========================================
    const frases = [
        "Si no controlas tu dinero, él te dominará.",
        "El primer paso es tener el control, el siguiente es lograr tus metas.",
        "Cada centavo que registras es un paso hacia tu libertad.",
        "No se trata de ganar más, se trata de gestionar mejor.",
        "Tus hábitos financieros de hoy construyen tu futuro.",
        "El dinero es un esclavo del conocimiento, no un amo de la ignorancia.",
        "El control es el primer paso, las metas son el destino.",
        "Registrar es el primer acto de libertad financiera."
    ];

    let fraseIndex = 0;
    const fraseElement = document.getElementById('frase-rotativa');

    function rotarFrase() {
        if (fraseElement) {
            fraseElement.style.opacity = '0';
            setTimeout(() => {
                fraseIndex = (fraseIndex + 1) % frases.length;
                fraseElement.textContent = frases[fraseIndex];
                fraseElement.style.opacity = '1';
            }, 300);
        }
    }

    // Rotar cada 8 segundos
    if (fraseElement) {
        setInterval(rotarFrase, 8000);
    }

    // ========================================
    // 2. DIAGNÓSTICO INTERACTIVO
    // ========================================
    let diagnosticoData = {
        meta: '',
        costo: 0,
        ingresos: 0,
        gastos: 0,
        inversiones: 0,
        control: 5
    };

    let currentStep = 1;
    const totalSteps = 6;

    // Cargar datos guardados
    function cargarDatosGuardados() {
        const saved = localStorage.getItem('metrikka_diagnostico');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                diagnosticoData = data;
                // Precargar valores en el simulador
                document.getElementById('meta-costo').value = data.costo || 5000;
                document.getElementById('activos').value = data.ingresos || 1200;
                document.getElementById('pasivos').value = data.gastos || 800;
                // Seleccionar meta en simulador
                if (data.meta) {
                    document.querySelectorAll('.obj-btn').forEach(btn => {
                        if (btn.getAttribute('data-target') === data.meta) {
                            document.querySelectorAll('.obj-btn').forEach(b => b.classList.remove('active'));
                            btn.classList.add('active');
                        }
                    });
                }
                calcularFinanzas();
            } catch (e) {
                console.warn('Error al cargar datos guardados');
            }
        }
    }

    function guardarDatos() {
        try {
            localStorage.setItem('metrikka_diagnostico', JSON.stringify(diagnosticoData));
        } catch (e) {
            console.warn('Error al guardar datos');
        }
    }

    function limpiarDatos() {
        if (confirm('¿Estás seguro de eliminar todos tus datos financieros? Esta acción no se puede deshacer.')) {
            localStorage.removeItem('metrikka_diagnostico');
            diagnosticoData = { meta: '', costo: 0, ingresos: 0, gastos: 0, inversiones: 0, control: 5 };
            // Resetear formulario
            document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
            document.getElementById('diagnostico-costo').value = '';
            document.getElementById('diagnostico-ingresos').value = '';
            document.getElementById('diagnostico-gastos').value = '';
            document.getElementById('diagnostico-inversiones').value = '';
            document.getElementById('diagnostico-control').value = 5;
            document.getElementById('slider-value').textContent = '5';
            // Ocultar resultado
            document.getElementById('diagnostico-resultado').style.display = 'none';
            // Volver al paso 1
            mostrarPaso(1);
            // Resetear simulador
            document.getElementById('meta-costo').value = 5000;
            document.getElementById('activos').value = 1200;
            document.getElementById('pasivos').value = 800;
            calcularFinanzas();
            // Toast
            mostrarToast('🗑️ Datos eliminados correctamente');
        }
    }

    function mostrarPaso(step) {
        // Ocultar todos
        for (let i = 1; i <= totalSteps; i++) {
            const el = document.getElementById(`step-${i}`);
            if (el) el.style.display = 'none';
        }
        // Mostrar el paso actual
        const stepEl = document.getElementById(`step-${step}`);
        if (stepEl) stepEl.style.display = 'block';

        // Actualizar barra de progreso
        const progress = ((step - 1) / (totalSteps - 1)) * 100;
        document.getElementById('progress-bar').style.width = `${progress}%`;
        document.getElementById('progress-text').textContent = `Paso ${step} de ${totalSteps}`;

        // Botones de navegación
        document.getElementById('diagnostico-prev').style.display = step > 1 ? 'inline-flex' : 'none';
        const nextBtn = document.getElementById('diagnostico-next');
        if (step === totalSteps) {
            nextBtn.textContent = 'Ver mi Diagnóstico 🎯';
        } else {
            nextBtn.textContent = 'Siguiente →';
        }

        currentStep = step;
        window.scrollTo({ top: document.querySelector('.diagnostico-container').offsetTop - 100, behavior: 'smooth' });
    }

    // Navegación
    function irSiguiente() {
        // Validar paso actual
        if (!validarPaso(currentStep)) return;

        if (currentStep === totalSteps) {
            // Mostrar resultado
            mostrarResultado();
            return;
        }
        mostrarPaso(currentStep + 1);
    }

    function irAnterior() {
        if (currentStep > 1) {
            mostrarPaso(currentStep - 1);
        }
    }

    function validarPaso(step) {
        switch(step) {
            case 1:
                const selected = document.querySelector('.option-btn.selected');
                if (!selected) {
                    mostrarToast('⚠️ Selecciona una meta para continuar');
                    return false;
                }
                diagnosticoData.meta = selected.getAttribute('data-value');
                return true;
            case 2:
                const costo = parseFloat(document.getElementById('diagnostico-costo').value);
                if (!costo || costo <= 0) {
                    mostrarToast('⚠️ Ingresa un monto válido para tu meta');
                    return false;
                }
                diagnosticoData.costo = costo;
                return true;
            case 3:
                const ingresos = parseFloat(document.getElementById('diagnostico-ingresos').value);
                if (!ingresos || ingresos <= 0) {
                    mostrarToast('⚠️ Ingresa tus ingresos mensuales');
                    return false;
                }
                diagnosticoData.ingresos = ingresos;
                return true;
            case 4:
                const gastos = parseFloat(document.getElementById('diagnostico-gastos').value);
                if (gastos === undefined || gastos < 0) {
                    mostrarToast('⚠️ Ingresa tus gastos mensuales');
                    return false;
                }
                diagnosticoData.gastos = gastos;
                return true;
            case 5:
                const inversiones = parseFloat(document.getElementById('diagnostico-inversiones').value);
                if (inversiones === undefined || inversiones < 0) {
                    mostrarToast('⚠️ Ingresa tus inversiones mensuales');
                    return false;
                }
                diagnosticoData.inversiones = inversiones;
                return true;
            case 6:
                diagnosticoData.control = parseInt(document.getElementById('diagnostico-control').value);
                return true;
            default:
                return true;
        }
    }

    // Eventos de opciones
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Botones rápidos de montos
    document.querySelectorAll('.quick-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.getElementById('diagnostico-costo').value = this.getAttribute('data-value');
        });
    });

    // Slider de control
    const sliderControl = document.getElementById('diagnostico-control');
    if (sliderControl) {
        sliderControl.addEventListener('input', function() {
            document.getElementById('slider-value').textContent = this.value;
        });
    }

    // Navegación
    document.getElementById('diagnostico-next').addEventListener('click', irSiguiente);
    document.getElementById('diagnostico-prev').addEventListener('click', irAnterior);

    // Tecla Enter para avanzar
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const container = document.querySelector('.diagnostico-container');
            if (container && container.contains(e.target)) {
                irSiguiente();
            }
        }
    });

    // ========================================
    // 3. MOSTRAR RESULTADO
    // ========================================
    function mostrarResultado() {
        const data = diagnosticoData;
        const ahorro = data.ingresos - data.gastos;

        document.getElementById('r-meta').textContent = data.meta || 'No definida';
        document.getElementById('r-costo').textContent = `$${data.costo.toLocaleString()}`;
        document.getElementById('r-ingresos').textContent = `$${data.ingresos.toLocaleString()}`;
        document.getElementById('r-gastos').textContent = `$${data.gastos.toLocaleString()}`;
        document.getElementById('r-inversiones').textContent = `$${data.inversiones.toLocaleString()}`;
        document.getElementById('r-ahorro').textContent = ahorro > 0 ? `$${ahorro.toLocaleString()}` : '$0';

        // Tiempo estimado
        let tiempo = '∞';
        let tiempoColor = '#F43F5E';
        let icono = '😰';
        if (ahorro > 0 && data.costo > 0) {
            const meses = data.costo / ahorro;
            tiempo = `${meses.toFixed(1)} meses`;
            if (meses <= 6) {
                tiempoColor = '#10B981';
                icono = '🚀';
            } else if (meses <= 18) {
                tiempoColor = '#F59E0B';
                icono = '💪';
            } else {
                tiempoColor = '#F43F5E';
                icono = '🐢';
            }
        } else if (ahorro <= 0) {
            tiempo = 'Revisa tus gastos';
            icono = '⚠️';
        }

        const tiempoEl = document.getElementById('r-tiempo');
        tiempoEl.textContent = tiempo;
        tiempoEl.style.color = tiempoColor;

        // Frase personalizada
        const frasesResultado = {
            'alto': '🔥 Tienes un excelente control. Ahora enfócate en tus metas y haz que trabajen para ti.',
            'medio': '💪 Vas por buen camino. Ajusta pequeños gastos y acelera tu libertad financiera.',
            'bajo': '🧠 El primer paso es tomar conciencia. Metrikka te ayudará a recuperar el control.'
        };

        let nivel = 'bajo';
        if (data.control >= 8) nivel = 'alto';
        else if (data.control >= 5) nivel = 'medio';

        document.getElementById('resultado-frase').textContent = `"${frasesResultado[nivel]}"`;

        // Icono
        document.getElementById('resultado-icon').textContent = icono;

        // Guardar datos
        guardarDatos();

        // Mostrar resultado
        document.getElementById('diagnostico-resultado').style.display = 'block';
        document.getElementById(`step-${totalSteps}`).style.display = 'none';
        document.getElementById('diagnostico-prev').style.display = 'none';
        document.getElementById('diagnostico-next').style.display = 'none';
        document.getElementById('progress-text').textContent = '✅ Diagnóstico Completado';
    }

    // ========================================
    // 4. BOTÓN IR AL SIMULADOR
    // ========================================
    document.getElementById('btn-ir-simulador').addEventListener('click', function() {
        // Precargar simulador con datos del diagnóstico
        document.getElementById('meta-costo').value = diagnosticoData.costo || 5000;
        document.getElementById('activos').value = diagnosticoData.ingresos || 1200;
        document.getElementById('pasivos').value = diagnosticoData.gastos || 800;
        // Seleccionar meta
        if (diagnosticoData.meta) {
            document.querySelectorAll('.obj-btn').forEach(btn => {
                if (btn.getAttribute('data-target') === diagnosticoData.meta) {
                    document.querySelectorAll('.obj-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                }
            });
        }
        calcularFinanzas();
        // Scroll al simulador
        document.getElementById('simulador').scrollIntoView({ behavior: 'smooth' });
    });

    // ========================================
    // 5. ELIMINAR DATOS (desde footer y resultado)
    // ========================================
    document.getElementById('btn-limpiar-datos').addEventListener('click', limpiarDatos);
    document.getElementById('btn-eliminar-datos-footer').addEventListener('click', limpiarDatos);

    // ========================================
    // 6. SIMULADOR FINANCIERO
    // ========================================
    let metaSeleccionada = "Pagar Deudas";
    const objButtons = document.querySelectorAll(".obj-btn");
    const inputCosto = document.getElementById("meta-costo");
    const inputActivos = document.getElementById("activos");
    const inputPasivos = document.getElementById("pasivos");
    const txtAhorro = document.getElementById("ahorro-neto");
    const txtTiempo = document.getElementById("tiempo-estimado");
    const btnExportar = document.getElementById("btn-exportar");
    const toast = document.getElementById("copy-toast");

    objButtons.forEach(btn => {
        btn.addEventListener("click", function() {
            objButtons.forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            metaSeleccionada = this.getAttribute("data-target");
            calcularFinanzas();
        });
    });

    [inputCosto, inputActivos, inputPasivos].forEach(input => {
        input.addEventListener("input", calcularFinanzas);
    });

    function calcularFinanzas() {
        const costo = parseFloat(inputCosto.value) || 0;
        const activos = parseFloat(inputActivos.value) || 0;
        const pasivos = parseFloat(inputPasivos.value) || 0;

        const ahorroNeto = activos - pasivos;
        txtAhorro.textContent = `$${ahorroNeto > 0 ? ahorroNeto.toFixed(2) : "0.00"}`;

        if (ahorroNeto <= 0) {
            txtTiempo.textContent = "⚠️ Revisa tus pasivos";
            txtTiempo.style.color = "#F43F5E";
            return;
        }

        if (costo <= 0) {
            txtTiempo.textContent = "Define el costo de tu meta";
            txtTiempo.style.color = "#F59E0B";
            return;
        }

        txtTiempo.style.color = "#10B981";
        const meses = costo / ahorroNeto;
        txtTiempo.textContent = `${meses.toFixed(1)} Meses`;
    }

    // ========================================
    // 7. EXPORTAR PROMPT IA
    // ========================================
    btnExportar.addEventListener("click", function() {
        const costo = parseFloat(inputCosto.value) || 0;
        const activos = parseFloat(inputActivos.value) || 0;
        const pasivos = parseFloat(inputPasivos.value) || 0;
        const ahorro = activos - pasivos;
        const meta = metaSeleccionada;

        const promptTexto = `Eres un experto en finanzas de alto nivel. Usando las métricas de la aplicación Metrikka, vas a ayudarme a cumplir mi meta estratégica de ${meta} en el menor tiempo posible.

Aquí está el estado detallado de mi flujo de caja actual:
- Costo total de la Meta establecida: $${costo.toFixed(2)}
- Flujo de Activos Mensuales (Ingresos): $${activos.toFixed(2)}
- Flujo de Pasivos Mensuales (Gastos Obligatorios/Frecuentes): $${pasivos.toFixed(2)}
- Capacidad Real de Ahorro Neto Mensual: $${ahorro > 0 ? ahorro.toFixed(2) : "0.00"}

Por favor, analiza de forma estricta mis gastos e ingresos. Diseña un plan estructurado aplicando la estrategia de la Bola de Nieve (Snowball) para priorizar la liquidación de mis deudas de menor a mayor y optimizar mis recursos sin recurrir a gastos innecesarios.

💡 TIP DE METRIKKA: Para maximizar este análisis, clasifica cada gasto con etiquetas binarias (¿Feliz? 😊 / ¿Necesario? ✅). Luego, pide a la IA que identifique el "gasto hormiga" con mayor impacto en tu ahorro mensual.

Recuerda siempre: "Si tú no estás controlando tu dinero, el dinero te está dominando a ti."`;

        navigator.clipboard.writeText(promptTexto).then(() => {
            mostrarToast('📋 Prompt copiado al portapapeles');
        }).catch(() => {
            alert('No se pudo copiar automáticamente. Selecciona el texto manualmente.');
        });
    });

    // ========================================
    // 8. TOAST
    // ========================================
    function mostrarToast(mensaje) {
        toast.textContent = mensaje;
        toast.classList.add("show");
        clearTimeout(toast._timeout);
        toast._timeout = setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }

    // ========================================
    // 9. MODAL SHOWCASE
    // ========================================
    const modal = document.getElementById('modal-showcase');
    const modalClose = document.getElementById('modal-close');

    // Abrir modal desde badges o cualquier elemento
    document.querySelectorAll('[data-open-modal]').forEach(el => {
        el.addEventListener('click', () => {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ========================================
    // 10. DEMO TOGGLES (Auditoría Emocional)
    // ========================================
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const group = this.closest('.toggle-group');
            const siblings = group.querySelectorAll('.toggle-btn');
            // Si es feliz, solo toggle dentro del mismo tipo
            if (this.classList.contains('happy')) {
                siblings.forEach(s => {
                    if (s.classList.contains('happy')) {
                        s.classList.toggle('active');
                    }
                });
            } else if (this.classList.contains('necessary')) {
                siblings.forEach(s => {
                    if (s.classList.contains('necessary')) {
                        s.classList.toggle('active');
                    }
                });
            }
        });
    });

    // ========================================
    // 11. INICIALIZACIÓN
    // ========================================
    cargarDatosGuardados();
    calcularFinanzas();
    mostrarPaso(1);

    // Mostrar mensaje de bienvenida
    console.log('🔹 Metrikka v2.0 - JLDynamics');
    console.log('💡 "Si no controlas tu dinero, él te dominará."');

});