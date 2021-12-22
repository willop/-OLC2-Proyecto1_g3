class Fpop {
    tipo = TipoFunctionArreglo.FPOP;

    fpop(id: any): any { 
        try {
            console.log("verificar si es tipo vector: "+id.tipo);
            if(id.tipo == Tipo.ARRAY){
                //si es un arreglo 
                if(id.valor.length > 0){
                    id.valor.pop();
                }
                //id.push(expresion.valor);
            }
        } catch (e) {
            throw new ErrorOperacion(0, 0, "NO SE PUEDE REALIZAR POP A ESTE ARREGLO ", null);    
        }
        
    }
}