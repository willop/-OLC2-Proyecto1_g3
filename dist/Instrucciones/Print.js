"use strict";
class Print {
    constructor(expresion, linea, columna, lineanueva) {
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
        this.lineanueva = lineanueva;
    }
    interpretar(entorno, recolector) {
        try {
            var resultado = this.expresion.interpretar(entorno, recolector);
            var salida = resultado.valor;
            if (this.lineanueva) {
                salida = salida + "\n";
            }
            //console.log(salida);
            //tipo sea string resultado
            recolector.consola.push(salida);
        }
        catch (e) {
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea, this.columna, "ERROR EN PRINT", entorno));
        }
    }
}
