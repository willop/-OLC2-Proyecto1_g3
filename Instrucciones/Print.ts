class Print implements Instruccion {
    expresion: any;
    linea: number;
    columna: number;
    lineanueva: boolean;
    constructor (expresion:any,linea: number, columna: number,lineanueva: boolean){
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
        this.lineanueva = lineanueva;
    }
    
    interpretar(entorno:any,recolector:any){
        try{
            var resultado = this.expresion.interpretar(entorno,recolector);
            var salida = resultado.valor;
            if(this.lineanueva){
                salida = "\n"+ salida 
            }
            recolector.consola.push(salida);
        }catch(e){
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea,this.columna,"ERROR EN PRINT",entorno));
        }        
    }
}