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
