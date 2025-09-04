// JavaScript para animações da página Sobre Mim

document.addEventListener('DOMContentLoaded', function() {
    initializeProficiencyBars();
    initializeTimelineAnimations();
    initializeScrollAnimations();
    initializeValueCards();
    initializeTechItems();
});

// ===== BARRAS DE PROFICIÊNCIA ===== 
function initializeProficiencyBars() {
    const techItems = document.querySelectorAll('.tech-item');
    
    // Intersection Observer para animar as barras quando visíveis
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const proficiencyFill = entry.target.querySelector('.proficiency-fill');
                if (proficiencyFill) {
                    const level = proficiencyFill.getAttribute('data-level');
                    
                    // Delay para criar efeito escalonado
                    setTimeout(() => {
                        proficiencyFill.style.setProperty('--target-width', level + '%');
                        proficiencyFill.classList.add('animate');
                        proficiencyFill.style.width = level + '%';
                        
                        // Adicionar efeito de contagem
                        animateCountUp(entry.target.querySelector('.proficiency-text'), level);
                    }, 200);
                }
                
                // Animar apenas uma vez
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });
    
    techItems.forEach(item => {
        observer.observe(item);
    });
}

function animateCountUp(element, targetValue) {
    if (!element) return;
    
    const duration = 1500; // ms
    const startValue = 0;
    const increment = targetValue / (duration / 16); // 60 FPS
    let currentValue = startValue;
    
    const timer = setInterval(() => {
        currentValue += increment;
        
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
        }
        
        element.textContent = Math.round(currentValue) + '%';
    }, 16);
}

// ===== ANIMAÇÕES DA TIMELINE =====
function initializeTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Delay escalonado para cada item
                setTimeout(() => {
                    entry.target.classList.add('animate');
                    
                    // Adicionar efeito especial ao ícone
                    const icon = entry.target.querySelector('.timeline-icon');
                    if (icon) {
                        icon.style.animation = 'pulse 0.6s ease-out';
                        setTimeout(() => {
                            icon.style.animation = '';
                        }, 600);
                    }
                }, index * 150);
                
                timelineObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
    
    // Adicionar efeito de hover interativo
    timelineItems.forEach(item => {
        const content = item.querySelector('.timeline-content');
        
        content.addEventListener('mouseenter', () => {
            content.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        content.addEventListener('mouseleave', () => {
            content.style.transform = 'translateY(-3px)';
        });
    });
}

// ===== ANIMAÇÕES DE SCROLL GERAIS =====
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.story-text, .story-highlights, .tech-category, .section-header');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Configurar estado inicial
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        scrollObserver.observe(element);
    });
}

// ===== ANIMAÇÕES DOS CARDS DE VALORES =====
function initializeValueCards() {
    const valueCards = document.querySelectorAll('.value-card');
    
    const valueObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    
                    // Adicionar efeito ao ícone
                    const icon = entry.target.querySelector('.value-icon');
                    if (icon) {
                        icon.style.animation = 'bounceIn 0.6s ease-out';
                        setTimeout(() => {
                            icon.style.animation = '';
                        }, 600);
                    }
                }, index * 100);
                
                valueObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    // Configurar estado inicial
    valueCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.95)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        
        valueObserver.observe(card);
    });
    
    // Adicionar efeito de hover avançado
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
            
            const icon = card.querySelector('.value-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(-5px) scale(1)';
            
            const icon = card.querySelector('.value-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// ===== ANIMAÇÕES DOS ITENS DE TECNOLOGIA =====
function initializeTechItems() {
    const techCategories = document.querySelectorAll('.tech-category');
    
    techCategories.forEach(category => {
        const techItems = category.querySelectorAll('.tech-item');
        
        // Adicionar efeito de hover com delay
        techItems.forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                // Destacar o item atual
                item.style.transform = 'translateY(-5px) scale(1.03)';
                item.style.zIndex = '10';
                
                // Efeito sutil nos outros itens
                techItems.forEach((otherItem, otherIndex) => {
                    if (otherIndex !== index) {
                        otherItem.style.opacity = '0.7';
                        otherItem.style.transform = 'scale(0.98)';
                    }
                });
            });
            
            item.addEventListener('mouseleave', () => {
                // Restaurar todos os itens
                techItems.forEach(otherItem => {
                    otherItem.style.opacity = '1';
                    otherItem.style.transform = 'scale(1)';
                    otherItem.style.zIndex = '1';
                });
            });
        });
    });
    
    // Adicionar efeito de click para mostrar mais detalhes
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach(item => {
        item.addEventListener('click', () => {
            showTechDetails(item);
        });
        
        // Adicionar cursor pointer
        item.style.cursor = 'pointer';
    });
}

function showTechDetails(techItem) {
    const techName = techItem.querySelector('h4').textContent;
    const proficiencyText = techItem.querySelector('.proficiency-text').textContent;
    const level = techItem.getAttribute('data-level');
    
    // Criar modal simples com detalhes da tecnologia
    const modal = document.createElement('div');
    modal.className = 'tech-modal';
    modal.innerHTML = `
        <div class="modal-backdrop" onclick="closeTechModal()"></div>
        <div class="modal-content">
            <button class="modal-close" onclick="closeTechModal()">
                <i class="fas fa-times"></i>
            </button>
            <div class="modal-header">
                <h3>${techName}</h3>
                <span class="modal-proficiency">${proficiencyText}</span>
            </div>
            <div class="modal-body">
                <p>Experiência com ${techName} em projetos profissionais e pessoais.</p>
                <div class="modal-level">
                    <span class="level-label">Nível de Proficiência:</span>
                    <span class="level-value">${level}</span>
                </div>
            </div>
        </div>
    `;
    
    // Adicionar estilos inline
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease-out;
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Event listener para fechar com ESC
    const handleEsc = (e) => {
        if (e.key === 'Escape') {
            closeTechModal();
            document.removeEventListener('keydown', handleEsc);
        }
    };
    document.addEventListener('keydown', handleEsc);
}

function closeTechModal() {
    const modal = document.querySelector('.tech-modal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
        }, 300);
    }
}

// ===== PARALLAX SUAVE =====
function initializeParallax() {
    const parallaxElements = document.querySelectorAll('.hero-image, .profile-container');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// ===== EFEITOS DE PERFORMANCE =====
function initializePerformanceOptimizations() {
    // Lazy loading para imagens
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Debounce para scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // Ações de scroll com debounce
            updateScrollProgress();
        }, 10);
    });
}

function updateScrollProgress() {
    const scrollProgress = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    
    // Pode ser usado para uma barra de progresso
    console.log(`Scroll progress: ${scrollProgress.toFixed(1)}%`);
}

// ===== EASTER EGGS =====
function initializeEasterEggs() {
    // Konami code ou sequência especial
    let sequence = [];
    const targetSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown'];
    
    document.addEventListener('keydown', (e) => {
        sequence.push(e.key);
        sequence = sequence.slice(-targetSequence.length);
        
        if (JSON.stringify(sequence) === JSON.stringify(targetSequence)) {
            triggerSpecialAnimation();
            sequence = [];
        }
    });
}

function triggerSpecialAnimation() {
    // Animação especial quando o código é descoberto
    const profileImage = document.querySelector('.profile-image img');
    if (profileImage) {
        profileImage.style.animation = 'rainbow 2s ease-in-out';
        setTimeout(() => {
            profileImage.style.animation = '';
        }, 2000);
    }
    
    // Mostrar mensagem
    showToast('🎉 Código especial descoberto! Obrigado por explorar!');
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: 0 5px 15px var(--shadow-medium);
        z-index: 10000;
        animation: slideInRight 0.5s ease-out;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.5s ease-out';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 500);
    }, 3000);
}

// ===== ADICIONAR ESTILOS CSS VIA JAVASCRIPT =====
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        @keyframes bounceIn {
            0% { opacity: 0; transform: scale(0.3); }
            50% { opacity: 1; transform: scale(1.05); }
            70% { transform: scale(0.9); }
            100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            25% { filter: hue-rotate(90deg); }
            50% { filter: hue-rotate(180deg); }
            75% { filter: hue-rotate(270deg); }
            100% { filter: hue-rotate(360deg); }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        @keyframes slideInRight {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); }
            to { transform: translateX(100%); }
        }
        
        .tech-modal .modal-content {
            background: var(--bg-card);
            border-radius: var(--border-radius-lg);
            padding: 2rem;
            max-width: 400px;
            width: 90%;
            position: relative;
            border: 1px solid var(--border-color);
        }
        
        .tech-modal .modal-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 1.2rem;
            color: var(--text-secondary);
            cursor: pointer;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: var(--transition);
        }
        
        .tech-modal .modal-close:hover {
            background: var(--bg-tertiary);
            color: var(--text-primary);
        }
        
        .tech-modal .modal-header {
            margin-bottom: 1rem;
        }
        
        .tech-modal .modal-header h3 {
            color: var(--text-primary);
            margin-bottom: 0.5rem;
        }
        
        .tech-modal .modal-proficiency {
            color: var(--primary-color);
            font-weight: 600;
        }
        
        .tech-modal .modal-body p {
            color: var(--text-secondary);
            line-height: 1.6;
            margin-bottom: 1rem;
        }
        
        .tech-modal .modal-level {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem;
            background: var(--bg-tertiary);
            border-radius: var(--border-radius);
        }
        
        .tech-modal .level-label {
            color: var(--text-secondary);
            font-size: 0.9rem;
        }
        
        .tech-modal .level-value {
            color: var(--primary-color);
            font-weight: 600;
        }
    `;
    document.head.appendChild(style);
}

// ===== INICIALIZAÇÃO COMPLETA =====
window.addEventListener('load', () => {
    addAnimationStyles();
    initializeParallax();
    initializePerformanceOptimizations();
    initializeEasterEggs();
    
    // Adicionar classe para indicar que a página está carregada
    document.body.classList.add('about-loaded');
});

// ===== CLEANUP =====
window.addEventListener('beforeunload', () => {
    // Limpar timers e observers se necessário
});

// Export para uso em outros módulos se necessário
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeProficiencyBars,
        initializeTimelineAnimations,
        showTechDetails,
        closeTechModal
    };
}
