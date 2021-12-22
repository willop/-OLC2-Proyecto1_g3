class Switch implements Instruccion {
    condicionswitch: any;
    expresion:any;
    instrucciones:any;
    condiciondefault:any;
    linea: number;
    columna: number;
    condicionencontrada = false;
    constructor (condicion:any,expresion:any,instrucciones:any,condiciondefault:any,linea: number, columna: number){
        this.linea = linea;
        this.expresion = expresion;
        this.columna = columna;
        this.condicionswitch = condicion;
        this.instrucciones = instrucciones;
        this.condiciondefault = condiciondefault;
    }
    
    interpretar(entorno:any,recolector:any){
        try{
            console.log("Condicion swith");
            console.log(this.condicionswitch);
            if (this.condicionswitch instanceof Concatenacion){
                this.condicionswitch = this.condicionswitch.interpretar(entorno,recolector);
                console.log("Despues de interpretar es:");
                console.log(this.condicionswitch)
            }
            console.log("Expresion");
            console.log(this.expresion);
            console.log("entra en switch, recive como parametros: \nCondicionSwitch: "+this.condicionswitch.tipo+"\nExpresion: "+this.expresion.tipo);
            //var resultado = this.condicion.interpretar(entorno,recolector);
            //se evalua la expresio si corresonde a un booleano
            if(this.condicionswitch.tipo != this.expresion.tipo){
                //verifico que la condicionswitch sea una varialbe
                this.condicionswitch = entorno.ObtenerSimbolo(this.condicionswitch.id);
                if(this.condicionswitch.tipo != null){
                    //console.log("la variable contiene: "+this.condicionswitch.valor)
                }else{
                    //console.log("no era una variables -- error")
                    throw new EIf(this.linea,this.columna,"ERROR TIPO INCORRECTO EN CONDICION " +this.condicionswitch.tipo+" - " + this.expresion.tipo,null); 
                }
            }
            //si es verdadero retronara la lista de instruciones 
            if(this.condicionswitch.valor == this.expresion.valor) {
                // aca esta listo para ejecutar las instrucciones
                //var inst = this.instrucciones
                /*console.log("le voy a enviar a la funcion:");
                console.log(inst);
                this.funcionmascondiciones(inst,entorno, recolector);
                console.log("*********************************\n****************************\n******************")
                console.log("Estas instrucciones ejecutara")
                console.log(this.instrucciones)*/
                return this.instrucciones.interpretar(entorno,recolector);
            //si ya no trae instrucciones a ejecutar, realizara la condicion else siempre y cuando no sea nula
            }else if(this.condiciondefault != null){
                return this.condiciondefault.interpretar(entorno,recolector);
            }
            
        }catch(e){
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea,this.columna,"ERROR EN CONDICIONAL SWITCH",entorno));
        }        
    }


    funcionmascondiciones(funcionesejecutar:any,entorno:any,recolector:any){
        var banderabreak=false;
        var inst:any;
                for(inst in funcionesejecutar.instrucciones) {
                    console.log("IMPRIMIENDO INSTRUCCIONES")
                    console.log(funcionesejecutar.instrucciones[inst]);
                    if(this.instrucciones.instrucciones[inst] instanceof Break){
                        console.log("******************** SE ENCONTRO UN BREAK ***********");
                        banderabreak = true;
                    }
                }//despues de reconocer todas las INSTRUCCIONES
                if(banderabreak){
                    //se ejecuta todo lo recolectado
                    this.instrucciones = funcionesejecutar;
                    return;
                }else{
                    //verifico si existen mas instrucciones en el defatul o si existe default
                    if(this.condiciondefault != null){
                        console.log("la lista de instrucciones no tiene break\ny la condicion default osea abajo tiene instrucciones\n ahora a buscar esas instrucciones");
                        console.log(this.condiciondefault.instrucciones);
                        var instr = this.instrucciones;
                        instr += this.instrucciones;
                        console.log("va a ser recursivo");
                        console.log(instr)
                        this.funcionmascondiciones(instr,entorno,recolector);
                    }else{
                        return this.instrucciones.interpretar(entorno,recolector);
                    }
                }
    }
}