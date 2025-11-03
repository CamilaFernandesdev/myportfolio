// ===== ANIMAÇÕES MINIMALISTAS E SUTIS =====

document.addEventListener('DOMContentLoaded', function() {
    initMinimalAnimations();
});

function initMinimalAnimations() {
    setupFadeInOnScroll();
    setupSmoothScrolling();
    setupMinimalCounters();
    
    console.log('✨ Animações minimalistas inicializadas');
}

// ===== FADE IN SUAVE NO SCROLL =====
function setupFadeInOnScroll() {
    const elementsToFade = document.querySelectorAll(`
        .section-header,
        .service-card,
        .project-card,
        .skill-category,
        .timeline-item-compact,
        .stat-item,
        .contact-item,
        .about-text
    `);
    
    // Adicionar classe fade-in
    elementsToFade.forEach(element => {
        element.classList.add('fade-in');
    });
    
    // Intersection Observer para fade in suave
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    });
    
    elementsToFade.forEach(element => {
        fadeObserver.observe(element);
    });
}

// ===== SMOOTH SCROLLING MINIMALISTA =====
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
function setupMinimalCounters() {
    const counters = document.querySelectorAll('.stat-item h3');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace(/\D/g, ''));
                const suffix = counter.textContent.replace(/\d/g, '');
                
                if (target && !isNaN(target)) {
                    animateCounterMinimal(counter, target, suffix);
                }
                
                counterObserver.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounterMinimal(element, target, suffix = '') {
    const duration = 1500;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Easing suave
        const easeOut = 1 - Math.pow(1 - progress, 2);
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

// ===== HOVER EFFECTS SUTIS =====
function setupSubtleHovers() {
    // Efeito suave nos service cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Efeito suave nos botões
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-1px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ===== THEME TOGGLE SIMPLES =====
function enhanceMinimalThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            // Transição suave simples
            document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
            
            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
        });
    }
}

// ===== SCROLL NAVBAR =====
function setupMinimalNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    }, { passive: true });
}

// ===== PERFORMANCE OTIMIZADA =====
function checkPerformanceAndReduce() {
    // Se o dispositivo é mobile ou tem baixa performance, reduzir animações
    const isMobile = window.innerWidth <= 768;
    const isSlowDevice = navigator.hardwareConcurrency <= 2;
    
    if (isMobile || isSlowDevice) {
        // Reduzir duração das animações
        document.documentElement.style.setProperty('--transition', 'all 0.2s ease');
        console.log('🔋 Animações otimizadas para dispositivo móvel/baixa performance');
    }
}

// ===== INICIALIZAÇÃO =====
setupSubtleHovers();
enhanceMinimalThemeToggle();
setupMinimalNavbar();
checkPerformanceAndReduce();

// ===== PREFERS REDUCED MOTION =====
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Desabilitar todas as animações
    document.documentElement.style.setProperty('--transition', 'none');
    document.documentElement.style.setProperty('--transition-apple', 'none');
    console.log('♿ Animações desabilitadas - prefers-reduced-motion');
}
