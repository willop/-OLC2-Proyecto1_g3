class Multiplicacion{
    tipo = TipoAritmetica.RESTA;
    multiplicar(izquierda: any,derecha:any):any{
        if(izquierda.tipo == Tipo.INTEGER){
            if(derecha.tipo == Tipo.INTEGER){
                //si son enteros realizar la resta`
                return this.multiplicarintint(izquierda,derecha);
            }
        }
    }

    multiplicarintint(izquierda: any,derecha:any):any{
        //aca se realiza la resta de los dos numeros 
        //console.log("si entra a restar");
        return new Return(izquierda.valor * derecha.valor,Tipo.INTEGER);
    }
}