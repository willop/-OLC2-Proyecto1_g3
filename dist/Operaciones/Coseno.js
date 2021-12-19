"use strict";
class Coseno {
    constructor() {
        this.tipo = TipoAritmetica.COSENO;
    }
    coseno(izquierda, derecha) {
        //IZQUIERDA CON INT Y SUS DERIVACIONES
        if (derecha.tipo == Tipo.ARRAY) {
            return this.cosenoEjecutarArreglo(izquierda, derecha);
        }
        else if (derecha.tipo == Tipo.INTEGER) {
            return this.cosenoEjecutar(izquierda, derecha);
        }
        else if (derecha.tipo == Tipo.DOUBLE) {
            return this.cosenoEjecutar(izquierda, derecha);
        }
        else if (derecha.tipo == Tipo.CHAR) {
            return this.cosenoEjecutar(izquierda, derecha);
        }
        else {
        }
    }
    // ------------ int + otros
    cosenoEjecutar(izquierda, derecha) {
        if (derecha.tipo == Tipo.CHAR) {
            derecha.valor = derecha.valor.charCodeAt(0);
            return new Return(Math.cos(derecha.valor), Tipo.DOUBLE);
        }
        else {
            return new Return(Math.cos(derecha.valor), Tipo.DOUBLE);
        }
    }
    cosenoEjecutarArreglo(izquierda, derecha) {
        var nuevoArreglo = [];
        for (var i = 0; i < derecha.valor.length; i++) {
            nuevoArreglo[i] = Math.cos(derecha.valor[i].valor);
        }
        return new Return(nuevoArreglo, Tipo.INTEGER);
    }
}
