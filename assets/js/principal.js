// ? ***************** DATOS REQUERIDAD *****************
// Datos Cantidad - Monto - Destinatario - Fechas - Firmante -- Variables GetElementById
const datos = {
  cTotal: document.getElementById('cTotal'),
  cDesde: document.getElementById('cDesde'),
  cHasta: document.getElementById('cHasta'),
  mMonto: document.getElementById('mMonto'),
  dNombre: document.getElementById('dNombre'),
  fFecha: document.getElementById('fFecha'),
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

// ? ***************** FUNCIONES *****************
// funciones auxiliares
function darUltimoDia (año, mes) {
  return new Date(año, mes+1, 0).toISOString().split('T')[0]
}

// ? ***************** INICIADORES *****************
// Imput Date
const fechaHoy = new Date()
datos.fFecha.value = fechaHoy.toISOString().split('T')[0]
datos.fVenc.value = darUltimoDia(fechaHoy.getFullYear(), fechaHoy.getMonth())
actualizarModelo('fFecha')
actualizarModelo('fVenc')

// ? ***************** ACATUALIZAR MODELO *****************

function actualizarModelo(elemento) {
  // MODELO sin las excepciones (default)
  // mdatos[elemento].innerText = datos[elemento].value

  switch (elemento) {

    case "mMonto":
      mdatos["mMontol"].innerText = numeroALetras(datos[elemento].value); break;

    case "fFecha":
      let aux = datos["fFecha"].value
      aux = new Date(aux)
      aux.setDate(aux.getDate()+1)
      aux = aux.toLocaleDateString('es-ar', { weekday:"long", year:"numeric", month:"long", day:"numeric"})
      mdatos["fFecha"].innerText = aux
      break;

    case "fVenc":
      let aux2 = datos["fVenc"].value
      aux2 = new Date(aux2)
      aux2.setDate(aux2.getDate()+1)
      aux2 = aux2.toLocaleDateString('es-ar', {year:"numeric", month:"numeric", day:"numeric"})
      mdatos["fVenc"].innerText = aux2
      break;

    default:
      mdatos[elemento].innerText = datos[elemento].value; break;
  }
}