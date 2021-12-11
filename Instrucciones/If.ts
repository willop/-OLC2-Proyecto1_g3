class If implements Instruccion {
    condicion: any;
    instrucciones:any;
    condicionelse:any;
    linea: number;
    columna: number;
    constructor (condicion:any,instrucciones:any,condicionelse:any,linea: number, columna: number){
        this.linea = linea;
        this.columna = columna;
        this.condicion = condicion;
        this.instrucciones = instrucciones;
        this.condicionelse = condicionelse;
    }
    
    interpretar(entorno:any,recolector:any){
        try{
            var resultado = this.condicion.interpretar(entorno,recolector);
            if(resultado.tipo != Tipo.BOOLEAN){
                throw new EIf(this.linea,this.columna,"ERROR TIPO INCORRECTO EN CONDICION",null); 
            }
            if(resultado.valor){
                return this.instrucciones.interpretar(entorno,recolector);

            }else if(this.condicionelse != null){
                return this.condicionelse.interpretar(entorno,recolector);
            }
                
        }catch(e){
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea,this.columna,"ERROR EN IF",entorno));
        }        
    }
}