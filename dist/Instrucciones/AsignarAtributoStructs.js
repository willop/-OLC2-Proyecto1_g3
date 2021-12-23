"use strict";
class AsignarAtributoStructs {
    constructor(id, expresion, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.id = id;
        this.expresion = expresion;
    }
    interpretar(entorno, recolector) {
        try {
            console.log("ENTRANDO A ASIGNAR ATRIBUTO STRUCT");
            var variable;
            var valor = this.expresion.interpretar(entorno, recolector);
            if (valor.tipo == Tipo.STRUCT && !(this.expresion instanceof LlamadaFuncion)) {
                valor = entorno.ObtenerSimbolo(this.expresion.id);
            }
            if (this.id instanceof AccesoStruct) {
                this.id.AccesoPorAsignacion = true;
                variable = this.id.interpretar(entorno, recolector);
            }
            var auxtipo;
            var nombre;
            auxtipo = variable.auxtipo;
            nombre = variable.id;
            var getStruct = entorno.obtenerStruct(auxtipo);
            if (getStruct != null) {
                getStruct.atributos.forEach((value, key) => {
                    if (value.id == nombre) {
                        if (value.tipo != null) {
                            if (value.tipo != Tipo.STRUCT) {
                                if (value.tipo != valor.tipo) {
                                    throw new TipoIncorrecto(this.linea, this.columna, "EL TIPO ASIGNADO NO ES IGUAL AL TIPO DECLARADO " + Tipo[valor.tipo] + " " + Tipo[variable.tipo], entorno);
                                }
                            }
                            else {
                                if (value.auxtipo != valor.auxtipo) {
                                    throw new TipoIncorrecto(this.linea, this.columna, "EL TIPO ASIGNADO NO ES IGUAL AL TIPO DECLARADO " + Tipo[valor.tipo] + " " + Tipo[variable.tipo], entorno);
                                }
                            }
                        }
                        return;
                    }
                });
                if (valor.tipo == Tipo.STRUCT) {
                    if (this.id instanceof AccesoStruct) {
                        var aux = this.id.Variable;
                        console.log("ESTE ES ID ASIGNAR ATRIBUTO---");
                        console.log(this.id);
                        console.log(aux);
                        aux.atributos.set(this.id.atributo, valor);
                        console.log(aux);
                        console.log(valor);
                    }
                }
                else {
                    variable.valor = valor.valor;
                    variable.tipo = valor.tipo;
                }
            }
            else {
                throw new StructNoEncontrado(this.linea, this.columna, "EL STRUCT NO EXISTE", this);
            }
        }
        catch (e) {
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea, this.columna, "ERROR EN LISTA DE INSTRUCCIONES", entorno));
        }
    }
}
