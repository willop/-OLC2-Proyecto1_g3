"use strict";
class Seno {
    constructor() {
        this.tipo = TipoAritmetica.COSENO;
    }
    seno(izquierda, derecha) {
        //IZQUIERDA CON INT Y SUS DERIVACIONES
        if (derecha.tipo == Tipo.INTEGER) {
            return this.senoEjecutar(izquierda, derecha);
        }
        else if (derecha.tipo == Tipo.DOUBLE) {
            return this.senoEjecutar(izquierda, derecha);
        }
        else if (derecha.tipo == Tipo.CHAR) {
            return this.senoEjecutar(izquierda, derecha);
        }
        else {
        }
    }
    // ------------ int + otros
    senoEjecutar(izquierda, derecha) {
        if (derecha.tipo == Tipo.CHAR) {
            derecha.valor = derecha.valor.charCodeAt(0);
            return new Return(Math.sin(derecha.valor), Tipo.DOUBLE);
        }
        else {
            return new Return(Math.sin(derecha.valor), Tipo.DOUBLE);
        }
    }
}
