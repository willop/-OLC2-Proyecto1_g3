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
	: INSTRUCCIONES EOF																									{console.log("Hola desde recorrido;");$$ = new Nodo_arbol("Gramatica","")
																														$$.sethijo($1);
																														return $$;
																														}
;

INSTRUCCIONES :VOID_MAIN																											{ $$ = new Nodo_arbol("VOID_MAIN",""); $$.sethijo($1);}
	//| error{$$=FErrores('Lexico',yytext,this._$.first_line,this._$.first_column,'Necesita metodo main');}											
	//| error { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); }
;

VOID_MAIN: TK_VOID TK_MAIN TK_par_apertura TK_par_cierre TK_corchete_apertura INSTRUCCION TK_corchete_cierre			{ $$ = new Nodo_arbol("MAIN","")
																														$$.sethijo(new Nodo_arbol($1,"Reservada"));
																														$$.sethijo(new Nodo_arbol($2,"Reservada"));
																														$$.sethijo(new Nodo_arbol($3,"Simbolo"));
																														$$.sethijo(new Nodo_arbol($4,"Simbolo"));
																														$$.sethijo(new Nodo_arbol($5,"Simbolo"));
																														$$.sethijo($6,"");
																														$$.sethijo(new Nodo_arbol($7,"Simbolo"));
																														}	
;

INSTRUCCION: INSTRUCCION DECLARACION 			{}
	| INSTRUCCION IMPRESION					    {$$ = new Nodo_arbol("INSTRUCCION",""); $$.sethijo($1); $$.sethijo($2);}
	| INSTRUCCION ASIGNACION					{}
	| INSTRUCCION FUNCIONES_NATIVAS				{}
	| INSTRUCCION FUNCIONES						{}
	| INSTRUCCION RETURN						{}
	| INSTRUCCION CONDICIONALES					{}
	| INSTRUCCION BUCLES						{}
	| DECLARACION 								{}
	| IMPRESION									{$$ = new Nodo_arbol("INSTRUCCION",""); $$.sethijo($1)}
	| ASIGNACION								{}
	| FUNCIONES_NATIVAS							{}
	| FUNCIONES									{}	
	| RETURN									{}
	| CONDICIONALES								{}
	| BUCLES									{}	
	
;

LISTA_INSTRUCCIONES: INSTRUCCION {}
;

INSTRUCCIONES_GLOBALES: INSTRUCCIONES_GLOBALES ASIGNACION			{}
					| INSTRUCCIONES_GLOBALES DECLARACION			{}
					| INSTRUCCIONES_GLOBALES FUNCIONES				{}
					| ASIGNACION									{}
					| DECLARACION									{}
					| FUNCIONES										{}
;

INSTRUCCION2: DECLARACION 			{}
	| IMPRESION						{}
	| ASIGNACION					{}	
	| FUNCIONES_NATIVAS				{}
	| FUNCIONES						{}
	| RETURN						{}
	| BUCLES						{}	
;



DECLARACION: TIPO_VALOR TIPO_DECLARACION												{}   //asig = [exp=58,tipo=null,id=TK_ID] asgi.tipo = string [exp=58,tipo=string,id=TK_ID]
			| TIPO_VALOR TK_punto TK_PARSE TK_par_apertura TK_CADENA TK_par_cierre		{}
			| TIPO_VALOR TK_par_apertura ARREGLO TK_par_cierre FIN_LINEA				{} // int ([asdf,fdd,f])
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

TIPO_DECLARACION : TK_ID TK_igual EXPRESIONARIT FIN_LINEA																			{} //Declaracion = 58}	 // asig = [exp=58,tipo=null,id=null] asig.id=TK_ID  lo que subo es [exp=58,tipo=null,id=TK_ID]    //necesito verificar si es un vector
				| TK_ID TK_igual ARREGLO FIN_LINEA																					{}
				| TK_ID  MAS_VARIABLES FIN_LINEA																					{}
				| TK_ID TK_par_apertura PARAMETRO_FUNSION TK_par_cierre TK_corchete_apertura INSTRUCCION TK_corchete_cierre			{}
				| COND_ARREGLO TK_ID IGUALACION																						{}
				| TK_ID FIN_LINEA																									{}
;

MAS_VARIABLES: MAS_VARIABLES TK_coma TK_ID																							{}
			|TK_coma TK_ID																											{}
;

FIN_LINEA: TK_pcoma																													{}
;


TIPO_VALOR: TK_STRING 																												{}
		|TK_INT																														{}
		|TK_BOOLEAN																													{}
		|TK_DOUBLE																													{}
		|TK_CHAR																													{}
;

COND_ARREGLO: TK_llave_apertura TK_llave_cierre																						{}

;
/*
IGUALACION: TK_igual EXPRESIONARIT FIN_LINEA	
			|TK_igual ARREGLO FIN_LINEA								{$$ = [$2]} //aca ahora es un vector
;
*/


VALORES: TK_CADENA															{ var a = $1; var al=a.length; var c = a.substring(1,al-1);  $$ = new Nodo_arbol(c,"cadena");}
		|TK_NULL															{}
		|TK_TRUE															{}
		|TK_FALSE															{}
		|TK_CARACTER														{}
		|TK_ID 																{}
		|TK_ID TK_par_apertura TK_par_cierre								{}
		|TK_ID TK_par_apertura PARAMETROS TK_par_cierre						{}
		|TK_ID ARREGLO														{}
		|TK_ENTERO                        									{}
		|TK_DECIMAL                       									{}
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

ARREGLO: TK_llave_apertura LISTA_ARREGLO TK_llave_cierre										{}
		//TK_llave_apertura EXPRESIONARIT TK_llave_cierre										{} // [5]
		//|TK_llave_apertura ARREGLO TK_llave_cierre											{} //[[A]]
		//|TK_llave_apertura EXPRESIONARIT TK_coma TK_ TK_llave_cierre							{} //[A]
		//|TK_llave_apertura ARREGLO MAS_VALORES_IMPRESION TK_llave_cierre						{}
		//|TK_llave_apertura EXPRESIONARIT TK_dos_puntos EXPRESIONARIT TK_llave_cierre			{}
;

LISTA_ARREGLO: LISTA_ARREGLO TK_coma EXPRESIONARIT												{}
			|LISTA_ARREGLO TK_coma TK_llave_apertura LISTA_ARREGLO TK_llave_cierre				{}
			|TK_llave_apertura LISTA_ARREGLO TK_llave_cierre									{}
			|EXPRESIONARIT																		{}
;


EXPRESIONARIT
	: TK_MENOS EXPRESIONARIT %prec UMENOS  												{}  ////Duda
	| EXPRESIONARIT TK_and EXPRESIONARIT       											{}
	| EXPRESIONARIT TK_or EXPRESIONARIT													{}
	| EXPRESIONARIT TK_mayor_igual EXPRESIONARIT       									{}
	| EXPRESIONARIT TK_menor_igual EXPRESIONARIT       									{}
	| EXPRESIONARIT TK_mayor EXPRESIONARIT       										{}
	| EXPRESIONARIT TK_menor EXPRESIONARIT												{}
	| EXPRESIONARIT TK_igualacion EXPRESIONARIT											{}
	| EXPRESIONARIT TK_desigual EXPRESIONARIT											{}
	| EXPRESIONARIT TK_INCREMENTO														{}
	| EXPRESIONARIT TK_DECREMENTO														{}
	| EXPRESIONARIT TK_MAS EXPRESIONARIT       											{}
	| EXPRESIONARIT TK_MENOS EXPRESIONARIT     											{}
	| EXPRESIONARIT TK_numeral TK_POR EXPRESIONARIT       								{}
	| EXPRESIONARIT TK_POR EXPRESIONARIT       											{}
	| EXPRESIONARIT TK_DIVIDIDO EXPRESIONARIT  											{}
	| TK_par_apertura EXPRESIONARIT TK_par_cierre       								{}
	| TK_not EXPRESIONARIT																{}
	| TK_SIN TK_par_apertura EXPRESIONARIT TK_par_cierre								{}
	| TK_COS TK_par_apertura EXPRESIONARIT TK_par_cierre								{}
	| TK_LOG TK_par_apertura EXPRESIONARIT TK_par_cierre								{}
	| TK_TAN TK_par_apertura EXPRESIONARIT TK_par_cierre								{}
	| TK_SQRT TK_par_apertura EXPRESIONARIT TK_par_cierre								{}
	| TK_POW TK_par_apertura EXPRESIONARIT TK_coma EXPRESIONARIT TK_par_cierre			{}
	| TK_PARSE TK_par_apertura EXPRESIONARIT TK_par_cierre								{}
	| TK_numeral EXPRESIONARIT															{}
	| EXPRESIONARIT TK_concat EXPRESIONARIT       										{}
	| EXPRESIONARIT TK_potencia EXPRESIONARIT		       								{}
	| EXPRESIONARIT TK_punto EXPRESIONARIT       										{}
	| EXPRESIONARIT TK_MODULO EXPRESIONARIT       										{}
	| EXPRESIONARIT TK_pregunta EXPRESIONARIT TK_dos_puntos EXPRESIONARIT 				{}
	| VALORES 																			{ $$ = new Nodo_arbol("VALORES",""); $$.sethijo($1)}
;


IMPRESION: TK_PRINT TK_par_apertura EXPRESIONARIT TK_par_cierre FIN_LINEA							{   $$ = new Nodo_arbol("IMPRESION","");
																										$$.sethijo(new Nodo_arbol($1,"Reservada"));
																										$$.sethijo(new Nodo_arbol($2,"Simbolo"));
																										$$.sethijo($3);
																										$$.sethijo(new Nodo_arbol($4,"Simbolo"));
																										$$.sethijo(new Nodo_arbol($5,"Simbolo"));
																									}  
		|TK_PRINTLN TK_par_apertura EXPRESIONARIT TK_par_cierre	FIN_LINEA							{}
		|TK_PRINT TK_par_apertura EXPRESIONARIT TK_coma EXPRESIONARIT TK_par_cierre FIN_LINEA  		{}
		|TK_PRINTLN TK_par_apertura EXPRESIONARIT TK_coma EXPRESIONARIT TK_par_cierre FIN_LINEA     {}
;

/*
MAS_VALORES_IMPRESION: MAS_VALORES_IMPRESION TK_coma EXPRESIONARIT									{var a = $1.valor; var b = $3.valor; $1.valor= " "+a+" "+b; $$ = $1;}
					|MAS_VALORES_IMPRESION TK_coma ARREGLO											{}
					|TK_coma ARREGLO																{}
					|TK_coma EXPRESIONARIT															{$$ = $2;}
;*/

ASIGNACION: TK_ID TK_igual EXPRESIONARIT FIN_LINEA					 											{}
			|TK_ID TK_ID FIN_LINEA												 								{}
			|TK_ID TK_ID TK_igual EXPRESIONARIT FIN_LINEA			 			 								{}
			|TK_ID MAS_ATRIBUTOS TK_igual EXPRESIONARIT FIN_LINEA 				 								{}
			|TK_ID MAS_ATRIBUTOS ARREGLO TK_igual EXPRESIONARIT FIN_LINEA 		 								{}
			|TK_ID SIGNOS_COMPARACION EXPRESIONARIT FIN_LINEA					 								{}
			|TK_ID TK_igual ARREGLO FIN_LINEA																	{} // esta sustituye las dos de abajo
			//|TK_ID TK_igual TK_llave_apertura EXPRESIONARIT MAS_VALORES_IMPRESION TK_llave_cierre FIN_LINEA	{}
			//|TK_ID TK_igual TK_llave_apertura EXPRESIONARIT TK_llave_cierre FIN_LINEA							{}
			|TK_ID TK_par_apertura PARAMETROS_EXTRA TK_par_cierre FIN_LINEA 									{}
			//|TK_ID TK_par_apertura EXPRESIONARIT TK_par_cierre FIN_LINEA										{} //a(s)
			//|TK_ID TK_par_apertura EXPRESIONARIT MAS_VALORES_IMPRESION TK_par_cierre FIN_LINEA				{} //a(s,d,[sddd])
			|TK_ID TK_par_apertura  TK_par_cierre FIN_LINEA														{} //a()
			|TK_ID TK_DECREMENTO FIN_LINEA 														{}
			|TK_ID TK_INCREMENTO FIN_LINEA														{}
			|TK_ID TK_llave_apertura EXPRESIONARIT TK_llave_cierre 								{}
			|TK_ID TK_llave_apertura TK_llave_cierre											{}
			|TK_ID TK_llave_apertura EXPRESIONARIT TK_llave_cierre TK_igual ARREGLO FIN_LINEA	{}
			|TK_ID TK_llave_apertura TK_llave_cierre TK_igual ARREGLO FIN_LINEA					{}
			|TK_ID FUNCIONES_ARREGLO															{}
;

PARAMETROS_EXTRA: EXPRESIONARIT																	{}
				| ARREGLO																		{}
				| EXPRESIONARIT TK_coma PARAMETROS_EXTRA										{}
				| ARREGLO TK_coma PARAMETROS_EXTRA												{}
;


MAS_ATRIBUTOS: TK_punto TK_ID MAS_ATRIBUTOS 													{}
;

FUNCIONES_ARREGLO: TK_punto TK_PUSH TK_par_apertura EXPRESIONARIT TK_par_cierre TK_pcoma		{}
				|TK_punto TK_POP TK_par_apertura TK_par_cierre TK_pcoma							{}
				|TK_punto TK_LENGTH TK_par_apertura TK_par_cierre TK_pcoma						{}
;


//FIN_LINEA_ASIGNACION: TK_pcoma										{}
//					| ASIGNACION_TERNARIA FIN_LINEA					{}
//;


//ASIGNACION_TERNARIA: ASIGNACION_TERNARIA TK_pregunta EXPRESIONARIT TK_dos_puntos EXPRESIONARIT 
//					| TK_pregunta EXPRESIONARIT TK_dos_puntos EXPRESIONARIT 
//;

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
																																			//condicion:any,instrucciones:any,condicionelse
FUNCION_IF:  TK_IF TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre 					{}
			|TK_IF TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre  FUNCION_ELSEIF  {}
			|TK_IF TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre  FUNCION_ELSE    {}
			|TK_IF TK_par_apertura EXPRESIONARIT TK_par_cierre  INSTRUCCION2 					{}
			|TK_IF TK_par_apertura EXPRESIONARIT TK_par_cierre  INSTRUCCION2  FUNCION_ELSEIF	{}
			|TK_IF TK_par_apertura EXPRESIONARIT TK_par_cierre  INSTRUCCION2  FUNCION_ELSE		{}
;

FUNCION_ELSEIF: FUNCION_ELSEIF TK_ELSEIF TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre 		        {}
			  | FUNCION_ELSEIF TK_ELSEIF TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre  FUNCION_ELSE	{}
			  | TK_ELSEIF TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre FUNCION_ELSE					{}
			  | TK_ELSEIF TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre  		 						{}
			//|TK_ELSEIF TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre 				 		{}
;	

FUNCION_ELSE:TK_ELSE TK_corchete_apertura INSTRUCCION2 TK_corchete_cierre	{}	
			|TK_ELSE INSTRUCCION2 											{}
			//| MAS_SALTOS_LINEA TK_ELSE TK_corchete_apertura INSTRUCCIONES TK_corchete_cierre

;

FUNCION_SWITCH: TK_SWITCH TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura   TK_CASE EXPRESIONARIT TK_dos_puntos  LISTA_INSTRUCCIONES TK_BREAK TK_pcoma TK_corchete_cierre													{}
				|TK_SWITCH TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura   TK_CASE EXPRESIONARIT TK_dos_puntos  LISTA_INSTRUCCIONES TK_BREAK TK_pcoma  SENTENCIAS_CASE	TK_corchete_cierre								{}
				|TK_SWITCH TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura   TK_CASE EXPRESIONARIT TK_dos_puntos  LISTA_INSTRUCCIONES TK_BREAK TK_pcoma  TK_DEFAULT TK_dos_puntos LISTA_INSTRUCCIONES	TK_corchete_cierre  {}
;

SENTENCIAS_CASE: SENTENCIAS_CASE TK_CASE EXPRESIONARIT TK_dos_puntos  LISTA_INSTRUCCIONES TK_BREAK  TK_pcoma  							{}
				| SENTENCIAS_CASE TK_CASE EXPRESIONARIT TK_dos_puntos  LISTA_INSTRUCCIONES TK_BREAK  TK_pcoma  	TK_DEFAULT TK_dos_puntos LISTA_INSTRUCCIONES				{}
				| SENTENCIAS_CASE TK_CASE EXPRESIONARIT TK_dos_puntos  LISTA_INSTRUCCIONES 												{} 																														//|																			{$3.nombre= "AmbienteCaseDefault";$$ = new Switch(null,null,$3,true,this._$.first_line,this._$.first_column)}			
				|TK_CASE EXPRESIONARIT TK_dos_puntos  LISTA_INSTRUCCIONES TK_BREAK TK_pcoma												{}
;

//FUN_DEFAULT:TK_DEFAULT TK_dos_puntos LISTA_INSTRUCCIONES																				{$3.nombre = "AmbienteDefault";$$ = $3}
//;

BUCLES: BUCLE_WHILE
		|BUCLE_DO_WHILE
		|BUCLE_FOR
;


BUCLE_WHILE: TK_WHILE TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura  LISTA_INSTRUCCIONES TK_corchete_cierre												{}
;

BUCLE_DO_WHILE: TK_DO TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre TK_WHILE TK_par_apertura EXPRESIONARIT TK_par_cierre TK_pcoma								{}
;

BUCLE_FOR: TK_FOR TK_par_apertura DECLARACION  EXPRESIONARIT TK_pcoma TK_ID TK_INCREMENTO TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre			{}
		| TK_FOR TK_par_apertura ASIGNACION  EXPRESIONARIT TK_pcoma TK_ID TK_DECREMENTO TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre			{}
		| TK_FOR TK_ID TK_IN EXPRESIONARIT TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre 		{}
		| TK_FOR TK_ID TK_IN ARREGLO TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre 			//{$$ = new For($3.id,$3,$4,TipoAumento.DECREMENTO,TipoFor.CLASICO,$10,this._$.first_line,this._$.first_column);}
;
		//| TK_FOR TK_ID TK_IN TK_ID ARREGLO TK_corchete_apertura INSTRUCCIONES TK_corchete_cierre 