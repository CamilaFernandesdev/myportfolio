// ===== GERENCIADOR DE TEMA =====

export class ThemeManager {
    constructor() {
        this.themeKey = 'portfolio-theme';
        this.toggleButton = null;
        this.currentTheme = this.getStoredTheme() || this.getSystemPreference();
    }
    
    init() {
        this.toggleButton = document.getElementById('theme-toggle');
        
        if (this.toggleButton) {
            this.setupThemeToggle();
        }
        
        // Aplicar tema inicial
        this.applyTheme(this.currentTheme);
        
        // Escutar mudanças na preferência do sistema
        this.listenSystemPreference();
        
        console.log('🎨 Theme Manager inicializado');
    }
    
    setupThemeToggle() {
        // Configurar ícone inicial
        this.updateToggleIcon();
        
        // Adicionar event listener
        this.toggleButton.addEventListener('click', () => {
            this.toggleTheme();
        });
        
        // Adicionar keyboard support
        this.toggleButton.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        
        // Feedback visual
        this.toggleButton.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.toggleButton.style.transform = 'scale(1)';
        }, 150);
    }
    
    setTheme(theme) {
        this.currentTheme = theme;
        this.applyTheme(theme);
        this.storeTheme(theme);
        this.updateToggleIcon();
        
        // Dispatch custom event
        document.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { theme }
        }));
    }
    
    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        // Atualizar meta theme-color para mobile
        const themeColor = theme === 'dark' ? '#1A1A1A' : '#FEFEFE';
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }
        
        metaThemeColor.content = themeColor;
    }
    
    updateToggleIcon() {
        if (!this.toggleButton) return;
        
        const icon = this.toggleButton.querySelector('i');
        if (icon) {
            icon.className = this.currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
        
        // Atualizar aria-label
        this.toggleButton.setAttribute('aria-label', 
            this.currentTheme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'
        );
    }
    
    getStoredTheme() {
        try {
            return localStorage.getItem(this.themeKey);
        } catch (e) {
            console.warn('LocalStorage não disponível:', e);
            return null;
        }
    }
    
    storeTheme(theme) {
        try {
            localStorage.setItem(this.themeKey, theme);
        } catch (e) {
            console.warn('Não foi possível salvar tema:', e);
        }
    }
    
    getSystemPreference() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }
    
    listenSystemPreference() {
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            mediaQuery.addEventListener('change', (e) => {
                // Só aplicar se não houver preferência armazenada
                if (!this.getStoredTheme()) {
                    const newTheme = e.matches ? 'dark' : 'light';
                    this.setTheme(newTheme);
                }
            });
        }
    }
    
    getCurrentTheme() {
        return this.currentTheme;
    }
}
