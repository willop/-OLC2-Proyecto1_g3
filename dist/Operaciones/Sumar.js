"use strict";
class Sumar {
    constructor() {
        this.tipo = TipoAritmetica.SUMA;
    }
    sumar(izquierda, derecha) {
        //IZQUIERDA CON INT Y SUS DERIVACIONES
        if (izquierda.tipo == Tipo.INTEGER) {
            if (derecha.tipo == Tipo.INTEGER) {
                //r
                return this.sumarintint(izquierda, derecha);
            }
            else if (derecha.tipo == Tipo.DOUBLE) {
                //r
                return this.sumarintdouble(izquierda, derecha);
            }
            else if (derecha.tipo == Tipo.CHAR) {
                //r
                return this.sumarintchar(izquierda, derecha);
            }
            else if (derecha.tipo == Tipo.STRING) {
                //no se puede
                //codigo de Rul
            }
            else {
                //bolean 
                //codigo de Rul
            }
        }
        //IZQUIERDA CON DOUBLE Y SUS DERIVACIONES
        else if (izquierda.tipo == Tipo.DOUBLE) {
            if (derecha.tipo == Tipo.INTEGER) {
                //r
                return this.sumardoubleint(izquierda, derecha);
            }
            else if (derecha.tipo == Tipo.DOUBLE) {
                //r
                return this.sumardoubledouble(izquierda, derecha);
            }
            else if (derecha.tipo == Tipo.CHAR) {
                //r
                return this.sumardoublechar(izquierda, derecha);
            }
            else if (derecha.tipo == Tipo.STRING) {
                //no se puede
                //codigo de Rul
            }
            else {
                //bolean 
                //codigo de Rul
            }
        }
        //IZQUIERDA CON CHAR 
        else if (izquierda.tipo == Tipo.CHAR) {
            if (derecha.tipo == Tipo.INTEGER) {
                //r
                return this.sumarcharint(izquierda, derecha);
            }
            else if (derecha.tipo == Tipo.DOUBLE) {
                //r
                return this.sumarchardouble(izquierda, derecha);
            }
            else if (derecha.tipo == Tipo.CHAR) {
                //r
                return this.sumarcharchar(izquierda, derecha);
            }
            else if (derecha.tipo == Tipo.STRING) {
                //no se puede
                //codigo de Rul
            }
            else {
                //bolean 
                //codigo de Rul
            }
        }
        else if (izquierda.tipo == Tipo.CHAR) {
            //r
            return this.sumarintchar(izquierda, derecha);
        }
        else if (izquierda.tipo == Tipo.STRING) {
            //no se puede
            //codigo de Rul
        }
        else {
            //bolean 
            //codigo de Rul
        }
    }
    // ------------ int + otros
    sumarintint(izquierda, derecha) {
        //console.log("dentro de sumarintint");       
        return new Return(izquierda.valor + derecha.valor, Tipo.INTEGER);
    }
    sumarintdouble(izquierda, derecha) {
        //console.log("dentro de sumarintint");
        return new Return(izquierda.valor + derecha.valor, Tipo.DOUBLE);
    }
    sumarintchar(izquierda, derecha) {
        //console.log("dentro de sumarintint");
        derecha.valor = derecha.valor.charCodeAt(0);
        return new Return(izquierda.valor + derecha.valor, Tipo.INTEGER);
    }
    //-----------double + otros
    sumardoubleint(izquierda, derecha) {
        //console.log("dentro de sumarintint");       
        return new Return(izquierda.valor + derecha.valor, Tipo.DOUBLE);
    }
    sumardoubledouble(izquierda, derecha) {
        //console.log("dentro de sumarintint");
        return new Return(izquierda.valor + derecha.valor, Tipo.DOUBLE);
    }
    sumardoublechar(izquierda, derecha) {
        //console.log("dentro de sumarintint");
        derecha.valor = derecha.valor.charCodeAt(0);
        return new Return(izquierda.valor + derecha.valor, Tipo.DOUBLE);
    }
    ///------------- char + otros
    sumarcharint(izquierda, derecha) {
        //console.log("dentro de sumarintint");
        izquierda.valor = izquierda.valor.charCodeAt(0);
        return new Return(izquierda.valor + derecha.valor, Tipo.INTEGER);
    }
    sumarchardouble(izquierda, derecha) {
        //console.log("dentro de sumarintint");
        izquierda.valor = izquierda.valor.charCodeAt(0);
        return new Return(izquierda.valor + derecha.valor, Tipo.DOUBLE);
    }
    sumarcharchar(izquierda, derecha) {
        //console.log("dentro de sumarintint");
        izquierda.valor = izquierda.valor.charCodeAt(0);
        derecha.valor = derecha.valor.charCodeAt(0);
        return new Return(izquierda.valor + derecha.valor, Tipo.INTEGER);
    }
}
