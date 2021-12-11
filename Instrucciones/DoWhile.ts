class DoWhile implements Instruccion {
    condiciondowhile: any;
    instrucciones:any;
    linea: number;
    columna: number;
    constructor (condiciondowhile:any,instrucciones:any,linea: number, columna: number){
        this.linea = linea;
        this.columna = columna;
        this.condiciondowhile = condiciondowhile;
        this.instrucciones = instrucciones;
    }
    
    interpretar(entorno:any,recolector:any){
        try{
            var resultado = this.condiciondowhile.interpretar(entorno,recolector);
            if(resultado.tipo != Tipo.BOOLEAN){
                throw new EWHILE(this.linea,this.columna,"ERROR TIPO INCORRECTO EN CONDICION",null); 
            }else{
                do{
                    console.log("Ejecutando el  Do while "+resultado.valor);
                    this.instrucciones.interpretar(entorno,recolector);
                    resultado = this.condiciondowhile.interpretar(entorno,recolector);
                }while(resultado.valor);   
            }
                
        }catch(e){
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea,this.columna,"ERROR EN DOWHILE",entorno));
        }        
    }
}

