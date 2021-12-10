"use strict";
class ErrorInterprete extends Error {
    constructor(linea, columna, tipo, descripcion, ambito) {
        super(descripcion);
        this.linea = linea;
        this.columna = columna;
        this.descripcion = descripcion;
        this.ambito = ambito;
        this.tipo = tipo;
    }
}
class ErrorGeneral extends ErrorInterprete {
    constructor(linea, columna, descripcion, ambito) {
        super(linea, columna, TipoError.ERROR_GENERAL, descripcion, ambito);
    }
}
class ErrorOperacion extends ErrorInterprete {
    constructor(linea, columna, descripcion, ambito) {
        super(linea, columna, TipoError.OPERACION_NO_PERMITIDA, descripcion, ambito);
    }
}
class TipoIncorrecto extends ErrorInterprete {
    constructor(linea, columna, descripcion, ambito) {
        super(linea, columna, TipoError.TIPO_INCORRECTO, descripcion, ambito);
    }
}
class VariableNoDeclarada extends ErrorInterprete {
    constructor(linea, columna, descripcion, ambito) {
        super(linea, columna, TipoError.VARIABLE_NO_DECLARADA, descripcion, ambito);
    }
}
class VariableYaDeclarada extends ErrorInterprete {
    constructor(linea, columna, descripcion, ambito) {
        super(linea, columna, TipoError.VARIABLE_YA_DECLARADA, descripcion, ambito);
    }
}
class Logico extends ErrorInterprete {
    constructor(linea, columna, descripcion, ambito) {
        super(linea, columna, TipoError.ERROR_LOGICO, descripcion, ambito);
    }
}
