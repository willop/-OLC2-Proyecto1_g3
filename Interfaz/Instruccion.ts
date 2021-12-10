interface Instruccion{
    linea:number;
    columna: number;
    //salidaConsola: string;
    interpretar(entorno:any,recolector:any):any ;

}