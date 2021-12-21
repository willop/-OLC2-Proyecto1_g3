"use strict";
class AccesoStruct {
    //ID puede ser acceso o acceso array 
    constructor(atributo, id, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.atributo = atributo;
        this.id = id;
        this.AccesoPorAsignacion = false;
        this.Variable = null;
    }
    interpretar(entorno, recolector) {
        try {
            var variable;
            if (this.id instanceof AccesoStruct) {
                if (this.AccesoPorAsignacion) {
                    this.id.AccesoPorAsignacion = true;
                }
                variable = this.id.interpretar(entorno, recolector);
            }
            else {
                variable = entorno.ObtenerSimbolo(this.id.id);
            }
            if (variable.atributos.has(this.atributo)) {
                if (this.AccesoPorAsignacion) {
                    this.Variable = variable;
                }
                return variable.atributos.get(this.atributo);
            }
            else {
                throw new AtributoNoExiste(this.linea, this.columna, "ATRIBUTO NO EXISTE", this);
            }
        }
        catch (e) {
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea, this.columna, "ERROR EN ACCESO STRUCT", entorno));
        }
    }
}
