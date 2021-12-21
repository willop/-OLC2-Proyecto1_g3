class AccesoStruct implements Expresion {
    linea: number;
    columna: number;
    //este atributo es el nombre del acceso, por ejemplo b.nombre
    atributo: any;
    id:any;
    AccesoPorAsignacion:any;
    Variable:any;
    //ID puede ser acceso o acceso array 
    constructor(atributo: any,id:any, linea: number, columna: number) {
        this.linea = linea;
        this.columna = columna;
        this.atributo = atributo;
        this.id = id;
        this.AccesoPorAsignacion = false;
        this.Variable= null;
    }

    interpretar(entorno: any, recolector: any) {
        try {
            var variable:any;
           if(this.id instanceof AccesoStruct){
               if(this.AccesoPorAsignacion){
                   this.id.AccesoPorAsignacion = true;
               }
               variable = this.id.interpretar(entorno,recolector);
           }else{
               variable = entorno.ObtenerSimbolo(this.id.id);
           }
           if(variable.atributos.has(this.atributo)){
               if(this.AccesoPorAsignacion){
                   this.Variable = variable;
               }
               return variable.atributos.get(this.atributo);

           }else{
            throw new AtributoNoExiste(this.linea, this.columna, "ATRIBUTO NO EXISTE", this);
           }

        } catch (e) {
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea, this.columna, "ERROR EN ACCESO STRUCT", entorno));
        }

    }
}