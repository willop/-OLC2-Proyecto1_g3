"use strict";
class DoWhile {
    constructor(condiciondowhile, instrucciones, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.condiciondowhile = condiciondowhile;
        this.instrucciones = instrucciones;
    }
    interpretar(entorno, recolector) {
        try {
            var resultado = this.condiciondowhile.interpretar(entorno, recolector);
            if (resultado.tipo != Tipo.BOOLEAN) {
                throw new EWHILE(this.linea, this.columna, "ERROR TIPO INCORRECTO EN CONDICION", null);
            }
            else {
                do {
                    console.log("Ejecutando el  Do while " + resultado.valor);
                    this.instrucciones.interpretar(entorno, recolector);
                    resultado = this.condiciondowhile.interpretar(entorno, recolector);
                } while (resultado.valor);
            }
        }
        catch (e) {
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea, this.columna, "ERROR EN DOWHILE", entorno));
        }
    }
}
