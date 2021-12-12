enum Tipo {
    STRING,
    INTEGER,
    CHAR,
    DOUBLE,
    BOOLEAN
}

enum TipoAritmetica{
    SUMA,
    RESTA,
    MULTIPLICACION,
    DIVISION,
    MODULO,
    COSENO,
    SENO,
    TANGENTE,
    RAIZ,
    LOGARITMO,
    POW
}

enum TipoLogica{
    AND,
    OR,
    NOT
}

enum TipoRelacional{
    IGUALDAD,
    DESIGUALDAD,
    MAYOR_QUE,
    MENOR_QUE,
    MAYOR_IGUAL,
    MENOR_IGUAL
}

enum TipoError{
    ERROR_GENERAL,
    OPERACION_NO_PERMITIDA,
    TIPO_INCORRECTO,
    VARIABLE_NO_DECLARADA,
    VARIABLE_YA_DECLARADA,
    ERROR_LOGICO,
    ERROR_RELACIONAL,
    ERROR_BOOLEANO,
}
