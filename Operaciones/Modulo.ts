class Modulo{
    tipo = TipoAritmetica.MODULO;
    modulo(izquierda: any,derecha:any):any{
        if(izquierda.tipo == Tipo.INTEGER){
            if(derecha.tipo == Tipo.INTEGER){
                //si son enteros
                return this.modulointint(izquierda,derecha);
            }
            if(derecha.tipo == Tipo.DOUBLE){
                //si son enteros
                return this.modulointdouble(izquierda,derecha);
            }
            if(derecha.tipo == Tipo.CHAR){
                //si son enteros
                return this.modulointchar(izquierda,derecha);
            }
            else{
                throw new ErrorOperacion(0,0,"NO SE PUEDE MULTIPLICAR BOOLEANOS Y/O STRINGS",null)
            }
        }
        if(izquierda.tipo == Tipo.DOUBLE){
            if(derecha.tipo == Tipo.INTEGER){
                //si son enteros
                return this.modulodoubleint(izquierda,derecha);
            }
            if(derecha.tipo == Tipo.DOUBLE){
                //si son enteros
                return this.modulodoubledouble(izquierda,derecha);
            }
            if(derecha.tipo == Tipo.CHAR){
                //si son enteros
                return this.modulodoublechar(izquierda,derecha);
            }
            else{
                throw new ErrorOperacion(0,0,"NO SE PUEDE MULTIPLICAR BOOLEANOS Y/O STRINGS",null)
            }
        }
        if(izquierda.tipo == Tipo.CHAR){
            if(derecha.tipo == Tipo.INTEGER){
                //si son enteros
                return this.modulocharint(izquierda,derecha);
            }
            if(derecha.tipo == Tipo.DOUBLE){
                //si son enteros
                return this.modulochardouble(izquierda,derecha);
            }
            if(derecha.tipo == Tipo.CHAR){
                //si son enteros
                return this.modulocharchar(izquierda,derecha);
            }
            else{
                throw new ErrorOperacion(0,0,"NO SE PUEDE MULTIPLICAR BOOLEANOS Y/O STRINGS",null)
            }
        }
        else{
            throw new ErrorOperacion(0,0,"NO SE PUEDE MULTIPLICAR BOOLEANOS Y/O STRINGS",null)
        }
    }

    modulointint(izquierda: any,derecha:any):any{        
        console.log("Res modulo:  "+izquierda.valor % derecha.valor);
        return new Return(izquierda.valor % derecha.valor,Tipo.INTEGER);
    }
    modulointdouble(izquierda: any,derecha:any):any{        
        return new Return(izquierda.valor % derecha.valor,Tipo.DOUBLE);
    }
    modulointchar(izquierda: any,derecha:any):any{
        derecha.valor = derecha.valor.charCodeAt(0);
        return new Return(izquierda.valor % derecha.valor,Tipo.INTEGER);
    }

    modulodoubleint(izquierda: any,derecha:any):any{        
        return new Return(izquierda.valor % derecha.valor,Tipo.DOUBLE);
    }
    modulodoubledouble(izquierda: any,derecha:any):any{        
        return new Return(izquierda.valor % derecha.valor,Tipo.DOUBLE);
    }
    modulodoublechar(izquierda: any,derecha:any):any{
        derecha.valor = derecha.valor.charCodeAt(0);
        return new Return(izquierda.valor % derecha.valor,Tipo.DOUBLE);
    }

    modulocharint(izquierda: any,derecha:any):any{
        izquierda.valor = izquierda.valor.charCodeAt(0);       
        return new Return(izquierda.valor % derecha.valor,Tipo.DOUBLE);
    }
    modulochardouble(izquierda: any,derecha:any):any{        
        izquierda.valor = izquierda.valor.charCodeAt(0);
        return new Return(izquierda.valor % derecha.valor,Tipo.DOUBLE);
    }
    modulocharchar(izquierda: any,derecha:any):any{
        izquierda.valor = izquierda.valor.charCodeAt(0);
        derecha.valor = derecha.valor.charCodeAt(0);
        return new Return(izquierda.valor % derecha.valor,Tipo.DOUBLE);
    }
}