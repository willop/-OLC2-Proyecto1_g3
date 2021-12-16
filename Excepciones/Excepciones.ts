class ErrorInterprete extends Error{
    linea: number;
    columna: number;
    tipo:any;
    descripcion: any;
    ambito: any;
    constructor (linea:number,columna:number,tipo:any,descripcion:any,ambito:any){
        super(descripcion)
        this.linea = linea;
        this.columna = columna;
        this.descripcion = descripcion;
        this.ambito = ambito;
        this.tipo = tipo;
    }

}

class ErrorGeneral extends ErrorInterprete{
    
    constructor (linea:number,columna:number,descripcion:any,ambito:any){
        super(linea,columna,TipoError.ERROR_GENERAL,descripcion,ambito)
        
    }

}

class ErrorOperacion extends ErrorInterprete{
    
    constructor (linea:number,columna:number,descripcion:any,ambito:any){
        super(linea,columna,TipoError.OPERACION_NO_PERMITIDA,descripcion,ambito)
        
    }

}

class TipoIncorrecto extends ErrorInterprete{
    
    constructor (linea:number,columna:number,descripcion:any,ambito:any){
        super(linea,columna,TipoError.TIPO_INCORRECTO,descripcion,ambito)
        
    }

}
class VariableNoDeclarada extends ErrorInterprete{
    
    constructor (linea:number,columna:number,descripcion:any,ambito:any){
        super(linea,columna,TipoError.VARIABLE_NO_DECLARADA,descripcion,ambito)
        
    }

}
class VariableYaDeclarada extends ErrorInterprete{
    
    constructor (linea:number,columna:number,descripcion:any,ambito:any){
        super(linea,columna,TipoError.VARIABLE_YA_DECLARADA,descripcion,ambito)
        
    }

}

//************** Errores de tipo Logicos (&&,||,!) 
class Logico extends ErrorInterprete{
    
    constructor (linea:number,columna:number,descripcion:any,ambito:any){
        super(linea,columna,TipoError.ERROR_LOGICO,descripcion,ambito)
        
    }

}


//************** Errores de tipo Relacional (==,!=,>,<,>=,<=) 
class ERelacional extends ErrorInterprete{
    
    constructor (linea:number,columna:number,descripcion:any,ambito:any){
        super(linea,columna,TipoError.ERROR_RELACIONAL,descripcion,ambito)
        
    }

}

//************** Errores de tipo Boolean (true,false) 
class EBoolean extends ErrorInterprete{
    
    constructor (linea:number,columna:number,descripcion:any,ambito:any){
        super(linea,columna,TipoError.ERROR_BOOLEANO,descripcion,ambito)
        
    }

}
// ******** ERRORES IF
class EIf extends ErrorInterprete{
    
    constructor (linea:number,columna:number,descripcion:any,ambito:any){
        super(linea,columna,TipoError.TIPO_INCORRECTO,descripcion,ambito)
        
    }

}


// ******** ERRORES while
class EWHILE extends ErrorInterprete{
    
    constructor (linea:number,columna:number,descripcion:any,ambito:any){
        super(linea,columna,TipoError.TIPO_INCORRECTO,descripcion,ambito)
        
    }

}

// ** VALORES DE ARRAY SON VARIABLES
class ETipoValorArray extends ErrorInterprete{
    
    constructor (linea:number,columna:number,descripcion:any,ambito:any){
        super(linea,columna,TipoError.ERROR_TIPO_VARIABLES_ARRAY,descripcion,ambito)
        
    }

}

class FuncionYaDeclarada extends ErrorInterprete{
    
    constructor (linea:number,columna:number,descripcion:any,ambito:any){
        super(linea,columna,TipoError.FUNCION_YA_DECLARADA,descripcion,ambito)
        
    }

}