class MayorIgual {
    tipo = TipoRelacional.MAYOR_IGUAL;
    mayorigual(izquierda: any, derecha: any): any {
        //IGUALACION IZQUIERDA INT VS DERECHA
        if (izquierda.tipo == Tipo.INTEGER) {
            if (derecha.tipo == Tipo.INTEGER) {
                return this.mayorigualintint(izquierda, derecha);
            } else if (derecha.tipo == Tipo.DOUBLE) {
                return this.mayorigualintdouble(izquierda, derecha);
            } else if (derecha.tipo == Tipo.CHAR) {
                return this.mayorigualintchar(izquierda, derecha);
            } else {
                throw new ERelacional(0, 0, "TIPOS DE DATOS DIFERENTES", null)
            }
        }
        else if (izquierda.tipo == Tipo.DOUBLE) {
            if (derecha.tipo == Tipo.INTEGER) {
                return this.mayorigualdoubleint(izquierda, derecha);
            } else if (derecha.tipo == Tipo.DOUBLE) {
                return this.mayorigualdoubledouble(izquierda, derecha);
            } else if (derecha.tipo == Tipo.CHAR) {
                return this.mayorigualdoublechar(izquierda, derecha);
            } else {
                throw new ERelacional(0, 0, "TIPOS DE DATOS DIFERENTES", null)
            }
        }
        else if (izquierda.tipo == Tipo.CHAR) {
            if (derecha.tipo == Tipo.INTEGER) {
                return this.mayorigualcharint(izquierda, derecha);
            } else if (derecha.tipo == Tipo.DOUBLE) {
                return this.mayorigualchardouble(izquierda, derecha);
            } else if (derecha.tipo == Tipo.CHAR) {
                return this.mayorigualcharchar(izquierda, derecha);
            } else {
                throw new ERelacional(0, 0, "TIPOS DE DATOS DIFERENTES", null)
            }
        }


    }

    // ------------ int >= otros
    mayorigualintint(izquierda: any, derecha: any) {
        console.log("dentro de mayorqueintint");
        return new Return(izquierda.valor >= derecha.valor, Tipo.BOOLEAN);
    }
    mayorigualintdouble(izquierda: any, derecha: any) {
        console.log("dentro de mayorqueintdouble");
        return new Return(izquierda.valor >= derecha.valor, Tipo.BOOLEAN);
    }
    mayorigualintchar(izquierda: any, derecha: any) {
        console.log("dentro de mayorqueintchar");
        derecha.valor = derecha.valor.charCodeAt(0);
        return new Return(izquierda.valor >= derecha.valor, Tipo.BOOLEAN);
    }

    //--------------- DOUBLE >= OTROS
    mayorigualdoubleint(izquierda: any, derecha: any) {
        console.log("dentro de mayorquedoubleint");
        return new Return(izquierda.valor >= derecha.valor, Tipo.BOOLEAN);
    }
    mayorigualdoubledouble(izquierda: any, derecha: any) {
        console.log("dentro de mayorquedoubledouble");
        return new Return(izquierda.valor >= derecha.valor, Tipo.BOOLEAN);
    }
    mayorigualdoublechar(izquierda: any, derecha: any) {
        console.log("dentro de mayorquedoublechar");
        derecha.valor = derecha.valor.charCodeAt(0);
        return new Return(izquierda.valor >= derecha.valor, Tipo.BOOLEAN);
    }

    //--------------- CHAR >= OTROS
    mayorigualcharint(izquierda: any, derecha: any) {
        izquierda.valor = izquierda.valor.charCodeAt(0);
        console.log("dentro de mayorquecharint");
        return new Return(izquierda.valor >= derecha.valor, Tipo.BOOLEAN);
    }
    mayorigualchardouble(izquierda: any, derecha: any) {
        izquierda.valor = izquierda.valor.charCodeAt(0);
        console.log("dentro de mayorquechardouble");
        return new Return(izquierda.valor >= derecha.valor, Tipo.BOOLEAN);
    }
    mayorigualcharchar(izquierda: any, derecha: any) {
        console.log("dentro de mayorquecharchar");
        izquierda.valor = izquierda.valor.charCodeAt(0);
        derecha.valor = derecha.valor.charCodeAt(0);
        return new Return(izquierda.valor >= derecha.valor, Tipo.BOOLEAN);
    }
}
