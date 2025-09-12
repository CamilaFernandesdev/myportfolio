// ===== CARROSSEL SIMPLES =====

document.addEventListener('DOMContentLoaded', function() {
    initCarousel();
});

function initCarousel() {
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!carouselWrapper || slides.length === 0) return;
    
    let currentSlide = 0;
    
    // Setup navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            goToSlide(currentSlide - 1);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            goToSlide(currentSlide + 1);
        });
    }
    
    // Setup indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            goToSlide(index);
        });
    });
    
    // Auto slide (opcional)
    let autoSlideInterval = setInterval(autoSlide, 5000);
    
    // Pause auto slide on hover
    carouselWrapper.addEventListener('mouseenter', function() {
        clearInterval(autoSlideInterval);
    });
    
    carouselWrapper.addEventListener('mouseleave', function() {
        autoSlideInterval = setInterval(autoSlide, 5000);
    });
    
    function goToSlide(slideIndex) {
        // Wrap around
        if (slideIndex >= slides.length) {
            slideIndex = 0;
        } else if (slideIndex < 0) {
            slideIndex = slides.length - 1;
        }
        
        // Remove active from all slides
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active to current slide
        slides[slideIndex].classList.add('active');
        if (indicators[slideIndex]) {
            indicators[slideIndex].classList.add('active');
        }
        
        currentSlide = slideIndex;
    }
    
    function autoSlide() {
        goToSlide(currentSlide + 1);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            goToSlide(currentSlide - 1);
        } else if (e.key === 'ArrowRight') {
            goToSlide(currentSlide + 1);
        }
    });
    
    // Touch/swipe support (básico)
    let startX = 0;
    let endX = 0;
    
    carouselWrapper.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });
    
    carouselWrapper.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const threshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                // Swipe left - next slide
                goToSlide(currentSlide + 1);
            } else {
                // Swipe right - previous slide
                goToSlide(currentSlide - 1);
            }
        }
    }
}
