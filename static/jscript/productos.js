const modal = document.getElementById('modal');
const modalTitulo = document.getElementById('modalTitulo');
const modalImagen = document.getElementById('modalImagen');
const modalDescripcion = document.getElementById('modalDescripcion');
const cerrarBtn = document.getElementById('cerrarBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let imagenes = [];
let indiceActual = 0;

// Abrir modal al hacer click en un producto
document.querySelectorAll('.producto').forEach(producto => {
  producto.addEventListener('click', () => {
    modalTitulo.textContent = producto.getAttribute('data-nombre');
    modalDescripcion.textContent = producto.getAttribute('data-descripcion');
    imagenes = producto.getAttribute('data-imgs').split(',').map(img => img.trim());
    indiceActual = 0;
    modalImagen.src = imagenes[indiceActual];
    modal.style.display = 'flex';
  });
});

// Función para mostrar imagen según índice
function mostrarImagen(indice) {
  if (indice < 0) {
    indiceActual = imagenes.length - 1;
  } else if (indice >= imagenes.length) {
    indiceActual = 0;
  } else {
    indiceActual = indice;
  }
  modalImagen.src = imagenes[indiceActual];
}

// Botón anterior
prevBtn.addEventListener('click', () => {
  mostrarImagen(indiceActual - 1);
});

// Botón siguiente
nextBtn.addEventListener('click', () => {
  mostrarImagen(indiceActual + 1);
});

// Cerrar modal con botón
cerrarBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  modalImagen.src = '';
});

// Cerrar modal con tecla ESC
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.style.display === 'flex') {
    modal.style.display = 'none';
    modalImagen.src = '';
  }
});

// Cerrar modal si se hace clic fuera del contenido
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    modalImagen.src = '';
  }
});
