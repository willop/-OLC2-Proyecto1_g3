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
            console.log("como viene la expresion: " + this.expresion.id);
            if (this.expresion.id != null) {
                console.log("Es una variable");
                var variable = entorno.ObtenerSimbolo(this.expresion.id);
                console.log("Se obtuvo: " + variable.valor);
                for (var i = 0; i < this.numpotencia.valor; i++) {
                    re += variable.valor;
                }
            }
            else {
                console.log("Es un string");
                for (var i = 0; i < this.numpotencia.valor; i++) {
                    re += this.expresion.valor;
                }
            }
            return new Return(re, Tipo.STRING);
        }
        else {
            recolector.listaerrores.push(new ErrorOperacion(this.linea, this.columna, "TIPOS INCORRECTOS", entorno));
            return new Return("", Tipo.STRING);
        }
    }
}
