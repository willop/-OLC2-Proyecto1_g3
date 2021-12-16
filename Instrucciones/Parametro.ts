class Parametro implements Instruccion {
    id: any;
    tipo:any;
    auxtipo:any;
    linea: number;
    columna: number;
    constructor (id:any,tipo:any,auxtipo:any,linea: number, columna: number){
        this.linea = linea;
        this.columna = columna;
        this.id = id;
        this.auxtipo = auxtipo;
        this.tipo = tipo;
    }
    
    interpretar(entorno:any,recolector:any){
        try{
            return this;

        }catch(e){
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea,this.columna,"ERROR EN PARAMETRO FUNCION",entorno));
        }
    }
}