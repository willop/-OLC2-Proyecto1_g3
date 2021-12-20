"use strict";
class DeclaracionMultiple {
    constructor(linea, columna, tipo, arregloid) {
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.arregloid = arregloid;
    }
    interpretar(entorno, recolector) {
        try {
            console.log("Arreglo");
            console.log(this.arregloid);
            for (let i = 0; i < this.arregloid.length; i++) {
                //console.log("esta entrando aca declaracion? "+this.id+" tipo: "+this.tipo+" exp: "+this.expresion);
                //si viene expresion nula
                //console.log("entonces aca tambien entras?");
                switch (this.tipo) {
                    case Tipo.INTEGER:
                        entorno.GuardarSimbolo(0, this.arregloid[i], this.tipo);
                        break;
                    case Tipo.DOUBLE:
                        entorno.GuardarSimbolo(Number(0).toFixed(1), this.arregloid[i], this.tipo);
                        break;
                    case Tipo.STRING:
                        entorno.GuardarSimbolo("", this.arregloid[i], this.tipo);
                        break;
                    case Tipo.CHAR:
                        entorno.GuardarSimbolo('', this.arregloid[i], this.tipo);
                        break;
                    default:
                        entorno.GuardarSimbolo(null, this.arregloid[i], this.tipo);
                }
            }
        }
        catch (e) {
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea, this.columna, "ERROR EN DECLARACION", entorno));
        }
    }
}
