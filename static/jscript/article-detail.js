document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const articleId = params.get("id");
  const articleDetail = document.getElementById("articulo-detalle");

  if (!articleId) {
    articleDetail.innerHTML = `
      <div class="error-message">
        <i class="fas fa-exclamation-triangle"></i>
        <p>No se ha especificado ningún artículo. <a href="../../templates/blog.html#blog-section">Volver al blog</a></p>
      </div>
    `;
    return;
  }

  fetch("/static/data/blog-posts.json")
    .then(response => response.json())
    .then(data => {
      const article = data.find(item => item.id == articleId);
      
      if (!article) {
        throw new Error("Artículo no encontrado");
      }

      // Format the content with proper spacing for paragraphs and lists
      const formattedContent = article.contenido
        .replace(/<p>/g, '</p><p>') // Ensure proper paragraph spacing
        .replace(/<ul>/g, '</p><ul>') // Add space before lists
        .replace(/<\/ul>/g, '</ul><p>') // Add space after lists
        .replace(/<h3>/g, '</p><h3>') // Add space before headings
        .replace(/<\/h3>/g, '</h3><p>'); // Add space after headings

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
      
      // Update page title
      document.title = `${article.titulo} | Blog de Hydromenn`;
      
      // Add meta description for SEO
      const metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      metaDescription.content = article.resumen;
      document.head.appendChild(metaDescription);
      
      // Add Open Graph meta tags for social sharing
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
    })
    .catch(error => {
      console.error("Error loading article:", error);
      articleDetail.innerHTML = `
        <div class="error-message">
          <i class="fas fa-exclamation-triangle"></i>
          <p>No se pudo cargar el artículo. <a href="blog.html">Volver al blog</a></p>
          <p class="error-details">${error.message}</p>
        </div>
      `;
    });
});
