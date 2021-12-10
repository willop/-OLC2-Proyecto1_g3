"use strict";
class Restar {
    constructor() {
        this.tipo = TipoAritmetica.RESTA;
    }
    restar(izquierda, derecha) {
        //IZQUIERDA CON INT Y SUS DERIVACIONES
        if (izquierda.tipo == Tipo.INTEGER) {
            if (derecha.tipo == Tipo.INTEGER) {
                //r
                return this.restarintint(izquierda, derecha);
            }
            else if (derecha.tipo == Tipo.DOUBLE) {
                //r
                return this.restarintdouble(izquierda, derecha);
            }
            else if (derecha.tipo == Tipo.CHAR) {
                //r
                return this.restarintchar(izquierda, derecha);
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
                return this.restardoubleint(izquierda, derecha);
            }
            else if (derecha.tipo == Tipo.DOUBLE) {
                //r
                return this.restardoubledouble(izquierda, derecha);
            }
            else if (derecha.tipo == Tipo.CHAR) {
                //r
                return this.restardoublechar(izquierda, derecha);
            }
            else {
            }
        }
        //IZQUIERDA CON CHAR 
        else if (izquierda.tipo == Tipo.CHAR) {
            if (derecha.tipo == Tipo.INTEGER) {
                //r
                return this.restarcharint(izquierda, derecha);
            }
            else if (derecha.tipo == Tipo.DOUBLE) {
                //r
                return this.restarchardouble(izquierda, derecha);
            }
            else if (derecha.tipo == Tipo.CHAR) {
                //r
                return this.restarcharchar(izquierda, derecha);
            }
            else {
            }
        }
        //De lo contrario error ya que no se puede efectuar esa operacion con los tipos restantes
        else {
            //bolean 
            //codigo de Rul
        }
    }
    //----------- int - otros
    restarintint(izquierda, derecha) {
        //aca se realiza la resta de los dos numeros 
        //console.log("si entra a restar");
        return new Return(izquierda.valor - derecha.valor, Tipo.INTEGER);
    }
    restarintdouble(izquierda, derecha) {
        //aca se realiza la resta de los dos numeros 
        //console.log("si entra a restar");
        return new Return(izquierda.valor - derecha.valor, Tipo.DOUBLE);
    }
    restarintchar(izquierda, derecha) {
        //aca se realiza la resta de los dos numeros 
        //console.log("si entra a restar");
        derecha.valor = derecha.valor.charCodeAt(0);
        return new Return(izquierda.valor - derecha.valor, Tipo.INTEGER);
    }
    //-------- double - otros
    restardoubleint(izquierda, derecha) {
        //aca se realiza la resta de los dos numeros 
        //console.log("si entra a restar");
        return new Return(izquierda.valor - derecha.valor, Tipo.DOUBLE);
    }
    restardoubledouble(izquierda, derecha) {
        //aca se realiza la resta de los dos numeros 
        //console.log("si entra a restar");
        return new Return(izquierda.valor - derecha.valor, Tipo.DOUBLE);
    }
    restardoublechar(izquierda, derecha) {
        //aca se realiza la resta de los dos numeros 
        //console.log("si entra a restar");
        derecha.valor = derecha.valor.charCodeAt(0);
        return new Return(izquierda.valor - derecha.valor, Tipo.DOUBLE);
    }
    //-------- char - otros
    restarcharint(izquierda, derecha) {
        //aca se realiza la resta de los dos numeros 
        //console.log("si entra a restar");
        izquierda.valor = izquierda.valor.charCodeAt(0);
        return new Return(izquierda.valor - derecha.valor, Tipo.INTEGER);
    }
    restarchardouble(izquierda, derecha) {
        //aca se realiza la resta de los dos numeros 
        //console.log("si entra a restar");
        izquierda.valor = izquierda.valor.charCodeAt(0);
        return new Return(izquierda.valor - derecha.valor, Tipo.DOUBLE);
    }
    restarcharchar(izquierda, derecha) {
        //aca se realiza la resta de los dos numeros 
        //console.log("si entra a restar");
        derecha.valor = derecha.valor.charCodeAt(0);
        izquierda.valor = izquierda.valor.charCodeAt(0);
        return new Return(izquierda.valor - derecha.valor, Tipo.INTEGER);
    }
}
