# Entrega FINAL para el curso de JavaScript de CoderHouse
## Alumno: Sirtori Gustavo

---

* Profesor: Alejandro Di Stefano
* Comisión: 55290 --- JavaScript
* Tutor: Marco Pérez

** Para poder Ingresar usuario: admin y pass: admin

---
```ssh
El trabajo consta de reemplazar una serie de planillas que diseñé para una empresa. Donde la misma vende sus productos (autos) en cuotas, las cuales deben ser cobradas, para eso: por un lado se crean los Pagares y por otro hay que hacer seguimiento de dichos cobros (esto solo funciona en Cordoba)
Se debe poder:
* Control de Usuarios para Ingresar
* Cargar Clientes
* Cargar Operaciones (asociadas a un cliente)
* Cargar y conrolar los Cobros (INCOMPLETO)
* Generar Pagares (de manera independiente porque la empresa desea conservar esta autonomia)
```
<p style="color: hotpink">IMPORTANTE! ----------------------------

<p style="color: hotpink"> <em>ESTA INCOMPLETO</em>
<p style="color: hotpink"> - NO LLEGUE A TERMINAR TODO EL PROYECTO - XQ ME LLEVO MAS TIEMPO DEL ESPERADO

<p style="color: hotpink"> NOTA: Se esta diseñando este codigo con el fin de reutilizarlo para proyectos mas profesionales posteriormente

### <p style="color: cyan"> ESTRUCTURA

- 1 - **Index** --> *Login*
- 2 - **Clientes** --> *tabla Clientes
- 3 - **Operaciones** --> *tabla Operaciones (relacionada a Clientes)*
- 4 - **Cobros** --> EN DESARROLLO !! *tabla Cobros (relacionada a Operaciones)*
- 5 - **Pagares** --> *Se establecerian al momento definir con el cliente como abonara su producto* - sin embargo se pidio conservar autonomia por ahora

FUNCIONES

- 0 - **Variables** --> Se declaran aqui todas la variables genericas
- 0 - **Clase Tabla API** --> Posee la definicion de la Clase TablaAPI
- 1 - **DOM** --> este Scrip crea por DOM: los metadatos del Head (correspondientes al SEO), todo el Header (incluido Usuario) y el Footer
- X - **Especificas** --> se tratara de estandirzar segun la función del Scrip

### <p style="color: yellow"> DETALLE DE LA ESTRUCTURA
<p style="color: yellow"> Al final de todo esta la definición de una clase quye gestiona todo el control por DOM de las Tablas - Mi idea es orientarla hacia una libreria para mi uso personal que muestra datos en tablas

---

### INDEX (login)
Se busca aqui que la persona se pueda loguear para poder tener los permisos de acceso.

El control de usuario esta definido en el DOM --> ***1-dom.js***<br>
Se complementa con codigo del login en --> ***4_1_index.js***<br> 


---

### CLIENTES (tabla)

Aqui se busca cargar los distintos Clientes que luego van a tener operaciones

* ***0_clase_tabla_API.js*** - *este codigo posee la clase que gestiona por DOM la Tabla*<br>
* ***4_2_cliente.js*** - *instancia la Clase*

<p style="color: orange">PENDIENTE: No deberia poder eliminar un cliente que tiene operaciones -- ver

---

### OPERACIONES (tabla)

Aqui se buscaria gestionar las operaciones:<br>
* ***0_clase_tabla_API.js*** - *este codigo posee la clase que gestiona por DOM la Tabla*<br>
* ***4_3_operaciones.js*** - *instancia la Clase*

<p style="color: hotpink"> AQUI ESTA LA PARTE INCOMPLETA, ME DEBERIA DAR ACCESO AL CONTROL DE COBROS Y MOSTRARME LOS TOTALES

---

### PAGARES (Pre entrega 2)

Esta pagina reemplaza un archivo excel para generar estos "documentos"

* ***numerosALetras.js*** - *PRE ENTRAGA 1 - función que transforma un numero en letras - esta funcion la tenia como una macro en excl y la volvi a escribir de Cero para practicar y me gustó el resultado*<br>
* ***pagare.js*** - *gestiona los pagares*

-- Tiene un precarga de datos en un modelo<br>
-- Y una funcion de imprimir: eso activa genera un scrip que generá los pagares secuenciales necesarios para imprimir, luego invoca la accion PRINT (donde por estilos solo muestro los pagares creados y oculto el resto)

---

### CLASE MAESTRA

## ***0_clase_tabla_APIl.js*** - *TablaAPI*

<p style="color: hotpink"> La clase recibe un (o dos) array de objetos por API y los muestra en una tabla en el html partiendo desde un contenedor. Dentro de la clase esta toda la gestion y manipulación de los datos

Consta de estas funciones Basicas:
* Iniciar Estructura (DOM)
* Obtener Datos
* Mostrar Datos
* Agregar Datos ( y preparar la sub estructura para agregar)
* Modificar Datos ( y prepararlos para la modificación)
* Eliminar Datos

Cada funcion basica puede estar subdidibida en otras para una mejor gestion de las mismas.

**En el CODIGO HTML se necesita que este definido esto:**

* `<section id="contenedorXXXX" class="claseTabla"></section>`

A continuacion detallo el Constructor: como parametro se pasa un objeto con los siguientes elementos

 * `instancia: 'instanica',`<br>
 OBLIGATORIO: se coloca el mismo nombre de la instancia

 * `nombre: 'nombre',`<br>
 OBLIGATORIO: nombre del contededor --> reemplaza las XXXX de "contenedorXXXX"

 * `apis: {`<br>
   ` - base: {`<br>
   ` - - url: "https://.../APIBASE",`<br>
   ` - - id: "col de referencia"`<br>
   ` - - }`<br>
   ` - },`<br>
  OBLIGATORIO: ubicacion de los Datos BASE de la tabla. El ID es la columna que hace de ID

 * `apis: {`<br>
   ` - adic: {`<br>
   ` - - url: "https://.../APIADIC",`<br>
   ` - - id: "col de referencia"`<br>
   ` - - }`<br>
   ` - },`<br>
  OPCIONAL: se puede agregar otra API adicional

 * `mapeoColumnas: [{}]`<br>
  OBLIGATORIO: arreglo de objetos que indica como se compone las columnas de la tabla. Ejemplo: `{ api:'base', key:'id', type: 'text', col:'ID' },`
  Tiene los siguientes elementos:<br>
  -- `api:'base'` -- Obligatorio -- indica de que API viene el dato<br>
  -- `key:'id'` -- Obligaorio -- el nombre de la Key de la columna<br>
  -- `keyid:'cliente'` -- Caso API NO BASE -- indica que columna tiene el ID que genera la dependecia<br>
  -- `type:'text'` -- Obligaorio -- tipo de dato admitidos (text, date, select)<br>
  -- `api2:'cli'` -- Caso Select -- indica sobre que API es el select<br>
  -- `key2:'dni'` -- Caso Select -- indica el Key de la Api2<br>
  -- `col:'ID'` -- Obligaorio -- Nombre que tomara la columna<br>
  -- `nsv:'true'` -- Opcional -- si se pone true oculta esta columna<br>
  -- `unico:'true'` -- Opcional -- si se pone true al momento de agregar datos esta valor debe ser unico

  ATRIBUTOS OPCIONALES
  * `.titulo.innerHTML="TITULO DE LA TABLA"`
  * `.agregarBot = true` --> agrega o oculta boton para agregar datos
  * `.agregarMod = true` --> agrega o oculta la columna con el boton para modificar el dato
  * `.agregarEli = true` --> agrega o oculta la columna Eliminar Fila
  * `.agregarLnk = true` --> agrega o oculta la columna con un link dinamico segun id renglon
  * `.link =""` --> en caso de marcar opcion anterior se debe pasar como dato la url del link (no funciona con index)

EJEMPLO CONSTRUCTOR:

`let operacionesAPI = new TablaAPI({`<br>
` - instancia: 'operacionesAPI',`<br>
` - nombre: 'bdope',`<br>
` - apis: {`<br>
` - - base: {`<br>
` - - - url: "https://64e161e950713530432d148d.mockapi.io/Operaciones",`<br>
` - - - id: "id"},`<br>
` - - cli: {`<br>
` - - - url: "https://64e161e950713530432d148d.mockapi.io/Clientes",`<br>
` - - - id: "dni"}`<br>
` - },`<br>
` - mapeoColumnas: [`<br>
` - - { api:'base', key:'id', type: 'text', col:'ID' },`<br>
` - - { api:'base', key:'fechaCarga', type: 'date', col:'Fecha de Carga', nsv:false },`<br>
` - - { api:'base', key:'cliente', type: 'select', col:'DNI', api2: 'cli', key2: 'dni'},`<br>
` - - { api:'cli', key:'nombre', type: 'text', col:'Nombre', keyid:'cliente'}, `<br>
` - -  { api:'cli', key:'celular', type: 'text', col:'Celular', keyid:'cliente'},`<br>
` - - { api:'base', key:'vehiculo',   ype: 'text', col:'Vehiculo'},`<br>
` - - { api:'base', key:'patente', type: 'text', col:'Patente', unico: true}`<br>
` - ]`<br>
`})`<br>
`operacionesAPI.titulo.innerHTML="Operaciones"`<br>