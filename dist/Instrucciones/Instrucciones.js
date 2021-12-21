"use strict";
class Instrucciones {
    constructor(instrucciones, linea, columna, nombre, crearentorno = true) {
        this.linea = linea;
        this.columna = columna;
        this.instrucciones = instrucciones;
        this.nombre = nombre;
        this.crearentorno = crearentorno;
    }
    interpretar(entorno, recolector) {
        try {
            var Nuevoentorno = this.crearentorno ? new Entorno(entorno, this.nombre, entorno.numero + 1) : entorno;
            for (var inst in this.instrucciones) {
                console.log("FOR INSTRUCCIONES");
                console.log(this.instrucciones[inst]);
                var aux = this.instrucciones[inst].interpretar(Nuevoentorno, recolector);
                if (aux != null) {
                    return aux;
                }
            }
        }
        catch (e) {
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea, this.columna, "ERROR EN LISTA DE INSTRUCCIONES", entorno));
        }
    }
}
