class Raiz {
    tipo = TipoAritmetica.RAIZ;
    raiz(izquierda: any, derecha: any): any {
        if (derecha.tipo == Tipo.INTEGER) {                
                return this.RaizEjecutar(izquierda, derecha);
        }else if(derecha.tipo == Tipo.DOUBLE){
            return this.RaizEjecutar(izquierda, derecha);
        }else if(derecha.tipo == Tipo.CHAR){
            return this.RaizEjecutar(izquierda, derecha);
        }else{

        }
    }

    // ------------ int + otros
    RaizEjecutar(izquierda: any, derecha: any) {
        if(derecha.tipo == Tipo.CHAR){
            derecha.valor = derecha.valor.charCodeAt(0);
            return new Return(Math.sqrt(derecha.valor), Tipo.DOUBLE);
        }else{
            return new Return(Math.sqrt(derecha.valor), Tipo.DOUBLE);
        }
        
    }

}