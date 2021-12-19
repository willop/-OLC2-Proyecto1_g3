class Seno {
    tipo = TipoAritmetica.SENO;
    seno(izquierda: any, derecha: any): any {
        //IZQUIERDA CON INT Y SUS DERIVACIONES

        if(derecha.tipo == Tipo.ARRAY){
            return this.senoEjecutarArreglo(izquierda, derecha);
        }else if (derecha.tipo == Tipo.INTEGER) {
            return this.senoEjecutar(izquierda, derecha);
        } else if (derecha.tipo == Tipo.DOUBLE) {
            return this.senoEjecutar(izquierda, derecha);
        } else if (derecha.tipo == Tipo.CHAR) {
            return this.senoEjecutar(izquierda, derecha);
        } else {

        }
    }

    // ------------ int + otros
    senoEjecutar(izquierda: any, derecha: any) {
        if (derecha.tipo == Tipo.CHAR) {
            derecha.valor = derecha.valor.charCodeAt(0);
            return new Return(Math.sin(derecha.valor), Tipo.DOUBLE);
        } else {
            return new Return(Math.sin(derecha.valor), Tipo.DOUBLE);
        }

    }

    senoEjecutarArreglo(izquierda: any, derecha: any) {
        var resultado:any;
        var nuevoArreglo=[];
        for(var i = 0; i<derecha.valor.length; i++){
            nuevoArreglo[i] = Math.sin(derecha.valor[i].valor);
        }
        return new Return(nuevoArreglo, Tipo.INTEGER);
    }

}