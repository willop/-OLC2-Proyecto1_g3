import {Imprimir} from "./functions2.js"

//boton de importar 
document.querySelector('#File1').addEventListener('change', leerarchivo);

document.getElementById('TextoEdicion').addEventListener('change',updateContent,false);

//variables globales
var TextoDeEdicion = "";
//const parser = require('./gramatica.js');


//funcion para leer archivos
function leerarchivo(e) {
    const archivo = e.target.files[0];
    if(!archivo) {
        return;
    }
    console.log('Se hizo click')
    const lector = new FileReader();
        lector.onload = function(e) {
            const contenido = e.target.result;
            mostrarcontenido(contenido);
        };
    lector.readAsText(archivo);
}

//funcion para mostrar el contenido en el textbox
function mostrarcontenido(_contenido) {
    const elemento = document.getElementById('TextoEdicion');
    TextoDeEdicion = _contenido;
    elemento.value = _contenido;
}

//funcion para actualizar el contenido de la edicion 
function updateContent(e){
    TextoDeEdicion = document.getElementById('TextoEdicion').value;
    //console.log(TextoDeEdicion);
}


document.getElementById('boton_Compilar').addEventListener('click', accionBoton);


function accionBoton(e){
    Imprimir("Hola mundo desde functions");
    const otrotext = document.getElementById('textarea2');
    otrotext.innerHTML = TextoDeEdicion;
    console.log(TextoDeEdicion);
    gramatica.parse(TextoDeEdicion);
}
