class Igualdad{
    tipo = TipoRelacional.IGUALDAD;
    igualdad(izquierda:any,derecha:any):any{
        //IGUALACION IZQUIERDA INT VS DERECHA
        if(izquierda.tipo == Tipo.INTEGER){
            if(derecha.tipo == Tipo.INTEGER){
                return this.Igualintint(izquierda,derecha);             
            }else{
                throw new ERelacional(0,0,"TIPOS DE DATOS DIFERENTES",null)    
            }
        }
        else if(izquierda.tipo == Tipo.STRING){
            if(derecha.tipo == Tipo.STRING){
                return this.Igualstringstring(izquierda,derecha);             
            }else{
                throw new ERelacional(0,0,"TIPOS DE DATOS DIFERENTES",null)    
            }
        }
        else if(izquierda.tipo == Tipo.DOUBLE){
            if(derecha.tipo == Tipo.DOUBLE){
                return this.Igualdoubledouble(izquierda,derecha);             
            }else{
                throw new ERelacional(0,0,"TIPOS DE DATOS DIFERENTES",null)    
            }
        }
        else if(izquierda.tipo == Tipo.BOOLEAN){
            if(derecha.tipo == Tipo.BOOLEAN){
                return this.Igualbooleanboolean(izquierda,derecha);             
            }else{
                throw new ERelacional(0,0,"TIPOS DE DATOS DIFERENTES",null)    
            }
        }
        else if(izquierda.tipo == Tipo.CHAR){
            if(derecha.tipo == Tipo.CHAR){
                return this.Igualcharchar(izquierda,derecha);             
            }else{
                throw new ERelacional(0,0,"TIPOS DE DATOS DIFERENTES",null)    
            }
        }
        

    }
    
    // ------------ int + otros
    Igualintint(izquierda:any,derecha:any){
        console.log("dentro de igualintint");       
        return new Return(izquierda.valor==derecha.valor,Tipo.BOOLEAN);   
    }
    Igualstringstring(izquierda:any,derecha:any){
        //console.log("dentro de sumarintint");       
        return new Return(izquierda.valor==derecha.valor,Tipo.BOOLEAN);   
    }
    Igualdoubledouble(izquierda:any,derecha:any){
        //console.log("dentro de sumarintint");       
        return new Return(izquierda.valor==derecha.valor,Tipo.BOOLEAN);   
    }
    Igualbooleanboolean(izquierda:any,derecha:any){
        //console.log("dentro de sumarintint");       
        return new Return(izquierda.valor==derecha.valor,Tipo.BOOLEAN);   
    }
    Igualcharchar(izquierda:any,derecha:any){
        //console.log("dentro de sumarintint");       
        return new Return(izquierda.valor==derecha.valor,Tipo.BOOLEAN);   
    }
}



