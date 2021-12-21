"use strict";
class Simbolo {
    constructor(valor, id, tipo, auxtipo = null, atributos = null) {
        this.valor = valor;
        this.id = id;
        this.tipo = tipo;
        this.auxtipo = auxtipo;
        this.atributos = new Map();
    }
}
