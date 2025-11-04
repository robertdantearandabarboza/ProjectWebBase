document.addEventListener("DOMContentLoaded", () => {
  // META TAGS para SEO
  document.title = "Blog de Hydromenn - Artículos sobre mantenimiento";
  const metaDescription = document.createElement('meta');
  metaDescription.name = "description";
  metaDescription.content = "Encuentra artículos sobre mantenimiento correctivo, recomendaciones y buenas prácticas.";
  document.head.appendChild(metaDescription);

  // OPEN GRAPH TAGS para compartir en redes sociales
  const ogTitle = document.createElement('meta');
  ogTitle.setAttribute('property', 'og:title');
  ogTitle.content = "Blog de Hydromenn - Artículos sobre mantenimiento";
  document.head.appendChild(ogTitle);

  const ogDescription = document.createElement('meta');
  ogDescription.setAttribute('property', 'og:description');
  ogDescription.content = "Encuentra artículos sobre mantenimiento correctivo, recomendaciones y buenas prácticas.";
  document.head.appendChild(ogDescription);

  const ogUrl = document.createElement('meta');
  ogUrl.setAttribute('property', 'og:url');
  ogUrl.content = window.location.href;
  document.head.appendChild(ogUrl);

  const ogImage = document.createElement('meta');
  ogImage.setAttribute('property', 'og:image');
  ogImage.content = "../../media/img/Blog/blog1/Articulo-1-1.webp"; // Imagen genérica para la página principal
  document.head.appendChild(ogImage);

  const blogSection = document.getElementById("blog-section");

  fetch("/static/data/blog-posts.json")
    .then(response => response.json())
    .then(data => {
      blogSection.innerHTML = data.map(article => `
        <article class="blog-card">
          <div class="blog-card-image">
            <img src="${article.imagen}" alt="${article.titulo}">
            <span class="blog-category">${article.categoria}</span>
          </div>
          <div class="blog-card-content">
            <div class="blog-meta">
              <span class="blog-date"><i class="far fa-calendar-alt"></i> ${article.fecha}</span>
            </div>
            <h3 class="blog-title">${article.titulo}</h3>
            <p class="blog-excerpt">${article.resumen}</p>
            <a href="../../templates/blog/articulo-clean.html#${article.slug}" class="btn btn-primary">Leer más</a>
          </div>
        </article>
      `).join('');
    })
    .catch(error => {
      console.error("Error loading blog posts:", error);
      blogSection.innerHTML = `
        <div class="error-message">
          <i class="fas fa-exclamation-circle"></i>
          <p>No se pudieron cargar los artículos. Por favor, intente nuevamente más tarde.</p>
        </div>
      `;
    });

  // Add animation to blog cards
  const animateOnScroll = () => {
    const cards = document.querySelectorAll('.blog-card');
    cards.forEach(card => {
      const cardPosition = card.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (cardPosition < screenPosition) {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }
    });
  };

  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Run once on load
});
