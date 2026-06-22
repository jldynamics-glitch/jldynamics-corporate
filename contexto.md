# CONTEXTO COMPLETO DEL SITIO WEB — JLDynamics Landing Page

## 📋 Visión General

**Proyecto:** Sitio web corporativo / Landing Page de **JLDynamics**
**Propósito:** Empresa de desarrollo de software y seguridad física
**Stack:** HTML5 + CSS3 + Vanilla JS (sin frameworks)
**Despliegue:** GitHub Pages → `https://jldynamics-glitch.github.io/jldynamics-corporate/`

---

## 🧱 Estructura del Proyecto

```
LandingPage/
├── index.html                 # Página principal (todo inline: CSS + JS)
├── styles.css                 # Estilos globales (vinculado pero complementario)
├── script.js                  # Script global (vinculado pero complementario)
├── contexto.md                # ⬅️ ESTE ARCHIVO (análisis completo)
├── CONTEXT.md                 # Contexto anterior del proyecto
├── README.md
├── .gitignore
│
├── assets/
│   └── logo.png               # Logo corporativo
│
├── css/styles.css             # Backup de estilos (no usado directamente)
├── js/main.js                 # Backup de script (vacío)
│
├── portafolio/
│   └── index.html             # VACÍO (0 bytes) - pendiente
│
├── productos/
│   ├── bjj-timer/             # 🥋 BJJ Timer Pro - Timer de combate
│   │   ├── index.html
│   │   ├── styles.css
│   │   ├── script.js
│   │   ├── privacy.html
│   │   └── terms.html
│   │
│   ├── Metrikka/              # 📊 Metrikka - Gestión financiera
│   │   ├── index.html
│   │   ├── styles.css
│   │   ├── script.js
│   │   ├── privacy.html
│   │   └── terms.html
│   │
│   └── TutorMando/            # 🔒 Tutor al Mando - Control parental
│       ├── index.html
│       ├── styles.css
│       ├── script.js
│       ├── privacy.html
│       └── terms.html
│
├── privacy.html               # Política de privacidad general
├── terms.html                 # Términos y condiciones generales
└── cookies.html               # Política de cookies
```

---

## 🎨 Diseño y Estilo

### Tema Principal
- **Fondo oscuro:** `#05050A` / `#0A0A10`
- **Color Primario:** Cyan `#00E5FF`
- **Color Secundario:** Púrpura `#7000FF`
- **Variantes de tema:** Dark (default) | Cyan | Purple
- **Tipografía:** `Plus Jakarta Sans` / `Montserrat`
- **Estética:** Cyber-luxury con glassmorphism, bordes con gradiente, sombras glow

### Sistema de Temas
- 3 temas guardables vía `localStorage` (`jldynamics-theme`)
- Botones selectores de color en el header (`data-swatch`)
- Aplicación dinámica con `data-theme` en `<html>`

---

## 🏗️ Secciones del Index

### 1. Header (Navegación)
- Logo + nombre de marca con gradiente
- Menú de navegación: Inicio, Misión/Visión, Pilares, Ecosistema, Contacto
- Dropdown con submenú de productos
- Theme switcher (3 botones de color)
- Menú hamburguesa responsive

### 2. Hero Section
- Tagline: "Innovación y Seguridad en cada línea de código"
- Título principal con gradiente
- Subtítulo descriptivo
- Animación ECG (electrocardiograma) con SVG animado
- CTA primario y secundario

### 3. Misión y Visión
- Dos tarjetas con íconos, títulos con gradiente y descripciones
- Efecto hover de elevación y borde brillante

### 4. Pilares Corporativos (4 valores)
- **Compromiso** - Promesa de soluciones robustas e innovación
- **Desarrollo** - Productos modulares con soporte 24/7
- **Privacidad** - Cifrado AES-256 y GDPR compliance
- **Seguridad** - Hardware + software, protección perimetral
- Efecto 3D tilt en hover + scroll reveal animations

### 5. Demo de Personalización (BJJ Timer Mockup)
- Mockup visual del timer con display (06:00)
- Controles de demo: Play, Pause, Reset
- Texto promocional de personalización de marca
- Timer funcional con JavaScript (cuenta regresiva de 6 min)

### 6. Sección de Productos (Ecosistema) ⭐
Tres tarjetas de producto con:

#### 🥋 Producto 1: BJJ Timer Pro
- **Badge:** (ninguno)
- **Descripción:** Plataforma de gestión del tiempo de combate y retos P2P
- **Botón 1:** `Ir a la Web del Producto 🚀` → enlace a `./productos/bjj-timer/index.html`
- **Botón 2:** `🔬 Probar Simulador Rápido` → abre modal con timer funcional (10s countdown)

#### 📊 Producto 2: Metrikka - Gestión Financiera
- **Badge:** `Fintech Inteligente` (verde `#00e676`)
- **Descripción:** Administrador de flujos de capital, método Snowball
- **Botón 1:** `Analizar Arquitectura` → modal showcase con mockup genérico
- **Botón 2:** `Probar Web 🚀` → enlace a `productos/Metrikka/index.html` (verde)

#### 🔒 Producto 3: Tutor al Mando
- **Badge:** `Control Familiar Estricto` (púrpura `#bc00dd`)
- **Descripción:** Consola de mediación digital perimetral
- **Botón 1:** `🔍 Ver Especificaciones` → modal showcase genérico
- **Botón 2:** `Probar Web 🚀` → enlace a `productos/TutorMando/index.html` (púrpura)

### 7. Footer (Cyber-Luxury)
- Logo + nombre con gradiente
- 4 columnas: Marca, Enlaces Rápidos, Contacto Directo, Redes Sociales
- WhatsApp: `+593 95 865 2500`
- Email: `lu.violencia@gmail.com`
- Facebook: SVG icon oficial
- Enlaces legales: Privacidad, Términos, Cookies
- Copyright: 2026 JLDynamics - Ambato, Ecuador

---

## ⚙️ Funcionalidades JavaScript (index.html - inline ~300 líneas)

### 1. Theme Switcher
- `data-swatch` en botones → cambia `data-theme` en `<html>`
- Persistencia en `localStorage`

### 2. Menú Hamburguesa
- Toggle para menú responsive móvil
- Cierre al hacer clic en enlaces

### 3. Cursor Magnético (solo escritorio)
- Cursor personalizado con blur effect
- Interacción con elementos: se expande en hover

### 4. Tilt 3D en tarjetas
- Efecto de inclinación 3D en `.pillar-card` al mover mouse

### 5. Scroll Reveal Animations
- IntersectionObserver para animaciones de entrada
- Tarjetas aparecen desde abajo con fade-in

### 6. Demo Timer (Mockup)
- Timer de 6:00 minutos con controles Play/Pause/Reset
- Display en tiempo real

### 7. Modal de BJJ Timer
- Modal overlay con timer funcional de 10 segundos
- Estado: PREPARACION → LUCHA
- Botón flotante "Volver arriba"

### 8. Showcase Dinámico (Metrikka & Tutor)
- Modal con título y descripción desde `data-*` attributes
- Mockup de interfaz visual
- Botón "Solicitar esta Solución" → cierra modal + scroll a contacto

---

## 📱 Funcionalidades por Producto (páginas individuales)

### 🥋 BJJ Timer Pro (`productos/bjj-timer/`)
- **Hero:** Mockup de teléfono con timer animado (06:00 ciclo infinito)
- **Secciones:** Beneficios (3 cards), Cómo funciona (3 pasos), Rangos de combate (3 niveles con progress bars), Recompensas, Testimonial
- **Botones:** Descargar Android (Play Store link placeholder) / iOS (próximamente)
- **JS:** Botón de retorno flotante a JLDynamics, timer animado cíclico, scroll reveal animations

### 📊 Metrikka (`productos/Metrikka/`)
- **Hero con Simulador Financiero:**
  - Selector de objetivo: Pagar Deudas, Vehículo, Emergencias, Retiro, Vacaciones
  - Inputs: Costo meta, Activos mensuales, Pasivos mensuales
  - Cálculo en vivo: Ahorro Neto + Tiempo Estimado (fórmula Snowball)
  - Botón `Exportar Prompt de Auditoría IA` → copia al portapapeles un prompt estructurado
  - Toast de confirmación visual
- **Secciones:** Características (3 cards con Snowball, Cuentas Claras, Puente IA)

### 🔒 Tutor al Mando (`productos/TutorMando/`)
- **Hero con Simulador Interactivo:**
  - Panel de control del tutor (textarea para mensaje de bloqueo)
  - Selector de color de tema (4 colores: púrpura, verde, rojo, azul)
  - Checkbox de apps permitidas (WhatsApp obligatorio, hasta 3 adicionales)
  - Smartphone virtual que reacciona en vivo:
    - Cambia el mensaje de bloqueo según textarea
    - Cambia color de acento y fondo según selector
    - Muestra/oculta íconos de apps según checkboxes
- **Características:** Desbloqueo por tareas, Personalización de temas, Cierre perimetral lógico

---

## 🔍 Análisis de Funcionalidades Dinámicas (Estado Actual)

### Funcionalidades existentes en index.html:
| Función | Estado | Componentes |
|---------|--------|-------------|
| Theme Switcher | ✅ Completo | 3 temas, localStorage |
| Menú Hamburguesa | ✅ Completo | Toggle + cierre en link |
| Cursor Magnético | ✅ Completo | Desktop only |
| Tilt 3D | ✅ Completo | Pillar cards |
| Scroll Reveal | ✅ Completo | Pillars, products, MV cards |
| Demo Timer | ✅ Completo | Mockup 6min |
| Modal BJJ Timer | ✅ Completo | Timer 10s |
| Modal Showcase | ✅ Completo | Metrikka & Tutor (genérico) |

### Funcionalidades existentes en páginas de producto:
| Producto | Funcionalidades Dinámicas |
|----------|--------------------------|
| BJJ Timer | Timer mockup animado, scroll reveal, botón retorno flotante |
| Metrikka | Simulador financiero en vivo, exportación prompt IA, cálculos Snowball |
| TutorMando | Simulador de bloqueo parental interactivo, cambios de tema en vivo, control de apps |

---

## 🚀 Funciones Dinámicas AGREGADAS (NUEVAS)

### En index.html (página principal)

Se agregaron las siguientes funciones dinámicas a los botones de productos:

#### Para BJJ Timer Pro:
1. **Botón "Ir a la Web del Producto":** Animación de carga con efecto "glow" pulsante antes de redirigir, feedback visual de transición.
2. **Botón "Probar Simulador Rápido":** Contador regresivo con sonido virtual, estados visuales (PREPARACIÓN → LUCHA → FINALIZADO), animación de pulso en el display.

#### Para Metrikka:
1. **Botón "Analizar Arquitectura":** Modal mejorado con tabs interactivos (Arquitectura, Funciones, Tech Stack) con contenido dinámico.
2. **Botón "Probar Web":** Efecto de "carga" con barra de progreso animada + partículas flotantes antes de redirigir.

#### Para Tutor al Mando:
1. **Botón "Ver Especificaciones":** Modal con slider de features (3 slides navegables) mostrando capturas conceptuales y descripciones detalladas.
2. **Botón "Probar Web":** Efecto "desbloqueo" animado con icono de candado que se abre + pulso antes de redirigir.

### Mejoras globales:
- Badges de estado en vivo en cada tarjeta de producto según interacción
- Contadores de visitas simulados en modales
- Tooltips informativos en hover de botones
- Micro-interacciones: ripple effect en clics, partículas decorativas
