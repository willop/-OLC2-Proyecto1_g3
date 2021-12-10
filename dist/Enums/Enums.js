"use strict";
var Tipo;
(function (Tipo) {
    Tipo[Tipo["STRING"] = 0] = "STRING";
    Tipo[Tipo["INTEGER"] = 1] = "INTEGER";
    Tipo[Tipo["CHAR"] = 2] = "CHAR";
    Tipo[Tipo["DOUBLE"] = 3] = "DOUBLE";
    Tipo[Tipo["BOOLEAN"] = 4] = "BOOLEAN";
})(Tipo || (Tipo = {}));
var TipoAritmetica;
(function (TipoAritmetica) {
    TipoAritmetica[TipoAritmetica["SUMA"] = 0] = "SUMA";
    TipoAritmetica[TipoAritmetica["RESTA"] = 1] = "RESTA";
    TipoAritmetica[TipoAritmetica["MULTIPLICACION"] = 2] = "MULTIPLICACION";
    TipoAritmetica[TipoAritmetica["DIVISION"] = 3] = "DIVISION";
    TipoAritmetica[TipoAritmetica["POTENCIA"] = 4] = "POTENCIA";
})(TipoAritmetica || (TipoAritmetica = {}));
var TipoError;
(function (TipoError) {
    TipoError[TipoError["ERROR_GENERAL"] = 0] = "ERROR_GENERAL";
    TipoError[TipoError["OPERACION_NO_PERMITIDA"] = 1] = "OPERACION_NO_PERMITIDA";
    TipoError[TipoError["TIPO_INCORRECTO"] = 2] = "TIPO_INCORRECTO";
    TipoError[TipoError["VARIABLE_NO_DECLARADA"] = 3] = "VARIABLE_NO_DECLARADA";
    TipoError[TipoError["VARIABLE_YA_DECLARADA"] = 4] = "VARIABLE_YA_DECLARADA";
})(TipoError || (TipoError = {}));
