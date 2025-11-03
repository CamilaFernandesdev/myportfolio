// ===== FILTROS DE PROJETOS =====

document.addEventListener('DOMContentLoaded', function() {
    initProjectFilters();
});

function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const searchInput = document.getElementById('project-search');
    
    // Setup filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            filterProjects(filter);
        });
    });
    
    // Setup search
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            searchProjects(searchTerm);
        });
    }
    
    function filterProjects(filter) {
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const shouldShow = filter === 'all' || category === filter;
            
            if (shouldShow) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Update counts
        updateFilterCounts();
    }
    
    function searchProjects(searchTerm) {
        projectCards.forEach(card => {
            const title = card.getAttribute('data-title') || '';
            const description = card.querySelector('.project-description')?.textContent || '';
            const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent).join(' ');
            
            const content = (title + ' ' + description + ' ' + tags).toLowerCase();
            const matches = content.includes(searchTerm);
            
            if (matches || searchTerm === '') {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    function updateFilterCounts() {
        const allCount = document.querySelectorAll('.project-card').length;
        const mobileCount = document.querySelectorAll('.project-card[data-category="mobile"]').length;
        const webCount = document.querySelectorAll('.project-card[data-category="web"]').length;
        const dataCount = document.querySelectorAll('.project-card[data-category="data"]').length;
        
        // Update count badges
        const allBtn = document.querySelector('[data-filter="all"] .count');
        const mobileBtn = document.querySelector('[data-filter="mobile"] .count');
        const webBtn = document.querySelector('[data-filter="web"] .count');
        const dataBtn = document.querySelector('[data-filter="data"] .count');
        
        if (allBtn) allBtn.textContent = allCount;
        if (mobileBtn) mobileBtn.textContent = mobileCount;
        if (webBtn) webBtn.textContent = webCount;
        if (dataBtn) dataBtn.textContent = dataCount;
    }
    
    // Initialize counts
    updateFilterCounts();
}
