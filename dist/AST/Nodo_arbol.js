"use strict";
class Nodo_arbol {
    constructor(valor, tipo) {
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
