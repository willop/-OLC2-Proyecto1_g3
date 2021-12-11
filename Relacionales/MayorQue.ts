class MayorQue {
    tipo = TipoRelacional.MAYOR_QUE;
    mayorque(izquierda: any, derecha: any): any {
        //IGUALACION IZQUIERDA INT VS DERECHA
        if (izquierda.tipo == Tipo.INTEGER) {
            if (derecha.tipo == Tipo.INTEGER) {
                return this.mayorqueintint(izquierda, derecha);
            } else if (derecha.tipo == Tipo.DOUBLE) {
                return this.mayorqueintdouble(izquierda, derecha);
            } else if (derecha.tipo == Tipo.CHAR) {
                return this.mayorqueintchar(izquierda, derecha);
            } else {
                throw new ERelacional(0, 0, "TIPOS DE DATOS DIFERENTES", null)
            }
        }
        else if (izquierda.tipo == Tipo.DOUBLE) {
            if (derecha.tipo == Tipo.INTEGER) {
                return this.mayorquedoubleint(izquierda, derecha);
            } else if (derecha.tipo == Tipo.DOUBLE) {
                return this.mayorquedoubledouble(izquierda, derecha);
            } else if (derecha.tipo == Tipo.CHAR) {
                return this.mayorquedoublechar(izquierda, derecha);
            } else {
                throw new ERelacional(0, 0, "TIPOS DE DATOS DIFERENTES", null)
            }
        }
        else if (izquierda.tipo == Tipo.CHAR) {
            if (derecha.tipo == Tipo.INTEGER) {
                return this.mayorquecharint(izquierda, derecha);
            } else if (derecha.tipo == Tipo.DOUBLE) {
                return this.mayorquechardouble(izquierda, derecha);
            } else if (derecha.tipo == Tipo.CHAR) {
                return this.mayorquecharchar(izquierda, derecha);
            } else {
                throw new ERelacional(0, 0, "TIPOS DE DATOS DIFERENTES", null)
            }
        }


    }

    // ------------ int > otros
    mayorqueintint(izquierda: any, derecha: any) {
        console.log("dentro de mayorqueintint");
        return new Return(izquierda.valor > derecha.valor, Tipo.BOOLEAN);
    }
    mayorqueintdouble(izquierda: any, derecha: any) {
        console.log("dentro de mayorqueintdouble");
        return new Return(izquierda.valor > derecha.valor, Tipo.BOOLEAN);
    }
    mayorqueintchar(izquierda: any, derecha: any) {
        console.log("dentro de mayorqueintchar");
        derecha.valor = derecha.valor.charCodeAt(0);
        return new Return(izquierda.valor > derecha.valor, Tipo.BOOLEAN);
    }

    //--------------- DOUBLE > OTROS
    mayorquedoubleint(izquierda: any, derecha: any) {
        console.log("dentro de mayorquedoubleint");
        return new Return(izquierda.valor > derecha.valor, Tipo.BOOLEAN);
    }
    mayorquedoubledouble(izquierda: any, derecha: any) {
        console.log("dentro de mayorquedoubledouble");
        return new Return(izquierda.valor > derecha.valor, Tipo.BOOLEAN);
    }
    mayorquedoublechar(izquierda: any, derecha: any) {
        console.log("dentro de mayorquedoublechar");
        derecha.valor = derecha.valor.charCodeAt(0);
        return new Return(izquierda.valor > derecha.valor, Tipo.BOOLEAN);
    }

    //--------------- CHAR > OTROS
    mayorquecharint(izquierda: any, derecha: any) {
        izquierda.valor = izquierda.valor.charCodeAt(0);
        console.log("dentro de mayorquecharint");
        return new Return(izquierda.valor > derecha.valor, Tipo.BOOLEAN);
    }
    mayorquechardouble(izquierda: any, derecha: any) {
        izquierda.valor = izquierda.valor.charCodeAt(0);
        console.log("dentro de mayorquechardouble");
        return new Return(izquierda.valor > derecha.valor, Tipo.BOOLEAN);
    }
    mayorquecharchar(izquierda: any, derecha: any) {
        console.log("dentro de mayorquecharchar");
        izquierda.valor = izquierda.valor.charCodeAt(0);
        derecha.valor = derecha.valor.charCodeAt(0);
        return new Return(izquierda.valor > derecha.valor, Tipo.BOOLEAN);
    }
}
