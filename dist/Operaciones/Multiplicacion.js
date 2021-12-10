"use strict";
class Multiplicacion {
    constructor() {
        this.tipo = TipoAritmetica.MULTIPLICACION;
    }
    multiplicar(izquierda, derecha) {
        if (izquierda.tipo == Tipo.INTEGER) {
            if (derecha.tipo == Tipo.INTEGER) {
                //si son enteros
                return this.multiplicarintint(izquierda, derecha);
            }
            if (derecha.tipo == Tipo.DOUBLE) {
                //si son enteros
                return this.multiplicarintdouble(izquierda, derecha);
            }
            if (derecha.tipo == Tipo.CHAR) {
                //si son enteros
                return this.multiplicarintchar(izquierda, derecha);
            }
        }
        if (izquierda.tipo == Tipo.DOUBLE) {
            if (derecha.tipo == Tipo.INTEGER) {
                //si son enteros
                return this.multiplicardoubleint(izquierda, derecha);
            }
            if (derecha.tipo == Tipo.DOUBLE) {
                //si son enteros
                return this.multiplicardoubledouble(izquierda, derecha);
            }
            if (derecha.tipo == Tipo.CHAR) {
                //si son enteros
                return this.multiplicardoublechar(izquierda, derecha);
            }
        }
        if (izquierda.tipo == Tipo.CHAR) {
            if (derecha.tipo == Tipo.INTEGER) {
                //si son enteros
                return this.multiplicarcharint(izquierda, derecha);
            }
            if (derecha.tipo == Tipo.DOUBLE) {
                //si son enteros
                return this.multiplicarchardouble(izquierda, derecha);
            }
            if (derecha.tipo == Tipo.CHAR) {
                //si son enteros
                return this.multiplicarcharchar(izquierda, derecha);
            }
        }
    }
    multiplicarintint(izquierda, derecha) {
        return new Return(izquierda.valor * derecha.valor, Tipo.INTEGER);
    }
    multiplicarintdouble(izquierda, derecha) {
        return new Return(izquierda.valor * derecha.valor, Tipo.DOUBLE);
    }
    multiplicarintchar(izquierda, derecha) {
        derecha.valor = derecha.valor.charCodeAt(0);
        return new Return(izquierda.valor * derecha.valor, Tipo.INTEGER);
    }
    multiplicardoubleint(izquierda, derecha) {
        return new Return(izquierda.valor * derecha.valor, Tipo.DOUBLE);
    }
    multiplicardoubledouble(izquierda, derecha) {
        return new Return(izquierda.valor * derecha.valor, Tipo.DOUBLE);
    }
    multiplicardoublechar(izquierda, derecha) {
        derecha.valor = derecha.valor.charCodeAt(0);
        return new Return(izquierda.valor * derecha.valor, Tipo.DOUBLE);
    }
    multiplicarcharint(izquierda, derecha) {
        izquierda.valor = izquierda.valor.charCodeAt(0);
        return new Return(izquierda.valor * derecha.valor, Tipo.DOUBLE);
    }
    multiplicarchardouble(izquierda, derecha) {
        izquierda.valor = izquierda.valor.charCodeAt(0);
        return new Return(izquierda.valor * derecha.valor, Tipo.DOUBLE);
    }
    multiplicarcharchar(izquierda, derecha) {
        izquierda.valor = izquierda.valor.charCodeAt(0);
        derecha.valor = derecha.valor.charCodeAt(0);
        return new Return(izquierda.valor * derecha.valor, Tipo.DOUBLE);
    }
}
