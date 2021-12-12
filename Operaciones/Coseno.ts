class Coseno {
    tipo = TipoAritmetica.COSENO;
    coseno(izquierda: any, derecha: any): any {
        //IZQUIERDA CON INT Y SUS DERIVACIONES
        if (derecha.tipo == Tipo.INTEGER) {                
                return this.cosenoEjecutar(izquierda, derecha);
        }else if(derecha.tipo == Tipo.DOUBLE){
            return this.cosenoEjecutar(izquierda, derecha);
        }else if(derecha.tipo == Tipo.CHAR){
            return this.cosenoEjecutar(izquierda, derecha);
        }else{

        }
    }

    // ------------ int + otros
    cosenoEjecutar(izquierda: any, derecha: any) {
        if(derecha.tipo == Tipo.CHAR){
            derecha.valor = derecha.valor.charCodeAt(0);
            return new Return(Math.cos(derecha.valor), Tipo.DOUBLE);
        }else{
            return new Return(Math.cos(derecha.valor), Tipo.DOUBLE);
        }
        
    }

}