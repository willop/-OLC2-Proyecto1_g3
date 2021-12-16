class Acceso implements Expresion {
    linea: number;
    columna: number;
    id:any;
    constructor (id:any,linea: number, columna: number){
        this.linea = linea;
        this.columna = columna;
        this.id = id;
    }

    interpretar(entorno:any,recolector:any){
        var a = entorno.ObtenerSimbolo(this.id);
        if (a == null){
            throw new VariableNoDeclarada(this.linea,this.columna,"LA VARIABLE "+this.id+" NO ESTA DECLARADA",entorno);

        }        
        console.log(new Return(a.valor,a.tipo,a.auxtipo));
        return new Return(a.valor,a.tipo,a.auxtipo);
    }
}