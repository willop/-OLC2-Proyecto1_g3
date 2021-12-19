"use strict";
class FuncionesNativas {
    constructor(valor, tipo, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.valor = valor;
        this.tipo = tipo;
    }
    interpretar(entorno, recolector) {
        try {
            var valor = this.valor.interpretar(entorno, recolector);
            var resultado = new Return(0, Tipo.INTEGER);
            switch (this.tipo) {
                case TipoFuncionNativa.INTPARSE:
                    var intparse = new Parsear();
                    resultado = intparse.parsear(this.tipo, valor);
                    break;
                case TipoFuncionNativa.DOUBLEPARSE:
                    var intparse = new Parsear();
                    resultado = intparse.parsear(this.tipo, valor);
                    break;
                case TipoFuncionNativa.BOOLEANPARSE:
                    var intparse = new Parsear();
                    resultado = intparse.parsear(this.tipo, valor);
                    break;
                case TipoFuncionNativa.TOINT:
                    var to_int = new Truncar();
                    resultado = to_int.truncarInt(valor);
                    break;
                case TipoFuncionNativa.TODOUBLE:
                    var to_double = new Truncar();
                    resultado = to_double.truncarDouble(valor);
                    break;
                case TipoFuncionNativa.STRING:
                    var to_string = new CString();
                    resultado = to_string.cstring(valor);
                    break;
                case TipoFuncionNativa.TYPEOF:
                    var vartype_of = new TypeOf();
                    resultado = vartype_of.type_of(valor);
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
