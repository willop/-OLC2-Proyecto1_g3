import {Imprimir} from "./functions2.js"

//boton de importar 
document.querySelector('#File1').addEventListener('change', leerarchivo);


//variables globales
var TextoDeEdicion = "";

var editor = CodeMirror.fromTextArea
(document.getElementById('TextoEdicion'),{
    mode: "javascript",
    theme: "3024-night",
    lineNumbers: true
});
editor.setSize(578,955);
editor.on('change',function(asd) {
    TextoDeEdicion = asd.getValue();
    console.log(TextoDeEdicion);
})
editor.setValue("void main(){\nPrint();\n}");

            
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
    editor.setValue(_contenido);
    TextoDeEdicion = _contenido;
    elemento.value = _contenido;
}

//funcion para actualizar el contenido de la edicion 
function updateContent(e){
    TextoDeEdicion = editor.getvalue();
    alert(TextoDeEdicion);
}


document.getElementById('boton_Compilar').addEventListener('click', accionBoton);


function accionBoton(e){
    const otrotext = document.getElementById('textarea2');
    //TextoDeEdicion = editor.getValue();
    otrotext.innerHTML = TextoDeEdicion;
    Imprimir(TextoDeEdicion);
    console.log(TextoDeEdicion);
    alert(gramatica.parse(TextoDeEdicion));
}