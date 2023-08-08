// ? ***************** VARIABLES *****************
const nuevoCliente = {
  cDNI: document.getElementById('cDNI'),
  cNombre: document.getElementById('cNombre'),
  cCelular: document.getElementById('cCelular'),
  botAgregar: document.getElementById('agregarCliente'),
  txtAgregar: document.getElementById('agregarMensaje'),
  botModif: document.getElementById('modificarCliente')
}
const datClientes = {
  tabla: document.getElementById('cuerpoClientes'),
  indice: -1 // se usa para modificar cliente
}
// let clientes = []  --> clientes.js

// ? ***************** FUNCIONES *****************

// Mostrar Arreglo
function mostrarArreglo() {
  let html = ``
  for (let i = 0; i < clientes.length; i++) {
    html += `<tr>
        <th scope="row">${i+1}</th>
        <td>${clientes[i].dni}</td>
        <td>${clientes[i].nombre}</td>
        <td>${clientes[i].celular}</td>
        <td><button onclick="irAModificar(${i})"><i class='bx bx-edit-alt'></i></button></td>
        <td><button onclick="eliminar(${i})"><i class='bx bx-message-square-x'></i></button></td>
      </tr>
      `
  }
  datClientes.tabla.innerHTML = html
}

// Agregar Clientes al Arreglo
function agregarCliente() {
  clientes.push ({
    dni: cDNI.value,
    nombre: cNombre.value,
    celular: cCelular.value,
  })
  nuevoCliente.txtAgregar.innerText = "Cliente agregador"
  mostrarArreglo()
}

// ? ***************** FUNC. DE BOTONES *****************
// Guardar Clientes, evento en Hoja Clientes -- Boton Guardar
function guardarClientes() {
  localStorage.setItem('clientes', JSON.stringify(clientes))
}

/* -- Boton Agregar
  Valida:
    1ro: si ingreso todos los campos --> 2do o advierte
    2do: si la cadena esta vacia --> 3ro o agrega
    3ro: si ya existe DNI --> agrega o advierte */
nuevoCliente.botAgregar.addEventListener('click', () => {
  if((cDNI.value||false)&&(cNombre.value||false)&&(cCelular.value||false)) { // 1ro -> 2do
      if ((clientes.length??0)==0) {
        // 2do - agrega
        agregarCliente()
      } else { // 2do -> 3ro
        let aux = 0
        clientes.forEach( (cli) => {
          if ( cli.dni === nuevoCliente.cDNI.value ) {
            aux = 1
        }})
        // 3ro - advierto o agrega
        aux == 1 ?
          nuevoCliente.txtAgregar.innerText = "ERROR: Este cliente ya fue agregado"
        : agregarCliente()
      }
    } else { // 1ro - advierte
    nuevoCliente.txtAgregar.innerText = "Necesitas ingresar los 3 campos para que el cliente se considere valido"
  }
})

// ir a modificar  -- Boton irAModificar
function irAModificar(i) {
  console.log(i);
  datClientes.indice = i
  nuevoCliente.cDNI.value = clientes[i].dni
  nuevoCliente.cNombre.value = clientes[i].nombre
  nuevoCliente.cCelular.value = clientes[i].celular
  nuevoCliente.cDNI.disabled = true
  nuevoCliente.botAgregar.classList.toggle('ocultar')
  nuevoCliente.botModif.classList.toggle('ocultar')
  nuevoCliente.txtAgregar.innerText = "Aqui puedes modificar el cliente "
}

// Modfica cliente (DNI sigue =) -- Boton Modificar
nuevoCliente.botModif.addEventListener('click', () => {
  clientes[datClientes.indice].nombre = nuevoCliente.cNombre.value
  clientes[datClientes.indice].celular = nuevoCliente.cCelular.value
  nuevoCliente.cDNI.value = ""
  nuevoCliente.cNombre.value = ""
  nuevoCliente.cCelular.value = ""
  datClientes.indice = -1
  nuevoCliente.botAgregar.classList.toggle('ocultar')
  nuevoCliente.botModif.classList.toggle('ocultar')
  nuevoCliente.txtAgregar.innerText = "Cliente Modificado"
  nuevoCliente.cDNI.disabled = false
  mostrarArreglo()
})

// Elimina Cliente (si se esta modificando no hace nada)
function eliminar(i) {
  if (nuevoCliente.cDNI.disabled == false) {
    nuevoCliente.txtAgregar.innerText = `Cliente ${clientes[i].nombre} Eliminado`
    clientes.splice(i,1)
    mostrarArreglo()
  } else {
    nuevoCliente.txtAgregar.innerText = `Debes terminar de modificar el Cliente ${clientes[datClientes.indice].nombre}`
  }
}

// ? ***************** EVENTOS *****************
// al iniciar de carga los datos por --> clientes.js 
window.addEventListener('load', () => {
  mostrarArreglo()
})
