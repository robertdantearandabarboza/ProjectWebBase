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
  document.querySelectorAll('section > div img').forEach(img => {
    img.addEventListener('click', () => {
      alert(`Ver más sobre el producto: ${img.alt}`);
    });
  });
});

// Función para manejar la animación de la sección about
function setupAboutAnimations() {
  const aboutSection = document.querySelector('.about-section');
  const aboutElements = {
    title: aboutSection.querySelector('h2'),
    text: aboutSection.querySelector('p'),
    features: aboutSection.querySelectorAll('.features-list li'),
    button: aboutSection.querySelector('.about-btn'),
    image: aboutSection.querySelector('.about-image-container')
  };

  // Inicialmente ocultar los elementos
  Object.values(aboutElements).forEach(el => {
    if (el && el.length === undefined) {
      el.style.opacity = '0';
    } else if (el && el.length) {
      el.forEach(item => item.style.opacity = '0');
    }
  });

  // Configurar el Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animar título
        aboutElements.title.style.animation = 'slideInLeft 0.8s ease-out forwards';
        
        // Animar párrafo
        aboutElements.text.style.animation = 'fadeInUp 0.8s ease-out 0.3s forwards';
        
        // Animar elementos de la lista
        aboutElements.features.forEach((item, index) => {
          item.style.animation = `slideInRight 0.6s ease-out ${0.6 + (index * 0.2)}s forwards`;
        });
        
        // Animar botón
        aboutElements.button.style.animation = 'scaleIn 0.6s ease-out 1.4s forwards';
        
        // Animar imagen
        aboutElements.image.style.animation = 'slideInRight 0.8s ease-out 0.8s forwards';
        
        // Dejar de observar después de la primera vez
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // Comenzar a observar la sección about
  if (aboutSection) {
    observer.observe(aboutSection);
  }
}

// Función para manejar la animación de productos destacados
function setupProductsAnimations() {
  const productsSection = document.querySelector('.featured-products');
  if (!productsSection) return;

  const sectionHeader = productsSection.querySelector('.section-header');
  const productCards = productsSection.querySelectorAll('.product-card');

  // Inicialmente ocultar elementos
  sectionHeader.style.opacity = '0';
  const catalogBtn = productsSection.querySelector('.text-center .btn-primary');
  if (catalogBtn) {
    catalogBtn.style.opacity = '0';
    catalogBtn.style.transform = 'translateY(20px)';
  }
  
  productCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
  });

  // Configurar el Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animar el encabezado con mejor fluidez
        sectionHeader.style.animation = 'fadeInUp 1.2s cubic-bezier(0.22, 0.61, 0.36, 1) forwards';
        
        // Animar las tarjetas con mejor timing
        productCards.forEach((card, index) => {
          setTimeout(() => {
            card.style.animation = `fadeInUp 0.9s cubic-bezier(0.22, 0.61, 0.36, 1) ${index * 0.15}s forwards`;
            card.style.transform = 'translateY(30px)';
            
            // Animar el botón después de la última tarjeta
            if (index === productCards.length - 1 && catalogBtn) {
              setTimeout(() => {
                catalogBtn.style.animation = 'fadeInUp 0.8s cubic-bezier(0.22, 0.61, 0.36, 1) 0.3s forwards';
              }, 300);
            }
          }, index * 150);
        });
        
        // Dejar de observar después de la primera vez
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(productsSection);
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

  // Configurar el Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animar el encabezado
        sectionHeader.style.animation = 'fadeInUp 1s cubic-bezier(0.22, 0.61, 0.36, 1) forwards';
        
        // Animar las características con efecto escalonado
        features.forEach((feature, index) => {
          setTimeout(() => {
            feature.style.animation = `fadeInUp 0.8s cubic-bezier(0.22, 0.61, 0.36, 1) ${index * 0.15}s forwards`;
            feature.style.transform = 'translateY(0)';
            
            // Agregar efecto de escala a los íconos
            const icon = feature.querySelector('.feature-icon');
            if (icon) {
              setTimeout(() => {
                icon.style.animation = 'pulse 1s ease-in-out';
              }, 800 + (index * 150));
            }
          }, index * 100);
        });
        
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(whyChooseUsSection);
}

// Inicializar animaciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  setupAboutAnimations();
  setupProductsAnimations();
  setupWhyChooseUsAnimations();
  
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
