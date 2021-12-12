"use strict";
class Raiz {
    constructor() {
        this.tipo = TipoAritmetica.RAIZ;
    }
    raiz(izquierda, derecha) {
        if (derecha.tipo == Tipo.INTEGER) {
            return this.RaizEjecutar(izquierda, derecha);
        }
        else if (derecha.tipo == Tipo.DOUBLE) {
            return this.RaizEjecutar(izquierda, derecha);
        }
        else if (derecha.tipo == Tipo.CHAR) {
            return this.RaizEjecutar(izquierda, derecha);
        }
        else {
        }
    }
    // ------------ int + otros
    RaizEjecutar(izquierda, derecha) {
        if (derecha.tipo == Tipo.CHAR) {
            derecha.valor = derecha.valor.charCodeAt(0);
            return new Return(Math.sqrt(derecha.valor), Tipo.DOUBLE);
        }
        else {
            return new Return(Math.sqrt(derecha.valor), Tipo.DOUBLE);
        }
    }
}
