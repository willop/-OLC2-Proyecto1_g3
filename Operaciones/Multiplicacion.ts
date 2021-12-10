class Multiplicacion{
    tipo = TipoAritmetica.MULTIPLICACION;
    multiplicar(izquierda: any,derecha:any):any{
        if(izquierda.tipo == Tipo.INTEGER){
            if(derecha.tipo == Tipo.INTEGER){
                //si son enteros
                return this.multiplicarintint(izquierda,derecha);
            }
            if(derecha.tipo == Tipo.DOUBLE){
                //si son enteros
                return this.multiplicarintdouble(izquierda,derecha);
            }
            if(derecha.tipo == Tipo.CHAR){
                //si son enteros
                return this.multiplicarintchar(izquierda,derecha);
            }
            else{
                throw new ErrorOperacion(0,0,"NO SE PUEDE MULTIPLICAR BOOLEANOS Y/O STRINGS",null)
            }
        }
        if(izquierda.tipo == Tipo.DOUBLE){
            if(derecha.tipo == Tipo.INTEGER){
                //si son enteros
                return this.multiplicardoubleint(izquierda,derecha);
            }
            if(derecha.tipo == Tipo.DOUBLE){
                //si son enteros
                return this.multiplicardoubledouble(izquierda,derecha);
            }
            if(derecha.tipo == Tipo.CHAR){
                //si son enteros
                return this.multiplicardoublechar(izquierda,derecha);
            }
            else{
                throw new ErrorOperacion(0,0,"NO SE PUEDE MULTIPLICAR BOOLEANOS Y/O STRINGS",null)
            }
        }
        if(izquierda.tipo == Tipo.CHAR){
            if(derecha.tipo == Tipo.INTEGER){
                //si son enteros
                return this.multiplicarcharint(izquierda,derecha);
            }
            if(derecha.tipo == Tipo.DOUBLE){
                //si son enteros
                return this.multiplicarchardouble(izquierda,derecha);
            }
            if(derecha.tipo == Tipo.CHAR){
                //si son enteros
                return this.multiplicarcharchar(izquierda,derecha);
            }
            else{
                throw new ErrorOperacion(0,0,"NO SE PUEDE MULTIPLICAR BOOLEANOS Y/O STRINGS",null)
            }
        }
        else{
            throw new ErrorOperacion(0,0,"NO SE PUEDE MULTIPLICAR BOOLEANOS Y/O STRINGS",null)
        }
    }

    multiplicarintint(izquierda: any,derecha:any):any{        
        return new Return(izquierda.valor * derecha.valor,Tipo.INTEGER);
    }
    multiplicarintdouble(izquierda: any,derecha:any):any{        
        return new Return(izquierda.valor * derecha.valor,Tipo.DOUBLE);
    }
    multiplicarintchar(izquierda: any,derecha:any):any{
        derecha.valor = derecha.valor.charCodeAt(0);
        return new Return(izquierda.valor * derecha.valor,Tipo.INTEGER);
    }

    multiplicardoubleint(izquierda: any,derecha:any):any{        
        return new Return(izquierda.valor * derecha.valor,Tipo.DOUBLE);
    }
    multiplicardoubledouble(izquierda: any,derecha:any):any{        
        return new Return(izquierda.valor * derecha.valor,Tipo.DOUBLE);
    }
    multiplicardoublechar(izquierda: any,derecha:any):any{
        derecha.valor = derecha.valor.charCodeAt(0);
        return new Return(izquierda.valor * derecha.valor,Tipo.DOUBLE);
    }

    multiplicarcharint(izquierda: any,derecha:any):any{
        izquierda.valor = izquierda.valor.charCodeAt(0);       
        return new Return(izquierda.valor * derecha.valor,Tipo.DOUBLE);
    }
    multiplicarchardouble(izquierda: any,derecha:any):any{        
        izquierda.valor = izquierda.valor.charCodeAt(0);
        return new Return(izquierda.valor * derecha.valor,Tipo.DOUBLE);
    }
    multiplicarcharchar(izquierda: any,derecha:any):any{
        izquierda.valor = izquierda.valor.charCodeAt(0);
        derecha.valor = derecha.valor.charCodeAt(0);
        return new Return(izquierda.valor * derecha.valor,Tipo.DOUBLE);
    }
}