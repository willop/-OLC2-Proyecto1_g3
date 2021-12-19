class Parsear {
    tipo = TipoFuncionNativa.INTPARSE;
    parsear(tipo: any, valor: any): any {
        if (tipo == TipoFuncionNativa.INTPARSE){
            return this.parsearToInt(valor);
        }else if (tipo == TipoFuncionNativa.DOUBLEPARSE){
            return this.parsearToDouble(valor);
        }else if (tipo == TipoFuncionNativa.BOOLEANPARSE){
            return this.parsearToBoolean(valor);
        }
    }

    // ------------ int + otros
    parsearToInt(valor:any){
        try{
            return new Return(parseInt(valor.valor), Tipo.INTEGER);

        }catch (e){
            throw new ErrorOperacion(0,0,"NO SE PUEDE REALIZAR PARSEO A INT CON VALOR: "+ valor.valor,null);
        }
    }
    parsearToDouble(valor:any){
        try{
            return new Return(parseFloat(valor.valor), Tipo.DOUBLE);
        }catch (e){
            throw new ErrorOperacion(0,0,"NO SE PUEDE REALIZAR PARSEO A DOUBLE CON VALOR: "+ valor.valor,null);
        }
    }
    parsearToBoolean(valor:any){
        try{
            if(valor.valor =="0"){
                return new Return(false, Tipo.BOOLEAN);    
            }else if(valor.valor =="1"){
                return new Return(true, Tipo.BOOLEAN);    
            }else if(valor.valor =="true"){
                return new Return(true, Tipo.BOOLEAN);    
            }else if(valor.valor =="false"){
                return new Return(false, Tipo.BOOLEAN);    
            }else{
                throw new ErrorOperacion(0,0,"NO SE PUEDE REALIZAR PARSEO A BOOLEAN CON VALOR: "+ valor.valor,null);
            }
        }catch (e){
            throw new ErrorOperacion(0,0,"NO SE PUEDE REALIZAR PARSEO A BOOLEAN CON VALOR: "+ valor.valor,null);
        }
    }
}