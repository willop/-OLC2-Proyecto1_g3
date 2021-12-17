class Switch implements Instruccion {
    condicionswitch: any;
    expresion:any;
    instrucciones:any;
    condiciondefault:any;
    linea: number;
    columna: number;
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
}