let operacionesAPI = new TablaAPI({
  instancia: 'operacionesAPI',
  nombre: 'bdope',
  apis: {
    base: {
      url: "https://64e161e950713530432d148d.mockapi.io/Operaciones",
      id: "id"},
    cli: {
      url: "https://64e161e950713530432d148d.mockapi.io/Clientes",
      id: "dni"}
  },
  mapeoColumnas: [
    { api:'base', key:'id', type: 'text', col:'ID' },
    { api:'base', key:'fechaCarga', type: 'date', col:'Fecha de Carga', nsv:false },
    { api:'base', key:'cliente', type: 'select', col:'DNI', api2: 'cli', key2: 'dni'},
    { api:'cli', key:'nombre', type: 'text', col:'Nombre', keyid:'cliente'}, // dni
    { api:'cli', key:'celular', type: 'text', col:'Celular', keyid:'cliente'},
    { api:'base', key:'vehiculo',   ype: 'text', col:'Vehiculo'},
    { api:'base', key:'patente', type: 'text', col:'Patente', unico: true}
  ]
})
operacionesAPI.titulo.innerHTML="Operaciones"
operacionesAPI.agregarLnk = true
operacionesAPI.link = "./operacion.html"