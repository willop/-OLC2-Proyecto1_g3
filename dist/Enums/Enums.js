"use strict";
var Tipo;
(function (Tipo) {
    Tipo[Tipo["STRING"] = 0] = "STRING";
    Tipo[Tipo["INTEGER"] = 1] = "INTEGER";
    Tipo[Tipo["CHAR"] = 2] = "CHAR";
    Tipo[Tipo["DOUBLE"] = 3] = "DOUBLE";
    Tipo[Tipo["BOOLEAN"] = 4] = "BOOLEAN";
    Tipo[Tipo["CONTINUE"] = 5] = "CONTINUE";
    Tipo[Tipo["BRAKE"] = 6] = "BRAKE";
    Tipo[Tipo["NULL"] = 7] = "NULL";
    Tipo[Tipo["ARRAY"] = 8] = "ARRAY";
})(Tipo || (Tipo = {}));
var TipoAritmetica;
(function (TipoAritmetica) {
    TipoAritmetica[TipoAritmetica["SUMA"] = 0] = "SUMA";
    TipoAritmetica[TipoAritmetica["RESTA"] = 1] = "RESTA";
    TipoAritmetica[TipoAritmetica["MULTIPLICACION"] = 2] = "MULTIPLICACION";
    TipoAritmetica[TipoAritmetica["DIVISION"] = 3] = "DIVISION";
    TipoAritmetica[TipoAritmetica["MODULO"] = 4] = "MODULO";
    TipoAritmetica[TipoAritmetica["COSENO"] = 5] = "COSENO";
    TipoAritmetica[TipoAritmetica["SENO"] = 6] = "SENO";
    TipoAritmetica[TipoAritmetica["TANGENTE"] = 7] = "TANGENTE";
    TipoAritmetica[TipoAritmetica["RAIZ"] = 8] = "RAIZ";
    TipoAritmetica[TipoAritmetica["LOGARITMO"] = 9] = "LOGARITMO";
    TipoAritmetica[TipoAritmetica["POW"] = 10] = "POW";
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
    TipoRelacional[TipoRelacional["MAYOR_QUE"] = 2] = "MAYOR_QUE";
    TipoRelacional[TipoRelacional["MENOR_QUE"] = 3] = "MENOR_QUE";
    TipoRelacional[TipoRelacional["MAYOR_IGUAL"] = 4] = "MAYOR_IGUAL";
    TipoRelacional[TipoRelacional["MENOR_IGUAL"] = 5] = "MENOR_IGUAL";
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
    TipoError[TipoError["ERROR_BOOLEANO"] = 7] = "ERROR_BOOLEANO";
})(TipoError || (TipoError = {}));
var TipoFor;
(function (TipoFor) {
    TipoFor[TipoFor["CLASICO"] = 0] = "CLASICO";
    TipoFor[TipoFor["FORIN"] = 1] = "FORIN";
})(TipoFor || (TipoFor = {}));
var TipoAumento;
(function (TipoAumento) {
    TipoAumento[TipoAumento["INCREMENTO"] = 0] = "INCREMENTO";
    TipoAumento[TipoAumento["DECREMENTO"] = 1] = "DECREMENTO";
})(TipoAumento || (TipoAumento = {}));
