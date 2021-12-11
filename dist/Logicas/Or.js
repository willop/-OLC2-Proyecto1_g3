"use strict";
class Or {
    constructor() {
        this.tipo = TipoLogica.OR;
    }
    log_or(izquierda, derecha) {
        //&& IZQUIERDA INT VS DERECHA
        if (izquierda.tipo == Tipo.BOOLEAN) {
            if (derecha.tipo == Tipo.BOOLEAN) {
                console.log("valores izq: " + izquierda.valor + " der: " + derecha.valor);
                return this.orboolbool(izquierda, derecha);
            }
            else {
                throw new EBoolean(0, 0, "TIPO DE DATOS NO SON BOOLEANOS " + Tipo[izquierda.tipo] + " Y " + Tipo[derecha.tipo], null);
            }
        }
        else {
            throw new EBoolean(0, 0, "TIPO DE DATOS NO SON BOOLEANOS " + Tipo[izquierda.tipo] + " Y " + Tipo[derecha.tipo], null);
        }
    }
    orboolbool(izquierda, derecha) {
        console.log("los recibidos son: " + izquierda.valor + " " + derecha.valor);
        /*let izq:boolean=false;
        let der:boolean=false;
        if(izquierda.valor == true){
            izq = true;
        }else{
            console.log("la izquierda es falsa")

        }
        if(derecha.valor ==true){
            der = true;
        }else{
            console.log("la derecha es falsa")

        }*/
        console.log("Los resultados son: " + izquierda.valor + " " + derecha.valor);
        return new Return(izquierda.valor || derecha.valor, Tipo.BOOLEAN);
    }
}
