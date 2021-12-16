"use strict";
class LlamadaFuncion {
    constructor(valor, tipo, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.valor = valor;
        this.tipo = tipo;
    }
    interpretar(entorno, recolector) {
        return new Return(0, Tipo.INTEGER);
    }
}
