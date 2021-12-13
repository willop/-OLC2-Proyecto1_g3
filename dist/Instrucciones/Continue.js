"use strict";
class Continue {
    constructor(linea, columna) {
        this.linea = linea;
        this.columna = columna;
    }
    interpretar(entorno, recolector) {
        try {
            return new Return(null, Tipo.CONTINUE);
        }
        catch (e) {
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea, this.columna, "ERROR EN CONTINUE", entorno));
        }
    }
}
