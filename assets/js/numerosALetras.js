/* FUNCION: con el numero verificado obtener el texto
-------------------------------------------------- */
function numeroALetras (n, singular = "peso", plural = "pesos", centsing = "centavo", centplural = "centavos"){

  // ! FUNCIONES AUXILIARES:
  
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

  function trio (num, txt = '', sing = ' ', unionplural = ' ') {
    if( num == 0) {return txt}

    let resultado = ''
    if (num == 1) { return sing + txt }

    resultado = centenas(num)

    //console.log('res: '+resultado);
    return resultado + unionplural + txt
  } // fin trio

  // ! VARIABLES:
  
  const dat = {
    ent: Math.trunc(n), // parte entera
    dec: Math.round( ( (Math.round(n*100))/100 - Math.trunc(n) )*100 ), // parte decimal (solo 2 decimales)
    entlet: '', // parte entera en forma letras
    declet: '' // parte decimal en forma letras
  } // fin Variables
  // Auxiliares
  const datx = {
    num: 0,
    trio: 0,
    cc: 0,
    csing: "",
    cplur: "",
    resto: dat.ent
  } // fin Auxiliares

  // ! ESTRUCTUA:
  
  // que pasa si es 0
  if (n == 0) { return 'cero pesos'}

  // obtener parte entera (primero si es 1 luego calcula por trios de numeros)
  if (dat.ent == 1) { dat.entlet = ' '+singular } else { dat.entlet = plural } 
  while (datx.resto != 0) {
    datx.cc++
    datx.num = datx.resto
    datx.resto = Math.trunc(datx.num/1000)
    datx.trio = datx.num - datx.resto*1000
    switch (datx.cc){ // indica si es unidades, miles o millones 
      case 1:
        datx.csing = 'un '
        datx.cplur = ' '
        break
      case 2:
        datx.csing = ' mil '
        datx.cplur = ' mil '
        break
      case 3:
        datx.csing = ' un millon '
        datx.cplur = ' millones '
        break
    }
    dat.entlet = trio(datx.trio, dat.entlet, datx.csing, datx.cplur)
  }  // fin entero

  // obetner parte decimal
  if (dat.dec != 0) { 
    if (dat.dec == 1) { dat.declet = ' '+centsing } else { dat.declet = ' '+centplural }
    if (dat.ent > 0) { dat.entlet = dat.entlet + ' con '} else { dat.entlet = '' }
    dat.declet = decenas(dat.dec) + dat.declet
  }  // fin decimal

  // ! VALOR DE RETORNO
  return dat.entlet + dat.declet
}

