// ===== GERENCIADOR DE ANIMAÇÕES =====

export class AnimationManager {
    constructor() {
        this.observedElements = new Set();
        this.animationObserver = null;
        this.isReducedMotion = false;
    }
    
    init() {
        // Verificar preferência de animação
        this.checkReducedMotion();
        
        if (!this.isReducedMotion) {
            this.setupIntersectionObserver();
            this.setupAnimations();
        }
        
        console.log('✨ Animation Manager inicializado');
    }
    
    checkReducedMotion() {
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        // Escutar mudanças na preferência
        window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
            this.isReducedMotion = e.matches;
            
            if (this.isReducedMotion) {
                this.disableAnimations();
            } else {
                this.enableAnimations();
            }
        });
    }
    
    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };
        
        this.animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                    this.animationObserver.unobserve(entry.target);
                }
            });
        }, options);
    }
    
    setupAnimations() {
        // Elementos para animação de entrada
        const animatedElements = document.querySelectorAll(`
            .hero-content,
            .section-header,
            .service-card,
            .project-card,
            .skill-item,
            .timeline-item-compact,
            .stat-item,
            .contact-item,
            .about-text,
            .about-stats
        `);
        
        animatedElements.forEach((element, index) => {
            // Adicionar delay progressivo
            element.style.animationDelay = `${index * 0.1}s`;
            
            // Observar elemento
            this.observedElements.add(element);
            if (this.animationObserver) {
                this.animationObserver.observe(element);
            }
        });
        
        // Animações específicas
        this.setupCounterAnimations();
        this.setupTypingAnimation();
        this.setupParallaxEffects();
    }
    
    animateElement(element) {
        if (this.isReducedMotion) return;
        
        // Determinar tipo de animação baseado na classe
        let animationClass = 'animate-fadeInUp';
        
        if (element.matches('.hero-content')) {
            animationClass = 'animate-fadeInDown';
        } else if (element.matches('.service-card, .project-card')) {
            animationClass = 'animate-fadeInUp';
        } else if (element.matches('.skill-item')) {
            animationClass = 'animate-fadeInLeft';
        } else if (element.matches('.stat-item')) {
            animationClass = 'animate-fadeInUp';
        }
        
        // Aplicar animação
        element.classList.add(animationClass, 'animate-visible');
        
        // Adicionar classes CSS necessárias se não existirem
        this.ensureAnimationStyles();
    }
    
    setupCounterAnimations() {
        const counters = document.querySelectorAll('.stat-item h3');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/\D/g, ''));
            const suffix = counter.textContent.replace(/\d/g, '');
            
            if (target && !isNaN(target)) {
                this.animationObserver?.observe(counter.parentElement);
                
                counter.parentElement.addEventListener('animationstart', () => {
                    this.animateCounter(counter, target, suffix);
                });
            }
        });
    }
    
    animateCounter(element, target, suffix = '') {
        if (this.isReducedMotion) {
            element.textContent = target + suffix;
            return;
        }
        
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
    
    setupTypingAnimation() {
        const typingElements = document.querySelectorAll('[data-typing]');
        
        typingElements.forEach(element => {
            const text = element.textContent;
            const speed = parseInt(element.dataset.typingSpeed) || 50;
            
            if (this.isReducedMotion) return;
            
            element.textContent = '';
            
            this.animationObserver?.observe(element);
            
            element.addEventListener('animationstart', () => {
                this.typeText(element, text, speed);
            });
        });
    }
    
    typeText(element, text, speed) {
        let index = 0;
        
        const typeChar = () => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(typeChar, speed);
            }
        };
        
        typeChar();
    }
    
    setupParallaxEffects() {
        if (this.isReducedMotion) return;
        
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (parallaxElements.length === 0) return;
        
        let ticking = false;
        
        const updateParallax = () => {
            const scrollY = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.dataset.parallax) || 0.5;
                const yPos = -(scrollY * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
            
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestTick, { passive: true });
    }
    
    ensureAnimationStyles() {
        // Adicionar estilos de animação se não existirem
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
                
                .animate-fadeInRight {
                    opacity: 0;
                    transform: translateX(30px);
                    animation: fadeInRight 0.6s ease-out forwards;
                }
                
                .animate-visible {
                    opacity: 1;
                    transform: translate(0, 0);
                }
                
                @media (prefers-reduced-motion: reduce) {
                    .animate-fadeInUp,
                    .animate-fadeInDown,
                    .animate-fadeInLeft,
                    .animate-fadeInRight {
                        opacity: 1;
                        transform: none;
                        animation: none;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    disableAnimations() {
        // Remover todas as animações
        this.observedElements.forEach(element => {
            element.style.animation = 'none';
            element.style.opacity = '1';
            element.style.transform = 'none';
        });
    }
    
    enableAnimations() {
        // Reativar animações (requer reinicialização)
        this.setupAnimations();
    }
    
    // Métodos públicos para animações customizadas
    fadeIn(element, duration = 300) {
        if (this.isReducedMotion) {
            element.style.opacity = '1';
            return Promise.resolve();
        }
        
        return new Promise(resolve => {
            element.style.opacity = '0';
            element.style.transition = `opacity ${duration}ms ease`;
            
            requestAnimationFrame(() => {
                element.style.opacity = '1';
                
                setTimeout(() => {
                    element.style.transition = '';
                    resolve();
                }, duration);
            });
        });
    }
    
    slideDown(element, duration = 300) {
        if (this.isReducedMotion) {
            element.style.display = 'block';
            return Promise.resolve();
        }
        
        return new Promise(resolve => {
            element.style.overflow = 'hidden';
            element.style.height = '0';
            element.style.display = 'block';
            
            const height = element.scrollHeight;
            element.style.transition = `height ${duration}ms ease`;
            
            requestAnimationFrame(() => {
                element.style.height = height + 'px';
                
                setTimeout(() => {
                    element.style.height = '';
                    element.style.overflow = '';
                    element.style.transition = '';
                    resolve();
                }, duration);
            });
        });
    }
}
