"use strict";
class Aritmetica {
    constructor(izquierda, derecha, tipo, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.izquierda = izquierda;
        this.derecha = derecha;
        this.tipo = tipo;
    }
    interpretar(recolector) {
        var izquierda = this.izquierda.interpretar(recolector);
        var derecha = this.derecha.interpretar(recolector);
        var resultado = new Return(0, Tipo.INTEGER);
        switch (this.tipo) {
            case TipoAritmetica.SUMA:
                var vsumar = new Sumar();
                //salidaConsolaconsole.log("antes de sumar");
                resultado = vsumar.sumar(izquierda, derecha);
                //console.log(resultado);
                break;
        }
        return resultado;
    }
}
