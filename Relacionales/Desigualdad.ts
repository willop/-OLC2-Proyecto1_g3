class Desigualdad{
    tipo = TipoRelacional.DESIGUALDAD;
    desigualdad(izquierda:any,derecha:any):any{
        //Desigualdad IZQUIERDA INT VS DERECHA
        if(izquierda.tipo == Tipo.INTEGER){
            if(derecha.tipo == Tipo.INTEGER){
                return this.Desigualintint(izquierda,derecha);             
            }else{
                throw new ERelacional(0,0,"TIPOS DE DATOS DIFERENTES",null)    
            }
        }
        else if(izquierda.tipo == Tipo.STRING){
            if(derecha.tipo == Tipo.STRING){
                return this.Desigualstringstring(izquierda,derecha);             
            }else{
                throw new ERelacional(0,0,"TIPOS DE DATOS DIFERENTES",null)    
            }
        }
        else if(izquierda.tipo == Tipo.DOUBLE){
            if(derecha.tipo == Tipo.DOUBLE){
                return this.Desigualdoubledouble(izquierda,derecha);             
            }else{
                throw new ERelacional(0,0,"TIPOS DE DATOS DIFERENTES",null)    
            }
        }
        else if(izquierda.tipo == Tipo.BOOLEAN){
            if(derecha.tipo == Tipo.BOOLEAN){
                return this.Desigualbooleanboolean(izquierda,derecha);             
            }else{
                throw new ERelacional(0,0,"TIPOS DE DATOS DIFERENTES",null)    
            }
        }
        else if(izquierda.tipo == Tipo.CHAR){
            if(derecha.tipo == Tipo.CHAR){
                return this.Desigualcharchar(izquierda,derecha);             
            }else{
                throw new ERelacional(0,0,"TIPOS DE DATOS DIFERENTES",null)    
            }
        }
        

    }
    
    // ------------ int + otros
    Desigualintint(izquierda:any,derecha:any){
        console.log("dentro de igualintint");       
        return new Return(izquierda.valor!=derecha.valor,Tipo.BOOLEAN);   
    }
    Desigualstringstring(izquierda:any,derecha:any){
        //console.log("dentro de sumarintint");       
        return new Return(izquierda.valor!=derecha.valor,Tipo.BOOLEAN);   
    }
    Desigualdoubledouble(izquierda:any,derecha:any){
        //console.log("dentro de sumarintint");       
        return new Return(izquierda.valor!=derecha.valor,Tipo.BOOLEAN);   
    }
    Desigualbooleanboolean(izquierda:any,derecha:any){
        //console.log("dentro de sumarintint");       
        return new Return(izquierda.valor!=derecha.valor,Tipo.BOOLEAN);   
    }
    Desigualcharchar(izquierda:any,derecha:any){
        //console.log("dentro de sumarintint");       
        return new Return(izquierda.valor!=derecha.valor,Tipo.BOOLEAN);   
    }
}



