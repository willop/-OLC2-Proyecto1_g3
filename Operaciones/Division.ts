class Division{
    tipo = TipoAritmetica.DIVISION;
    dividir(izquierda: any,derecha:any):any{
        if(izquierda.tipo == Tipo.INTEGER){
            if(derecha.tipo == Tipo.INTEGER){
                //si son enteros realizar la resta`
                return this.dividirintint(izquierda,derecha);
            }
            if(derecha.tipo == Tipo.DOUBLE){
                //si son enteros y decimales
                return this.dividirintdouble(izquierda,derecha);
            }
            if(derecha.tipo == Tipo.CHAR){
                //si son enteros y caracter
                return this.dividirintchar(izquierda,derecha);
            }
            else{
                throw new ErrorOperacion(0,0,"NO SE PUEDE DIVIDIR BOOLEANOS Y/O STRINGS",null)
            }
        }
        else if(izquierda.tipo == Tipo.DOUBLE){
            if(derecha.tipo == Tipo.INTEGER){
                //si son decimal y entero 
                return this.dividirdoubleint(izquierda,derecha);
            }
            if(derecha.tipo == Tipo.DOUBLE){
                //si son decimales
                return this.dividirdoubledouble(izquierda,derecha);
            }
            if(derecha.tipo == Tipo.CHAR){
                //si son decimal y caracter 
                return this.dividirdoublechar(izquierda,derecha);
            }
            else{
                throw new ErrorOperacion(0,0,"NO SE PUEDE DIVIDIR BOOLEANOS Y/O STRINGS",null)
            }
        }
        else if(izquierda.tipo == Tipo.CHAR){
            if(derecha.tipo == Tipo.INTEGER){
                //si son caracter y entero
                return this.dividircharint(izquierda,derecha);
            }
            if(derecha.tipo == Tipo.DOUBLE){
                //si son caracter y decimal 
                return this.dividirchardouble(izquierda,derecha);
            }
            if(derecha.tipo == Tipo.CHAR){
                // si son decimal y decimal 
                return this.dividircharchar(izquierda,derecha);
            }
            else{
                throw new ErrorOperacion(0,0,"NO SE PUEDE DIVIDIR BOOLEANOS Y/O STRINGS",null)
            }
        }
        else{
            throw new ErrorOperacion(0,0,"NO SE PUEDE DIVIDIR BOOLEANOS Y/O STRINGS",null)
        }
    }
    //------------ IZQUIERDA ENTERO DERECHA OTROS
    dividirintint(izquierda: any,derecha:any):any{
        return new Return(izquierda.valor / derecha.valor,Tipo.INTEGER);
    }
    /// ACA VOY A INICIAR 
    dividirintdouble(izquierda: any,derecha:any):any{
        return new Return(izquierda.valor / derecha.valor,Tipo.DOUBLE);
    }
    dividirintchar(izquierda: any,derecha:any):any{
        derecha.valor = derecha.valor.charCodeAt(0);
        return new Return(izquierda.valor / derecha.valor,Tipo.INTEGER);
    }

    //------------ IZQUIERDA DOUBLE DERECHA OTROS
    dividirdoubleint(izquierda: any,derecha:any):any{
        return new Return(izquierda.valor / derecha.valor,Tipo.DOUBLE);
    }

    dividirdoubledouble(izquierda: any,derecha:any):any{
        return new Return(izquierda.valor / derecha.valor,Tipo.DOUBLE);
    }
    dividirdoublechar(izquierda: any,derecha:any):any{
        derecha.valor = derecha.valor.charCodeAt(0);
        return new Return(izquierda.valor / derecha.valor,Tipo.DOUBLE);
    }
    //------------ IZQUIERDA CHAR DERECHA OTROS
    dividircharint(izquierda: any,derecha:any):any{
        izquierda.valor = izquierda.valor.charCodeAt(0);
        return new Return(izquierda.valor / derecha.valor,Tipo.DOUBLE);
    }

    dividirchardouble(izquierda: any,derecha:any):any{
        izquierda.valor = izquierda.valor.charCodeAt(0);
        return new Return(izquierda.valor / derecha.valor,Tipo.DOUBLE);
    }
    dividircharchar(izquierda: any,derecha:any):any{
        izquierda.valor = izquierda.valor.charCodeAt(0);
        derecha.valor = derecha.valor.charCodeAt(0);
        return new Return(izquierda.valor / derecha.valor,Tipo.DOUBLE);
    }
}