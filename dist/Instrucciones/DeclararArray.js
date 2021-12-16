"use strict";
class DeclararArray {
    constructor(id, expresiones, tipo, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.id = id;
        this.expresiones = expresiones;
        this.tipo = tipo;
    }
    interpretar(entorno, recolector) {
        try {
            var value = this.expresiones.interpretar(entorno, recolector);
            // IMPLICITAMENTE SABEMOS QUE ESTA CLASE ES TIPO ARRAY POR ESO SOLO SE VALIDA AUX TIPO
            if (this.tipo != value.auxtipo) {
                throw new TipoIncorrecto(this.linea, this.columna, "EL TIPO DECLARADO NO ES IGUAL AL TIPO ASIGNADO" + Tipo[value.tipo] + " " + Tipo[this.tipo], entorno);
            }
            entorno.GuardarSimbolo(value.valor, this.id, value.tipo, this.tipo);
        }
        catch (e) {
            console.log(e);
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea, this.columna, "ERROR EN DECLARACION ARRAY", entorno));
        }
    }
}
