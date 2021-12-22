class CrearStruct implements Instruccion {
    id:any;
    linea:number;
    columna:number;
    atributos:any;
    tipo: any;
    obtenido:AtributoStruct;
    constructor (id:any,tipo:any, atributos:any,linea: number, columna: number){
        this.linea = linea;
        this.columna = columna;
        this.id = id;
        this.atributos = atributos;
        this.tipo = tipo;
        this.obtenido= new AtributoStruct(0,null,null,0,0);
    }
    
    interpretar(entorno:any,recolector:any){
        try{
            var auxiliaratributos = this.atributos;
            this.atributos= new Map <String,AtributoStruct>()

            for(var i =0; i<auxiliaratributos.length; i++){
                auxiliaratributos[i].orden = i;
                this.atributos.set(auxiliaratributos[i].id,auxiliaratributos[i]);
            }
            entorno.guardarStruct(this);
        }catch(e){
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea,this.columna,"ERROR EN CREAR STRUCT",entorno));
        }
        
    }
    
    BuscarPorOrden(a:number):AtributoStruct{
        
        this.atributos.forEach((value:AtributoStruct,key:string) => {
            if(value.orden==a){
                this.obtenido = value;
                return;
            }
        });
        return this.obtenido;

    }
}