"use strict";
class Declaracion {
    constructor(expresion, linea, columna, tipo, id) {
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
        this.tipo = tipo;
        this.id = id;
    }
    interpretar(entorno, recolector) {
        try {
            //console.log("esta entrando aca declaracion? "+this.id+" tipo: "+this.tipo+" exp: "+this.expresion);
            //si viene expresion nula
            if (this.expresion == null) {
                //console.log("entonces aca tambien entras?");
                switch (this.tipo) {
                    case Tipo.INTEGER:
                        entorno.GuardarSimbolo(0, this.id, this.tipo);
                        break;
                    case Tipo.DOUBLE:
                        console.log("si es multiple double");
                        entorno.GuardarSimbolo(Number(0).toFixed(1), this.id, this.tipo);
                        break;
                    case Tipo.STRING:
                        entorno.GuardarSimbolo("", this.id, this.tipo);
                        break;
                    case Tipo.CHAR:
                        entorno.GuardarSimbolo('', this.id, this.tipo);
                        break;
                    default:
                        entorno.GuardarSimbolo(null, this.id, this.tipo);
                }
            } //si la expresion tiene un valor
            else {
                var valor = this.expresion.interpretar(entorno, recolector);
                if (this.tipo != valor.tipo) {
                    throw new TipoIncorrecto(this.linea, this.columna, "EL TIPO DECLARADO NO ES IGUAL AL TIPO ASIGNADO" + Tipo[valor.tipo] + " " + Tipo[this.tipo], entorno);
                }
                if (valor.tipo == Tipo.STRUCT) {
                    if (valor instanceof Simbolo) {
                        entorno.guardarVariableStruct(this.id, valor.atributos, valor.auxtipo);
                    }
                    else {
                        entorno.guardarVariableStruct(this.id, valor.valor, valor.auxtipo);
                    }
                }
                else {
                    var bandera = false;
                    var salida = valor.valor;
                    if (this.tipo == Tipo.STRING) {
                        var tam = valor.valor.length;
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
                    valor.valor = salida;
                    entorno.GuardarSimbolo(valor.valor, this.id, this.tipo);
                }
            }
        }
        catch (e) {
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea, this.columna, "ERROR EN DECLARACION", entorno));
        }
    }
}
