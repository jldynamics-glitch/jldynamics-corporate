// ================================================================
// JLDYNAMICS - SCRIPT COMPLETO
// ================================================================

document.addEventListener('DOMContentLoaded', () => {
    
    // ========== THEME SWITCHER ==========
    const themeBtns = document.querySelectorAll('.theme-btn');
    const savedTheme = localStorage.getItem('jldynamics-theme');
    
    function detectSystemTheme() {
        if (!savedTheme) {
            document.documentElement.setAttribute('data-theme', 'default');
        }
    }
    detectSystemTheme();
    
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
    
    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.getAttribute('data-swatch');
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('jldynamics-theme', theme);
        });
    });
    
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('jldynamics-theme')) {
            document.documentElement.setAttribute('data-theme', 'default');
        }
    });
    
    // ========== MENÚ HAMBURGUESA ==========
    const burgerToggle = document.getElementById('burgerToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (burgerToggle && navMenu) {
        burgerToggle.addEventListener('click', () => {
            burgerToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        document.querySelectorAll('.nav-link, .submenu a').forEach(link => {
            link.addEventListener('click', () => {
                burgerToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // ========== CURSOR MAGNÉTICO (Desktop) ==========
    if (window.innerWidth > 992) {
        const cursor = document.getElementById('custom-cursor');
        const blurCursor = document.getElementById('custom-cursor-blur');
        
        if (cursor && blurCursor) {
            document.addEventListener('mousemove', (e) => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
                blurCursor.style.transform = `translate3d(${e.clientX - 20}px, ${e.clientY - 20}px, 0)`;
            });
            
            const interactiveElements = document.querySelectorAll('.product-btn, .cta-primary, .cta-secondary, .nav-link, .theme-btn, .pillar-card, .mockup-btn, .social-circle, .ventaja-card, .product-card, .mv-card');
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursor.style.width = '24px';
                    cursor.style.height = '24px';
                    cursor.style.backgroundColor = 'transparent';
                    cursor.style.border = '2px solid var(--primary)';
                    cursor.style.boxShadow = '0 0 20px var(--glow)';
                });
                el.addEventListener('mouseleave', () => {
                    cursor.style.width = '8px';
                    cursor.style.height = '8px';
                    cursor.style.backgroundColor = 'var(--primary)';
                    cursor.style.border = 'none';
                    cursor.style.boxShadow = 'none';
                });
            });
        }
    }
    
    // ========== LATIDO GLOBAL (CSS Dinámico) ==========
    function injectHeartbeatStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes heartbeat {
                0%, 100% { transform: scale(1); }
                14% { transform: scale(1.02); }
                28% { transform: scale(1); }
                42% { transform: scale(1.02); }
                70% { transform: scale(1); }
            }
            
            @keyframes heartbeatGlow {
                0%, 100% { box-shadow: 0 0 10px rgba(0, 240, 255, 0.1); }
                25% { box-shadow: 0 0 25px rgba(0, 240, 255, 0.2); }
                50% { box-shadow: 0 0 10px rgba(0, 240, 255, 0.1); }
                75% { box-shadow: 0 0 25px rgba(0, 240, 255, 0.2); }
            }
            
            .logo-img {
                animation: heartbeat 3s ease-in-out infinite;
            }
            
            .cta-primary {
                animation: heartbeatGlow 3s ease-in-out infinite;
            }
            
            .ecg-path {
                animation: drawPulse 3s linear infinite, heartbeatGlow 2s ease-in-out infinite;
            }
            
            .badge {
                animation: heartbeat 4s ease-in-out infinite;
                display: inline-block;
            }
            
            .product-card .badge {
                animation: heartbeat 3.5s ease-in-out infinite;
            }
            
            .social-circle {
                animation: heartbeat 3s ease-in-out infinite;
                animation-delay: var(--delay, 0s);
            }
            
            .social-circle:nth-child(1) { --delay: 0s; }
            .social-circle:nth-child(2) { --delay: 0.3s; }
            .social-circle:nth-child(3) { --delay: 0.6s; }
            
            .mini-ecg svg {
                animation: heartbeat 2s ease-in-out infinite;
            }
            
            #backToTop {
                animation: heartbeatGlow 2s ease-in-out infinite;
            }
            
            .modal-bjj-container {
                animation: neonPulse 4s ease-in-out infinite, heartbeat 5s ease-in-out infinite;
            }
            
            .product-stats span {
                animation: heartbeat 4s ease-in-out infinite;
                animation-delay: var(--stat-delay, 0s);
            }
            
            .product-stats span:nth-child(1) { --stat-delay: 0s; }
            .product-stats span:nth-child(2) { --stat-delay: 0.4s; }
            .product-stats span:nth-child(3) { --stat-delay: 0.8s; }
            
            .ventaja-card .ventaja-icon {
                animation: heartbeat 3s ease-in-out infinite;
                display: inline-block;
            }
            
            .pillar-card svg {
                animation: heartbeat 3.5s ease-in-out infinite;
            }
            
            .mv-card .mv-icon {
                animation: heartbeat 3s ease-in-out infinite;
                display: inline-block;
            }
            
            .modal-timer-number {
                animation: heartbeat 2s ease-in-out infinite;
                display: inline-block;
            }
        `;
        document.head.appendChild(style);
    }
    injectHeartbeatStyles();
    
    // ========== TILT 3D EN PILARES ==========
    const pillarCards = document.querySelectorAll('.pillar-card');
    pillarCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const xc = rect.width / 2;
            const yc = rect.height / 2;
            const angleX = (yc - y) / 20;
            const angleY = (x - xc) / 20;
            card.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(15px)`;
            card.style.boxShadow = `0 20px 60px rgba(0, 240, 255, 0.15)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
            card.style.boxShadow = 'none';
        });
    });
    
    // ========== TILT EN PRODUCT CARDS ==========
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const xc = rect.width / 2;
            const yc = rect.height / 2;
            const angleX = (yc - y) / 15;
            const angleY = (x - xc) / 15;
            card.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px)`;
            card.style.boxShadow = `0 20px 60px rgba(0, 240, 255, 0.12)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
            card.style.boxShadow = 'none';
        });
    });
    
    // ========== TILT EN VENTAJAS CARDS ==========
    const ventajaCards = document.querySelectorAll('.ventaja-card');
    ventajaCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const xc = rect.width / 2;
            const yc = rect.height / 2;
            const angleX = (yc - y) / 25;
            const angleY = (x - xc) / 25;
            card.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(8px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });
    
    // ========== TILT EN MV CARDS ==========
    const mvCards = document.querySelectorAll('.mv-card');
    mvCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const xc = rect.width / 2;
            const yc = rect.height / 2;
            const angleX = (yc - y) / 25;
            const angleY = (x - xc) / 25;
            card.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(8px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });
    
    // ========== ANIMACIONES SCROLL ==========
    const animatedElements = document.querySelectorAll('.pillar-card, .product-card, .mv-card, .ventaja-card');
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    if (window.innerWidth <= 768) {
        animatedElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }
    
    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
    
    // ========== EFECTO DE ESCRITURA EN TAGLINE ==========
    function initTypeWriter() {
        const tagline = document.querySelector('.hero-tagline');
        if (!tagline) return;
        
        const text = tagline.textContent.trim();
        tagline.textContent = '';
        tagline.style.opacity = '1';
        
        const cursor = document.createElement('span');
        cursor.textContent = '|';
        cursor.style.cssText = `
            color: var(--primary);
            animation: blink 0.7s step-end infinite;
            display: inline-block;
        `;
        tagline.appendChild(cursor);
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        let index = 0;
        function type() {
            if (index < text.length) {
                cursor.before(text.charAt(index));
                index++;
                setTimeout(type, 50 + Math.random() * 30);
            } else {
                cursor.style.animation = 'blink 0.7s step-end infinite';
            }
        }
        setTimeout(type, 500);
    }
    initTypeWriter();
    
    // ========== CONTADOR ANIMADO CON LATIDO FINAL ==========
    function animateCounters() {
        const counters = document.querySelectorAll('.product-stats span');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const text = el.textContent.trim();
                    const match = text.match(/([\d.]+)([K+%]?)/);
                    if (match) {
                        const target = parseFloat(match[1]);
                        const suffix = match[2] || '';
                        let current = 0;
                        const duration = 1500;
                        const steps = 60;
                        const increment = target / steps;
                        let step = 0;
                        
                        const interval = setInterval(() => {
                            step++;
                            current += increment;
                            if (step >= steps) {
                                current = target;
                                clearInterval(interval);
                                el.style.transition = 'transform 0.3s ease';
                                el.style.transform = 'scale(1.15)';
                                setTimeout(() => {
                                    el.style.transform = 'scale(1)';
                                }, 300);
                            }
                            if (suffix === 'K+') {
                                el.textContent = `${Math.round(current)}K+`;
                            } else if (suffix === '%') {
                                el.textContent = `${Math.round(current)}%`;
                            } else {
                                el.textContent = text.replace(/[\d.]+/, Math.round(current));
                            }
                        }, duration / steps);
                    }
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(el => observer.observe(el));
    }
    setTimeout(animateCounters, 500);
    
    // ========== BOTÓN VOLVER ARRIBA CON LATIDO ==========
    function initBackToTop() {
        const btn = document.createElement('button');
        btn.innerHTML = '↑';
        btn.id = 'backToTop';
        btn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 55px;
            height: 55px;
            border-radius: 50%;
            border: 2px solid var(--primary);
            background: rgba(10, 10, 22, 0.85);
            backdrop-filter: blur(12px);
            color: var(--primary);
            font-size: 1.5rem;
            font-weight: 700;
            cursor: pointer;
            z-index: 999;
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px) scale(0.8);
            transition: all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1);
            box-shadow: 0 0 30px rgba(0, 240, 255, 0.1);
            font-family: 'Plus Jakarta Sans', sans-serif;
            animation: heartbeatGlow 2s ease-in-out infinite;
        `;
        
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'scale(1.15)';
            btn.style.boxShadow = '0 0 60px rgba(0, 240, 255, 0.3)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'scale(1)';
            btn.style.boxShadow = '0 0 30px rgba(0, 240, 255, 0.1)';
        });
        
        btn.addEventListener('click', () => {
            btn.style.transform = 'scale(0.8)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100);
        });
        
        document.body.appendChild(btn);
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY > 500) {
                btn.style.opacity = '1';
                btn.style.visibility = 'visible';
                btn.style.transform = 'translateY(0) scale(1)';
            } else {
                btn.style.opacity = '0';
                btn.style.visibility = 'hidden';
                btn.style.transform = 'translateY(20px) scale(0.8)';
            }
        });
    }
    initBackToTop();
    
    // ========== GLITCH EN LOGO ==========
    function initLogoGlitch() {
        const logo = document.querySelector('.logo-img');
        if (!logo) return;
        
        const originalSrc = logo.src;
        const glitchChars = ['░', '▒', '▓', '█', '▄', '▌', '▐', '▀', '■', '□'];
        
        logo.addEventListener('mouseenter', () => {
            let count = 0;
            const maxGlitches = 10;
            const interval = setInterval(() => {
                if (count >= maxGlitches) {
                    clearInterval(interval);
                    logo.style.filter = 'none';
                    logo.src = originalSrc;
                    return;
                }
                
                logo.style.filter = `hue-rotate(${Math.random() * 30}deg) brightness(${1 + Math.random() * 0.4}) contrast(${1 + Math.random() * 0.3})`;
                
                if (count % 2 === 0) {
                    const canvas = document.createElement('canvas');
                    canvas.width = 48;
                    canvas.height = 48;
                    const ctx = canvas.getContext('2d');
                    const hue = Math.random() * 360;
                    ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
                    ctx.fillRect(0, 0, 48, 48);
                    ctx.fillStyle = '#000';
                    ctx.font = '20px monospace';
                    ctx.fillText(glitchChars[Math.floor(Math.random() * glitchChars.length)], 10, 35);
                    logo.src = canvas.toDataURL();
                } else {
                    logo.src = originalSrc;
                }
                
                count++;
            }, 70);
        });
        
        logo.addEventListener('mouseleave', () => {
            logo.style.filter = 'none';
            logo.src = originalSrc;
        });
    }
    initLogoGlitch();
    
    // ========== SPLASH SCREEN ==========
    function initSplashScreen() {
        if (sessionStorage.getItem('splashShown')) return;
        
        const splash = document.createElement('div');
        splash.id = 'splashScreen';
        splash.style.cssText = `
            position: fixed;
            inset: 0;
            background: radial-gradient(circle at center, #0a0a16, #030307);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            transition: opacity 0.8s ease, visibility 0.8s ease;
        `;
        
        splash.innerHTML = `
            <div style="text-align: center; animation: splashPulse 1.5s ease-in-out infinite;">
                <img src="assets/logo.png" alt="JLDynamics" style="width: 80px; height: 80px; border-radius: 20px; margin-bottom: 1.5rem; box-shadow: 0 0 60px rgba(0, 240, 255, 0.2); animation: heartbeat 2s ease-in-out infinite;" 
                     onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Crect width=%22100%22 height=%22100%22 fill=%22%2300f0ff%22/%3E%3Ctext x=%2250%22 y=%2265%22 text-anchor=%22middle%22 fill=%22%23000%22 font-size=%2240%22 font-weight=%22bold%22%3EJD%3C/text%3E%3C/svg%3E'">
                <h2 style="font-family: 'Montserrat', sans-serif; font-size: 1.8rem; font-weight: 800; background: linear-gradient(90deg, var(--primary), var(--secondary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">JLDynamics</h2>
                <p style="color: var(--text-muted); font-size: 0.8rem; letter-spacing: 4px; margin-top: 0.5rem;">INICIANDO SISTEMA...</p>
                <div style="margin-top: 1.5rem; width: 120px; height: 2px; background: rgba(255,255,255,0.05); border-radius: 2px; overflow: hidden; margin-left: auto; margin-right: auto;">
                    <div style="width: 100%; height: 100%; background: linear-gradient(90deg, var(--primary), var(--secondary)); animation: splashProgress 1.5s ease-in-out forwards;"></div>
                </div>
                <div style="margin-top: 0.5rem; display: flex; gap: 6px; justify-content: center;">
                    <span style="width: 4px; height: 4px; background: var(--primary); border-radius: 50%; animation: heartbeat 1s ease-in-out infinite; display: inline-block;"></span>
                    <span style="width: 4px; height: 4px; background: var(--secondary); border-radius: 50%; animation: heartbeat 1.3s ease-in-out infinite; display: inline-block;"></span>
                    <span style="width: 4px; height: 4px; background: var(--primary); border-radius: 50%; animation: heartbeat 1.6s ease-in-out infinite; display: inline-block;"></span>
                </div>
            </div>
            <style>
                @keyframes splashPulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.02); }
                }
                @keyframes splashProgress {
                    0% { width: 0%; }
                    100% { width: 100%; }
                }
                @keyframes heartbeat {
                    0%, 100% { transform: scale(1); opacity: 0.3; }
                    25% { transform: scale(1.5); opacity: 1; }
                    50% { transform: scale(1); opacity: 0.3; }
                }
            </style>
        `;
        
        document.body.appendChild(splash);
        
        setTimeout(() => {
            splash.style.opacity = '0';
            splash.style.visibility = 'hidden';
            setTimeout(() => {
                splash.remove();
                sessionStorage.setItem('splashShown', 'true');
            }, 800);
        }, 1800);
    }
    initSplashScreen();
    
    // ========== RIPPLE EFFECT EN BOTONES ==========
    function initRippleEffect() {
        const buttons = document.querySelectorAll('.product-btn, .cta-primary, .modal-btn, .cta-secondary');
        
        buttons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const ripple = document.createElement('span');
                ripple.style.cssText = `
                    position: absolute;
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(0, 240, 255, 0.3), transparent);
                    transform: translate(${x - 50}px, ${y - 50}px) scale(0);
                    animation: rippleEffect 0.6s ease-out forwards;
                    pointer-events: none;
                    z-index: 0;
                `;
                
                if (!document.getElementById('rippleStyles')) {
                    const style = document.createElement('style');
                    style.id = 'rippleStyles';
                    style.textContent = `
                        @keyframes rippleEffect {
                            0% { transform: translate(${x - 50}px, ${y - 50}px) scale(0); opacity: 1; }
                            100% { transform: translate(${x - 50}px, ${y - 50}px) scale(4); opacity: 0; }
                        }
                    `;
                    document.head.appendChild(style);
                }
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
    initRippleEffect();
    
    // ========== SCROLL PROGRESS BAR ==========
    function initScrollProgress() {
        const bar = document.createElement('div');
        bar.id = 'scrollProgress';
        bar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 2px;
            background: linear-gradient(90deg, var(--primary), var(--secondary), var(--neon-magenta));
            z-index: 9999;
            transition: width 0.1s ease;
            box-shadow: 0 0 20px rgba(0, 240, 255, 0.3);
        `;
        document.body.appendChild(bar);
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            bar.style.width = progress + '%';
        });
    }
    initScrollProgress();
    
    // ========== PARALLAX EN HERO ==========
    function initParallax() {
        const hero = document.querySelector('.hero-section');
        if (!hero) return;
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const heroContent = hero.querySelector('.hero-content');
            if (heroContent && scrollY < window.innerHeight) {
                const offset = scrollY * 0.3;
                heroContent.style.transform = `translateY(${offset}px)`;
                heroContent.style.opacity = 1 - (scrollY / window.innerHeight) * 0.3;
            }
        }, { passive: true });
    }
    initParallax();
    
    // ========== FLOATING ICONS EN VENTAJAS ==========
    function initFloatingIcons() {
        const icons = document.querySelectorAll('.ventaja-card span');
        icons.forEach((icon, index) => {
            icon.style.display = 'inline-block';
            icon.style.animation = `floatIcon ${2 + index * 0.3}s ease-in-out infinite`;
            icon.style.animationDelay = `${index * 0.2}s`;
        });
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatIcon {
                0%, 100% { transform: translateY(0) rotate(0deg); }
                50% { transform: translateY(-8px) rotate(5deg); }
            }
        `;
        document.head.appendChild(style);
    }
    initFloatingIcons();

    // ================================================================
    // 🕵️ EASTER EGG: SISTEMA ACTIVO (HACKING THEME)
    // ================================================================
    // 
    // 📌 CÓMO FUNCIONA:
    //    1. Haz clic 10 veces en "SISTEMA ACTIVO" (mini-header móvil)
    //    2. Se genera un número aleatorio del 1 al 10
    //    3. Si sale 1, redirige a multi-agente/index.html
    //    4. Si sale otro número, reinicia el contador
    //    5. Mensajes de hacking en consola para desarrolladores
    //
    // 📝 EDITAR MENSAJES: Busca la variable 'mensajesHacking' abajo
    // 📝 EDITAR RUTA: Busca 'window.location.href' abajo
    // ================================================================

    (function() {
        // ============================================================
        // 1. ELEMENTO OBJETIVO
        // ============================================================
        const target = document.getElementById('easterEggTarget');
        if (!target) {
            console.warn('⚠️ Easter Egg: No se encontró #easterEggTarget');
            return;
        }

        // ============================================================
        // 2. MENSAJES DE HACKING (EDITA AQUÍ PARA CAMBIARLOS)
        // ============================================================
        const mensajesHacking = [
            "🔓 Persevera, los sistemas no se abren fácilmente...",
            "💻 El hacking es de paciencia y constancia.",
            "⚡ No hay sistema seguro si el usuario es el eslabón débil.",
            "🖥️ El conocimiento es el mejor exploit.",
            "🔥 La persistencia vence a la seguridad más robusta.",
            "📡 Conectando con la matriz... Acceso denegado.",
            "🌀 El firewall solo retrasa lo inevitable.",
            "💀 01101100 01110101 01100011 01101000 01101001 01110100 01101111",
            "🔐 Las puertas se abren con el tiempo, no con la fuerza.",
            "🧠 El mejor hacker es el que nunca se rinde.",
            "⚔️ El tatami no perdona, el código tampoco.",
            "🌐 La red es tu aliada si sabes cómo usarla.",
            "🛡️ El sistema está vigilado. Pero tú también.",
            "💡 El conocimiento es poder. El poder es responsabilidad."
        ];

        // ============================================================
        // 3. ESTADO DEL EASTER EGG
        // ============================================================
        let clickCount = 0;
        let isActivated = false;
        let resetTimeout = null;

        // ============================================================
        // 4. FUNCIONES AUXILIARES
        // ============================================================

        // Log con estilo hacker en consola
        function logHacker(msg) {
            console.log(`%c🔒 ${msg}`, 'color: #00E5FF; font-weight: bold; font-size: 12px;');
        }

        // Vibración (solo móvil con soporte)
        function vibrar(ms) {
            if (navigator.vibrate) {
                navigator.vibrate(ms);
            }
        }

        // Mostrar mensaje de fallo en el elemento
        function mostrarFallo(numero) {
            target.textContent = `◆ SISTEMA ACTIVO (${numero})`;
            target.style.color = '#FF4444';
            setTimeout(() => {
                target.textContent = '◆ SISTEMA ACTIVO';
                target.style.color = '';
            }, 2500);
        }

        // ============================================================
        // 5. EVENTO PRINCIPAL: CLIC EN "SISTEMA ACTIVO"
        // ============================================================
        target.addEventListener('click', function(e) {
            e.stopPropagation();

            // Si ya está activado, ignorar
            if (isActivated) {
                logHacker('⛔ Ya activado, espera el reinicio...');
                return;
            }

            // Incrementar contador
            clickCount++;

            // === EFECTO VISUAL: parpadeo sutil ===
            this.classList.remove('easter-active');
            void this.offsetWidth; // Forzar reflow para reiniciar animación
            this.classList.add('easter-active');

            // === VIBRACIÓN: 10ms (sutil) ===
            vibrar(10);

            // === LOG EN CONSOLA ===
            logHacker(`Clic ${clickCount}/10`);

            // ============================================================
            // 6. SI LLEGA A 10 CLICS
            // ============================================================
            if (clickCount >= 10) {
                isActivated = true;
                
                // Vibración especial (3 pulsos)
                vibrar([50, 30, 50]);

                // Generar número aleatorio 1-10
                const randomNum = Math.floor(Math.random() * 10) + 1;
                logHacker(`🎲 Número generado: ${randomNum}`);

                // Mensaje aleatorio de hacking
                const msgIndex = Math.floor(Math.random() * mensajesHacking.length);
                logHacker(`💀 ${mensajesHacking[msgIndex]}`);

                // ============================================================
                // 7. REDIRECCIÓN (SI SALE 1)
                // ============================================================
                // 📝 EDITAR RUTA: Cambia 'multi-agente/index.html' por tu ruta
                // ============================================================
                if (randomNum === 1) {
                    logHacker('🚀 EASTER EGG ACTIVADO! Abriendo multi-agente...');
                    setTimeout(() => {
                        window.location.href = 'multi-agente/index.html';
                    }, 500);
                } else {
                    logHacker(`❌ Intenta de nuevo (necesitas 1, sacaste ${randomNum})`);
                    mostrarFallo(randomNum);
                    
                    // Reiniciar contador después de 3 segundos
                    setTimeout(() => {
                        clickCount = 0;
                        isActivated = false;
                        logHacker('🔄 Contador reiniciado. ¡Sigue intentando!');
                    }, 3000);
                }
            } else {
                // ============================================================
                // 8. REINICIO POR INACTIVIDAD (5 segundos sin clics)
                // ============================================================
                if (resetTimeout) {
                    clearTimeout(resetTimeout);
                }
                resetTimeout = setTimeout(() => {
                    if (!isActivated && clickCount > 0) {
                        clickCount = 0;
                        logHacker('🔄 Contador reiniciado por inactividad');
                    }
                }, 5000);
            }
        });

        // ============================================================
        // 9. REINICIO SI EL USUARIO HACE CLIC FUERA
        // ============================================================
        document.addEventListener('click', function(e) {
            if (!e.target.closest('#easterEggTarget') && clickCount > 0 && !isActivated) {
                clickCount = 0;
                if (resetTimeout) {
                    clearTimeout(resetTimeout);
                    resetTimeout = null;
                }
                target.textContent = '◆ SISTEMA ACTIVO';
                target.style.color = '';
                logHacker('🔄 Contador reiniciado (clic fuera)');
            }
        });

        // ============================================================
        // 10. LOG DE INICIO
        // ============================================================
        logHacker('🕵️ Easter Egg "SISTEMA ACTIVO" cargado. 10 clics para activar.');
        logHacker('📝 Mensajes de hacking listos. ¡Suerte!');
    })();

        // ================================================================
    // 🥚 EASTER EGG: FOOTER "JLDynamics" → 10 clics → Oracle
    // ================================================================

    (function() {
        // Elemento objetivo (el título "JLDynamics" en el footer)
        const trigger = document.getElementById('easterEggFooter');
        if (!trigger) {
            console.warn('⚠️ Easter Egg Footer: No se encontró #easterEggFooter');
            return;
        }

        const messageElement = document.getElementById('easterEggMessage');
        if (!messageElement) {
            console.warn('⚠️ Easter Egg Footer: No se encontró #easterEggMessage');
            return;
        }

        // ============================================================
        // MENSAJES DEL EASTER EGG (Puedes editarlos aquí)
        // ============================================================
        const messages = [
            "🚀 ¡Has descubierto el easter egg!",
            "🔐 Seguridad física: 100%",
            "💻 Código fuente: protegido",
            "🛡️ Firewall activado",
            "⚡ JLDynamics: nivel 99",
            "🎮 Modo desarrollador: ON",
            "🌟 Innovación sin límites... literal",
            "🔧 Debug mode: activado",
            "📡 Conectando con la matrix...",
            "🎯 ¡BINGO! Has llegado al nivel 10"
        ];

        let clickCount = 0;
        let isAnimating = false;
        let resetTimeout = null;

        // Función para cambiar el mensaje
        function changeMessage(index) {
            if (isAnimating) return;
            isAnimating = true;

            // Fade out
            messageElement.style.transition = 'opacity 0.3s ease';
            messageElement.style.opacity = '0';

            setTimeout(() => {
                if (index < messages.length) {
                    // Mostrar mensaje normal
                    messageElement.textContent = messages[index];
                    // Efecto de color temporal
                    messageElement.style.color = '#00f0ff';
                    setTimeout(() => {
                        messageElement.style.color = '';
                    }, 1000);
                } else {
                    // Caso especial: décimo click → Redirigir a Oracle
                    messageElement.textContent = '🔄 ¡Redirigiendo a Oracle...!';
                    messageElement.style.color = '#ff6b6b';

                                        // Redirigir después de 1.5 segundos
                    setTimeout(() => {
                        window.location.href = 'oracle.html';
                    }, 1500);
                }

                messageElement.style.opacity = '1';
                isAnimating = false;
            }, 300);
        }

        // ============================================================
        // MANEJADOR DE EVENTOS (Click y Touch)
        // ============================================================
        function handleInteraction(e) {
            e.preventDefault();
            e.stopPropagation();

            // Si ya se disparó la redirección, no hacer nada
            if (clickCount >= messages.length) return;

            clickCount++;

            // Feedback visual: escala y efecto
            trigger.style.transition = 'transform 0.2s ease, color 0.2s ease';
            trigger.style.transform = 'scale(0.95)';
            trigger.style.color = '#00f0ff';
            setTimeout(() => {
                trigger.style.transform = 'scale(1)';
                trigger.style.color = '';
            }, 200);

            // Vibrar en móviles (sutil)
            if (navigator.vibrate) {
                navigator.vibrate(10);
            }

            // Log en consola
            console.log(`🕵️ Easter Egg Footer: Click ${clickCount}/${messages.length}`);

            // Cambiar mensaje
            if (clickCount < messages.length) {
                changeMessage(clickCount);
            } else if (clickCount === messages.length) {
                // Último mensaje del array
                changeMessage(clickCount - 1);
                // Marcamos que ya se disparó
                clickCount = messages.length + 1;
            }

            // Reiniciar por inactividad (5 segundos)
            if (resetTimeout) {
                clearTimeout(resetTimeout);
            }
            resetTimeout = setTimeout(() => {
                if (clickCount < messages.length) {
                    clickCount = 0;
                    messageElement.textContent = 'Ingeniería en Software y Seguridad Física. Innovación sin límites.';
                    messageElement.style.color = '';
                    console.log('🔄 Easter Egg Footer: Reiniciado por inactividad');
                }
            }, 5000);
        }

        // ============================================================
        // ASIGNAR EVENTOS
        // ============================================================
        trigger.addEventListener('click', handleInteraction);
        trigger.addEventListener('touchstart', handleInteraction, { passive: false });

        // ============================================================
        // REINICIO SI HACE CLIC FUERA
        // ============================================================
        document.addEventListener('click', function(e) {
            if (!e.target.closest('#easterEggFooter') && clickCount > 0 && clickCount < messages.length) {
                clickCount = 0;
                if (resetTimeout) {
                    clearTimeout(resetTimeout);
                    resetTimeout = null;
                }
                messageElement.textContent = 'Ingeniería en Software y Seguridad Física. Innovación sin límites.';
                messageElement.style.color = '';
                console.log('🔄 Easter Egg Footer: Reiniciado (clic fuera)');
            }
        });

                console.log('🥚 Easter Egg Footer cargado: 10 clics en "JLDynamics" → oracle.html');
        console.log('📝 Mensajes:', messages);
    })();

    console.log('🚀 JLDynamics - Core Inicializado | Modo 11/10 Activado');
    console.log('❤️ Latidos: LOGO | ECG | BADGES | SOCIAL | MODAL | STATS | ICONS');
    console.log('⚡ Efectos: TILT | TYPEWRITER | COUNTERS | GLITCH | RIPPLE | PARALLAX | FLOATING');
    console.log('📊 Scroll: PROGRESS BAR | BACK TO TOP | SCROLL ANIMATIONS');
    console.log('🥚 Easter Egg Footer: 10 clics en "JLDynamics" → Oracle');
});