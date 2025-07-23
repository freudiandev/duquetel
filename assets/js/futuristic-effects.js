// Scripts profesionales para la interfaz
document.addEventListener('DOMContentLoaded', function() {
    
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
    
    // Función para hacer efecto de shake en elementos inválidos
    function shakeElement(element) {
        element.style.animation = 'shake 0.5s';
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
    }

    // Validación de formulario con efectos
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
                // Simular envío exitoso
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

    // Animación de números/contadores en CTAs
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

    // Detectar elementos con números y animarlos
    document.querySelectorAll('.cta-urgency').forEach(element => {
        const text = element.textContent;
        const numbers = text.match(/\d+/g);
        if (numbers) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Simular contador descendente para urgencia
                        if (text.includes('quedan') || text.includes('últimos')) {
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
    
    // Función para abrir el menú (INSTANTÁNEA)
    function openMobileMenu() {
        // Optimizar con requestAnimationFrame para mejor rendimiento
        requestAnimationFrame(() => {
            navbarCollapse.classList.add('show');
            navbarOverlay.classList.add('show');
            navbarToggler.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Función para cerrar el menú (INSTANTÁNEA)
    function closeMobileMenu() {
        requestAnimationFrame(() => {
            navbarCollapse.classList.remove('show');
            navbarOverlay.classList.remove('show');
            navbarToggler.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    }
    
    // Event listener optimizado para el botón hamburguesa
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
    
    // Cerrar menú al hacer click en el overlay (OPTIMIZADO)
    if (navbarOverlay) {
        navbarOverlay.addEventListener('click', closeMobileMenu);
    }
    
    // Cerrar menú al hacer click en un enlace (SIN DELAY)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu(); // Removido el setTimeout para que sea instantáneo
        });
    });
    
    // Cerrar menú con tecla ESC (OPTIMIZADO)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navbarCollapse.classList.contains('show')) {
            closeMobileMenu();
        }
    });
    
    // Cerrar menú al cambiar el tamaño de pantalla (OPTIMIZADO)
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth >= 992) {
                closeMobileMenu();
            }
        }, 100);
    });
    
    // Efecto de pulso en el botón hamburguesa cuando está activo (OPTIMIZADO)
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
    
    // Pulso cada 2 segundos cuando el menú está abierto
    setInterval(pulseHamburger, 2000);
    
    // Detectar toque/swipe para cerrar menú en dispositivos móviles (OPTIMIZADO)
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
    
    // Animación de entrada de los elementos del menú
    function animateMenuItems() {
        const menuItems = document.querySelectorAll('.navbar-nav-mobile .nav-item');
        menuItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'translateX(0)';
                item.style.opacity = '1';
            }, index * 100);
        });
    }
    
    // Ejecutar animación cuando se abre el menú
    const originalOpenMenu = openMobileMenu;
    openMobileMenu = function() {
        originalOpenMenu();
        setTimeout(animateMenuItems, 100);
    };

    // === FIN FUNCIONALIDAD NAVBAR === //

    // Efectos específicos para el logo de Duquetel
    const duquetelLogo = document.querySelector('.duquetel-logo');
    if (duquetelLogo) {
        // Efecto de clic en el logo
        duquetelLogo.addEventListener('click', function() {
            this.style.animation = 'logoGlow 0.5s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });

        // Efecto de pulso periódico en el logo
        setInterval(() => {
            if (!duquetelLogo.matches(':hover')) {
                duquetelLogo.style.filter = 'drop-shadow(0 0 25px rgba(0, 255, 255, 0.7))';
                setTimeout(() => {
                    duquetelLogo.style.filter = 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.6))';
                }, 300);
            }
        }, 3000);

        // Efecto de rotación sutil en hover
        duquetelLogo.addEventListener('mouseenter', function() {
            this.style.transform += ' rotate(1deg)';
        });

        duquetelLogo.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace(' rotate(1deg)', '');
        });
    }
});

// CSS adicional para los efectos JavaScript
const additionalStyles = `
.custom-cursor {
    width: 20px;
    height: 20px;
    background: radial-gradient(circle, var(--neon-cyan), transparent);
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    border-radius: 50%;
    opacity: 0.7;
    transform: translate(-50%, -50%);
}

.floating-particle {
    position: fixed;
    width: 4px;
    height: 4px;
    background: var(--neon-cyan);
    border-radius: 50%;
    pointer-events: none;
    z-index: 1;
    animation: floatUp 5s linear infinite;
    box-shadow: 0 0 10px var(--neon-cyan);
}

@keyframes floatUp {
    0% {
        transform: translateY(100vh) scale(0);
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        transform: translateY(-100px) scale(1);
        opacity: 0;
    }
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}

.futuristic-card {
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.btn-futuristic {
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes electricPulse {
    0% {
        transform: scale(1);
        box-shadow: 0 0 10px var(--neon-cyan), 0 0 20px var(--neon-cyan);
    }
    50% {
        transform: scale(1.05);
        box-shadow: 0 0 20px var(--neon-cyan), 0 0 30px var(--neon-cyan);
    }
    100% {
        transform: scale(1);
        box-shadow: 0 0 10px var(--neon-cyan), 0 0 20px var(--neon-cyan);
    }
}
`;

// Insertar estilos adicionales
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
