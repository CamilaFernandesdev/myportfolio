// JavaScript para o carrossel de imagens dos projetos

let currentSlideIndex = 0;
let totalSlides = 0;
let autoSlideInterval;

// Inicializar carrossel quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    initializeCarousel();
    initializeAutoSlide();
    initializeKeyboardNavigation();
    initializeTouchNavigation();
});

// ===== INICIALIZAÇÃO DO CARROSSEL =====
function initializeCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    totalSlides = slides.length;
    
    if (totalSlides === 0) return;
    
    // Garantir que o primeiro slide está ativo
    showSlide(0);
    
    // Adicionar event listeners aos botões de navegação
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', previousSlide);
        nextBtn.addEventListener('click', nextSlide);
    }
    
    // Event listeners para os indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => currentSlide(index + 1));
    });
    
    // Pausar auto-slide ao hover
    const carousel = document.querySelector('.gallery-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', pauseAutoSlide);
        carousel.addEventListener('mouseleave', resumeAutoSlide);
    }
}

// ===== NAVEGAÇÃO DO CARROSSEL =====
function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
    showSlide(currentSlideIndex);
    resetAutoSlide();
}

function previousSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentSlideIndex);
    resetAutoSlide();
}

function currentSlide(slideNumber) {
    currentSlideIndex = slideNumber - 1;
    showSlide(currentSlideIndex);
    resetAutoSlide();
}

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (slides.length === 0) return;
    
    // Remover classe active de todos os slides
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Adicionar classe active ao slide atual
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    
    if (indicators[index]) {
        indicators[index].classList.add('active');
    }
    
    // Adicionar animação de entrada
    if (slides[index]) {
        slides[index].style.animation = 'slideIn 0.6s ease-out';
        setTimeout(() => {
            slides[index].style.animation = '';
        }, 600);
    }
    
    // Trigger analytics ou callbacks se necessário
    trackSlideView(index);
}

// ===== AUTO-SLIDE ===== 
function initializeAutoSlide() {
    // Auto-slide a cada 6 segundos
    autoSlideInterval = setInterval(() => {
        nextSlide();
    }, 6000);
}

function pauseAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
}

function resumeAutoSlide() {
    pauseAutoSlide();
    initializeAutoSlide();
}

function resetAutoSlide() {
    pauseAutoSlide();
    resumeAutoSlide();
}

// ===== NAVEGAÇÃO POR TECLADO =====
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Verificar se o foco está no carrossel ou se não há elementos focados
        const carousel = document.querySelector('.gallery-carousel');
        const activeElement = document.activeElement;
        
        if (!carousel || !carousel.contains(activeElement)) {
            return;
        }
        
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                previousSlide();
                break;
            case 'ArrowRight':
                e.preventDefault();
                nextSlide();
                break;
            case 'Home':
                e.preventDefault();
                currentSlide(1);
                break;
            case 'End':
                e.preventDefault();
                currentSlide(totalSlides);
                break;
            case ' ':
            case 'Enter':
                e.preventDefault();
                // Pausar/retomar auto-slide
                if (autoSlideInterval) {
                    pauseAutoSlide();
                } else {
                    resumeAutoSlide();
                }
                break;
        }
    });
}

// ===== NAVEGAÇÃO POR TOUCH (MOBILE) =====
function initializeTouchNavigation() {
    const carousel = document.querySelector('.carousel-container');
    if (!carousel) return;
    
    let startX = 0;
    let endX = 0;
    let isDragging = false;
    
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        pauseAutoSlide();
    }, { passive: true });
    
    carousel.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        endX = e.touches[0].clientX;
    }, { passive: true });
    
    carousel.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        
        const deltaX = startX - endX;
        const threshold = 50; // Distância mínima para trigger
        
        if (Math.abs(deltaX) > threshold) {
            if (deltaX > 0) {
                // Swipe para esquerda - próximo slide
                nextSlide();
            } else {
                // Swipe para direita - slide anterior
                previousSlide();
            }
        }
        
        resumeAutoSlide();
    });
    
    // Prevenir drag de imagens
    carousel.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
}

// ===== LAZY LOADING DE IMAGENS =====
function initializeLazyLoading() {
    const images = document.querySelectorAll('.carousel-slide img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== PRELOAD DE IMAGENS =====
function preloadImages() {
    const slides = document.querySelectorAll('.carousel-slide');
    
    slides.forEach((slide, index) => {
        const img = slide.querySelector('img');
        if (img && img.src) {
            // Preload da próxima imagem
            const nextIndex = (index + 1) % totalSlides;
            const nextSlide = slides[nextIndex];
            const nextImg = nextSlide?.querySelector('img');
            
            if (nextImg && nextImg.dataset.src) {
                const preloadImg = new Image();
                preloadImg.src = nextImg.dataset.src;
            }
        }
    });
}

// ===== ANALYTICS E TRACKING =====
function trackSlideView(slideIndex) {
    const slide = document.querySelectorAll('.carousel-slide')[slideIndex];
    if (!slide) return;
    
    const slideTitle = slide.querySelector('.slide-caption h3')?.textContent || `Slide ${slideIndex + 1}`;
    
    // Exemplo de tracking
    console.log(`Slide visualizado: ${slideTitle}`);
    
    // Integração com Google Analytics se disponível
    if (typeof gtag !== 'undefined') {
        gtag('event', 'slide_view', {
            'event_category': 'Project Gallery',
            'event_label': slideTitle,
            'value': slideIndex + 1
        });
    }
}

// ===== CONTROLES DE REPRODUÇÃO =====
function createPlayPauseButton() {
    const carousel = document.querySelector('.gallery-carousel');
    if (!carousel) return;
    
    const playPauseBtn = document.createElement('button');
    playPauseBtn.className = 'carousel-play-pause';
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    playPauseBtn.setAttribute('aria-label', 'Pausar slideshow');
    
    playPauseBtn.addEventListener('click', () => {
        if (autoSlideInterval) {
            pauseAutoSlide();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            playPauseBtn.setAttribute('aria-label', 'Reproduzir slideshow');
        } else {
            resumeAutoSlide();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            playPauseBtn.setAttribute('aria-label', 'Pausar slideshow');
        }
    });
    
    // Estilos inline para o botão
    playPauseBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        background: rgba(255, 255, 255, 0.9);
        border: none;
        border-radius: 50%;
        color: var(--primary-color);
        cursor: pointer;
        font-size: 1rem;
        transition: var(--transition);
        z-index: 10;
        backdrop-filter: blur(10px);
    `;
    
    carousel.appendChild(playPauseBtn);
}

// ===== MODAL DE IMAGEM AMPLIADA =====
function initializeImageModal() {
    const slides = document.querySelectorAll('.carousel-slide img');
    
    slides.forEach(img => {
        img.addEventListener('click', () => {
            openImageModal(img.src, img.alt);
        });
        
        // Adicionar cursor pointer
        img.style.cursor = 'pointer';
    });
}

function openImageModal(src, alt) {
    // Criar modal
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-backdrop" onclick="closeImageModal()"></div>
        <div class="modal-content">
            <button class="modal-close" onclick="closeImageModal()">
                <i class="fas fa-times"></i>
            </button>
            <img src="${src}" alt="${alt}">
            <div class="modal-caption">${alt}</div>
        </div>
    `;
    
    // Estilos inline para o modal
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease-out;
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.querySelector('.image-modal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
        }, 300);
    }
}

// ===== INICIALIZAÇÃO COMPLETA =====
window.addEventListener('load', () => {
    preloadImages();
    initializeLazyLoading();
    createPlayPauseButton();
    initializeImageModal();
});

// ===== CLEANUP =====
window.addEventListener('beforeunload', () => {
    pauseAutoSlide();
});

// ===== ESTILOS CSS ADICIONAIS VIA JAVASCRIPT =====
function addCarouselStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        .carousel-play-pause:hover {
            background: var(--primary-color) !important;
            color: white !important;
            transform: scale(1.1);
        }
        
        .image-modal .modal-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
            background: white;
            border-radius: var(--border-radius);
            overflow: hidden;
        }
        
        .image-modal img {
            width: 100%;
            height: auto;
            display: block;
        }
        
        .image-modal .modal-close {
            position: absolute;
            top: 10px;
            right: 10px;
            width: 40px;
            height: 40px;
            background: rgba(0, 0, 0, 0.7);
            border: none;
            border-radius: 50%;
            color: white;
            cursor: pointer;
            font-size: 1.2rem;
            z-index: 10;
        }
        
        .image-modal .modal-caption {
            padding: 1rem;
            background: white;
            text-align: center;
            color: var(--text-primary);
            font-weight: 500;
        }
        
        .carousel-container {
            touch-action: pan-y;
        }
        
        @media (prefers-reduced-motion: reduce) {
            .carousel-slide,
            .image-modal {
                animation: none !important;
            }
        }
    `;
    document.head.appendChild(style);
}

// Adicionar estilos quando o DOM carregar
document.addEventListener('DOMContentLoaded', addCarouselStyles);

// Export para uso em outros módulos se necessário
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        nextSlide,
        previousSlide,
        currentSlide,
        pauseAutoSlide,
        resumeAutoSlide
    };
}
