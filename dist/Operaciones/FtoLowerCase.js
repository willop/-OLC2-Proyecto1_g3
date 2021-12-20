"use strict";
class FtoLowerCase {
    constructor() {
        this.tipo = TipoFuncionesCadena.TOLOWERCASE;
    }
    ftolowercase(id) {
        try {
            var variable = id.valor;
            return new Return(variable.toLowerCase(), Tipo.STRING);
        }
        catch (error) {
            throw new ErrorOperacion(0, 0, "NO SE PUEDE REALIZAR TOLOWERCASE AL VALOR: " + id.valor, null);
        }
    }
}
