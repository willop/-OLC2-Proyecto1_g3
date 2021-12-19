enum Tipo {
    STRING,
    INTEGER,
    CHAR,
    DOUBLE,
    BOOLEAN,
    CONTINUE,
    BRAKE,
    NULL,
    ARRAY,
    STRUCT,
    RETURN
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

enum TipoFuncionNativa{
    INTPARSE,
    DOUBLEPARSE,
    BOOLEANPARSE,
    TRUNCAR,
    TOINT,
    TODOUBLE,
    STRING,
    TYPEOF
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
    ERROR_TIPO_VARIABLES_ARRAY,
    FUNCION_YA_DECLARADA
}


enum TipoFor{
    CLASICO,
    FORIN,
}

enum TipoAumento{
    INCREMENTO,
    DECREMENTO
}