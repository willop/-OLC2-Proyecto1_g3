interface Expresion{
    linea:number;
    columna: number;
    //salidaConsola: string;
    interpretar(entorno:any, recolector:any):any ;
}