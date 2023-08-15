const d = document

// ? PAGINA

// indentifica la pagina, ej: "index.html"
const page = {
  currentPagePath: window.location.href.split('/').pop()
}
// correige error de un simbolo ? al final
page.currentPagePath = page.currentPagePath.split("?")[0]

// ? USUARIOS

// Aceptados (Suele estar en el BackEnd)
usuarios =[
  {
    id: 0,
    abr: "AD",
    usuario: "admin",
    pass: "admin"
  },
  {
    id: 1,
    abr: "I",
    usuario: "invitado",
    pass: " "
  },
]
let usuariologueado = localStorage.getItem('user') ?? -1 // si esta registrado debe ser >= 0

// ? DATOS

// iniciar datos

const bd = {
  clientes: JSON.parse(localStorage.getItem('bdcli')) || [],
  operaciones: JSON.parse(localStorage.getItem('bdope')) || []
}

  console.log(bd);




