// --- CONFIGURACIÓN DE SEO Y RUTA BASE ---
// La URL base es dinámica (ej. https://www.hydromenn.com)
const BASE_URL = window.location.origin; 
const LOGO_PATH = "/media/img/logolyc.png";
// URL Absoluta del logo para JSON-LD y Open Graph
const LOGO_URL = `${BASE_URL}${LOGO_PATH}`; 


/**
 * Busca un elemento meta o link existente y actualiza su atributo.
 * @param {string} selector - CSS selector (e.g., 'meta[name="description"]', 'link[rel="canonical"]').
 * @param {string} attribute - El atributo a cambiar (e.g., 'content' para meta, 'href' para link).
 * @param {string} value - El nuevo valor.
 */
function updateMeta(selector, attribute, value) {
    const element = document.querySelector(selector);
    if (element) {
        element.setAttribute(attribute, value);
    }
}


document.addEventListener("DOMContentLoaded", () => {
    // Tomamos el slug (identificador del artículo) de la URL después del #
    const slug = window.location.hash.substring(1); 
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

            // --- 1. PROCESAMIENTO E INYECCIÓN DEL CONTENIDO HTML ---
            
            // Lógica para intentar unificar el contenido si viene con fragmentos de etiquetas.
            const formattedContent = article.contenido
                .replace(/<p>/g, '</p><p>')
                .replace(/<ul>/g, '</p><ul>')
                .replace(/<\/ul>/g, '</ul><p>')
                .replace(/<h3>/g, '</p><h3>')
                .replace(/<\/h3>/g, '</h3><p>');

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

            // --- 2. INYECCIÓN DE SEO DINÁMICO (SOBRESCRITURA DE PLACEHOLDERS) ---
            
            // Calculamos URLs absolutas necesarias para SEO (OG y JSON-LD)
            // Esto convierte la URL relativa de la imagen (e.g., ../../media/img/...) en una URL completa (e.g., https://hydromenn.com/media/img/...)
            const absoluteImageUrl = new URL(article.imagen, BASE_URL).href; 
            
            // La URL canónica es la URL absoluta completa con el slug
            const canonicalUrl = `${BASE_URL}${window.location.pathname}#${article.slug}`; 
            
            // 2.1 Título de la página
            document.title = `${article.titulo} | Blog de Hydromenn`;

            // 2.2 Meta Descripción, Canónica y Open Graph/Twitter
            
            updateMeta('meta[name="description"]', 'content', article.resumen);
            updateMeta('link[rel="canonical"]', 'href', canonicalUrl);

            // Open Graph (OG) - Usando URLs absolutas
            updateMeta('meta[property="og:title"]', 'content', article.titulo);
            updateMeta('meta[property="og:description"]', 'content', article.resumen);
            updateMeta('meta[property="og:url"]', 'content', window.location.href);
            updateMeta('meta[property="og:image"]', 'content', absoluteImageUrl);

            // Twitter Card - Usando URLs absolutas
            updateMeta('meta[name="twitter:title"]', 'content', article.titulo);
            updateMeta('meta[name="twitter:description"]', 'content', article.resumen);
            updateMeta('meta[name="twitter:image"]', 'content', absoluteImageUrl);


            // 2.3 JSON-LD (Schema Markup) - Usando todas las URLs absolutas
            const jsonLdData = {
                "@context": "https://schema.org",
                "@type": "BlogPosting", 
                "headline": article.titulo,
                "image": [absoluteImageUrl], // URL Absoluta
                "datePublished": article.fecha, 
                "dateModified": article.fecha, // Se usa la misma fecha si no hay un campo de modificación
                "author": { "@type": "Organization", "name": "Hydromenn", "url": BASE_URL }, // URL Absoluta
                "publisher": {
                    "@type": "Organization",
                    "name": "Hydromenn - LYC Technology S.A.C.",
                    "logo": { 
                        "@type": "ImageObject", 
                        "url": LOGO_URL // URL Absoluta del logo
                    }
                },
                "description": article.resumen,
                "mainEntityOfPage": { "@type": "WebPage", "@id": canonicalUrl } // URL Canónica Absoluta
            };

            // Sobrescribimos el contenido del script con ID="article-schema"
            const jsonLdScript = document.getElementById('article-schema');
            if (jsonLdScript) {
                jsonLdScript.textContent = JSON.stringify(jsonLdData, null, 2);
            }
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