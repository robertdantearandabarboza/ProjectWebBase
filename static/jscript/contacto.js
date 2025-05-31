document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  form.addEventListener('submit', (e) => {
    // Validar RUC si se llenó
    const rucInput = form.querySelector('#ruc');
    const ruc = rucInput.value.trim();

    if (ruc !== '') {
      const rucRegex = /^\d{11}$/;
      if (!rucRegex.test(ruc)) {
        e.preventDefault();
        alert('Por favor, ingresa un RUC válido de 11 dígitos.');
        rucInput.focus();
        return false;
      }
    }

    // Validar campos requeridos (HTML5 ya los valida, pero por si acaso)
    const nombre = form.querySelector('#nombre').value.trim();
    const email = form.querySelector('#email').value.trim();
    const mensaje = form.querySelector('#mensaje').value.trim();

    if (!nombre || !email || !mensaje) {
      e.preventDefault();
      alert('Por favor, completa todos los campos obligatorios.');
      return false;
    }

    // Si todo está bien, se enviará el formulario
  });
});

