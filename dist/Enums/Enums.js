"use strict";
var Tipo;
(function (Tipo) {
    Tipo[Tipo["STRING"] = 0] = "STRING";
    Tipo[Tipo["INTEGER"] = 1] = "INTEGER";
    Tipo[Tipo["CHAR"] = 2] = "CHAR";
    Tipo[Tipo["DOUBLE"] = 3] = "DOUBLE";
})(Tipo || (Tipo = {}));
var TipoAritmetica;
(function (TipoAritmetica) {
    TipoAritmetica[TipoAritmetica["SUMA"] = 0] = "SUMA";
    TipoAritmetica[TipoAritmetica["RESTA"] = 1] = "RESTA";
    TipoAritmetica[TipoAritmetica["MULTIPLICACION"] = 2] = "MULTIPLICACION";
    TipoAritmetica[TipoAritmetica["DIVISION"] = 3] = "DIVISION";
})(TipoAritmetica || (TipoAritmetica = {}));
