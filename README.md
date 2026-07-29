# JLDynamics Corporate

Plataforma web corporativa de **JLDynamics** — firma de ingeniería de software premium (Ambato, Ecuador). Enfoque en apps utilitarias, simuladores y ciberseguridad, con estética **Cyber-Luxury**.

**Sitio en vivo:** [jldynamics-glitch.github.io/jldynamics-corporate](https://jldynamics-glitch.github.io/jldynamics-corporate/)  
**Repositorio:** [github.com/jldynamics-glitch/jldynamics-corporate](https://github.com/jldynamics-glitch/jldynamics-corporate)

---

## Resumen

Sitio estático (HTML5 + CSS3 + Vanilla JS) desplegado en GitHub Pages. Incluye:

| Área | Descripción |
|------|-------------|
| Landing | Hero, misión/visión, tríada de productos, portafolio y contacto |
| Productos | Metrikka, BJJ Timer Pro, Tutor al Mando, Stream Pro (cada uno con privacy/terms) |
| Oracle | Chat multi-agente (APIs de IA; claves del usuario) |
| Legal | `privacy.html`, `terms.html`, `cookies.html` |

**Stack:** Vanilla (sin frameworks) · Plus Jakarta Sans / Montserrat · Font Awesome · `localStorage` para temas (`jldynamics-theme`).

**Backend declarado en productos/legal:** Firebase Auth / Google Cloud (auth, sync, ads en BJJ Timer vía AdMob).

---

## Conectores importantes

### Despliegue y repo

| Conector | URL |
|----------|-----|
| GitHub Pages | https://jldynamics-glitch.github.io/jldynamics-corporate/ |
| Repo GitHub | https://github.com/jldynamics-glitch/jldynamics-corporate |
| Portafolio (MediVital) | https://jldynamics-glitch.github.io/medivital-ambato/ |

### Contacto

| Canal | Valor |
|-------|--------|
| Email corporativo | `info@jldynamics.com` |
| Email privacidad / soporte | `lu.violencia@gmail.com` |
| Teléfono | `+593 958652500` |
| Ubicación | Ambato, Ecuador |
| PayPal (Oracle / café) | https://paypal.me/luimike001 |

### Productos (rutas locales → producción)

| Producto | Ruta local | En vivo |
|----------|------------|---------|
| Metrikka | `productos/Metrikka/index.html` | [/productos/Metrikka/](https://jldynamics-glitch.github.io/jldynamics-corporate/productos/Metrikka/) |
| BJJ Timer Pro | `productos/bjj-timer/index.html` | [/productos/bjj-timer/](https://jldynamics-glitch.github.io/jldynamics-corporate/productos/bjj-timer/) |
| Tutor al Mando | `productos/TutorMando/index.html` | [/productos/TutorMando/](https://jldynamics-glitch.github.io/jldynamics-corporate/productos/TutorMando/) |
| Stream Pro | `productos/streamiptvpro/index.html` | [/productos/streamiptvpro/](https://jldynamics-glitch.github.io/jldynamics-corporate/productos/streamiptvpro/) |
| Oracle | `oracle.html` | [/oracle.html](https://jldynamics-glitch.github.io/jldynamics-corporate/oracle.html) |

### CDN / terceros (frontend)

| Servicio | Uso |
|----------|-----|
| Google Fonts | Tipografías |
| cdnjs (Font Awesome 6.5) | Iconos |
| Firebase / GCP | Auth y datos (apps; ver políticas) |
| Google AdMob | Anuncios (BJJ Timer; ver privacy del producto) |

### APIs Oracle (`oracle.html`)

Endpoints que el cliente puede usar con su propia API key:

- DeepSeek — `https://api.deepseek.com/v1/chat/completions`
- Gemini — `https://generativelanguage.googleapis.com/...`
- Grok (xAI) — `https://api.x.ai/v1/chat/completions`
- NVIDIA — `https://integrate.api.nvidia.com/v1/chat/completions`
- OpenRouter — `https://openrouter.ai/api/v1/chat/completions`
- Claude — `https://api.anthropic.com/v1/messages`
- OpenAI — `https://api.openai.com/v1/chat/completions`

### Anclas de la landing

`#inicio` · `#mision` · `#vision` · `#pilares` · `#triada-estrategica` / `#productos` · `#contacto`

---

## Estructura del repo

```
LandingPage/
├── index.html              # Landing corporativa
├── styles.css / script.js  # Estilos y lógica global
├── oracle.html             # Chat multi-agente
├── privacy.html | terms.html | cookies.html
├── auditar.py              # Script de auditoría (descarga desde landing)
├── contexto.md             # Guía de ingeniería y negocio
├── assets/                 # Logo y assets
├── img/                    # Favicons
├── portafolio/             # Proyectos adicionales
└── productos/
    ├── Metrikka/           # Simulador financiero (Snowball)
    ├── bjj-timer/          # Temporizador de combate BJJ
    ├── TutorMando/         # Control parental / mediación digital
    └── streamiptvpro/      # Stream Pro — reproductor IPTV / M3U
```

Detalle de producto y reglas XSS/táctiles: ver [`contexto.md`](./contexto.md).

---

## Cómo verlo en local

Abrir `index.html` en el navegador, o servir la carpeta:

```bash
# Ejemplo con Python
python -m http.server 8080
```

Luego: `http://localhost:8080`

---

## Productos (una línea)

- **Metrikka** — Plan de deudas método Snowball + export de prompt de auditoría para IA.
- **BJJ Timer Pro** — Timer táctico (prep / lucha / descanso) orientado a academias.
- **Tutor al Mando** — Consola de control parental con smartphone virtual interactivo.
- **Stream Pro** — Reproductor IPTV / M3U multiplataforma (móvil + Android TV), 100% local.
- **Oracle** — Consola multi-LLM (BYOK).

---

© 2026 JLDynamics. Ambato, Ecuador.
