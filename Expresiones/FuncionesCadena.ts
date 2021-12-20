class FuncionesCadena implements Expresion {
    linea: number;
    columna: number;
    tipo: any;
    valor: any;
    parametro1:any;
    parametro2:any;
    constructor(valor: any,parametro1:any,parametro2:any, tipo: any, linea: number, columna: number) {
        this.linea = linea;
        this.parametro1 = parametro1;
        this.parametro2 = parametro2;
        this.columna = columna;
        this.valor = valor;
        this.tipo = tipo;
    }


    interpretar(entorno: any, recolector: any) {
        try {
            var valor = this.valor.interpretar(entorno, recolector);
            var resultado = new Return(0, Tipo.INTEGER);

            switch (this.tipo) {
                case TipoFuncionesCadena.CARACTEROFPOSITION:
                    console.log("Switch caracterofposition valo: ")
                    console.log(this.valor)
                    console.log("Switch caracterofposition valo variable: ")
                    console.log(valor)
                    if(this.parametro1 != null){
                        var param1 = this.parametro1.interpretar(entorno,recolector);
                        console.log("param1 switch")
                        console.log(param1)
                        var tipofuncioncaden = new FCaracterOfPosition();
                        resultado = tipofuncioncaden.fcaracterofposition(valor, param1);
                        break;
                    }else{
                        //error
                    }
                case TipoFuncionesCadena.SUBSTRING:
                    if(this.parametro1 != null && this.parametro2 != null){
                        var param1 = this.parametro1.interpretar(entorno,recolector);
                        var param2 = this.parametro2.interpretar(entorno,recolector);

                        var fsubstring = new FSubString();
                        resultado = fsubstring.fsubstring(valor, param1, param2);
                    }else{
                        //va el error
                    }
                    break;
                case TipoFuncionesCadena.LENGTH:
                    var flength = new FLength();
                    resultado = flength.flength(valor)
                    break;
                case TipoFuncionesCadena.TOUPPERCASE:
                    var ftouppercase = new FtoUpperCase();
                    resultado = ftouppercase.ftouppercase(valor)
                    break;
                case TipoFuncionesCadena.TOLOWERCASE:
                    var ftolowercase = new FtoLowerCase();
                    resultado = ftolowercase.ftolowercase(valor)
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