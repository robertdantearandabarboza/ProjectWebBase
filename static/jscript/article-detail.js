document.addEventListener("DOMContentLoaded", () => {
  const pathParts = window.location.pathname.split("/");
  const slug = window.location.hash.substring(1); // toma el texto después del #
  const articleDetail = document.getElementById("articulo-detalle");

  fetch("/static/data/blog-posts.json")
    .then(res => res.json())
    .then(data => {
      const article = data.find(item => item.slug === slug);

      if (!article) {
        articleDetail.innerHTML = `
          <div class="error-message">
            <i class="fas fa-exclamation-triangle"></i>
            <p>Artículo no encontrado. <a href="../../templates/blog.html#blog-section">Volver al blog</a></p>
          </div>
        `;
        return;
      }

      // Formateo del contenido para párrafos y listas
      const formattedContent = article.contenido
        .replace(/<p>/g, '</p><p>')
        .replace(/<ul>/g, '</p><ul>')
        .replace(/<\/ul>/g, '</ul><p>')
        .replace(/<h3>/g, '</p><h3>')
        .replace(/<\/h3>/g, '</h3><p>');

      // Contenido principal del artículo
      articleDetail.innerHTML = `
        <article class="article-content">
          <header class="article-header">
            <span class="article-category">${article.categoria}</span>
            <h1 class="article-title">${article.titulo}</h1>
            <div class="article-meta">
              <span class="article-date"><i class="far fa-calendar-alt"></i> ${article.fecha}</span>
            </div>
          </header>
          
          <div class="article-featured-image">
            <img src="${article.imagen}" alt="${article.titulo}">
          </div>
          
          <div class="article-body">
            ${formattedContent}
          </div>
          
          <div class="article-footer">
            <a href="../../templates/blog.html" class="btn btn-secondary">
              <i class="fas fa-arrow-left"></i> Volver al blog
            </a>
            <div class="article-share">
              <span>Compartir:</span>
              <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" target="_blank" class="social-share" title="Compartir en Facebook">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.titulo)}" target="_blank" class="social-share" title="Compartir en Twitter">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}" target="_blank" class="social-share" title="Compartir en LinkedIn">
                <i class="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </article>
      `;

      // Actualiza el título de la página
      document.title = `${article.titulo} | Blog de Hydromenn`;

      // Meta description
      const metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      metaDescription.content = article.resumen;
      document.head.appendChild(metaDescription);

      // Open Graph
      const ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      ogTitle.content = article.titulo;
      document.head.appendChild(ogTitle);

      const ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      ogDescription.content = article.resumen;
      document.head.appendChild(ogDescription);

      const ogImage = document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      ogImage.content = new URL(article.imagen, window.location.origin).href;
      document.head.appendChild(ogImage);

      const ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      ogUrl.content = window.location.href;
      document.head.appendChild(ogUrl);

      // JSON-LD para SEO
      const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.titulo,
        "image": [new URL(article.imagen, window.location.origin).href],
        "datePublished": article.fecha,
        "author": { "@type": "Organization", "name": "Hydromenn" },
        "publisher": {
          "@type": "Organization",
          "name": "Hydromenn",
          "logo": { "@type": "ImageObject", "url": "URL_DE_TU_LOGO" }
        },
        "description": article.resumen,
        "mainEntityOfPage": { "@type": "WebPage", "@id": window.location.href }
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    })
    .catch(error => {
      console.error("Error loading article:", error);
      articleDetail.innerHTML = `
        <div class="error-message">
          <i class="fas fa-exclamation-triangle"></i>
          <p>No se pudo cargar el artículo. <a href="../../templates/blog.html#blog-section">Volver al blog</a></p>
          <p class="error-details">${error.message}</p>
        </div>
      `;
    });
});
