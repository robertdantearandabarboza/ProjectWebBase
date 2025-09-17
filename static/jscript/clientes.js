document.addEventListener('DOMContentLoaded', () => {
  /** ============================
   *  BLOQUE CLIENTES
   * ============================ */
  const clientes = document.querySelectorAll('.cliente');
  if (clientes.length > 0) {
    clientes.forEach(cliente => {
      cliente.addEventListener('click', () => {
        const nombreCliente = cliente.querySelector('p')?.textContent || 'Cliente';
        alert(`Más info sobre: ${nombreCliente}`);
      });
    });
  }

  /** ============================
   *  BLOQUE SLIDER
   * ============================ */
  const slides = document.querySelectorAll('.slider-slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.slider-nav.prev');
  const nextBtn = document.querySelector('.slider-nav.next');
  const slider = document.querySelector('.testimonios-slider');
  let currentSlide = 0;

  if (slides.length > 0 && dots.length > 0 && slider) {
    const slideCount = slides.length;

    function showSlide(index) {
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));

      slides[index].classList.add('active');
      dots[index].classList.add('active');
      currentSlide = index;
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slideCount;
      showSlide(currentSlide);
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + slideCount) % slideCount;
      showSlide(currentSlide);
    }

    // Botones
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => showSlide(index));
    });

    // Teclado
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    });

    // Auto-slide
    let slideInterval = setInterval(nextSlide, 8000);

    // Pausa al pasar el mouse
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', () => {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 8000);
    });

    // Mostrar primero
    showSlide(0);
  }
});

const preguntas = document.querySelectorAll('.pregunta-item');

preguntas.forEach(item => {
  item.querySelector('.pregunta-titulo').addEventListener('click', () => {
    item.classList.toggle('active');
  });
});
