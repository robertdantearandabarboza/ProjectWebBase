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

document.addEventListener('DOMContentLoaded', function() {
      // Tabs functionality
      const tabs = document.querySelectorAll('.hammer-tab');
      const contents = document.querySelectorAll('.testimonio-content');
      
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          // Remove active class from all tabs and contents
          tabs.forEach(t => t.classList.remove('active'));
          contents.forEach(c => c.classList.remove('active'));
          
          // Add active class to clicked tab
          tab.classList.add('active');
          
          // Show corresponding content
          const model = tab.getAttribute('data-model');
          document.getElementById(`testimonio-${model}`).classList.add('active');
          
          // Reset all carousels to first slide when switching tabs
          document.querySelectorAll('.testimonio-content').forEach(content => {
            const slides = content.querySelectorAll('.testimonio-slide');
            const dots = content.querySelectorAll('.carousel-dot');
            if (slides.length > 0) {
              slides.forEach(slide => slide.classList.remove('active'));
              slides[0].classList.add('active');
              dots.forEach(dot => dot.classList.remove('active'));
              dots[0].classList.add('active');
            }
          });
        });
      });

      // Initialize carousels
      document.querySelectorAll('.model-carousel').forEach(carousel => {
        const slides = carousel.querySelectorAll('.testimonio-slide');
        const dots = carousel.querySelectorAll('.carousel-dot');
        const prevBtn = carousel.querySelector('.prev');
        const nextBtn = carousel.querySelector('.next');
        
        let currentSlide = 0;
        const totalSlides = slides.length;
        
        function showSlide(index) {
          // Handle wrap around
          currentSlide = (index + totalSlides) % totalSlides;
          
          // Update slides
          slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentSlide);
          });
          
          // Update dots
          dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
          });
        }
        
        // Navigation buttons
        if (prevBtn) {
          prevBtn.addEventListener('click', () => {
            showSlide(currentSlide - 1);
          });
        }
        
        if (nextBtn) {
          nextBtn.addEventListener('click', () => {
            showSlide(currentSlide + 1);
          });
        }
        
        // Dot navigation
        dots.forEach((dot, index) => {
          dot.addEventListener('click', () => {
            showSlide(index);
          });
        });
        
        // Auto-advance slides
        if (totalSlides > 1) {
          setInterval(() => {
            showSlide(currentSlide + 1);
          }, 10000);
        }
      });
    });