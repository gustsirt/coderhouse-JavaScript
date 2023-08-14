const d = document

// indentifica la pagina, ej: "index.html"
const page = {
  currentPagePath: window.location.href.split('/').pop()
}
// correige error de un simbolo ? al final
page.currentPagePath = page.currentPagePath.split("?")[0]

// Usuarios aceptados (Suele estar en el BackEnd)
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
const usuariologueado = {
  id: localStorage.getItem("user") ?? -1, // si esta registrado debe ser >= 0
//  verif: "" // lo usare para ver si existe un valor
}