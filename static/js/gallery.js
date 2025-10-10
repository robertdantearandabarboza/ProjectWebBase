document.addEventListener('DOMContentLoaded', function() {
    // Función para inicializar la galería
    function initGallery(galleryContainer) {
        const mainImg = galleryContainer.querySelector('.gallery-main img');
        const thumbsTrack = galleryContainer.querySelector('.thumbs-track');
        const thumbnails = galleryContainer.querySelectorAll('.gallery-thumbs img');
        const prevBtn = galleryContainer.querySelector('.prev-thumb');
        const nextBtn = galleryContainer.querySelector('.next-thumb');
        
        let currentIndex = 0;
        const thumbWidth = 80; // Ancho de cada miniatura + gap
        const visibleThumbs = 4; // Número de miniaturas visibles a la vez
        
        // Función para actualizar la imagen principal
        function updateMainImage(thumb) {
            const newSrc = thumb.getAttribute('src');
            const newAlt = thumb.getAttribute('alt');
            
            // Efecto de transición suave
            mainImg.style.opacity = '0';
            setTimeout(() => {
                mainImg.src = newSrc;
                mainImg.alt = newAlt;
                mainImg.style.opacity = '1';
            }, 150);
            
            // Actualizar miniatura activa
            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            
            // Actualizar índice actual
            currentIndex = Array.from(thumbnails).indexOf(thumb);
        }
        
        // Función para desplazar el carrusel
        function scrollThumbs(direction) {
            const track = thumbsTrack;
            const maxScroll = track.scrollWidth - track.clientWidth;
            const scrollAmount = thumbWidth * 3; // Desplazar 3 miniaturas a la vez
            
            if (direction === 'prev' && track.scrollLeft > 0) {
                track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else if (direction === 'next' && track.scrollLeft < maxScroll) {
                track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
        
        // Evento de clic en miniatura
        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', function() {
                updateMainImage(this);
                centerThumb(index);
            });
            
            // Efecto hover
            thumb.style.cursor = 'pointer';
            thumb.addEventListener('mouseover', () => {
                thumb.style.opacity = '0.8';
            });
            thumb.addEventListener('mouseout', () => {
                thumb.style.opacity = '1';
            });
        });
        
        // Centrar la miniatura activa
        function centerThumb(index) {
            const thumb = thumbnails[index];
            const container = galleryContainer.querySelector('.gallery-thumbs');
            const containerWidth = container.clientWidth;
            const thumbLeft = thumb.offsetLeft;
            const thumbWidth = thumb.offsetWidth;
            const scrollPosition = thumbLeft - (containerWidth / 2) + (thumbWidth / 2);
            
            container.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }
        
        // Botones de navegación
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateMainImage(thumbnails[currentIndex]);
                    centerThumb(currentIndex);
                }
            });
            
            nextBtn.addEventListener('click', () => {
                if (currentIndex < thumbnails.length - 1) {
                    currentIndex++;
                    updateMainImage(thumbnails[currentIndex]);
                    centerThumb(currentIndex);
                }
            });
        }
        
        // Inicializar con la primera miniatura activa
        if (thumbnails.length > 0) {
            thumbnails[0].classList.add('active');
        }
    }
    
    // Inicializar todas las galerías en la página
    const galleries = document.querySelectorAll('.repuesto-gallery');
    galleries.forEach(gallery => {
        initGallery(gallery);
    });
    
    // Manejar el redimensionamiento de la ventana
    window.addEventListener('resize', () => {
        galleries.forEach(gallery => {
            const activeThumb = gallery.querySelector('.gallery-thumbs img.active');
            if (activeThumb) {
                const index = Array.from(gallery.querySelectorAll('.gallery-thumbs img')).indexOf(activeThumb);
                centerThumb(index);
            }
        });
    });
});
