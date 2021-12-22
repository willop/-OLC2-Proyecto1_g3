"use strict";
class Print {
    constructor(expresion, linea, columna, lineanueva) {
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
        this.lineanueva = lineanueva;
    }
    interpretar(entorno, recolector) {
        try {
            //console.log("Print --- entorno")
            //console.log(entorno)
            //console.log("Print --- resultado")
            var resultado = this.expresion.interpretar(entorno, recolector);
            //console.log(resultado);
            //si el resultado es nulo
            var salida;
            var bandera = false;
            if (resultado.valor == null) {
                console.log("SI ES NULL");
                salida = "null";
            } //si no lo es 
            else {
                salida = resultado.valor;
                //console.log(resultado)
            }
            //inicio algoritmo para las cadenas
            if (resultado.tipo == Tipo.STRING) {
                var tam = salida.length;
                var expresion = "";
                var textosalida = "";
                for (var i = 0; i < tam; i++) {
                    expresion == "";
                    if (salida.charAt(i) == '$') {
                        i++;
                        if (salida.charAt(i) == "(") {
                            i++;
                        }
                        while (salida.charAt(i) != " ") {
                            if (salida.charAt(i) == ")" && (salida.charAt(i + 1) == " " || i + 1 == tam)) {
                                break;
                            }
                            else {
                                expresion += salida.charAt(i);
                                if (salida.charAt(i) == "[" || salida.charAt(i) == "]") {
                                    bandera = true;
                                }
                                if (i + 1 == tam) {
                                    break;
                                }
                                else {
                                    i++;
                                }
                            }
                        } //fin del while
                        console.log("DENTRO DE PRINT");
                        console.log(expresion);
                        console.log("saliendo del while con: " + expresion);
                        if (!bandera) {
                            if (!expresion.match(/[a-z]/i)) {
                                //es una operacion
                                console.log("Es una operacion");
                                var expresionvalor = eval(expresion);
                                textosalida += expresionvalor;
                            }
                            else {
                                console.log("Es una variable");
                                var expresionvalor = entorno.ObtenerSimbolo(expresion);
                                console.log(expresionvalor);
                                textosalida += expresionvalor.valor;
                            }
                        }
                        else {
                            console.log("es un array");
                            //indice -- id -- 
                            var indice = "";
                            var variable = "";
                            var resulta;
                            for (var j = 0; j < expresion.length; j++) {
                                if (expresion.charAt(j).match(/[a-z]/)) {
                                    variable += expresion.charAt(j);
                                }
                                if (expresion.charAt(j).match(/[0-9]/)) {
                                    indice += expresion.charAt(j);
                                }
                            }
                            resulta = new AccesoArray(new Literal(indice, Tipo.INTEGER, this.linea, this.columna), new Acceso(variable, this.linea, this.columna), this.linea, this.columna);
                            resulta = resulta.interpretar(entorno, recolector);
                            console.log(resulta.valor);
                            textosalida += resulta.valor.toString();
                            continue;
                        }
                    }
                    else {
                        textosalida += salida.charAt(i);
                    }
                }
                salida = textosalida.toString();
                //console.log("La salida es de: "+textosalida);
            }
            //fin del algoritmo
            if (this.lineanueva) {
                salida = "\n" + salida;
            }
            recolector.consola.push(salida);
        }
        catch (e) {
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea, this.columna, "ERROR EN PRINT", entorno));
        }
    }
}
