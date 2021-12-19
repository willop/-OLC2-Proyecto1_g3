"use strict";
class Logaritmo {
    constructor() {
        this.tipo = TipoAritmetica.LOGARITMO;
    }
    logaritmo(izquierda, derecha) {
        if (derecha.tipo == Tipo.ARRAY) {
            return this.LogaritmoEjecutarArreglo(izquierda, derecha);
        }
        else if (derecha.tipo == Tipo.INTEGER) {
            return this.LogaritmoEjecutar(izquierda, derecha);
        }
        else if (derecha.tipo == Tipo.DOUBLE) {
            return this.LogaritmoEjecutar(izquierda, derecha);
        }
        else if (derecha.tipo == Tipo.CHAR) {
            return this.LogaritmoEjecutar(izquierda, derecha);
        }
        else {
        }
    }
    // ------------ int + otros
    LogaritmoEjecutar(izquierda, derecha) {
        if (derecha.tipo == Tipo.CHAR) {
            derecha.valor = derecha.valor.charCodeAt(0);
            return new Return(Math.log10(derecha.valor), Tipo.DOUBLE);
        }
        else {
            return new Return(Math.log10(derecha.valor), Tipo.DOUBLE);
        }
    }
    LogaritmoEjecutarArreglo(izquierda, derecha) {
        var nuevoArreglo = [];
        for (var i = 0; i < derecha.valor.length; i++) {
            nuevoArreglo[i] = Math.log10(derecha.valor[i].valor);
        }
        return new Return(nuevoArreglo, Tipo.INTEGER);
    }
}
