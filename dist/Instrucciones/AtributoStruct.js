"use strict";
class AtributoStruct {
    constructor(id, tipo = null, auxtipo = null, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.id = id;
        this.tipo = tipo;
        this.auxtipo = auxtipo;
    }
    interpretar(entorno, recolector) {
        try {
            return this;
        }
        catch (e) {
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea, this.columna, "ERROR EN LISTA ATRIBUTOS STRUCTS", entorno));
        }
    }
}
