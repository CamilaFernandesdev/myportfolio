// ===== DOMINI-INSPIRED PORTFOLIO JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollEffects();
    initAnimations();
    initInteractions();
    
    console.log('🔥 Domini-inspired Portfolio inicializado');
});

// ===== NAVIGATION =====
function initNavigation() {
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active link highlighting
    function updateActiveLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Navbar scroll effects
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = '0 1px 3px 0 rgb(0 0 0 / 0.1)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.8)';
            nav.style.boxShadow = 'none';
        }
    }
    
    // Scroll event listener
    window.addEventListener('scroll', function() {
        updateActiveLink();
        handleNavbarScroll();
    }, { passive: true });
    
    // Initial call
    updateActiveLink();
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    // Intersection Observer for animations
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(`
        .section-header,
        .project-card,
        .contact-item,
        .stat,
        .skill-category
    `);
    
    animateElements.forEach(element => {
        element.classList.add('animate-element');
        observer.observe(element);
    });
    
    // Add CSS for animations
    addAnimationStyles();
}

// ===== ANIMATIONS =====
function initAnimations() {
    // Counter animation for stats
    const stats = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    const statsObserver = new IntersectionObserver((entries) => {
        if (hasAnimated) return;
        
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                hasAnimated = true;
                animateCounters();
                statsObserver.disconnect();
            }
        });
    });
    
    if (stats.length > 0) {
        statsObserver.observe(stats[0].closest('.stats-card'));
    }
    
    function animateCounters() {
        stats.forEach(stat => {
            const target = parseInt(stat.textContent.replace(/\D/g, ''));
            const suffix = stat.textContent.replace(/\d/g, '');
            let current = 0;
            
            if (target && !isNaN(target)) {
                const increment = target / 60;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = target + suffix;
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current) + suffix;
                    }
                }, 50);
            }
        });
    }
    
    // Hover effects for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Avatar hover effect
    const avatar = document.querySelector('.avatar-image');
    if (avatar) {
        avatar.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }, 100);
        });
    }
    
    // Project gallery hover effects
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// ===== INTERACTIONS =====
function initInteractions() {
    // CTA Button interactions
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Handle button actions
            if (this.textContent.includes('Portfolio')) {
                showNotification('Portfolio em desenvolvimento!', 'info');
            } else if (this.textContent.includes('Touch')) {
                showNotification('Entre em contato pelos links acima!', 'success');
            }
        });
    });
    
    // Social links hover effects
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Tech stack item interactions
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.background = 'rgba(255, 107, 53, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.background = 'rgba(255, 107, 53, 0.1)';
        });
    });
    
    // Technology cards interactions
    const techCards = document.querySelectorAll('.tech-card');
    techCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add glow effect
            this.style.boxShadow = '0 8px 32px rgba(255, 107, 53, 0.3)';
            
            // Animate icon
            const icon = this.querySelector('.tech-icon');
            if (icon) {
                icon.style.transform = 'scale(1.15) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
            
            const icon = this.querySelector('.tech-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
        
        // Click effect for tech cards
        card.addEventListener('click', function() {
            const techName = this.querySelector('h3').textContent;
            showNotification(`${techName} - Uma das minhas tecnologias favoritas!`, 'info');
            
            // Pulse effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }, 100);
        });
    });
}

// ===== UTILITY FUNCTIONS =====
function addAnimationStyles() {
    if (!document.getElementById('animation-styles')) {
        const style = document.createElement('style');
        style.id = 'animation-styles';
        style.textContent = `
            .animate-element {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .animate-element.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .service-card {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .project-item {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .social-link {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .tech-item {
                transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            @media (prefers-reduced-motion: reduce) {
                .animate-element {
                    opacity: 1;
                    transform: none;
                    transition: none;
                }
                
                @keyframes ripple {
                    to {
                        transform: scale(1);
                        opacity: 0;
                    }
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? '#10b981' : '#6366f1',
        color: 'white',
        padding: '16px 24px',
        borderRadius: '12px',
        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        zIndex: '9999',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        fontWeight: '500'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== MOBILE MENU (Future Enhancement) =====
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
}

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', function(e) {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
});

// ===== LAZY LOADING (Future Enhancement) =====
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// Initialize mobile menu
initMobileMenu();

// ===== PROJECTS SYSTEM =====
const projectsData = {
    onadv: {
        title: "onADV Legal Tech",
        image: "https://via.placeholder.com/800x400/FF6B35/FFFFFF?text=onADV+Legal+Tech+Platform",
        description: "Sistema revolucionário de processamento inteligente para o poder judiciário brasileiro, integrando Inteligência Artificial com assinatura digital PKI para automatizar e acelerar processos legais.",
        badges: ["Web", "IA", "Em Desenvolvimento"],
        technologies: ["React", "Node.js", "Python", "TensorFlow", "PKI", "PostgreSQL", "Docker"],
        features: [
            "Processamento inteligente de documentos legais com IA",
            "Assinatura digital integrada com certificados PKI",
            "Dashboard analytics para acompanhamento de processos",
            "API RESTful para integração com sistemas existentes",
            "Interface responsiva e acessível",
            "Segurança de nível bancário"
        ],
        links: [
            { text: "GitHub", url: "https://github.com/CamilaFernandesdev" },
            { text: "Demo", url: "#" },
            { text: "Documentação", url: "#" }
        ]
    },
    crypto: {
        title: "CryptoMarket iOS App",
        image: "https://via.placeholder.com/800x400/667eea/FFFFFF?text=CryptoMarket+iOS+App",
        description: "Aplicação iOS nativa desenvolvida em SwiftUI para visualização e acompanhamento de criptomoedas em tempo real, com gráficos interativos e persistência de dados local.",
        badges: ["iOS", "Swift", "Concluído"],
        technologies: ["SwiftUI", "Core Data", "Combine", "Charts", "URLSession", "Keychain"],
        features: [
            "Cotações em tempo real de 100+ criptomoedas",
            "Gráficos interativos com múltiplos períodos",
            "Portfólio pessoal com cálculo de lucros/perdas",
            "Notificações push para alertas de preço",
            "Modo escuro/claro automático",
            "Sincronização com iCloud"
        ],
        links: [
            { text: "GitHub", url: "https://github.com/CamilaFernandesdev" },
            { text: "App Store", url: "#" },
            { text: "Demo Video", url: "#" }
        ]
    },
    dashboard: {
        title: "Dashboard Analytics BI",
        image: "https://via.placeholder.com/800x400/f093fb/FFFFFF?text=Analytics+Dashboard+BI",
        description: "Plataforma de Business Intelligence que revolucionou a análise de dados da empresa, gerando R$ 2M em economia anual através de insights automatizados e machine learning.",
        badges: ["Data", "Python", "Premiado"],
        technologies: ["Python", "Plotly", "Pandas", "Scikit-learn", "MongoDB", "FastAPI", "Docker"],
        features: [
            "Dashboards interativos com 50+ métricas KPI",
            "Machine Learning para previsão de tendências",
            "Processamento de 10M+ registros diários",
            "Alertas inteligentes baseados em anomalias",
            "Exportação automática de relatórios",
            "Integração com múltiplas fontes de dados"
        ],
        links: [
            { text: "GitHub", url: "https://github.com/CamilaFernandesdev" },
            { text: "Prêmio", url: "#" },
            { text: "Dashboard Demo", url: "#" }
        ]
    },
    scraper: {
        title: "Tableau Scraper Energético",
        image: "https://via.placeholder.com/800x400/FF8C42/FFFFFF?text=Tableau+Scraper+Energético",
        description: "Sistema de automação para coleta e processamento de dados do setor energético brasileiro, processando 24 milhões de registros mensais com pipeline ETL otimizado.",
        badges: ["Data", "Automação", "Concluído"],
        technologies: ["Python", "Selenium", "Apache Airflow", "PostgreSQL", "Tableau", "AWS"],
        features: [
            "Coleta automatizada de 15+ fontes governamentais",
            "Pipeline ETL com processamento paralelo",
            "Validação automática de qualidade dos dados",
            "Dashboards Tableau atualizados em tempo real",
            "Monitoramento e alertas de falhas",
            "Arquitetura escalável na AWS"
        ],
        links: [
            { text: "GitHub", url: "https://github.com/CamilaFernandesdev" },
            { text: "Tableau Public", url: "#" },
            { text: "Documentação", url: "#" }
        ]
    }
};

function initProjects() {
    // Add click events to project cards
    const projectCards = document.querySelectorAll('.project-card-modern');
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't open modal if clicking on a link
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }
            
            const projectId = card.dataset.project;
            if (projectId) {
                openProjectModal(projectId);
            }
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('projectModal');
        if (e.target === modal) {
            closeProjectModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProjectModal();
        }
    });
}

function openProjectModal(projectId) {
    const project = projectsData[projectId];
    if (!project) return;
    
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalBadges = document.getElementById('modalBadges');
    const modalDescription = document.getElementById('modalDescription');
    const modalTechStack = document.getElementById('modalTechStack');
    const modalFeatures = document.getElementById('modalFeatures');
    const modalLinks = document.getElementById('modalLinks');
    
    // Update modal content
    modalTitle.textContent = project.title;
    modalImage.src = project.image;
    modalImage.alt = project.title;
    modalDescription.textContent = project.description;
    
    // Update badges
    modalBadges.innerHTML = project.badges.map(badge => 
        `<span class="badge badge-${badge.toLowerCase().replace(/\s+/g, '-')}">${badge}</span>`
    ).join('');
    
    // Update tech stack
    modalTechStack.innerHTML = project.technologies.map(tech => 
        `<span class="tech-tag">${tech}</span>`
    ).join('');
    
    // Update features
    modalFeatures.innerHTML = project.features.map(feature => 
        `<li>${feature}</li>`
    ).join('');
    
    // Update links
    modalLinks.innerHTML = project.links.map(link => 
        `<a href="${link.url}" target="_blank">${link.text}</a>`
    ).join('');
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showAllProjects() {
    showNotification('Página de projetos completa em desenvolvimento!', 'info');
}

// Make functions globally available
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;
window.showAllProjects = showAllProjects;

// Initialize projects when DOM is loaded
document.addEventListener('DOMContentLoaded', initProjects);

// ===== INTERNATIONALIZATION SYSTEM =====
const translations = {
    pt: {
        nav: {
            home: "Home",
            about: "Sobre",
            services: "Serviços",
            portfolio: "Portfólio",
            contact: "Contato"
        },
        hero: {
            badge: "Desenvolvedora Full Stack & Analista de Dados",
            description: "Criando Marcas Significativas e Experiências Digitais Intuitivas que se Destacam"
        },
        technologies: {
            title: "TECNOLOGIAS",
            subtitle: "Ferramentas e frameworks que uso para construir soluções digitais excepcionais",
            flutter: "Desenvolvimento mobile multiplataforma com interfaces nativas bonitas e alta performance",
            swift: "Desenvolvimento iOS nativo com SwiftUI e UIKit para experiências premium",
            react: "Apps mobile baseados em JavaScript com performance nativa e base de código compartilhada",
            android: "Desenvolvimento Android nativo com Kotlin e arquitetura Android moderna",
            python: "Análise de dados, machine learning e desenvolvimento backend com bibliotecas poderosas",
            powerbi: "Business intelligence e visualização de dados para insights acionáveis",
            etl: "Pipelines Extract, Transform, Load para processamento eficiente de dados",
            sql: "Design de banco de dados, otimização e desenvolvimento de consultas complexas"
        },
        services: {
            mobile: {
                title: "Desenvolvimento Mobile",
                description: "Aplicações mobile nativas e multiplataforma com experiência excepcional do usuário"
            },
            data: {
                title: "Análise de Dados",
                description: "Transforme dados brutos em insights acionáveis usando analytics avançado e ferramentas de BI"
            },
            fullstack: {
                title: "Desenvolvimento Full Stack",
                description: "Aplicações web end-to-end com frameworks modernos e arquitetura escalável"
            }
        },
        projects: {
            title: "Projetos em Destaque",
            subtitle: "Explore meu trabalho mais recente em desenvolvimento mobile, análise de dados e aplicações web.",
            viewAll: "Ver Todos os Projetos",
            viewDetails: "Ver Detalhes",
            github: "GitHub"
        },
        testimonials: {
            title: "Confiado por Marcas, Amado por Clientes"
        },
        contact: {
            title: "Vamos Dar Vida à Sua Visão",
            subtitle: "Pronto para começar seu próximo projeto? Vamos discutir como podemos trabalhar juntos para criar algo incrível.",
            email: "Email",
            whatsapp: "WhatsApp",
            getInTouch: "Entre em Contato"
        }
    },
    en: {
        nav: {
            home: "Home",
            about: "About",
            services: "Services",
            portfolio: "Portfolio",
            contact: "Contact"
        },
        hero: {
            badge: "Full Stack Developer & Data Analyst",
            description: "Crafting Meaningful Brands & Intuitive Digital Experiences That Stand Out"
        },
        technologies: {
            title: "TECHNOLOGIES",
            subtitle: "Tools and frameworks I use to build exceptional digital solutions",
            flutter: "Cross-platform mobile development with beautiful native interfaces and high performance",
            swift: "Native iOS development with SwiftUI and UIKit for premium user experiences",
            react: "JavaScript-based mobile apps with native performance and shared codebase",
            android: "Native Android development with Kotlin and modern Android architecture",
            python: "Data analysis, machine learning, and backend development with powerful libraries",
            powerbi: "Business intelligence and data visualization for actionable insights",
            etl: "Extract, Transform, Load data pipelines for efficient data processing",
            sql: "Database design, optimization, and complex query development"
        },
        services: {
            mobile: {
                title: "Mobile Development",
                description: "Native and cross-platform mobile applications with exceptional user experience"
            },
            data: {
                title: "Data Analysis",
                description: "Transform raw data into actionable insights using advanced analytics and BI tools"
            },
            fullstack: {
                title: "Full Stack Development",
                description: "End-to-end web applications with modern frameworks and scalable architecture"
            }
        },
        projects: {
            title: "Featured Projects",
            subtitle: "Explore my latest work in mobile development, data analysis, and web applications.",
            viewAll: "View All Projects",
            viewDetails: "View Details",
            github: "GitHub"
        },
        testimonials: {
            title: "Trusted by Brands, Loved by Clients"
        },
        contact: {
            title: "Let's Bring Your Vision to Life",
            subtitle: "Ready to start your next project? Let's discuss how we can work together to create something amazing.",
            email: "Email",
            whatsapp: "WhatsApp",
            getInTouch: "Get In Touch"
        }
    }
};

let currentLanguage = 'pt';

function initLanguageSystem() {
    // Load saved language or detect browser language
    const savedLanguage = localStorage.getItem('portfolio-language');
    const browserLanguage = navigator.language.startsWith('pt') ? 'pt' : 'en';
    currentLanguage = savedLanguage || browserLanguage;
    
    // Set initial language
    setLanguage(currentLanguage);
    
    // Add event listeners to language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            setLanguage(lang);
        });
    });
}

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('portfolio-language', lang);
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    // Update all translatable elements
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.dataset.i18n;
        const translation = getTranslation(key);
        if (translation) {
            element.textContent = translation;
        }
    });
    
    // Update document language
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
}

function getTranslation(key) {
    const keys = key.split('.');
    let translation = translations[currentLanguage];
    
    for (const k of keys) {
        translation = translation?.[k];
    }
    
    return translation;
}

// ===== THEME SYSTEM =====
let currentTheme = 'dark';

function initThemeSystem() {
    // Load saved theme or detect system preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    currentTheme = savedTheme || systemTheme;
    
    // Set initial theme
    setTheme(currentTheme);
    
    // Add event listener to theme button
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
        if (!localStorage.getItem('portfolio-theme')) {
            setTheme(e.matches ? 'light' : 'dark');
        }
    });
}

function setTheme(theme) {
    currentTheme = theme;
    localStorage.setItem('portfolio-theme', theme);
    
    // Update document attribute
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update theme icon
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.textContent = theme === 'light' ? '●' : '○';
    }
    
    // Update theme button title
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
        themeBtn.title = theme === 'light' ? 'Alternar para tema escuro' : 'Alternar para tema claro';
    }
    
    // Update avatar photo based on theme
    updateAvatarPhoto(theme);
}

function updateAvatarPhoto(theme) {
    const avatarPhoto = document.getElementById('avatarPhoto');
    if (avatarPhoto) {
        // Add fade out effect
        avatarPhoto.style.opacity = '0';
        
        setTimeout(() => {
            // Change photo source based on theme
            if (theme === 'light') {
                avatarPhoto.src = 'assets/images/my_photo_colored.jpg';
            } else {
                avatarPhoto.src = 'assets/images/my_photo_pb.jpg';
            }
            
            // Fade back in
            avatarPhoto.style.opacity = '1';
        }, 200);
    }
}

function toggleTheme() {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}

// Initialize systems when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initLanguageSystem();
    initThemeSystem();
});

// Make functions globally available
window.setLanguage = setLanguage;
window.toggleTheme = toggleTheme;
