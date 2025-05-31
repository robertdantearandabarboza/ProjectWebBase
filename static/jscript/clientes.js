document.addEventListener('DOMContentLoaded', () => {
  const clientes = document.querySelectorAll('.cliente');

  clientes.forEach(cliente => {
    cliente.addEventListener('click', () => {
      const nombreCliente = cliente.querySelector('p').textContent;
      alert(`Más info sobre: ${nombreCliente}`);
    });
  });
});
