"use strict";
class ConstruirArray {
    constructor(expresion, generador, atributostipo, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.atributostipo = atributostipo;
        this.expresion = expresion;
        this.generador = generador;
    }
    interpretar(entorno, recolector) {
        try {
            var valores = [];
            var i;
            for (i in this.expresion.length) {
                var valor = this.expresion[i].interpretar(entorno, recolector);
                valores[i] = valor;
            }
            return new Return(valores, Tipo.ARRAY);
        }
        catch (e) {
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea, this.columna, "ERROR EN CONSTRUCCION ARRAY", entorno));
        }
    }
    obtenerAtributoTipo() {
        var lista = [];
        lista.push(this.expresion[0].atributostipo);
        if (this.expresion[0].atributostipo == Tipo.ARRAY) {
            var listaatributos = this.expresion[0].obtenerAtributoTipo();
            var atributo;
            for (atributo in listaatributos) {
                lista.push(atributo);
            }
        }
        return lista;
    }
}
