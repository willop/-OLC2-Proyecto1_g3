"use strict";
class Nodo_arbol {
    constructor(valor, tipo) {
        this.id = 0;
        this.valor = valor;
        this.tipo = tipo;
        this.hijos = [];
    }
    getValor() {
        this.valor;
    }
    sethijo(_hijo) {
        this.hijos.push(_hijo);
    }
}
