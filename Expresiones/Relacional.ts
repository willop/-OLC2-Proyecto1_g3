class Relacional implements Expresion {
    linea: number;
    columna: number;
    izquierda: any;
    tipo: any;
    derecha: any;
    constructor(izquierda: any, derecha: any, tipo: any, linea: number, columna: number) {
        this.linea = linea;
        this.columna = columna;
        this.izquierda = izquierda;
        this.derecha = derecha;
        this.tipo = tipo;
    }


    interpretar(entorno: any, recolector: any) {
        try {
            var izquierda = this.izquierda.interpretar(entorno, recolector);
            var derecha = this.derecha.interpretar(entorno, recolector);
            var resultado = new Return(0, Tipo.INTEGER);

            switch (this.tipo) {
                case TipoRelacional.IGUALDAD:
                    var vigualdad = new Igualdad();
                    //salidaConsolaconsole.log("antes de sumar");
                    resultado = vigualdad.igualdad(izquierda, derecha);
                    console.log("igualdad " + resultado);
                    break;
                case TipoRelacional.DESIGUALDAD:
                    var vdesigualdad = new Desigualdad();
                    //salidaConsolaconsole.log("antes de sumar");
                    resultado = vdesigualdad.desigualdad(izquierda, derecha);
                    console.log("igualdad " + resultado);
                    break;
                case TipoRelacional.MAYOR_QUE:
                    var vmayorque = new MayorQue();
                    resultado = vmayorque.mayorque(izquierda, derecha);
                    console.log("mayor que " + resultado)
                    break;
                case TipoRelacional.MENOR_QUE:
                    var vmenorque = new MenorQue();
                    resultado = vmenorque.menorque(izquierda, derecha);
                    console.log("menor que " + resultado)
                    break;
                case TipoRelacional.MAYOR_IGUAL:
                    var vmayorigual = new MayorIgual();
                    resultado = vmayorigual.mayorigual(izquierda, derecha);
                    console.log("mayor igual " + resultado)
                    break;
                case TipoRelacional.MENOR_IGUAL:
                    var vmenorigual = new MenorIgual();
                    resultado = vmenorigual.menorigual(izquierda, derecha);
                    console.log("menor igual " + resultado.valor)
                    break;
            }

            return resultado;
        } catch (e: any) {
            e.linea = this.linea;
            e.columna = this.columna;
            e.entorno = entorno;
            throw e;

        }

    }
}