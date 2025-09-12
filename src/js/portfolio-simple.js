// ===== PORTFOLIO JAVASCRIPT SIMPLES (SEM MODULES) =====

// Aguardar DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Portfolio inicializado');
    
    // Inicializar funcionalidades
    initTheme();
    initNavigation();
    initAnimations();
    initForms();
});

// ===== GERENCIAMENTO DE TEMA =====
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeKey = 'portfolio-theme';
    
    if (!themeToggle) return;
    
    // Obter tema atual
    const currentTheme = localStorage.getItem(themeKey) || getSystemPreference();
    
    // Aplicar tema inicial
    applyTheme(currentTheme);
    
    // Event listener para toggle
    themeToggle.addEventListener('click', function() {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
        localStorage.setItem(themeKey, newTheme);
        
        // Feedback visual
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });
    
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
        
        themeToggle.setAttribute('aria-label', 
            theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'
        );
        
        // Meta theme-color para mobile
        updateThemeColor(theme);
    }
    
    function getSystemPreference() {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    function updateThemeColor(theme) {
        const themeColor = theme === 'dark' ? '#1A1A1A' : '#FEFEFE';
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }
        
        metaThemeColor.content = themeColor;
    }
}

// ===== NAVEGAÇÃO =====
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');
    
    let isMenuOpen = false;
    let lastScrollY = 0;
    
    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            isMenuOpen = !isMenuOpen;
            
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            document.body.style.overflow = isMenuOpen ? 'hidden' : '';
            hamburger.setAttribute('aria-expanded', isMenuOpen);
        });
        
        // Fechar menu ao clicar em link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (isMenuOpen) {
                    closeMobileMenu();
                }
            });
        });
        
        function closeMobileMenu() {
            isMenuOpen = false;
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            hamburger.setAttribute('aria-expanded', 'false');
        }
    }
    
    // Scroll effects
    if (navbar) {
        window.addEventListener('scroll', function() {
            const currentScrollY = window.scrollY;
            
            // Navbar hide/show
            if (currentScrollY > 100) {
                if (currentScrollY > lastScrollY && !isMenuOpen) {
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    navbar.style.transform = 'translateY(0)';
                }
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            // Background opacity
            if (currentScrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            lastScrollY = currentScrollY;
        }, { passive: true });
    }
    
    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
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

// ===== ANIMAÇÕES =====
function initAnimations() {
    // Verificar preferência de movimento reduzido
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isReducedMotion) return;
    
    // Intersection Observer para animações
    const animatedElements = document.querySelectorAll(`
        .hero-content,
        .section-header,
        .service-card,
        .project-card,
        .skill-item,
        .timeline-item-compact,
        .stat-item,
        .contact-item
    `);
    
    if (animatedElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateElement(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    });
    
    animatedElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
        observer.observe(element);
    });
    
    function animateElement(element) {
        let animationClass = 'animate-fadeInUp';
        
        if (element.matches('.hero-content')) {
            animationClass = 'animate-fadeInDown';
        } else if (element.matches('.skill-item')) {
            animationClass = 'animate-fadeInLeft';
        }
        
        element.classList.add(animationClass, 'animate-visible');
    }
    
    // Contador animado
    const counters = document.querySelectorAll('.stat-item h3');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const suffix = counter.textContent.replace(/\d/g, '');
        
        if (target && !isNaN(target)) {
            observer.observe(counter.parentElement);
            
            counter.parentElement.addEventListener('animationstart', function() {
                animateCounter(counter, target, suffix);
            });
        }
    });
    
    function animateCounter(element, target, suffix = '') {
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            
            if (current >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, stepTime);
    }
    
    // Adicionar estilos de animação
    ensureAnimationStyles();
}

function ensureAnimationStyles() {
    if (!document.getElementById('animation-styles')) {
        const style = document.createElement('style');
        style.id = 'animation-styles';
        style.textContent = `
            .animate-fadeInUp {
                opacity: 0;
                transform: translateY(30px);
                animation: fadeInUp 0.6s ease-out forwards;
            }
            
            .animate-fadeInDown {
                opacity: 0;
                transform: translateY(-30px);
                animation: fadeInDown 0.6s ease-out forwards;
            }
            
            .animate-fadeInLeft {
                opacity: 0;
                transform: translateX(-30px);
                animation: fadeInLeft 0.6s ease-out forwards;
            }
            
            .animate-visible {
                opacity: 1;
                transform: translate(0, 0);
            }
            
            @media (prefers-reduced-motion: reduce) {
                .animate-fadeInUp,
                .animate-fadeInDown,
                .animate-fadeInLeft {
                    opacity: 1;
                    transform: none;
                    animation: none;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== FORMULÁRIOS =====
function initForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const submitBtn = form.querySelector('[type="submit"]');
        
        if (!submitBtn) return;
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Mostrar loading
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            // Simular envio
            setTimeout(() => {
                showFormMessage(form, 'Mensagem enviada com sucesso!', 'success');
                form.reset();
                
                // Restaurar botão
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensagem';
                submitBtn.disabled = false;
            }, 2000);
        });
        
        // Validação básica
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(input);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(input);
            });
        });
    });
    
    function validateField(input) {
        const value = input.value.trim();
        let isValid = true;
        let message = '';
        
        if (input.hasAttribute('required') && !value) {
            isValid = false;
            message = 'Este campo é obrigatório';
        } else if (input.type === 'email' && value && !isValidEmail(value)) {
            isValid = false;
            message = 'Email inválido';
        }
        
        if (!isValid) {
            showFieldError(input, message);
        } else {
            clearFieldError(input);
        }
        
        return isValid;
    }
    
    function showFieldError(input, message) {
        input.style.borderColor = '#f56565';
        
        let errorDiv = input.parentNode.querySelector('.field-error');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            input.parentNode.appendChild(errorDiv);
        }
        
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }
    
    function clearFieldError(input) {
        input.style.borderColor = '';
        
        const errorDiv = input.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.style.display = 'none';
        }
    }
    
    function showFormMessage(form, message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message form-message-${type}`;
        messageDiv.textContent = message;
        
        form.insertBefore(messageDiv, form.firstChild);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
    
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    // Estilos para validação
    ensureFormStyles();
}

function ensureFormStyles() {
    if (!document.getElementById('form-validation-styles')) {
        const style = document.createElement('style');
        style.id = 'form-validation-styles';
        style.textContent = `
            .field-error {
                color: #f56565;
                font-size: 0.875rem;
                margin-top: 0.25rem;
                display: none;
            }
            
            .form-message {
                padding: 1rem;
                border-radius: 0.5rem;
                margin-bottom: 1rem;
                font-weight: 500;
            }
            
            .form-message-success {
                background: #c6f6d5;
                color: #22543d;
                border: 1px solid #9ae6b4;
            }
            
            .form-message-error {
                background: #fed7d7;
                color: #742a2a;
                border: 1px solid #fc8181;
            }
        `;
        document.head.appendChild(style);
    }
}
