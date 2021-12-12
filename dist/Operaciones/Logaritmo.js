"use strict";
class Logaritmo {
    constructor() {
        this.tipo = TipoAritmetica.LOGARITMO;
    }
    logaritmo(izquierda, derecha) {
        if (derecha.tipo == Tipo.INTEGER) {
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
}
