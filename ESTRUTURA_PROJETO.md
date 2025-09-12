# Estrutura Organizada do Portfolio

## Nova Arquitetura

```
myportfolio/
├── **Página Principal**
│   └── index.html                    # Landing page principal
│
├── **src/** (Código fonte)
│   ├── **components/** (Componentes reutilizáveis)
│   │   ├── navbar.html               # Barra de navegação
│   │   ├── footer.html               # Rodapé
│   │   └── head.html                 # Meta tags e links
│   │
│   ├── **css/** (Estilos modulares)
│   │   ├── main.css                  # CSS principal (importa todos)
│   │   ├── variables.css             # Variáveis CSS e temas
│   │   ├── base.css                  # Reset, tipografia e utilitários
│   │   ├── components.css            # Estilos de componentes
│   │   └── pages.css                 # Estilos específicos de páginas
│   │
│   ├── **js/** (JavaScript modular)
│   │   ├── main.js                   # JavaScript principal (ES6 modules)
│   │   ├── portfolio-simple.js       # Versão simples (sem modules)
│   │   ├── theme.js                  # Gerenciador de tema
│   │   ├── navigation.js             # Gerenciador de navegação
│   │   ├── animations.js             # Gerenciador de animações
│   │   └── forms.js                  # Gerenciador de formulários
│   │
│   └── **pages/** (Páginas do site)
│       ├── portfolio.html            # Portfolio completo
│       └── **projects/** (Projetos individuais)
│           ├── projeto-onadv.html              # onADV Legal Tech
│           ├── projeto-ecommerce-app.html      # App E-commerce
│           ├── projeto-tableau-scraper.html    # Tableau Scraper
│           └── projeto-dashboard-analytics.html # Dashboard BI
│
├── **assets/** (Recursos)
│   └── **images/** (Imagens)
│       └── onadv-landing.png         # Screenshot do onADV
│
├── **backup/** (Arquivos antigos)
│   ├── styles.css                    # CSS antigo
│   ├── script.js                     # JS antigo
│   └── *.css, *.js                   # Outros arquivos antigos
│
└── **Documentação**
    ├── README.md                     # Documentação principal
    ├── ESTRUTURA_PROJETO.md          # Este arquivo
    └── LICENSE                       # Licença MIT
```

## Funcionalidades por Módulo

### **CSS Modular**

#### **variables.css** - Sistema de Design
- Variáveis CSS para cores, fontes, espaçamentos
- Tema claro e escuro completo
- Sistema de tokens de design
- Breakpoints responsivos

#### **base.css** - Fundação
- Reset CSS moderno
- Tipografia base (Inter font)
- Classes utilitárias
- Botões globais
- Sistema de grid e layout

#### **components.css** - Componentes
- Navbar com scroll effects
- Footer responsivo
- Sistema de badges
- Cards reutilizáveis
- Loading states

#### **pages.css** - Páginas
- Hero sections
- Seções de conteúdo
- Layouts específicos
- Animações de página

### **JavaScript Modular**

#### **portfolio-simple.js** - Versão Simplificada
- Sem dependência de ES6 modules
- Máxima compatibilidade
- Todas as funcionalidades integradas

#### **main.js** - Versão Modular
- Importação de módulos ES6
- Classe principal Portfolio
- Inicialização coordenada
- Performance monitoring

#### **theme.js** - Gerenciamento de Tema
- Toggle claro/escuro
- Persistência no localStorage
- Detecção de preferência do sistema
- Acessibilidade completa

#### **navigation.js** - Navegação
- Menu mobile com hamburger
- Scroll effects na navbar
- Active link highlighting
- Keyboard navigation

#### **animations.js** - Animações
- Intersection Observer
- Respect para prefers-reduced-motion
- Contadores animados
- Efeitos parallax

#### **forms.js** - Formulários
- Validação em tempo real
- Estados de loading
- Feedback visual
- Acessibilidade

## **Navegação e Links**

### **Estrutura de Links**

#### **Página Principal (index.html)**
```html
<!-- CSS -->
<link rel="stylesheet" href="src/css/main.css">

<!-- Navegação -->
<a href="src/pages/portfolio.html">Portfolio</a>

<!-- Projetos -->
<a href="src/pages/projects/projeto-*.html">Ver Projeto</a>

<!-- JavaScript -->
<script src="src/js/portfolio-simple.js"></script>
```

#### **Portfolio (src/pages/portfolio.html)**
```html
<!-- CSS -->
<link rel="stylesheet" href="../css/main.css">

<!-- Navegação -->
<a href="../../index.html">Home</a>
<a href="../../index.html#about">Sobre</a>

<!-- Projetos -->
<a href="projects/projeto-*.html">Ver Projeto</a>
```

#### **Projetos (src/pages/projects/*.html)**
```html
<!-- CSS -->
<link rel="stylesheet" href="../../css/main.css">

<!-- Navegação -->
<a href="../../../index.html">Home</a>
<a href="../portfolio.html">Portfolio</a>
```

## **Sistema de Temas**

### **Variáveis de Cor**
```css
:root {
  /* Cores Principais */
  --primary-color: #FF8C42;     /* Pêssego vibrante */
  --secondary-color: #D4A574;   /* Dourado outonal */
  --accent-color: #FFAB73;      /* Pêssego claro */
  
  /* Tema Claro */
  --text-primary: #2D3748;      /* Texto principal */
  --bg-primary: #FEFEFE;        /* Fundo principal */
  
  /* Tema Escuro */
  [data-theme="dark"] {
    --text-primary: #F7FAFC;    /* Texto principal */
    --bg-primary: #1A1A1A;      /* Fundo principal */
  }
}
```

### **Toggle de Tema**
- Botão acessível na navbar
- Persistência entre sessões
- Detecção automática de preferência
- Animações suaves de transição

## **Responsividade**

### **Breakpoints**
```css
/* Mobile First */
@media (max-width: 768px) { /* Mobile */ }
@media (max-width: 992px) { /* Tablet */ }
@media (max-width: 1200px) { /* Desktop */ }
```

### **Layouts**
- **Grid**: Auto-fit com minmax
- **Flexbox**: Para componentes
- **Container**: Max-width 1200px
- **Spacing**: Sistema consistente

## **Performance**

### **Otimizações**
- **CSS**: Modular e otimizado
- **JavaScript**: Carregamento eficiente
- **Imagens**: Lazy loading preparado
- **Fonts**: Preload do Google Fonts
- **Cache**: Headers apropriados

### **Métricas Esperadas**
- **Lighthouse Performance**: 95+
- **First Contentful Paint**: < 1.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3s

## **Comandos Úteis**

### **Servidor Local**
```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

### **Estrutura de Desenvolvimento**
```bash
# Visualizar estrutura
tree /f

# Buscar arquivos
dir /s *.html
dir /s *.css
dir /s *.js
```

## **Principais Melhorias**

### **Organização**
- Separação clara de responsabilidades
- Componentes reutilizáveis
- CSS modular e manutenível
- JavaScript organizado em módulos

### **Manutenibilidade**
- Fácil adição de novos projetos
- Sistema de design consistente
- Responsividade bem estruturada
- Performance otimizada

### **Escalabilidade**
- Estrutura preparada para crescimento
- Componentes plugáveis
- Configuração centralizada
- Monitoramento de performance

### **Acessibilidade**
- ARIA labels e roles
- Navegação por teclado
- Focus management
- Respect para preferências do usuário

---

**Estrutura completamente organizada e pronta para desenvolvimento profissional!**
