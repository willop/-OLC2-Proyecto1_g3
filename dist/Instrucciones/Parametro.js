"use strict";
class Parametro {
    constructor(id, tipo, auxtipo, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.id = id;
        this.auxtipo = auxtipo;
        this.tipo = tipo;
    }
    interpretar(entorno, recolector) {
        try {
            return this;
        }
        catch (e) {
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea, this.columna, "ERROR EN PARAMETRO FUNCION", entorno));
        }
    }
}
