// Poner clase 'active' en el enlace del menú que coincida con la página actual
document.addEventListener('DOMContentLoaded', () => {
  const enlaces = document.querySelectorAll('nav ul li a');
  const urlActual = window.location.pathname.split('/').pop();

  enlaces.forEach(enlace => {
    const href = enlace.getAttribute('href');
    if (href === urlActual) {
      enlace.classList.add('active');
    }
  });
});

