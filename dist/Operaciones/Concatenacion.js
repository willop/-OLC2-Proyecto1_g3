"use strict";
class Concatenacion {
    constructor(expresioniz, expresionder, linea, columna) {
        this.linea = linea;
        this.expresioniz = expresioniz;
        this.columna = columna;
        this.expresionder = expresionder;
    }
    interpretar(entorno, recolector) {
        var expresionder = this.expresionder.interpretar(entorno, recolector);
        console.log(this.expresionder);
        var expresioniz = this.expresioniz.interpretar(entorno, recolector);
        console.log(this.expresioniz);
        //validacion de tipo
        //string o variable
        //si derecha es string                 /// string string --  string id            id -- string       id -- id
        if (expresionder.tipo == Tipo.STRING || expresionder.tipo == Tipo.INTEGER || expresionder.tipo == Tipo.DOUBLE || expresionder.tipo == Tipo.CHAR || expresionder.tipo == Tipo.BOOLEAN) {
            //izquierda string
            if (expresioniz.tipo == Tipo.STRING || expresioniz.tipo == Tipo.INTEGER || expresioniz.tipo == Tipo.DOUBLE || expresioniz.tipo == Tipo.CHAR || expresioniz.tipo == Tipo.BOOLEAN) {
                //console.log("string -- string");`
                //console.log("string -- string: "+this.expresioniz.valor+" -- "+this.expresionder.valor)
                return new Return(expresioniz.valor.toString().concat(expresionder.valor.toString()), Tipo.STRING);
                //izquierda variable
            }
            else if (expresioniz.id != null) {
                //console.log("id -- string");
                //console.log("id -- string: "+this.expresioniz.valor+" -- "+this.expresionder.valor)
                var variable = entorno.ObtenerSimbolo(expresioniz.id);
                return new Return(variable.valor.concat(expresionder.valor), Tipo.STRING);
            }
        } //
        else if (expresionder.id != null) {
            var variableder = entorno.ObtenerSimbolo(expresionder.id);
            //console.log("string -- id");
            if (expresioniz.tipo == Tipo.STRING || expresioniz.tipo == Tipo.INTEGER || expresioniz.tipo == Tipo.DOUBLE || expresioniz.tipo == Tipo.CHAR || expresioniz.tipo == Tipo.BOOLEAN) {
                //console.log("string -- id: "+this.expresioniz.valor+" -- "+this.expresionder.valor)
                return new Return(expresioniz.valor.toString().concat(variableder.valor.toString()), Tipo.STRING);
            }
            else {
                //console.log("id -- id");
                //console.log("id -- id: "+this.expresioniz.valor+" -- "+this.expresionder.valor)
                var variableiz = entorno.ObtenerSimbolo(expresioniz.id);
                return new Return(variableiz.valor.toString().concat(variableder.valor.toString()), Tipo.STRING);
            }
        }
        else {
            recolector.listaerrores.push(new ErrorOperacion(this.linea, this.columna, "TIPOS INCORRECTOS", entorno));
            return new Return("", Tipo.STRING);
        }
    }
}
