class LlamadaFuncion implements Expresion {
    linea: number;
    columna: number;
    id: any;
    llamadaexpresion: any;
    parametros: any;

    constructor (id:any,llamadaexpresion:any,parametros:any,linea: number, columna: number){
        this.linea = linea;
        this.columna = columna;
        this.id = id;
        this.llamadaexpresion = llamadaexpresion;
        this.parametros = parametros;
    }

    interpretar(entorno:any,recolector:any){
        try{
            //validar que sea acceso para

            if(!(this.id instanceof Acceso)){               

                throw new ErrorGeneral(this.linea, this.columna, "ERROR NO ES UN ACCESO", entorno);
            }
            var nuevoid = this.id.id;
            

            //intentar obtener la funcion
            var funcion = entorno.obtenerfuncion(nuevoid);
            console.log("*********** LLAMADA FUNCION************")
            console.log(funcion);
            if(funcion != null){

                console.log("this parametros length");
                console.log(this.parametros.length);
                console.log("funcionparametros length");
                console.log(funcion.parametros.length);
            
                if(this.parametros.length != funcion.parametros.length){
                    throw new ErrorGeneral(this.linea, this.columna, "ERROR TAMAñO DE PARAMETROS", entorno); 
                }
                var ent = new Entorno(entorno,nuevoid,entorno.numero+1);
                for(var i=0;i<funcion.parametros.length;i++){
                    var valor = this.parametros[i].interpretar(entorno, recolector);
                    //console.log()
                    
                    if(valor.tipo != funcion.parametros[i].tipo){
                        throw new ErrorGeneral(this.linea, this.columna, "ERROR TAMAñO DE PARAMETROS", entorno);
                    }
                    ent.GuardarSimbolo(valor.valor,funcion.parametros[i].id,valor.tipo);
                    
                }//fin for
                var aux = funcion.instrucciones.interpretar(ent, recolector);
                    if(aux != null){ // validas que tenga retorno
                        console.log(aux);
                        if(aux instanceof Return){ //que se de tipo retorno
                            if(aux.tipo == Tipo.CONTINUE){ //depende si es continue o break
                                throw new ErrorGeneral(this.linea, this.columna, "ERROR, CONTINUE NO CONSUMIDO", entorno);
                            }
                            else if(aux.tipo == Tipo.BRAKE){
                                throw new ErrorGeneral(this.linea, this.columna, "ERROR BRAKE NO CONSUMIDO", entorno);
                            }
                            else{
                                return aux;
                            }
                        }else if(aux["tipo"] == Tipo.RETURN){//"tipo":Tipo.RETURN
                            
                            var retor = aux["valor"];
                            if(retor.tipo == Tipo.NULL){
                                if(this.llamadaexpresion){
                                    return new Literal(null,Tipo.NULL,this.linea,this.columna);
                                }else{
                                    return
                                }
                            }else{
                                return retor;
                            }
                        }
                    }else if(this.llamadaexpresion){
                        return new Literal(null,Tipo.NULL,this.linea,this.columna);
                    }

            }else{
                
            }

        }catch(e){
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea, this.columna, "ERROR EN LLAMADA FUNCION", entorno));
        }
    }
}