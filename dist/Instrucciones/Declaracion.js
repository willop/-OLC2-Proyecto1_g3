"use strict";
class Declaracion {
    constructor(expresion, linea, columna, tipo, id) {
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
        this.tipo = tipo;
        this.id = id;
    }
    interpretar(entorno, recolector) {
        try {
            var valor = this.expresion.interpretar(entorno, recolector);
            if (this.tipo != valor.tipo) {
                throw new TipoIncorrecto(this.linea, this.columna, "EL TIPO DECLARADO NO ES IGUAL AL TIPO ASIGNADO" + Tipo[valor.tipo] + " " + Tipo[this.tipo], entorno);
            }
            entorno.GuardarSimbolo(valor.valor, this.id, this.tipo);
        }
        catch (e) {
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea, this.columna, "ERROR EN DECLARACION", entorno));
        }
    }
}
