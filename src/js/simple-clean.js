// ===== JAVASCRIPT SIMPLES E CLEAN =====

document.addEventListener('DOMContentLoaded', function() {
    initSimpleFeatures();
});

function initSimpleFeatures() {
    setupSimpleScrollReveal();
    setupSmoothScrolling();
    setupSimpleCounters();
    setupSimpleNavbar();
    
    console.log('✨ Portfolio simples inicializado');
}

// ===== SCROLL REVEAL SIMPLES =====
function setupSimpleScrollReveal() {
    const elements = document.querySelectorAll(`
        .section-header,
        .service-card,
        .project-card,
        .about-text,
        .contact-item
    `);
    
    // Adicionar classe fade-in apenas
    elements.forEach(element => {
        element.classList.add('fade-in');
    });
    
    // Observer simples
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// ===== SMOOTH SCROLLING =====
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== CONTADORES SIMPLES =====
function setupSimpleCounters() {
    const counters = document.querySelectorAll('.stat-item h3');
    let hasRun = false;
    
    const observer = new IntersectionObserver((entries) => {
        if (hasRun) return;
        
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                hasRun = true;
                counters.forEach(counter => {
                    const target = parseInt(counter.textContent.replace(/\D/g, ''));
                    const suffix = counter.textContent.replace(/\d/g, '');
                    
                    if (target && !isNaN(target)) {
                        let current = 0;
                        const increment = target / 50;
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                counter.textContent = target + suffix;
                                clearInterval(timer);
                            } else {
                                counter.textContent = Math.floor(current) + suffix;
                            }
                        }, 30);
                    }
                });
                observer.disconnect();
            }
        });
    });
    
    if (counters.length > 0) {
        observer.observe(counters[0]);
    }
}

// ===== NAVBAR SIMPLES =====
function setupSimpleNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });
}

// ===== REMOVER ANIMAÇÕES PROBLEMÁTICAS =====
function removeProblematicAnimations() {
    // Remover todas as animações CSS problemáticas
    const problematicElements = document.querySelectorAll(`
        .floating,
        .pulse-subtle,
        .animate-on-scroll,
        .hero-title
    `);
    
    problematicElements.forEach(element => {
        element.style.animation = 'none';
        element.style.transform = 'none';
    });
    
    // Remover classes de animação
    document.querySelectorAll('.delay-1, .delay-2, .delay-3, .delay-4').forEach(element => {
        element.classList.remove('delay-1', 'delay-2', 'delay-3', 'delay-4');
    });
}

// ===== HOVER EFFECTS SIMPLES =====
function setupSimpleHovers() {
    // Service cards hover simples
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Buttons hover simples
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (this.classList.contains('btn-primary')) {
                this.style.transform = 'translateY(-1px)';
            }
        });
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ===== THEME TOGGLE SIMPLES =====
function setupSimpleThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            // Apenas uma transição suave simples
            document.body.style.transition = 'background-color 0.2s ease, color 0.2s ease';
            setTimeout(() => {
                document.body.style.transition = '';
            }, 200);
        });
    }
}

// ===== HERO PROFILE PHOTO ANIMATION =====
function setupProfilePhotoAnimation() {
    const profilePhoto = document.getElementById('hero-profile-photo');
    
    if (profilePhoto) {
        // Animação de entrada suave
        setTimeout(() => {
            profilePhoto.style.opacity = '0';
            profilePhoto.style.transform = 'scale(0.8)';
            profilePhoto.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                profilePhoto.style.opacity = '1';
                profilePhoto.style.transform = 'scale(1)';
            }, 100);
        }, 500);
        
        // Animação no scroll
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            const scrollDelta = currentScrollY - lastScrollY;
            
            if (Math.abs(scrollDelta) > 5) {
                // Pequena animação no scroll
                profilePhoto.style.transform = `scale(${scrollDelta > 0 ? 0.95 : 1.05})`;
                
                setTimeout(() => {
                    profilePhoto.style.transform = 'scale(1)';
                }, 150);
            }
            
            lastScrollY = currentScrollY;
        }, { passive: true });
        
        // Efeito de clique especial
        profilePhoto.addEventListener('click', function() {
            // Animação de pulso suave
            this.style.transform = 'scale(0.9)';
            this.style.transition = 'transform 0.1s ease';
            
            setTimeout(() => {
                this.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                    this.style.transition = 'all 0.3s ease';
                }, 100);
            }, 100);
            
            // Efeito de onda ao redor
            createRippleEffect(this);
        });
        
        // Efeito de respiração sutil
        setInterval(() => {
            if (!profilePhoto.matches(':hover') && document.hidden === false) {
                profilePhoto.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    profilePhoto.style.transform = 'scale(1)';
                }, 1000);
            }
        }, 5000);
    }
}

// ===== RIPPLE EFFECT PARA FOTO =====
function createRippleEffect(element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 140, 66, 0.3);
        transform: scale(0);
        animation: profileRipple 0.6s linear;
        left: 50%;
        top: 50%;
        width: 60px;
        height: 60px;
        margin-left: -30px;
        margin-top: -30px;
        pointer-events: none;
        z-index: -1;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    // Adicionar keyframe se não existir
    if (!document.getElementById('profile-ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'profile-ripple-styles';
        style.textContent = `
            @keyframes profileRipple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// ===== INICIALIZAÇÃO =====
removeProblematicAnimations();
setupSimpleHovers();
setupSimpleThemeToggle();
setupProfilePhotoAnimation();

// ===== PERFORMANCE =====
// Reduzir motion se preferência do usuário
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const style = document.createElement('style');
    style.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}
