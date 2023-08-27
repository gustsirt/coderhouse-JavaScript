// TODO CLASE TABLA -------------------
// esta CLASE toma un objetos como datos y debe mostrar una tabla con dichos objetos como filas
class TablaAPI {
  constructor (data) {
    // ? Datos base
    this.instancia = data.instancia

    this.nombre = data.nombre || ""// ID del contedor, se usa para localstorage y contenedor
    this.apis = data.apis || { // url de los datos
      base: {
        url: "",
        filtros: "" } }
    this.datos = {} /* tendra este formato = {
      base: {
        idkey1: { datos },
        idkey2: { datos }
      },
      no bases: {
        idkey1: { datos },
        idkey2: { datos }
      }
    } --> eso implica que ase accede this.datos[][]*/
    this.mapeoColumnas = data.mapeoColumnas || [] // mapeo de columnas con su Nombre en API y Ordenadas para mostrar

    this.idAdvertencias = document.getElementById(data.idAdvertencias) || false
    this.agregarBot = true // crea boton para agregar datos
    this.agregarMod = true // le agrega la columna con el boton para modificar el dato
    this.agregarModX = false // le agrega la columna con el boton para modificar el dato
    this.agregarEli = true // le agrega la columna Eliminar Fila
    this.agregarEliTemp = false // guarda el dato anterior cuando se esta Modificando
    this.datoAModificar = ""
    
    // Iniciador (inicia estructura -> busca datos -> inicia Columnas -> Visualiza)
    this.iniciarEstructura(data.nombre)
  }

  // ? INICIADORES
  iniciarEstructura (nombre) {
    
    // contenedor
    this.contenedor = document.getElementById(('contenedor'+this.nombre)) || null

    // titulo
    this.titulo = document.createElement('h2')
    this.titulo.className="titulo"
    this.contenedor.append(this.titulo)

    // filtros
    this.filtros = document.createElement('div')
    this.filtros.className="filtros"
    this.contenedor.append(this.filtros)
    this.divTF = document.createElement('div')
    this.divTF.className="divTituloFiltros"
    this.filtros.append(this.divTF)
    this.tituloF = document.createElement('h3')
    this.divTF.append(this.tituloF)
    this.botoneraF = document.createElement('div')
    this.divTF.append(this.botoneraF)
    this.divF = document.createElement('div')
    this.divF.className="divFiltros"
    this.filtros.append(this.divF)

    // Mensajes al Usuario
    this.mensajero = document.createElement('p')
    this.mensajero.className="mensajero"
    this.contenedor.append(this.mensajero)

    // Cabecera Tabla
    this.cabecera = document.createElement('div')
    this.cabecera.className="cabecera"
    this.contenedor.append(this.cabecera)
    this.crearCabecera()

    // Tabla
    this.tabla = document.createElement('table')
    this.tabla.className="tabla"
    this.contenedor.append(this.tabla)
    this.thead = document.createElement('thead')
    this.tbody = document.createElement('tbody')
    this.tabla.prepend(this.tbody)
    this.tabla.prepend(this.thead)
    
    // obtiene datos y columnas
    this.obtenerDatos()
    
  }
  obtenerDatos() {
    let key = Object.keys(this.apis)

    let fetchPromises = key.map( (k) => {
      return fetch(this.apis[k].url)
      .then((res) => res.json())
      .then((dat) => {
        const kk = {}
        dat.forEach ((dt) => {
          kk["id"+dt[this.apis[k].id]] = dt
        })
        this.datos[k] = kk
      })
      .catch((error) => {
        this.mensajero.innerHTML='<p>Hubo un problema con los datos. Vuelva a cargar la pagina por favor!</p><button onclick="location.reload()"><i class="bx bx-refresh">Actualizar</i></button>'
      })
    })
    
    // tras esperar a las promesas
    Promise.all(fetchPromises)
    .then(() => {
      this.mostrarEnContenedor()
    });
  }

  // ? Funciones Auxiliares
  darInput(tipo) {
    switch (tipo) {
      case 'date':
        return 'date'
      default:
        return 'text'
    }
  }
  darDatoSegunTipo(valor, tipo){
    switch (tipo) {
      case 'date':
      return new Date (valor).toLocaleDateString('es-AR', { year: 'numeric', month: '2-digit', day: '2-digit' })
      default: return valor
    }
  }
  darDatoSegunTipoParaInput(valor, tipo){
    switch (tipo) {
      case 'date':
        valor = new Date (valor)
        const year = valor.getFullYear()
        const month = String(valor.getMonth() + 1).padStart(2, '0')
        const day = String(valor.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
      default:
        return valor
    }
  }

  // ? Visualización
  // FILTROS
  mostrarAgregarDato() {
    this.tituloF.innerHTML="Campos para Agregar Datos"
    this.divF.innerHTML=""
    let auxstring = ""
    //let val
    this.mapeoColumnas.forEach((col) => {
      if (col.key != 'id') {
        if (col.api != "base") {
          auxstring +=`
          <div>
            <p>${col.col}:</p>
            <p id="ad${col.col}">.</p>
          </div>`
        } else {
          if (col.type != 'select') {
            auxstring += `
            <div>
              <label for="ad${col.col}">${col.col}:</label>
              <input type="${this.darInput(col.type)}" id="ad${col.col}">
            </div>`
          } else {
            auxstring +=
            `<div>
              <label for="ad${col.col}">${col.col}:</label>
              <select name="ad${col.col}" id="ad${col.col}" onchange="${this.instancia}.verDatosSelectAD(ad${col.col}, '${col.api2}')">`
            for (const rowa in this.datos[col.api2]) {
              auxstring +=`<option value="${this.datos[col.api2][rowa][col.key2]}">${this.datos[col.api2][rowa][col.key2]}</option>`
            }
            auxstring +=`</select></div>`
          }
        }
      }
    })
    this.divF.innerHTML+= auxstring
    this.botoneraF.innerHTML=`<button onclick="${this.instancia}.agregarDato()">Agregar</button>`
  }
  verDatosSelectAD(idSelect, api) {
    this.mapeoColumnas.forEach((col) => {
      if (col.api == api) {
        const pAEditar = document.getElementById(`ad${col.col}`)
        pAEditar.innerHTML = this.datos[api]['id'+idSelect.value][col.key]
      }
    })
  }

  // CABECERA
  crearCabecera() {
    if (this.agregarBot) {
      this.cabecera.innerHTML += `<button onclick="${this.instancia}.mostrarAgregarDato()"><i class='bx bx-add-to-queue'> Agregar</i></button>`
    }
  }
  // TABLA
  mostrarEnContenedor () {
    this.mostrarCabecera()
    this.mostrarCuerpo()
    //this.verDatos();
  }
  mostrarCabecera() {
    let auxstring = `<tr>`

    // Muestra el Resto de Titulo de Columnas
    this.mapeoColumnas.forEach( (col) => {
      col.nsv? "" :  auxstring += `<th>${col.col}</th>` 
    });
    // opcion: agregarMod (columna) MODIFICAR
    if (this.agregarMod) { auxstring += `<th><i class='bx bx-edit-alt'></i></th>` }
    if (this.agregarModX) { auxstring += `<th><i class='bx bx-x'></i></th>` }

    // opcion: agregarEli (columna) ELIMINAR
    if (this.agregarEli) { auxstring += `<th><i class='bx bx-message-square-x'></i></th>` }

    // finaliza
    auxstring += `</tr>`
    this.thead.innerHTML = auxstring
  }
  mostrarCuerpo() {
    let auxstring = ""
    let cc = 0
    let clase
    for (const row in this.datos.base) {
      cc % 2 === 0 ? clase="" : clase="par"
      auxstring += `<tr class="${clase}" id='row${row}'>`
      auxstring += this.mostrarCeldas(row)
      auxstring += this.mostrarOpcionalesFIn (row)
      auxstring += "</tr>"
      cc++
    }
    this.tbody.innerHTML = auxstring
  }
  mostrarCeldas(row) {
    let auxstring = ""
    this.mapeoColumnas.forEach( (col) => {
      if (!col.nsv) {
        let val
        if (col.api == "base") {
          val = this.datos.base[row][col.key]
        } else {
          val = this.datos[col.api]['id'+this.datos.base[row][col.keyid]][col.key]
        }
        // muestra valor o input
        if (col.api != "base" || this.datoAModificar != row) {
            auxstring += `<td>${this.darDatoSegunTipo(val, col.type)}</td>`
        } else {
          if (col.type != 'select') {
            auxstring += `<td><input type=${this.darInput(col.type)} value='${this.darDatoSegunTipoParaInput(val, col.type)}'></td>`
          } else {
            auxstring +=`<td><select name="subid" id="subid" onchange="${this.instancia}.verDatosSelect('${row}', '${col.api2}')">
              <option selected value="${val}">${val}</option>`
            for (const row2 in this.datos[col.api2]) {
              if (this.datos[col.api2][row2][col.key2] != val) {
                auxstring +=`<option value="${this.datos[col.api2][row2][col.key2]}">${this.datos[col.api2][row2][col.key2]}</option>`
              }
            }
            auxstring +=`</select></td>`
          } // fin else select
        }  // fin else input
      }
    });
    return auxstring
  }
  mostrarOpcionalesFIn (row) {
    let tipo = ""
    this.datoAModificar == row ? tipo="input" : tipo="dato"
    let auxstring = ""

    if (tipo == "dato") {
      // opcion: agregarMod (boton)
      if (this.agregarMod) {
        auxstring += `<td><button onclick="${this.instancia}.iniciaModificarDato('${row}')"><i class='bx bx-edit-alt'></i></button></td>`
      }
      if (this.agregarModX) {
        auxstring += `<td><button onclick="" disabled> </button></td>`
      }

      // opcion: agregarEli (columna) ELIMINAR
      if (this.agregarEli) {
        auxstring += `<td><button onclick="${this.instancia}.iniciaEliminarDato('${row}')"><i class='bx bx-message-square-x'></i></button></td>`
      }
    } else {
      // opcion: agregarMod (boton)
      if (this.agregarMod) {
        auxstring += `<td><button onclick="${this.instancia}.modificarDato('${row}')"><i class='bx bx-check'></i></button></td>`
        auxstring += `<td><button onclick="${this.instancia}.cancelaModificarDato()"><i class='bx bx-x'></i></button></td>`
      }
    }

    return auxstring
  }
  verDatosSelect(row, api) {  
    const seleccion = document.querySelector(`#row${row}`).children
    const nuevovalor = document.querySelector(`#subid`).value
    let cc = 0
    for (let i = 0; i < this.mapeoColumnas.length; i++) {
      if (this.mapeoColumnas[i].nsv) {cc++; continue}
      if (this.mapeoColumnas[i].api == api) {
        seleccion[i-cc].innerHTML = this.datos[api]['id'+nuevovalor][this.mapeoColumnas[i].key]
      }
    }
  }
  verDatos(){
    console.log(this.mapeoColumnas);
    console.log(this.datos);
    //console.log(this.datos['base']['id1']);
  }

  // ? Modificacion de Datos
  agregarDato() {
    let verificacion = true
    const objetoAAgregar = {}
    this.mapeoColumnas.forEach((col) => {
      if (col.key != 'id' && col.api == "base") {
        const pAEditar = document.getElementById(`ad${col.col}`)
        verificacion = verificacion && (pAEditar.value? true : false)
        objetoAAgregar[col.key] = pAEditar.value
      }
    })
    if(verificacion == false) {
      this.mensajero.innerHTML="Para poder agregar un dato debes haber completado todos los campos"
      setTimeout( () => {
        this.mensajero.innerHTML = ""
      },3000)
    } else {
      fetch(this.apis.base.url, {
        method: 'POST',
        headers: {'content-type':'application/json'},
        body: JSON.stringify(objetoAAgregar)
      })
        .then (() => {
          this.mensajero.innerHTML="Dato agregado"
          setTimeout( () => {
            this.mensajero.innerHTML = ""
          },3000)
        })
        .catch(() => {
          this.mensajero.innerHTML="Hubo un error. Intenta de nuevo"
          this.mostrarCuerpo()
          setTimeout( () => {
            this.mensajero.innerHTML = ""
          },3000)
        })
    }    
  }
  iniciaModificarDato(row) {
    this.datoAModificar = row
    this.agregarEliTemp = this.agregarEli
    this.agregarEli = false
    this.agregarModX = true
    this.mostrarEnContenedor()
  }
  cancelaModificarDato() {
    this.datoAModificar = ""
    this.agregarEli = this.agregarEliTemp
    this.agregarModX = false
    this.mostrarEnContenedor()
  }
  modificarDato(row) {
    const seleccion = document.querySelector(`#row${row}`).children
    let datAMod
    let cc = 0
    for (let i = 0; i < this.mapeoColumnas.length; i++) {
      if (this.mapeoColumnas[i].nsv) {cc++; continue}
      if (seleccion[i-cc].children.length == 0) {continue}
      this.datos[this.mapeoColumnas[i].api][row][this.mapeoColumnas[i].key] = seleccion[i-cc].children[0].value
    }

    this.guadarDatos('base', row, this.datos['base'][row])
  }
  guadarDatos(api, row, dato) {
    let ref = row.split('id')[1]
    let url = `${this.apis[api]['url']}?${this.apis[api]['id']}=${ref}`
    let urlput = `${this.apis[api]['url']}/`
    let traerID

    console.log(dato);
    console.log(url);

    // filtra el dato con la referencia conocida
    let fetchPromises = fetch(url)
    .then((res) => res.json())
    // aqui obtengo id
    .then((dat) => traerID = dat[0].id)
    .then(() => {
      fetch(`${urlput}${traerID}`, {
        method: 'PUT',
        body: JSON.stringify(dato),
        headers: {"Content-Type":"application/json"}
      })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Dato Guardado!'
        })
        
        this.datoAModificar = ""
        this.agregarEli = this.agregarEliTemp
        this.agregarModX = false
        this.mostrarEnContenedor();
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Prueba de nuevo',
        })
      })
    })
  }

  // ? Eliminar Dato
  iniciaEliminarDato(row) {
    Swal.fire({
      title: '¿Estas seguro?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarDato(row)
      }
    })
  }
  
  eliminarDato(row) {
    console.log("me falta terminar esto");
    /*
    this.datos.splice(row, 1)
    this.guadarDatos();
    this.mostrarEnContenedor();
    */
  }

  // TODO -> funcion ordenar
  // TODO -> funcion filtrar
}




