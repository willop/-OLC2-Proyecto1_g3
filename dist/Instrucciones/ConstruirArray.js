"use strict";
class ConstruirArray {
    constructor(expresion, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
    }
    interpretar(entorno, recolector) {
        try {
            var valores = [];
            var i;
            var tipoAnterior = null;
            for (let i = 0; i < this.expresion.length; i++) {
                var valor = this.expresion[i].interpretar(entorno, recolector);
                valores[i] = valor;
                /*if(tipoAnterior!=null &&valor.tipo != tipoAnterior){
                    throw new ETipoValorArray(this.linea,this.columna,"ERROR TIPO VARIABLE ARRAY",null);
                }
                tipoAnterior = valor.tipo;*/
            }
            return new Return(valores, Tipo.ARRAY, tipoAnterior);
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
