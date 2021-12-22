"use strict";
class CrearStruct {
    constructor(id, tipo, atributos, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.id = id;
        this.atributos = atributos;
        this.tipo = tipo;
        this.obtenido = new AtributoStruct(0, null, null, 0, 0);
    }
    interpretar(entorno, recolector) {
        try {
            var auxiliaratributos = this.atributos;
            this.atributos = new Map();
            for (var i = 0; i < auxiliaratributos.length; i++) {
                auxiliaratributos[i].orden = i;
                this.atributos.set(auxiliaratributos[i].id, auxiliaratributos[i]);
            }
            entorno.guardarStruct(this);
        }
        catch (e) {
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea, this.columna, "ERROR EN CREAR STRUCT", entorno));
        }
    }
    BuscarPorOrden(a) {
        this.atributos.forEach((value, key) => {
            if (value.orden == a) {
                this.obtenido = value;
                return;
            }
        });
        return this.obtenido;
    }
}
