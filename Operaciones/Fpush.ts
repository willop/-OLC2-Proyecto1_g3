
class Fpush {
    tipo = TipoFunctionArreglo.FPUSH;

    fpush(id: any,expresion:any): any { 
        try {
            console.log("verificar si es tipo vector: "+id.tipo+" y lo que ingresa es: "+expresion.valor);
            if(id.tipo == Tipo.ARRAY){
                //si es un arreglo 
                console.log("ACA ESTA LA EXPRESION A HACER PUSH")
                console.log(expresion)
                id.valor.push(new Return(expresion.valor,id.valor[0].tipo));
                console.log(id);
                //var asig = new AsignarValorArray(expresion.valor,id);		
                //return new Return()
            }
            
        } catch (e) {
            throw new ErrorOperacion(0, 0, "NO SE PUEDE REALIZAR PUSH A ESTE ARREGLO", null);    
        }
        
    }
}