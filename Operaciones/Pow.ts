class Pow {
    tipo = TipoAritmetica.POW;
    pow(izquierda: any, derecha: any): any {
        console.log("EL TIPO DE izquierda afuera ES: "+Tipo[izquierda.tipo]);
        console.log("EL TIPO DE DERECHA afuera ES: "+Tipo[derecha.tipo]);
        

        if(izquierda.tipo == Tipo.ARRAY){
            return this.PowEjecutarArreglo(izquierda,derecha);

        }else if(izquierda.tipo == Tipo.BOOLEAN || izquierda.tipo == Tipo.STRING){
            throw new ErrorOperacion(0,0,"NO SE PUEDE ELEVAR "+Tipo[izquierda.tipo],null);

        }else{
            if(derecha.tipo == Tipo.STRING || derecha.tipo == Tipo.BOOLEAN){
                throw new ErrorOperacion(0,0,"NO SE PUEDE ELEVAR ENTEROS A "+Tipo[derecha.tipo],null);                
            }else{
                
                return this.PowEjecutar(izquierda, derecha);                
            }
        }
    }

    // ------------ int + otros
    PowEjecutar(izquierda: any, derecha: any) {
        if(izquierda.tipo == Tipo.CHAR){
            izquierda.valor = izquierda.valor.charCodeAt(0);
            if(derecha.tipo == Tipo.CHAR){
                derecha.valor = derecha.valor.charCodeAt(0);
                return new Return(Math.pow(izquierda.valor,derecha.valor), Tipo.INTEGER);
            }else{
                return new Return(Math.pow(izquierda.valor,derecha.valor), Tipo.INTEGER);
            }
        }else{
            if(derecha.tipo == Tipo.CHAR){
                derecha.valor = derecha.valor.charCodeAt(0);
                return new Return(Math.pow(izquierda.valor,derecha.valor), Tipo.INTEGER);
            }else{
                return new Return(Math.pow(izquierda.valor,derecha.valor), Tipo.INTEGER);
            }
            
        }
        
        
    }

    PowEjecutarArreglo(izquierda:any,derecha:any){

        var nuevoArreglo=[];
        for(var i = 0; i<izquierda.valor.length; i++){
            nuevoArreglo[i] = Math.pow(izquierda.valor[i].valor,derecha.valor);
        }
        return new Return(nuevoArreglo, Tipo.INTEGER);

    }

}