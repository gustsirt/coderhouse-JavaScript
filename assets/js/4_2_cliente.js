let clientesAPI = new TablaAPI({
  instancia: 'clientesAPI',
  nombre: 'bdcli',
  apis: {
    base: {
      url: "https://64e161e950713530432d148d.mockapi.io/Clientes",
      id: "dni",
      filtros: "" },
  },
  mapeoColumnas: [
    { api:'base', key:'id', type: 'text', col:'ID'},
    { api:'base', key:'dni', type: 'text', col:'DNI', unico: true },
    { api:'base', key:'nombre', type: 'text', col:'Nombre', keyid:'cliente'},
    { api:'base', key:'celular', type: 'text', col:'Celular', keyid:'cliente'}
  ]
})
clientesAPI.titulo.innerHTML="Clientes"