class Funcion implements Instruccion {
    id: any;
    tipo:any;
    parametros:any;
    instrucciones:any;
    linea: number;
    columna: number;
    constructor (tipo:any,id:any,parametros:any,instrucciones:any,linea: number, columna: number){
        this.linea = linea;
        this.columna = columna;
        this.id = id;
        this.tipo = tipo;
        this.parametros = parametros;
        this.instrucciones = instrucciones;
    }
    
    interpretar(entorno:any,recolector:any){
        try{
            entorno.guardarfuncion(this);

        }catch(e){
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea,this.columna,"ERROR EN FUNCION",entorno));
        }
    }
}