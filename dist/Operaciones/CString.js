"use strict";
class CString {
    constructor() {
        this.tipo = TipoFuncionNativa.STRING;
    }
    cstring(valor) {
        try {
            console.log("estamos en la clase CSTRING");
            console.log(valor);
            if (valor.tipo == Tipo.ARRAY) {
                var cadena = "[";
                console.log("valor datos");
                for (var i = 0; i < valor.valor.length; i++) {
                    if (i == 0) {
                        cadena += valor.valor[i].valor;
                    }
                    else {
                        cadena += "," + valor.valor[i].valor;
                    }
                }
                console.log(valor.valor.length);
                cadena += "]";
                console.log(cadena);
                return new Return(cadena, Tipo.STRING);
            }
            else {
                return new Return(valor.valor.toString(), Tipo.STRING);
            }
        }
        catch (e) {
            throw new ErrorOperacion(0, 0, "NO SE PUEDE REALIZAR CONVERSIÓN A STRING AL VALOR: " + valor.valor, null);
        }
    }
}
