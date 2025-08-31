
  const toggleBtn = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  // Toggle al hacer click en el botón hamburguesa
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // evita que el click cierre de inmediato
    navMenu.classList.toggle('active');
  });

  // Cerrar menú al hacer click fuera
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
      navMenu.classList.remove('active');
    }
  });

  // Opcional: cerrar menú al hacer click en un enlace del menú
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });
  document.querySelectorAll('.nav-item').forEach(item => {
    const link = item.querySelector('.nav-link');
    const submenu = item.querySelector('.dropdown-menu');
  
    if (submenu) {
      link.addEventListener('click', (e) => {
        e.preventDefault(); // evita que navegue
        item.classList.toggle('open');
      });
    }
  });
  