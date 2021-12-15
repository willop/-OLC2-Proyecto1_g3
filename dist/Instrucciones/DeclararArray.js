"use strict";
class DeclararArray {
    constructor(id, expresiones, scope, tipo, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.id = id;
        this.scope = scope;
        this.expresiones = expresiones;
    }
    interpretar(entorno, recolector) {
        try {
            var value = this.expresiones.interpretar(entorno, recolector);
        }
        catch (e) {
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea, this.columna, "ERROR EN DECLARACION ARRAY", entorno));
        }
    }
}
