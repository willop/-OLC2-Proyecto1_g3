"use strict";
class ExpComa {
    constructor(expresioniz, expresionder, linea, columna) {
        this.linea = linea;
        this.expresioniz = expresioniz;
        this.columna = columna;
        this.expresionder = expresionder;
    }
    interpretar(entorno, recolector) {
        console.log("-----Expresion derecha ----");
        var expresionder = this.expresionder.interpretar(entorno, recolector);
        console.log(expresionder);
        console.log(this.expresionder);
        console.log("-----Expresion izquierda ----");
        var expresioniz = this.expresioniz.interpretar(entorno, recolector);
        console.log(expresioniz);
        console.log(this.expresioniz);
        var aux;
        //derecha es arreglo
        if (expresionder.tipo == Tipo.ARRAY) {
            aux = "[";
            console.log("se entro a array");
            for (var i = 0; i < expresionder.valor.length; i++) {
                aux += expresionder.valor[i].valor;
                if (!(i < expresionder.valor.length - 1)) {
                }
                else {
                    aux += ",";
                }
            }
            aux += "]";
            expresionder.tipo = Tipo.STRING;
            expresionder.valor = aux;
        }
        else if (expresioniz.tipo == Tipo.ARRAY) {
            aux = "[";
            console.log("se entro a array");
            for (var i = 0; i < expresioniz.valor.length; i++) {
                aux += expresioniz.valor[i].valor;
                if (!(i < expresioniz.valor.length - 1)) {
                }
                else {
                    aux += ",";
                }
            }
            aux += "]";
            expresioniz.tipo = Tipo.STRING;
            expresioniz.valor = aux;
        }
        console.log("imprimiendocada arreglo");
        console.log(expresionder);
        console.log(expresioniz);
        //validacion de tipo
        //string o variable
        //si derecha es string                 /// string string --  string id            id -- string       id -- id
        if (expresionder.tipo == Tipo.STRING || expresionder.tipo == Tipo.INTEGER || expresionder.tipo == Tipo.DOUBLE || expresionder.tipo == Tipo.CHAR || expresionder.tipo == Tipo.BOOLEAN) {
            //izquierda string
            if (expresioniz.tipo == Tipo.STRING || expresioniz.tipo == Tipo.INTEGER || expresioniz.tipo == Tipo.DOUBLE || expresioniz.tipo == Tipo.CHAR || expresioniz.tipo == Tipo.BOOLEAN) {
                console.log("entra con izquierda boleana " + expresioniz.tipo + " y con valor: " + expresioniz.valor);
                //console.log("string -- string");`
                //console.log("string -- string: "+this.expresioniz.valor+" -- "+this.expresionder.valor)
                return new Return(String(expresioniz.valor).concat(String(expresionder.valor)), Tipo.STRING);
                //izquierda variable
            }
            else if (expresioniz.id != null) {
                //console.log("id -- string");
                //console.log("id -- string: "+this.expresioniz.valor+" -- "+this.expresionder.valor)
                var variable = entorno.ObtenerSimbolo(expresioniz.id);
                return new Return(String(variable.valor).concat(String(expresionder.valor)), Tipo.STRING);
            }
        } //
        else if (expresionder.id != null) {
            var variableder = entorno.ObtenerSimbolo(expresionder.id);
            //console.log("string -- id");
            if (expresioniz.tipo == Tipo.STRING || expresioniz.tipo == Tipo.INTEGER || expresioniz.tipo == Tipo.DOUBLE || expresioniz.tipo == Tipo.CHAR || expresioniz.tipo == Tipo.BOOLEAN) {
                //console.log("string -- id: "+this.expresioniz.valor+" -- "+this.expresionder.valor)
                return new Return(String(expresioniz.valor).concat(String(variableder.valor)), Tipo.STRING);
            }
            else {
                //console.log("id -- id");
                //console.log("id -- id: "+this.expresioniz.valor+" -- "+this.expresionder.valor)
                var variableiz = entorno.ObtenerSimbolo(expresioniz.id);
                return new Return(String(variableiz.valor).concat(String(variableder.valor)), Tipo.STRING);
            }
        }
        else {
            recolector.listaerrores.push(new ErrorOperacion(this.linea, this.columna, "TIPOS INCORRECTOS " + this.expresioniz.tipo + " - " + this.expresionder.tipo, entorno));
            return new Return("", Tipo.STRING);
        }
    }
}
