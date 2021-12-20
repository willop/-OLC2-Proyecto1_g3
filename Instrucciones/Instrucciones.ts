class Instrucciones implements Instruccion {
    instrucciones:any;
    linea:number;
    columna:number;
    nombre:any;
    crearentorno: any;
    constructor (instrucciones:any,linea: number, columna: number,nombre:any,crearentorno=true){
        this.linea = linea;
        this.columna = columna;
        this.instrucciones = instrucciones;
        this.nombre = nombre;
        this.crearentorno = crearentorno;
    }
    
    interpretar(entorno:any,recolector:any){
        try{
            var Nuevoentorno = this.crearentorno ? new Entorno(entorno,this.nombre,entorno.numero+1) : entorno;
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