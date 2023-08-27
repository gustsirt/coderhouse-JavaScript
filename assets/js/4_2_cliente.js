let tCliente = new Tabla('tCliente', 'bdcli', bd.clientes)

const nCliente = {
  cDNI: document.getElementById('cDNI'),
  cNombre: document.getElementById('cNombre'),
  cCelular: document.getElementById('cCelular'),
  txtAgregar: document.getElementById('agregarMensaje'),
}

/* -- Boton Agregar
  Valida:
    1ro: si ingreso todos los campos --> 2do o advierte
    2do: si la cadena esta vacia --> 3ro o agrega
    3ro: si ya existe DNI --> agrega o advierte */
    
document.querySelector('#agregarDato').addEventListener('click', () => {
  if((nCliente.cDNI.value||false)&&(nCliente.cNombre.value||false)&&(nCliente.cCelular.value||false)) { // 1ro -> 2do
      if (( tCliente.datos.length ?? 0 ) == 0 ) {
        // 2do - agrega
        agregarCliente()
      } else { // 2do -> 3ro
        let aux = 0
        tCliente.datos.forEach( (cli) => {
          if ( cli.dni === nCliente.cDNI.value ) {
            aux = 1
        }})
        // 3ro - advierto o agrega
        aux == 1 ?
          mostrarMensaje("ERROR: Este cliente ya fue agregado")
        : agregarCliente()
      }
    } else { // 1ro - advierte
      mostrarMensaje("Necesitas ingresar los 3 campos para que el cliente se considere valido")
  }
})

// Agregar Clientes (funcion clase)
function agregarCliente() {
  let nuevoCliente = {
    dni: cDNI.value,
    nombre: cNombre.value,
    celular: cCelular.value,
  }
  tCliente.agregarDato(nuevoCliente)
  mostrarMensaje("Cliente agregado")
}

function mostrarMensaje (mensaje) {
  nCliente.txtAgregar.innerText = mensaje
  setTimeout( () => {
    nCliente.txtAgregar.innerText = ""
  },3000)
}