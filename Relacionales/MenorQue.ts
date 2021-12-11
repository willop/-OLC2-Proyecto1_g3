class MenorQue {
    tipo = TipoRelacional.MENOR_QUE;
    menorque(izquierda: any, derecha: any): any {
        //IGUALACION IZQUIERDA INT VS DERECHA
        if (izquierda.tipo == Tipo.INTEGER) {
            if (derecha.tipo == Tipo.INTEGER) {
                return this.menorqueintint(izquierda, derecha);
            } else if (derecha.tipo == Tipo.DOUBLE) {
                return this.menorqueintdouble(izquierda, derecha);
            } else if (derecha.tipo == Tipo.CHAR) {
                return this.menorqueintchar(izquierda, derecha);
            } else {
                throw new ERelacional(0, 0, "TIPOS DE DATOS DIFERENTES", null)
            }
        }
        else if (izquierda.tipo == Tipo.DOUBLE) {
            if (derecha.tipo == Tipo.INTEGER) {
                return this.menorquedoubleint(izquierda, derecha);
            } else if (derecha.tipo == Tipo.DOUBLE) {
                return this.menorquedoubledouble(izquierda, derecha);
            } else if (derecha.tipo == Tipo.CHAR) {
                return this.menorquedoublechar(izquierda, derecha);
            } else {
                throw new ERelacional(0, 0, "TIPOS DE DATOS DIFERENTES", null)
            }
        }
        else if (izquierda.tipo == Tipo.CHAR) {
            if (derecha.tipo == Tipo.INTEGER) {
                return this.menorquecharint(izquierda, derecha);
            } else if (derecha.tipo == Tipo.DOUBLE) {
                return this.menorquechardouble(izquierda, derecha);
            } else if (derecha.tipo == Tipo.CHAR) {
                return this.menorquecharchar(izquierda, derecha);
            } else {
                throw new ERelacional(0, 0, "TIPOS DE DATOS DIFERENTES", null)
            }
        }


    }

    // ------------ int < otros
    menorqueintint(izquierda: any, derecha: any) {
        console.log("dentro de mayorqueintint");
        return new Return(izquierda.valor < derecha.valor, Tipo.BOOLEAN);
    }
    menorqueintdouble(izquierda: any, derecha: any) {
        console.log("dentro de mayorqueintdouble");
        return new Return(izquierda.valor < derecha.valor, Tipo.BOOLEAN);
    }
    menorqueintchar(izquierda: any, derecha: any) {
        console.log("dentro de mayorqueintchar");
        derecha.valor = derecha.valor.charCodeAt(0);
        return new Return(izquierda.valor < derecha.valor, Tipo.BOOLEAN);
    }

    //--------------- DOUBLE < OTROS
    menorquedoubleint(izquierda: any, derecha: any) {
        console.log("dentro de mayorquedoubleint");
        return new Return(izquierda.valor < derecha.valor, Tipo.BOOLEAN);
    }
    menorquedoubledouble(izquierda: any, derecha: any) {
        console.log("dentro de mayorquedoubledouble");
        return new Return(izquierda.valor < derecha.valor, Tipo.BOOLEAN);
    }
    menorquedoublechar(izquierda: any, derecha: any) {
        console.log("dentro de mayorquedoublechar");
        derecha.valor = derecha.valor.charCodeAt(0);
        return new Return(izquierda.valor < derecha.valor, Tipo.BOOLEAN);
    }

    //--------------- CHAR < OTROS
    menorquecharint(izquierda: any, derecha: any) {
        izquierda.valor = izquierda.valor.charCodeAt(0);
        console.log("dentro de mayorquecharint");
        return new Return(izquierda.valor < derecha.valor, Tipo.BOOLEAN);
    }
    menorquechardouble(izquierda: any, derecha: any) {
        izquierda.valor = izquierda.valor.charCodeAt(0);
        console.log("dentro de mayorquechardouble");
        return new Return(izquierda.valor < derecha.valor, Tipo.BOOLEAN);
    }
    menorquecharchar(izquierda: any, derecha: any) {
        console.log("dentro de mayorquecharchar");
        izquierda.valor = izquierda.valor.charCodeAt(0);
        derecha.valor = derecha.valor.charCodeAt(0);
        return new Return(izquierda.valor < derecha.valor, Tipo.BOOLEAN);
    }
}