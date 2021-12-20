class Concatenacion implements Instruccion {
    expresioniz: any;
    expresionder:any;
    linea: number;
    columna: number;
    constructor (expresioniz:any,expresionder:any,linea: number, columna: number){
        this.linea = linea;
        this.expresioniz = expresioniz;
        this.columna = columna;
        this.expresionder = expresionder;
    }
    
    interpretar(entorno:any,recolector:any){


            this.expresionder = this.expresionder.interpretar(entorno,recolector);
            console.log(this.expresionder)
            this.expresioniz = this.expresioniz.interpretar(entorno,recolector);
            console.log(this.expresioniz)
            

            //validacion de tipo
            //string o variable
                //si derecha es string                 /// string string --  string id            id -- string       id -- id
            if(this.expresionder.tipo == Tipo.STRING || this.expresionder.tipo == Tipo.INTEGER || this.expresionder.tipo == Tipo.DOUBLE || this.expresionder.tipo == Tipo.CHAR){
                //izquierda string
                if(this.expresioniz.tipo == Tipo.STRING || this.expresioniz.tipo == Tipo.INTEGER || this.expresioniz.tipo == Tipo.DOUBLE || this.expresioniz.tipo == Tipo.CHAR){
                    //console.log("string -- string");`
                    //console.log("string -- string: "+this.expresioniz.valor+" -- "+this.expresionder.valor)
                    return new Return(this.expresioniz.valor.toString().concat(this.expresionder.valor.toString()),Tipo.STRING);
                //izquierda variable
                }else if(this.expresioniz.id != null){
                    //console.log("id -- string");
                    //console.log("id -- string: "+this.expresioniz.valor+" -- "+this.expresionder.valor)
                    var variable = entorno.ObtenerSimbolo(this.expresioniz.id);
                    return new Return(variable.valor.concat(this.expresionder.valor),Tipo.STRING);
                }
            }//
            else if(this.expresionder.id != null){
                var variableder = entorno.ObtenerSimbolo(this.expresionder.id);
                //console.log("string -- id");
                if(this.expresioniz.tipo == Tipo.STRING || this.expresioniz.tipo == Tipo.INTEGER || this.expresioniz.tipo == Tipo.DOUBLE || this.expresioniz.tipo == Tipo.CHAR){
                    //console.log("string -- id: "+this.expresioniz.valor+" -- "+this.expresionder.valor)
                    return new Return(this.expresioniz.valor.toString().concat(variableder.valor.toString()),Tipo.STRING);
                }else{
                    //console.log("id -- id");
                    //console.log("id -- id: "+this.expresioniz.valor+" -- "+this.expresionder.valor)
                    var variableiz = entorno.ObtenerSimbolo(this.expresioniz.id);
                    return new Return(variableiz.valor.toString().concat(variableder.valor.toString()),Tipo.STRING);
                }
            }
            else{
                recolector.listaerrores.push(new ErrorOperacion(this.linea,this.columna,"TIPOS INCORRECTOS",entorno));
                return new Return("",Tipo.STRING);
            }
    }
}