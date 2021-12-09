"use strict";
class Sumar {
    constructor() {
        this.tipo = TipoAritmetica.SUMA;
    }
    sumar(izquierda, derecha) {
        if (izquierda.tipo == Tipo.INTEGER) {
            if (derecha.tipo == Tipo.INTEGER) {
                //r
                return this.sumarintint(izquierda, derecha);
            }
        }
    }
    sumarintint(izquierda, derecha) {
        //console.log("dentro de sumarintint");
        return new Return(izquierda.valor + derecha.valor, Tipo.INTEGER);
    }
}
