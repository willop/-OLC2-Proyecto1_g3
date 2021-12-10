"use strict";
class Acceso {
    constructor(id, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.id = id;
    }
    interpretar(entorno, recolector) {
        var a = entorno.ObtenerSimbolo(this.id);
        if (a == null) {
            throw new VariableNoDeclarada(this.linea, this.columna, "LA VARIABLE " + this.id + " NO ESTA DECLARADA", entorno);
        }
        return new Return(a.valor, a.tipo);
    }
}