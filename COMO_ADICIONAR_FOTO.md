# 📸 Como Adicionar Sua Foto no Hero

## 📍 Localização da Foto
Para adicionar sua foto de perfil na seção hero (principal), siga estes passos:

### 1️⃣ **Preparar a Foto**
- **Formato**: JPG, PNG ou WebP
- **Tamanho recomendado**: 200x200px (mínimo)
- **Aspecto**: Quadrado (1:1)
- **Qualidade**: Boa resolução, bem iluminada
- **Nome sugerido**: `profile-photo.jpg`

### 2️⃣ **Onde Colocar**
Coloque sua foto na pasta:
```
assets/images/profile-photo.jpg
```

### 3️⃣ **Atualizar o HTML**
No arquivo `index.html`, encontre esta seção (linha ~55):

```html
<!-- Foto de perfil centralizada -->
<div class="hero-profile">
    <!-- Substituir por sua foto -->
    <div class="profile-photo-placeholder" id="hero-profile-photo">
        C
    </div>
    <!-- Para quando adicionar uma foto, use:
    <img src="assets/images/profile-photo.jpg" alt="Seu Nome" class="hero-profile-photo" id="hero-profile-photo">
    -->
</div>
```

**Substituir por:**
```html
<!-- Foto de perfil centralizada -->
<div class="hero-profile">
    <img src="assets/images/profile-photo.jpg" alt="Seu Nome" class="hero-profile-photo" id="hero-profile-photo">
</div>
```

### 4️⃣ **Atualizar Outras Páginas**
Repita o mesmo processo nos outros arquivos HTML:
- `src/pages/portfolio.html`
- `src/pages/projects/projeto-*.html`

## ✨ **Animações Incluídas**

Sua foto terá automaticamente:

### **🎯 Efeitos Visuais**
- **Fade-in**: Entrada suave após 500ms
- **Hover**: Scale 1.1 + glow laranja
- **Border**: Gradient laranja animado
- **Shadow**: Box-shadow dinâmica

### **🔄 Animações Interativas**
- **Scroll**: Pequeno scale no scroll
- **Click**: Pulso + ripple effect
- **Breathing**: Respiração sutil a cada 5s
- **Responsive**: Adapta para mobile

### **🎨 Estados Visuais**
```css
/* Normal */
45x45px, border laranja, shadow sutil

/* Hover */
Scale 1.1, shadow intensa, border glow

/* Mobile */
40x40px, posição ajustada

/* Dark Mode */
Shadow mais intensa, contraste otimizado
```

## 📱 **Responsividade**

### **Desktop** (>768px)
- Posição: Lado esquerdo do hero, ao lado do título
- Tamanho: 200x200px
- Layout: Grid de duas colunas (foto | texto)
- Animações: Todas ativas

### **Mobile** (≤768px)
- Posição: Topo do hero, centralizada
- Tamanho: 150x150px
- Layout: Stack vertical (foto acima do texto)
- Animações: Conservadas

## 🔧 **Customização**

### **Alterar Tamanho**
```css
.profile-photo {
    width: 50px;  /* Aumentar */
    height: 50px; /* Aumentar */
}
```

### **Alterar Cor da Borda**
```css
.profile-photo {
    border: 2px solid #FF6B35; /* Nova cor */
}
```

### **Desabilitar Animações**
```css
.profile-photo {
    transition: none !important;
}
```

## 🚀 **Resultado Final**

Após adicionar sua foto, você terá:
- ✅ Header centralizado e bem espaçado
- ✅ Foto de perfil no centro do navbar
- ✅ Animações suaves e profissionais
- ✅ Responsividade perfeita
- ✅ Efeitos de luz sutis
- ✅ Interatividade elegante

## ❓ **Troubleshooting**

### **Foto não aparece:**
- Verifique o caminho: `assets/images/profile-photo.jpg`
- Confirme o nome do arquivo
- Teste com formato diferente (PNG)

### **Foto distorcida:**
- Use proporção 1:1 (quadrada)
- Redimensione para 200x200px

### **Animações não funcionam:**
- Verifique se o `id="profile-photo"` está correto
- Confirme que o JavaScript está carregando

**🎉 Pronto! Seu header estará perfeito com sua foto personalizada!**
