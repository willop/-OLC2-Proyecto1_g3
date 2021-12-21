"use strict";
class Fpush {
    constructor() {
        this.tipo = TipoFunctionArreglo.FPUSH;
    }
    fpush(id, expresion) {
        try {
            console.log("verificar si es tipo vector: " + id.tipo + " y lo que ingresa es: " + expresion.valor);
            if (id.tipo == Tipo.ARRAY) {
                //si es un arreglo 
                console.log("Ingresa y listo para añadir");
                console.log("AccesoArray - no entrar");
                //var asig = new AsignarValorArray(expresion.valor,id);		
                //return new Return()
            }
        }
        catch (e) {
            throw new ErrorOperacion(0, 0, "NO SE PUEDE REALIZAR PUSH A ESTE ARREGLO", null);
        }
    }
}
