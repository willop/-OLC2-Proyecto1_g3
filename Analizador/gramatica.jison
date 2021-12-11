/**
 * Ejemplo mi primer proyecto con Jison utilizando Nodejs en Ubuntu
 */

/* Definición Léxica */
%lex

%options case-insensitive

%%

\/\/.*										//return 'TK_COMENTARIO';// comentario simple línea
\/\*(\*(?!\/)|[^*])*\*\/\n					//return 'TK_COMENTARIO_MULTI';//; comentario multiple líneas


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
"else if"					return 'TK_ELSEIF';
"else"						return 'TK_ELSE';
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
"main"						return 'TK_MAIN';
"void"						return 'TK_VOID';
/*Signos de ARITMETICOS*/
"++"						return 'TK_INCREMENTO'
"--"						return 'TK_DECREMENTO'


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

\n	                 		//return 'TK_SALTO_LINEA'
/* Espacios en blanco */
\s+											// se ignoran espacios en blanco


[0-9]+("."[0-9]+)    		return 'TK_DECIMAL'; 
[0-9]+	                	return 'TK_ENTERO';   
\"[^\"]*\"					return 'TK_CADENA';
\'[^\']*\'					return 'TK_CARACTER';
([a-zA-Z])[a-zA-Z0-9_]*		return 'TK_ID';



<<EOF>>                 return 'EOF';

//.                       { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }
.						  {lisErr.push({err: 'Error Lexico', lex: yytext, fil: yylloc.first_line, col: yylloc.first_column, des:'Simbolo Desconocido'}); }

/lex

/* constantes */
%{
	//para el objeto de impresion
	function FImpresion(_tipoimpresion,_valorimpresion,_raro){
		return {tipo:_tipoimpresion, valor:_valorimpresion,What:_raro};
	}

	//para declaraciones de funciones
	function FDeclaracion(_tipo,_nombre,_valor){
		return {tipo:_tipo,nombre:_nombre,valorvar:_valor};
	}

	//almacenamiento de errores
	function FErrores(_tipo,_caracter,_fila,_columna,_descrip){
		return{tipo:_tipo,Caracter:_caracter,Fila:_fila,Columna:_columna,Descripcion:_descrip};
	}

%}




/* Asociación de operadores y precedencia */
//presedencia hacia abajo
%left  'TK_igual'  'TK_punto'
%left 'TK_pregunta'
%left 'TK_or'
%left 'TK_and'
%left 'TK_potencia'
%left 'TK_concat'
%left 'TK_igualacion' 'TK_desigual'
%left 'TK_mayor' 'TK_menor' 'TK_menor_igual' 'TK_mayor_igual'
%left 'TK_MAS' 'TK_MENOS'
%left 'TK_POR' 'TK_DIVIDIDO' 'TK_MODULO' 'TK_POW'  'TK_SIN'   'TK_COS'  'TK_TAN'   'TK_LOG'  'TK_SQRT' 'TK_PARSE' // Duda
%left 'TK_not' 'TK_numeral' 
%left 'TK_INCREMENTO' 'TK_DECREMENTO' 
%left UMENOS
 


%start ini

%% /* Definición de la gramática */

ini
	: INSTRUCCIONES EOF																									{console.log($1); return $1;}
;

INSTRUCCIONES :INSTRUCCIONES_GLOBALES VOID_MAIN INSTRUCCIONES_GLOBALES													{$1.concat($2); $1.concat($3); $$ = $1}
	| VOID_MAIN INSTRUCCIONES_GLOBALES																					{$$ = $2.concat($1);}
	| INSTRUCCIONES_GLOBALES VOID_MAIN 																					{$$ = $1.concat($2);}
	| VOID_MAIN																											{$$ =  [$1]}
	//| error{$$=FErrores('Lexico',yytext,this._$.first_line,this._$.first_column,'Necesita metodo main');}											
	//| error { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); }
;

VOID_MAIN: TK_VOID TK_MAIN TK_par_apertura TK_par_cierre TK_corchete_apertura INSTRUCCION TK_corchete_cierre			{$$ = new Instrucciones($6,this._$.first_line,this._$.first_column,"MAIN")}	
;

INSTRUCCION: INSTRUCCION DECLARACION 			{$1.push($2); $$ = $1}
	| INSTRUCCION IMPRESION					    {$1.push($2); $$ = $1}
	| INSTRUCCION ASIGNACION					{$1.push($2); $$ = $1}
	| INSTRUCCION FUNCIONES_NATIVAS				{$1.push($2); $$ = $1}
	| INSTRUCCION FUNCIONES						{$1.push($2); $$ = $1}
	| INSTRUCCION RETURN						{$1.push($2); $$ = $1}
	| INSTRUCCION CONDICIONALES					{$1.push($2); $$ = $1}
	| INSTRUCCION BUCLES						{$1.push($2); $$ = $1}
	| DECLARACION 								{$$ = [$1]}
	| IMPRESION									{$$ = [$1]}
	| ASIGNACION								{$$ = [$1]}
	| FUNCIONES_NATIVAS							{$$ = [$1]}
	| FUNCIONES									{$$ = [$1]}	
	| RETURN									{$$ = [$1]}
	| CONDICIONALES								{$$ = [$1]}
	| BUCLES									{$$ = [$1]}	
	
;

INSTRUCCIONES_GLOBALES: INSTRUCCIONES_GLOBALES ASIGNACION			{$1.push($2); $$ = $1}
					| INSTRUCCIONES_GLOBALES DECLARACION			{$1.push($2); $$ = $1}
					| INSTRUCCIONES_GLOBALES FUNCIONES				{$1.push($2); $$ = $1}
					| ASIGNACION									{$$ = [$1]}
					| DECLARACION									{$$ = [$1]}
					| FUNCIONES										{$$ = [$1]}
;

INSTRUCCION2: DECLARACION 			{$$ = $1}
	| IMPRESION						{$$ = $1}
	| ASIGNACION					{$$ = $1}	
	| FUNCIONES_NATIVAS				{$$ = $1}
	| FUNCIONES						{$$ = $1}
	| RETURN						{$$ = $1}
	| BUCLES						{$$ = $1}	
;


DECLARACION: TIPO_VALOR TIPO_DECLARACION												{var asignacion = $2; asignacion.tipo = $1; $$ = asignacion}
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
				| TK_ID TK_ID TK_igual EXPRESIONARIT FIN_LINEA_STRUCT
				| TK_ID TK_ID FIN_LINEA_STRUCT

;
				
FIN_LINEA_STRUCT: TK_coma
				| TK_pcoma
;

TIPO_DECLARACION : TK_ID IGUALACION																									{var asignacion = $2; asignacion.id = $1; $$ = asignacion}
				| TK_ID TK_par_apertura PARAMETRO_FUNSION TK_par_cierre TK_corchete_apertura INSTRUCCION TK_corchete_cierre			{}
				| COND_ARREGLO TK_ID IGUALACION																						{}
;

FIN_LINEA: TK_pcoma																													{}
;


TIPO_VALOR: TK_STRING 																												{$$= Tipo.STRING}
		|TK_INT																														{$$= Tipo.INTEGER}
		|TK_BOOLEAN																													{$$= Tipo.BOOLEAN}
		|TK_DOUBLE																													{$$= Tipo.DOUBLE}
		|TK_CHAR																													{$$= Tipo.CHAR}
;

COND_ARREGLO: TK_llave_apertura TK_llave_cierre																						{}

;

IGUALACION: TK_igual EXPRESIONARIT FIN_LINEA						{$$ = new Declaracion($2,this._$.first_line,this._$.first_column,null,null)}
			|TK_igual EXPRESIONARIT ASIGNACION_TERNARIA FIN_LINEA	{}
			|TK_igual ARREGLO FIN_LINEA								{}
			|MAS_VARIABLES FIN_LINEA								{}
			|FIN_LINEA
;

MAS_VARIABLES: MAS_VARIABLES TK_coma TK_ID
			|TK_coma TK_ID

;

VALORES: TK_CADENA															{var a = $1; var al=a.length; var c = a.substring(1,al-1);    $$ = new Literal(c,Tipo.STRING,this._$.first_line,this._$.first_column);}
		|TK_NULL															{}
		|TK_TRUE															{$$ = new Literal(true,Tipo.BOOLEAN,this._$.first_line,this._$.first_column);}
		|TK_FALSE															{$$ = new Literal(false,Tipo.BOOLEAN,this._$.first_line,this._$.first_column);}
		|TK_CARACTER														{var a = $1; var al=a.length; var c = a.substring(1,al-1);    $$ = new Literal(c,Tipo.CHAR,this._$.first_line,this._$.first_column);}
		|TK_ID 																{$$ = new Acceso($1,this._$.first_line,this._$.first_column);}
		|TK_ID TK_par_apertura TK_par_cierre								{}
		|TK_ID TK_par_apertura PARAMETROS TK_par_cierre						{}
		|TK_ID ARREGLO														{}
		|TK_ENTERO                        									{$$ = new Literal(parseInt($1),Tipo.INTEGER,this._$.first_line,this._$.first_column)}
		|TK_DECIMAL                       									{$$ = new Literal(parseFloat($1),Tipo.DOUBLE,this._$.first_line,this._$.first_column);}
		|TK_BEGIN 															{}
		|TK_END 															{}
		|TK_CARETER_OF_POSITION TK_par_apertura VALORES TK_par_cierre		{}
		|TK_TOLOWERCASE	TK_par_apertura TK_par_cierre						{}
		|TK_SUBSTRING TK_par_apertura VALORES TK_coma VALORES TK_par_cierre {}
		|TK_TOUPPERCASE TK_par_apertura  TK_par_cierre						{}
		|TK_LENGTH TK_par_apertura  TK_par_cierre 							{}
		|TK_TYPEOF TK_par_apertura EXPRESIONARIT TK_par_cierre				{}
		|FUNCIONES_NATIVAS													{}
;

ARREGLO: TK_llave_apertura EXPRESIONARIT TK_llave_cierre										{}
		|TK_llave_apertura ARREGLO TK_llave_cierre										{}
		|TK_llave_apertura EXPRESIONARIT MAS_VALORES_IMPRESION TK_llave_cierre					{}
		|TK_llave_apertura ARREGLO MAS_VALORES_IMPRESION TK_llave_cierre					{}
		|TK_llave_apertura EXPRESIONARIT TK_dos_puntos EXPRESIONARIT TK_llave_cierre					{}
;


EXPRESIONARIT
	: TK_MENOS EXPRESIONARIT %prec UMENOS  							{ $$ = -Math.abs($2); } //new Aritmetica(1,-$2,TipoAritmetica.MULTIPLICACION,this._$.first_line,this._$.first_column)   ////Duda
	| EXPRESIONARIT TK_and EXPRESIONARIT       						{$$ = new Logica($1,$3,TipoLogica.AND,this._$.first_line,this._$.first_column);}
	| EXPRESIONARIT TK_or EXPRESIONARIT								{$$ = new Logica($1,$3,TipoLogica.OR,this._$.first_line,this._$.first_column);}
	| EXPRESIONARIT TK_mayor_igual EXPRESIONARIT       				{$$ = new Relacional($1,$3,TipoRelacional.MAYOR_IGUAL,this._$.first_line,this._$.first_column);}
	| EXPRESIONARIT TK_menor_igual EXPRESIONARIT       				{$$ = new Relacional($1,$3,TipoRelacional.MENOR_IGUAL,this._$.first_line,this._$.first_column);}
	| EXPRESIONARIT TK_mayor EXPRESIONARIT       					{$$ = new Relacional($1,$3,TipoRelacional.MAYOR_QUE,this._$.first_line,this._$.first_column);}
	| EXPRESIONARIT TK_menor EXPRESIONARIT							{$$ = new Relacional($1,$3,TipoRelacional.MENOR_QUE,this._$.first_line,this._$.first_column);}
	| EXPRESIONARIT TK_igualacion EXPRESIONARIT						{$$ = new Relacional($1,$3,TipoRelacional.IGUALDAD,this._$.first_line,this._$.first_column);}
	| EXPRESIONARIT TK_desigual EXPRESIONARIT						{$$ = new Relacional($1,$3,TipoRelacional.DESIGUALDAD,this._$.first_line,this._$.first_column);}
	| EXPRESIONARIT TK_INCREMENTO									{}
	| EXPRESIONARIT TK_DECREMENTO									{}
	| EXPRESIONARIT TK_MAS EXPRESIONARIT       						{$$ = new Aritmetica($1,$3,TipoAritmetica.SUMA,this._$.first_line,this._$.first_column)}
	| EXPRESIONARIT TK_MENOS EXPRESIONARIT     						{$$ = new Aritmetica($1,$3,TipoAritmetica.RESTA,this._$.first_line,this._$.first_column)}
	| EXPRESIONARIT TK_numeral TK_POR EXPRESIONARIT       			{}
	| EXPRESIONARIT TK_POR EXPRESIONARIT       						{$$ = new Aritmetica($1,$3,TipoAritmetica.MULTIPLICACION,this._$.first_line,this._$.first_column)}
	| EXPRESIONARIT TK_DIVIDIDO EXPRESIONARIT  						{$$ = new Aritmetica($1,$3,TipoAritmetica.DIVISION,this._$.first_line,this._$.first_column)}
	| TK_par_apertura EXPRESIONARIT TK_par_cierre       			{$$ = $2}
	| TK_not EXPRESIONARIT											{$$ = new Logica($2,$2,TipoLogica.NOT,this._$.first_line,this._$.first_column);}
	| TK_SIN TK_par_apertura EXPRESIONARIT TK_par_cierre			{}
	| TK_COS TK_par_apertura EXPRESIONARIT TK_par_cierre			{}
	| TK_LOG TK_par_apertura EXPRESIONARIT TK_par_cierre			{}
	| TK_TAN TK_par_apertura EXPRESIONARIT TK_par_cierre			{}
	| TK_SQRT TK_par_apertura EXPRESIONARIT TK_par_cierre			{}
	| TK_POW TK_par_apertura EXPRESIONARIT TK_par_cierre			{}
	| TK_PARSE TK_par_apertura EXPRESIONARIT TK_par_cierre			{}
	| TK_numeral EXPRESIONARIT										{}
	| EXPRESIONARIT TK_concat EXPRESIONARIT       					{ var a = $1; var al=a.length; var b = $3; var bl = b.length; var c = a.substring(1,al-1); var d = b.substring(1,bl-1); var total = c+d;  $$ = total;}
	| EXPRESIONARIT TK_potencia EXPRESIONARIT		       			{ $$ = new Potencia($1,$3,this._$.first_line,this._$.first_column);}
	| EXPRESIONARIT TK_punto EXPRESIONARIT       					{}
	| EXPRESIONARIT TK_MODULO EXPRESIONARIT       					{$$ = new Aritmetica($1,$3,TipoAritmetica.MODULO,this._$.first_line,this._$.first_column);}
	| VALORES														{$$ = $1;}
;


IMPRESION: TK_PRINT TK_par_apertura EXPRESIONARIT TK_par_cierre FIN_LINEA							{$$ = new Print($3,this._$.first_line,this._$.first_column,false);}  
		|TK_PRINTLN TK_par_apertura EXPRESIONARIT TK_par_cierre	FIN_LINEA							{$$ = new Print($3,this._$.first_line,this._$.first_column,true);}
		|TK_PRINT TK_par_apertura EXPRESIONARIT ASIGNACION_TERNARIA TK_par_cierre FIN_LINEA			{}
		|TK_PRINTLN TK_par_apertura EXPRESIONARIT ASIGNACION_TERNARIA TK_par_cierre	FIN_LINEA		{}
		|TK_PRINT TK_par_apertura EXPRESIONARIT MAS_VALORES_IMPRESION TK_par_cierre FIN_LINEA		{var a = $4.valor; var b = $3.valor; var c = b+a; $3.valor = c;  $$ = new Print($3,this._$.first_line,this._$.first_column,false);}
		|TK_PRINTLN TK_par_apertura EXPRESIONARIT MAS_VALORES_IMPRESION TK_par_cierre FIN_LINEA		{var a = $4.valor; var b = $3.valor; var c = b+a; $3.valor = c;  $$ = new Print($3,this._$.first_line,this._$.first_column,true);}
;

MAS_VALORES_IMPRESION: MAS_VALORES_IMPRESION TK_coma EXPRESIONARIT									{var a = $1.valor; var b = $3.valor; $1.valor= " "+a+" "+b; $$ = $1;}
					|MAS_VALORES_IMPRESION TK_coma ARREGLO											{}
					|TK_coma ARREGLO																{}
					|TK_coma EXPRESIONARIT															{$$ = $2;}
;


ASIGNACION: TK_ID TK_igual EXPRESIONARIT FIN_LINEA_ASIGNACION					 {$$ = new Asignacion($3,this._$.first_line,this._$.first_column,$1)}
			|TK_ID TK_ID FIN_LINEA												 {}
			|TK_ID TK_ID TK_igual EXPRESIONARIT FIN_LINEA_ASIGNACION			 {}
			|TK_ID MAS_ATRIBUTOS TK_igual EXPRESIONARIT FIN_LINEA 				 {}
			|TK_ID MAS_ATRIBUTOS ARREGLO TK_igual EXPRESIONARIT FIN_LINEA 		 {}
			|TK_ID SIGNOS_COMPARACION EXPRESIONARIT FIN_LINEA_ASIGNACION		 {}
			|TK_ID TK_igual TK_llave_apertura EXPRESIONARIT MAS_VALORES_IMPRESION TK_llave_cierre FIN_LINEA_ASIGNACION					{}
			|TK_ID TK_igual TK_llave_apertura EXPRESIONARIT TK_llave_cierre FIN_LINEA_ASIGNACION					{}
			|TK_ID TK_par_apertura EXPRESIONARIT TK_par_cierre FIN_LINEA	{}
			|TK_ID TK_par_apertura EXPRESIONARIT MAS_VALORES_IMPRESION TK_par_cierre FIN_LINEA	{}
			|TK_ID TK_par_apertura  TK_par_cierre FIN_LINEA										{}
			|TK_ID TK_DECREMENTO FIN_LINEA 													{}
			|TK_ID TK_INCREMENTO FIN_LINEA														{}
			|TK_ID TK_llave_apertura EXPRESIONARIT TK_llave_cierre 								{}
			|TK_ID TK_llave_apertura TK_llave_cierre											{}
			|TK_ID TK_llave_apertura EXPRESIONARIT TK_llave_cierre IGUALACION					{}
			|TK_ID TK_llave_apertura TK_llave_cierre IGUALACION									{}
			|TK_ID FUNCIONES_ARREGLO															{}
;

MAS_ATRIBUTOS: MAS_ATRIBUTOS TK_punto TK_ID 													{}
			| TK_punto TK_ID 																	{}
;

FUNCIONES_ARREGLO: TK_punto TK_PUSH TK_par_apertura EXPRESIONARIT TK_par_cierre TK_pcoma		{}
				|TK_punto TK_POP TK_par_apertura TK_par_cierre TK_pcoma							{}
				|TK_punto TK_LENGTH TK_par_apertura TK_par_cierre TK_pcoma						{}
;


FIN_LINEA_ASIGNACION: TK_pcoma										{}
					| ASIGNACION_TERNARIA FIN_LINEA					{}
;


ASIGNACION_TERNARIA: ASIGNACION_TERNARIA TK_pregunta EXPRESIONARIT TK_dos_puntos EXPRESIONARIT 
					| TK_pregunta EXPRESIONARIT TK_dos_puntos EXPRESIONARIT 
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

FUNCIONES_NATIVAS: TK_TOINT TK_par_apertura EXPRESIONARIT TK_par_cierre				{}
				|TK_TODOUBLE TK_par_apertura EXPRESIONARIT TK_par_cierre			{}

;

FUNCIONES: TK_FUNCTION TK_ID TK_par_apertura PARAMETRO_FUNSION TK_par_cierre TK_corchete_apertura INSTRUCCION TK_corchete_cierre		{}
		| TK_FUNCTION TK_ID TK_par_apertura TK_ID TK_par_cierre TK_corchete_apertura INSTRUCCION TK_corchete_cierre		{}
		| TK_FUNCTION TK_ID TK_par_apertura TK_ID MAS_PARAMETROS_FUNSION TK_par_cierre TK_corchete_apertura INSTRUCCION TK_corchete_cierre		{}
		| TK_FUNCTION TK_ID TK_par_apertura  TK_par_cierre TK_corchete_apertura INSTRUCCION TK_corchete_cierre						{}
;

PARAMETRO_FUNSION: TIPO_VALOR TK_ID							{}
				| TIPO_VALOR TK_ID MAS_PARAMETROS_FUNSION   {}
				| TK_ID TK_ID								{}
				| TK_ID TK_ID MAS_PARAMETROS_FUNSION		{}
;

MAS_PARAMETROS_FUNSION: MAS_PARAMETROS_FUNSION TK_coma TIPO_VALOR TK_ID		{}
				|MAS_PARAMETROS_FUNSION TK_coma TK_ID TK_ID					{}
				|MAS_PARAMETROS_FUNSION TK_coma TK_ID 						{}
				|TK_coma TIPO_VALOR TK_ID									{}
				|TK_coma TK_ID TK_ID										{}
				|TK_coma TK_ID												{}
;

RETURN: TK_RETURN EXPRESIONARIT FIN_LINEA															{}
		| TK_RETURN TK_ID TK_par_apertura PARAMETRO_FUNSION TK_par_cierre FIN_LINEA					{}
		| TK_RETURN  FIN_LINEA
;

CONDICIONALES: FUNCION_IF																	{}
			| FUNCION_SWITCH																{}
;

FUNCION_IF:  TK_IF TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura INSTRUCCION TK_corchete_cierre 					{}
			|TK_IF TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura INSTRUCCION TK_corchete_cierre  FUNCION_ELSEIF		{}
			|TK_IF TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura INSTRUCCION TK_corchete_cierre  FUNCION_ELSE		{}
			|TK_IF TK_par_apertura EXPRESIONARIT TK_par_cierre  INSTRUCCION2 					{}
			|TK_IF TK_par_apertura EXPRESIONARIT TK_par_cierre  INSTRUCCION2  FUNCION_ELSEIF		{}
			|TK_IF TK_par_apertura EXPRESIONARIT TK_par_cierre  INSTRUCCION2  FUNCION_ELSE		{}
;

FUNCION_ELSEIF: FUNCION_ELSEIF TK_ELSEIF TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura INSTRUCCION TK_corchete_cierre 		{}
			|FUNCION_ELSEIF TK_ELSEIF TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura INSTRUCCION TK_corchete_cierre  FUNCION_ELSE	{}
			|TK_ELSEIF TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura INSTRUCCION TK_corchete_cierre  		{}
			//|TK_ELSEIF TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura INSTRUCCIONES TK_corchete_cierre 				 		{}
;	

FUNCION_ELSE:TK_ELSE TK_corchete_apertura INSTRUCCION TK_corchete_cierre	
			|TK_ELSE INSTRUCCION2 
			//| MAS_SALTOS_LINEA TK_ELSE TK_corchete_apertura INSTRUCCIONES TK_corchete_cierre

;

FUNCION_SWITCH: TK_SWITCH TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura SENTENCIAS_CASE TK_corchete_cierre	{}
;
``````
SENTENCIAS_CASE: TK_CASE EXPRESIONARIT TK_dos_puntos  INSTRUCCION TK_BREAK TK_pcoma							{}
				|TK_CASE EXPRESIONARIT TK_dos_puntos  INSTRUCCION TK_BREAK  TK_pcoma  SENTENCIAS_CASE							{}
				|TK_CASE EXPRESIONARIT TK_dos_puntos  INSTRUCCION SENTENCIAS_CASE
				|TK_DEFAULT TK_dos_puntos INSTRUCCION
;


BUCLES: BUCLE_WHILE
		|BUCLE_DO_WHILE
		|BUCLE_FOR
;


BUCLE_WHILE: TK_WHILE TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura  INSTRUCCION TK_corchete_cierre
;

BUCLE_DO_WHILE: TK_DO TK_corchete_apertura INSTRUCCION TK_corchete_cierre TK_WHILE TK_par_apertura EXPRESIONARIT TK_par_cierre TK_pcoma
;

BUCLE_FOR: TK_FOR TK_par_apertura DECLARACION  EXPRESIONARIT TK_pcoma EXPRESIONARIT TK_par_cierre TK_corchete_apertura INSTRUCCION TK_corchete_cierre
		| TK_FOR TK_par_apertura ASIGNACION  EXPRESIONARIT TK_pcoma EXPRESIONARIT TK_par_cierre TK_corchete_apertura INSTRUCCION TK_corchete_cierre
		| TK_FOR TK_ID TK_IN EXPRESIONARIT TK_corchete_apertura INSTRUCCION TK_corchete_cierre 
		| TK_FOR TK_ID TK_IN ARREGLO TK_corchete_apertura INSTRUCCION TK_corchete_cierre 
		//| TK_FOR TK_ID TK_IN TK_ID ARREGLO TK_corchete_apertura INSTRUCCIONES TK_corchete_cierre 
;