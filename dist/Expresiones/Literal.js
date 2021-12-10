"use strict";
class Literal {
    constructor(valor, tipo, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.valor = valor;
        this.tipo = tipo;
    }
    interpretar(entorno, recolector) {
        return new Return(this.valor, this.tipo);
    }
}
