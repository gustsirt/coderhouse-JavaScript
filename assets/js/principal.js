// ? ***************** DATOS REQUERIDAD *****************
// Datos Cantidad - Monto - Destinatario - Fechas - Firmante -- Variables GetElementById
const datos = {
  cTotal: document.getElementById('cTotal'),
  cDesde: document.getElementById('cDesde'),
  cHasta: document.getElementById('cHasta'),
  mMonto: document.getElementById('mMonto'),
  dNombre: document.getElementById('dNombre'),
  fFecha: document.getElementById('fFecha'),
  fDia: document.getElementById('fDia'),
  fVenc: document.getElementById('fVenc'),
  fFirmante: document.getElementById('fFirmante'),
  fDni: document.getElementById('fDni'),
  fDireccion: document.getElementById('fDireccion'),
  fTelefono: document.getElementById('fTelefono')
}

// MODELO (con un "m" al inicio) -- Variables GetElementById
const mdatos = {
  cTotal: document.getElementById('mcTotal'),
  cDesde: document.getElementById('mcDesde'),
  cHasta: document.getElementById('mcHasta'),
  mMonto: document.getElementById('mmMonto'),
  mMontol: document.getElementById('mmMontol'),
  dNombre: document.getElementById('mdNombre'),
  fFecha: document.getElementById('mfFecha'),
  fVenc: document.getElementById('mfVenc'),
  fFirmante: document.getElementById('mfFirmante'),
  fDni: document.getElementById('mfDni'),
  fDireccion: document.getElementById('mfDireccion'),
  fTelefono: document.getElementById('mfTelefono')
}

// Estructura Generador
const pagare = []

// Contenedor
const contenedor = document.getElementById('contenedor')

// ? ***************** FUNCIONES *****************
// funciones auxiliares

function crearFecha(vfecha) {
  vfecha = new Date(vfecha)
  vfecha.setDate(vfecha.getDate() + 1)
  return vfecha
} //devuelve una fecha nueva (sin error 1 dia menos)

function darFecha(fecha, modificador = 0){
  // Ingresa: Sun Jul 30 2023 10:38:48 GMT-0300 (hora estándar de Argentina)
  const year = fecha.getFullYear()
  const month = String(fecha.getMonth() + 1).padStart(2, '0')
  const day = String(fecha.getDate() + modificador).padStart(2, '0')
  return `${year}-${month}-${day}` // Resultado: 2023-07-30
} //para obtener el formato "YYYY-MM-DD"

function darFechaCorta(fecha){
  // Thu Aug 10 2023 21:00:00 GMT-0300 (hora estándar de Argentina)
  // Resultado: 10/08/2023
  return fecha.toLocaleDateString('es-AR', { year: 'numeric', month: '2-digit', day: '2-digit' })
} //para obtener el formato "DD-MM-YYYY"

function darFechaLarga(fecha) {
  // Ingresa: Sat Jul 29 2023 21:00:00 GMT-0300 (hora estándar de Argentina)
  // Resultado: sábado, 29 de julio de 2023
  return fecha.toLocaleDateString('es-ar', { weekday:"long", year:"numeric", month:"long", day:"numeric"})
} //para obtener el formato "dddd, DD de mmm de YYYY"

function darVencimiento(fecha, diavenc) {
  // Ingresan: 2023-07-29 y 10
  const fecha2 = new Date(fecha)
  mes = fecha2.getMonth()
  año = fecha2.getFullYear()
  if (diavenc < fecha2.getDate) {
    if(mes == 11){
      mes = 0}
    else{
      mes++
    }
  }
  // resultado: 2023-08-10
  return darFecha(new Date(año, mes, diavenc))
} // genera fecha Vencimiento posterior segun el día

// ? ***************** INICIADORES *****************
// Inicio las fechas a partir de fechaHoy
const fechaHoy = new Date()
datos.fFecha.value = darFecha(fechaHoy)
datos.fFecha.innerText = darFecha(fechaHoy)
actualizarModelo('fFecha')
datos.fVenc.value = darVencimiento(datos.fFecha.value,datos.fDia.value)
datos.fVenc.innerText = darVencimiento(datos.fFecha.value,datos.fDia.value)
actualizarModelo('fVenc')

// ? ***************** ACTUALIZAR MODELO *****************
// TODO revisar la validacion de valores negativos y extraños
function actualizarModelo(elemento) {
  // MODELO sin las excepciones (default)
  // mdatos[elemento].innerText = datos[elemento].value

  switch (elemento) {

    case "mMonto":
      mdatos["mMontol"].innerText = numeroALetras(datos[elemento].value);
      break;

    case "fFecha":
      const nuevaFecha = new Date(datos["fFecha"].value);
      mdatos["fFecha"].innerText = darFechaLarga(nuevaFecha);
      datos["fFecha"].value = darFecha(nuevaFecha);
      break;

    case "fVenc":
      let xfVenc = crearFecha(datos.fVenc.value)

      // actualiza modelo
      mdatos.fVenc.value = darFecha(xfVenc)
      mdatos.fVenc.innerText = darFechaCorta(xfVenc)

      // asigna el Numero Dia Vencimiento
      datos.fDia.value = xfVenc.getDate()
      datos.fDia.innerText = xfVenc.getDate()
      break;

    case "fDia":
      datos.fVenc.value = darVencimiento(datos.fFecha.value,datos.fDia.value)
      actualizarModelo('fVenc')
      break;

    case "cTotal":
      // si modifico Total puedo tener que modificar Hasta
      if((parseInt(datos["cTotal"].value)-1) == parseInt(datos["cHasta"].value)) {
        mdatos["cTotal"].innerText = datos["cTotal"].value;
        datos["cHasta"].value = datos["cTotal"].value;
        datos["cHasta"].innerText = datos["cTotal"].value;
      } else {
        mdatos["cTotal"].innerText = datos["cTotal"].value;
      }

    case "cHasta":
      // si modifico Hasta puedo tener que modificar Total
      if(parseInt(datos["cHasta"].value) > parseInt(datos["cTotal"].value)) {
        datos["cHasta"].value = datos["cTotal"].value;
        datos["cHasta"].innerText = datos["cTotal"].value;
      }
      break;

    default:
      mdatos[elemento].innerText = datos[elemento].value; break;
  }
}

// ? ***************** GENERADOR *****************
function generador(){
  pagare.length = 0 // vacia array

  // calcula: sábado, 29 de julio de 2023
  const nuevaFecha = darFechaLarga(crearFecha(datos["fFecha"].value));

  // fecha referencia para ir cambiando meses
  afVencRef = crearFecha(datos.fVenc.value) // debe variar
  // darFechaCorta(afVencRef) -- calcula: 10/8/2023 pero se lo hace en el ciclo

  // genera arreglo datos
  for (let i = parseInt(datos.cDesde.value); i <= parseInt(datos.cHasta.value); i++) {
    pagare.push({
      cTotal: datos['cTotal'].value,
      cDesde: i, // varia segun pagare
      mMonto: datos['mMonto'].value,
      mMontol: numeroALetras(datos['mMonto'].value),
      dNombre: adNombre = datos['dNombre'].value,
      fFecha: nuevaFecha,
      fVenc: darFechaCorta(afVencRef), // varia - cada pagare aumenta 1 mes
      fFirmante: datos['fFirmante'].value,
      fDni: datos['fDni'].value,
      fDireccion: datos['fDireccion'].value,
      fTelefono: datos['fTelefono'].value
    })

    // al termianr varia Fecha Vencimiento un mes
    afVencRef.setMonth(afVencRef.getMonth()+1)
  }

  let ahtmlmodelo = `` // ${hoja}

  // Arma el Pagare
  pagare.forEach( (hoja) => {
    ahtmlmodelo += `
    <div class="modelo">
      <div class="modeloint">
        <div class="arriba">
          <div class="renglon1">
            <p>Pagare Nº <span id="mcDesde">${hoja.cDesde}</span>
              de <span id="mcTotal">${hoja.cTotal}</span></p>
            <p>Vence el <span id="mfVenc">${hoja.fVenc}</span></p>
          </div>
          <div class="renglon2"> <!-- POR: $ 50.000,00 -->
            <p><strong>POR:</strong> $ <span id="mmMonto">${hoja.mMonto}</span></p>
          </div>
        </div>
        <div class="medio">
          <p>CORDOBA <span id="mfFecha">${hoja.fFecha}</span> <strong>PAGARÉ SIN PROTESTO</strong> (art. 50 D. Ley 5965/63) al señor <span id="mdNombre">${hoja.dNombre}</span> a su orden la cantidad de <span id="mmMontol">${hoja.mMontol}</span></p>
        </div>
        <div class="abajo">
          <ul class="listalabel">
            <li>Firma: </li>
            <li>Firmante: </li>
            <li>DNI: </li>
            <li>Dirección: </li>
            <li>Teléfono: </li>
          </ul>
          <ul class="listadatos">
            <li><span>...................................................... </span></li>
            <li><span id="mfFirmante">${hoja.fFirmante}</span></li>
            <li><span id="mfDni">${hoja.fDni}</span></li>
            <li><span id="mfDireccion">${hoja.fDireccion}/span></li>
            <li><span id="mfTelefono">${hoja.fTelefono}</span></li>
          </ul>
        </div>
      </div>
    </div> <!-- fin modelo -->
    `
  } )
  
  return ahtmlmodelo
}

// ? ***************** IMPRIMIR PAGARE *****************
// se deja por fuera por si se necesita realizar tareas previas a imprimir
function imprimir() {
  const htmlmodelo = generador()
  contenedor.innerHTML = htmlmodelo
  window.print()
}