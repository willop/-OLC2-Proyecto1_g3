class Declaracion implements Instruccion {
    expresion: any;
    linea: number;
    columna: number;
    tipo:any;
    id:any;
    constructor (expresion:any,linea: number, columna: number,tipo:any,id:any){
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
        this.tipo= tipo;
        this.id = id;
    }
    
    interpretar(entorno:any,recolector:any){
        try{
            var valor = this.expresion.interpretar(entorno,recolector);
            
            if(this.tipo != valor.tipo){
                throw new TipoIncorrecto(this.linea,this.columna,"EL TIPO DECLARADO NO ES IGUAL AL TIPO ASIGNADO" + Tipo[valor.tipo] +" "+ Tipo[this.tipo],entorno);
            }
            entorno.GuardarSimbolo(valor.valor,this.id,this.tipo);

        }catch(e){
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea,this.columna,"ERROR EN DECLARACION",entorno));
        }
        
    }
}