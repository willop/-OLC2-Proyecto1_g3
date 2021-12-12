"use strict";
class While {
    constructor(condicionwhile, instrucciones, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.condicionwhile = condicionwhile;
        this.instrucciones = instrucciones;
    }
    interpretar(entorno, recolector) {
        try {
            var resultado = this.condicionwhile.interpretar(entorno, recolector);
            if (resultado.tipo != Tipo.BOOLEAN) {
                throw new EWHILE(this.linea, this.columna, "ERROR TIPO INCORRECTO EN CONDICION", null);
            }
            else {
                while (resultado.valor) {
                    console.log("Ejecutando el while " + resultado.valor);
                    this.instrucciones.interpretar(entorno, recolector);
                    resultado = this.condicionwhile.interpretar(entorno, recolector);
                }
            }
        }
        catch (e) {
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea, this.columna, "ERROR EN WHILE", entorno));
        }
    }
}