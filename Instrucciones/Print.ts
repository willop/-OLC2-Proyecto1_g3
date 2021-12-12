class Print implements Instruccion {
    expresion: any;
    linea: number;
    columna: number;
    lineanueva: boolean;
    constructor (expresion:any,linea: number, columna: number,lineanueva: boolean){
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
        this.lineanueva = lineanueva;
    }
    
    interpretar(entorno:any,recolector:any){
        try{
            var resultado = this.expresion.interpretar(entorno,recolector);
            var salida = resultado.valor;
            
            //inicio algoritmo para las cadenas
            if(resultado.tipo == Tipo.STRING){
            var tam = salida.length;
            var expresion ="";
            var textosalida ="";
            
            for(var i =0;i<tam;i++){
                expresion = "";
                console.log("Analizando el caracter: "+salida.charAt(i))
                if(salida.charAt(i) == '$'){
                    //console.log("Si se reconocio el caracter");
                    i++;
                    console.log("ahora el nuevo caracter es: "+salida.charAt(i))
                    if(!salida.charAt(i).match(/[a-z]/i) && i<tam-1){
                        while(!salida.charAt(i).match(/[a-z]/i) && i<tam-1){
                            console.log("dentro del primer while con: "+salida.charAt(i)+" valor i: "+i+" y tam: "+tam)
                            if(i==tam-1){
                                console.log("llego a igual")
                                break;
                            }
                            else if(salida.charAt(i) == "$"){
                                console.log("aca ni entra");
                                i--;
                                break;
                            }
                            else{
                            expresion+=salida.charAt(i);
                            i++
                            }
                        }//fin while
                        i=i-1;
                        //console.log("saliendo del while siendo numero: "+expresion);
                        expresion = eval(expresion);
                        textosalida+=expresion;
                    }//fin if para de digitos
                    else{
                        //console.log("Entra al else? con:"+salida.charAt(i))
                        expresion="";
                        while(salida.charAt(i) !=' '){
                            if(i==tam){
                            }
                            else{
                            expresion+=salida.charAt(i);
                            i++
                            }
                        }//fin while
                        //expresion = eval(expresion);
                        textosalida+="--"+expresion+"--";
                    }
                }else{
                    textosalida+=salida.charAt(i);
                }
                
            }//fin del for
            salida = textosalida;
            console.log("La salida es de: "+textosalida);
            }
            //fin del algoritmo

            if(this.lineanueva){
                salida = "\n"+ salida 
            }
            recolector.consola.push(salida);
        }catch(e){
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea,this.columna,"ERROR EN PRINT",entorno));
        }        
    }
}