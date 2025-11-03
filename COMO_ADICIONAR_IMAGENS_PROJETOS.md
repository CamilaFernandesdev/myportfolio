# 📸 COMO ADICIONAR IMAGENS E LINKS AOS PROJETOS

## 🎯 **GUIA COMPLETO PARA PERSONALIZAR SEUS PROJETOS**

---

## 📁 **1. ESTRUTURA DE PASTAS RECOMENDADA**

```
myportfolio/
├── assets/
│   └── images/
│       └── projects/
│           ├── onadv-screenshot.jpg
│           ├── crypto-app-demo.png
│           ├── dashboard-analytics.jpg
│           └── tableau-scraper.png
├── index.html
├── styles.css
└── script.js
```

---

## 🖼️ **2. COMO ADICIONAR SUAS IMAGENS**

### **Opção A: Imagens Locais (Recomendado)**

1. **Crie a pasta de imagens:**
   ```bash
   mkdir -p assets/images/projects
   ```

2. **Adicione suas imagens na pasta:**
   - `assets/images/projects/onadv-screenshot.jpg`
   - `assets/images/projects/crypto-app-demo.png`
   - `assets/images/projects/dashboard-analytics.jpg`
   - `assets/images/projects/tableau-scraper.png`

3. **Atualize o arquivo `script.js`:**
   ```javascript
   const projectsData = {
       onadv: {
           title: "onADV Legal Tech",
           image: "assets/images/projects/onadv-screenshot.jpg", // ← Sua imagem aqui
           description: "...",
           // ... resto do código
       },
       crypto: {
           title: "CryptoMarket iOS App",
           image: "assets/images/projects/crypto-app-demo.png", // ← Sua imagem aqui
           // ... resto do código
       }
   };
   ```

### **Opção B: Imagens Online (GitHub, Imgur, etc.)**

```javascript
const projectsData = {
    onadv: {
        title: "onADV Legal Tech",
        image: "https://raw.githubusercontent.com/SeuUsuario/SeuRepo/main/screenshots/onadv.jpg",
        // ... resto do código
    }
};
```

---

## 🔗 **3. COMO ATUALIZAR LINKS DOS PROJETOS**

### **Edite o arquivo `script.js` na seção `projectsData`:**

```javascript
const projectsData = {
    onadv: {
        // ... outras propriedades
        links: [
            { text: "GitHub", url: "https://github.com/SeuUsuario/onADV-project" },
            { text: "Site", url: "https://onadv-demo.vercel.app" },
            { text: "Documentação", url: "https://docs.onadv.com" }
        ]
    },
    crypto: {
        // ... outras propriedades
        links: [
            { text: "GitHub", url: "https://github.com/SeuUsuario/crypto-ios-app" },
            { text: "App Store", url: "https://apps.apple.com/app/cryptomarket" },
            { text: "Demo Video", url: "https://youtube.com/watch?v=demo" }
        ]
    }
};
```

---

## 🎨 **4. PERSONALIZANDO CONTEÚDO DOS PROJETOS**

### **Atualize as informações no `script.js`:**

```javascript
const projectsData = {
    meuProjeto: {
        title: "Meu Projeto Incrível",
        image: "assets/images/projects/meu-projeto.jpg",
        description: "Descrição detalhada do seu projeto...",
        badges: ["React", "TypeScript", "Concluído"],
        technologies: ["React", "TypeScript", "Node.js", "MongoDB"],
        features: [
            "Feature 1 do seu projeto",
            "Feature 2 do seu projeto",
            "Feature 3 do seu projeto"
        ],
        links: [
            { text: "GitHub", url: "https://github.com/seu-usuario/seu-projeto" },
            { text: "Demo", url: "https://seu-projeto.vercel.app" }
        ]
    }
};
```

---

## 📱 **5. ADICIONANDO NOVOS PROJETOS**

### **1. Adicione no HTML (`index.html`):**

```html
<!-- Novo Projeto -->
<div class="project-card-modern" data-project="novoProjeto">
    <div class="project-image-container">
        <img src="assets/images/projects/novo-projeto.jpg" alt="Novo Projeto" class="project-image">
        <div class="project-overlay">
            <div class="project-badges">
                <span class="badge badge-web">Web</span>
                <span class="badge badge-completed">Concluído</span>
            </div>
            <div class="project-actions">
                <button class="project-btn primary" onclick="openProjectModal('novoProjeto')">
                    Ver Detalhes
                </button>
                <a href="https://github.com/seu-usuario" class="project-btn secondary" target="_blank">
                    GitHub
                </a>
            </div>
        </div>
    </div>
    <div class="project-content">
        <h3>Novo Projeto</h3>
        <p>Descrição breve do novo projeto...</p>
        <div class="project-tech-stack">
            <span class="tech-tag">React</span>
            <span class="tech-tag">Node.js</span>
        </div>
    </div>
</div>
```

### **2. Adicione no JavaScript (`script.js`):**

```javascript
const projectsData = {
    // ... projetos existentes
    novoProjeto: {
        title: "Novo Projeto",
        image: "assets/images/projects/novo-projeto.jpg",
        description: "Descrição completa do novo projeto...",
        badges: ["Web", "Concluído"],
        technologies: ["React", "Node.js", "MongoDB"],
        features: [
            "Feature 1",
            "Feature 2",
            "Feature 3"
        ],
        links: [
            { text: "GitHub", url: "https://github.com/seu-usuario/novo-projeto" },
            { text: "Demo", url: "https://novo-projeto.vercel.app" }
        ]
    }
};
```

---

## 🎯 **6. BADGES DISPONÍVEIS**

### **Cores dos badges (CSS já configurado):**

- `badge-web` - Azul (#667eea)
- `badge-mobile` - Roxo (#764ba2)  
- `badge-data` - Rosa (#f093fb)
- `badge-ai` - Laranja (#ff6b35)
- `badge-swift` - Laranja escuro (#fa7343)
- `badge-python` - Azul Python (#3776ab)
- `badge-automation` - Verde (#28a745)
- `badge-development` - Amarelo (#ffc107)
- `badge-completed` - Verde (#28a745)
- `badge-featured` - Vermelho (#dc3545)

---

## 📋 **7. CHECKLIST PARA ADICIONAR PROJETO**

- [ ] ✅ Imagem adicionada na pasta `assets/images/projects/`
- [ ] ✅ Card HTML adicionado no `index.html`
- [ ] ✅ Dados do projeto adicionados no `script.js`
- [ ] ✅ Links do GitHub/Demo atualizados
- [ ] ✅ Badges e tecnologias configuradas
- [ ] ✅ Features listadas
- [ ] ✅ Testado no navegador

---

## 🚀 **8. DICAS IMPORTANTES**

### **📸 Imagens:**
- **Tamanho recomendado:** 800x400px
- **Formato:** JPG ou PNG
- **Peso:** Máximo 500KB para performance

### **🔗 Links:**
- Use `target="_blank"` para abrir em nova aba
- Teste todos os links antes de publicar
- Use URLs completas (com https://)

### **🎨 Design:**
- Mantenha consistência nas descrições
- Use badges relevantes para cada projeto
- Limite de 6 features por projeto para melhor UX

---

## 🎉 **PRONTO!**

Agora você pode personalizar completamente seus projetos! 

**🌐 Acesse:** `localhost:3000` para ver as mudanças

**❓ Dúvidas?** Consulte este guia ou me pergunte! 🚀
