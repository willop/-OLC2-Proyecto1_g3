class FuncionesArreglos implements Expresion {
    linea: number;
    columna: number;
    id:any;
    tipo:any;
    expresion:any;
    constructor(id:any,expresion:any,tipo:any, linea: number, columna: number) {
        this.linea = linea;
        this.id = id;
        this.tipo = tipo;
        this.expresion= expresion;
        this.columna = columna;
    }

    interpretar(entorno: any, recolector: any) {
        var resultado = new Return(0, Tipo.ARRAY);
        try {
            var valorid = this.id.interpretar(entorno, recolector);
            var resultado = new Return(0, Tipo.INTEGER);    
            switch (this.tipo) {
                case TipoFunctionArreglo.FPUSH:
                    console.log("Funcion push y valor de id= "+valorid);
                    var fpush = new Fpush();
                    var exp = this.expresion.interpretar(valorid, recolector);
                    resultado = fpush.fpush(valorid,exp);
                    break;
                case TipoFunctionArreglo.FPOP:
                    console.log("Funcion pop y valor de id= "+valorid);
                    var fpop = new Fpop();
                    resultado = fpop.fpop(valorid);
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