"use strict";
class Desigualdad {
    constructor() {
        this.tipo = TipoRelacional.DESIGUALDAD;
    }
    desigualdad(izquierda, derecha) {
        var izq = izquierda.valor;
        var der = derecha.valor;
        if (izquierda.tipo == Tipo.STRUCT) {
            izq = izquierda.atributos;
        }
        if (derecha.tipo == Tipo.STRUCT) {
            der = derecha.atributos;
        }
        return new Return(izq != der, Tipo.BOOLEAN);
    }
}
