class Retornar implements Instruccion {
    expresion: any;
    numpotencia:any;
    linea: number;
    columna: number;
    constructor (expresion:any,linea: number, columna: number){
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
    }
    
    interpretar(entorno:any,recolector:any){
        try{
            if(this.expresion == null){
                var exp = this.expresion.interpretar(entorno,recolector);
                if(exp.tipo == Tipo.STRUCT && !(this.expresion instanceof LlamadaFuncion)){
                    var value = entorno.ObtenerSimbolo(this.expresion.id);
                }
                return {
                    "value":value,
                    "tipo":Tipo.RETURN
                }
            }else{
                return {
                    "value":new Literal(null,Tipo.NULL,this.linea,this.columna),
                    "tipo":Tipo.RETURN
                }
            }
            

        }catch(e){
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea,this.columna,"ERROR EN RETORNAR",entorno));
        }
    }
}