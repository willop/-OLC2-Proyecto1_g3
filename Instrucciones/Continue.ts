class Continue implements Instruccion {
    linea: number;
    columna: number;
    constructor (linea: number, columna: number){
        this.linea = linea;
        this.columna = columna;
    }
    
    interpretar(entorno:any,recolector:any){
        try{
                return new Return(null,Tipo.CONTINUE);

        }catch(e){
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea,this.columna,"ERROR EN CONTINUE",entorno));
        }
        
    }
}