"use strict";
class Division {
    constructor() {
        this.tipo = TipoAritmetica.RESTA;
    }
    dividir(izquierda, derecha) {
        if (izquierda.tipo == Tipo.INTEGER) {
            if (derecha.tipo == Tipo.INTEGER) {
                //si son enteros realizar la resta`
                return this.dividirintint(izquierda, derecha);
            }
        }
    }
    dividirintint(izquierda, derecha) {
        //aca se realiza la resta de los dos numeros 
        //console.log("si entra a restar");
        return new Return(izquierda.valor / derecha.valor, Tipo.INTEGER);
    }
}
