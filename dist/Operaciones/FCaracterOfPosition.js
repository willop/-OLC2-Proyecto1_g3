"use strict";
class FCaracterOfPosition {
    constructor() {
        this.tipo = TipoFuncionesCadena.CARACTEROFPOSITION;
    }
    fcaracterofposition(id, posicion) {
        try {
            console.log("detnoro de la clase");
            console.log(id.valor);
            return new Return(id.valor.charAt(posicion.valor), Tipo.CHAR);
        }
        catch (e) {
            throw new ErrorOperacion(0, 0, "NO SE PUEDE REALIZAR CARACTEROFPOSITOIN: " + id.valor, null);
        }
    }
}
