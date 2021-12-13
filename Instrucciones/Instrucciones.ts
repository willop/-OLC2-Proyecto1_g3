class Instrucciones implements Instruccion {
    instrucciones:any;
    linea:number;
    columna:number;
    nombre:any;
    constructor (instrucciones:any,linea: number, columna: number,nombre:any){
        this.linea = linea;
        this.columna = columna;
        this.instrucciones = instrucciones;
        this.nombre = nombre;
    }
    
    interpretar(entorno:any,recolector:any){
        try{
            var Nuevoentorno = new Entorno(entorno,this.nombre,entorno.numero+1);
            for(var inst in this.instrucciones){
                var aux = this.instrucciones[inst].interpretar(Nuevoentorno,recolector);
                if(aux != null){
                    return aux;
                }                
            }

        }catch(e){
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea,this.columna,"ERROR EN LISTA DE INSTRUCCIONES",entorno));
        }
        
    }
}