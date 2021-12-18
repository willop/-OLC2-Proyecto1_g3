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
	: INSTRUCCIONES EOF																									{console.log($1); return $1;}
;

INSTRUCCIONES :VOID_MAIN																											{$$ =  [$1]}
	| INSTRUCCIONES_GLOBALES VOID_MAIN 																					{$$ = $1.concat($2);}
	| VOID_MAIN INSTRUCCIONES_GLOBALES																					{$$ = $2.concat($1);}
	|INSTRUCCIONES_GLOBALES VOID_MAIN INSTRUCCIONES_GLOBALES													{$1.concat($2); $1.concat($3); $$ = $1}
	//| error{$$=FErrores('Lexico',yytext,this._$.first_line,this._$.first_column,'Necesita metodo main');}											
	//| error { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); }
;

VOID_MAIN: TK_VOID TK_MAIN TK_par_apertura TK_par_cierre TK_corchete_apertura INSTRUCCION TK_corchete_cierre			{$$ = new Instrucciones($6,this._$.first_line,this._$.first_column,"MAIN")}	
;

INSTRUCCION: INSTRUCCION DECLARACION 			{$1.push($2); $$ = $1}
	| INSTRUCCION IMPRESION					    {$1.push($2); $$ = $1}
	| INSTRUCCION ASIGNACION					{$1.push($2); $$ = $1}
	| INSTRUCCION FUNCIONES_NATIVAS				{$1.push($2); $$ = $1}
	| INSTRUCCION LLAMADA_FUNCION				{$1.push($2); $$ = $1}
	| INSTRUCCION BREAK							{$1.push($2); $$ = $1}
	| INSTRUCCION RETURN						{$1.push($2); $$ = $1}
	| INSTRUCCION CONDICIONALES					{$1.push($2); $$ = $1}
	| INSTRUCCION BUCLES						{$1.push($2); $$ = $1}
	| DECLARACION 								{$$ = [$1]}
	| IMPRESION									{$$ = [$1]}
	| ASIGNACION								{$$ = [$1]}
	| FUNCIONES_NATIVAS							{$$ = [$1]}
	| LLAMADA_FUNCION							{$$ = [$1]}	
	| RETURN									{$$ = [$1]}
	| BREAK										{$$ = [$1]}
	| CONDICIONALES								{$$ = [$1]}
	| BUCLES									{$$ = [$1]}	
	
;

LISTA_INSTRUCCIONES: INSTRUCCION {$$ = new Instrucciones($1,this._$.first_line,this._$.first_column,null)}
;

INSTRUCCIONES_GLOBALES: INSTRUCCIONES_GLOBALES ASIGNACION			{$1.push($2); $$ = $1}
					| INSTRUCCIONES_GLOBALES DECLARACION			{$1.push($2); $$ = $1}
					//| INSTRUCCIONES_GLOBALES FUNCIONES			{$1.push($2); $$ = $1}
					| ASIGNACION									{$$ = [$1]}
					| DECLARACION									{$$ = [$1]}
					| LLAMADA_FUNCION										{$$ = [$1]}
;

INSTRUCCION2: DECLARACION 			{$$ = new Instrucciones([$1],this._$.first_line,this._$.first_column,null)}
	| IMPRESION						{$$ = new Instrucciones([$1],this._$.first_line,this._$.first_column,null)}
	| ASIGNACION					{$$ = new Instrucciones([$1],this._$.first_line,this._$.first_column,null)}	
	| FUNCIONES_NATIVAS				{$$ = new Instrucciones([$1],this._$.first_line,this._$.first_column,null)}
	| LLAMADA_FUNCION				{$$ = new Instrucciones([$1],this._$.first_line,this._$.first_column,null)}
	| RETURN						{$$ = new Instrucciones([$1],this._$.first_line,this._$.first_column,null)}
	| BUCLES						{$$ = new Instrucciones([$1],this._$.first_line,this._$.first_column,null)}	
;



DECLARACION: TIPO_VALOR TIPO_DECLARACION																													{	var asignacion = $2; console.log(asignacion.expresion);
																																							if(!Array.isArray(asignacion)){
																																								console.log("entra al if");
																																								asignacion.tipo = $1; 
																																								$$ = asignacion;
																																							}
																																							else{
																																								var tam = asignacion.length; console.log("el tamaño del vector es:" +tam);
																																								//var inst = new Instrucciones([asignacion[0]],this._$.first_line,this._$.first_column,null);
																																								for(var i=0;i<tam;i++){
																																								console.log("DENTRO DEL FOR");
																																								asignacion[i].tipo = $1;
																																								//var rec = asignacion[i];
																																								//console.log(asignacion[i].tipo+" "+asignacion[i].id);
																																								//$$ = asignacion[i];
																																								//console.log("el valor en inst es null = ")
																																								//inst.instrucciones.push(asignacion[i]);
																																								//$$ = inst;
																																								}
																																								$$ = asignacion; 
																																								//$$ = asignacion;
																																								//$$ = new Instrucciones([asignacion],this._$.first_line,this._$.first_column,null);
																																							}
																																							
																																						}   //asig = [exp=58,tipo=null,id=TK_ID] asgi.tipo = string [exp=58,tipo=string,id=TK_ID]
			| TIPO_VALOR TK_punto TK_PARSE TK_par_apertura TK_CADENA TK_par_cierre		{}
			//| TIPO_VALOR TK_par_apertura ARREGLO TK_par_cierre FIN_LINEA				{} // int ([asdf,fdd,f])
			| TIPO_VALOR TK_par_apertura EXPRESIONARIT TK_par_cierre FIN_LINEA			{}
			| TIPO_VALOR TK_ID TK_par_apertura PARAMETRO_FUNSION TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre				{var listainst =$7; listainst.crearentorno=false; $$ = new Funcion($1,$2,$4,listainst,this._$.first_line,this._$.first_column);}
			|  TIPO_VALOR TK_ID TK_par_apertura TK_ID TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre							{var listainst =$7; listainst.crearentorno=false; $$ = new Funcion($1,$2,[new Parametro($4,null,null,this._$.first_line,this._$.first_column)],listainst,this._$.first_line,this._$.first_column);}
			|  TIPO_VALOR TK_ID TK_par_apertura TK_ID MAS_PARAMETROS_FUNSION TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre	{var listainst =$8; listainst.crearentorno=false; var nuevo = new Parametro($4,null,null,this._$.first_line,this._$.first_column);
																																			 			$$ = new Funcion($1,$2,[nuevo].concat($5),listainst,this._$.first_line,this._$.first_column);}
			|  TIPO_VALOR TK_ID TK_par_apertura  TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre								{var listainst =$6; listainst.crearentorno=false;$$ = new Funcion($1,$2,[],listainst,this._$.first_line,this._$.first_column);}
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

TIPO_DECLARACION : TK_ID TK_igual EXPRESIONARIT FIN_LINEA																			{$$ = new Declaracion($3,this._$.first_line,this._$.first_column,null,$1)} //Declaracion = 58}	 // asig = [exp=58,tipo=null,id=null] asig.id=TK_ID  lo que subo es [exp=58,tipo=null,id=TK_ID]    //necesito verificar si es un vector																																
				| TK_ID  MAS_VARIABLES FIN_LINEA																					{var vec = $2; vec.push(new Declaracion(null,this._$.first_line,this._$.first_column,null,$1)); $$ = vec;}
				| COND_ARREGLO TK_ID TK_igual EXPRESIONARIT FIN_LINEA																{$$ = new DeclararArray($2, $4,null,this._$.first_line,this._$.first_column);}
				//  int[] a = 6      int [] a =[3,3]
				//| COND_ARREGLO TK_ID TK_igual ARREGLO FIN_LINEA																	{$$ = new DeclararArray($2, new ConstruirArray($4,this._$.first_line,this._$.first_column),null,this._$.first_line,this._$.first_column);}
				| COND_ARREGLO TK_ID FIN_LINEA																						{$$ = new DeclararArray($2,null,null,this._$.first_line,this._$.first_column);}
				| TK_ID FIN_LINEA																									{$$ = new Declaracion(null,this._$.first_line,this._$.first_column,null,$1);}
;//int[] a;

MAS_VARIABLES: MAS_VARIABLES TK_coma TK_ID																							{var vec = $1; vec.push(new Declaracion(null,this._$.first_line,this._$.first_column,null,$3)); $$ = vec;}
			|TK_coma TK_ID																											{var vec = [new Declaracion(null,this._$.first_line,this._$.first_column,null,$2)]; $$ = vec;}
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
/*
IGUALACION: TK_igual EXPRESIONARIT FIN_LINEA	
			|TK_igual ARREGLO FIN_LINEA								{$$ = [$2]} //aca ahora es un vector
;
*/


VALORES: TK_CADENA															{var a = $1; var al=a.length; var c = a.substring(1,al-1);    $$ = new Literal(c,Tipo.STRING,this._$.first_line,this._$.first_column);}
		|TK_NULL															{}
		|TK_TRUE															{$$ = new Literal(true,Tipo.BOOLEAN,this._$.first_line,this._$.first_column);}
		|TK_FALSE															{$$ = new Literal(false,Tipo.BOOLEAN,this._$.first_line,this._$.first_column);}
		|TK_CARACTER														{var a = $1; var al=a.length; var c = a.substring(1,al-1);    $$ = new Literal(c,Tipo.CHAR,this._$.first_line,this._$.first_column);}
		|ACCESSOATRIBUTO													{$$ =$1;}
		/*|TK_ID 																{$$ = new Acceso($1,this._$.first_line,this._$.first_column);}
		|TK_ID TK_par_apertura TK_par_cierre								{}
		|TK_ID TK_par_apertura PARAMETROS TK_par_cierre						{}
		|TK_ID ARREGLO 														{$$ = new AccesoArray($2[0],new Acceso($1,this._$.first_line,this._$.first_column), this._$.first_line,this._$.first_column);}
	  */|TK_ENTERO                        									{$$ = new Literal(parseInt($1),Tipo.INTEGER,this._$.first_line,this._$.first_column)}
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
		|TK_ID TK_par_apertura EXPRESIONARIT PARAMETROS_EXTRA TK_par_cierre		{console.log("LLAMADA VALORES 1");$$ = new LlamadaFuncion(new Acceso($1,this._$.first_line,this._$.first_column),true,[$3].concat($4),this._$.first_line,this._$.first_column);}
		|TK_ID TK_par_apertura EXPRESIONARIT TK_par_cierre						{console.log("LLAMADA VALORES 2");$$ = new LlamadaFuncion(new Acceso($1,this._$.first_line,this._$.first_column),true,[$3],this._$.first_line,this._$.first_column);}
;

ARREGLO: TK_llave_apertura LISTA_ARREGLO TK_llave_cierre										{$$=$2;}
		//TK_llave_apertura EXPRESIONARIT TK_llave_cierre										{} // [5]
		//|TK_llave_apertura ARREGLO TK_llave_cierre											{} //[[A]]
		//|TK_llave_apertura EXPRESIONARIT TK_coma TK_ TK_llave_cierre							{} //[A]
		//|TK_llave_apertura ARREGLO MAS_VALORES_IMPRESION TK_llave_cierre						{}
		//|TK_llave_apertura EXPRESIONARIT TK_dos_puntos EXPRESIONARIT TK_llave_cierre			{}
;

LISTA_ARREGLO: LISTA_ARREGLO TK_coma EXPRESIONARIT												{$1.push($3);$$=$1;}
			//|LISTA_ARREGLO TK_coma TK_llave_apertura LISTA_ARREGLO TK_llave_cierre			{var nuevo = new ConstruirArray($4,this._$.first_line,this._$.first_column); $1.push(nuevo);$$=$1;}
			//|TK_llave_apertura LISTA_ARREGLO TK_llave_cierre									{var nuevo = new ConstruirArray($2,this._$.first_line,this._$.first_column); $$ = [nuevo];}`s
			|EXPRESIONARIT																		{$$=[$1]}
;


EXPRESIONARIT
	: TK_MENOS EXPRESIONARIT %prec UMENOS  												{$$ = new Aritmetica( new Literal(-1,Tipo.INTEGER,this._$.first_line,this._$.first_column) ,$2,TipoAritmetica.MULTIPLICACION,this._$.first_line,this._$.first_column)}  ////Duda
	| EXPRESIONARIT TK_and EXPRESIONARIT       											{$$ = new Logica($1,$3,TipoLogica.AND,this._$.first_line,this._$.first_column);}
	| EXPRESIONARIT TK_or EXPRESIONARIT													{$$ = new Logica($1,$3,TipoLogica.OR,this._$.first_line,this._$.first_column);}
	| EXPRESIONARIT TK_mayor_igual EXPRESIONARIT       									{$$ = new Relacional($1,$3,TipoRelacional.MAYOR_IGUAL,this._$.first_line,this._$.first_column);}
	| EXPRESIONARIT TK_menor_igual EXPRESIONARIT       									{$$ = new Relacional($1,$3,TipoRelacional.MENOR_IGUAL,this._$.first_line,this._$.first_column);}
	| EXPRESIONARIT TK_mayor EXPRESIONARIT       										{$$ = new Relacional($1,$3,TipoRelacional.MAYOR_QUE,this._$.first_line,this._$.first_column);}
	| EXPRESIONARIT TK_menor EXPRESIONARIT												{$$ = new Relacional($1,$3,TipoRelacional.MENOR_QUE,this._$.first_line,this._$.first_column);}
	| EXPRESIONARIT TK_igualacion EXPRESIONARIT											{$$ = new Relacional($1,$3,TipoRelacional.IGUALDAD,this._$.first_line,this._$.first_column);}
	| EXPRESIONARIT TK_desigual EXPRESIONARIT											{$$ = new Relacional($1,$3,TipoRelacional.DESIGUALDAD,this._$.first_line,this._$.first_column);}
	| EXPRESIONARIT TK_INCREMENTO														{}
	| EXPRESIONARIT TK_DECREMENTO														{}
	| EXPRESIONARIT TK_MAS EXPRESIONARIT       											{$$ = new Aritmetica($1,$3,TipoAritmetica.SUMA,this._$.first_line,this._$.first_column)}
	| EXPRESIONARIT TK_MENOS EXPRESIONARIT     											{$$ = new Aritmetica($1,$3,TipoAritmetica.RESTA,this._$.first_line,this._$.first_column)}
	| EXPRESIONARIT TK_numeral TK_POR EXPRESIONARIT       								{}
	| EXPRESIONARIT TK_POR EXPRESIONARIT       											{$$ = new Aritmetica($1,$3,TipoAritmetica.MULTIPLICACION,this._$.first_line,this._$.first_column)}
	| EXPRESIONARIT TK_DIVIDIDO EXPRESIONARIT  											{$$ = new Aritmetica($1,$3,TipoAritmetica.DIVISION,this._$.first_line,this._$.first_column)}
	| TK_par_apertura EXPRESIONARIT TK_par_cierre       								{$$ = $2}
	| TK_not EXPRESIONARIT																{$$ = new Logica($2,$2,TipoLogica.NOT,this._$.first_line,this._$.first_column);}
	| TK_SIN TK_par_apertura EXPRESIONARIT TK_par_cierre								{$$ = new Aritmetica($3,$3,TipoAritmetica.SENO,this._$.first_line,this._$.first_column)}
	| TK_COS TK_par_apertura EXPRESIONARIT TK_par_cierre								{$$ = new Aritmetica($3,$3,TipoAritmetica.COSENO,this._$.first_line,this._$.first_column)}
	| TK_LOG TK_par_apertura EXPRESIONARIT TK_par_cierre								{$$ = new Aritmetica($3,$3,TipoAritmetica.LOGARITMO,this._$.first_line,this._$.first_column)}
	| TK_TAN TK_par_apertura EXPRESIONARIT TK_par_cierre								{$$ = new Aritmetica($3,$3,TipoAritmetica.TANGENTE,this._$.first_line,this._$.first_column)}
	| TK_SQRT TK_par_apertura EXPRESIONARIT TK_par_cierre								{$$ = new Aritmetica($3,$3,TipoAritmetica.RAIZ,this._$.first_line,this._$.first_column)}
	| TK_POW TK_par_apertura EXPRESIONARIT TK_coma EXPRESIONARIT TK_par_cierre			{$$ = new Aritmetica($3,$5,TipoAritmetica.POW,this._$.first_line,this._$.first_column)}
	| TK_PARSE TK_par_apertura EXPRESIONARIT TK_par_cierre								{}
	| TK_numeral EXPRESIONARIT															{}
	| EXPRESIONARIT TK_concat EXPRESIONARIT       										{ var a = $1; var al=a.length; var b = $3; var bl = b.length; var c = a.substring(1,al-1); var d = b.substring(1,bl-1); var total = c+d;  $$ = total;}
	| EXPRESIONARIT TK_potencia EXPRESIONARIT		       								{ $$ = new Potencia($1,$3,this._$.first_line,this._$.first_column);}
	| EXPRESIONARIT TK_MODULO EXPRESIONARIT       										{$$ = new Aritmetica($1,$3,TipoAritmetica.MODULO,this._$.first_line,this._$.first_column);}
	| EXPRESIONARIT TK_pregunta EXPRESIONARIT TK_dos_puntos EXPRESIONARIT 				{$$ = new Ternario($1,$3,$5,this._$.first_line,this._$.first_column);}
	| TK_llave_apertura LISTA_ARREGLO TK_llave_cierre									{var nuevo = new ConstruirArray($2,this._$.first_line,this._$.first_column); $$=nuevo;}
	//| TK_ID TK_par_apertura EXPRESIONARIT PARAMETROS_EXTRA TK_par_cierre 	{$$ = new LlamadaFuncion($1,true,$3,this._$.first_line,this._$.first_column);}
	| VALORES 																			{$$ = $1;}
;


IMPRESION: TK_PRINT TK_par_apertura EXPRESIONARIT TK_par_cierre FIN_LINEA							{$$ = new Print($3,this._$.first_line,this._$.first_column,false);}  
		|TK_PRINTLN TK_par_apertura EXPRESIONARIT TK_par_cierre	FIN_LINEA							{$$ = new Print($3,this._$.first_line,this._$.first_column,true);}
		|TK_PRINT TK_par_apertura EXPRESIONARIT TK_coma EXPRESIONARIT TK_par_cierre FIN_LINEA  		{$$ = new Print( new ExpComa($3,$5,this._$.first_line,this._$.first_column),this._$.first_line,this._$.first_column,false);}
		|TK_PRINTLN TK_par_apertura EXPRESIONARIT TK_coma EXPRESIONARIT TK_par_cierre FIN_LINEA     {$$ = new Print( new ExpComa($3,$5,this._$.first_line,this._$.first_column),this._$.first_line,this._$.first_column,true);}
;

/*
MAS_VALORES_IMPRESION: MAS_VALORES_IMPRESION TK_coma EXPRESIONARIT									{var a = $1.valor; var b = $3.valor; $1.valor= " "+a+" "+b; $$ = $1;}
					|MAS_VALORES_IMPRESION TK_coma ARREGLO											{}
					|TK_coma ARREGLO																{}
					|TK_coma EXPRESIONARIT															{$$ = $2;}
;*/


ACCESSOATRIBUTO : ACCESSOATRIBUTO TK_punto TK_ID			 													{new AccesoStruct} //     a[b][a][c]------a.a.b --- A[A,B]; [a,[v]]
				| ACCESSOATRIBUTO TK_llave_apertura EXPRESIONARIT TK_llave_cierre 								{$$ = new AccesoArray($3,$1, this._$.first_line,this._$.first_column);} // 	   a()
				| ACCESSOATRIBUTO TK_llave_apertura EXPRESIONARIT PARAMETROS_EXTRA TK_llave_cierre 				{$$ = new AccesoArray([$3].concat($4),$1, this._$.first_line,this._$.first_column);} // 	
			    //| TK_ID LLAMADA_FUNCION																			{}
				| TK_ID																							{$$ = new Acceso($1,this._$.first_line,this._$.first_column);}
				//| TK_ID TK_ID																					//{new sdfasdf}
				//| TK_ID TK_par_apertura PARAMETRO_FUNSION TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre					{var listainst =$7; listainst.crearentorno=false; $$ = new Funcion($1,$2,$4,listainst,this._$.first_line,this._$.first_column);}
;


ASIGNACION: ACCESSOATRIBUTO TK_igual EXPRESIONARIT FIN_LINEA					 								{//console.log("el tipo es acceso? "); console.log($1 instanceof Acceso);
																													if($1 instanceof Acceso){
																														//console.log("es asignacion variable");
																														var a1 = new Asignacion($3,this._$.first_line,this._$.first_column,$1);
																														console.log(a1.expresion);
																														$$ = a1;
																													}
																													else if($1 instanceof AccesoArray){
																														console.log("AccesoArray - no entrar")
																														$$ = new AsignarValorArray($3,$1, this._$.first_line,this._$.first_column);		
																													}																													
																												}
			|ACCESSOATRIBUTO FIN_LINEA																			{} // A[A][b] --- a.a.a.a   = arr[exp]  a = a[0];
			//|TK_ID TK_ID FIN_LINEA											 								{}
			//|TK_ID TK_ID TK_igual EXPRESIONARIT FIN_LINEA			 			 								{}
			//|TK_ID MAS_ATRIBUTOS TK_igual EXPRESIONARIT FIN_LINEA 				 							{}
			//|TK_ID MAS_ATRIBUTOS ARREGLO TK_igual EXPRESIONARIT FIN_LINEA 		 							{}
			|ACCESSOATRIBUTO SIGNOS_COMPARACION EXPRESIONARIT FIN_LINEA					 						{}
			//|TK_ID TK_igual ARREGLO FIN_LINEA																	{} // esta sustituye las dos de abajo
			//|TK_ID TK_igual TK_llave_apertura EXPRESIONARIT MAS_VALORES_IMPRESION TK_llave_cierre FIN_LINEA	{}
			//|TK_ID TK_igual TK_llave_apertura EXPRESIONARIT TK_llave_cierre FIN_LINEA							{}
			|ACCESSOATRIBUTO TK_par_apertura EXPRESIONARIT TK_par_cierre FIN_LINEA 								{$$ = new LlamadaFuncion($1,false,[$3],this._$.first_line,this._$.first_column);}
			|ACCESSOATRIBUTO TK_par_apertura EXPRESIONARIT PARAMETROS_EXTRA TK_par_cierre FIN_LINEA 			{console.log("el 3");console.log($3);console.log("el 4");console.log($4);$$= new LlamadaFuncion($1,false,[$3].concat($4),this._$.first_line,this._$.first_column);} // suma(5,6);
			//|TK_ID TK_par_apertura EXPRESIONARIT TK_par_cierre FIN_LINEA										{} //a(s,5)
			//|TK_ID TK_par_apertura EXPRESIONARIT MAS_VALORES_IMPRESION TK_par_cierre FIN_LINEA				{} [s,d,[sddd]]
			|ACCESSOATRIBUTO TK_par_apertura  TK_par_cierre FIN_LINEA											{} //a() -- llamar una funcion 
			|ACCESSOATRIBUTO TK_DECREMENTO FIN_LINEA 															{} //i++
			|ACCESSOATRIBUTO TK_INCREMENTO FIN_LINEA															{} //i--
			//|ACCESSOATRIBUTO TK_par_apertura EXPRESIONARIT PARAMETROS_EXTRA TK_par_cierre						{$$ = new LlamadaFuncion($1,true,$3,this._$.first_line,this._$.first_column);}
			//|TK_ID ARREGLO																					{} a[] ; int[] 
			//|TK_ID TK_llave_apertura TK_llave_cierre															{}
			//|TK_ID ARREGLO TK_igual EXPRESIONARIT FIN_LINEA													{$$ = new AsignarValorArray($6,new AccesoArray($3,new Acceso($1,this._$.first_line,this._$.first_column), this._$.first_line,this._$.first_column), this._$.first_line,this._$.first_column);} // AGREGAR UN ARREGLO
			//|TK_ID TK_llave_apertura EXPRESIONARIT TK_llave_cierre TK_igual TK_ID ARREGLO FIN_LINEA			{}
			//|TK_ID TK_llave_apertura TK_llave_cierre TK_igual ARREGLO FIN_LINEA								{} 
			//|TK_ID FUNCIONES_ARREGLO																			{}
;



PARAMETROS_EXTRA: PARAMETROS_EXTRA	TK_coma EXPRESIONARIT											{console.log("el 1");console.log($1);console.log("el 3 en Parametros extra");console.log($3);
																										if(!($1 instanceof Array)){
																											console.log("dentro de instance of");
																											$1 = [$1];				
																										}
																										
																										var aux = $1.push($3);
																										console.log("aca esta aux");
																										console.log(aux);
																										console.log("aca esta $1");
																										console.log($1);
																										$$ =aux;}
				  |	TK_coma EXPRESIONARIT															{console.log([$2]);$$ = [$2];}
;

/*
MAS_ATRIBUTOS: MAS_ATRIBUTOS TK_punto TK_ID  													{}
				|TK_punto TK_ID
;
*/

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

FUNCIONES_NATIVAS: TK_TOINT TK_par_apertura EXPRESIONARIT TK_par_cierre				{console.log("LLAMADA FUNCION NATIVA "+$1);$$ = new LlamadaFuncion("toInt",false,$3,this._$.first_line,this._$.first_column);}
				//|TK_TOINT TK_par_apertura EXPRESIONARIT TK_par_cierre FIN_LINEA		{console.log("LLAMADA FUNCION NATIVA "+$1);$$ = new LlamadaFuncion($1,false,$3,this._$.first_line,this._$.first_column);}
				|TK_TODOUBLE TK_par_apertura EXPRESIONARIT TK_par_cierre			{console.log("LLAMADA FUNCION NATIVA "+$1);$$ = new LlamadaFuncion("toDouble",false,$3,this._$.first_line,this._$.first_column);}
				//|TK_TODOUBLE TK_par_apertura EXPRESIONARIT TK_par_cierre FIN_LINEA  {console.log("LLAMADA FUNCION NATIVA "+$1);$$ = new LlamadaFuncion($1,false,$3,this._$.first_line,this._$.first_column);}

;


//LLAMADA_FUNCION:  TK_par_apertura PARAMETRO_FUNSION TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre					{var listainst =$7; listainst.crearentorno=false; $$ = new Funcion($1,$2,$4,listainst,this._$.first_line,this._$.first_column);}
/*				|  TK_ID TK_par_apertura TK_ID TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre							{var listainst =$7; listainst.crearentorno=false; $$ = new Funcion($1,$2,[new Parametro($4,null,null,this._$.first_line,this._$.first_column)],listainst,this._$.first_line,this._$.first_column);}
				|  TIPO_VALOR TK_ID TK_par_apertura TK_ID MAS_PARAMETROS_FUNSION TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre	{var listainst =$8; listainst.crearentorno=false; var nuevo = new Parametro($4,null,null,this._$.first_line,this._$.first_column);
																																			 		$$ = new Funcion($1,$2,[nuevo].concat($5),listainst,this._$.first_line,this._$.first_column);}
				|  TIPO_VALOR TK_ID TK_par_apertura  TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre								{var listainst =$6; listainst.crearentorno=false;$$ = new Funcion($1,$2,[],listainst,this._$.first_line,this._$.first_column);}
;*/



PARAMETRO_FUNSION: TIPO_VALOR TK_ID							{$$ = [new Parametro($2,$1,null,this._$.first_line,this._$.first_column)];}
				| TIPO_VALOR TK_ID MAS_PARAMETROS_FUNSION   {$$ = [new Parametro($2,$1,null,this._$.first_line,this._$.first_column)].concat($3);}
				| TK_ID TK_ID								{$$ = [new Parametro($2,Tipo.STRUCT,$1,this._$.first_line,this._$.first_column)];}
				| TK_ID TK_ID MAS_PARAMETROS_FUNSION		{$$ = [new Parametro($2,Tipo.STRUCT,$1,this._$.first_line,this._$.first_column)].concat($3);}
;

MAS_PARAMETROS_FUNSION: MAS_PARAMETROS_FUNSION TK_coma TIPO_VALOR TK_ID		{$$ = $1.push(new Parametro($4,$3,null,this._$.first_line,this._$.first_column));}
				|MAS_PARAMETROS_FUNSION TK_coma TK_ID TK_ID					{$$ = $1.push(new Parametro($4,Tipo.STRUCT,$3,this._$.first_line,this._$.first_column));}
				|MAS_PARAMETROS_FUNSION TK_coma TK_ID 						{$$ = $1.push(new Parametro($3,null,null,this._$.first_line,this._$.first_column));}
				|TK_coma TIPO_VALOR TK_ID									{$$ = [new Parametro($3,$2,null,this._$.first_line,this._$.first_column)];}
				|TK_coma TK_ID TK_ID										{$$ = [new Parametro($3,Tipo.STRUCT,$2,this._$.first_line,this._$.first_column)];}
				|TK_coma TK_ID												{$$ = [new Parametro($2,null,null,this._$.first_line,this._$.first_column)];}
;

RETURN: TK_RETURN EXPRESIONARIT FIN_LINEA															{$$ = new Retornar($2,this._$.first_line,this._$.first_column);}		// return a+b;
		//| TK_RETURN TK_ID TK_par_apertura PARAMETRO_FUNSION TK_par_cierre FIN_LINEA					{}		//return (int a)   return(struc struc)    return (a a,b b)  return     ///duda
		| TK_RETURN  FIN_LINEA																		{$$ = new Retornar(null,this._$.first_line,this._$.first_column);}
;

BREAK: TK_BREAK TK_pcoma																			{$$ = new Break(this._$.first_line,this._$.first_column);}
	| TK_CONTINUE TK_pcoma																			{$$ = new Continue(this._$.first_line,this._$.first_column);}	

;


CONDICIONALES: FUNCION_IF																	{$$ = $1}
			| FUNCION_SWITCH																{$$ = $1}
;
																																			//condicion:any,instrucciones:any,condicionelse
FUNCION_IF:  TK_IF TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre 					{$6.nombre = "AmbienteIf"; $$ = new If($3,$6,null,this._$.first_line,this._$.first_column)}
			|TK_IF TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre  FUNCION_ELSEIF  {$6.nombre = "AmbienteIf"; $$ = new If($3,$6,$8,this._$.first_line,this._$.first_column)}
			|TK_IF TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre  FUNCION_ELSE    {$6.nombre = "AmbienteIf"; $$ = new If($3,$6,$8,this._$.first_line,this._$.first_column)}
			|TK_IF TK_par_apertura EXPRESIONARIT TK_par_cierre  INSTRUCCION2 					{$5.nombre = "AmbienteIf"; $$ = new If($3,$5,null,this._$.first_line,this._$.first_column)}
			|TK_IF TK_par_apertura EXPRESIONARIT TK_par_cierre  INSTRUCCION2  FUNCION_ELSEIF		{$5.nombre = "AmbienteIf"; $$ = new If($3,$5,$6,this._$.first_line,this._$.first_column)}
			|TK_IF TK_par_apertura EXPRESIONARIT TK_par_cierre  INSTRUCCION2  FUNCION_ELSE		{$5.nombre = "AmbienteIf"; $$ = new If($3,$5,$6,this._$.first_line,this._$.first_column)}
;

FUNCION_ELSEIF: FUNCION_ELSEIF TK_ELSEIF TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre 		        {
																																									$7.nombre = "AmbienteElseIf"; 
																																									var Velse = new If($4,$7,null,this._$.first_line,this._$.first_column); 
																																									var valorcondicion = $1;
																																									while(valorcondicion.condicionelse!=null){
																																										valorcondicion = valorcondicion.condicionelse;
																																									}
																																									valorcondicion.condicionelse = Velse; 
																																									$$ = $1
																																								}
			  | FUNCION_ELSEIF TK_ELSEIF TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre  FUNCION_ELSE	{
																																									$7.nombre = "AmbienteElseIf"; 
																																									var Velse = new If($4,$7,$9,this._$.first_line,this._$.first_column);
																																									var valorcondicion = $1;
																																									while(valorcondicion.condicionelse!=null){
																																										valorcondicion = valorcondicion.condicionelse;
																																									}
																																									valorcondicion.condicionelse = Velse;
																																									$$ = $1
																																								}
			  | TK_ELSEIF TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre FUNCION_ELSE					{$6.nombre = "AmbienteElseIf"; 
																																								$$ = new If($3,$6,$8,this._$.first_line,this._$.first_column)}
			  | TK_ELSEIF TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre  		 						{$6.nombre = "AmbienteElseIf";
																																								$$ = new If($3,$6,null,this._$.first_line,this._$.first_column)}
			//|TK_ELSEIF TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre 				 		{}
;	

FUNCION_ELSE:TK_ELSE TK_corchete_apertura INSTRUCCION2 TK_corchete_cierre	{$3.nombre = "AmbienteElse";$$ = $3}	
			|TK_ELSE INSTRUCCION2 											{$2.nombre = "AmbienteElse";$$ = $2}
			//| MAS_SALTOS_LINEA TK_ELSE TK_corchete_apertura INSTRUCCIONES TK_corchete_cierre

;

FUNCION_SWITCH: TK_SWITCH TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura   TK_CASE EXPRESIONARIT TK_dos_puntos  LISTA_INSTRUCCIONES  TK_corchete_cierre													{$9.nombre= "AmbienteSwitch";
																																																											$$ = new Switch($3,$7,$9,null,this._$.first_line,this._$.first_column);
																																																											}
			  /*|TK_SWITCH TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura   TK_CASE EXPRESIONARIT TK_dos_puntos  LISTA_INSTRUCCIONES  TK_corchete_cierre																	{$9.nombre= "AmbienteSwitch";
																																																											$$ = new Switch($3,$7,$9,null,this._$.first_line,this._$.first_column);
																																																											}
			  */|TK_SWITCH TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura   TK_CASE EXPRESIONARIT TK_dos_puntos  LISTA_INSTRUCCIONES   SENTENCIAS_CASE	TK_corchete_cierre												{$9.nombre= "AmbienteSwitch"; 
																																																											var sentenciascase = $10;
																																																											while(sentenciascase!= null){
																																																												sentenciascase.condicionswitch = $3;
																																																												sentenciascase = sentenciascase.condiciondefault;
																																																											}
																																																											$$ = new Switch( $3,$7,$9,$10,this._$.first_line,this._$.first_column);
																																																											}
				/*|TK_SWITCH TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura   TK_CASE EXPRESIONARIT TK_dos_puntos  LISTA_INSTRUCCIONES  SENTENCIAS_CASE	TK_corchete_cierre													{$9.nombre= "AmbienteSwitch"; 
																																																											var sentenciascase = $9;
																																																											var expresiones = $3;
																																																											while(sentenciascase!= null){
																																																												sentenciascase.condicionswitch = $3;
																																																												expresiones.push(sentenciascase.instrucciones);
																																																												sentenciascase = sentenciascase.condiciondefault;
																																																											}
																																																											$$ = new Switch( $3,$7,$9,$10,this._$.first_line,this._$.first_column);
																																																											}																																																											
			*/|TK_SWITCH TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura   TK_CASE EXPRESIONARIT TK_dos_puntos  LISTA_INSTRUCCIONES   TK_DEFAULT TK_dos_puntos LISTA_INSTRUCCIONES	TK_corchete_cierre  {$9.nombre= "AmbienteSwitch";
																																																											$15.condicionswitch = $3;  $$ = new Switch( $3,$7,$9,$11,this._$.first_line,this._$.first_column);
																																																											}
;

SENTENCIAS_CASE: SENTENCIAS_CASE TK_CASE EXPRESIONARIT TK_dos_puntos  LISTA_INSTRUCCIONES 					 							{
																																			console.log("entra en case:");
																																			$4.nombre= "AmbienteCase";
																																			var Vcase = new Switch($1.condicionswitch,$3,$5,null,this._$.first_line,this._$.first_column);
																																			var valorcondicion = $1;
																																			while(valorcondicion.condiciondefault!= null){
																																				valorcondicion = valorcondicion.condiciondefault;
																																			}
																																			$1.condicionswitch = valorcondicion.condicionswitch;
																																			valorcondicion.condiciondefault = Vcase;
																																			console.log("sube el valor nulo creo: "+$1.condicionswitch+"  aca tambien vacio creo anterior "+valorcondicion.condicionswitch);
																																			$$ = $1;
																																		}
				| SENTENCIAS_CASE TK_CASE EXPRESIONARIT TK_dos_puntos  LISTA_INSTRUCCIONES 	TK_DEFAULT TK_dos_puntos LISTA_INSTRUCCIONES				{
																																			//console.log("case: "+$2.valor);
																																			$4.nombre= "AmbienteCase";
																																			var Vcase = new Switch($1.condicionswitch,$3,$5,$10,this._$.first_line,this._$.first_column);
																																			var valorcondicion = $1;
																																			while(valorcondicion.condiciondefault!= null){
																																				valorcondicion = valorcondicion.condiciondefault;
																																			}
																																			if(valorcondicion.condicionswitch == null){
																																				console.log("la condicion switch de la ultima iteracion es null")
																																			}
																																			$1.condicionswitch = valorcondicion.condicionswitch;
																																			valorcondicion.condiciondefault = Vcase;
																																			$$ = $1;
																																		}
				/* | SENTENCIAS_CASE TK_CASE EXPRESIONARIT TK_dos_puntos  LISTA_INSTRUCCIONES 												{
																																			//console.log("case: "+$2.valor);
																																			$4.nombre= "AmbienteCase";
																																			var Vcase = new Switch(null,$2,$4,$5,this._$.first_line,this._$.first_column);
																																			var valorcondicion = $6;
																																			while(valorcondicion.condiciondefault!= null){
																																				valorcondicion = valorcondicion.condiciondefault;
																																			}
																																			valorcondicion.condiciondefault = Vcase;
																																			$$ = $1;
																																		} */
																																		//|																			{$3.nombre= "AmbienteCaseDefault";$$ = new Switch(null,null,$3,true,this._$.first_line,this._$.first_column)}			
				|TK_CASE EXPRESIONARIT TK_dos_puntos  LISTA_INSTRUCCIONES 																{console.log("entra al solitario case");$4.nombre= "AmbienteCase";$$ = new Switch(null,$2,$4,null,this._$.first_line,this._$.first_column)}
;

//FUN_DEFAULT:TK_DEFAULT TK_dos_puntos LISTA_INSTRUCCIONES																				{$3.nombre = "AmbienteDefault";$$ = $3}
//;

BUCLES: BUCLE_WHILE
		|BUCLE_DO_WHILE
		|BUCLE_FOR
;


BUCLE_WHILE: TK_WHILE TK_par_apertura EXPRESIONARIT TK_par_cierre TK_corchete_apertura  LISTA_INSTRUCCIONES TK_corchete_cierre												{$$ = new While($3,$6,this._$.first_line,this._$.first_column);}
;

BUCLE_DO_WHILE: TK_DO TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre TK_WHILE TK_par_apertura EXPRESIONARIT TK_par_cierre TK_pcoma								{$$ = new DoWhile($7,$3,this._$.first_line,this._$.first_column);}
;

BUCLE_FOR: TK_FOR TK_par_apertura DECLARACION  EXPRESIONARIT TK_pcoma TK_ID TK_INCREMENTO TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre			{$$ = new For($3.id,$3,$4,TipoAumento.INCREMENTO,TipoFor.CLASICO,$10,this._$.first_line,this._$.first_column);}
		| TK_FOR TK_par_apertura ASIGNACION  EXPRESIONARIT TK_pcoma TK_ID TK_DECREMENTO TK_par_cierre TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre			{$$ = new For($3.id,$3,$4,TipoAumento.DECREMENTO,TipoFor.CLASICO,$10,this._$.first_line,this._$.first_column);}
		| TK_FOR TK_ID TK_IN EXPRESIONARIT TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre 		{console.log("Tipo en forin: "+$4.tipo);$$ = new For($2,0,$4,TipoAumento.DECREMENTO,TipoFor.FORIN,$6,this._$.first_line,this._$.first_column);}
		//| TK_FOR TK_ID TK_IN ARREGLO TK_corchete_apertura LISTA_INSTRUCCIONES TK_corchete_cierre 			//{$$ = new For($3.id,$3,$4,TipoAumento.DECREMENTO,TipoFor.CLASICO,$10,this._$.first_line,this._$.first_column);}
		//| TK_FOR TK_ID TK_IN TK_ID ARREGLO TK_corchete_apertura INSTRUCCIONES TK_corchete_cierre 
;