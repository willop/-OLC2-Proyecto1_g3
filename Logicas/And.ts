class And {
    tipo = TipoLogica.AND
    log_and(izquierda: any, derecha: any): any {
        //&& IZQUIERDA INT VS DERECHA
        if (izquierda.tipo == Tipo.BOOLEAN) {
            if (derecha.tipo == Tipo.BOOLEAN) {
                return this.andboolbool(izquierda, derecha);
            } else {
                throw new EBoolean(0, 0, "TIPO DE DATOS NO SON BOOLEANOS " + Tipo[izquierda.tipo] + " Y " + Tipo[derecha.tipo], null);
            }
        } else {
            throw new EBoolean(0, 0, "TIPO DE DATOS NO SON BOOLEANOS " + Tipo[izquierda.tipo] + " Y " + Tipo[derecha.tipo], null);
        }
    }

    andboolbool(izquierda: any, derecha: any) {
        console.log("los recibidos son: " + izquierda.valor + " " + derecha.valor);
        console.log("Los resultados son: " + izquierda.valor + " " + derecha.valor);
        return new Return(izquierda.valor && derecha.valor, Tipo.BOOLEAN);
    }


}