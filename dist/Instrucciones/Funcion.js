"use strict";
class Funcion {
    constructor(tipo, id, parametros, instrucciones, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.id = id;
        this.tipo = tipo;
        this.parametros = parametros;
        this.instrucciones = instrucciones;
    }
    interpretar(entorno, recolector) {
        try {
            entorno.guardarfuncion(this);
        }
        catch (e) {
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea, this.columna, "ERROR EN FUNCION", entorno));
        }
    }
}
