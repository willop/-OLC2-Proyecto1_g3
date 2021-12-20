"use strict";
class FtoUpperCase {
    constructor() {
        this.tipo = TipoFuncionesCadena.TOUPPERCASE;
    }
    ftouppercase(id) {
        try {
            var variable = id.valor;
            return new Return(variable.toUpperCase(), Tipo.STRING);
        }
        catch (error) {
            throw new ErrorOperacion(0, 0, "NO SE PUEDE REALIZAR TOUPPERCASE AL VALOR: " + id.valor, null);
        }
    }
}
