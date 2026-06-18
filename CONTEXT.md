# CONTEXT — JLDynamics Landing Page

Documento de contexto del proyecto que detalla la estructura, propósito y ajustes realizados en el sitio web corporativo de JLDynamics.

---

## 📌 Propósito de esta Carpeta

**Ruta:** `C:\Users\luimi\Documents\jldynamics\LandingPage\`

Este repositorio contiene el **sitio web corporativo / landing page** de **JLDynamics**, una empresa de desarrollo de software y seguridad física. El sitio está desplegado en **GitHub Pages** y funciona como portafolio digital de la empresa y sus productos.

### Productos presentados:
1. **🥋 BJJ Timer Pro** — App de cronómetro para Brazilian Jiu-Jitsu con modo Gladiadores
2. **📊 Metrikka** — Gestor financiero inteligente con simulador Snowball
3. **🔒 Tutor al Mando** — Consola de control parental con bloqueo remoto

---

## 🏗️ Estructura del Proyecto

```
LandingPage/
├── index.html                 # Página principal (landing page corporativa)
├── styles.css                 # Estilos globales (vinculado desde index.html)
├── script.js                  # Script global (vinculado desde index.html)
├── README.md                  # Descripción del repositorio
├── CONTEXT.md                 # ⬅️ Este archivo
├── .gitignore                 # Exclusiones para git (exe, logs, etc.)
├── .git/                      # Repositorio Git
│
├── assets/
│   ├── logo.png               # Logo corporativo de JLDynamics
│   └── CursorUserSetup-x64-3.7.12.exe  # (excluido por .gitignore)
│
├── css/
│   └── styles.css             # (respaldo, no se usa directamente)
│
├── js/
│   └── main.js                # (respaldo, no se usa directamente)
│
├── portafolio/
│   ├── index.html             # ⚠️ VACÍO (0 bytes) - pendiente de crear
│   ├── apps/                  # Carpeta para apps del portafolio
│   └── scripts/               # Scripts del portafolio
│
├── productos/
│   ├── bjj-timer/             # Landing page de BJJ Timer Pro
│   │   ├── index.html
│   │   ├── styles.css
│   │   ├── script.js
│   │   ├── privacy.html
│   │   ├── terms.html
│   │   └── assets/logo.png
│   │
│   ├── Metrikka/              # Landing page de Metrikka
│   │   ├── index.html
│   │   ├── styles.css
│   │   ├── script.js
│   │   ├── privacy.html
│   │   └── terms.html
│   │
│   └── TutorMando/            # Landing page de Tutor al Mando
│       ├── index.html
│       ├── styles.css
│       ├── script.js
│       ├── privacy.html
│       └── terms.html
│
├── privacy.html               # Política de Privacidad (general)
├── terms.html                 # Términos y Condiciones (general)
└── cookies.html               # Política de Cookies (general)
```

---

## 🔧 Ajustes Realizados (08/03/2026)

### 1. ✅ Vinculación de archivos externos en `index.html`
- **Problema:** `index.html` tenía todo el CSS y JS inline, sin usar `styles.css` ni `script.js`
- **Solución:** Se agregó `<link rel="stylesheet" href="styles.css">` en el `<head>` y `<script src="script.js"></script>` al final del `<body>`
- **Impacto:** Los archivos externos ahora cargan, complementando la funcionalidad del sitio

### 2. ✅ Corrección de enlace a Metrikka (Error 404)
- **Problema:** El botón "Probar Web 🚀" de Metrikka enlazaba a `productos/metrikka/` (minúscula), pero la carpeta real es `productos/Metrikka/` (mayúscula)
- **Causa raíz:** GitHub Pages (Linux) distingue entre mayúsculas/minúsculas. Windows no, por eso funcionaba en local pero daba 404 online
- **Solución:** Se cambió el href en `index.html` de `metrikka` a `Metrikka`

### 3. ✅ Creación de `.gitignore`
- **Problema:** No existía archivo de exclusiones; archivos como `CursorUserSetup-x64-3.7.12.exe` podían subirse accidentalmente
- **Contenido:** Excluye archivos `.exe`, `.dll`, `.log`, `.env`, `.DS_Store`, `Thumbs.db`, configuraciones de IDE (`.vscode/`, `.idea/`)
- **Impacto:** El `.exe` de assets ya no se subirá al repo

### 4. ✅ Push exitoso a GitHub
- **Remoto:** `https://github.com/jldynamics-glitch/jldynamics-corporate.git`
- **Branch:** `main`
- **Commit realizado:** `"Fix: Vincular styles.css y script.js en index.html + agregar .gitignore"`
- **Pull necesario:** Hubo cambios en el remoto que requirieron merge antes del push

---

## 🌐 URLs de Despliegue (GitHub Pages)

| Recurso | URL | Estado |
|---------|-----|--------|
| Landing Page | `https://jldynamics-glitch.github.io/jldynamics-corporate/` | ✅ |
| BJJ Timer Pro | `.../productos/bjj-timer/` | ✅ |
| Metrikka | `.../productos/Metrikka/` | ✅ |
| Tutor al Mando | `.../productos/TutorMando/` | ✅ |
| Privacidad | `.../privacy.html` | ✅ |
| Términos | `.../terms.html` | ✅ |
| Cookies | `.../cookies.html` | ✅ |

---

## ⚠️ Observaciones y Tareas Pendientes

### Pendientes:
- [ ] **`portafolio/index.html`** — Está vacío (0 bytes). Si se planea usar la sección de portafolio, hay que crearlo
- [ ] **Refactorizar CSS/JS** — `index.html` aún tiene ~600 líneas de CSS inline y ~300 líneas de JS inline. A futuro se puede migrar completamente a `styles.css` y `script.js` para mejor mantenibilidad
- [ ] **`css/styles.css` y `js/main.js`** — Son archivos que existen pero no se usan. Evaluar si eliminarlos o unificarlos con los de la raíz

### Estructura Git:
- Repositorio: `jldynamics-glitch/jldynamics-corporate`
- Rama principal: `main`
- Último commit: `1a46749` (Fix: Vincular styles.css y script.js en index.html + agregar .gitignore)
- El repo está 1 commit adelante del remoto después del push

---

## 🛠️ Stack Tecnológico

| Componente | Tecnología |
|------------|-----------|
| HTML | HTML5 semántico |
| CSS | CSS3 con variables, flexbox, grid, animaciones |
| JavaScript | Vanilla JS (sin frameworks) |
| Fuentes | Google Fonts (Plus Jakarta Sans, Montserrat) |
| Despliegue | GitHub Pages |
| Control de versiones | Git + GitHub |
