"use strict";
class DeclararStruct {
    constructor(id, tipo, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.id = id;
        this.tipo = tipo;
    }
    interpretar(entorno, recolector) {
        try {
            var getStruct = entorno.obtenerStruct(this.tipo);
            if (getStruct == null) {
                throw new StructNoEncontrado(this.linea, this.columna, "ERROR EN DECLARAR STRUCT, NO ENCONTRADO ", entorno);
            }
            var arreglo = new Map();
            getStruct.atributos.forEach((value, key) => {
                var valor = new Literal(null, Tipo.NULL, this.linea, this.columna).interpretar(entorno, recolector);
                arreglo.set(key, valor);
            });
            entorno.guardarVariableStruct(this.id, arreglo, this.tipo);
        }
        catch (e) {
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea, this.columna, "ERROR EN DECLARAR STRUCTS", entorno));
        }
    }
}
