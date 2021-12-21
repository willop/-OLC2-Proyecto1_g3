"use strict";
class Entorno {
    constructor(prev, nombre, numero) {
        this.prev = prev;
        this.nombre = nombre;
        this.numero = numero;
        this.variables = new Map();
        this.funciones = new Map();
        this.estructuras = new Map();
    }
    GuardarSimbolo(valor, id, tipo, auxtipo = null) {
        var entactual = this;
        var nuevosimbolo = new Simbolo(valor, id, tipo, auxtipo);
        if (entactual.variables.has(id)) {
            throw new VariableYaDeclarada(0, 0, "LA VARIABLE " + id + " YA ESTA DECLARADA", this);
        }
        this.variables.set(id, nuevosimbolo);
    }
    ActualizarSimbolo(valor, id, tipo, auxtipo = null) {
        var entactual = this;
        var nuevosimbolo = new Simbolo(valor, id, tipo, auxtipo);
        while (entactual != null) {
            if (entactual.variables.has(id)) {
                entactual.variables.set(id, nuevosimbolo);
                return;
            }
            entactual = entactual.prev;
        }
        throw new VariableNoDeclarada(0, 0, "LA VARIABLE " + id + " NO ESTA DECLARADA", this);
    }
    ObtenerSimbolo(id) {
        var entactual = this;
        while (entactual != null) {
            if (entactual.variables.has(id)) {
                return entactual.variables.get(id);
            }
            entactual = entactual.prev;
        }
        return null;
    }
    guardarfuncion(funcion) {
        if (this.funciones.has(funcion.id)) {
            throw new FuncionYaDeclarada(0, 0, "FUNCION YA DECLARADA", this);
        }
        this.funciones.set(funcion.id, funcion);
    }
    obtenerfuncion(funcion) {
        var entactual = this;
        while (entactual != null) {
            if (entactual.funciones.has(funcion)) {
                return entactual.funciones.get(funcion);
            }
            entactual = entactual.prev;
        }
        return null;
    }
    guardarStruct(struct) {
        if (this.estructuras.has(struct.id)) {
            throw new StructYaDeclarado(0, 0, "STRUCT YA DECLARADO", this);
        }
        this.estructuras.set(struct.id, struct);
    }
    obtenerStruct(struct) {
        var entactual = this;
        while (entactual != null) {
            if (entactual.estructuras.has(struct)) {
                return entactual.estructuras.get(struct);
            }
            entactual = entactual.prev;
        }
        return null;
    }
    guardarVariableStruct(id, arreglo, tipo) {
        var entactual = this;
        var nuevosimbolo = new Simbolo(null, id, Tipo.STRUCT, tipo);
        nuevosimbolo.atributos = arreglo;
        if (entactual.variables.has(id)) {
            throw new VariableYaDeclarada(0, 0, "LA VARIABLE " + id + " YA ESTA DECLARADA", this);
        }
        this.variables.set(id, nuevosimbolo);
    }
    ActualizarSimboloStruct(valor, id, auxtipo) {
        var entactual = this;
        var nuevosimbolo = new Simbolo(null, id, Tipo.STRUCT, auxtipo);
        nuevosimbolo.atributos = valor;
        while (entactual != null) {
            if (entactual.variables.has(id)) {
                entactual.variables.set(id, nuevosimbolo);
                return;
            }
            entactual = entactual.prev;
        }
        throw new VariableNoDeclarada(0, 0, "LA VARIABLE " + id + " NO ESTA DECLARADA", this);
    }
}
