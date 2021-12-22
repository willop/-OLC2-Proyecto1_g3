"use strict";
class FuncionesArreglos {
    constructor(id, expresion, tipo, linea, columna) {
        this.linea = linea;
        this.id = id;
        this.tipo = tipo;
        this.expresion = expresion;
        this.columna = columna;
    }
    interpretar(entorno, recolector) {
        var resultado = new Return(0, Tipo.ARRAY);
        try {
            var valorid = this.id.interpretar(entorno, recolector);
            var resultado = new Return(0, Tipo.INTEGER);
            switch (this.tipo) {
                case TipoFunctionArreglo.FPUSH:
                    console.log("Funcion push y valor de id= ");
                    console.log(valorid);
                    var fpush = new Fpush();
                    var exp = this.expresion.interpretar(entorno, recolector);
                    resultado = fpush.fpush(valorid, exp);
                    break;
                case TipoFunctionArreglo.FPOP:
                    console.log("Funcion pop y valor de id= ");
                    console.log(valorid);
                    var fpop = new Fpop();
                    resultado = fpop.fpop(valorid);
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
