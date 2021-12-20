class Asignacion implements Instruccion {
    expresion: any;
    linea: number;
    columna: number;
    id:any;
    constructor (expresion:any,linea: number, columna: number,id:any){
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
        this.id = id;
    }
    
    interpretar(entorno:any,recolector:any){
        console.log("Hola desde asignacion viene con valores: id: "+this.id.id+" con expresion: ");
        console.log(this.expresion)
        try{
            
           
            var variable = entorno.ObtenerSimbolo(this.id.id);
            var valor = this.expresion.interpretar(entorno,recolector);
            console.log("--------Variable-------");
            console.log(variable);
            console.log("--------valor-------");
            console.log(valor);

            if(variable.tipo != valor.tipo){
                throw new TipoIncorrecto(this.linea,this.columna,"EL TIPO ASIGNADO NO ES IGUAL AL TIPO DECLARADO" + Tipo[valor.tipo] +" "+ Tipo[variable.tipo],entorno);
            }
            
            entorno.ActualizarSimbolo(valor.valor,this.id.id,variable.tipo);

        }catch(e){
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea,this.columna,"ERROR EN ASIGNACION",entorno));
        }
        
    }
}