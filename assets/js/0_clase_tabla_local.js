// TODO CLASE TABLA -------------------
// esta CLASE toma un objetos como datos y debe mostrar una tabla con dichos objetos como filas
class Tabla {
  constructor (instancia, nombre, datos = [], columnas = []) {
    // ? Datos base
    this.instancia = instancia

    this.nombre = nombre // ID del contedor, se usa para localstorage y contenedor
    this.datos = datos // objeto
    this.columnas = columnas // nombre de columnas

    this.agregarID = true // le agrega la columna ID a la tabla
    this.agregarMod = true // le agrega la columna con el boton para modificar el dato
    this.agregarEli = true // le agrega la columna Eliminar Fila
    this.datoAModificar = -1
    this.agregarEliTemp = false // Auxiliar "agregarMod"

    // Iniciador 
    this.iniciarEstructura(nombre)

    // Visualiza
    this.mostrarEnContenedor()
  }

  // ? Inicia contenedor y estructura
  iniciarEstructura (nombre) {
    
    // contenedor
    this.contenedor = document.getElementById(('contenedor'+this.nombre)) || null

    // tabla y cabecera (arriba tabla)
    this.cabecera = document.createElement('div')
    this.tabla = document.createElement('table')
    this.tabla.classList = "table table-striped"
    this.contenedor.prepend(this.tabla)
    this.contenedor.prepend(this.cabecera)

    // elementos Tabla
    this.thead = document.createElement('thead')
    this.tbody = document.createElement('tbody')
    this.tabla.prepend(this.tbody)
    this.tabla.prepend(this.thead)

    // Columna: si no se le paso nombre los obtiene del objeto
    if ( this.columnas.length == 0 ) {
      if (this.datos.length > 0) {
      this.columnas = Object.keys(this.datos[0])
      } else {
      this.columnas = []
      }
    }
  }

  // ? Funciones Auxiliares
  darInput(valor) {
    switch (typeof(valor)) {
      case 'string':
        return "text"
      default:
        return "text"
    }
  }

  // ? Visualización
  mostrarEnContenedor () {

    // ---- THEAD (CABECERA) ----

    let auxstring = `<tr>`
    // opcion: agregarID (columna)
    if (this.agregarID) { auxstring += `<th scope="col">ID</th>` }
    // Muestra el Resto de Titulo de Columnas
    this.columnas.forEach( (col) => {
      auxstring += `<th scope="col">${col}</th>`
    });
    // opcion: agregarMod (columna) MODIFICAR
    if (this.agregarMod) { auxstring += `<th scope="col"><i class='bx bx-edit-alt'></i></th>` }
    // opcion: agregarEli (columna) ELIMINAR
    if (this.agregarEli) { auxstring += `<th scope="col"><i class='bx bx-message-square-x'></i></th>` }

    // finaliza
    auxstring += `</tr>`
    this.thead.innerHTML = auxstring

    // ---- TBODY (CUEPO TABLA) ----

    auxstring = ""
    // revisa uno por uno los datos
    for (let i = 0; i < this.datos.length; i++) {
      auxstring += "<tr>"
      // opcion: agregarID (columna)
      if (this.agregarID) { auxstring += `<th scope="row">${i+1}</th>` } // opcion: agregarID
      // Verifica si debe mostra el dato o el input
      if (this.datoAModificar != i) {

        // ? ESTE CODIGO MUESTRA EL DATO
        // muestra valores
        const valores = Object.values(this.datos[i])
        for (let j = 0; j < valores.length; j++) {
          auxstring += `<td>${valores[j]}</td>`
        }
        // opcion: agregarMod (boton)
        if (this.agregarMod) {
          auxstring += `<td><button onclick="${this.instancia}.iniciaModificarDato(${i})"><i class='bx bx-edit-alt'></i></button></td>` }

        // opcion: agregarEli (columna) ELIMINAR
        if (this.agregarEli) {
          auxstring += `<td><button onclick="${this.instancia}.iniciaEliminarDato(${i})"><i class='bx bx-message-square-x'></i></button></td>` }

      } else {

        // ? ESTE CODIGO PERMITE MODIFICAR
        // muestra valores
        const valores = Object.values(this.datos[i])
        for (let j = 0; j < valores.length; j++) {
          auxstring += `<td><input type=${this.darInput(valores[j])} value=${valores[j]}></td>`
        }
        // opcion: agregarMod (boton)
        if (this.agregarMod) {
          auxstring += `<td><button onclick="${this.instancia}.modificarDato(${i})"><i class='bx bx-check'></i></i></button></td>` }
      }
      // finaliza
      auxstring += "</tr>"
    }
    this.tbody.innerHTML = auxstring
  }

  // ? Modificacion de Datos
  agregarDato(objeto) {
    this.datos.push(objeto)
    this.guadarDatos()
    this.mostrarEnContenedor()
  }
  iniciaModificarDato(i) {
    this.datoAModificar = i
    this.agregarEliTemp = this.agregarEli
    this.agregarEli = false
    this.mostrarEnContenedor()
  }
  modificarDato(i) {
    let inicio = this.agregarID == true ? 1 : 0 // determina de que columna empezar a ver
    let keys = Object.keys(this.datos[i]) // obtiene nombre de columnas
    let fin = keys.length-1+inicio // determina hasta que columna terminar de ver
    let datoI = this.datos[i] // obtiene el dato a modificar

    // le asigna el vaor del Input al dato a Modificar
    for (let j = inicio; j < fin+1; j++) {
      const input = this.tbody.children[i].children[j].children[0];
      datoI[keys[j-inicio]] = input.value;
    }

    this.datos[i] = datoI;
    this.datoAModificar = -1
    this.guadarDatos();
    this.agregarEli = this.agregarEliTemp
    this.mostrarEnContenedor();
  }

  // ? Eliminar Dato
  iniciaEliminarDato(i) {
    Swal.fire({
      title: '¿Estas seguro?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarDato(i)
      }
    })
  }
  eliminarDato(i) {
    this.datos.splice(i, 1)
    this.guadarDatos();
    this.mostrarEnContenedor();
  }

  // ? Guardar
  guardarClase() {
    localStorage.setItem(this.nombre+"xx", JSON.stringify(this))
  }
  guadarDatos() {
    localStorage.setItem(this.nombre, JSON.stringify(this.datos))
  }

  // Cosas que faltan hacer:
  // ? -> funcion ordenar
  // ? -> funcion filtrar
}