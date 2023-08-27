/* let pruebaC = new TablaAPI({
  instancia: 'pruebaC',
  nombre: 'bdope',
  datosAPI: {
    base: "https://64e161e950713530432d148d.mockapi.io/Operaciones",
    clientes: "https://64e161e950713530432d148d.mockapi.io/Clientes" },
  mapeoColumnas: {
    id: 'ID',
    fechaCarga: 'Fecha de Carga',
    cliente: 'Cliente',
    vehiculo: 'Vehiculo',
    patente: 'Patente',
    notas: '.' },
  idErrores: 'agregarMensaje'
}) */

let pruebaC = new TablaAPI({
  instancia: 'pruebaC',
  nombre: 'bdope',
  apis: {
    base: {
      url: "https://64e161e950713530432d148d.mockapi.io/Operaciones",
      id: "id",
      filtros: "" },
    cli: {
      url: "https://64e161e950713530432d148d.mockapi.io/Clientes",
      id: "dni",
      filtros: "" }
  },
  mapeoColumnas: [
    { api:'base', key:'id', type: 'text', col:'ID' },
    { api:'base', key:'fechaCarga', type: 'date', col:'Fecha de Carga', nsv:false },
    { api:'base', key:'cliente', type: 'select', col:'DNI', api2: 'cli', key2: 'dni'},
    { api:'cli', key:'nombre', type: 'text', col:'Nombre', keyid:'cliente'}, // dni
    { api:'cli', key:'celular', type: 'text', col:'Celular', keyid:'cliente'},
    { api:'base', key:'vehiculo',   ype: 'text', col:'Vehiculo'},
    { api:'base', key:'patente', type: 'text', col:'Patente'}
  ]
})
pruebaC.titulo.innerHTML="Operaciones"
let datosAux = []

// PARCHE: tengo la necesidad de hacer esto solo porque esta parte de la clase surge despues de haber realizado lo otro y para no retrasarme tanto obte por el este parche

function recargarClientes() {
  // primero elimina todos los clientes
  fetch(pruebaC.datosAPI.clientes)
  .then ( (res) => res.json())
  .then ( (datos) => 
  {datos.forEach(element => {
    fetch(pruebaC.datosAPI.clientes+"/"+element.id, {method: 'DELETE'})
    .catch ( (error2) => console.error(error2) )
    });
  }).catch ( (error) => console.error(error) )

  // luego los carga
  bd.clientes.forEach(cli => {
    fetch(pruebaC.datosAPI.clientes, {
      method: 'POST',
      body: JSON.stringify(cli),
      headers: {"Content-Type":"application/json"}
    })
    .catch ( (error) => console.error(error) )
})
}
//recargarClientes()

/* -- Boton Agregar
Valida:
1ro: si ingreso todos los campos --> 2do o advierte
2do: si la cadena esta vacia --> 3ro o agrega
3ro: si ya existe DNI --> agrega o advierte */


    /*
document.querySelector('#agregarDato').addEventListener('click', () => {
  if((nCliente.cCliente.value||false)&&(nCliente.cVehiculo.value||false)&&(nCliente.cPatente.value||false)) { // 1ro -> 2do
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
}*/