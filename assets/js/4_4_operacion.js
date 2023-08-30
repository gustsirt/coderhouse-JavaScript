const contenedor = document.getElementById('contenedorbase')
var ref = window.location.href.split("?")[1].split("=id")[1]
const ordenCol = [
  { key: "id",          col: "ID"               },
  { key: "fechaCarga",  col: "Fecha de Creación"},
  { key: "cliente",     col: "DNI Cliente"      },
  { key: "vehiculo",    col: "Vehiculo"         },
  { key: "patente",     col: "Patente"          },
  { key: "notas",       col: "Notas"            }
]

fetch(`https://64e161e950713530432d148d.mockapi.io/Operaciones/${ref}`)
  .then(res => res.json())
  .then(dat => mostrardatos(dat))
  .catch(() => {
    contenedor.innerHTML='<p>Hubo un problema con los datos. Vuelva a cargar la pagina por favor!</p><button onclick="location.reload()"><i class="bx bx-refresh">Actualizar</i></button>'
  })

function mostrardatos (datos) {
  contenedor.innerHTML = "<h3>Datos de la Operación</h3>"
  contenedor.innerHTML += "<h5>NO PUDE TERMINAR ESTA PARTE A TIEMPO</h5>"
  contenedor.innerHTML += "<p>Por eso queda de referencia mostrando que lo puedo hacer</p>"
  contenedor.innerHTML += "<hr>"
  const keys = Object.keys(datos)
  for (let i = 0; i < ordenCol.length; i++) {
    contenedor.innerHTML += `<p><strong>${ordenCol[i].col}:</strong> ${datos[ordenCol[i].key]}</p>`
  }
}