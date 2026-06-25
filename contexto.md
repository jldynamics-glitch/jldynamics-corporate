CONTEXTO DE INGENIERÍA Y DIRECCIÓN — JLDYNAMICS CORPORATE (2026)
​📋 VISIÓN GENERAL Y POSICIONAMIENTO
​JLDynamics se posiciona como una firma de ingeniería de software premium, especializada en aplicaciones utilitarias de alta fidelidad, simuladores avanzados y ciberseguridad aplicada al entorno web y perimetral.
​Propósito: Empresa de desarrollo de software, automatización y seguridad física/lógica.
​Enfoque de Diseño: Cyber-Luxury (Fondo ultra-oscuro #05050A, contrastes de neón Cyan #00E5FF y Purple #7000FF, efectos de cristal/glassmorphism con bordes difuminados y animaciones fluidas que simulan telemetría táctica).
​Enfoque Técnico: Vanilla Stack (HTML5 + CSS3 + Vanilla JS puro sin frameworks) para optimizar el rendimiento al 100% y facilitar el despliegue inmediato en entornos móviles e híbridos (como contenedores de Termux o WebViews).
​Despliegue: GitHub Pages → https://jldynamics-glitch.github.io/jldynamics-corporate/
ESTRUCTURA DE PRIORIDADES DEL ECOSISTEMA
LandingPage/
├── index.html                 # Core: Landing corporativa, selector de temas y modales dinámicos (CSS + JS inline principal)
├── styles.css                 # Arquitectura de estilos (Temas e interacciones táctiles globales)
├── script.js                  # Lógica de interacción global y micro-animaciones
├── contexto.md                # ⬅️ ESTE ARCHIVO (guía de ingeniería y contexto de negocio)
├── README.md
├── .gitignore
│
├── assets/
│   └── logo.png               # Logo corporativo
│
├── css/styles.css             # Respaldo de estilos globales
├── js/main.js                 # Respaldo de lógica global (vacío)
│
├── portafolio/
│   └── index.html             # Espacio reservado para proyectos adicionales
│
├── productos/
│   ├── bjj-timer/             # 🥋 BJJ Timer Pro - Temporizador de combate táctico
│   │   ├── index.html
│   │   ├── styles.css
│   │   ├── script.js
│   │   ├── privacy.html
│   │   └── terms.html
│   │
│   ├── Metrikka/              # 📊 Metrikka - Simulador Financiero Snowball (Lead Magnet)
│   │   ├── index.html
│   │   ├── styles.css
│   │   ├── script.js
│   │   ├── privacy.html
│   │   └── terms.html
│   │
│   └── TutorMando/            # 🔒 Tutor al Mando - Consola de Control Parental Estricto
│       ├── index.html
│       ├── styles.css
│       ├── script.js
│       ├── privacy.html
│       └── terms.html
│
├── privacy.html               # Política de privacidad general
├── terms.html                 # Términos y condiciones generales
└── cookies.html               # Política de cookies
SISTEMA DE DISEÑO Y PERSONALIZACIÓN (CYBER-LUXURY)
​Paleta de Colores y Estilos
​Fondo base: Ultra-oscuro (#05050A / #0A0A10).
​Tema por defecto (Dark/Cyber): Acentos en Cyan #00E5FF y Púrpura #7000FF.
​Efectos visuales: Bordes con gradientes finos, cajas reflectantes tipo cristal con desenfoque de fondo (backdrop-filter: blur), y sombras sutiles con efecto de luz de neón (glow).
​Tipografía: Plus Jakarta Sans o Montserrat de alta legibilidad.
​Lógica de Temas Dinámicos
​Guardado y persistencia a través de localStorage (jldynamics-theme).
​Botones de selección de temas (data-swatch) accesibles en el Header.
​Inyección directa del atributo data-theme en la etiqueta de apertura <html> para evitar parpadeos visuales en la recarga del sitio.
​🎯 ENFOQUE ESTRATÉGICO POR PRODUCTO
​1. 🥋 BJJ Timer Pro (Plataforma Deportiva Táctica)
​Propósito: El temporizador de combate definitivo para Jiu-Jitsu Brasileño, Judo y grappling.
​Enfoque Comercial: Ofrecer personalización premium bajo demanda (marca blanca, logo y colores personalizados de la academia) para profesores y gimnasios de artes marciales.
​Flujo de Usuario Dinámico:
​Control de tiempos estricto para ciclos de Preparación (ej. cuenta atrás de 10 segundos), Lucha activa (combate) y Descanso intermedio.
​Alertas auditivas nítidas de alta frecuencia optimizadas para tatamis con ruido ambiental elevado.
​Simulador rápido de combate integrado directamente en el portal corporativo mediante modales interactivos de 10s.
​2. 📊 Metrikka (Gestión Financiera - Método Snowball)
​Propósito: Simulador financiero estratégico orientado a deudores y profesionales para estructurar planes rápidos de amortización e inyección de excedentes de capital.
​Funcionalidad Crítica:
​Simulador Interactivo: Recibe inputs dinámicos de costos, pasivos y activos netos del usuario. Calcula automáticamente el tiempo restante para "Deuda Cero" priorizando amortizaciones con el método de Bola de Nieve (Snowball).
​Exportador Inteligente: Botón "Exportar Prompt de Auditoría" que copia un reporte estructurado y anónimo directamente al portapapeles, permitiendo analizar los datos en cualquier IA (como DeepSeek, ChatGPT, etc.).
​3. 🔒 Tutor al Mando (Consola de Mediación Digital Familiar)
​Propósito: Una suite interactiva y rigurosa de control parental físico-lógico que permite restringir el uso excesivo de dispositivos en menores de edad.
​Funcionalidad Crítica:
​Smartphone Virtual Interactivo: Una maqueta interactiva que reacciona en tiempo real a los cambios configurados por el padre (modificación de textos de advertencia o bloqueo, selección de colores de acento y activación de checkboxes para restringir o permitir redes sociales/juegos).
​🛡️ DIRECTRICES DE CIBERSEGURIDAD Y RENDIMIENTO (AUDITORÍA LOCAL)
​Para garantizar un código blindado contra exploits del lado del cliente en todas las páginas, cualquier cambio realizado en los archivos del repositorio debe apegarse estrictamente a las siguientes directivas:
​1. Prevención estricta de inyecciones XSS (Cross-Site Scripting)
​Regla de oro: Queda terminantemente prohibido el uso de innerHTML o document.write cuando se manejen, inyecten o muestren datos introducidos libremente por el usuario en formularios o simuladores.
​Solución segura: Reemplazar por textContent, innerText, o en su defecto, crear elementos del DOM dinámicamente mediante document.createElement() asignando las propiedades de forma estructurada.
​2. Sanitización de Datos Locales
​Cualquier dato extraído de localStorage (como la clave del tema o preferencias del timer) debe parsearse o sanitizarse adecuadamente para evitar ataques de inyección persistente en el navegador del cliente.
​3. Optimización Táctil (Móvil / Termux / Webview)
​Toda interacción de control (timers, modales, pestañas de arquitectura, sliders y botones de reinicio) debe configurarse para responder instantáneamente tanto a clics como a eventos táctiles (touchstart, touchend).
​Tamaño de objetivo de tap mínimo de 48px x 48px en botones interactivos y elementos de menú para asegurar usabilidad fluida en dispositivos móviles sin toques accidentales.

