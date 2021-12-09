"use strict";
class Print {
    constructor(expresion, linea, columna, lineanueva) {
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
        this.lineanueva = lineanueva;
    }
    interpretar(recolector) {
        var resultado = this.expresion.interpretar(recolector);
        var salida = resultado.valor;
        if (this.lineanueva) {
            salida = salida + "\n";
        }
        //console.log(salida);
        //tipo sea string resultado
        recolector.consola.push(salida);
    }
}
