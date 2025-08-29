// Poner clase 'active' en el enlace del menú que coincida con la página actual
document.addEventListener('DOMContentLoaded', () => {
  const enlaces = document.querySelectorAll('nav ul li a');
  const urlActual = window.location.pathname.split('/').pop();

  enlaces.forEach(enlace => {
    const href = enlace.getAttribute('href');
    if (href === urlActual) {
      enlace.classList.add('active');
    }
  });
});

function animarContador(elemento, duracion = 2000) {
  let valorFinal = parseInt(elemento.dataset.valor); // valor objetivo
  let inicio = 0;
  let incremento = valorFinal / (duracion / 16); // ~60fps

  // ✅ Detecta sufijo completo (+, %, /7, etc)
  let match = elemento.innerText.match(/\d+(.*)/);
  let sufijo = match ? match[1] : "";
  
  function actualizar() {
    inicio += incremento;
    if (inicio >= valorFinal) {
      elemento.innerText = valorFinal + sufijo;
    } else {
      elemento.innerText = Math.floor(inicio) + sufijo;
      requestAnimationFrame(actualizar);
    }
  }
  actualizar();
}

// ✅ Usamos IntersectionObserver para disparar la animación al hacer scroll
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // animar todos los contadores dentro del div que entró en pantalla
      entry.target.querySelectorAll(".stat-numero").forEach(el => {
        animarContador(el, 2500);
      });
      obs.unobserve(entry.target); // 👈 Solo una vez (evita reinicios)
    }
  });
}, { threshold: 0.5 }); // 0.5 = la mitad del div visible

// Observar la sección entera
const statsSection = document.querySelector(".equipo-stats");
if (statsSection) {
  observer.observe(statsSection);
}