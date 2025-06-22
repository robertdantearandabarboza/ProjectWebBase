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

// Detectar elementos en el viewport y activar animaciones
document.addEventListener('DOMContentLoaded', () => {
    // Configuración del observer
    const observerOptions = {
        threshold: 0.1, // Cuando el 10% del elemento esté visible
        rootMargin: '0px 0px -50px 0px' // Ajusta el margen para que la animación comience antes
    };

    // Crear el observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remover la clase hidden para que se muestre
                entry.target.classList.remove('hidden');
            }
        });
    }, observerOptions);

    // Observar todos los elementos animados
    const elementosAnimados = document.querySelectorAll('.sobre-nosotros-content, .mission, .vision, .objective-item, .value-item, .product-item, .benefit-item');
    elementosAnimados.forEach(elemento => {
        // Añadir clase hidden inicialmente
        elemento.classList.add('hidden');
        
        // Observar el elemento
        observer.observe(elemento);
    });

    // Añadir animación inicial para los elementos visibles
    elementosAnimados.forEach(elemento => {
        if (elemento.getBoundingClientRect().top < window.innerHeight) {
            elemento.classList.remove('hidden');
        }
    });
});
