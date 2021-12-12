"use strict";
class Pow {
    constructor() {
        this.tipo = TipoAritmetica.POW;
    }
    pow(izquierda, derecha) {
        console.log("EL TIPO DE DERECHA afuera ES: " + Tipo[derecha.tipo]);
        if (izquierda.tipo == Tipo.BOOLEAN || izquierda.tipo == Tipo.STRING) {
            throw new ErrorOperacion(0, 0, "NO SE PUEDE ELEVAR " + Tipo[izquierda.tipo], null);
        }
        else {
            if (derecha.tipo == Tipo.STRING || derecha.tipo == Tipo.BOOLEAN) {
                throw new ErrorOperacion(0, 0, "NO SE PUEDE ELEVAR ENTEROS A " + Tipo[derecha.tipo], null);
            }
            else {
                return this.PowEjecutar(izquierda, derecha);
            }
        }
    }
    // ------------ int + otros
    PowEjecutar(izquierda, derecha) {
        if (izquierda.tipo == Tipo.CHAR) {
            izquierda.valor = izquierda.valor.charCodeAt(0);
            if (derecha.tipo == Tipo.CHAR) {
                derecha.valor = derecha.valor.charCodeAt(0);
                return new Return(Math.pow(izquierda.valor, derecha.valor), Tipo.DOUBLE);
            }
            else {
                return new Return(Math.pow(izquierda.valor, derecha.valor), Tipo.DOUBLE);
            }
        }
        else {
            if (derecha.tipo == Tipo.CHAR) {
                derecha.valor = derecha.valor.charCodeAt(0);
                return new Return(Math.pow(izquierda.valor, derecha.valor), Tipo.DOUBLE);
            }
            else {
                return new Return(Math.pow(izquierda.valor, derecha.valor), Tipo.DOUBLE);
            }
        }
    }
}
