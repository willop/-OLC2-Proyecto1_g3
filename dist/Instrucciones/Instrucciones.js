"use strict";
class Instrucciones {
    constructor(instrucciones, linea, columna, nombre) {
        this.linea = linea;
        this.columna = columna;
        this.instrucciones = instrucciones;
        this.nombre = nombre;
    }
    interpretar(entorno, recolector) {
        try {
            var Nuevoentorno = new Entorno(entorno, this.nombre, entorno.numero + 1);
            for (var inst in this.instrucciones) {
                this.instrucciones[inst].interpretar(Nuevoentorno, recolector);
            }
        }
        catch (e) {
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea, this.columna, "ERROR EN LISTA DE INSTRUCCIONES", entorno));
        }
    }
}
