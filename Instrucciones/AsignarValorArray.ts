class AsignarValorArray implements Instruccion {
    expresion: any;
    id: any;
    linea: number;
    columna: number;
    constructor(expresion: any,id:any, linea: number, columna: number) {
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
        this.id = id;

    }

    interpretar(entorno: any, recolector: any) {
        try {
            var value = this.expresion.interpretar(entorno,recolector);
            console.log("Imprimiendo value");
            console.log(value);
            if(this.id instanceof AccesoArray){
                var variable = this.id.interpretar(entorno,recolector);
                console.log("Imprimiendo variable");
                console.log(variable);
            }
            if(variable.auxtipo != value.tipo){
                throw new TipoIncorrecto(this.linea,this.columna,"ERROR EN ASIGNACION DE TIPO ARRAY",null);
            }
            variable.valor = value.valor;

        } catch (e) {
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea, this.columna, "ERROR EN ASIGNAR VALOR ARRAY", entorno));
        }

    }
}