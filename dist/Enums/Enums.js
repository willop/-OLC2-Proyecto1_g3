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
    TipoAritmetica[TipoAritmetica["MODULO"] = 4] = "MODULO";
})(TipoAritmetica || (TipoAritmetica = {}));
var TipoLogica;
(function (TipoLogica) {
    TipoLogica[TipoLogica["AND"] = 0] = "AND";
    TipoLogica[TipoLogica["OR"] = 1] = "OR";
    TipoLogica[TipoLogica["NOT"] = 2] = "NOT";
})(TipoLogica || (TipoLogica = {}));
var TipoRelacional;
(function (TipoRelacional) {
    TipoRelacional[TipoRelacional["IGUALDAD"] = 0] = "IGUALDAD";
    TipoRelacional[TipoRelacional["DESIGUALDAD"] = 1] = "DESIGUALDAD";
})(TipoRelacional || (TipoRelacional = {}));
var TipoError;
(function (TipoError) {
    TipoError[TipoError["ERROR_GENERAL"] = 0] = "ERROR_GENERAL";
    TipoError[TipoError["OPERACION_NO_PERMITIDA"] = 1] = "OPERACION_NO_PERMITIDA";
    TipoError[TipoError["TIPO_INCORRECTO"] = 2] = "TIPO_INCORRECTO";
    TipoError[TipoError["VARIABLE_NO_DECLARADA"] = 3] = "VARIABLE_NO_DECLARADA";
    TipoError[TipoError["VARIABLE_YA_DECLARADA"] = 4] = "VARIABLE_YA_DECLARADA";
    TipoError[TipoError["ERROR_LOGICO"] = 5] = "ERROR_LOGICO";
    TipoError[TipoError["ERROR_RELACIONAL"] = 6] = "ERROR_RELACIONAL";
})(TipoError || (TipoError = {}));
