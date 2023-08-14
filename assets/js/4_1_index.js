// ? ***************** EVENTOS *****************
// funcion validarUsuario - ligado a Submit - del formulario en Index
const verif = document.getElementById('formularioVal')

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
      localStorage.setItem("user",usuariologueado.id)
      location.reload()
    }
    // si no se logeo manda mensaje
    if (aux === 0) {
      e.target.children[5].innerText = "El Usuario no existe. Pruebe de nuevo"
    }
  });
})
