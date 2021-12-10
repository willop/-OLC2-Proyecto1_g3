"use strict";
class Entorno {
    constructor(prev, nombre, numero) {
        this.funciones = {};
        this.estructuras = {};
        this.prev = prev;
        this.nombre = nombre;
        this.numero = numero;
        this.variables = new Map();
    }
    GuardarSimbolo(valor, id, tipo) {
        var entactual = this;
        var nuevosimbolo = new Simbolo(valor, id, tipo);
        if (entactual.variables.has(id)) {
            throw new VariableYaDeclarada(0, 0, "LA VARIABLE " + id + " YA ESTA DECLARADA", this);
        }
        this.variables.set(id, nuevosimbolo);
    }
    ActualizarSimbolo(valor, id, tipo) {
        var entactual = this;
        var nuevosimbolo = new Simbolo(valor, id, tipo);
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
}
