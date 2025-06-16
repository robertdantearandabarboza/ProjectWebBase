document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todos los carruseles
    const carousels = document.querySelectorAll('.carousel-container');
    carousels.forEach(carousel => {
        initCarousel(carousel);
    });

    // Inicializar lightbox
    initLightbox();
});

function initCarousel(carousel) {
    const wrapper = carousel.querySelector('.carousel-wrapper');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-button.prev');
    const nextBtn = carousel.querySelector('.carousel-button.next');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    
    let currentIndex = 0;
    let autoPlayInterval;
    const autoPlayDelay = 5000; // 5 segundos entre slides

    // Crear dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.dot');

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateDots();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        goToSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        goToSlide(currentIndex);
    }

    // Event listeners para botones
    if (prevBtn) prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });

    if (nextBtn) nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });

    // Autoplay
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    // Pausar autoplay al hover
    carousel.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    carousel.addEventListener('mouseleave', () => startAutoPlay());

    // Iniciar autoplay
    startAutoPlay();
}

function initLightbox() {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close">×</button>
            <button class="lightbox-prev">❮</button>
            <button class="lightbox-next">❯</button>
            <img src="" alt="">
        </div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('img');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    let currentImages = [];
    let currentIndex = 0;

    // Abrir lightbox
    document.querySelectorAll('.carousel-slide img').forEach((img, index) => {
        img.addEventListener('click', () => {
            const carousel = img.closest('.carousel-container');
            currentImages = Array.from(carousel.querySelectorAll('.carousel-slide img')).map(img => img.src);
            currentIndex = index;
            
            // Cargamos la imagen primero
            lightboxImg.src = currentImages[currentIndex];
            
            // Mostramos el lightbox
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Aseguramos que la imagen sea visible
            lightboxImg.style.opacity = '1';
            lightboxImg.style.transform = 'scale(1)';
        });
    });

    // Cerrar lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Navegación del lightbox
    function showNextImage() {
        currentIndex = (currentIndex + 1) % currentImages.length;
        lightboxImg.src = currentImages[currentIndex];
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        lightboxImg.src = currentImages[currentIndex];
    }

    nextBtn.addEventListener('click', showNextImage);
    prevBtn.addEventListener('click', showPrevImage);

    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'ArrowRight':
                showNextImage();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'Escape':
                closeLightbox();
                break;
        }
    });
} 