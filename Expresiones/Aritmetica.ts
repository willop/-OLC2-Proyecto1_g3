class Aritmetica implements Expresion {
    linea: number;
    columna: number;
    izquierda: any;
    tipo:any;
    derecha: any;
    constructor (izquierda: any,derecha: any,tipo:any,linea: number, columna: number){
        this.linea = linea;
        this.columna = columna;
        this.izquierda = izquierda;
        this.derecha = derecha;
        this.tipo = tipo;
    }


interpretar(recolector:any){
        var izquierda = this.izquierda.interpretar(recolector);
        var derecha = this.derecha.interpretar(recolector);
        var resultado=new Return(0,Tipo.INTEGER);
        
        switch(this.tipo){
            case TipoAritmetica.SUMA:
                var vsumar = new Sumar();    
                //salidaConsolaconsole.log("antes de sumar");
                resultado = vsumar.sumar(izquierda, derecha);
                //console.log(resultado);
                break;
            case TipoAritmetica.RESTA:
                //console.log("Entra a restar");
                var vresta = new Restar(); //hago referencia a un nuevo objeto de la clase Restar.ts
                resultado = vresta.restar(izquierda, derecha);
                //console.log(resultado);
                break;
            case TipoAritmetica.MULTIPLICACION:
                //console.log("Entra a restar");
                var vmultiplicacion = new Multiplicacion(); //hago referencia a un nuevo objeto de la clase Restar.ts
                resultado = vmultiplicacion.multiplicar(izquierda, derecha);
                //console.log(resultado);
                break;
            case TipoAritmetica.DIVISION:
                //console.log("Entra a restar");
                var vdivision = new Division(); //hago referencia a un nuevo objeto de la clase Restar.ts
                resultado = vdivision.dividir(izquierda, derecha);
                //console.log(resultado);
                break;
        }
        
        return resultado ;
    }
}