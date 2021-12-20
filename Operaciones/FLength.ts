class FLength {
    tipo = TipoFuncionesCadena.LENGTH;

    flength(id: any): any { 
        try {
            return new Return(id.valor.length, Tipo.INTEGER);   
        } catch (error) {
            throw new ErrorOperacion(0, 0, "NO SE PUEDE REALIZAR EL LENGHT AL VALOR: " + id.valor, null);    
        }
    }
}