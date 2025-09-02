
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
      link.addEventListener('click', () => {
      });
    }
  });

  function setupHeaderAnimations() {
    const barraContacto = document.querySelector('.contenedor-barra-contacto');
    const nav = document.querySelector('.contenedor-nav');
    const hero = document.querySelector('.hero-background');
  
    if (barraContacto) barraContacto.classList.add('contacto-animate');
    if (nav) nav.classList.add('nav-animate');
    if (hero) hero.classList.add('hero-animate');
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
  
          if (barraContacto) {
            barraContacto.classList.add('fade-down');
          }
  
          if (nav) {
            setTimeout(() => {
              nav.classList.add('fade-down');
            }, 150);
          }
  
          if (hero) {
            setTimeout(() => {
              hero.classList.add('fade-up');
            }, 300);
          }
  
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
  
    // Observar el contenedor principal
    if (barraContacto) observer.observe(barraContacto);
    else if (nav) observer.observe(nav);
    else if (hero) observer.observe(hero);
  }
  
  
  function setupFooterAnimations() {
    const footer = document.querySelector('.footer');
    if (!footer) return;
  
    const columns = footer.querySelectorAll('.footer-col, .footer-brand');
  
    // Ocultar columnas inicialmente
    columns.forEach(col => col.classList.add('footer-col-animate'));
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          columns.forEach((col, index) => {
            setTimeout(() => {
              col.classList.add('fade-up');
            }, index * 150); // cada columna 150ms después de la anterior
          });
  
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
  
    observer.observe(footer);
  }
  document.addEventListener('DOMContentLoaded', () => {
    setupHeaderAnimations();
    setupFooterAnimations(); // <--- animación del footer
  });  