"use strict";
class ExpComa {
    constructor(expresioniz, expresionder, linea, columna) {
        this.linea = linea;
        this.expresioniz = expresioniz;
        this.columna = columna;
        this.expresionder = expresionder;
    }
    interpretar(entorno, recolector) {
        //validacion de tipo
        //string o variable
        //si derecha es string                 /// string string --  string id            id string       id id
        if (this.expresionder.tipo == Tipo.STRING) {
            //izquierda string
            if (this.expresioniz.tipo == Tipo.STRING) {
                //console.log("string -- string");
                return new Return(this.expresioniz.valor.concat(this.expresionder.valor), Tipo.STRING);
                //izquierda variable
            }
            else if (this.expresioniz.id != null) {
                //console.log("id -- string");
                var variable = entorno.ObtenerSimbolo(this.expresioniz.id);
                return new Return(variable.valor.concat(this.expresionder.valor), Tipo.STRING);
            }
        } //
        else if (this.expresionder.id != null) {
            var variableder = entorno.ObtenerSimbolo(this.expresionder.id);
            //console.log("string -- id");
            if (this.expresioniz.tipo == Tipo.STRING) {
                return new Return(this.expresioniz.valor.concat(variableder.valor), Tipo.STRING);
            }
            else {
                //console.log("id -- id");
                var variableiz = entorno.ObtenerSimbolo(this.expresioniz.id);
                return new Return(variableiz.valor.concat(variableder.valor), Tipo.STRING);
            }
        }
        else {
            recolector.listaerrores.push(new ErrorOperacion(this.linea, this.columna, "TIPOS INCORRECTOS", entorno));
            return new Return("", Tipo.STRING);
        }
    }
}
