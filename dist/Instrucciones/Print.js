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
            var salida;
            var resultado = this.expresion.interpretar(entorno, recolector);
            var bandera = false;
            if (resultado.valor == null) {
                salida = "null";
            }
            else {
                salida = resultado.valor;
            }
            //inicio algoritmo para las cadenas
            console.log("EL TIPO DE LO QUE IMPRIME ES:");
            console.log(resultado);
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
                        if (!bandera) {
                            if (!expresion.match(/[a-z]/i)) {
                                var expresionvalor = eval(expresion);
                                textosalida += expresionvalor;
                            }
                            else {
                                var expresionvalor = entorno.ObtenerSimbolo(expresion);
                                textosalida += expresionvalor.valor;
                            }
                        }
                        else {
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
                            textosalida += resulta.valor.toString();
                            continue;
                        }
                    }
                    else {
                        textosalida += salida.charAt(i);
                    }
                }
                salida = textosalida.toString();
            }
            else if (resultado.tipo == Tipo.ARRAY) {
                console.log("ES UN ARREGLO");
                if (this.expresion instanceof Acceso) {
                    var ex = this.expresion.interpretar(entorno, recolector);
                    salida = "";
                    for (var i = 0; i < ex.valor.length; i++) {
                        salida += ex.valor[i].valor;
                    }
                }
            }
            else if (resultado.tipo == Tipo.STRUCT) {
                console.log("ACÁ ENTRAMOS SI VIENE UN STRUCT EN EL PRINT");
            }
            else {
                console.log("dentro del else en el print");
                var exp = this.expresion.interpretar(entorno, recolector);
                console.log(exp);
                //var ve = entorno.ObtenerSimbolo(ex.id);
                console.log("NO ES STRING Y NO ES ARREGLO");
                salida = "";
                salida += exp.valor;
            }
            console.log(salida);
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
