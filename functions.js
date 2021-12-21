import {Imprimir} from "./functions2.js"

//boton de importar 
document.querySelector('#File1').addEventListener('change', leerarchivo);


//variables globales
var TextoDeEdicion = "";
//editor de texto
var editor = CodeMirror.fromTextArea
(document.getElementById('TextoEdicion'),{
    mode: "javascript",
    theme: "3024-night",
    lineNumbers: true
});
editor.setSize(570,780);
editor.on('change',function(asd) {
    TextoDeEdicion = asd.getValue();
    //console.log(TextoDeEdicion);
})
editor.setValue("void main(){\nPrint(\"\");\n}");

//obtener textarea consolas
var consola = CodeMirror.fromTextArea
            (document.getElementById('textconsola'),{
                mode: "javascript",
                theme: "lucario",
                lineNumbers: true,
                readOnly: true
            });
consola.setSize(1200,300);    




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

document.getElementById('btnLimpiar').addEventListener('click',accionLimpiar);

function accionLimpiar(e){
    editor.setValue("");
}

document.getElementById('boton_Compilar').addEventListener('click', accionBoton);


function accionBoton(e){
    var recolector = new Recolector([],[]);
    var entorno = new Entorno(null);
    const otrotext = document.getElementById('textarea2');
    var salidaConsola="";
    //TextoDeEdicion = editor.getValue();
    otrotext.innerHTML = TextoDeEdicion;
    Imprimir(TextoDeEdicion);
    /*
    console.log("\n\n\n********************************************************\n********************************************************\n********************************************************\n Aca inicia el arbol");
    var recccc = recorrido.parse(TextoDeEdicion);
    console.log(recccc);
    var raiz = new recorrido_arbol;
    var graficaarbol = "digraph {\n"+  raiz.recorrer_arbol(recccc)+ "\n}";
    d3.select("#lienzo-ast").graphviz()
    .renderDot(graficaarbol);
*/
    var variable = gramatica.parse(TextoDeEdicion);
    console.log(variable);

    try{
        for(var inst = 0; inst < variable.length; inst++){
            console.log("Ejecutando instruccion ...")
            console.log(inst);
            //-----
            if(variable[inst] instanceof Array){
                console.log("Entra a if  array")
                for(var inst2 = 0; inst2 < variable[inst].length; inst++){
                    variable[inst][inst2].interpretar(entorno,recolector);
                }
                //variable[inst].interpretar(entorno,recolector);
            }else{
                    variable[inst].interpretar(entorno,recolector);   
            }     
            //sss
            
        }

    }catch(e){
        recolector.listaerrores.push(new ErrorGeneral(0,0,"ERROR EN EJECUCION GENERAL",null));

    }    

    for (var rec in recolector.consola){
        console.log(recolector.consola[rec]);
        salidaConsola += (recolector.consola[rec].toString());
    }

    salidaConsola += "\n \n ===== salida ===== \n"

    for (var rec in recolector.listaerrores){
        console.log("inicio impresion errores");
        console.log(recolector.listaerrores[rec]);
        console.log(recolector.listaerrores[rec].linea);
        console.log(recolector.listaerrores[rec].descripcion);
        console.log(recolector.listaerrores[rec].columna);
        console.log(TipoError[recolector.listaerrores[rec].tipo]);

        salidaConsola += (recolector.listaerrores[rec].toString()) +"\n";
        console.log("FIN impresion errores");
        document.getElementById("Tabla_errores").insertRow(-1).innerHTML = '<td>'+rec+'</td><td>'+TipoError[recolector.listaerrores[rec].tipo]+'</td><td>'+recolector.listaerrores[rec].descripcion+'</td><td>'+recolector.listaerrores[rec].linea+'</td><td>'+recolector.listaerrores[rec].columna+'</td>';
    }
    consola.setValue(salidaConsola);
    console.log(entorno.variables);
    console.log(entorno.funciones);
    
}