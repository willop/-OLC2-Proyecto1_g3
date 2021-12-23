class Desigualdad{
    tipo = TipoRelacional.DESIGUALDAD;
    desigualdad(izquierda:any,derecha:any):any{
        var izq = izquierda.valor
        var der= derecha.valor
        if(izquierda.tipo == Tipo.STRUCT){
            izq = izquierda.atributos;
            

        }
        if(derecha.tipo == Tipo.STRUCT){
            der = derecha.atributos;
        }
        return new Return(izq!=der,Tipo.BOOLEAN);  
    }
    
}



