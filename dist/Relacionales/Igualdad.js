"use strict";
class Igualdad {
    constructor() {
        this.tipo = TipoLogica.IGUALDAD;
    }
    igualdad(izquierda, derecha) {
        //IGUALACION IZQUIERDA INT VS DERECHA
        if (izquierda.tipo == Tipo.INTEGER) {
            if (derecha.tipo == Tipo.INTEGER) {
                return this.Igualintint(izquierda, derecha);
            }
            else {
                throw new Logico(0, 0, "TIPOS DE DATOS DIFERENTES", null);
            }
        }
    }
    // ------------ int + otros
    Igualintint(izquierda, derecha) {
        //console.log("dentro de sumarintint");       
        return new Return(izquierda.valor == derecha.valor, Tipo.BOOLEAN);
    }
}
