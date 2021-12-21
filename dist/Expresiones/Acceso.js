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
        //console.log(new Return(a.valor,a.tipo,a.auxtipo));
        if (a instanceof Simbolo && a.valor == null) {
            return a;
        }
        return new Return(a.valor, a.tipo, a.auxtipo);
    }
}
