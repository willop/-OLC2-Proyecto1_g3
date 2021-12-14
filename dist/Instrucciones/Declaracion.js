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
            console.log("esta entrando aca declaracion? " + this.id + " tipo: " + this.tipo + " exp: " + this.expresion);
            //si viene expresion nula
            if (this.expresion == null) {
                console.log("entonces aca tambien entras?");
                entorno.GuardarSimbolo(null, this.id, this.tipo);
            } //si la expresion tiene un valor
            else {
                var valor = this.expresion.interpretar(entorno, recolector);
                if (this.tipo != valor.tipo) {
                    throw new TipoIncorrecto(this.linea, this.columna, "EL TIPO DECLARADO NO ES IGUAL AL TIPO ASIGNADO" + Tipo[valor.tipo] + " " + Tipo[this.tipo], entorno);
                }
                entorno.GuardarSimbolo(valor.valor, this.id, this.tipo);
            }
        }
        catch (e) {
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea, this.columna, "ERROR EN DECLARACION", entorno));
        }
    }
}
