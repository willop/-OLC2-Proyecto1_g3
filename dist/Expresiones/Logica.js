"use strict";
class Logica {
    constructor(izquierda, derecha, tipo, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.izquierda = izquierda;
        this.derecha = derecha;
        this.tipo = tipo;
    }
    interpretar(entorno, recolector) {
        try {
            var izquierda = this.izquierda.interpretar(entorno, recolector);
            var derecha = this.derecha.interpretar(entorno, recolector);
            var resultado = new Return(0, Tipo.INTEGER);
            switch (this.tipo) {
                case TipoLogica.IGUALDAD:
                    var vigualdad = new Igualdad();
                    //salidaConsolaconsole.log("antes de sumar");
                    resultado = vigualdad.igualdad(izquierda, derecha);
                    //console.log(resultado);
                    break;
            }
            return resultado;
        }
        catch (e) {
            e.linea = this.linea;
            e.columna = this.columna;
            e.entorno = entorno;
            throw e;
        }
    }
}
