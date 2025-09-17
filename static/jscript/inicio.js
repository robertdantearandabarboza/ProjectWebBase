// Marcar menú activo según la URL
document.addEventListener('DOMContentLoaded', () => {
  const enlaces = document.querySelectorAll('nav ul li a');
  const urlActual = window.location.pathname.split('/').pop() || 'index.html';

  enlaces.forEach(enlace => {
    if (enlace.getAttribute('href') === urlActual) {
      enlace.classList.add('active');
    }
  });

  // Ejemplo: alerta al click en imagen de producto destacado
  document.querySelectorAll('.featured-products img').forEach(img => {
    img.addEventListener('click', () => {
      alert(`Ver más sobre el producto: ${img.alt}`);
    });
  });
});

window.addEventListener("scroll", function() {
  const barra = document.querySelector(".contenedor-barra-contacto");
  if (window.scrollY > 0) {
    barra.classList.add("scrolled");
  } else {
    barra.classList.remove("scrolled");
  }
});

window.addEventListener("scroll", function() {
  const nav = document.querySelector(".contenedor-nav");
  if (window.scrollY > 0) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

window.addEventListener("scroll", function() {
  const nav = document.querySelector("nav");
  if (window.scrollY > 0) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});


// Función para manejar la animación de la sección about
function setupAboutAnimations() {
  const aboutSection = document.querySelector('.about-section');
  if (!aboutSection) return;

  const title = aboutSection.querySelector('h2');
  const text = aboutSection.querySelector('p');
  const features = aboutSection.querySelectorAll('.features-list li');
  const button = aboutSection.querySelector('.about-btn');
  const image = aboutSection.querySelector('.about-image-container');

  // Inicialmente ocultar todos los elementos
  [title, text, button, image].forEach(el => {
    if (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
    }
  });

  features.forEach((feature, index) => {
    feature.style.opacity = '0';
    feature.style.transform = 'translateX(30px)';
  });

  // Animar título individualmente
  const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'slideInLeft 0.8s ease-out forwards';
        entry.target.style.transform = 'translateY(0)';
        titleObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  titleObserver.observe(title);

  // Animar párrafo individualmente
  const textObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.8s ease-out 0.3s forwards';
        entry.target.style.transform = 'translateY(0)';
        textObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  textObserver.observe(text);

  // Animar cada feature individualmente con escalonado
  const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = Array.from(features).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.animation = `slideInRight 0.6s ease-out forwards`;
          entry.target.style.transform = 'translateX(0)';
        }, index * 150); // escalonado
        featureObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  features.forEach(feature => featureObserver.observe(feature));

  // Animar botón individualmente
  const buttonObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'scaleIn 0.6s ease-out forwards';
        entry.target.style.transform = 'scale(1)';
        buttonObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  buttonObserver.observe(button);

  // Animar imagen individualmente
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'slideInRight 0.8s ease-out forwards';
        entry.target.style.transform = 'translateY(0)';
        imageObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  imageObserver.observe(image);
}


// Función para manejar la animación de productos destacados
function setupProductsAnimations() {
  const productsSection = document.querySelector('.featured-products');
  if (!productsSection) return;

  const sectionHeader = productsSection.querySelector('.section-header');
  const productCards = productsSection.querySelectorAll('.product-card');

  // Configuración inicial
  sectionHeader.style.opacity = '0';
  sectionHeader.style.transform = 'translateY(20px)';
  sectionHeader.style.transition = 'opacity 1.2s ease-out, transform 1.2s ease-out';

  // Configurar observador para el header
  const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        headerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  headerObserver.observe(sectionHeader);

  // Configurar observador individual para cada tarjeta
  const cardObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Usar un pequeño retraso basado en la posición de la tarjeta
        const cardIndex = Array.from(productCards).indexOf(entry.target);
        const row = Math.floor(cardIndex / 3);
        const col = cardIndex % 3;
        const delay = 0.05 + (row * 0.05) + (col * 0.03);
        
        entry.target.style.transition = `opacity 1.2s cubic-bezier(0.22, 0.61, 0.36, 1) ${delay}s, 
                                      transform 1.2s cubic-bezier(0.22, 0.61, 0.36, 1) ${delay}s`;
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        
        observer.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Aplicar estilos iniciales y observar cada tarjeta
  productCards.forEach((card) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    cardObserver.observe(card);
  });
}

// Función para manejar la animación de la sección Why Choose Us
function setupWhyChooseUsAnimations() {
  const whyChooseUsSection = document.querySelector('.why-choose-us');
  if (!whyChooseUsSection) return;

  const sectionHeader = whyChooseUsSection.querySelector('.section-header');
  const features = whyChooseUsSection.querySelectorAll('.feature');

  // Inicialmente ocultar elementos
  sectionHeader.style.opacity = '0';
  sectionHeader.style.transform = 'translateY(40px)';

  features.forEach((feature, index) => {
    feature.style.opacity = '0';
    feature.style.transform = `translateY(${20 + (index * 10)}px)`;
  });

  // Animar header cuando entre en pantalla
  const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 1s cubic-bezier(0.22, 0.61, 0.36, 1) forwards';
        entry.target.style.transform = 'translateY(0)';
        headerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  headerObserver.observe(sectionHeader);

  // Animar cada feature individualmente
  const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = Array.from(features).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.animation = 'fadeInUp 0.8s cubic-bezier(0.22, 0.61, 0.36, 1) forwards';
          entry.target.style.transform = 'translateY(0)';

          // Efecto de escala al icono dentro de la feature
          const icon = entry.target.querySelector('.feature-icon');
          if (icon) {
            icon.style.animation = 'pulse 1s ease-in-out';
          }
        }, index * 150); // escalonado
        featureObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  features.forEach(feature => featureObserver.observe(feature));
}

// Función para manejar la animación de la sección Client Logos
function setupClientLogosAnimations() {
  const logosSection = document.querySelector('.client-logos-section');
  if (!logosSection) return;

  const sectionHeader = logosSection.querySelector('.section-header');
  const logos = logosSection.querySelectorAll('.logo-item');

  // Ocultar inicialmente
  if (sectionHeader) {
    sectionHeader.style.opacity = '0';
    sectionHeader.style.transform = 'translateY(30px)';
  }
  logos.forEach(logo => {
    logo.style.opacity = '0';
    logo.style.transform = 'translateY(30px)';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animar el header primero
        if (sectionHeader) {
          sectionHeader.style.animation = 'fadeInUp 1s ease-out forwards';
          sectionHeader.style.transform = 'translateY(0)';
        }

        // Animar los logos escalonadamente
        logos.forEach((logo, index) => {
          setTimeout(() => {
            logo.classList.add('bounce-up');
          }, index * 150);
        });

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(logosSection);
}

// Función para manejar la animación de la sección CTA
function setupCTAAnimations() {
  const ctaSection = document.querySelector('.cta-section');
  if (!ctaSection) return;

  const title = ctaSection.querySelector('h2');
  const paragraph = ctaSection.querySelector('p');
  const buttons = ctaSection.querySelectorAll('.cta-buttons a');

  // Ocultar inicialmente
  [title, paragraph, ...buttons].forEach(el => {
    el.classList.add('cta-animate');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Título
        title.classList.add('fade-slide-up');

        // Párrafo con delay
        setTimeout(() => {
          paragraph.classList.add('fade-slide-up');
        }, 200);

        // Botones escalonados
        buttons.forEach((btn, index) => {
          setTimeout(() => {
            btn.classList.add('fade-slide-up');
          }, 400 + index * 150);
        });

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(ctaSection);
}

// Función para manejar la animación de la sección Client Logos Alt
function setupClientLogosAnimationsAlt() {
  const logosSection = document.querySelector('#client-logos-alt');
  if (!logosSection) return;

  const sectionHeader = logosSection.querySelector('.section-header');
  const logos = logosSection.querySelectorAll('.logo-item');

  // Ocultar inicialmente
  if (sectionHeader) {
    sectionHeader.style.opacity = '0';
    sectionHeader.style.transform = 'translateY(30px)';
  }
  logos.forEach(logo => {
    logo.style.opacity = '0';
    logo.style.transform = 'translateY(30px)';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animar el header primero
        if (sectionHeader) {
          sectionHeader.style.animation = 'fadeInUp 1s ease-out forwards';
          sectionHeader.style.transform = 'translateY(0)';
        }

        // Animar los logos escalonadamente
        logos.forEach((logo, index) => {
          setTimeout(() => {
            logo.classList.add('bounce-up');
          }, index * 150);
        });

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(logosSection);
}

function setupTestimoniosAnimations() {
  const testSection = document.querySelector('.testimonios');
  if (!testSection) return;

  const title = testSection.querySelector('h2');
  const testimonios = testSection.querySelectorAll('.testimonio');
  const btn = testSection.querySelector('.btn-ver-mas');

  // Ocultar inicialmente
  title.classList.add('testimonio-animate');
  testimonios.forEach(t => t.classList.add('testimonio-animate'));
  if (btn) btn.classList.add('btn-animate');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Título
        title.classList.add('fade-scale-up');

        // Testimonios escalonados
        testimonios.forEach((t, index) => {
          setTimeout(() => {
            t.classList.add('fade-scale-up');
          }, 200 + index * 200);
        });

        // Botón después de los testimonios
        if (btn) {
          setTimeout(() => {
            btn.classList.add('pop-up');
          }, 200 + testimonios.length * 200);
        }

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(testSection);
}


// Inicializar animaciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  setupAboutAnimations();
  setupProductsAnimations();
  setupWhyChooseUsAnimations();
  setupClientLogosAnimations();
  setupClientLogosAnimationsAlt();
  setupCTAAnimations();
  setupTestimoniosAnimations();
  
  // Código existente para el menú activo
  const enlaces = document.querySelectorAll('nav ul li a');
  const urlActual = window.location.pathname.split('/').pop() || 'index.html';

  enlaces.forEach(enlace => {
    if (enlace.getAttribute('href') === urlActual) {
      enlace.classList.add('active');
    }
  });
});

const carrusel = document.querySelector('.carrusel');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

const totalImages = carrusel.querySelectorAll('img').length;
const visibleImages = 3;
const imgWidth = 300; // ancho definido en CSS

let currentIndex = 0;

function updateCarrusel() {
  const offset = -currentIndex * imgWidth;
  carrusel.style.transform = `translateX(${offset}px)`;
}

function next() {
  if (currentIndex < totalImages - visibleImages) {
    currentIndex++;
  } else {
    currentIndex = 0; // volver al inicio para loop infinito
  }
  updateCarrusel();
}

function prev() {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = totalImages - visibleImages; // ir al final
  }
  updateCarrusel();
}

// Avance automático cada 3 segundos
let intervalId = setInterval(next, 4500);

nextBtn.addEventListener('click', () => {
  next();
  resetInterval();
});

prevBtn.addEventListener('click', () => {
  prev();
  resetInterval();
});

function resetInterval() {
  clearInterval(intervalId);
  intervalId = setInterval(next, 4500);
}

document.addEventListener("DOMContentLoaded", () => {
  const headerElements = document.querySelectorAll('.contenedor-barra-contacto, .contenedor-nav');
  let lastScrollTop = 0;
  let scrollTimeout;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    // Usuario baja
    if (currentScroll > lastScrollTop) {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        headerElements.forEach(el => el.classList.add('hidden-header'));
      }, 300); // espera 300ms antes de ocultar
    } 
    // Usuario sube
    else {
      headerElements.forEach(el => el.classList.remove('hidden-header'));
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // evita valores negativos
  });
});
