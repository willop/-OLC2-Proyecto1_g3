class AccesoArray implements Expresion {
    linea: number;
    columna: number;
    indice: any;
    id:any;
    //ID puede ser acceso o acceso array 
    constructor(indice: any,id:any, linea: number, columna: number) {
        this.linea = linea;
        this.columna = columna;
        this.indice = indice;
        this.id = id;
    }

    interpretar(entorno: any, recolector: any) {
        try {
            var index = this.indice.interpretar(entorno,recolector);
            var NombreId = this.id.interpretar(entorno,recolector);

            return NombreId.valor[index.valor];

        } catch (e) {
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea, this.columna, "ERROR EN ACCESO ARRAY", entorno));
        }

    }
}