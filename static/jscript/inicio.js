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

// Agregar animaciones a secciones al cargar
const secciones = document.querySelectorAll('section, header');

secciones.forEach((seccion, i) => {
  setTimeout(() => {
    const animClass = i % 2 === 0 ? 'fade-in-left' : 'fade-in-right';
    seccion.classList.add(animClass);
  }, i * 300);
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
