class FSubString {
    tipo = TipoFuncionesCadena.SUBSTRING;

    fsubstring(id: any,paraminicio:any,paramfin:any): any { 
        try {
            var cadena = id.valor;
            console.log("Dentro de substring id: "+id.valor+"\nparaminicio: "+paraminicio.valor+"\nparamfin: "+paramfin.valor);
            return new Return(cadena.substring(paraminicio.valor,paramfin.valor+1), Tipo.STRING);
        } catch (e) {
            throw new ErrorOperacion(0, 0, "NO SE PUEDE REALIZAR SUBSTRING AL VALOR: " + id.valor +" Y PARAMETROS "+paraminicio.valor +","+paramfin.valor, null);    
        }
        
    }
}