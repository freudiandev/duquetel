/**
 * Duquetel - Script principal
 * Scripts profesionales y elegantes
 * Combinando profesionalismo y elementos visuales llamativos
 * Utilizando los colores corporativos: verde, azul, blanco y negro
 */
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar efectos elegantes
    initializeParticleEffect();
    initializeScrollReveal();
    initializeCardEffects();
    initializeLogoDecorators();
    
    // Inicializar colores del navbar
    updateNavbarColors(window.scrollY > 20);

    // Comportamiento de navegación móvil
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarMobile = document.getElementById('navbarMobile');
    const navbarOverlay = document.getElementById('navbarOverlay');
    
    if (navbarToggler && navbarMobile && navbarOverlay) {
        navbarToggler.addEventListener('click', function() {
            navbarMobile.classList.toggle('show');
            navbarOverlay.classList.toggle('active');
        });
        
        navbarOverlay.addEventListener('click', function() {
            navbarMobile.classList.remove('show');
            this.classList.remove('active');
        });
        
        document.querySelectorAll('#navbarMobile .nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navbarMobile.classList.remove('show');
                navbarOverlay.classList.remove('active');
            });
        });
    }
    
    // Mejora de accesibilidad para elementos interactivos
    document.querySelectorAll('a, button').forEach(element => {
        if (!element.getAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
        }
    });

    // Mejorar experiencia en formularios
    document.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        field.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
    
    // FunciÃ³n para hacer efecto de shake en elementos invÃ¡lidos
    function shakeElement(element) {
        element.style.animation = 'shake 0.5s';
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
    }

    // ValidaciÃ³n de formulario con efectos
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    shakeElement(input);
                    input.style.borderColor = '#ff4444';
                    isValid = false;
                } else {
                    input.style.borderColor = 'var(--neon-cyan)';
                }
            });
            
            if (isValid) {
                // Simular envÃ­o exitoso
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>MENSAJE ENVIADO';
                submitBtn.style.background = 'linear-gradient(45deg, #00ff88, #00ffff)';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    form.reset();
                }, 3000);
            }
        });
    }

    // Efectos especiales para CTAs irresistibles
    document.querySelectorAll('.cta-irresistible').forEach(cta => {
        cta.style.opacity = '0';
        observer.observe(cta);
        
        // Efecto de pulso en CTAs cuando aparecen
        cta.addEventListener('animationend', function() {
            this.style.animation = 'electricPulse 4s infinite';
        });
    });

    // Efectos en botones de llamada y WhatsApp
    document.querySelectorAll('.btn-call, .btn-whatsapp').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.animation = 'electricPulse 1s infinite';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.animation = '';
        });
        
        // Efecto de clic
        btn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // AnimaciÃ³n de nÃºmeros/contadores en CTAs
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }

    // Detectar elementos con nÃºmeros y animarlos
    document.querySelectorAll('.cta-urgency').forEach(element => {
        const text = element.textContent;
        const numbers = text.match(/\d+/g);
        if (numbers) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Simular contador descendente para urgencia
                        if (text.includes('quedan') || text.includes('Ãºltimos')) {
                            const currentNumber = parseInt(numbers[0]);
                            let counter = currentNumber + 5;
                            const countdown = setInterval(() => {
                                if (counter > currentNumber) {
                                    element.textContent = text.replace(numbers[0], counter);
                                    counter--;
                                } else {
                                    clearInterval(countdown);
                                }
                            }, 200);
                        }
                    }
                });
            });
            observer.observe(element);
        }
    });

    // Efecto de urgencia parpadeante
    setInterval(() => {
        document.querySelectorAll('.cta-urgency').forEach(element => {
            element.style.textShadow = '0 0 20px var(--neon-green)';
            setTimeout(() => {
                element.style.textShadow = '0 0 10px var(--neon-cyan)';
            }, 500);
        });
    }, 3000);

    // === FUNCIONALIDAD NAVBAR HAMBURGUESA OPTIMIZADA === //
    
    // Variables del navbar
    // Reutilizamos las variables ya declaradas anteriormente
    const navbarCollapse = document.querySelector('.navbar-collapse');
    // Reutilizamos navbarOverlay ya declarado anteriormente
    const navLinks = document.querySelectorAll('.navbar-nav-mobile .nav-link');
    
    // FunciÃ³n para abrir el menÃº (INSTANTÃNEA)
    function openMobileMenu() {
        // Optimizar con requestAnimationFrame para mejor rendimiento
        requestAnimationFrame(() => {
            navbarCollapse.classList.add('show');
            navbarOverlay.classList.add('show');
            navbarToggler.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // FunciÃ³n para cerrar el menÃº (INSTANTÃNEA)
    function closeMobileMenu() {
        requestAnimationFrame(() => {
            navbarCollapse.classList.remove('show');
            navbarOverlay.classList.remove('show');
            navbarToggler.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    }
    
    // Event listener optimizado para el botÃ³n hamburguesa
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            if (isExpanded) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }
    
    // Cerrar menÃº al hacer click en el overlay (OPTIMIZADO)
    if (navbarOverlay) {
        navbarOverlay.addEventListener('click', closeMobileMenu);
    }
    
    // Cerrar menÃº al hacer click en un enlace (SIN DELAY)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu(); // Removido el setTimeout para que sea instantÃ¡neo
        });
    });
    
    // Cerrar menÃº con tecla ESC (OPTIMIZADO)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navbarCollapse.classList.contains('show')) {
            closeMobileMenu();
        }
    });
    
    // Cerrar menÃº al cambiar el tamaÃ±o de pantalla (OPTIMIZADO)
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth >= 992) {
                closeMobileMenu();
            }
        }, 100);
    });
    
    // Efecto de pulso en el botÃ³n hamburguesa cuando estÃ¡ activo (OPTIMIZADO)
    function pulseHamburger() {
        if (navbarToggler && navbarToggler.getAttribute('aria-expanded') === 'true') {
            navbarToggler.style.boxShadow = '0 0 25px var(--neon-cyan)';
            setTimeout(() => {
                if (navbarToggler) {
                    navbarToggler.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.3)';
                }
            }, 500);
        }
    }
    
    // Pulso cada 2 segundos cuando el menÃº estÃ¡ abierto
    setInterval(pulseHamburger, 2000);
    
    // Detectar toque/swipe para cerrar menÃº en dispositivos mÃ³viles (OPTIMIZADO)
    let startY = 0;
    let startX = 0;
    
    document.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
        startX = e.touches[0].clientX;
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
        if (!navbarCollapse.classList.contains('show')) return;
        
        const endY = e.changedTouches[0].clientY;
        const endX = e.changedTouches[0].clientX;
        const diffY = startY - endY;
        const diffX = startX - endX;
        
        // Swipe hacia arriba para cerrar
        if (diffY > 50 && Math.abs(diffX) < 100) {
            closeMobileMenu();
        }
        
        // Swipe hacia la derecha para cerrar
        if (diffX < -100 && Math.abs(diffY) < 50) {
            closeMobileMenu();
        }
    });
    
    // AnimaciÃ³n de entrada de los elementos del menÃº
    function animateMenuItems() {
        const menuItems = document.querySelectorAll('.navbar-nav-mobile .nav-item');
        menuItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'translateX(0)';
                item.style.opacity = '1';
            }, index * 100);
        });
    }
    
    // Ejecutar animaciÃ³n cuando se abre el menÃº
    const originalOpenMenu = openMobileMenu;
    openMobileMenu = function() {
        originalOpenMenu();
        setTimeout(animateMenuItems, 100);
    };

    // === FIN FUNCIONALIDAD NAVBAR === //

    // Todos los efectos para el logo han sido eliminados
    const duquetelLogo = document.querySelector('.duquetel-logo');
    // No se aplican efectos al logo
});

/**
 * Efectos elegantes y sofisticados
 * Funciones para crear elementos visuales atractivos y profesionales
 */

// Inicializa efecto de partÃ­culas sutiles en el hero
function initializeParticleEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Contenedor de partÃ­culas
    const particleContainer = document.createElement('div');
    particleContainer.className = 'elegant-particles';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 1;
        opacity: 0.7;
        pointer-events: none;
    `;
    
    // Crear partÃ­culas
    const particleCount = 20; // Reducido para un efecto mÃ¡s sutil y profesional
    for (let i = 0; i < particleCount; i++) {
        createParticle(particleContainer);
    }
    
    // Insertar antes del primer hijo para que estÃ© detrÃ¡s del contenido
    hero.insertBefore(particleContainer, hero.firstChild);
}

// Crea una partÃ­cula individual
function createParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 2; // TamaÃ±o mÃ¡s pequeÃ±o para sutileza
    
    // Colores basados en la paleta corporativa
    const colors = [
        'rgba(0, 91, 140, 0.3)', // Azul corporativo
        'rgba(26, 179, 100, 0.3)', // Verde corporativo
        'rgba(255, 255, 255, 0.4)' // Blanco
    ];
    
    particle.style.cssText = `
        position: absolute;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: 50%;
        width: ${size}px;
        height: ${size}px;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        box-shadow: 0 0 8px 1px rgba(255, 255, 255, 0.2);
        transform: scale(0);
        opacity: 0;
        transition: transform 1.5s ease-out, opacity 1.5s ease-out;
    `;
    
    container.appendChild(particle);
    
    // Aplicar animaciÃ³n despuÃ©s de un retraso aleatorio
    setTimeout(() => {
        particle.style.transform = 'scale(1)';
        particle.style.opacity = '1';
        
        // Iniciar movimiento flotante
        animateParticleMovement(particle);
    }, Math.random() * 2000);
}

// Anima el movimiento de una partÃ­cula
function animateParticleMovement(particle) {
    // Movimiento mÃ¡s sutil y profesional
    const xMovement = Math.random() * 20 - 10;
    const yMovement = Math.random() * 20 - 10;
    const duration = Math.random() * 8 + 12;
    
    // Usar Web Animation API para mejor rendimiento
    const animation = particle.animate([
        { transform: 'translate(0, 0)' },
        { transform: `translate(${xMovement}px, ${yMovement}px)` },
        { transform: 'translate(0, 0)' }
    ], {
        duration: duration * 1000,
        iterations: Infinity,
        easing: 'ease-in-out'
    });
    
    // Efecto de brillo sutil
    setInterval(() => {
        const shadow = '0 0 10px 3px rgba(255, 255, 255, 0.3)';
        particle.style.boxShadow = shadow;
        setTimeout(() => {
            particle.style.boxShadow = '0 0 8px 1px rgba(255, 255, 255, 0.2)';
        }, 1000);
    }, Math.random() * 5000 + 5000);
}

// Inicializa efectos de revelaciÃ³n al hacer scroll
function initializeScrollReveal() {
    // Elementos que aparecerÃ¡n con efecto al hacer scroll
    const elements = document.querySelectorAll('.feature-card, h2, .card, .section-title');
    
    // ConfiguraciÃ³n del observador de intersecciÃ³n
    const options = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Crear el observador
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    // Preparar y observar los elementos
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(el);
    });
}

// Inicializa efectos para las tarjetas
function initializeCardEffects() {
    const cards = document.querySelectorAll('.feature-card, .card');
    
    cards.forEach(card => {
        // Efecto de hover
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
            
            // AÃ±adir borde elegante
            const borderHighlight = document.createElement('div');
            borderHighlight.className = 'card-border-highlight';
            borderHighlight.style.cssText = `
                position: absolute;
                bottom: 0;
                left: 0;
                height: 3px;
                width: 0;
                background: linear-gradient(90deg, var(--primary), var(--accent));
                transition: width 0.3s ease;
            `;
            
            // Solo si no tiene ya un borde
            if (!this.querySelector('.card-border-highlight')) {
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(borderHighlight);
                
                // Animar el borde
                setTimeout(() => {
                    borderHighlight.style.width = '100%';
                }, 50);
            }
        });
        
        // Quitar efectos al salir
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
            
            const borderHighlight = this.querySelector('.card-border-highlight');
            if (borderHighlight) {
                borderHighlight.style.width = '0';
                
                // Eliminar despuÃ©s de la animaciÃ³n
                setTimeout(() => {
                    try {
                        this.removeChild(borderHighlight);
                    } catch (e) {
                        // Evitar errores si ya fue eliminado
                    }
                }, 300);
            }
        });
    });
}

// CSS adicional para los efectos elegantes y profesionales
const additionalStyles = `
/* Estilos para efectos de scroll */
.revealed {
    opacity: 1 !important;
    transform: translateY(0) !important;
}

/* AnimaciÃ³n sutil para elementos con hover */
.elegant-hover {
    transition: all 0.3s ease-out;
}
.elegant-hover:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

/* Animaciones para tarjetas y elementos */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes subtleGlow {
    0% {
        box-shadow: 0 5px 15px rgba(0, 91, 140, 0.2);
    }
    50% {
        box-shadow: 0 5px 25px rgba(26, 179, 100, 0.3);
    }
    100% {
        box-shadow: 0 5px 15px rgba(0, 91, 140, 0.2);
    }
}

/* Mejoras para botones */
.btn-primary, .btn-secondary {
    transition: all 0.3s ease;
}
.btn-primary:hover, .btn-secondary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

/* Efecto de borde para botones */
.btn-border-effect {
    position: relative;
    overflow: hidden;
}
.btn-border-effect:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--primary), var(--accent));
    transition: width 0.3s ease;
}
.btn-border-effect:hover:before {
    width: 100%;
}

/* AnimaciÃ³n para banner CTA */
@keyframes bannerGlow {
    0% {
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
    50% {
        box-shadow: 0 10px 30px rgba(26, 179, 100, 0.2);
    }
    100% {
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
}
`;

// Insertar estilos adicionales
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);


/* ========== ELEGANT HEADER FUNCTIONALITY ========== */
/**
 * Duquetel - Scripts especÃ­ficos para el header elegante
 * Efectos y funcionalidades para el header corporativo
 */

document.addEventListener('DOMContentLoaded', function() {
    // AÃ±adir clase de animaciÃ³n al header despuÃ©s de cargar
    const header = document.querySelector('header');
    if (header) {
        setTimeout(() => {
            header.classList.add('header-animated');
        }, 200);
        
        // Efecto al hacer scroll
        window.addEventListener('scroll', function() {
            if (window.scrollY > 20) {
                header.classList.add('scrolled');
                updateNavbarColors(true); // Fondo oscuro
            } else {
                header.classList.remove('scrolled');
                updateNavbarColors(false); // Fondo claro
            }
        });
        
        // Verificar scroll inicial
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
            updateNavbarColors(true);
        } else {
            updateNavbarColors(false);
        }
    }
    
    // AÃ±adir decoradores al header
    const headerContent = document.querySelector('.header-content');
    if (headerContent) {
        // AÃ±adir decorador inferior
        const decorator = document.createElement('div');
        decorator.className = 'header-decorator';
        headerContent.appendChild(decorator);
        
        // AÃ±adir efecto de brillo
        const glow = document.createElement('div');
        glow.className = 'header-glow';
        headerContent.appendChild(glow);
        
        // Efecto de movimiento sutil para el brillo
        document.addEventListener('mousemove', function(e) {
            if (window.innerWidth > 768) { // Solo en pantallas grandes
                const mouseX = e.clientX / window.innerWidth;
                const mouseY = e.clientY / window.innerHeight;
                
                // Mover ligeramente el brillo segÃºn la posiciÃ³n del ratÃ³n
                glow.style.opacity = 0.3 + (mouseY * 0.3);
                glow.style.transform = `translateX(${(mouseX - 0.5) * 20}px)`;
            }
        });
    }
    
    // AÃ±adir indicador activo al enlace actual
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Optimizar la carga de elementos
    window.addEventListener('load', function() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
    });
    
    // Efectos de hover para las barras de adorno del logo
    initializeLogoDecorators();
});

/**
 * Inicializa los efectos de hover para las barras decorativas del logo
 */
function initializeLogoDecorators() {
    const headerLogo = document.querySelector('.header-logo');
    
    if (headerLogo) {
        // Mostrar barras al hacer hover
        headerLogo.addEventListener('mouseenter', function() {
            this.classList.add('show-decorators');
        });
        
        // Ocultar barras al quitar el hover
        headerLogo.addEventListener('mouseleave', function() {
            this.classList.remove('show-decorators');
        });
        
        // Añadir soporte táctil para dispositivos móviles
        headerLogo.addEventListener('touchstart', function() {
            this.classList.add('show-decorators');
        });
        
        // Remover decoradores después de un tiempo en dispositivos táctiles
        headerLogo.addEventListener('touchend', function() {
            const self = this;
            setTimeout(function() {
                self.classList.remove('show-decorators');
            }, 2000); // Ocultar después de 2 segundos
        });
    }
}

/**
 * Actualiza los colores del navbar según el estado del header
 * @param {boolean} isDarkBackground - true si el fondo es oscuro, false si es claro
 */
function updateNavbarColors(isDarkBackground) {
    const navLinks = document.querySelectorAll('.navbar-responsive .nav-link');
    const mobileNavLinks = document.querySelectorAll('.navbar-nav-mobile .nav-link');
    const hamburgerButton = document.querySelector('.navbar-toggler');
    
    if (isDarkBackground) {
        // Fondo oscuro - texto blanco
        navLinks.forEach(link => {
            link.style.color = 'white';
        });
        
        mobileNavLinks.forEach(link => {
            link.style.color = 'rgba(255, 255, 255, 0.9)';
        });
        
        if (hamburgerButton) {
            hamburgerButton.style.color = 'white';
        }
    } else {
        // Fondo claro - texto azul oscuro
        navLinks.forEach(link => {
            link.style.color = 'var(--primary)';
        });
        
        mobileNavLinks.forEach(link => {
            link.style.color = 'var(--primary)';
        });
        
        if (hamburgerButton) {
            hamburgerButton.style.color = 'var(--primary)';
        }
    }
}
