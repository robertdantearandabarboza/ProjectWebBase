document.addEventListener('DOMContentLoaded', function() {
    const heroCarousel = document.querySelector('.hero-carousel');
    if (!heroCarousel) return; // Exit if no hero carousel found

    const carouselInner = heroCarousel.querySelector('.carousel-inner');
    const slides = heroCarousel.querySelectorAll('.carousel-slide');
    const prevBtn = heroCarousel.querySelector('.carousel-control.prev');
    const nextBtn = heroCarousel.querySelector('.carousel-control.next');
    
    let currentIndex = 0;
    let isAnimating = false;
    let autoSlideInterval;
    const slideDuration = 6000; // 6 seconds per slide
    const transitionDuration = 600; // Animation duration in ms
    let touchStartX = 0;
    let touchEndX = 0;

    // Initialize carousel
    function initCarousel() {
        if (slides.length === 0) return;
        
        // Set initial active state
        slides[0].classList.add('active');
        
        // Start auto slide
        startAutoSlide();
        
        // Add event listeners
        if (prevBtn) prevBtn.addEventListener('click', showPrevSlide);
        if (nextBtn) nextBtn.addEventListener('click', showNextSlide);
        
        // Touch support
        carouselInner.addEventListener('touchstart', handleTouchStart, false);
        carouselInner.addEventListener('touchend', handleTouchEnd, false);
        
        // Pause on hover
        heroCarousel.addEventListener('mouseenter', pauseAutoSlide);
        heroCarousel.addEventListener('mouseleave', startAutoSlide);
        
        // Keyboard navigation
        document.addEventListener('keydown', handleKeyDown);
    }
    
    // Handle touch start
    function handleTouchStart(event) {
        touchStartX = event.touches[0].clientX;
    }
    
    // Handle touch end
    function handleTouchEnd(event) {
        if (!touchStartX) return;
        
        touchEndX = event.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        
        // Minimum swipe distance (50px)
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                // Swipe left - next slide
                showNextSlide();
            } else {
                // Swipe right - previous slide
                showPrevSlide();
            }
        }
        
        touchStartX = 0;
        touchEndX = 0;
    }
    
    // Handle keyboard navigation
    function handleKeyDown(event) {
        switch(event.key) {
            case 'ArrowLeft':
                showPrevSlide();
                break;
            case 'ArrowRight':
                showNextSlide();
                break;
        }
    }
    
    // Show next slide
    function showNextSlide() {
        if (isAnimating) return;
        const nextIndex = (currentIndex + 1) % slides.length;
        showSlide(nextIndex);
    }
    
    // Show previous slide
    function showPrevSlide() {
        if (isAnimating) return;
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }
    
    // Show specific slide
    function showSlide(newIndex) {
        if (isAnimating || newIndex === currentIndex) return;
        
        isAnimating = true;
        const currentSlide = slides[currentIndex];
        const nextSlide = slides[newIndex];
        
        // Add next slide to DOM (for smooth transition)
        nextSlide.style.display = 'flex';
        nextSlide.style.opacity = '0';
        nextSlide.classList.add('active');
        
        // Trigger reflow
        void nextSlide.offsetWidth;
        
        // Animate transition
        nextSlide.style.transition = `opacity ${transitionDuration}ms ease-in-out`;
        currentSlide.style.transition = `opacity ${transitionDuration}ms ease-in-out`;
        
        // Cross fade
        nextSlide.style.opacity = '1';
        currentSlide.style.opacity = '0';
        
        // Update current index
        currentIndex = newIndex;
        
        // Reset after animation
        setTimeout(() => {
            currentSlide.classList.remove('active');
            currentSlide.style.transition = 'none';
            currentSlide.style.opacity = '0';
            isAnimating = false;
        }, transitionDuration);
        
        // Reset auto-slide timer
        resetAutoSlide();
    }
    
    // Auto-slide functionality
    function startAutoSlide() {
        stopAutoSlide();
        autoSlideInterval = setInterval(showNextSlide, slideDuration);
    }
    
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }
    
    function pauseAutoSlide() {
        stopAutoSlide();
    }
    
    function resetAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }
    
    // Initialize the carousel
    initCarousel();
    
    // Make functions available globally for HTML onclick handlers
    window.showNextHeroSlide = showNextSlide;
    window.showPrevHeroSlide = showPrevSlide;
    
    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
        stopAutoSlide();
        carouselInner.removeEventListener('touchstart', handleTouchStart);
        carouselInner.removeEventListener('touchend', handleTouchEnd);
        heroCarousel.removeEventListener('mouseenter', pauseAutoSlide);
        heroCarousel.removeEventListener('mouseleave', startAutoSlide);
        document.removeEventListener('keydown', handleKeyDown);
    });
});
