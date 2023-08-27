// TODO CLASE TABLA -------------------
// esta CLASE toma un objetos como datos y debe mostrar una tabla con dichos objetos como filas
class TablaAPI {
  constructor (data) {
    /* Objeto que recibe = {
      instancia: "",
      nombre: "",
      datosAPI: {},
      mapeoColumnas: {},
      idErrores: ""
    }*/
    // ? Datos base
    this.instancia = data.instancia

    this.nombre = data.nombre || ""// ID del contedor, se usa para localstorage y contenedor
    this.datosAPI = data.datosAPI || {} // url de los datos
    this.datos = "" // objeto
    this.idErrores = document.getElementById(data.idErrores) || false

    this.mapeoColumnas = data.mapeoColumnas || {} // mapeo de columnas con su Nombre en API y Ordenadas para mostrar
    this.columnas = [] // nombre de columnas
    this.keys = [] // nombre de keys API (ordenadas segun mapeo de columnas)

    this.agregarID = false // le agrega la columna ID a la tabla
    this.agregarMod = true // le agrega la columna con el boton para modificar el dato
    this.agregarEli = true // le agrega la columna Eliminar Fila
    this.datoAModificar = -1

    
    // Iniciador (inicia estructura -> busca datos -> inicia Columnas -> Visualiza)
    this.iniciarEstructura(data.nombre)
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
    
    // obtiene datos y columnas
    this.obtenerDatos()
  }

  // ? INICIADORAS DE DATOS
  // datos
  obtenerDatos() {
    fetch(this.datosAPI.base)
      .then((res) => res.json())
      .then((datos) => {
        this.datos = datos
        this.obtenerColumnas()
      })
      .catch((error) => console.info(error))
  }
  // Columnas: si no se le paso nombre los obtiene del objeto
  obtenerColumnas() {
    if ( this.mapeoColumnas.length == 0 ) {
      // NO existe mapeo -> lo hace con los datos
      if (this.datos.length > 0) {
        this.columnas = Object.keys(this.datos[0])
        this.keys = Object.keys(this.datos[0])
      } else {
        this.columnas = []
        this.keys = []
      }

    } else { // SI existe mapeo (orden) -> inicia columnas y keys
      this.keys = Object.keys(this.mapeoColumnas);
      
      this.keys.forEach( (key) => {
        this.columnas.push(this.mapeoColumnas[key]);
      })
    }
    // Visualiza
    this.mostrarEnContenedor()
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
      if ( col != "." ) { auxstring += `<th scope="col">${col}</th>` }
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
    
    // CICLO FOR (datos): Recorre uno por uno cada dato mostrando lo que corresponde
    for (let i = 0; i < this.datos.length; i++) {

      auxstring += "<tr>"
      // opcion: agregarID (columna)
      if (this.agregarID) { auxstring += `<th scope="row">${i+1}</th>` } // opcion: agregarID

      // ! Verifica si debe mostra el dato o el input
      if (this.datoAModificar != i) {

        // ? ESTE CODIGO MUESTRA EL DATO
        // muestra valores -> en this.columnas --> si es "." no se muestra
        for (let j = 0; j < this.keys.length; j++) {
          if( this.mapeoColumnas[this.keys[j]] != "." ) {
              //auxstring += `<td>${valores[j]}</td>`
            auxstring += `<td>${this.datos[i][this.keys[j]]}</td>`
          }
        }

        // opcion: agregarMod (boton)
        if (this.agregarMod) {
          auxstring += `<td><button onclick="${this.instancia}.iniciaModificarDato(${i})"><i class='bx bx-edit-alt'></i></button></td>` }

        // opcion: agregarEli (columna) ELIMINAR
        if (this.agregarEli) {
          auxstring += `<td><button onclick="${this.instancia}.iniciaEliminarDato(${i})"><i class='bx bx-message-square-x'></i></button></td>` }

      } else { // falta hacer
        /*
        // ? ESTE CODIGO PERMITE MODIFICAR
        // muestra valores
        const valores = Object.values(this.datos[i])
        for (let j = 0; j < valores.length; j++) {
          auxstring += `<td><input type=${this.darInput(valores[j])} value=${valores[j]}></td>`
        }
        // opcion: agregarMod (boton)
        if (this.agregarMod) {
          auxstring += `<td><button onclick="${this.instancia}.modificarDato(${i})"><i class='bx bx-check'></i></i></button></td>` }*/
      }
      // finaliza
      auxstring += "</tr>"
    }
    this.tbody.innerHTML = auxstring

    this.verDatos()
  }

  verDatos(){
    console.log(this.keys);
    console.log(this.columnas);
    console.log(this.datos); } // esta en mostrarEnContenedor

/*
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
  */
  // Cosas que faltan hacer:
  // ? -> funcion ordenar
  // ? -> funcion filtrar
}




