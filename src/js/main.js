// ===== PORTFOLIO JAVASCRIPT PRINCIPAL =====

// Importar módulos
import { ThemeManager } from './theme.js';
import { NavigationManager } from './navigation.js';
import { AnimationManager } from './animations.js';
import { FormManager } from './forms.js';

// Classe principal do Portfolio
class Portfolio {
    constructor() {
        this.theme = new ThemeManager();
        this.navigation = new NavigationManager();
        this.animations = new AnimationManager();
        this.forms = new FormManager();
        
        this.init();
    }
    
    init() {
        // Inicializar quando DOM estiver carregado
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupPortfolio());
        } else {
            this.setupPortfolio();
        }
    }
    
    setupPortfolio() {
        console.log('🚀 Portfolio inicializado');
        
        // Inicializar todos os módulos
        this.theme.init();
        this.navigation.init();
        this.animations.init();
        this.forms.init();
        
        // Configurar eventos globais
        this.setupGlobalEvents();
        
        // Verificar performance
        this.checkPerformance();
    }
    
    setupGlobalEvents() {
        // Smooth scroll para links internos
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Lazy loading para imagens
        this.setupLazyLoading();
        
        // Preload de páginas importantes
        this.preloadPages();
    }
    
    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('loading');
                        observer.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback para navegadores sem suporte
            images.forEach(img => {
                img.src = img.dataset.src;
            });
        }
    }
    
    preloadPages() {
        // Preload das páginas principais
        const importantPages = [
            'src/pages/portfolio.html',
            'src/pages/projects/projeto-onadv.html'
        ];
        
        importantPages.forEach(page => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = page;
            document.head.appendChild(link);
        });
    }
    
    checkPerformance() {
        // Log de performance básico
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    console.log('📊 Performance:', {
                        'DOM Content Loaded': Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart),
                        'Page Load Time': Math.round(perfData.loadEventEnd - perfData.navigationStart),
                        'DNS Lookup': Math.round(perfData.domainLookupEnd - perfData.domainLookupStart)
                    });
                }, 1000);
            });
        }
    }
}

// Inicializar Portfolio
const portfolio = new Portfolio();

// Exportar para uso global se necessário
window.Portfolio = Portfolio;
