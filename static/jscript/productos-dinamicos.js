document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    
    // Función para actualizar el fondo según el scroll
    function actualizarFondo() {
        const scroll = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const porcentaje = scroll / maxScroll;
        
        // Calculamos el color basado en el scroll
        const r = Math.floor(255 - porcentaje * (255 - 128)); // De 255 (blanco) a 128 (gris)
        const g = Math.floor(255 - porcentaje * (255 - 128)); // De 255 (blanco) a 128 (gris)
        const b = Math.floor(255 - porcentaje * (255 - 128)); // De 255 (blanco) a 128 (gris)
        
        // Aplicamos el color al fondo
        body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        
        // Si estamos al inicio, usamos blanco
        if (scroll === 0) {
            body.style.backgroundColor = '#ffffff'; // blanco
        }
    }
    
    // Actualizar cuando se hace scroll
    window.addEventListener('scroll', actualizarFondo);
    
    // Actualizar al cargar la página
    actualizarFondo();
});
