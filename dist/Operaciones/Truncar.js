"use strict";
class Truncar {
    constructor() {
        this.tipo = TipoFuncionNativa.TRUNCAR;
    }
    truncar(valor) {
        if (valor.tipo == Tipo.INTEGER) {
            return this.truncarDouble(valor);
        }
        else if (valor.tipo == Tipo.DOUBLE) {
            return this.truncarInt(valor);
        }
        else {
            throw new TipoIncorrecto(0, 0, "TIPO INCORRECTO PARA LA FUNCION TO INT, TO DOUBLE: " + valor.tipo, null);
        }
    }
    // ------------ int + otros
    truncarInt(valor) {
        try {
            var resultado = parseInt(valor.valor);
            return new Return(resultado, Tipo.INTEGER);
        }
        catch (e) {
            throw new ErrorOperacion(0, 0, "NO SE PUEDE REALIZAR TOINT AL VALOR: " + valor.valor, null);
        }
    }
    truncarDouble(valor) {
        try {
            var resultado = parseFloat(valor.valor);
            return new Return(resultado, Tipo.DOUBLE);
        }
        catch (e) {
            throw new ErrorOperacion(0, 0, "NO SE PUEDE REALIZAR TODOUBLE AL VALOR: " + valor.valor, null);
        }
    }
}
