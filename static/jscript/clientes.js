document.addEventListener('DOMContentLoaded', () => {
  const clientes = document.querySelectorAll('.cliente');

  clientes.forEach(cliente => {
    cliente.addEventListener('click', () => {
      const nombreCliente = cliente.querySelector('p').textContent;
      alert(`Más info sobre: ${nombreCliente}`);
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.slider-slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.slider-nav.prev');
  const nextBtn = document.querySelector('.slider-nav.next');
  let currentSlide = 0;
  const slideCount = slides.length;

  // Initialize slider
  function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide and update dot
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
  }

  // Next slide
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    showSlide(currentSlide);
  }

  // Previous slide
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    showSlide(currentSlide);
  }

  // Event listeners
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  });

  // Auto-advance slides (optional)
  let slideInterval = setInterval(nextSlide, 8000);

  // Pause auto-advance on hover
  const slider = document.querySelector('.testimonios-slider');
  slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
  slider.addEventListener('mouseleave', () => {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 8000);
  });

  // Initialize first slide
  showSlide(0);
});