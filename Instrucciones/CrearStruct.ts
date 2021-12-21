class CrearStruct implements Instruccion {
    id:any;
    linea:number;
    columna:number;
    atributos:any;
    tipo: any;
    constructor (id:any,tipo:any, atributos:any,linea: number, columna: number){
        this.linea = linea;
        this.columna = columna;
        this.id = id;
        this.atributos = atributos;
        this.tipo = tipo;
    }
    
    interpretar(entorno:any,recolector:any){
        try{
            entorno.guardarStruct(this);
        }catch(e){
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea,this.columna,"ERROR EN CREAR STRUCT",entorno));
        }
        
    }
}