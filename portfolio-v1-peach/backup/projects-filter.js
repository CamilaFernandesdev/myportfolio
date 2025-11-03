// JavaScript para filtros e funcionalidades da página de projetos

document.addEventListener('DOMContentLoaded', function() {
    initializeProjectFilters();
    initializeProjectSearch();
    initializeViewToggle();
    initializeSorting();
    initializePagination();
    updateProjectCounts();
});

// ===== SISTEMA DE FILTROS =====
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover classe active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adicionar classe active ao botão clicado
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Aplicar filtro com animação
            filterProjects(filterValue, projectCards);
            
            // Efeito visual no botão
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

function filterProjects(filterValue, projectCards) {
    projectCards.forEach((card, index) => {
        const category = card.getAttribute('data-category');
        const shouldShow = filterValue === 'all' || category === filterValue;
        
        if (shouldShow) {
            // Mostrar com animação escalonada
            card.classList.remove('hidden');
            card.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s both`;
        } else {
            // Esconder imediatamente
            card.classList.add('hidden');
        }
    });
    
    // Atualizar contadores
    updateProjectCounts();
}

// ===== SISTEMA DE PESQUISA =====
function initializeProjectSearch() {
    const searchInput = document.getElementById('project-search');
    const projectCards = document.querySelectorAll('.project-card');
    
    let searchTimeout;
    
    searchInput.addEventListener('input', (e) => {
        // Debounce para melhor performance
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const searchTerm = e.target.value.toLowerCase().trim();
            searchProjects(searchTerm, projectCards);
        }, 300);
    });
    
    // Limpar pesquisa com ESC
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            searchProjects('', projectCards);
        }
    });
}

function searchProjects(searchTerm, projectCards) {
    const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
    
    projectCards.forEach(card => {
        const title = card.getAttribute('data-title').toLowerCase();
        const description = card.querySelector('.project-description').textContent.toLowerCase();
        const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
        const client = card.querySelector('.project-client').textContent.toLowerCase();
        
        const matchesSearch = searchTerm === '' || 
                            title.includes(searchTerm) || 
                            description.includes(searchTerm) ||
                            tags.some(tag => tag.includes(searchTerm)) ||
                            client.includes(searchTerm);
        
        const matchesFilter = activeFilter === 'all' || card.getAttribute('data-category') === activeFilter;
        
        if (matchesSearch && matchesFilter) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
    
    // Mostrar mensagem se nenhum resultado for encontrado
    showNoResultsMessage();
    updateProjectCounts();
}

function showNoResultsMessage() {
    const visibleCards = document.querySelectorAll('.project-card:not(.hidden)');
    const projectsGrid = document.getElementById('projects-grid');
    
    // Remover mensagem anterior se existir
    const existingMessage = document.querySelector('.no-results-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    if (visibleCards.length === 0) {
        const message = document.createElement('div');
        message.className = 'no-results-message';
        message.innerHTML = `
            <div class="no-results-content">
                <i class="fas fa-search fa-3x"></i>
                <h3>Nenhum projeto encontrado</h3>
                <p>Tente ajustar os filtros ou pesquisar por outros termos</p>
                <button class="btn btn-secondary" onclick="clearAllFilters()">
                    Limpar Filtros
                </button>
            </div>
        `;
        
        // Estilos inline para a mensagem
        message.style.cssText = `
            grid-column: 1 / -1;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 300px;
            text-align: center;
            color: var(--text-secondary);
        `;
        
        const noResultsContent = message.querySelector('.no-results-content');
        noResultsContent.style.cssText = `
            max-width: 400px;
        `;
        
        const icon = message.querySelector('i');
        icon.style.cssText = `
            color: var(--text-muted);
            margin-bottom: 1rem;
            opacity: 0.5;
        `;
        
        const title = message.querySelector('h3');
        title.style.cssText = `
            color: var(--text-primary);
            margin-bottom: 0.5rem;
            font-size: 1.3rem;
        `;
        
        const description = message.querySelector('p');
        description.style.cssText = `
            margin-bottom: 1.5rem;
            line-height: 1.5;
        `;
        
        projectsGrid.appendChild(message);
    }
}

function clearAllFilters() {
    // Limpar pesquisa
    const searchInput = document.getElementById('project-search');
    searchInput.value = '';
    
    // Resetar filtro para "Todos"
    const allButton = document.querySelector('.filter-btn[data-filter="all"]');
    allButton.click();
    
    // Remover mensagem de "não encontrado"
    const message = document.querySelector('.no-results-message');
    if (message) {
        message.remove();
    }
}

// ===== TOGGLE DE VISUALIZAÇÃO =====
function initializeViewToggle() {
    const viewButtons = document.querySelectorAll('.view-btn');
    const projectsGrid = document.getElementById('projects-grid');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover classe active de todos os botões
            viewButtons.forEach(btn => btn.classList.remove('active'));
            // Adicionar classe active ao botão clicado
            button.classList.add('active');
            
            const viewType = button.getAttribute('data-view');
            
            // Aplicar visualização
            if (viewType === 'list') {
                projectsGrid.classList.add('list-view');
            } else {
                projectsGrid.classList.remove('list-view');
            }
            
            // Salvar preferência
            localStorage.setItem('projectsView', viewType);
            
            // Efeito visual
            button.style.transform = 'scale(0.9)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Carregar preferência salva
    const savedView = localStorage.getItem('projectsView');
    if (savedView) {
        const viewButton = document.querySelector(`[data-view="${savedView}"]`);
        if (viewButton) {
            viewButton.click();
        }
    }
}

// ===== SISTEMA DE ORDENAÇÃO =====
function initializeSorting() {
    const sortSelect = document.getElementById('sort-select');
    
    sortSelect.addEventListener('change', (e) => {
        const sortType = e.target.value;
        sortProjects(sortType);
    });
}

function sortProjects(sortType) {
    const projectsGrid = document.getElementById('projects-grid');
    const projectCards = Array.from(document.querySelectorAll('.project-card'));
    
    projectCards.sort((a, b) => {
        switch (sortType) {
            case 'recent':
                const dateA = new Date(a.getAttribute('data-date') + '-01');
                const dateB = new Date(b.getAttribute('data-date') + '-01');
                return dateB - dateA;
                
            case 'alphabetical':
                const titleA = a.getAttribute('data-title').toLowerCase();
                const titleB = b.getAttribute('data-title').toLowerCase();
                return titleA.localeCompare(titleB);
                
            case 'category':
                const categoryA = a.getAttribute('data-category');
                const categoryB = b.getAttribute('data-category');
                return categoryA.localeCompare(categoryB);
                
            default:
                return 0;
        }
    });
    
    // Reordenar no DOM com animação
    projectCards.forEach((card, index) => {
        card.style.order = index;
        card.style.animation = `fadeInUp 0.4s ease-out ${index * 0.05}s both`;
    });
}

// ===== SISTEMA DE PAGINAÇÃO =====
function initializePagination() {
    const paginationNumbers = document.querySelectorAll('.pagination-number');
    const prevButton = document.querySelector('.pagination-btn.prev');
    const nextButton = document.querySelector('.pagination-btn.next');
    
    let currentPage = 1;
    const itemsPerPage = 6;
    
    paginationNumbers.forEach(button => {
        button.addEventListener('click', () => {
            const page = parseInt(button.textContent);
            goToPage(page);
        });
    });
    
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            goToPage(currentPage - 1);
        }
    });
    
    nextButton.addEventListener('click', () => {
        const totalPages = Math.ceil(document.querySelectorAll('.project-card:not(.hidden)').length / itemsPerPage);
        if (currentPage < totalPages) {
            goToPage(currentPage + 1);
        }
    });
    
    function goToPage(page) {
        currentPage = page;
        
        // Atualizar botões de paginação
        paginationNumbers.forEach(btn => btn.classList.remove('active'));
        const activeButton = document.querySelector(`.pagination-number:nth-child(${page})`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
        
        // Habilitar/desabilitar botões prev/next
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === Math.ceil(document.querySelectorAll('.project-card:not(.hidden)').length / itemsPerPage);
        
        // Scroll suave para o topo da seção
        document.querySelector('.projects-showcase').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ===== CONTADOR DE PROJETOS =====
function updateProjectCounts() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        const filterValue = button.getAttribute('data-filter');
        const countSpan = button.querySelector('.count');
        
        let count;
        if (filterValue === 'all') {
            count = document.querySelectorAll('.project-card:not(.hidden)').length;
        } else {
            count = document.querySelectorAll(`.project-card[data-category="${filterValue}"]:not(.hidden)`).length;
        }
        
        if (countSpan) {
            countSpan.textContent = count;
            
            // Animação no contador
            countSpan.style.transform = 'scale(1.2)';
            setTimeout(() => {
                countSpan.style.transform = 'scale(1)';
            }, 200);
        }
    });
}

// ===== ANIMAÇÕES DE SCROLL =====
function initializeScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
    });
}

// ===== LAZY LOADING DE IMAGENS =====
function initializeLazyLoading() {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('.project-image img').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== ANALYTICS E TRACKING =====
function trackProjectInteraction(projectTitle, action) {
    // Aqui você pode adicionar código para analytics
    console.log(`Project ${action}: ${projectTitle}`);
    
    // Exemplo de integração com Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': 'Projects',
            'event_label': projectTitle
        });
    }
}

// Adicionar tracking aos links de projeto
document.addEventListener('click', (e) => {
    if (e.target.closest('.project-btn')) {
        const projectCard = e.target.closest('.project-card');
        const projectTitle = projectCard.getAttribute('data-title');
        const action = e.target.closest('.project-btn').textContent.trim();
        
        trackProjectInteraction(projectTitle, action);
    }
});

// ===== INICIALIZAÇÃO COMPLETA =====
// Executar animações e lazy loading após o carregamento
window.addEventListener('load', () => {
    initializeScrollAnimations();
    initializeLazyLoading();
    
    // Adicionar classe para indicar que a página está carregada
    document.body.classList.add('projects-loaded');
});

// ===== UTILITÁRIOS =====
// Função para destacar termos de pesquisa
function highlightSearchTerms(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Função para formatar datas
function formatDate(dateString) {
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('pt-BR', { year: 'numeric', month: 'long' });
}

// Export para uso em outros módulos se necessário
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        filterProjects,
        searchProjects,
        updateProjectCounts,
        trackProjectInteraction
    };
}
