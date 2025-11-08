const modal = document.getElementById('modal');
const modalTitulo = document.getElementById('modalTitulo');
const modalImagen = document.getElementById('modalImagen');
const modalDescripcion = document.getElementById('modalDescripcion');
const cerrarBtn = document.getElementById('cerrarBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let imagenes = [];
let indiceActual = 0;

// Abrir modal al hacer click en un producto
document.querySelectorAll('.producto').forEach(producto => {
  producto.addEventListener('click', () => {
    modalTitulo.textContent = producto.getAttribute('data-nombre');
    modalDescripcion.textContent = producto.getAttribute('data-descripcion');
    imagenes = producto.getAttribute('data-imgs').split(',').map(img => img.trim());
    indiceActual = 0;
    modalImagen.src = imagenes[indiceActual];
    modal.style.display = 'flex';
  });
});

const images = [
  {
      src: "../../media/img/martillos-hidraulicos/LC350/LC350-A.webp",
      alt: "Espacio de trabajo moderno",
      href: "../../templates/Martillos Hidraulicos/lc350.html"
  },
  {
      src: "../../media/img/martillos-hidraulicos/LC400/LC400-A.webp",
      alt: "Configuración de desarrollo",
      href: "../../templates/Martillos Hidraulicos/lc400.html"
  },
  {
      src: "../../media/img/martillos-hidraulicos/LC900/LC900-A.webp",
      alt: "Auriculares premium",
      href: "../../templates/Martillos Hidraulicos/lc900-modelo-lapiz.html"
  },
  {
      src: "../../media/img/martillos-hidraulicos/LC1500/LC1500-A.webp",
      alt: "Oficina moderna",
      href: "../../templates/Martillos Hidraulicos/lc1500.html"
  },
  {
      src: "../../media/img/martillos-hidraulicos/LC2100/LC2100-A.webp",
      alt: "Tecnología",
      href: "../../templates/Martillos Hidraulicos/lc2100.html"
  },
  {
      src: "../../media/img/martillos-hidraulicos/LC3500/LC3500-A.webp",
      alt: "Calzado deportivo",
      href: "../../templates/Martillos Hidraulicos/lc3500.html"
  }
];

let currentIndex = 0;
const totalImages = images.length;
const dots = document.querySelectorAll('.dot');
const counter = document.getElementById('imageCounter');

const leftImg = document.getElementById('leftImg');
const centerImg = document.getElementById('centerImg');
const rightImg = document.getElementById('rightImg');

function getPrevIndex(index) {
  return index === 0 ? totalImages - 1 : index - 1;
}

function getNextIndex(index) {
  return index === totalImages - 1 ? 0 : index + 1;
}

function updateCarousel() {
  const prevIndex = getPrevIndex(currentIndex);
  const nextIndex = getNextIndex(currentIndex);

  // Seleccionamos los links
  const leftLink = document.getElementById('leftLink');
  const centerLink = document.getElementById('centerLink');
  const rightLink = document.getElementById('rightLink');

  // Seleccionamos las imágenes
  const leftImg = document.getElementById('leftImg');
  const centerImg = document.getElementById('centerImg');
  const rightImg = document.getElementById('rightImg');

  // Imagen izquierda
  leftImg.src = images[prevIndex].src;
  leftImg.alt = images[prevIndex].alt;
  leftLink.href = images[prevIndex].href;

  // Imagen central
  centerImg.src = images[currentIndex].src;
  centerImg.alt = images[currentIndex].alt;
  centerLink.href = images[currentIndex].href;

  // Imagen derecha
  rightImg.src = images[nextIndex].src;
  rightImg.alt = images[nextIndex].alt;
  rightLink.href = images[nextIndex].href;

  // 🔹 Actualizar contador
  counter.textContent = `${currentIndex + 1} / ${totalImages}`;

  // 🔹 Actualizar dots
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });

  console.log("Links actualizados:", leftLink.href, centerLink.href, rightLink.href);
}


function changeSlide(direction) {
  // Calcular el nuevo índice
  let newIndex = currentIndex + direction;
  
  if (newIndex >= totalImages) {
      newIndex = 0;
  } else if (newIndex < 0) {
      newIndex = totalImages - 1;
  }
  
  // Animación suave hacia las nuevas imágenes
  animateToIndex(newIndex);
}

function currentSlide(n) {
  if (n !== currentIndex) {
      animateToIndex(n);
  }
}

function animateToIndex(newIndex) {
  const leftCard = document.getElementById('leftCard');
  const centerCard = document.getElementById('centerCard');
  const rightCard = document.getElementById('rightCard');
  
  // Agregar clase de transición suave
  [leftCard, centerCard, rightCard].forEach(card => {
      card.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      card.style.transform = 'scale(0.95)';
      card.style.opacity = '0.7';
  });
  
  setTimeout(() => {
      currentIndex = newIndex;
      updateCarousel();
      
      // Restaurar con animación
      [leftCard, centerCard, rightCard].forEach((card, index) => {
          setTimeout(() => {
              if (index === 1) { // Centro
                  card.style.transform = 'scale(1.1)';
                  card.style.opacity = '1';
              } else { // Lados
                  card.style.transform = 'scale(0.9)';
                  card.style.opacity = '0.7';
              }
          }, index * 50); // Animación escalonada
      });
      
      // Limpiar estilos de transición después de la animación
      setTimeout(() => {
          [leftCard, centerCard, rightCard].forEach(card => {
              card.style.transition = '';
          });
      }, 600);
      
  }, 200);
}

// Auto-play del carrusel
let autoPlayInterval = setInterval(() => {
  changeSlide(1);
}, 4000);

// Navegación con teclado
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') changeSlide(-1);
  if (e.key === 'ArrowRight') changeSlide(1);
});

// Touch/swipe support para móviles
let startX = 0;
let endX = 0;
let startTime = 0;

const container = document.querySelector('.carousel-container');

container.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  startTime = Date.now();
});

container.addEventListener('touchend', (e) => {
  endX = e.changedTouches[0].clientX;
  const endTime = Date.now();
  handleSwipe(endTime - startTime);
});

function handleSwipe(duration) {
  const diffX = startX - endX;
  const threshold = 50;
  const maxDuration = 500;

  if (Math.abs(diffX) > threshold && duration < maxDuration) {
      if (diffX > 0) {
          changeSlide(1);
      } else {
          changeSlide(-1);
      }
  }
}

// Pausar auto-play en hover
container.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
container.addEventListener('mouseleave', () => {
  autoPlayInterval = setInterval(() => {
      changeSlide(1);
  }, 4000);
});

// Inicializar el carrusel
updateCarousel();

// Función para mostrar imagen según índice
function mostrarImagen(indice) {
  if (indice < 0) {
    indiceActual = imagenes.length - 1;
  } else if (indice >= imagenes.length) {
    indiceActual = 0;
  } else {
    indiceActual = indice;
  }
  modalImagen.src = imagenes[indiceActual];
}

// Botón anterior
prevBtn.addEventListener('click', () => {
  mostrarImagen(indiceActual - 1);
});

// Botón siguiente
nextBtn.addEventListener('click', () => {
  mostrarImagen(indiceActual + 1);
});

// Cerrar modal con botón
cerrarBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  modalImagen.src = '';
});

// Cerrar modal con tecla ESC
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.style.display === 'flex') {
    modal.style.display = 'none';
    modalImagen.src = '';
  }
});

// Cerrar modal si se hace clic fuera del contenido
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    modalImagen.src = '';
  }
});
