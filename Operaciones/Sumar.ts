

class Sumar{
    tipo = TipoAritmetica.SUMA;
    sumar(izquierda:any,derecha:any):any{
        if(izquierda.tipo == Tipo.INTEGER){
            if(derecha.tipo == Tipo.INTEGER){
                //r
                return this.sumarintint(izquierda,derecha); 
            }
        }
    }
    
    sumarintint(izquierda:any,derecha:any){
        //console.log("dentro de sumarintint");
        return new Return(izquierda.valor+derecha.valor,Tipo.INTEGER);
    }

}

