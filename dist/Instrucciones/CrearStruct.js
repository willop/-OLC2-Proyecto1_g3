"use strict";
class CrearStruct {
    constructor(id, tipo, atributos, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.id = id;
        this.atributos = atributos;
        this.tipo = tipo;
    }
    interpretar(entorno, recolector) {
        try {
            entorno.guardarStruct(this);
        }
        catch (e) {
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea, this.columna, "ERROR EN CREAR STRUCT", entorno));
        }
    }
}
