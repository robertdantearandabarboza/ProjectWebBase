document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    let currentSlide = 0;
    const slideDuration = 8000; // 8 seconds per slide
    const transitionDuration = 300; // 1 second for fade in/out
    let slideTimer;
    let isAnimating = false;
    let zoomTimer;

    // Initialize slides
    function initializeSlides() {
        slides.forEach((slide, index) => {
            // Set background image on the ::before pseudo-element
            const img = slide.getAttribute('data-bg');
            if (img) {
                slide.style.setProperty('--bg-image', `url('${img}')`);
            }
            
            // Set initial state
            slide.style.opacity = '0';
            slide.classList.remove('active');
        });
        
        // Show first slide
        if (slides.length > 0) {
            const firstSlide = slides[0];
            
            // Mostrar primer slide sin transición
            firstSlide.classList.add('active');
            firstSlide.style.opacity = '1';
            firstSlide.style.transition = 'none';

            // Activar transición después para los siguientes slides
            setTimeout(() => {
                firstSlide.style.transition = `opacity ${transitionDuration}ms ease-in-out`;
            }, 50);

        
            // Luego empieza la secuencia de slides normalmente
            slideTimer = setTimeout(() => {
                showSlide((currentSlide + 1) % slides.length);
            }, slideDuration);
        }        
    }

    function showSlide(index) {
    if (isAnimating || index >= slides.length) return;
    isAnimating = true;

        // Get current and next slides
    const currentActive = document.querySelector('.carousel-slide.active');
    const nextSlide = slides[index];

    // Fade out current slide
    if (currentActive) {
        currentActive.style.opacity = '0';
            currentActive.style.transition = `opacity ${transitionDuration}ms ease-in-out`;
    }

        // Show next slide after fade out
    setTimeout(() => {
        // Reset all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.opacity = '0';
        });

            // Show new slide with fade in
        nextSlide.classList.add('active');
            nextSlide.style.opacity = '1';

            // Update current slide index
        currentSlide = index;

            // Set timer for next slide
        clearTimeout(slideTimer);
        slideTimer = setTimeout(() => {
                showSlide((currentSlide + 1) % slides.length);
        }, slideDuration);

        isAnimating = false;
    }, transitionDuration);
    }

    function nextSlide() {
        showSlide((currentSlide + 1) % slides.length);
    }

    // Initialize the carousel
    initializeSlides();

    // Start the slideshow
    slideTimer = setTimeout(() => {
        showSlide((currentSlide + 1) % slides.length);
    }, slideDuration);
    
    // Handle window resize to reset animations
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const activeSlide = document.querySelector('.carousel-slide.active');
            if (activeSlide) {
                // Force reflow to reset animation
                activeSlide.style.animation = 'none';
                void activeSlide.offsetWidth;
                activeSlide.style.animation = '';
            }
        }, 250);
    });
});
