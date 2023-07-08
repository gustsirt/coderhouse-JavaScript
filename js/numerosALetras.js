/* variables
-------------------------------------------------- */
let numero = 0

/* FUNCION: verificar que se ingrese un numero
-------------------------------------------------- */
function ingresarNumbero()
{
  let num = 0

  do {
    num = prompt("Ingrese un numero")
    num = parseFloat(num)
  } while (isNaN(num))

  return num
}

/* FUNCION: con el numero verificado obtener el texto
-------------------------------------------------- */

// con el numero verificado obtener el texto
function numeroALetras (n){
  let resultado = ''
  let entero = Math.trunc(n)
  let centavos = Math.round(n*100)/100-entero
  console.log(entero);
  console.log(centavos);



  return resultado
}

// instancio funciones
numero = ingresarNumbero()
console.log(numero)
numero = numeroALetras(numero)
console.log(numero)