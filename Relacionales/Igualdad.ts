class Igualdad{
    tipo = TipoLogica.IGUALDAD;
    igualdad(izquierda:any,derecha:any):any{
        //IGUALACION IZQUIERDA INT VS DERECHA
        if(izquierda.tipo == Tipo.INTEGER){
            if(derecha.tipo == Tipo.INTEGER){
                return this.Igualintint(izquierda,derecha);             
            }else{
                throw new Logico(0,0,"TIPOS DE DATOS DIFERENTES",null)    
            }
        }
        

    }
    
    // ------------ int + otros
    Igualintint(izquierda:any,derecha:any){
        //console.log("dentro de sumarintint");       
        return new Return(izquierda.valor==derecha.valor,Tipo.BOOLEAN);   
    }
}



