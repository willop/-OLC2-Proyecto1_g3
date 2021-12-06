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
"double"					return 'TK_DOUBLE';
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
"length"					return 'TK_LENGTH';
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
"^"							return 'TK_potencia';

"#"							return 'TK_numeral';
"$"							return 'TK_dolar';
"?"							return 'TK_pregunta';

\n	                 		return 'TK_SALTO_LINEA'
/* Espacios en blanco */
\s+											// se ignoran espacios en blanco


[0-9]+("."[0-9]+)\b    		return 'TK_DECIMAL'; 
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
%left 'TK_mayor' 'TK_menor' 'TK_igual' 'TK_menor_igual' 'TK_mayor_igual' 'TK_igualacion' 'TK_desigual' 'TK_concat' 'TK_potencia' 'TK_punto'
%left 'TK_POR' 'TK_DIVIDIDO' 'TK_POW'  'TK_SIN'   'TK_COS'  'TK_TAN'   'TK_LOG'  'TK_SQRT' 'TK_PARSE' 
%left 'TK_MAS' 'TK_MENOS'
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
	| IMPRESION
	| ASIGNACION
	| FUNCIONES_NATIVAS
	| FUNCIONES
	| RETURN
	| CONDICIONALES
	| TK_SALTO_LINEA
;

COMENTARIOS : TK_COMENTARIO TK_SALTO_LINEA
			| TK_COMENTARIO_MULTI TK_SALTO_LINEA
;

DECLARACION: TIPO_VALOR TIPO_DECLARACION												{}
			| TIPO_VALOR TK_punto TK_PARSE TK_par_apertura TK_CADENA TK_par_cierre		{}
			| TIPO_VALOR TK_par_apertura ARREGLO TK_par_cierre FIN_LINEA				{}
			| TIPO_VALOR TK_par_apertura EXPRESIONARIT TK_par_cierre FIN_LINEA			{}
			| STRUCT																	{}
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

VALORES: TK_CADENA															{}
		|TK_TRUE															{}
		|TK_FALSE															{}
		|TK_CARACTER														{}
		|TK_ID 																{}
		|TK_ID TK_par_apertura TK_par_cierre								{}
		|TK_ID TK_par_apertura PARAMETROS TK_par_cierre						{}
		|TK_ENTERO                        									{}
		|TK_DECIMAL                       									{}
		|TK_CARETER_OF_POSITION TK_par_apertura VALORES TK_par_cierre		{}
		|TK_TOLOWERCASE	TK_par_apertura TK_par_cierre						{}
		|TK_SUBSTRING TK_par_apertura VALORES TK_coma VALORES TK_par_cierre {}
		|TK_TOUPPERCASE TK_par_apertura  TK_par_cierre						{}
		|TK_LENGTH TK_par_apertura  TK_par_cierre 							{}
		|TK_TYPEOF TK_par_apertura EXPRESIONARIT TK_par_cierre				{}
		|FUNCIONES_NATIVAS													{}
;

ARREGLO: TK_llave_apertura EXPRESIONARIT TK_llave_cierre										{}
		|TK_llave_apertura EXPRESIONARIT MAS_VALORES_IMPRESION TK_llave_cierre					{}
;


EXPRESIONARIT
	: TK_MENOS EXPRESIONARIT %prec UMENOS  							{}
	| EXPRESIONARIT TK_and EXPRESIONARIT       						{}
	| EXPRESIONARIT TK_or EXPRESIONARIT								{}
	| EXPRESIONARIT TK_mayor_igual EXPRESIONARIT       				{}
	| EXPRESIONARIT TK_menor_igual EXPRESIONARIT       				{}
	| EXPRESIONARIT TK_mayor EXPRESIONARIT       					{}
	| EXPRESIONARIT TK_menor EXPRESIONARIT							{}
	| EXPRESIONARIT TK_igualacion EXPRESIONARIT						{}
	| EXPRESIONARIT TK_desigual EXPRESIONARIT						{}
	| EXPRESIONARIT TK_MAS TK_MAS									{}
	| EXPRESIONARIT TK_MENOS TK_MENOS								{}
	| EXPRESIONARIT TK_MAS EXPRESIONARIT       						{}
	| EXPRESIONARIT TK_MENOS EXPRESIONARIT     						{}
	| EXPRESIONARIT TK_POR EXPRESIONARIT       						{}
	| EXPRESIONARIT TK_DIVIDIDO EXPRESIONARIT  						{}
	| TK_par_apertura EXPRESIONARIT TK_par_cierre       			{}
	| TK_not EXPRESIONARIT											{}
	| TK_SIN TK_par_apertura EXPRESIONARIT TK_par_cierre			{}
	| TK_COS TK_par_apertura EXPRESIONARIT TK_par_cierre			{}
	| TK_LOG TK_par_apertura EXPRESIONARIT TK_par_cierre			{}
	| TK_TAN TK_par_apertura EXPRESIONARIT TK_par_cierre			{}
	| TK_SQRT TK_par_apertura EXPRESIONARIT TK_par_cierre			{}
	| TK_POW TK_par_apertura EXPRESIONARIT TK_par_cierre			{}
	| TK_PARSE TK_par_apertura EXPRESIONARIT TK_par_cierre			{}
	| EXPRESIONARIT TK_concat EXPRESIONARIT       					{}
	| EXPRESIONARIT TK_potencia TK_ENTERO		       				{}
	| EXPRESIONARIT TK_punto EXPRESIONARIT       					{}
	| VALORES														{}
;


IMPRESION: TK_PRINT TK_par_apertura EXPRESIONARIT TK_par_cierre FIN_LINEA		{}
		|TK_PRINTLN TK_par_apertura EXPRESIONARIT TK_par_cierre	FIN_LINEA		{}
		|TK_PRINT TK_par_apertura EXPRESIONARIT ASIGNACION_TERNARIA TK_par_cierre FIN_LINEA		{}
		|TK_PRINTLN TK_par_apertura EXPRESIONARIT ASIGNACION_TERNARIA TK_par_cierre	FIN_LINEA		{}
		|TK_PRINT TK_par_apertura EXPRESIONARIT MAS_VALORES_IMPRESION TK_par_cierre FIN_LINEA		{}
		|TK_PRINTLN TK_par_apertura EXPRESIONARIT MAS_VALORES_IMPRESION TK_par_cierre FIN_LINEA		{}
;

MAS_VALORES_IMPRESION: MAS_VALORES_IMPRESION TK_coma EXPRESIONARIT
					|TK_coma EXPRESIONARIT
;


ASIGNACION: TK_ID TK_igual EXPRESIONARIT FIN_LINEA_ASIGNACION					{}
			|TK_ID TK_ID FIN_LINEA												{}
			|TK_ID TK_ID TK_igual EXPRESIONARIT FIN_LINEA_ASIGNACION			{}
			|TK_ID TK_punto TK_ID TK_igual EXPRESIONARIT FIN_LINEA				{}
			|TK_ID SIGNOS_COMPARACION EXPRESIONARIT FIN_LINEA_ASIGNACION		{}
			|TK_ID TK_igual TK_llave_apertura EXPRESIONARIT MAS_VALORES_IMPRESION TK_llave_cierre FIN_LINEA_ASIGNACION					{}
			|TK_ID TK_igual TK_llave_apertura EXPRESIONARIT TK_llave_cierre FIN_LINEA_ASIGNACION					{}
			|TK_ID TK_par_apertura EXPRESIONARIT TK_par_cierre FIN_LINEA	{}
			|TK_ID TK_par_apertura EXPRESIONARIT MAS_VALORES_IMPRESION TK_par_cierre FIN_LINEA	{}
			|TK_ID TK_par_apertura  TK_par_cierre FIN_LINEA	{}
;

FIN_LINEA_ASIGNACION: TK_pcoma										{}
					| TK_SALTO_LINEA        						{}
					| ASIGNACION_TERNARIA FIN_LINEA					{}
;


ASIGNACION_TERNARIA:  TK_pregunta EXPRESIONARIT TK_dos_puntos EXPRESIONARIT 
;

SIGNOS_COMPARACION: TK_mayor_igual        				{}
	|  TK_menor_igual        							{}
	|  TK_mayor											{}
	|  TK_menor 										{}
	|  TK_igualacion 									{}
	|  TK_desigual 										{}
;

PARAMETROS: PARAMETROS TK_coma EXPRESIONARIT
			|TK_coma EXPRESIONARIT
			|EXPRESIONARIT
;

FUNCIONES_NATIVAS: TK_TOINT TK_par_apertura EXPRESIONARIT TK_par_cierre			{}
				|TK_TODOUBLE TK_par_apertura EXPRESIONARIT TK_par_cierre			{}

;

FUNCIONES: TK_FUNCTION TK_ID TK_par_apertura PARAMETRO_FUNSION TK_par_cierre TK_corchete_apertura INSTRUCCIONES TK_corchete_cierre
		| TK_FUNCTION TK_ID TK_par_apertura  TK_par_cierre TK_corchete_apertura INSTRUCCIONES TK_corchete_cierre
;

PARAMETRO_FUNSION: TIPO_VALOR TK_ID							{}
				| TIPO_VALOR TK_ID MAS_PARAMETROS_FUNSION   {}
;

MAS_PARAMETROS_FUNSION: MAS_PARAMETROS_FUNSION TK_coma TIPO_VALOR TK_ID		{}
				|TK_coma TIPO_VALOR TK_ID									{}
;

RETURN: TK_RETURN EXPRESIONARIT FIN_LINEA															{}
		| TK_RETURN TK_ID TK_par_apertura PARAMETRO_FUNSION TK_par_cierre FIN_LINEA					{}
		| TK_RETURN  FIN_LINEA
;

CONDICIONALES: FUNCION_IF																	{}
			| FUNCION_SWITCH																{}
;

FUNCION_IF:  TK_IF TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura INSTRUCCIONES TK_corchete_cierre FIN_LINEA					{}
			|TK_IF TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura INSTRUCCIONES TK_corchete_cierre FIN_LINEA FUNCION_ELSEIF		{}
			|TK_IF TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura INSTRUCCIONES TK_corchete_cierre FIN_LINEA FUNCION_ELSE		{}
;

FUNCION_ELSEIF: FUNCION_ELSEIF TK_ELSEIF TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura INSTRUCCIONES TK_corchete_cierre 	TK_SALTO_LINEA	{}
			|FUNCION_ELSEIF TK_ELSEIF TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura INSTRUCCIONES TK_corchete_cierre TK_SALTO_LINEA FUNCION_ELSE	{}
			|TK_ELSEIF TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura INSTRUCCIONES TK_corchete_cierre TK_SALTO_LINEA 		{}
			//|TK_ELSEIF TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura INSTRUCCIONES TK_corchete_cierre 				 		{}
;	

FUNCION_ELSE:TK_ELSE TK_corchete_apertura INSTRUCCIONES TK_corchete_cierre	
			//| MAS_SALTOS_LINEA TK_ELSE TK_corchete_apertura INSTRUCCIONES TK_corchete_cierre
;

FUNCION_SWITCH: TK_SWITCH TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura SENTENCIAS_CASE TK_corchete_cierre	{}
				|TK_SWITCH TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura TK_SALTO_LINEA SENTENCIAS_CASE  TK_corchete_cierre	{}
;

SENTENCIAS_CASE: TK_CASE EXPRESIONARIT TK_dos_puntos TK_SALTO_LINEA INSTRUCCIONES TK_BREAK TK_pcoma							{}
				|TK_CASE EXPRESIONARIT TK_dos_puntos TK_SALTO_LINEA INSTRUCCIONES TK_BREAK  TK_pcoma TK_SALTO_LINEA SENTENCIAS_CASE							{}
				|TK_CASE EXPRESIONARIT TK_dos_puntos TK_SALTO_LINEA INSTRUCCIONES TK_BREAK  TK_pcoma TK_SALTO_LINEA  MAS_SALTOS_LINEA  SENTENCIAS_CASE							{}
				|TK_CASE EXPRESIONARIT TK_dos_puntos TK_SALTO_LINEA INSTRUCCIONES SENTENCIAS_CASE
				|TK_DEFAULT TK_dos_puntos INSTRUCCIONES
;

MAS_SALTOS_LINEA: MAS_SALTOS_LINEA TK_SALTO_LINEA																								{}
				| TK_SALTO_LINEA																												{}
;