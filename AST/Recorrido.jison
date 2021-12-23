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

	var GexpresionSwitch ;


%}




/* Asociación de operadores y precedencia */
//presedencia hacia abajo
%left  'TK_igual'  'TK_punto' 'TK_coma'
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
	: INSTRUCCIONES EOF																									{console.log("Hola desde recorrido;");$$ = new Nodo_arbol("Gramatica");
																														$$.sethijo($1);
																														return $$;
																														}
;

INSTRUCCIONES :VOID_MAIN																								{}
	| INSTRUCCIONES_GLOBALES VOID_MAIN 																					{}
	| VOID_MAIN INSTRUCCIONES_GLOBALES																					{}
	|INSTRUCCIONES_GLOBALES VOID_MAIN INSTRUCCIONES_GLOBALES															{}
	//| error{$$=FErrores('Lexico',yytext,this._$.first_line,this._$.first_column,'Necesita metodo main');}											
	//| error { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); }
;

VOID_MAIN: TK_VOID TK_MAIN TK_par_apertura TK_par_cierre TK_corchete_apertura INSTRUCCION TK_corchete_cierre			{ $$ = new Nodo_arbol("MAIN")
																														$$.sethijo(new Nodo_arbol($1));
																														$$.sethijo(new Nodo_arbol($2));
																														$$.sethijo(new Nodo_arbol($3));
																														$$.sethijo(new Nodo_arbol($4));
																														$$.sethijo(new Nodo_arbol($5));
																														$$.sethijo($6);
																														$$.sethijo(new Nodo_arbol($7));
																														}	
;


INSTRUCCION: INSTRUCCION DECLARACION 			{$$ = new Nodo_arbol("INSTRUCCION"); $$.sethijo($1); $$.sethijo($2);}
	| INSTRUCCION IMPRESION					    {$$ = new Nodo_arbol("INSTRUCCION"); $$.sethijo($1); $$.sethijo($2);}
	| INSTRUCCION ASIGNACION					{$$ = new Nodo_arbol("INSTRUCCION"); $$.sethijo($1); $$.sethijo($2);}
	| INSTRUCCION FUNCIONES_NATIVAS				{$$ = new Nodo_arbol("INSTRUCCION"); $$.sethijo($1); $$.sethijo($2);}
	//| INSTRUCCION LLAMADA_FUNCION				{$$ = new Nodo_arbol("INSTRUCCION"); $$.sethijo($1); $$.sethijo($2)}
	| INSTRUCCION BREAK							{$$ = new Nodo_arbol("INSTRUCCION"); $$.sethijo($1); $$.sethijo($2);}
	| INSTRUCCION RETURN						{$$ = new Nodo_arbol("INSTRUCCION"); $$.sethijo($1); $$.sethijo($2);}
	| INSTRUCCION CONDICIONALES					{$$ = new Nodo_arbol("INSTRUCCION"); $$.sethijo($1); $$.sethijo($2);}
	| INSTRUCCION BUCLES						{$$ = new Nodo_arbol("INSTRUCCION"); $$.sethijo($1); $$.sethijo($2);}
	| DECLARACION 								{$$ = new Nodo_arbol("INSTRUCCION"); $$.sethijo($1);}
	| IMPRESION									{$$ = new Nodo_arbol("INSTRUCCION"); $$.sethijo($1);}
	| ASIGNACION								{$$ = new Nodo_arbol("INSTRUCCION"); $$.sethijo($1);}
	| FUNCIONES_NATIVAS							{$$ = new Nodo_arbol("INSTRUCCION"); $$.sethijo($1);}
	//| LLAMADA_FUNCION							{}
	| RETURN									{$$ = new Nodo_arbol("INSTRUCCION"); $$.sethijo($1);}
	| BREAK										{$$ = new Nodo_arbol("INSTRUCCION"); $$.sethijo($1);}
	| CONDICIONALES								{$$ = new Nodo_arbol("INSTRUCCION"); $$.sethijo($1);}
	| BUCLES									{$$ = new Nodo_arbol("INSTRUCCION"); $$.sethijo($1);}
	
;

LISTA_INSTRUCCIONES: INSTRUCCION {}
;

INSTRUCCIONES_GLOBALES: INSTRUCCIONES_GLOBALES ASIGNACION			{$$ = new Nodo_arbol("INSTRUCCIONES_GLOBALES"); $$.sethijo($1); $$.sethijo($2);}
					| INSTRUCCIONES_GLOBALES STRUCT					{$$ = new Nodo_arbol("INSTRUCCIONES_GLOBALES"); $$.sethijo($1); $$.sethijo($2);}
					| INSTRUCCIONES_GLOBALES DECLARACION			{$$ = new Nodo_arbol("INSTRUCCIONES_GLOBALES"); $$.sethijo($1); $$.sethijo($2);}
					//| INSTRUCCIONES_GLOBALES FUNCIONES			{}
					| STRUCT										{$$ = new Nodo_arbol("INSTRUCCIONES_GLOBALES"); $$.sethijo($1);}
					| ASIGNACION									{$$ = new Nodo_arbol("INSTRUCCIONES_GLOBALES"); $$.sethijo($1);}
					| DECLARACION									{$$ = new Nodo_arbol("INSTRUCCIONES_GLOBALES"); $$.sethijo($1);}
;


INSTRUCCION2: DECLARACION 			{$$ = new Nodo_arbol("INSTRUCCION2"); $$.sethijo($1);}
	| IMPRESION						{$$ = new Nodo_arbol("INSTRUCCION2"); $$.sethijo($1);}
	| ASIGNACION					{$$ = new Nodo_arbol("INSTRUCCION2"); $$.sethijo($1);}
	| FUNCIONES_NATIVAS				{$$ = new Nodo_arbol("INSTRUCCION2"); $$.sethijo($1);}
	| RETURN						{$$ = new Nodo_arbol("INSTRUCCION2"); $$.sethijo($1);}
	| BUCLES						{$$ = new Nodo_arbol("INSTRUCCION2"); $$.sethijo($1);}
;



DECLARACION: TIPO_VALOR TIPO_DECLARACION																												{$$ = new Nodo_arbol("DECLARACION"); $$.sethijo($1); $$.sethijo($2);}
			| TIPO_VALOR TK_punto TK_PARSE TK_par_apertura TK_CADENA TK_par_cierre																		{$$ = new Nodo_arbol("DECLARACION"); $$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo(new Nodo_arbol($3));$$.sethijo(new Nodo_arbol($4));$$.sethijo(new Nodo_arbol($5));$$.sethijo(new Nodo_arbol($6));}
			| TIPO_VALOR TK_par_apertura EXPRESIONARIT TK_par_cierre FIN_LINEA																			{$$ = new Nodo_arbol("DECLARACION"); $$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);$$.sethijo(new Nodo_arbol($4));$$.sethijo($5);}
			| TIPO_VALOR TK_ID TK_par_apertura PARAMETRO_FUNSION TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre				{$$ = new Nodo_arbol("DECLARACION"); $$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo(new Nodo_arbol($3));$$.sethijo($4);$$.sethijo(new Nodo_arbol($5)); $$ .sethijo(new Nodo_arbol($6)); $$.sethijo($7);$$ .sethijo(new Nodo_arbol($8));}
			| TIPO_VALOR TK_ID TK_par_apertura TK_ID TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre							{$$ = new Nodo_arbol("DECLARACION"); $$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo(new Nodo_arbol($3));$$.sethijo(new Nodo_arbol($4));$$.sethijo(new Nodo_arbol($5)); $$ .sethijo($6);$$.sethijo($7);$$ .sethijo(new Nodo_arbol($8));}
			| TIPO_VALOR TK_ID TK_par_apertura TK_ID MAS_PARAMETROS_FUNSION TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre	{$$ = new Nodo_arbol("DECLARACION"); $$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo(new Nodo_arbol($3));$$.sethijo(new Nodo_arbol($4));$$.sethijo($5); $$ .sethijo(new Nodo_arbol($6));$$.sethijo(new Nodo_arbol($7)); $$.sethijo($8);$$.sethijo(new Nodo_arbol($9));}
			| TIPO_VALOR TK_ID TK_par_apertura  TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre								{$$ = new Nodo_arbol("DECLARACION"); $$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo(new Nodo_arbol($3));$$.sethijo(new Nodo_arbol($4));$$.sethijo(new Nodo_arbol($5));$$.sethijo($6);$$.sethijo(new Nodo_arbol($7));}
			//| STRUCT			
;

STRUCT : TK_STRUCT TK_ID TK_corchete_apertura  TK_corchete_cierre FIN_LINEA						{$$ = new Nodo_arbol("STRUCT"); $$.sethijo(new Nodo_arbol($1));$$.sethijo(new Nodo_arbol($2));$$.sethijo(new Nodo_arbol($3));$$.sethijo(new Nodo_arbol($4));$$.sethijo($5);}
		|TK_STRUCT TK_ID TK_corchete_apertura CONTENIDO_STRUCT TK_corchete_cierre FIN_LINEA		{$$ = new Nodo_arbol("STRUCT"); $$.sethijo(new Nodo_arbol($1));$$.sethijo(new Nodo_arbol($2));$$.sethijo(new Nodo_arbol($3));$$.sethijo($4);$$.sethijo(new Nodo_arbol($5));$$.sethijo($6);}
;

CONTENIDO_STRUCT:CONTENIDO_STRUCT TK_coma TIPO_VALOR TK_ID  {$$ = new Nodo_arbol("CONTENIDO_STRUCT");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);$$.sethijo(new Nodo_arbol($4));}
				| CONTENIDO_STRUCT TK_coma TK_ID TK_ID		{$$ = new Nodo_arbol("CONTENIDO_STRUCT");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo(new Nodo_arbol($3));$$.sethijo(new Nodo_arbol($4));}
				| TIPO_VALOR TK_ID							{$$ = new Nodo_arbol("CONTENIDO_STRUCT");$$.sethijo(new Nodo_arbol($1));$$.sethijo(new Nodo_arbol($2));}
				| TK_ID TK_ID								{$$ = new Nodo_arbol("CONTENIDO_STRUCT");$$.sethijo(new Nodo_arbol($1));$$.sethijo(new Nodo_arbol($2));}
;
/*TIPO_VALOR TK_ID TK_igual EXPRESIONARIT FIN_LINEA_STRUCT
				| TIPO_VALOR TK_ID FIN_LINEA_STRUCT
				| TK_ID TK_ID TK_igual EXPRESIONARIT FIN_LINEA_STRUCT
				| TK_ID TK_ID FIN_LINEA_STRUCT
*/

				
FIN_LINEA_STRUCT: TK_coma			{$$= new Nodo_arbol("FIN_LINEA_STRUCT");$$.sethijo(new Nodo_arbol($1));}
				| TK_pcoma			{$$= new Nodo_arbol("FIN_LINEA_STRUCT");$$.sethijo(new Nodo_arbol($1));}
;

TIPO_DECLARACION : TK_ID TK_igual EXPRESIONARIT FIN_LINEA							{$$ = new Nodo_arbol("TIPO_DECLARACION");$$.sethijo(new Nodo_arbol($1));$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);$$.sethijo($4);}
				| TK_ID TK_igual EXPRESIONARIT MAS_VALORES_IMPRESION FIN_LINEA		{$$ = new Nodo_arbol("TIPO_DECLARACION");$$.sethijo(new Nodo_arbol($1));$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);$$.sethijo($4);$$.sethijo($5);}
				| TK_ID  MAS_VARIABLES FIN_LINEA									{$$ = new Nodo_arbol("TIPO_DECLARACION");$$.sethijo(new Nodo_arbol($1));$$.sethijo($2);$$.sethijo($3);}
				| COND_ARREGLO TK_ID TK_igual EXPRESIONARIT FIN_LINEA				{$$ = new Nodo_arbol("TIPO_DECLARACION");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo(new Nodo_arbol($3));$$.sethijo($4);$$.sethijo($5);}
				| COND_ARREGLO TK_ID FIN_LINEA										{$$ = new Nodo_arbol("TIPO_DECLARACION");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);}
				| TK_ID FIN_LINEA													{$$ = new Nodo_arbol("TIPO_DECLARACION");$$.sethijo(new Nodo_arbol($1));$$.sethijo($2);}
;//int[] a;

MAS_VARIABLES: MAS_VARIABLES TK_coma TK_ID											{$$ = new Nodo_arbol("MAS_VARIABLES");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo(new Nodo_arbol($3))}
			|TK_coma TK_ID															{$$ = new Nodo_arbol("MAS_VARIABLES");$$.sethijo(new Nodo_arbol($1));$$.sethijo(new Nodo_arbol($2));}
;

FIN_LINEA: TK_pcoma				{$$= new Nodo_arbol("FIN_LINEA");$$.sethijo(new Nodo_arbol($1));}
;


TIPO_VALOR: TK_STRING 							{$$= new Nodo_arbol($1);}
		|TK_INT									{$$= new Nodo_arbol($1);}
		|TK_BOOLEAN								{$$= new Nodo_arbol($1);}
		|TK_DOUBLE								{$$= new Nodo_arbol($1);}
		|TK_CHAR								{$$= new Nodo_arbol($1);}
		|TK_VOID								{$$= new Nodo_arbol($1);}
;

COND_ARREGLO: TK_llave_apertura TK_llave_cierre					{$$ = new Nodo_arbol("COND_ARREGLO");$$.sethijo($1);$$.sethijo($2);}
;
/*
IGUALACION: TK_igual EXPRESIONARIT FIN_LINEA	
			|TK_igual ARREGLO FIN_LINEA								{$$ = [$2]} //aca ahora es un vector
;
*/


VALORES: TK_CADENA															{var a = $1; var al=a.length; var c = a.substring(1,al-1);  $$ = new Nodo_arbol(c);}
		|TK_NULL															{$$= new Nodo_arbol($1);}
		|TK_TRUE															{$$= new Nodo_arbol($1);}
		|TK_FALSE															{$$= new Nodo_arbol($1);}
		|TK_CARACTER														{$$= new Nodo_arbol($1);}
		|ACCESSOATRIBUTO													{$$= new Nodo_arbol($1);}
		/*|TK_ID 																{$$ = new Acceso($1,this._$.first_line,this._$.first_column);}
		|TK_ID TK_par_apertura TK_par_cierre								{}
		|TK_ID TK_par_apertura PARAMETROS TK_par_cierre						{}
		|TK_ID ARREGLO 														{}
	  */|TK_ENTERO                        									{$$= new Nodo_arbol($1);}
		|TK_DECIMAL                       									{$$= new Nodo_arbol($1);}
		|TK_BEGIN 															{$$= new Nodo_arbol($1);}
		|TK_END 															{$$= new Nodo_arbol($1);}
		|TK_TYPEOF TK_par_apertura EXPRESIONARIT TK_par_cierre				{$$= new Nodo_arbol("VALORES");$$.sethijo(new Nodo_arbol($1));$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);$$.sethijo(new Nodo_arbol($4));}
		|TK_INT TK_punto TK_PARSE EXPRESIONARIT 							{$$= new Nodo_arbol("VALORES");$$.sethijo(new Nodo_arbol($1));$$.sethijo(new Nodo_arbol($2));$$.sethijo(new Nodo_arbol($3));$$.sethijo($4);}}
		|TK_DOUBLE TK_punto TK_PARSE EXPRESIONARIT 							{$$= new Nodo_arbol("VALORES");$$.sethijo(new Nodo_arbol($1));$$.sethijo(new Nodo_arbol($2));$$.sethijo(new Nodo_arbol($3));$$.sethijo($4);}}
		|TK_BOOLEAN TK_punto TK_PARSE EXPRESIONARIT 						{$$= new Nodo_arbol("VALORES");$$.sethijo(new Nodo_arbol($1));$$.sethijo(new Nodo_arbol($2));$$.sethijo(new Nodo_arbol($3));$$.sethijo($4);}}
		|FUNCIONES_NATIVAS													{$$= new Nodo_arbol("VALORES");$$.sethijo($1);}
		|TK_STRING TK_par_apertura EXPRESIONARIT TK_par_cierre				{$$=new Nodo_arbol("VALORES");$$.sethijo(new Nodo_arbol($1));$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);$$.sethijo(new Nodo_arbol($4));}
		|TK_ID TK_par_apertura EXPRESIONARIT PARAMETROS_EXTRA TK_par_cierre	{$$=new Nodo_arbol("VALORES");$$.sethijo(new Nodo_arbol($1));$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);$$.sethijo($4);$$.sethijo(new Nodo_arbol($5));}
		|TK_ID TK_par_apertura EXPRESIONARIT TK_par_cierre					{}
;

ARREGLO: TK_llave_apertura LISTA_ARREGLO TK_llave_cierre					{$$ = new Nodo_arbol("ARREGLO");$$.sethijo(new Nodo_arbol($1));$$.sethijo($2);$$.sethijo(new Nodo_arbol($3));}
;

LISTA_ARREGLO: LISTA_ARREGLO TK_coma EXPRESIONARIT						  	{$$ = new Nodo_arbol("LISTA_ARREGLO");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);}
			|EXPRESIONARIT													{$$ = new Nodo_arbol("LISTA_ARREGLO");$$.sethijo($1);}
;


EXPRESIONARIT
	: TK_MENOS EXPRESIONARIT %prec UMENOS  												{$$ = new Nodo_arbol("EXPRESIONARTI");$$.sethijo(new Nodo_arbol($1));$$.sethijo($2);}
	| EXPRESIONARIT TK_and EXPRESIONARIT       											{$$ = new Nodo_arbol("EXPRESIONARIT");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);}
	| EXPRESIONARIT TK_or EXPRESIONARIT													{$$ = new Nodo_arbol("EXPRESIONARIT");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);}
	| EXPRESIONARIT TK_mayor_igual EXPRESIONARIT       									{$$ = new Nodo_arbol("EXPRESIONARIT");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);}
	| EXPRESIONARIT TK_menor_igual EXPRESIONARIT       									{$$ = new Nodo_arbol("EXPRESIONARIT");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);}
	| EXPRESIONARIT TK_mayor EXPRESIONARIT       										{$$ = new Nodo_arbol("EXPRESIONARIT");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);}
	| EXPRESIONARIT TK_menor EXPRESIONARIT												{$$ = new Nodo_arbol("EXPRESIONARIT");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);}
	| EXPRESIONARIT TK_igualacion EXPRESIONARIT											{$$ = new Nodo_arbol("EXPRESIONARIT");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);}
	| EXPRESIONARIT TK_desigual EXPRESIONARIT											{$$ = new Nodo_arbol("EXPRESIONARIT");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);}
	| EXPRESIONARIT TK_INCREMENTO														{$$ = new Nodo_arbol("EXPRESIONARIT");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));}
	| EXPRESIONARIT TK_DECREMENTO														{$$ = new Nodo_arbol("EXPRESIONARIT");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));}
	| EXPRESIONARIT TK_MAS EXPRESIONARIT       											{$$ = new Nodo_arbol("EXPRESIONARIT");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);}
	| EXPRESIONARIT TK_MENOS EXPRESIONARIT     											{$$ = new Nodo_arbol("EXPRESIONARIT");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);}
	| EXPRESIONARIT TK_numeral TK_POR EXPRESIONARIT       								{$$ = new Nodo_arbol("EXPRESIONARIT");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);}
	| EXPRESIONARIT TK_POR EXPRESIONARIT       											{$$ = new Nodo_arbol("EXPRESIONARIT");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);}
	| EXPRESIONARIT TK_DIVIDIDO EXPRESIONARIT  											{$$ = new Nodo_arbol("EXPRESIONARIT");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);}
	| TK_par_apertura EXPRESIONARIT TK_par_cierre       								{$$ = new Nodo_arbol("EXPRESIONARIT");$$.sethijo(new Nodo_arbol($1));$$.sethijo($2);$$.sethijo(new Nodo_arbol($3));}
	| TK_not EXPRESIONARIT																{$$ = new Nodo_arbol("EXPRESIONARIT");$$.sethijo(new Nodo_arbol($1));$$.sethijo($2)}
	| TK_SIN TK_par_apertura EXPRESIONARIT TK_par_cierre								{$$ = new Nodo_arbol("EXPRESIONARIT");$$.sethijo($1);$$.sethijo($2);$$.sethijo($3);$$.sethijo(new Nodo_arbol($4));}
	| TK_SIN TK_numeral TK_par_apertura EXPRESIONARIT TK_par_cierre						{$$ = new Nodo_arbol("EXPRESIONARIT");$$.sethijo(new Nodo_arbol($1));$$.sethijo(new Nodo_arbol($2));$$.sethijo(new Nodo_arbol($3));$$.sethijo($4);$$.sethijo(new Nodo_arbol($5));}
	| TK_COS TK_par_apertura EXPRESIONARIT TK_par_cierre								{$$ = new Nodo_arbol("EXPRESIONARIT");$$.sethijo($1);$$.sethijo($2);$$.sethijo($3);$$.sethijo(new Nodo_arbol($4));}
	| TK_COS TK_numeral TK_par_apertura EXPRESIONARIT TK_par_cierre						{$$ = new Nodo_arbol("EXPRESIONARIT");$$.sethijo(new Nodo_arbol($1));$$.sethijo(new Nodo_arbol($2));$$.sethijo(new Nodo_arbol($3));$$.sethijo($4);$$.sethijo(new Nodo_arbol($5));}					    
	| TK_LOG TK_par_apertura EXPRESIONARIT TK_par_cierre								{$$ = new Nodo_arbol("EXPRESIONARIT");$$.sethijo($1);$$.sethijo($2);$$.sethijo($3);$$.sethijo(new Nodo_arbol($4));}
	| TK_LOG TK_numeral TK_par_apertura EXPRESIONARIT TK_par_cierre						{$$ = new Nodo_arbol("EXPRESIONARIT");$$.sethijo(new Nodo_arbol($1));$$.sethijo(new Nodo_arbol($2));$$.sethijo(new Nodo_arbol($3));$$.sethijo($4);$$.sethijo(new Nodo_arbol($5));}	
	| TK_TAN TK_par_apertura EXPRESIONARIT TK_par_cierre								{$$ = new Nodo_arbol("EXPRESIONARIT");$$.sethijo($1);$$.sethijo($2);$$.sethijo($3);$$.sethijo(new Nodo_arbol($4));}
	| TK_TAN TK_numeral TK_par_apertura EXPRESIONARIT TK_par_cierre						{$$ = new Nodo_arbol("EXPRESIONARIT");$$.sethijo(new Nodo_arbol($1));$$.sethijo(new Nodo_arbol($2));$$.sethijo(new Nodo_arbol($3));$$.sethijo($4);$$.sethijo(new Nodo_arbol($5));}	
	| TK_SQRT TK_par_apertura EXPRESIONARIT TK_par_cierre								{$$ = new Nodo_arbol("EXPRESIONARIT");$$.sethijo($1);$$.sethijo($2);$$.sethijo($3);$$.sethijo(new Nodo_arbol($4));}
	| TK_SQRT TK_numeral TK_par_apertura EXPRESIONARIT TK_par_cierre					{$$ = new Nodo_arbol("EXPRESIONARIT");$$.sethijo(new Nodo_arbol($1));$$.sethijo(new Nodo_arbol($2));$$.sethijo(new Nodo_arbol($3));$$.sethijo($4);$$.sethijo(new Nodo_arbol($5));}
	| TK_POW TK_par_apertura EXPRESIONARIT TK_coma EXPRESIONARIT TK_par_cierre			{$$ = new Nodo_arbol("EXPRESIONARIT");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));}
	| TK_POW TK_numeral TK_par_apertura EXPRESIONARIT TK_coma EXPRESIONARIT TK_par_cierre	{$$ = new Nodo_arbol("EXPRESIONARIT");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));}
	| TK_numeral EXPRESIONARIT															{$$ = new Nodo_arbol("EXPRESIONARIT");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));}
	| EXPRESIONARIT TK_concat EXPRESIONARIT       										{$$ = new Nodo_arbol("EXPRESIONARIT");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);}
	| EXPRESIONARIT TK_potencia EXPRESIONARIT		       								{$$ = new Nodo_arbol("EXPRESIONARIT");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);}
	| EXPRESIONARIT TK_MODULO EXPRESIONARIT       										{$$ = new Nodo_arbol("EXPRESIONARIT");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);}
	| EXPRESIONARIT TK_pregunta EXPRESIONARIT TK_dos_puntos EXPRESIONARIT 				{$$ = new Nodo_arbol("EXPRESIONARIT");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);$$.sethijo(new Nodo_arbol($4));$$.sethijo($5);}
	| TK_llave_apertura LISTA_ARREGLO TK_llave_cierre									{$$ = new Nodo_arbol("EXPRESIONARIT");$$.sethijo(new Nodo_arbol($1));$$.sethijo($2);$$.sethijo(new Nodo_arbol($3));}
	//| TK_ID TK_par_apertura EXPRESIONARIT PARAMETROS_EXTRA TK_par_cierre 	{$$ = new LlamadaFuncion($1,true,$3,this._$.first_line,this._$.first_column);}
	| VALORES 																			{$$ = new Nodo_arbol("EXPRESIONARIT"); $$.sethijo($1);}
;


IMPRESION: TK_PRINT TK_par_apertura EXPRESIONARIT TK_par_cierre FIN_LINEA							{$$ = new Nodo_arbol("IMPRESION"); $$.sethijo(new Nodo_arbol($1));$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);$$.sethijo(new Nodo_arbol($4));$$.sethijo($5);}
		|TK_PRINTLN TK_par_apertura EXPRESIONARIT TK_par_cierre	FIN_LINEA							{$$ = new Nodo_arbol("IMPRESION"); $$.sethijo(new Nodo_arbol($1));$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);$$.sethijo(new Nodo_arbol($4));$$.sethijo($5);}
		|TK_PRINT TK_par_apertura EXPRESIONARIT MAS_VALORES_IMPRESION TK_par_cierre FIN_LINEA  		{$$ = new Nodo_arbol("IMPRESION"); $$.sethijo(new Nodo_arbol($1));$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);$$.sethijo($4);$$.sethijo(new Nodo_arbol($5));$$.sethijo($6);}
		|TK_PRINTLN TK_par_apertura EXPRESIONARIT MAS_VALORES_IMPRESION TK_par_cierre FIN_LINEA     {$$ = new Nodo_arbol("IMPRESION"); $$.sethijo(new Nodo_arbol($1));$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);$$.sethijo($4);$$.sethijo(new Nodo_arbol($5));$$.sethijo($6);}
;


MAS_VALORES_IMPRESION: MAS_VALORES_IMPRESION TK_coma EXPRESIONARIT									{$$= new Nodo_arbol("MAS_VALORES_EXPRESIONARIT");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);}
					//|MAS_VALORES_IMPRESION TK_coma ARREGLO										{}
					//|TK_coma ARREGLO																{}
					|TK_coma EXPRESIONARIT															{$$= new Nodo_arbol("MAS_VALORES_EXPRESIONARIT");$$.sethijo(new Nodo_arbol($1));$$.sethijo($2);}
;


ACCESSOATRIBUTO : ACCESSOATRIBUTO TK_punto TK_ID			 													{$$ = new Nodo_arbol("ACCESOATRIBUTO");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo(new Nodo_arbol($3));}
				| ACCESSOATRIBUTO TK_punto TK_CARETER_OF_POSITION TK_par_apertura VALORES TK_par_cierre			{$$ = new Nodo_arbol("ACCESOATRIBUTO");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo(new Nodo_arbol($3));$$.sethijo(new Nodo_arbol($4));$$.sethijo($5);$$.sethijo(new Nodo_arbol($6));}
				| ACCESSOATRIBUTO TK_punto TK_SUBSTRING TK_par_apertura VALORES TK_coma VALORES TK_par_cierre 	{$$ = new Nodo_arbol("ACCESOATRIBUTO");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo(new Nodo_arbol($3));$$.sethijo(new Nodo_arbol($4));$$.sethijo($5);$$.sethijo(new Nodo_arbol($6));$$.sethijo($7);$$.sethijo(new Nodo_arbol($8));}
				| ACCESSOATRIBUTO TK_punto TK_LENGTH TK_par_apertura  TK_par_cierre 							{$$ = new Nodo_arbol("ACCESOATRIBUTO");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo(new Nodo_arbol($3));$$.sethijo(new Nodo_arbol($4));$$.sethijo(new Nodo_arbol($5));}
				| ACCESSOATRIBUTO TK_punto TK_TOUPPERCASE TK_par_apertura  TK_par_cierre						{$$ = new Nodo_arbol("ACCESOATRIBUTO");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo(new Nodo_arbol($3));$$.sethijo(new Nodo_arbol($4));$$.sethijo(new Nodo_arbol($5));}
				| ACCESSOATRIBUTO TK_punto TK_TOLOWERCASE TK_par_apertura TK_par_cierre							{$$ = new Nodo_arbol("ACCESOATRIBUTO");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo(new Nodo_arbol($3));$$.sethijo(new Nodo_arbol($4));$$.sethijo(new Nodo_arbol($5));}
				| ACCESSOATRIBUTO TK_punto TK_PUSH TK_par_apertura EXPRESIONARIT TK_par_cierre					{$$ = new Nodo_arbol("ACCESOATRIBUTO");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo(new Nodo_arbol($3));$$.sethijo(new Nodo_arbol($4));$$.sethijo($5);$$.sethijo(new Nodo_arbol($6));}
				| ACCESSOATRIBUTO TK_punto TK_POP TK_par_apertura  TK_par_cierre								{$$ = new Nodo_arbol("ACCESOATRIBUTO");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo(new Nodo_arbol($3));$$.sethijo(new Nodo_arbol($4));}//aca?
				| ACCESSOATRIBUTO TK_llave_apertura EXPRESIONARIT TK_llave_cierre 								{$$ = new Nodo_arbol("ACCESOATRIBUTO");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);$$.sethijo(new Nodo_arbol($4));}
				| ACCESSOATRIBUTO TK_llave_apertura EXPRESIONARIT PARAMETROS_EXTRA TK_llave_cierre 				{$$ = new Nodo_arbol("ACCESOATRIBUTO");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);$$.sethijo($4);$$.sethijo(new Nodo_arbol($5));}
			    //| TK_ID LLAMADA_FUNCION																			{}
				| TK_ID																							{$$ = new Nodo_arbol($1);}
				| TK_ID TK_ID																					{$$ = new Nodo_arbol("ACCESOATRIBUTO");$$.sethijo(new Nodo_arbol($1));$$.sethijo(new Nodo_arbol($2));}
				//| TK_ID TK_ID TK_par_apertura PARAMETRO_FUNSION TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre					{var listainst =$7; listainst.crearentorno=false; $$ = new Funcion($1,$2,$4,listainst,this._$.first_line,this._$.first_column);}
				//| TK_ID TK_ID TK_igual EXPRESIONARIT
;


ASIGNACION: ACCESSOATRIBUTO TK_igual EXPRESIONARIT FIN_LINEA					 								{$$= new Nodo_arbol("ASIGNACION");$$= new Nodo_arbol($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);$$.sethijo(new Nodo_arbol($4));}
			|ACCESSOATRIBUTO FIN_LINEA_STRUCT																	{$$= new Nodo_arbol("ASIGNACION");$$= new Nodo_arbol($1);$$.sethijo($2);}
			//|TK_ID TK_ID FIN_LINEA											 								{}
			//|TK_ID TK_ID TK_igual EXPRESIONARIT FIN_LINEA			 			 								{}
			//|TK_ID MAS_ATRIBUTOS TK_igual EXPRESIONARIT FIN_LINEA 				 							{}
			//|TK_ID MAS_ATRIBUTOS ARREGLO TK_igual EXPRESIONARIT FIN_LINEA 		 							{}
			|ACCESSOATRIBUTO SIGNOS_COMPARACION EXPRESIONARIT FIN_LINEA					 						{$$ = new Nodo_arbol("ASIGNACION");$$= new Nodo_arbol($1);$$= new Nodo_arbol($2);$$= new Nodo_arbol($3);$$= new Nodo_arbol($4);}
			//|TK_ID TK_igual ARREGLO FIN_LINEA																	{} // esta sustituye las dos de abajo
			//|TK_ID TK_igual TK_llave_apertura EXPRESIONARIT MAS_VALORES_IMPRESION TK_llave_cierre FIN_LINEA	{}
			//|TK_ID TK_igual TK_llave_apertura EXPRESIONARIT TK_llave_cierre FIN_LINEA							{}
			|ACCESSOATRIBUTO TK_par_apertura TK_par_cierre FIN_LINEA 											{$$ = new Nodo_arbol("ASIGNACION");$$= new Nodo_arbol($1);$$= new Nodo_arbol(new Nodo_arbol($2));$$= new Nodo_arbol(new Nodo_arbol($3));$$= new Nodo_arbol($4);}
			|ACCESSOATRIBUTO TK_par_apertura EXPRESIONARIT TK_par_cierre FIN_LINEA 								{$$ = new Nodo_arbol("ASIGNACION");$$= new Nodo_arbol($1);$$= new Nodo_arbol(new Nodo_arbol($2));$$= new Nodo_arbol($3);$$= new Nodo_arbol(new Nodo_arbol($4));$$= new Nodo_arbol($5);}
			//|ACCESSOATRIBUTO TK_par_apertura PARAMETRO_FUNSION TK_par_cierre FIN_LINEA 								{$$ = new LlamadaFuncion($1,false,[$3],this._$.first_line,this._$.first_column);}
			|ACCESSOATRIBUTO TK_par_apertura EXPRESIONARIT PARAMETROS_EXTRA TK_par_cierre FIN_LINEA 			{$$ = new Nodo_arbol("ASIGNACION");$$= new Nodo_arbol($1);$$.sethijo(new Nodo_arbol($2)); $$= new Nodo_arbol($3);$$= new Nodo_arbol($4);$$= new Nodo_arbol($5);Nodo_arbol($6);}
			|ACCESSOATRIBUTO TK_par_apertura EXPRESIONARIT PARAMETROS_EXTRA TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre          {$$ = new Nodo_arbol("ASIGNACION");$$= new Nodo_arbol($1);$$.sethijo(new Nodo_arbol($2)); $$= new Nodo_arbol($3);$$= new Nodo_arbol($4);$$= new Nodo_arbol($5);Nodo_arbol(new Nodo_arbol($6));$$= new Nodo_arbol($7);Nodo_arbol(new Nodo_arbol($8));}
			//|TK_ID TK_par_apertura EXPRESIONARIT TK_par_cierre FIN_LINEA										{} //a(s,5)
			//|TK_ID TK_par_apertura EXPRESIONARIT MAS_VALORES_IMPRESION TK_par_cierre FIN_LINEA				{} [s,d,[sddd]]
			//|ACCESSOATRIBUTO TK_par_apertura  TK_par_cierre FIN_LINEA											{} //a() -- llamar una funcion 
			|ACCESSOATRIBUTO TK_DECREMENTO FIN_LINEA 															{$$ = new Nodo_arbol("ASIGNACION");$$= new Nodo_arbol($1);$$= new Nodo_arbol(new Nodo_arbol($2));$$= new Nodo_arbol($3);}
			|ACCESSOATRIBUTO TK_INCREMENTO FIN_LINEA															{$$ = new Nodo_arbol("ASIGNACION");$$= new Nodo_arbol($1);$$= new Nodo_arbol(new Nodo_arbol($2));$$= new Nodo_arbol($3);}
			//|ACCESSOATRIBUTO TK_par_apertura EXPRESIONARIT PARAMETROS_EXTRA TK_par_cierre						{$$ = new LlamadaFuncion($1,true,$3,this._$.first_line,this._$.first_column);}
			//|TK_ID ARREGLO																					{} a[] ; int[] 
			//|TK_ID TK_llave_apertura TK_llave_cierre															{}
			//|TK_ID ARREGLO TK_igual EXPRESIONARIT FIN_LINEA													{$$ = new AsignarValorArray($6,new AccesoArray($3,new Acceso($1,this._$.first_line,this._$.first_column), this._$.first_line,this._$.first_column), this._$.first_line,this._$.first_column);} // AGREGAR UN ARREGLO
			//|TK_ID TK_llave_apertura EXPRESIONARIT TK_llave_cierre TK_igual TK_ID ARREGLO FIN_LINEA			{}
			//|TK_ID TK_llave_apertura TK_llave_cierre TK_igual ARREGLO FIN_LINEA								{} 
			//|TK_ID FUNCIONES_ARREGLO																			{}															{}
;



PARAMETROS_EXTRA: PARAMETROS_EXTRA	TK_coma EXPRESIONARIT				{$$ = new Nodo_arbol("PARAMETROS_EXTRA");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);}
				| PARAMETROS_EXTRA TK_coma TIPO_VALOR TK_ID				{$$ = new Nodo_arbol("PARAMETROS_EXTRA");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);$$.sethijo(new Nodo_arbol($4));}
				| TK_coma EXPRESIONARIT									{$$ = new Nodo_arbol("PARAMETROS_EXTRA");$$.sethijo(new Nodo_arbol($1));$$.sethijo($2);}
				| TK_coma TIPO_VALOR TK_ID								{$$ = new Nodo_arbol("PARAMETROS_EXTRA");$$.sethijo(new Nodo_arbol($1));$$.sethijo($2);$$.sethijo(new Nodo_arbol($3));}
;

/*
MAS_ATRIBUTOS: MAS_ATRIBUTOS TK_punto TK_ID  													{}
				|TK_punto TK_ID
;
*/

FUNCIONES_ARREGLO: TK_punto TK_PUSH TK_par_apertura EXPRESIONARIT TK_par_cierre TK_pcoma		{$$ = new Nodo_arbol("FUNCIONES_ARREGLO");$$.sethijo(new Nodo_arbol($2));$$.sethijo(new Nodo_arbol($3));$$.sethijo($4);$$.sethijo(new Nodo_arbol($5));$$.sethijo(new Nodo_arbol($6));}
				|TK_punto TK_POP TK_par_apertura TK_par_cierre TK_pcoma							{$$ = new Nodo_arbol("FUNCIONES_ARREGLO");$$.sethijo(new Nodo_arbol($2));$$.sethijo(new Nodo_arbol($3));$$.sethijo(new Nodo_arbol($4));$$.sethijo(new Nodo_arbol($5));}
				|TK_punto TK_LENGTH TK_par_apertura TK_par_cierre TK_pcoma						{$$ = new Nodo_arbol("FUNCIONES_ARREGLO");$$.sethijo(new Nodo_arbol($2));$$.sethijo(new Nodo_arbol($3));$$.sethijo(new Nodo_arbol($4));$$.sethijo(new Nodo_arbol($5));}
;


//FIN_LINEA_ASIGNACION: TK_pcoma										{}
//					| ASIGNACION_TERNARIA FIN_LINEA					{}
//;


//ASIGNACION_TERNARIA: ASIGNACION_TERNARIA TK_pregunta EXPRESIONARIT TK_dos_puntos EXPRESIONARIT 
//					| TK_pregunta EXPRESIONARIT TK_dos_puntos EXPRESIONARIT 
//;

SIGNOS_COMPARACION: TK_mayor_igual        				{$$= new Nodo_arbol("SIGNOS_COMPARACION");$$= new Nodo_arbol($1);}
	|  TK_menor_igual        							{$$= new Nodo_arbol("SIGNOS_COMPARACION");$$= new Nodo_arbol($1);}
	|  TK_mayor											{$$= new Nodo_arbol("SIGNOS_COMPARACION");$$= new Nodo_arbol($1);}
	|  TK_menor 										{$$= new Nodo_arbol("SIGNOS_COMPARACION");$$= new Nodo_arbol($1);}
	|  TK_igualacion 									{$$= new Nodo_arbol("SIGNOS_COMPARACION");$$= new Nodo_arbol($1);}
	|  TK_desigual 										{$$= new Nodo_arbol("SIGNOS_COMPARACION");$$= new Nodo_arbol($1);}
;

PARAMETROS: PARAMETROS TK_coma EXPRESIONARIT		{$$= new Nodo_arbol("PARAMETROS");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);}
			|TK_coma EXPRESIONARIT					{$$= new Nodo_arbol("PARAMETROS");$$.sethijo(new Nodo_arbol($1));$$.sethijo($2);}
			|EXPRESIONARIT							{$$= new Nodo_arbol("PARAMETROS");$$.sethijo($1);}
;

FUNCIONES_NATIVAS: TK_TOINT TK_par_apertura EXPRESIONARIT TK_par_cierre				{$$ = new Nodo_arbol("FUNCIONES_NATIVAS");$$.sethijo(new Nodo_arbol($1));$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);$$.sethijo(new Nodo_arbol($4));}
				//|TK_TOINT TK_par_apertura EXPRESIONARIT TK_par_cierre FIN_LINEA		{console.log("LLAMADA FUNCION NATIVA "+$1);$$ = new LlamadaFuncion($1,false,$3,this._$.first_line,this._$.first_column);}
				  |TK_TODOUBLE TK_par_apertura EXPRESIONARIT TK_par_cierre			{$$ = new Nodo_arbol("FUNCIONES_NATIVAS");$$.sethijo(new Nodo_arbol($1));$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);$$.sethijo(new Nodo_arbol($4));}
				//|TK_TODOUBLE TK_par_apertura EXPRESIONARIT TK_par_cierre FIN_LINEA  {console.log("LLAMADA FUNCION NATIVA "+$1);$$ = new LlamadaFuncion($1,false,$3,this._$.first_line,this._$.first_column);}

;


//LLAMADA_FUNCION:  TK_par_apertura PARAMETRO_FUNSION TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre					{var listainst =$7; listainst.crearentorno=false; $$ = new Funcion($1,$2,$4,listainst,this._$.first_line,this._$.first_column);}
/*				|  TK_ID TK_par_apertura TK_ID TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre							{var listainst =$7; listainst.crearentorno=false; $$ = new Funcion($1,$2,[new Parametro($4,null,null,this._$.first_line,this._$.first_column)],listainst,this._$.first_line,this._$.first_column);}
				|  TIPO_VALOR TK_ID TK_par_apertura TK_ID MAS_PARAMETROS_FUNSION TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre	{var listainst =$8; listainst.crearentorno=false; var nuevo = new Parametro($4,null,null,this._$.first_line,this._$.first_column);
																																			 		$$ = new Funcion($1,$2,[nuevo].concat($5),listainst,this._$.first_line,this._$.first_column);}
				|  TIPO_VALOR TK_ID TK_par_apertura  TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre								{var listainst =$6; listainst.crearentorno=false;$$ = new Funcion($1,$2,[],listainst,this._$.first_line,this._$.first_column);}
;*/



PARAMETRO_FUNSION: TIPO_VALOR TK_ID										{$$ = new Nodo_arbol("PARAMETRO_FUNSION"); $$.sethijo($1); $$.sethijo($2)}
				| TIPO_VALOR TK_ID MAS_PARAMETROS_FUNSION   			{$$ = new Nodo_arbol("PARAMETRO_FUNSION"); $$.sethijo($1); $$.sethijo($2);sethijo($3);}
				| TK_ID TK_ID											{$$ = new Nodo_arbol("PARAMETRO_FUNSION"); $$.sethijo(new Nodo_arbol($1)); $$.sethijo(new Nodo_arbol($2))}
				| TK_ID TK_ID MAS_PARAMETROS_FUNSION					{$$ = new Nodo_arbol("PARAMETRO_FUNSION"); $$.sethijo(new Nodo_arbol($1)); $$.sethijo(new Nodo_arbol($2));$$.sethijo($3);}
				| TIPO_VALOR COND_ARREGLO TK_ID 						{$$ = new Nodo_arbol("PARAMETRO_FUNSION"); $$.sethijo($1); $$.sethijo($2);$$.sethijo(new Nodo_arbol($3));}
				| TIPO_VALOR COND_ARREGLO TK_ID MAS_PARAMETROS_FUNSION	{$$ = new Nodo_arbol("PARAMETRO_FUNSION"); $$.sethijo($1); $$.sethijo($2);$$.sethijo(new Nodo_arbol($3));$$.sethijo($4);}
;

MAS_PARAMETROS_FUNSION: MAS_PARAMETROS_FUNSION TK_coma TIPO_VALOR TK_ID						 {$$ = new Nodo_arbol("MAS_PARAMETROS_FUNSION");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);$$.sethijo(new Nodo_arbol($4));}
				|MAS_PARAMETROS_FUNSION TK_coma TK_ID TK_ID									 {$$ = new Nodo_arbol("MAS_PARAMETROS_FUNSION");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo(new Nodo_arbol($3));$$.sethijo(new Nodo_arbol($4));}
				|MAS_PARAMETROS_FUNSION TK_coma TK_ID 										 {$$ = new Nodo_arbol("MAS_PARAMETROS_FUNSION");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo(new Nodo_arbol($3));}
				|MAS_PARAMETROS_FUNSION TK_coma TIPO_VALOR COND_ARREGLO TK_ID 		 		 {$$ = new Nodo_arbol("MAS_PARAMETROS_FUNSION");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);$$.sethijo($4);$$.sethijo(new Nodo_arbol($5))}
				|TK_coma TIPO_VALOR TK_ID													 {$$ = new Nodo_arbol("MAS_PARAMETROS_FUNSION");$$.sethijo(new Nodo_arbol($1));$$.sethijo($2);$$.sethijo(new Nodo_arbol($3));}
				|TK_coma TK_ID TK_ID														 {$$ = new Nodo_arbol("MAS_PARAMETROS_FUNSION");$$.sethijo(new Nodo_arbol($1));$$.sethijo(new Nodo_arbol($2));$$.sethijo(new Nodo_arbol($3))}
				|TK_coma TK_ID																 {$$ = new Nodo_arbol("MAS_PARAMETROS_FUNSION");$$.sethijo(new Nodo_arbol($1));$$.sethijo(new Nodo_arbol($2));}
				|TK_coma TIPO_VALOR COND_ARREGLO TK_ID 								 		 {$$ = new Nodo_arbol("MAS_PARAMETROS_FUNSION");$$.sethijo(new Nodo_arbol($1));$$.sethijo($2);$$.sethijo($3);$$.sethijo(new Nodo_arbol($4))}
;

RETURN: TK_RETURN EXPRESIONARIT FIN_LINEA															{$$ = new Nodo_arbol("RETURN");$$.sethijo(new Nodo_arbol($1));$$.sethijo($2);$$.sethijo($3);}
		//| TK_RETURN TK_ID TK_par_apertura PARAMETRO_FUNSION TK_par_cierre FIN_LINEA					{}		//return (int a)   return(struc struc)    return (a a,b b)  return     ///duda
		| TK_RETURN  FIN_LINEA																		{$$ = new Nodo_arbol("RETURN");$$.sethijo(new Nodo_arbol($1));$$.sethijo($2);}
;

BREAK: TK_BREAK TK_pcoma						{$$ = new Nodo_arbol("BREAK");$$.sethijo(new Nodo_arbol($1));$$.sethijo(new Nodo_arbol($2));}
	| TK_CONTINUE TK_pcoma						{$$ = new Nodo_arbol("BREAK");$$.sethijo(new Nodo_arbol($1));$$.sethijo(new Nodo_arbol($2));}

;


CONDICIONALES: FUNCION_IF				{$$ = new Nodo_arbol("CONDICIONALES");$$.sethijo($1)}
			| FUNCION_SWITCH			{$$ = new Nodo_arbol("CONDICIONALES");$$.sethijo($1)}
;
																																			
FUNCION_IF:  TK_IF TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre 					{$$ = new Nodo_arbol("FUNCION_IF");$$.sethijo(new Nodo_arbol($1));$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);$$.sethijo(new Nodo_arbol($4));$$.sethijo($5);$$.sethijo(new Nodo_arbol($6));}
			|TK_IF TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre  FUNCION_ELSEIF  {$$ = new Nodo_arbol("FUNCION_IF");$$.sethijo(new Nodo_arbol($1));$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);$$.sethijo(new Nodo_arbol($4));$$.sethijo($5);$$.sethijo(new Nodo_arbol($6));$$.sethijo($7);}
			|TK_IF TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre  FUNCION_ELSE    {$$ = new Nodo_arbol("FUNCION_IF");$$.sethijo(new Nodo_arbol($1));$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);$$.sethijo(new Nodo_arbol($4));$$.sethijo($5);$$.sethijo(new Nodo_arbol($6));$$.sethijo($7);}
			|TK_IF TK_par_apertura EXPRESIONARIT TK_par_cierre  INSTRUCCION2 					{$$ = new Nodo_arbol("FUNCION_IF");$$.sethijo(new Nodo_arbol($1));$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);$$.sethijo(new Nodo_arbol($4));$$.sethijo($5);}
			|TK_IF TK_par_apertura EXPRESIONARIT TK_par_cierre  INSTRUCCION2  FUNCION_ELSEIF	{$$ = new Nodo_arbol("FUNCION_IF");$$.sethijo(new Nodo_arbol($1));$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);$$.sethijo(new Nodo_arbol($4));$$.sethijo($5);$$.sethijo($6);}
			|TK_IF TK_par_apertura EXPRESIONARIT TK_par_cierre  INSTRUCCION2  FUNCION_ELSE		{$$ = new Nodo_arbol("FUNCION_IF");$$.sethijo(new Nodo_arbol($1));$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);$$.sethijo(new Nodo_arbol($4));$$.sethijo($5);$$.sethijo($6);}
;

FUNCION_ELSEIF: FUNCION_ELSEIF TK_ELSEIF TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre 		        {$$ = new Nodo_arbol("FUNCION_ELSEIF");$$.sethijo($1);$$.sethijo(new Nodo_arbol($3));$$.sethijo($4);$$.sethijo(new Nodo_arbol($5));$$.sethijo(new Nodo_arbol($6));$$.sethijo($7);$$.sethijo(new Nodo_arbol($8));}
			  | FUNCION_ELSEIF TK_ELSEIF TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre  FUNCION_ELSE	{$$ = new Nodo_arbol("FUNCION_ELSEIF");$$.sethijo($1);$$.sethijo(new Nodo_arbol($3));$$.sethijo($4);$$.sethijo(new Nodo_arbol($5));$$.sethijo(new Nodo_arbol($6));$$.sethijo($7);$$.sethijo(new Nodo_arbol($8));$$.sethijo($9);}
			  | TK_ELSEIF TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre FUNCION_ELSE					{$$ = new Nodo_arbol("FUNCION_ELSEIF");$$.sethijo(new Nodo_arbol($1));$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);$$.sethijo(new Nodo_arbol($4));$$.sethijo(new Nodo_arbol($5));$$.sethijo($6);$$.sethijo(new Nodo_arbol($7));$$.sethijo($8);}
			  | TK_ELSEIF TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre  		 						{$$ = new Nodo_arbol("FUNCION_ELSEIF");$$.sethijo(new Nodo_arbol($1));$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);$$.sethijo(new Nodo_arbol($4));$$.sethijo(new Nodo_arbol($5));$$.sethijo($6);$$.sethijo(new Nodo_arbol($7));}
			//|TK_ELSEIF TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre 				 		{}
;	

FUNCION_ELSE:TK_ELSE TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre			{$$ = new Nodo_arbol("FUNCION_ELSE");$$.sethijo(new Nodo_arbol($1));$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);$$.sethijo(new Nodo_arbol($4));}
			|TK_ELSE INSTRUCCION2 															{$$ = new Nodo_arbol("FUNCION_ELSE");$$.sethijo(new Nodo_arbol($1));$$.sethijo($2);}
;

FUNCION_SWITCH:TK_SWITCH TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura   TK_CASE EXPRESIONARIT TK_dos_puntos  LISTA_INSTRUCCIONES  TK_corchete_cierre						{$$ = new Nodo_arbol("FUNCIONSWITCH");$$.sethijo(new Nodo_arbol($1));$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);$$.sethijo(new Nodo_arbol($4));$$.sethijo(new Nodo_arbol($5));$$.sethijo(new Nodo_arbol($6));$$.sethijo($7);$$.sethijo(new Nodo_arbol($8));$$.sethijo($9);$$.sethijo(new Nodo_arbol($10));}
			  |TK_SWITCH TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura   TK_CASE EXPRESIONARIT TK_dos_puntos  LISTA_INSTRUCCIONES   SENTENCIAS_CASE	TK_corchete_cierre		{$$ = new Nodo_arbol("FUNCIONSWITCH");$$.sethijo(new Nodo_arbol($1));$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);$$.sethijo(new Nodo_arbol($4));$$.sethijo(new Nodo_arbol($5));$$.sethijo(new Nodo_arbol($6));$$.sethijo($7);$$.sethijo(new Nodo_arbol($8));$$.sethijo($9);$$.sethijo($10);$$.sethijo(new Nodo_arbol($11));}
;

SENTENCIAS_CASE: SENTENCIAS_CASE TK_CASE EXPRESIONARIT TK_dos_puntos  LISTA_INSTRUCCIONES 					 							{$$= new Nodo_arbol("SENTENCIAS_CASE");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);$$.sethijo(new Nodo_arbol($4));$$.sethijo($5);}
				| SENTENCIAS_CASE TK_CASE EXPRESIONARIT TK_dos_puntos  LISTA_INSTRUCCIONES TK_DEFAULT TK_dos_puntos LISTA_INSTRUCCIONES	{$$= new Nodo_arbol("SENTENCIAS_CASE");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);$$.sethijo(new Nodo_arbol($4));$$.sethijo($5);$$.sethijo(new Nodo_arbol($6));$$.sethijo(new Nodo_arbol($7));$$.sethijo($8);}
				|TK_CASE EXPRESIONARIT TK_dos_puntos  LISTA_INSTRUCCIONES 																{$$= new Nodo_arbol("SENTENCIAS_CASE");$$.sethijo($1);$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);}
;

BUCLES: BUCLE_WHILE			{$$= new Nodo_arbol("BUCLES");$$.sethijo($1);}
		|BUCLE_DO_WHILE		{$$= new Nodo_arbol("BUCLES");$$.sethijo($1);}
		|BUCLE_FOR			{$$= new Nodo_arbol("BUCLES");$$.sethijo($1);}
;


BUCLE_WHILE: TK_WHILE TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura  LISTA_INSTRUCCIONES TK_corchete_cierre												{$$ = new Nodo_arbol("BUCLE_WHILE");$$.sethijo(new Nodo_arbol($1));$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);$$.sethijo(new Nodo_arbol($4));$$.sethijo(new Nodo_arbol($5));$$.sethijo($6);$$.sethijo(new Nodo_arbol($7));}
;

BUCLE_DO_WHILE: TK_DO TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre TK_WHILE TK_par_apertura EXPRESIONARIT TK_par_cierre TK_pcoma								{$$ = new Nodo_arbol("BUCLE_DO_WHILE");$$.sethijo(new Nodo_arbol($1));$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);$$.sethijo(new Nodo_arbol($4));$$.sethijo(new Nodo_arbol($5));$$.sethijo(new Nodo_arbol($6));$$.sethijo($7);$$.sethijo(new Nodo_arbol($8));$$.sethijo(new Nodo_arbol($9));}
;

BUCLE_FOR:TK_FOR TK_par_apertura DECLARACION  EXPRESIONARIT TK_pcoma TK_ID TK_INCREMENTO TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre			{$$ = new Nodo_arbol("BUCLE_FOR");$$.sethijo(new Nodo_arbol($1));$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);$$.sethijo($4);$$.sethijo(new Nodo_arbol($5));$$.sethijo(new Nodo_arbol($6));$$.sethijo(new Nodo_arbol($7));$$.sethijo(new Nodo_arbol($8));$$.sethijo(new Nodo_arbol($9));$$.sethijo($10);$$.sethijo(new Nodo_arbol($11));}
		| TK_FOR TK_par_apertura ASIGNACION  EXPRESIONARIT TK_pcoma TK_ID TK_DECREMENTO TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre			{$$ = new Nodo_arbol("BUCLE_FOR");$$.sethijo(new Nodo_arbol($1));$$.sethijo(new Nodo_arbol($2));$$.sethijo($3);$$.sethijo($4);$$.sethijo(new Nodo_arbol($5));$$.sethijo(new Nodo_arbol($6));$$.sethijo(new Nodo_arbol($7));$$.sethijo(new Nodo_arbol($8));$$.sethijo(new Nodo_arbol($9));$$.sethijo($10);$$.sethijo(new Nodo_arbol($11));}
		| TK_FOR TK_ID TK_IN EXPRESIONARIT TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre 																		{$$ = new Nodo_arbol("BUCLE_FOR");$$.sethijo(new Nodo_arbol($1));$$.sethijo(new Nodo_arbol($2));$$.sethijo(new Nodo_arbol($3));$$.sethijo($4);$$.sethijo(new Nodo_arbol($5));$$.sethijo($6);$$.sethijo(new Nodo_arbol($7));}
;