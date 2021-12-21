class DeclararStruct implements Instruccion {
    id:any;
    tipo:any;
    linea:number;
    columna:number;
    constructor (id:any,tipo:any,linea: number, columna: number){
        this.linea = linea;
        this.columna = columna;
        this.id = id;
        this.tipo = tipo;
    }
    
    interpretar(entorno:any,recolector:any){
        try{
            var getStruct = entorno.obtenerStruct(this.tipo);
            if(getStruct == null){
                throw new StructNoEncontrado(this.linea,this.columna,"ERROR EN DECLARAR STRUCT, NO ENCONTRADO ",entorno);
            }
            var arreglo=new Map<String,Return>();
            getStruct.atributos.forEach((value:AtributoStruct,key:string) => {
                var valor = new Literal(null,Tipo.NULL,this.linea,this.columna).interpretar(entorno,recolector);
                arreglo.set(key,valor);
            });
            entorno.guardarVariableStruct(this.id,arreglo,this.tipo);
        }catch(e){
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea,this.columna,"ERROR EN DECLARAR STRUCTS",entorno));
        }
        
    }
}