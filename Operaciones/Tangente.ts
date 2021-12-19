class Tangente {
    tipo = TipoAritmetica.TANGENTE;
    tangente(izquierda: any, derecha: any): any {
        //IZQUIERDA CON INT Y SUS DERIVACIONES
        if(derecha.tipo == Tipo.ARRAY){
            return this.TangenteEjecutarArreglo(izquierda, derecha);
        }else if (derecha.tipo == Tipo.INTEGER) {                
                return this.TangenteEjecutar(izquierda, derecha);
        }else if(derecha.tipo == Tipo.DOUBLE){
            return this.TangenteEjecutar(izquierda, derecha);
        }else if(derecha.tipo == Tipo.CHAR){
            return this.TangenteEjecutar(izquierda, derecha);
        }else{

        }
    }

    // ------------ int + otros
    TangenteEjecutar(izquierda: any, derecha: any) {
        if(derecha.tipo == Tipo.CHAR){
            derecha.valor = derecha.valor.charCodeAt(0);
            return new Return(Math.tan(derecha.valor), Tipo.DOUBLE);
        }else{
            return new Return(Math.tan(derecha.valor), Tipo.DOUBLE);
        }
        
    }

    TangenteEjecutarArreglo(izquierda: any, derecha: any) {
        var nuevoArreglo=[];
        for(var i = 0; i<derecha.valor.length; i++){
            nuevoArreglo[i] = Math.tan(derecha.valor[i].valor);
        }
        return new Return(nuevoArreglo, Tipo.INTEGER);
    }

}