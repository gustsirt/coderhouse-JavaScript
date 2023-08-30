// ? HEADER - VARIABLES
// - Arreglo Variables para hacer DOM: Head, Header y Footer
const hoja = {
  paginas: [
    {
      src: "index.html",
      lnk: "Log In",
      tit: "Sistema de Cobros",
      h1: "Sistema de Cobros"
    },
    {
      src: "clientes.html",
      lnk: "Clientes",
      tit: "Sistema de Cobros | Clientes",
      h1: "Clientes"
    },
    {
      src: "operaciones.html",
      lnk: "Operaciones",
      tit: "Sistema de Cobros | Operaciones",
      h1: "Operaciones"
    },
    {
      src: "pagares.html",
      lnk: "Pagare",
      tit: "Sistema de Cobros | Pagare Imprimible",
      h1: "Pagare Imprimible"
    },
    {
      src: "operacion.html",
      lnk: "Operación",
      tit: "Sistema de Cobros | Operación",
      h1: "Operaciones",
      nsv: true
    }
  ],
  activa: 0,
  ubicacion: 0,
  conector: ".",
  secTit: d.getElementById('hoja-tit'),
  secNav: d.getElementById('hoja-nav'),
  secFooter: d.getElementById('hoja-footer'),
}

// - INICIA: Usuario - Head - Titulo, Header y Footer
window.addEventListener('load', () => {

  // TODO USUARIO evita que accedas a otra pagina (no anda en github)
  if (usuariologueado < 0) {
    if (page.currentPagePath != "index.html") {
      console.log("window.location.href = '../index.html'"); // este codigo no estaria consologeado, pero github da error
    }
  }

  // PAGINAS Define ubicación en array
  for (let i = 0; i < hoja.paginas.length; i++) {
    if (page.currentPagePath == hoja.paginas[i].src) {
      hoja.ubicacion = i
      if (hoja.ubicacion == 0) {hoja.conector = ""}
      break
    }
  }

  // HEAD ********************************************
  // Define Titulo
  // TODO falta descripcion y otros META
  let titulo = document.createElement('title')
  titulo.innerText = hoja.paginas[hoja.ubicacion].tit
  d.head.appendChild(titulo)

  // HEADER *********************************************
  // USUARIO pre verificación
  let auxuser = usuariologueado >= 0
  let auxabr 
  let auxusuario
  if (auxuser) {
    auxabr = usuarios[usuariologueado].abr
    auxusuario = usuarios[usuariologueado].usuario
  } else {
    auxabr = "--"
    auxusuario = "--"
  }

  // NO NAV
  hoja.secTit.innerHTML = `
      <a href="${hoja.conector}./${hoja.paginas[0].src}"><img src="${hoja.conector}./assets/img/logo.jpg" alt="Logo Empresa"></a>
      <h1>${hoja.paginas[hoja.ubicacion].h1}</h1>
    <div class="user-header">
      <p id="logUsuario">${auxabr}<button  onclick="mostrarUser()"><i class='bx bx-chevron-down-circle'></i></button></p>
    </div>
    <div id="menu-user" class="ocultar">
      <p>Usuario: ${auxusuario}</p>
      <button onclick="cerrarSesion()">Cerrar Sesion</button>
    </div>
    `
  // NAV (si no esta logueado no lo hace)
  if(auxuser) {
    let auxconec = ""
    hoja.ubicacion == 0 ? auxconec = "./pages/" : auxconec = "./"
    let preNav = `<ul>
      <li><a href="${hoja.conector}./${hoja.paginas[0].src}">${hoja.paginas[0].lnk}</a></li>`
    for (let i = 1; i < hoja.paginas.length; i++) {
      if (hoja.paginas[i].nsv ) {continue}
      preNav += `<li><a href="${auxconec}${hoja.paginas[i].src}">${hoja.paginas[i].lnk}</a></li>`
    }
    preNav +=`</ul>`
    hoja.secNav.innerHTML = preNav

    // agrega clase active
    if (!hoja.paginas[hoja.ubicacion].nsv) { hoja.secNav.children[0].children[hoja.ubicacion].className = "active" }
  }

  // FOOTER *********************************************
  hoja.secFooter.innerHTML = `
  <div class="container">
    <p class="title">${hoja.paginas[hoja.ubicacion].h1}</p>
    <p class="descrip"></p>
    <div class="social-links">
      <a href="https://wa.me/5493541613185?text=Hola.%20Me%20gustaría%20contactarme%20contigo" target="_blank" cclass="">
        <i class='bx bxl-whatsapp'></i></a>
      <a href="https://www.facebook.com/gustavoandres.sirtori/" target="_blank" class="">
        <i class="bx bxl-facebook"></i></a>
      <a href="https://www.instagram.com/" target="_blank" class="">
        <i class="bx bxl-instagram"></i></a>
      <a href="https://www.linkedin.com/in/gustavoandressirtori/" target="_blank" cclass="">
        <i class="bx bxl-linkedin"></i></a>
      <a href="mailto:gustavo.sirtori@gmail.com" target="_blank" cclass="">
        <i class='bx bxl-gmail'></i></a>
    </div>
    <div class="copyright">
      &copy; Copyright ${new Date().getFullYear()}<span class="pstr"> Sirtori Gustavo</span>. Todos los derechos reservados
    </div>
  </div>`
})

// ? GESTION DE USUARIO ---------------------------------
function mostrarUser() {
  let auxuser = d.getElementById('menu-user')
  auxuser.classList.toggle('ocultar')
}
function cerrarSesion() {
  localStorage.clear('user')
  location.reload()
}
