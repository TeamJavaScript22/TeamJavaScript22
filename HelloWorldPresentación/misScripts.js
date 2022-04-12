/*Variables*/

/*se puede declara variables a traves de tres tipos de 
palabras, que son let, const y var.
Las variables tienen un alcance segun donde se definan
que puede ser global y se puede accerder desde cualquier
parte y local que es cuando se defien dentro de una función,
donde solo se puede acceder desde dentro de la función*/

/*Variable constante*/
const saludo = "HELLO WORLD";

/*Funciones*/

/*Una funcion en JavaScript se declara usando la palabra
clave function, seguida del nombre de la funcion y un par
de parentesis, en los cuales se define la lista de parmetros
separados por "," o se puede usar sin ningun parametro*/

function PopUp(){

    /*Se basa en la notación de objetos mediante la notación
    objeto.propertyName. Un propiedad puede ser una variable
    o una función*/
    var fecha = new Date(Date.now());
    fecha = fecha.toLocaleDateString();
    /*alert es una funció popUp que muestra un mensaje.
    En el mensaje se utilizo una plantilla literal,
    pero se puede tambien utilizar concatenación de
    cadenas*/
    alert(`${saludo}. Hoy es: ${fecha}`);

}