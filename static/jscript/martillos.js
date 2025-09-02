function setupMartilloDetalleAnimation() {
    const martilloSection = document.querySelector('.martillo-detalle');
    if (!martilloSection) return;
  
    const imagen = martilloSection.querySelector('.martillo-imagen');
    const info = martilloSection.querySelector('.martillo-info');
    const descarga = martilloSection.querySelector('.descarga-pdf');
    const cotizar = martilloSection.querySelector('.cotizar-pdf');
    const btnCotizar = martilloSection.querySelector('.btn-cotizar-martillo');
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animaciones escalonadas
          imagen.classList.add('fade-bounce');
          setTimeout(() => info.classList.add('fade-slide-scale'), 200);
          setTimeout(() => descarga.classList.add('fade-pop'), 400);
          setTimeout(() =>{ cotizar.classList.add('fade-pop');
          btnCotizar.classList.add('fade-pop'); // 👈 aplica al botón también
          }, 600);

  
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
  
    observer.observe(martilloSection);
  }
  

  document.addEventListener('DOMContentLoaded', () => {

    // Nueva animación para martillo detalle
    setupMartilloDetalleAnimation();
  
  });
  