"use strict";
class Potencia {
    constructor(expresion, numpotencia, linea, columna) {
        this.linea = linea;
        this.numpotencia = numpotencia;
        this.columna = columna;
        this.expresion = expresion;
    }
    interpretar(entorno, recolector) {
        //validacion de tipo
        if (this.numpotencia.tipo == Tipo.INTEGER) {
            var re = "";
            for (var i = 0; i < this.numpotencia.valor; i++) {
                re += this.expresion.valor;
            }
            return new Return(re, Tipo.STRING);
        }
        else {
            recolector.listaerrores.push(new ErrorOperacion(this.linea, this.columna, "TIPOS INCORRECTOS", entorno));
            return new Return("", Tipo.STRING);
        }
    }
}
