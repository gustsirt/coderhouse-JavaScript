/* variables
-------------------------------------------------- */
let numero = 0

/* FUNCION: verificar que se ingrese un numero
-------------------------------------------------- */
function ingresarNumero()
{
  let num = 0

  do {
    num = prompt("Ingrese un numero positivo (max 999.999.999)")
    num = parseFloat(num)
  } while (isNaN(num) || num > 999999999 || num < 0)

  return num
}

/* FUNCIONES AUXILIARES:
-------------------------------------------------- */
function unidades (num, union = '') {
  switch (num) {
    case 0: return ''
    case 1: return union + 'un'
    case 2: return union + 'dos'
    case 3: return union + 'tres'
    case 4: return union + 'cuatro'
    case 5: return union + 'cinco'
    case 6: return union + 'seis'
    case 7: return union + 'siete'
    case 8: return union + 'ocho'
    case 9: return union + 'nueve'
  }
} // fin unidades() = union + "texto"

function decenas (num) {
  let dec = Math.trunc(num/10)
  let uni = num - dec*10

  if (num == 0) {return ''}

  switch (dec) {
    case 1: switch (uni) {
      case 0: return 'diez'
      case 1: return 'once'
      case 2: return 'doce'
      case 3: return 'trece'
      case 4: return 'catorce'
      case 5: return 'quince'
      default: return 'dieci'+unidades(uni)
    }
    case 2: if(uni == 0) {return 'veinte'
    } else { return 'venti'+unidades(uni)}
    case 3: return 'treinta'  + unidades(uni, ' y ')
    case 4: return 'cuarenta' + unidades(uni, ' y ')
    case 5: return 'cincuenta'+ unidades(uni, ' y ')
    case 6: return 'sesenta'  + unidades(uni, ' y ')
    case 7: return 'setenta'  + unidades(uni, ' y ')
    case 8: return 'ochenta'  + unidades(uni, ' y ')
    case 9: return 'noventa'  + unidades(uni, ' y ')
    case 0: return unidades(uni)
  }
} // fin decenas() = "texto" + unidades (union " y ")

function centenas (num) {
  let cent = Math.trunc(num/100)
  let resto = num - cent*100
  let union = ' '
  if(resto == 0){ union = ''}

  switch (cent) {
    case 1: if (resto == 0){return 'cien'
      } else { return 'ciento'    + union + decenas(resto) }
    case 2: return 'doscientos'   + union + decenas(resto)
    case 3: return 'trescientos'  + union + decenas(resto)
    case 4: return 'cuatrocientos'+ union + decenas(resto)
    case 5: return 'quinientos'   + union + decenas(resto)
    case 6: return 'seiscientos'  + union + decenas(resto)
    case 7: return 'setecientos'  + union + decenas(resto)
    case 8: return 'ochocientos'  + union + decenas(resto)
    case 9: return 'novecientos'  + union + decenas(resto)
    case 0: return decenas(resto)
  }
} // fin centenas() = "texto " + decenas(resto)


function trio (num, cc = 1, txt = '') {

  if( num === 0) {return txt}

  let resto = Math.trunc(num/1000)
  let trio = num - resto*1000

  txt = centenas(trio)

  console.log('trio '+trio);
  console.log('resto '+resto);
  console.log('cc '+cc);

  return txt
}

/* FUNCION: con el numero verificado obtener el texto
-------------------------------------------------- */
// con el numero verificado obtener el texto
function numeroALetras (n, singular = "peso", plural = "pesos", centsing = "centavo", centplural = "centavos"){
  // primero defino las variables
  let ent = Math.trunc(n) // parte entera
  let dec = Math.round( ( Math.round(n*100)/100 - ent )*100 ) // parte decimal (solo 2 decimales)
  let entlet = ''
  let declet = ''

  // obtener parte entera
  if (ent == 1) { entlet = ' '+singular } else { entlet = ' '+plural }
  entlet = trio(ent) + entlet
  // fin entero

  // obtner parte decimal
  if (dec == 1) { declet = ' '+centsing } else { declet = ' '+centplural }
  if (ent > 0) { entlet = entlet + ' con '} else { entlet = '' }
  declet = decenas(dec) + declet
  // fin decimal

  return entlet + declet
}

// instancio funciones
numero = ingresarNumero()
console.log('INIC: '+numero)
numero = numeroALetras(numero)
console.log('FIN: '+numero)