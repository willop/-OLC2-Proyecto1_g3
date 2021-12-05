/**
 * Ejemplo mi primer proyecto con Jison utilizando Nodejs en Ubuntu
 */

/* Definición Léxica */
%lex

%options case-insensitive

%%

\/\/.*										return 'TK_COMENTARIO';// comentario simple línea
\/\*(\*(?!\/)|[^*])*\*\/\n					return 'TK_COMENTARIO_MULTI';//; comentario multiple líneas


"null"          			return 'TK_NULL';
"int"						return 'TK_INT';
"dobule"					return 'TK_DOUBLE';
"boolean"					return 'TK_BOOLEAN';
"char"						return 'TK_CHAR';
"String"					return 'TK_STRING';
"struct"					return 'TK_STRUCT';
"pow"						return 'TK_POW';
"sqrt"						return 'TK_SQRT';
"sin"						return 'TK_SIN';
"cos"						return 'TK_COS';
"tan"						return 'TK_TAN';
"log10"						return 'TK_LOG';
"caracterOfPosition"		return 'TK_CARETER_OF_POSITION';
"subString"					return 'TK_SUBSTRING';
"lenght"					return 'TK_LENGHT';
"toUppercase"				return 'TK_TOUPPERCASE';
"toLowercase"				return 'TK_TOLOWERCASE';
"print"						return 'TK_PRINT';
"println"					return 'TK_PRINTLN';
"parse"						return 'TK_PARSE';
"toInt"						return 'TK_TOINT';
"toDouble"					return 'TK_TODOUBLE';
"typeof"					return 'TK_TYPEOF';
"function"					return 'TK_FUNCTION';
"return"					return 'TK_RETURN';
"if"						return 'TK_IF';
"else"						return 'TK_ELSE';
"elseif"					return 'TK_ELSEIF';
"switch"					return 'TK_SWITCH';
"case"						return 'TK_CASE';
"default"					return 'TK_DEFAULT';
"break"						return 'TK_BREAK';
"while"						return 'TK_WHILE';
"do"						return 'TK_DO';
"for"						return 'TK_FOR';
"in"						return 'TK_IN';
"push"						return 'TK_PUSH';
"pop"						return 'TK_POP';
"begin"						return 'TK_BEGIN';
"end"						return 'TK_END';
"continue"					return 'TK_CONTINUE';
"true"						return 'TK_TRUE';
"false"						return 'TK_FALSE';
/*Signos de ARITMETICOS*/
"+"                 		return 'TK_MAS';
"-"                 		return 'TK_MENOS';
"*"                 		return 'TK_POR';
"/"                 		return 'TK_DIVIDIDO';
"%"							return 'TK_MODULO'

/*inicio de simbolos*/
"("							return 'TK_par_apertura';
")"							return 'TK_par_cierre';
"{"							return 'TK_corchete_apertura';
"}"							return 'TK_corchete_cierre';
"["							return 'TK_llave_apertura';
"]"							return 'TK_llave_cierre';
":"							return 'TK_dos_puntos';
";"							return 'TK_pcoma';
","							return 'TK_coma';
"."							return 'TK_punto';

"=="						return 'TK_igualacion';
"="							return 'TK_igual';
"!="						return 'TK_desigual';
">="						return 'TK_mayor_igual';
"<="						return 'TK_menor_igual';
"<"							return 'TK_menor';
">"							return 'TK_mayor';


"&&"						return 'TK_and';
"||"						return 'TK_or';
"!"							return 'TK_not';
"&"							return 'TK_concat';

"#"							return 'TK_numeral';
"$"							return 'TK_dolar';
"?"							return 'TK_pregunta';

\n	                 		return 'TK_SALTO_LINEA'
/* Espacios en blanco */
\s+											// se ignoran espacios en blanco


[0-9]+("."[0-9]+)?\b    	return 'TK_DECIMAL';
[0-9]+\b                	return 'TK_ENTERO';   
\"[^\"]*\"					return 'TK_CADENA';
\'[^\']*\'					return 'TK_CARACTER';
([a-zA-Z])[a-zA-Z0-9_]*		return 'TK_ID';



<<EOF>>                 return 'EOF';

.                       { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }
/lex

/* constantes */





/* Asociación de operadores y precedencia */

%left 'TK_and' 'TK_or'   
%left 'TK_mayor' 'TK_menor' 'TK_igual' 'TK_menor_igual' 'TK_mayor_igual' 'TK_igualacion' 'TK_desigual'
%left 'TK_MAS' 'TK_MENOS'
%left 'TK_POR' 'TK_DIVIDIDO'
%left 'TK_not' 
%left UMENOS

%start ini

%% /* Definición de la gramática */

ini
	: INSTRUCCIONES EOF
;

INSTRUCCIONES
	: INSTRUCCIONES INSTRUCCION 
	| INSTRUCCION
	//| error { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); }
;

INSTRUCCION: DECLARACION 
	| COMENTARIOS
	| TK_SALTO_LINEA
;

COMENTARIOS : TK_COMENTARIO TK_SALTO_LINEA
			| TK_COMENTARIO_MULTI TK_SALTO_LINEA
;

DECLARACION: TIPO_VALOR TIPO_DECLARACION							{}
			| STRUCT
;

STRUCT : TK_STRUCT TK_ID TK_corchete_apertura  TK_corchete_cierre FIN_LINEA
//se puede repetir codigo
		|TK_STRUCT TK_ID TK_corchete_apertura CUERPO_STRUCT TK_corchete_cierre FIN_LINEA
;

CUERPO_STRUCT:CUERPO_STRUCT CONTENIDO_STRUCT 
			| CONTENIDO_STRUCT
;

CONTENIDO_STRUCT: TIPO_VALOR TK_ID TK_igual EXPRESIONARIT FIN_LINEA_STRUCT
				| TIPO_VALOR TK_ID FIN_LINEA_STRUCT
				| TK_SALTO_LINEA
;
				
FIN_LINEA_STRUCT: TK_coma
				| TK_SALTO_LINEA
				| TK_pcoma
;

TIPO_DECLARACION : TK_ID IGUALACION									{}
				| COND_ARREGLO TK_ID IGUALACION						{}

;

FIN_LINEA: TK_pcoma
		| TK_SALTO_LINEA											{}
;


TIPO_VALOR: TK_STRING 												{}
		|TK_INT														{}
		|TK_BOOLEAN													{}
		|TK_DOUBLE													{}
		|TK_CHAR													{}
;

COND_ARREGLO: TK_llave_apertura TK_llave_cierre						{}

;

IGUALACION: TK_igual EXPRESIONARIT FIN_LINEA						{}
			|MAS_VARIABLES FIN_LINEA								{}
			|FIN_LINEA
;

MAS_VARIABLES: MAS_VARIABLES TK_coma TK_ID
			|TK_coma TK_ID

;

VALORES: TK_CADENA													{}
		|TK_TRUE													{}
		|TK_FALSE													{}
		|TK_CARACTER												{}
		|TK_ID														{}
		| TK_ENTERO                        							{}
		| TK_DECIMAL                       							{}
;


EXPRESIONARIT
	: TK_MENOS EXPRESIONARIT %prec UMENOS  							{}
	| EXPRESIONARIT TK_and EXPRESIONARIT       						{}
	| EXPRESIONARIT TK_or EXPRESIONARIT								{}
	| EXPRESIONARIT TK_mayor_igual EXPRESIONARIT       				{}
	| EXPRESIONARIT TK_menor_igual EXPRESIONARIT       				{}
	| EXPRESIONARIT TK_mayor EXPRESIONARIT       					{}
	| EXPRESIONARIT TK_menor EXPRESIONARIT							{}
	| EXPRESIONARIT TK_igualacion EXPRESION							{}
	| EXPRESIONARIT TK_desigual EXPRESIONARIT						{}
	| EXPRESIONARIT TK_MAS TK_MAS									{}
	| EXPRESIONARIT TK_MENOS TK_MENOS								{}
	| EXPRESIONARIT TK_MAS EXPRESIONARIT       						{}
	| EXPRESIONARIT TK_MENOS EXPRESIONARIT     						{}
	| EXPRESIONARIT TK_POR EXPRESIONARIT       						{}
	| EXPRESIONARIT TK_DIVIDIDO EXPRESIONARIT  						{}
	| TK_par_apertura EXPRESIONARIT TK_par_cierre       			{}
	| TK_not EXPRESIONARIT											{}
	| VALORES														{}
;
