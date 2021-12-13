"use strict";
class Break {
    constructor(linea, columna) {
        this.linea = linea;
        this.columna = columna;
    }
    interpretar(entorno, recolector) {
        try {
            return new Return(null, Tipo.BRAKE);
        }
        catch (e) {
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea, this.columna, "ERROR EN BREAK", entorno));
        }
    }
}
