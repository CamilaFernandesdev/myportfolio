// ===== ANIMAÇÕES ESTILO APPLE =====

document.addEventListener('DOMContentLoaded', function() {
    initAppleAnimations();
});

function initAppleAnimations() {
    setupScrollReveal();
    setupParallaxElements();
    setupMagneticElements();
    setupSmoothScrolling();
    setupAdvancedCounters();
    setupFloatingElements();
    setupAppleHovers();
    
    console.log('🍎 Apple-style animations inicializadas');
}

// ===== SCROLL REVEAL ANIMAÇÕES =====
function setupScrollReveal() {
    const elementsToReveal = document.querySelectorAll(`
        .section-header,
        .service-card,
        .project-card,
        .skill-item,
        .timeline-item-compact,
        .stat-item,
        .contact-item,
        .about-text,
        .hero-stats
    `);
    
    // Adicionar classes de animação
    elementsToReveal.forEach((element, index) => {
        element.classList.add('animate-on-scroll');
        element.classList.add(`delay-${(index % 4) + 1}`);
    });
    
    // Intersection Observer para revelação suave
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Adicionar animação especial para cards
                if (entry.target.matches('.service-card, .project-card')) {
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }, 100);
                }
                
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elementsToReveal.forEach(element => {
        revealObserver.observe(element);
    });
}

// ===== PARALLAX ELEMENTS =====
function setupParallaxElements() {
    const parallaxElements = document.querySelectorAll('.hero, .service-icon, .floating');
    
    if (parallaxElements.length === 0) return;
    
    let ticking = false;
    
    function updateParallax() {
        const scrollY = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            if (element.classList.contains('hero')) {
                const speed = 0.5;
                element.style.transform = `translateY(${scrollY * speed}px)`;
            } else if (element.classList.contains('service-icon')) {
                const speed = 0.2;
                element.style.transform = `translateY(${scrollY * speed}px) rotate(${scrollY * 0.1}deg)`;
            }
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
}

// ===== MAGNETIC ELEMENTS =====
function setupMagneticElements() {
    const magneticElements = document.querySelectorAll('.btn, .theme-toggle, .project-card');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const strength = 0.1; // Intensidade do efeito magnético
            
            element.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
        });
        
        element.addEventListener('mouseleave', function() {
            element.style.transform = 'translate(0px, 0px)';
        });
    });
}

// ===== SMOOTH SCROLLING APPLE-STYLE =====
function setupSmoothScrolling() {
    // Smooth scroll com easing customizado
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const targetPosition = target.offsetTop - 80;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 1000;
                let start = null;
                
                function animateScroll(timestamp) {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    const progressPercentage = Math.min(progress / duration, 1);
                    
                    // Easing function (ease-out cubic)
                    const easeOut = 1 - Math.pow(1 - progressPercentage, 3);
                    
                    window.scrollTo(0, startPosition + (distance * easeOut));
                    
                    if (progress < duration) {
                        requestAnimationFrame(animateScroll);
                    }
                }
                
                requestAnimationFrame(animateScroll);
            }
        });
    });
}

// ===== CONTADORES AVANÇADOS =====
function setupAdvancedCounters() {
    const counters = document.querySelectorAll('.stat-item h3');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace(/\D/g, ''));
                const suffix = counter.textContent.replace(/\d/g, '');
                
                if (target && !isNaN(target)) {
                    animateCounter(counter, target, suffix, 2000);
                }
                
                counterObserver.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element, target, suffix = '', duration = 2000) {
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Easing function (ease-out cubic)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(target * easeOut);
        
        element.textContent = currentValue + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + suffix;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// ===== FLOATING ELEMENTS =====
function setupFloatingElements() {
    const serviceIcons = document.querySelectorAll('.service-icon');
    
    serviceIcons.forEach((icon, index) => {
        icon.classList.add('floating');
        icon.style.animationDelay = `${index * 0.5}s`;
        
        // Adicionar efeito de pulse sutil
        icon.addEventListener('mouseenter', function() {
            this.classList.add('pulse-subtle');
        });
        
        icon.addEventListener('mouseleave', function() {
            this.classList.remove('pulse-subtle');
        });
    });
}

// ===== APPLE HOVER EFFECTS =====
function setupAppleHovers() {
    // Efeito de brilho nos botões
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
    });
    
    // Efeito de elevação nos cards
    const cards = document.querySelectorAll('.service-card, .project-card, .card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.willChange = 'transform, box-shadow';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.willChange = 'auto';
        });
    });
    
    // Efeito de ripple nos links de navegação
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 140, 66, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                left: ${x}px;
                top: ${y}px;
                width: 20px;
                height: 20px;
                margin-left: -10px;
                margin-top: -10px;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// ===== TEMA TOGGLE MELHORADO =====
function enhanceThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            // Animação de rotação do ícone
            const icon = this.querySelector('i');
            icon.style.transform = 'rotate(360deg) scale(1.2)';
            
            setTimeout(() => {
                icon.style.transform = 'rotate(0deg) scale(1)';
            }, 300);
            
            // Efeito de onda na mudança de tema
            createThemeRipple();
        });
    }
}

function createThemeRipple() {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: radial-gradient(circle, rgba(255, 140, 66, 0.1) 0%, transparent 70%);
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        animation: themeRipple 0.8s ease-out;
    `;
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 800);
}

// ===== CSS DINÂMICO PARA ANIMAÇÕES =====
function addAnimationStyles() {
    if (!document.getElementById('apple-animation-styles')) {
        const style = document.createElement('style');
        style.id = 'apple-animation-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            @keyframes themeRipple {
                0% {
                    opacity: 0;
                    transform: scale(0);
                }
                50% {
                    opacity: 1;
                    transform: scale(1);
                }
                100% {
                    opacity: 0;
                    transform: scale(2);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Inicializar estilos adicionais
addAnimationStyles();
enhanceThemeToggle();

// ===== PERFORMANCE MONITORING =====
function checkAnimationPerformance() {
    // Verificar se o dispositivo suporta animações pesadas
    const isLowPower = navigator.hardwareConcurrency <= 2;
    const isSlowConnection = navigator.connection && navigator.connection.effectiveType === 'slow-2g';
    
    if (isLowPower || isSlowConnection) {
        document.documentElement.style.setProperty('--apple-timing', 'linear');
        console.log('🔋 Modo de economia de energia ativado para animações');
    }
}

checkAnimationPerformance();
