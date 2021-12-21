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
                    expresion = "";
                    //console.log("Analizando el caracter: "+salida.charAt(i))
                    if (salida.charAt(i) == '$') {
                        //console.log("Si se reconocio el caracter");
                        i++;
                        //console.log("ahora el nuevo caracter es: "+salida.charAt(i))
                        if (!salida.charAt(i).match(/[a-z]/i)) {
                            while (!salida.charAt(i).match(/[a-z]/i)) {
                                //console.log("dentro del primer while con: "+salida.charAt(i)+" valor i: "+i+" y tam: "+tam)
                                if (salida.charAt(i) == "$") {
                                    //console.log("aca ni entra");
                                    i--;
                                    break;
                                }
                                else {
                                    expresion += salida.charAt(i);
                                    if (i + 1 == tam) {
                                        break;
                                    }
                                    else {
                                        i++;
                                        if (salida.charAt(i + 1).match(/[a-z]/i)) {
                                            i--;
                                            break;
                                        }
                                    }
                                }
                            } //fin while
                            //console.log("saliendo del while siendo numero: "+expresion);
                            // validacion de vectores
                            expresion = eval(expresion);
                            textosalida += expresion;
                        } //fin if para de digitos
                        else {
                            //console.log("Entra al else? con:"+salida.charAt(i))
                            expresion = "";
                            while (salida.charAt(i) != ' ') {
                                //console.log("dentro del primer while con: "+salida.charAt(i)+" valor i: "+i+" y tam: "+tam)
                                if (i == tam) {
                                }
                                else {
                                    expresion += salida.charAt(i); //a
                                    //console.log("el valor de expresion despues: "+expresion+" y i:"+i)
                                    if (i + 1 == tam) {
                                        break;
                                    }
                                    else {
                                        i++;
                                    }
                                }
                            } //fin while
                            //console.log("el valor de la variable es: "+expresion);
                            var expresionvalor = entorno.ObtenerSimbolo(expresion);
                            //console.log("********* la variable contiene el valor: "+expresionvalor.valor);
                            textosalida += expresionvalor.valor;
                        }
                    }
                    else {
                        textosalida += salida.charAt(i);
                    }
                } //fin del for
                salida = textosalida;
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
