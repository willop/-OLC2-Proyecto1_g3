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
                console.log(this.instrucciones[inst][inst]);
                if (typeof this.instrucciones[inst][0] === 'undefined') {
                    var aux = this.instrucciones[inst].interpretar(Nuevoentorno, recolector);
                    if (aux != null) {
                        return aux;
                    }
                }
                else {
                    for (var inst2 in this.instrucciones[inst]) {
                        var aux = this.instrucciones[inst][inst2].interpretar(Nuevoentorno, recolector);
                        if (aux != null) {
                            return aux;
                        }
                    }
                }
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
