class Logica implements Expresion {
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


interpretar(entorno:any,recolector:any){
    try{
        var izquierda = this.izquierda.interpretar(entorno,recolector);
        var derecha = this.derecha.interpretar(entorno,recolector);
        var resultado=new Return(0,Tipo.INTEGER);
        
        switch(this.tipo){
            case TipoLogica.IGUALDAD:
                var vigualdad = new Igualdad();    
                //salidaConsolaconsole.log("antes de sumar");
                resultado = vigualdad.igualdad(izquierda, derecha);
                //console.log(resultado);
                break;
        }
        
        return resultado ;
    }catch(e:any){
        e.linea = this.linea;
        e.columna = this.columna;
        e.entorno = entorno;
        throw e;

    }

}
}