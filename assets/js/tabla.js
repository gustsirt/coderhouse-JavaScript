class Tabla {
  constructor(marco, datos=[], modificar=true, eliminar=true){
    this.marco = document.getElementById(marco)
    this.datos = datos
    this.modificar = modificar
    this.eliminar = eliminar
  }
  // Atributos:
  cabecera = []
  cuerpo =  []
  pie = []
  
  // Metodos:
  mostrarla() {
    let html = `` //contenedor html
    let cabecera = []
    let cuerpo =  []

    
    datClientes.tabla.innerHTML = html
  }

}

// ESTO SE PASARA A UN NUEVO ARCHIVO
const operaciones = new Tabla ("porta-tabla")
/*operaciones.datos.push({
  fecha: new Date(),
  modelo: "PEUGEOT 3008",
  dominio: "NID975"
})*/
console.log(operaciones.datos.length);
console.log(Object.keys(operaciones.datos[0]));