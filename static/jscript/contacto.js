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

const form = document.getElementById('contact-form');
const respuesta = document.getElementById('respuesta');

form.addEventListener('submit', function(e) {
  e.preventDefault(); // Evita que se recargue la página

  const nombre = form.nombre.value.trim();
  const email = form.email.value.trim();
  const mensaje = form.mensaje.value.trim();

  if(!nombre || !email || !mensaje){
    respuesta.style.color = 'red';
    respuesta.innerText = "Por favor completa todos los campos obligatorios.";
    return;
  }

  const formData = new FormData(form);

  fetch(form.action, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      respuesta.style.color = 'green';
      respuesta.innerText = "Mensaje enviado correctamente ✅";
      form.reset();
    } else {
      respuesta.style.color = 'red';
      respuesta.innerText = "Hubo un error al enviar el mensaje ❌";
    }
  })
  .catch(() => {
    respuesta.style.color = 'red';
    respuesta.innerText = "Hubo un error al enviar el mensaje ❌";
  });
});

const direccion = "Otr. Marko Jara Schenone 1ra e Mza. T Lote. 02 a.V. Civil Militar Ep, Lima, Perú";
  
  // Codifica la dirección para URL
  const direccionURL = encodeURIComponent(direccion);
  
  // Inserta la dirección en el iframe
  document.getElementById("googleMap").src = `https://www.google.com/maps?q=${direccionURL}&output=embed`;