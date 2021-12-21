"use strict";
class Fpop {
    constructor() {
        this.tipo = TipoFunctionArreglo.FPOP;
    }
    fpop(id) {
        try {
            console.log("verificar si es tipo vector: " + id.tipo);
            if (id.tipo == Tipo.ARRAY) {
                //si es un arreglo 
                console.log("Ingresa y listo para eliminar");
                //id.push(expresion.valor);
            }
        }
        catch (e) {
            throw new ErrorOperacion(0, 0, "NO SE PUEDE REALIZAR POP A ESTE ARREGLO ", null);
        }
    }
}
