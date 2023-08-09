# Tercer pre entrega para el curso de JavaScript de CoderHouse
## Alumno: Sirtori Gustavo

---

* Profesor: Alejandro Di Stefano
* Comisión: 55290 --- JavaScript
* Tutor: Marco Pérez

---
```ssh
El trabajo consta de reemplazar una serie de planillas que diseñé para una empresa. Donde la misma vende sus productos (autos) en cuotas, las cuales deben ser cobradas, para eso: por un lado se crean los Pagares y por otro hay que hacer seguimiento de dichos cobros (esto solo funciona en Cordoba)
```

<p style="color: hotpink"> NOTA: este trabajo esta muy incompleto pero cumple los estandarés para la 3ra entrega y es muy probable que se valla actualizando con nuevas funcionalidades

### <p style="color: cyan"> ESTRUCTURA

- 1 - **Index** --> *Login*
- 2 - **Clientes** --> *tabla Clientes
- 3 - **Operaciones (en desarollo)** --> *tabla Operaciones (relacionada a Clientes)*
- 4 - **Pagares (pre entrega 2)** --> *Se establecerian al momento definir con el cliente como abonara su producto*
- 5 - Funciones extras o genericas

### <p style="color: yellow"> DETALLE DE LA ESTRUCTURA

---

### INDEX (login)
Se busca aqui que la persona se pueda loguear para poder tener los permisos de acceso.

<p style="color: orange">PENDIENTE: No existe boton para desloguearse. Este debria borrar todos los datos almacenados (usuario, clientes, operaciones)

* ***Usuario.js***

Se usa el archivo para el login.<br>
-- Pre define usuarios aceptados en un array de objetos (_solo index_)<br>
-- Al cargar la pagina: se fija si esta logueado previamente, si esta muestra el nombre y sino esta: oculta el nav y como yapa, te manda al index (que no anda en github por eso esta comentada, pero el codigo esta bien, verificado con CoderAsk) (_se aplica a todas las paginas_)<br>
-- Por ultimo tienela funcion del evento del login, donde el usuario se loguea y guarda el dato el localstorage (_solo index_)

<p style="color: hotpink"> Esta es la primer pagina que hice, y me quedó desprolija, debería separar: <> codigo login (solo index) <> codigo verificar usuario (todas las paginas)

---

### CLIENTES (tabla)

Aqui se busca cargar los distintos Clientes que luego van a tener operaciones

* ***clientes.js*** - *este codigo carga los datos de los clientes en todas las paginas - donde este este script*<br>
* ***clientes_agr.js*** - *sirve para gestionar los clientes (solo clientes.html)*

Permite:<br>
-- Mostrarlos: en la tabla de abajo - esta funcion refresca la tabla (se usa mucho)<br>
-- Agregar uno: verifica que no este ya creado<br>
-- Modificarlos: al hacerlo desabilita crearlos, se hace en 2 pasos (porque no me quise complicar mucho)<br>
-- Eliminarlos: si ya se esta modificando, este boton no hace nada (si muestra advertencia)<br>
-- Guardarlos: en el localstorage<br>
-- Cargarlos: Esto se hcae con el scrip *clientes.js*

<p style="color: orange">PENDIENTE: No deberia poder eliminar un cliente que tiene operaciones -- ver

---

### OPERACIONES (tabla)

Aqui se buscaria gestionar las operaciones:<br>
-- Cargarlas<br>
-- Generar Pagares (esto largaria la pagina Pagare-- esta parte hay que plenarla)<br>
-- Recibir Pagos<br>
-- Calcular las operaciones financieras corespondientes (interes, mora, totales, saldos, etc)

<p style="color: hotpink"> Al terminar la tabla anterior y empezar la siguiente me empecé a preguntar ¿por qué hacer todas las funciones de nuevo? No seria mas facil hacer una clase y ya? .. y cuando empeze a definir la clase pensé... No deberia haber una libreria de esto? - la libreria me ayudaria a mostrar todo rapido y concentrarme en los datos que es donde esta la acción. -- Y AQUI ME QUEDÉ, AHORA BUSCANDO INFO DE ESAS LIBRERIAS

---

### PAGARES (Pre entrega 2)

Esta pagina reemplaza un archivo excel para generar estos "documentos"

* ***numerosALetras.js*** - *PRE ENTRAGA 1 - función que transforma un numero en letras - esta funcion la tenia como una macro en excl y la volvi a escribir de Cero para practicar y me gustó el resultado*<br>
* ***pagare.js*** - *gestiona los pagares*

-- Tiene un precarga de datos en un modelo<br>
-- Y una funcion de imprimir: eso activa genera un scrip que generá los pagares secuenciales necesarios para imprimir, luego invoca la accion PRINT (donde por estilos solo muestro los pagares creados y oculto el resto)

---

### EXTRAS

* ***principal.js*** - *el proposito de este scrip era centralizar todas las codigos que aplcian a TODOS los documentos*

* CASO 1: Año en el footer del Copyright