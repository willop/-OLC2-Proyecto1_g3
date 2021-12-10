"use strict";
class Potencia {
    constructor() {
        this.tipo = TipoAritmetica.POTENCIA;
    }
    potencia(izquierda, derecha) {
        if (izquierda.tipo == Tipo.INTEGER) {
            if (derecha.tipo == Tipo.INTEGER) {
                //si son enteros
                return this.funcionPotencia(izquierda, derecha);
            }
        }
    }
    funcionPotencia(izquieda, derecha) {
    }
}
