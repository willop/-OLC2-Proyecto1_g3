class DeclararArray implements Instruccion {
    id:any;
    expresiones: any;
    scope: any;
    tipo:any;
    linea: number;
    columna: number;
    constructor (id:any,expresiones:any,scope:any,tipo:any,linea: number, columna: number){
        this.linea = linea;
        this.columna = columna;
        this.id = id
        this.scope = scope;
        this.expresiones = expresiones;

    }
    
    interpretar(entorno:any,recolector:any){
        try{
            var value = this.expresiones.interpretar(entorno,recolector);


        }catch(e){
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea,this.columna,"ERROR EN DECLARACION ARRAY",entorno));
        }
        
    }

}