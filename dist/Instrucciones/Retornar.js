"use strict";
class Retornar {
    constructor(expresion, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
    }
    interpretar(entorno, recolector) {
        try {
            if (this.expresion != null) {
                var exp = this.expresion.interpretar(entorno, recolector);
                if (exp.tipo == Tipo.STRUCT && !(this.expresion instanceof LlamadaFuncion)) {
                    exp = entorno.ObtenerSimbolo(this.expresion.id);
                }
                return {
                    "valor": exp,
                    "tipo": Tipo.RETURN
                };
            }
            else {
                return {
                    "valor": new Literal(null, Tipo.NULL, this.linea, this.columna),
                    "tipo": Tipo.RETURN
                };
            }
        }
        catch (e) {
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea, this.columna, "ERROR EN RETORNAR", entorno));
        }
    }
}
