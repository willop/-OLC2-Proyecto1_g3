class AtributoStruct implements Instruccion {
    id:any;
    tipo:any;
    auxtipo:any;
    linea:number
    columna:number;
    constructor (id:any,tipo=null, auxtipo=null, linea: number, columna: number){
        this.linea = linea;
        this.columna = columna;
        this.id = id;
        this.tipo = tipo;
        this.auxtipo = auxtipo;
    }
    
    interpretar(entorno:any,recolector:any){
        try{
            return this;
        }catch(e){
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea,this.columna,"ERROR EN LISTA ATRIBUTOS STRUCTS",entorno));
        }
        
    }
}