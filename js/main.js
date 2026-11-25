
// Esperamos a que el documento HTML esté listo.
document.addEventListener("DOMContentLoaded", () => {

  // Datos personales provenientes de data.js.
  const personal = data.personal;

  // Función para mostrar información en una sección.
  function mostrarTarjetas(id, elementos, crearContenido) {
    const contenedor = document.getElementById(id);

    if (!contenedor || !elementos) return;

    contenedor.innerHTML = elementos.map(elemento => `
      <article class="card">
        ${crearContenido(elemento)}
      </article>
    `).join("");
  }

  // Información principal.
  document.getElementById("nombre").textContent = personal.nombre;
  document.getElementById("presentacion").textContent = personal.presentacion;
  document.getElementById("biografia").textContent = personal.biografia;
  document.getElementById("correo").textContent = personal.correo;

  // Fotografía de perfil: se oculta mientras no se agregue una foto.
  const foto = document.getElementById("foto-perfil");

  if (personal.foto && personal.foto.trim() !== "") {
    foto.src = personal.foto;
  } else {
    foto.style.display = "none";
  }

  // Habilidades personales.
  mostrarTarjetas("habilidades", data.habilidades, habilidad => `
    <h3>${habilidad}</h3>
  `);

  // Rendimiento y formación académica.
  mostrarTarjetas("rendimiento", data.academics, item => `
    <h3>${item.titulo}</h3>
    <p>${item.descripcion}</p>
  `);

  // Cursos.
  mostrarTarjetas("lista-cursos", data.courses, curso => `
    <h3>${curso.nombre}</h3>
    <p>${curso.descripcion}</p>
  `);

  // Profesores.
  mostrarTarjetas("lista-profesores", data.professors, profesor => `
    <h3>${profesor.nombre}</h3>
    <p><strong>Curso:</strong> ${profesor.curso}</p>
    <p>${profesor.descripcion}</p>
  `);

  mostrarTarjetas("lista-proyectos", data.projects, proyecto => `
  ${proyecto.foto ? `
    <img
      src="${proyecto.foto}"
      alt="${proyecto.nombre}"
      class="project-image"
    >
  ` : ""}

  <h3>${proyecto.nombre}</h3>

  <p>${proyecto.descripcion}</p>

  ${proyecto.enlace ? `
    <a
      href="${proyecto.enlace}"
      target="_blank"
      rel="noopener noreferrer"
      class="project-link"
    >
      Conocer más sobre esta experiencia
    </a>
  ` : ""}
`);

  // Intereses y hobbies.
  mostrarTarjetas("lista-intereses", data.interests, interes => `
    <h3>${interes}</h3>
  `);

// Compañeros.
mostrarTarjetas("lista-companeros", data.classmates, companero => `
    <h3>${companero.nombre}</h3>
    <p>${companero.descripcion}</p>

    ${companero.url ? `
        <a href="${companero.url}"
           target="_blank"
           rel="noopener noreferrer"
           class="project-link">
           Visitar página web
        </a>
    ` : ""}
`);

  // Redes sociales.
  const redes = document.getElementById("redes-sociales");

  redes.innerHTML = personal.redes.map(red => `
    <a href="${red.url}" target="_blank" rel="noopener noreferrer">
      ${red.nombre}
    </a>
  `).join(" | ");

  // Año automático en el pie de página.
  document.getElementById("year").textContent = new Date().getFullYear();

  // Menú para celulares.
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav");

  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
  });

  // Cerrar el menú al seleccionar una sección.
  nav.querySelectorAll("a").forEach(enlace => {
    enlace.addEventListener("click", () => {
      nav.classList.remove("active");
    });
  });

});
