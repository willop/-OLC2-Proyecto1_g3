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
    
    interpretar(recolector:any){
        var resultado = this.expresion.interpretar(recolector);
        var salida = resultado.valor;
        if(this.lineanueva){
            salida = salida +"\n"
        }
        //console.log(salida);
        //tipo sea string resultado
        recolector.consola.push(salida);
    }
}