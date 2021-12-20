class FCaracterOfPosition {
    tipo = TipoFuncionesCadena.CARACTEROFPOSITION;

    fcaracterofposition(id: any,posicion:any): any { 
        try {
            console.log("detnoro de la clase")
            console.log(id.valor)
            return new Return(id.valor.charAt(posicion.valor), Tipo.CHAR);
        }catch (e) {
            throw new ErrorOperacion(0, 0, "NO SE PUEDE REALIZAR CARACTEROFPOSITOIN: " + id.valor, null);
        }
        
        
    }
}