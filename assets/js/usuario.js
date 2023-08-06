const usuariologueado = {
  id: -1, // si esta registrado debe ser >= 0
  logUsuario: document.getElementById('logUsuario')
}
let verif // lo usare para ver si existe un valor

// defino previamente Usuarios aceptados
usuarios =[
  {
    id: 0,
    usuario: "admin",
    pass: "admin"
  },
  {
    id: 1,
    usuario: "invitado",
    pass: " "
  },
]

// verifica Si esta Logueado
window.addEventListener('load', () => {
  usuariologueado.id = ( localStorage.getItem("user") ?? -1)

  // si hay usuario logueado muestra el nombre sino -- ( y yapa)
  if (usuariologueado.id >= 0) {
    logUsuario.innerText = usuarios[usuariologueado.id].usuario
  } else {
    logUsuario.innerText = "--"

    // ! evita que accedas a otra pagina (me fallo)
    let currentPagePath = window.location.href.split('/').pop();
    if (currentPagePath != "index.html") {
    //  console.log(currentPagePath, "Se espera llegar a: ../index.html");
      window.location.href = "../index.html"
    } 
  }
})

// funcion validarUsuario - ligado a Submit - del formulario en Index
verif = document.getElementById('formularioVal')
// primero verifica si existe el formularios
if(verif||false) {
  verif.addEventListener('submit', (e) => {
    // e.preventDefault(); // evita que reinicie formulario
    let aux = 0 // 1 = aceptado
    // revisa array a ver si existe 
    usuarios.forEach(regist => {
      // primero busca usuario luego pass, si haya asigna id
      if (regist.usuario === e.target[0].value) {
        if (regist.pass === e.target[1].value ) {
          aux = 1
          usuariologueado.id = regist.id
        }
      }
      // si se logeo manda mensaje y actualiza datos
      if (aux === 1) {
        e.target.children[5].innerText = "El usuario fue Aceptado"
        logUsuario.innerText = usuarios[usuariologueado.id].usuario
        localStorage.setItem("user",usuariologueado.id)
      }
      // si no se logeo manda mensaje
      if (aux === 0) {
        e.target.children[5].innerText = "El Usuario no existe. Pruebe de nuevo"
      }
    });

  })
}

