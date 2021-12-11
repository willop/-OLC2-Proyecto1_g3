class MenorIgual {
    tipo = TipoRelacional.MENOR_IGUAL;
    menorigual(izquierda: any, derecha: any): any {
        //IGUALACION IZQUIERDA INT VS DERECHA
        if (izquierda.tipo == Tipo.INTEGER) {
            if (derecha.tipo == Tipo.INTEGER) {
                return this.menorigualintint(izquierda, derecha);
            } else if (derecha.tipo == Tipo.DOUBLE) {
                return this.menorigualintdouble(izquierda, derecha);
            } else if (derecha.tipo == Tipo.CHAR) {
                return this.menorigualintchar(izquierda, derecha);
            } else {
                throw new ERelacional(0, 0, "TIPOS DE DATOS DIFERENTES", null)
            }
        }
        else if (izquierda.tipo == Tipo.DOUBLE) {
            if (derecha.tipo == Tipo.INTEGER) {
                return this.menorigualdoubleint(izquierda, derecha);
            } else if (derecha.tipo == Tipo.DOUBLE) {
                return this.menorigualdoubledouble(izquierda, derecha);
            } else if (derecha.tipo == Tipo.CHAR) {
                return this.menorigualdoublechar(izquierda, derecha);
            } else {
                throw new ERelacional(0, 0, "TIPOS DE DATOS DIFERENTES", null)
            }
        }
        else if (izquierda.tipo == Tipo.CHAR) {
            if (derecha.tipo == Tipo.INTEGER) {
                return this.menorigualcharint(izquierda, derecha);
            } else if (derecha.tipo == Tipo.DOUBLE) {
                return this.menorigualchardouble(izquierda, derecha);
            } else if (derecha.tipo == Tipo.CHAR) {
                return this.menorigualcharchar(izquierda, derecha);
            } else {
                throw new ERelacional(0, 0, "TIPOS DE DATOS DIFERENTES", null)
            }
        }


    }

    // ------------ int <= otros
    menorigualintint(izquierda: any, derecha: any) {
        return new Return(izquierda.valor <= derecha.valor, Tipo.BOOLEAN);
    }
    menorigualintdouble(izquierda: any, derecha: any) {
        return new Return(izquierda.valor <= derecha.valor, Tipo.BOOLEAN);
    }
    menorigualintchar(izquierda: any, derecha: any) {
        derecha.valor = derecha.valor.charCodeAt(0);
        return new Return(izquierda.valor <= derecha.valor, Tipo.BOOLEAN);
    }

    //--------------- DOUBLE <= OTROS
    menorigualdoubleint(izquierda: any, derecha: any) {
        return new Return(izquierda.valor <= derecha.valor, Tipo.BOOLEAN);
    }
    menorigualdoubledouble(izquierda: any, derecha: any) {
        return new Return(izquierda.valor <= derecha.valor, Tipo.BOOLEAN);
    }
    menorigualdoublechar(izquierda: any, derecha: any) {
        derecha.valor = derecha.valor.charCodeAt(0);
        return new Return(izquierda.valor <= derecha.valor, Tipo.BOOLEAN);
    }

    //--------------- CHAR <= OTROS
    menorigualcharint(izquierda: any, derecha: any) {
        izquierda.valor = izquierda.valor.charCodeAt(0);
        return new Return(izquierda.valor <= derecha.valor, Tipo.BOOLEAN);
    }
    menorigualchardouble(izquierda: any, derecha: any) {
        izquierda.valor = izquierda.valor.charCodeAt(0);
        return new Return(izquierda.valor <= derecha.valor, Tipo.BOOLEAN);
    }
    menorigualcharchar(izquierda: any, derecha: any) {
        izquierda.valor = izquierda.valor.charCodeAt(0);
        derecha.valor = derecha.valor.charCodeAt(0);
        return new Return(izquierda.valor <= derecha.valor, Tipo.BOOLEAN);
    }
}