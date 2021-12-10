class Literal implements Expresion {
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
        return new Return(this.valor,this.tipo);
    }
}