"use strict";
class Asignacion {
    constructor(expresion, linea, columna, id) {
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
        this.id = id;
    }
    interpretar(entorno, recolector) {
        console.log("Hola desde asignacion viene con valores: id: " + this.id.id + " con expresion: ");
        console.log(this.expresion);
        try {
            var variable = entorno.ObtenerSimbolo(this.id.id);
            var valor = this.expresion.interpretar(entorno, recolector);
            console.log("--------Variable-------");
            console.log(variable);
            console.log("--------valor-------");
            console.log(valor);
            if (variable.tipo != valor.tipo) {
                throw new TipoIncorrecto(this.linea, this.columna, "EL TIPO ASIGNADO NO ES IGUAL AL TIPO DECLARADO" + Tipo[valor.tipo] + " " + Tipo[variable.tipo], entorno);
            }
            if (valor.tipo == Tipo.STRUCT) {
                if (valor instanceof Simbolo) {
                    entorno.ActualizarSimboloStruct(valor.atributos, this.id.id, variable.auxtipo);
                }
                else {
                    entorno.ActualizarSimboloStruct(valor.valor, this.id.id, variable.auxtipo);
                }
            }
            else {
                entorno.ActualizarSimbolo(valor.valor, this.id.id, variable.tipo);
            }
        }
        catch (e) {
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea, this.columna, "ERROR EN ASIGNACION", entorno));
        }
    }
}
