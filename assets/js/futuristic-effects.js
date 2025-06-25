// Efectos adicionales para la interfaz futurista
document.addEventListener('DOMContentLoaded', function() {
    
    // Efecto de parallax en el scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelectorAll('.hero-section');
        const speed = 0.5;
        
        parallax.forEach(element => {
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Animación de aparición de elementos al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInFromBottom 0.8s ease forwards';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);

    // Observar todas las cards futuristas
    document.querySelectorAll('.futuristic-card').forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });

    // Efecto de cursor personalizado
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Efecto hover en botones
    document.querySelectorAll('.btn-futuristic').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Efecto de escritura automática para títulos
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Aplicar efecto de escritura a títulos principales
    const mainTitles = document.querySelectorAll('.neon-title.display-3, .neon-title.display-4');
    mainTitles.forEach(title => {
        const originalText = title.textContent;
        title.addEventListener('animationend', function() {
            typeWriter(title, originalText, 80);
        });
    });

    // Efecto de partículas flotantes
    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('floating-particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 5000);
    }

    // Crear partículas cada cierto tiempo
    setInterval(createParticle, 2000);

    // Efecto de vibración en elementos con error
    function shakeElement(element) {
        element.style.animation = 'shake 0.5s ease-in-out';
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

    // === FUNCIONALIDAD NAVBAR HAMBURGUESA === //
    
    // Variables del navbar
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarOverlay = document.querySelector('.navbar-overlay');
    const navLinks = document.querySelectorAll('.navbar-nav-mobile .nav-link');
    
    // Función para abrir el menú
    function openMobileMenu() {
        navbarCollapse.classList.add('show');
        navbarOverlay.classList.add('show');
        navbarToggler.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden'; // Prevenir scroll del body
        
        // Agregar efecto sonoro (opcional)
        playMenuSound();
    }
    
    // Función para cerrar el menú
    function closeMobileMenu() {
        navbarCollapse.classList.remove('show');
        navbarOverlay.classList.remove('show');
        navbarToggler.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = ''; // Restaurar scroll del body
    }
    
    // Event listener para el botón hamburguesa
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function(e) {
            e.preventDefault();
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            if (isExpanded) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }
    
    // Cerrar menú al hacer click en el overlay
    if (navbarOverlay) {
        navbarOverlay.addEventListener('click', closeMobileMenu);
    }
    
    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Pequeño delay para que se vea el efecto del click
            setTimeout(closeMobileMenu, 300);
        });
    });
    
    // Cerrar menú con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navbarCollapse.classList.contains('show')) {
            closeMobileMenu();
        }
    });
    
    // Cerrar menú al cambiar el tamaño de pantalla (responsive)
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 992) {
            closeMobileMenu();
        }
    });
    
    // Función para efecto sonoro (opcional)
    function playMenuSound() {
        // Crear un pequeño efecto de sonido con Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (e) {
            // Si no se puede reproducir sonido, continuar silenciosamente
        }
    }
    
    // Efecto de pulso en el botón hamburguesa cuando está activo
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
    
    // Detectar toque/swipe para cerrar menú en dispositivos móviles
    let startY = 0;
    let startX = 0;
    
    document.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
        startX = e.touches[0].clientX;
    });
    
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
