// ===== GERENCIADOR DE NAVEGAÇÃO =====

export class NavigationManager {
    constructor() {
        this.navbar = null;
        this.hamburger = null;
        this.navMenu = null;
        this.navLinks = [];
        this.lastScrollY = 0;
        this.isMenuOpen = false;
    }
    
    init() {
        this.navbar = document.querySelector('.navbar');
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        if (this.navbar) {
            this.setupNavigation();
            this.setupScrollEffects();
            this.setupActiveLinks();
        }
        
        console.log('🧭 Navigation Manager inicializado');
    }
    
    setupNavigation() {
        // Setup mobile menu
        if (this.hamburger && this.navMenu) {
            this.hamburger.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
            
            // Fechar menu ao clicar em link
            this.navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (this.isMenuOpen) {
                        this.closeMobileMenu();
                    }
                });
            });
            
            // Fechar menu ao clicar fora
            document.addEventListener('click', (e) => {
                if (this.isMenuOpen && 
                    !this.navMenu.contains(e.target) && 
                    !this.hamburger.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });
        }
        
        // Keyboard navigation
        this.setupKeyboardNavigation();
    }
    
    toggleMobileMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        
        // Prevenir scroll do body quando menu estiver aberto
        document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
        
        // Atualizar aria-expanded
        this.hamburger.setAttribute('aria-expanded', this.isMenuOpen);
        
        // Focus management
        if (this.isMenuOpen) {
            this.navMenu.querySelector('.nav-link')?.focus();
        }
    }
    
    closeMobileMenu() {
        this.isMenuOpen = false;
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        document.body.style.overflow = '';
        this.hamburger.setAttribute('aria-expanded', 'false');
    }
    
    setupScrollEffects() {
        let ticking = false;
        
        const updateNavbar = () => {
            const currentScrollY = window.scrollY;
            
            // Navbar hide/show effect
            if (currentScrollY > 100) {
                if (currentScrollY > this.lastScrollY && !this.isMenuOpen) {
                    // Scrolling down
                    this.navbar.style.transform = 'translateY(-100%)';
                } else {
                    // Scrolling up
                    this.navbar.style.transform = 'translateY(0)';
                }
            } else {
                this.navbar.style.transform = 'translateY(0)';
            }
            
            // Navbar background opacity
            if (currentScrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
            
            this.lastScrollY = currentScrollY;
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestTick, { passive: true });
    }
    
    setupActiveLinks() {
        // Highlight active section na navegação
        const sections = document.querySelectorAll('section[id]');
        
        if (sections.length === 0) return;
        
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const navLink = document.querySelector(`a[href="#${entry.target.id}"]`);
                
                if (entry.isIntersecting) {
                    // Remover active de todos os links
                    this.navLinks.forEach(link => link.classList.remove('active'));
                    
                    // Adicionar active ao link correspondente
                    if (navLink) {
                        navLink.classList.add('active');
                    }
                }
            });
        }, observerOptions);
        
        sections.forEach(section => observer.observe(section));
    }
    
    setupKeyboardNavigation() {
        // Navigation com keyboard
        this.navLinks.forEach((link, index) => {
            link.addEventListener('keydown', (e) => {
                let targetIndex;
                
                switch (e.key) {
                    case 'ArrowDown':
                    case 'ArrowRight':
                        e.preventDefault();
                        targetIndex = (index + 1) % this.navLinks.length;
                        this.navLinks[targetIndex].focus();
                        break;
                        
                    case 'ArrowUp':
                    case 'ArrowLeft':
                        e.preventDefault();
                        targetIndex = index === 0 ? this.navLinks.length - 1 : index - 1;
                        this.navLinks[targetIndex].focus();
                        break;
                        
                    case 'Home':
                        e.preventDefault();
                        this.navLinks[0].focus();
                        break;
                        
                    case 'End':
                        e.preventDefault();
                        this.navLinks[this.navLinks.length - 1].focus();
                        break;
                        
                    case 'Escape':
                        if (this.isMenuOpen) {
                            this.closeMobileMenu();
                            this.hamburger.focus();
                        }
                        break;
                }
            });
        });
    }
    
    // Métodos públicos
    navigateTo(hash) {
        const target = document.querySelector(hash);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Fechar menu mobile se estiver aberto
            if (this.isMenuOpen) {
                this.closeMobileMenu();
            }
            
            // Atualizar URL
            history.pushState(null, null, hash);
        }
    }
    
    getCurrentSection() {
        const sections = document.querySelectorAll('section[id]');
        let current = '';
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                current = section.id;
            }
        });
        
        return current;
    }
}
