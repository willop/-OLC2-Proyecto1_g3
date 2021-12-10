class Potencia{
    tipo = TipoAritmetica.POTENCIA;
    potencia(izquierda:any, derecha:any):any{
        if(izquierda.tipo == Tipo.INTEGER){
            if(derecha.tipo == Tipo.INTEGER){
                //si son enteros
                return this.funcionPotencia(izquierda,derecha);
            }            
        }
    }


    funcionPotencia(izquieda:any,derecha:any){

    }




}