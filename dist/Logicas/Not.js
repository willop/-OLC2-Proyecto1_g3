"use strict";
class Not {
    constructor() {
        this.tipo = TipoLogica.NOT;
    }
    log_not(izquierda, derecha) {
        //&& IZQUIERDA INT VS DERECHA
        if (derecha.tipo == Tipo.BOOLEAN) {
            return this.notboolbool(izquierda, derecha);
        }
        else {
            throw new EBoolean(0, 0, "TIPO DE DATOS NO SON BOOLEANOS " + Tipo[derecha.tipo], null);
        }
    }
    notboolbool(izquierda, derecha) {
        return new Return(!derecha.valor, Tipo.BOOLEAN);
    }
}
