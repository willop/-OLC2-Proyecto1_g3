class Declaracion implements Instruccion {
    expresion: any;
    linea: number;
    columna: number;
    tipo: any;
    id: any;
    constructor(expresion: any, linea: number, columna: number, tipo: any, id: any) {
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
        this.tipo = tipo;
        this.id = id;
    }

    interpretar(entorno: any, recolector: any) {
        try {
            //console.log("esta entrando aca declaracion? "+this.id+" tipo: "+this.tipo+" exp: "+this.expresion);
            //si viene expresion nula
            if (this.expresion == null) {
                //console.log("entonces aca tambien entras?");
                switch (this.tipo) {
                    case Tipo.INTEGER:
                        entorno.GuardarSimbolo(0, this.id, this.tipo);
                        break;
                    case Tipo.DOUBLE:
                        console.log("si es multiple double");
                        entorno.GuardarSimbolo(Number(0).toFixed(1), this.id, this.tipo);
                        break;
                    case Tipo.STRING:
                        entorno.GuardarSimbolo("", this.id, this.tipo);
                        break;
                    case Tipo.CHAR:
                        entorno.GuardarSimbolo('', this.id, this.tipo);
                        break;
                    default:
                        entorno.GuardarSimbolo(null, this.id, this.tipo);
                }

            }//si la expresion tiene un valor
            else {
                var valor = this.expresion.interpretar(entorno, recolector);
                if (this.tipo != valor.tipo) {
                    throw new TipoIncorrecto(this.linea, this.columna, "EL TIPO DECLARADO NO ES IGUAL AL TIPO ASIGNADO" + Tipo[valor.tipo] + " " + Tipo[this.tipo], entorno);
                }
                entorno.GuardarSimbolo(valor.valor, this.id, this.tipo);
            }
        } catch (e) {
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea, this.columna, "ERROR EN DECLARACION", entorno));
        }

    }
}