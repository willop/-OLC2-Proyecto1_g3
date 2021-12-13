class Ternario implements Instruccion {  
    condicion: any;
    condicionverdadera:any;
    condicionfalsa:any;
    linea: number;
    columna: number;
    constructor (condicion:any,condicionverdadera:any,condicionfalsa:any,linea: number, columna: number){
        this.linea = linea;
        this.columna = columna;
        this.condicion = condicion;
        this.condicionverdadera = condicionverdadera;
        this.condicionfalsa = condicionfalsa;
    }
    
    interpretar(entorno:any,recolector:any){
        try{
            var resultado = this.condicion.interpretar(entorno,recolector);
            console.log("Resultado: "+resultado.valor+" y tipo: "+resultado.tipo);
            if(this.condicion instanceof Ternario && resultado.tipo != Tipo.BOOLEAN){
                return resultado;    
            }

            if(resultado.tipo != Tipo.BOOLEAN){
                throw new EIf(this.linea,this.columna,"ERROR TIPO INCORRECTO EN CONDICION",null); 
            }
            if(resultado.valor){
                console.log("dentro de if resultado: "+this.condicionverdadera.valor +" y tipo: "+this.condicionverdadera.tipo);
                return this.condicionverdadera.interpretar(entorno,recolector);

            }else{
                console.log("dentro del else resultado: "+this.condicionfalsa.valor)
                return this.condicionfalsa.interpretar(entorno,recolector);
            }
                
        }catch(e){
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea,this.columna,"ERROR EN OP_TERNARIA",entorno));
        }        
    }
}