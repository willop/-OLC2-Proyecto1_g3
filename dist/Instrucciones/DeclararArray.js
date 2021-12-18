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
            if (this.expresiones == null) {
                //console.log("entonces aca tambien entras?");
                entorno.GuardarSimbolo(null, this.id, this.tipo, this.tipo);
            }
            var value = this.expresiones.interpretar(entorno, recolector);
            if (!(this.expresiones instanceof ConstruirArray) && !(this.expresiones instanceof LlamadaFuncion)) {
                if (value.tipo != Tipo.ARRAY) {
                    throw new TipoIncorrecto(this.linea, this.columna, "ERROR EN DECLARACION - VALOR NO ES UN ARRAY " + Tipo[value.tipo] + " " + Tipo[this.tipo], entorno);
                }
                //throw new TipoIncorrecto(this.linea,this.columna,"ERROR EN DECLARACION - VALOR NO ES UN ARRAY" + Tipo[value.tipo] +" "+ Tipo[this.tipo],entorno);
            }
            // IMPLICITAMENTE SABEMOS QUE ESTA CLASE ES TIPO ARRAY POR ESO SOLO SE VALIDA AUX TIPO
            //console.log("el tipo: "+this.tipo +"  y auxtipo: "+value.tipo);
            /*if(this.tipo != value.auxtipo){
                
                throw new TipoIncorrecto(this.linea,this.columna,"EL TIPO DECLARADO NO ES IGUAL AL TIPO ASIGNADO" + Tipo[value.tipo] +" "+ Tipo[this.tipo],entorno);

            }*/
            entorno.GuardarSimbolo(value.valor, this.id, value.tipo, this.tipo);
        }
        catch (e) {
            console.log(e);
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea, this.columna, "ERROR EN DECLARACION ARRAY", entorno));
        }
    }
}
