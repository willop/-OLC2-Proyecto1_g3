"use strict";
class If {
    constructor(condicion, instrucciones, condicionelse, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.condicion = condicion;
        this.instrucciones = instrucciones;
        this.condicionelse = condicionelse;
    }
    interpretar(entorno, recolector) {
        try {
            var resultado = this.condicion.interpretar(entorno, recolector);
            console.log("El resultado de IF-------");
            console.log(resultado);
            if (resultado.tipo != Tipo.BOOLEAN) {
                throw new EIf(this.linea, this.columna, "ERROR TIPO INCORRECTO EN CONDICION", null);
            }
            if (resultado.valor) {
                return this.instrucciones.interpretar(entorno, recolector);
            }
            else if (this.condicionelse != null) {
                return this.condicionelse.interpretar(entorno, recolector);
            }
        }
        catch (e) {
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea, this.columna, "ERROR EN IF", entorno));
        }
    }
}
