// ? ***************** VARIABLES *****************

let clientes = []

// ? ***************** FUNCIONES *****************

// busca si hay clientes guardados
function cargarClientes() {
  clientes = JSON.parse(localStorage.getItem('clientes')) || []
}



// ? ***************** EVENTOS *****************
window.addEventListener('load', () => {
  cargarClientes()
})