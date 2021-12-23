"use strict";
class Igualdad {
    constructor() {
        this.tipo = TipoRelacional.IGUALDAD;
    }
    igualdad(izquierda, derecha) {
        //IGUALACION IZQUIERDA INT VS DERECHA
        var izq = izquierda.valor;
        var der = derecha.valor;
        if (izquierda.tipo == Tipo.STRUCT) {
            izq = izquierda.atributos;
        }
        if (derecha.tipo == Tipo.STRUCT) {
            der = derecha.atributos;
        }
        return new Return(izq == der, Tipo.BOOLEAN);
    }
}
