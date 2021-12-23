"use strict";
class LlamadaFuncion {
    constructor(id, llamadaexpresion, parametros, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.id = id;
        this.llamadaexpresion = llamadaexpresion;
        this.parametros = parametros;
    }
    interpretar(entorno, recolector) {
        try {
            //validar que sea acceso para
            if (!(this.id instanceof Acceso)) {
                throw new ErrorGeneral(this.linea, this.columna, "ERROR NO ES UN ACCESO", entorno);
            }
            var nuevoid = this.id.id;
            //intentar obtener la funcion
            var funcion = entorno.obtenerfuncion(nuevoid);
            console.log("*********** LLAMADA FUNCION************");
            console.log(funcion);
            if (funcion != null) {
                console.log("this parametros length");
                console.log(this.parametros.length);
                console.log("funcionparametros length");
                console.log(funcion.parametros.length);
                if (this.parametros == null) {
                }
                if (this.parametros.length != funcion.parametros.length) {
                    throw new ErrorGeneral(this.linea, this.columna, "ERROR TAMAñO DE PARAMETROS", entorno);
                }
                var ent = new Entorno(entorno, nuevoid, entorno.numero + 1);
                for (var i = 0; i < funcion.parametros.length; i++) {
                    var valor = this.parametros[i].interpretar(entorno, recolector);
                    //console.log()
                    if (valor.tipo != Tipo.STRUCT) {
                        if (valor.tipo != funcion.parametros[i].tipo) {
                            throw new ErrorGeneral(this.linea, this.columna, "ERROR TIPO PARAMETROS", entorno);
                        }
                    }
                    else {
                        // AGREGAR VALIDACIONES DE TIPO STRUCT, VER LA CLASE ASIGNAR ATRIBUTO STRUCTS
                    }
                    if (valor.tipo == Tipo.STRUCT) {
                        var struct;
                        if (this.parametros[i] instanceof AccesoStruct) {
                            struct = valor;
                        }
                        else {
                            struct = entorno.ObtenerSimbolo(this.parametros[i].id);
                        }
                        ent.guardarVariableStruct(this.parametros[i].id, struct.atributos, valor.auxtipo);
                    }
                    else {
                        ent.GuardarSimbolo(valor.valor, funcion.parametros[i].id, valor.tipo);
                    }
                }
                //fin for
                var aux = funcion.instrucciones.interpretar(ent, recolector);
                if (aux != null) { // validas que tenga retorno
                    console.log(aux);
                    if (aux instanceof Return) { //que se de tipo retorno
                        if (aux.tipo == Tipo.CONTINUE) { //depende si es continue o break
                            throw new ErrorGeneral(this.linea, this.columna, "ERROR, CONTINUE NO CONSUMIDO", entorno);
                        }
                        else if (aux.tipo == Tipo.BRAKE) {
                            throw new ErrorGeneral(this.linea, this.columna, "ERROR BRAKE NO CONSUMIDO", entorno);
                        }
                        else {
                            return aux;
                        }
                    }
                    else if (aux["tipo"] == Tipo.RETURN) { //"tipo":Tipo.RETURN
                        var retor = aux["valor"];
                        if (retor.tipo == Tipo.NULL) {
                            if (this.llamadaexpresion) {
                                return new Literal(null, Tipo.NULL, this.linea, this.columna);
                            }
                            else {
                                return;
                            }
                        }
                        else {
                            if (this.llamadaexpresion) {
                                return retor;
                            }
                            else {
                                return;
                            }
                        }
                    }
                }
                else if (this.llamadaexpresion) {
                    return new Literal(null, Tipo.NULL, this.linea, this.columna);
                }
            }
            else {
                var getStruct = entorno.obtenerStruct(nuevoid);
                if (getStruct != null) {
                    if (this.parametros.length != getStruct.atributos.size) {
                        throw new ErrorGeneral(this.linea, this.columna, "ERROR TAMAñO DE PARAMETROS", entorno);
                    }
                    var atributos = new Map();
                    for (var i = 0; i < getStruct.atributos.size; i++) {
                        console.log("****************IMPRIMIENDO PARAMETROS***********");
                        console.log(this.parametros);
                        var valor = this.parametros[i].interpretar(entorno, recolector);
                        //console.log()
                        if (valor.tipo == Tipo.STRUCT && !(this.parametros[i] instanceof LlamadaFuncion)) {
                            valor = entorno.ObtenerSimbolo(this.parametros[i].id);
                        }
                        valor.auxtipo = getStruct.id;
                        atributos.set(getStruct.BuscarPorOrden(i).id, valor);
                    }
                    if (this.llamadaexpresion) {
                        return new Return(atributos, Tipo.STRUCT, nuevoid);
                    }
                    else {
                        return;
                    }
                }
                else {
                    throw new StructNoEncontrado(this.linea, this.columna, "EL FUNCION O STRUCT NO ENCONTRADO", this);
                }
            }
        }
        catch (e) {
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea, this.columna, "ERROR EN LLAMADA FUNCION", entorno));
        }
    }
}
