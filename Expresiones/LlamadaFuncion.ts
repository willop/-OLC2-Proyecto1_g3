class LlamadaFuncion implements Expresion {
    linea: number;
    columna: number;
    valor: any;
    tipo: any;
    constructor (valor: any,tipo: any,linea: number, columna: number){
        this.linea = linea;
        this.columna = columna;
        this.valor = valor;
        this.tipo = tipo;
    }

    interpretar(entorno:any,recolector:any){
        return new Return(0,Tipo.INTEGER);
    }
}