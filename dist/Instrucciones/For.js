"use strict";
class For {
    constructor(_idcontrol, _inicio, _final, _tipoaumento, _tipo, listainstrucciones, linea, columna) {
        this.idcontrol = _idcontrol;
        this.inicio = _inicio;
        this.final = _final;
        this.tipoaumento = _tipoaumento;
        this.tipo = _tipo;
        this.linea = linea;
        this.columna = columna;
        this.listainstrucciones = listainstrucciones;
        //      this.esdeclaracion = esdeclaracion;
    }
    interpretar(entorno, recolector) {
        try {
            //for clasico
            if (this.tipo == TipoFor.CLASICO) {
                return this.ejecutarfclasico(this.idcontrol, this.inicio, this.final, entorno, recolector);
            }
            else {
                this.final.valor = Array.from(this.final.valor);
                var lit = new Declaracion(null, this.linea, this.columna, Tipo.STRING, this.idcontrol);
                lit.interpretar(entorno, recolector);
                var simbolo = entorno.ObtenerSimbolo(this.idcontrol);
                var asig = new Asignacion(new Literal(this.final.valor[0], Tipo.STRING, this.linea, this.columna), this.linea, this.columna, simbolo.id);
                asig.interpretar(entorno, recolector);
                var variable = entorno.ObtenerSimbolo(this.idcontrol);
                this.ejecutarforin(this.idcontrol, this.inicio, this.final, entorno, recolector);
            }
        }
        catch (e) {
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea, this.columna, "ERROR EN FOR", entorno));
        }
    }
    //***************************************** FOR CLASICO ************************************************* */
    ejecutarfclasico(idcontrol, inicio, final, entorno, recolector) {
        this.inicio.interpretar(entorno, recolector); //se ejecuta la variable
        return this.iteracionClasica(final, entorno, recolector);
    }
    iteracionClasica(final, entorno, recolector) {
        var auxfinal = final.interpretar(entorno, recolector);
        console.log("valor en for auxfinal: " + auxfinal);
        if (auxfinal.tipo == Tipo.BOOLEAN) {
            if (auxfinal.valor) {
                var aux = this.listainstrucciones.interpretar(entorno, recolector);
                if (aux != null) { // validas que tenga retorno
                    if (aux instanceof Return) { //que se de tipo retorno
                        if (aux.tipo == Tipo.CONTINUE) { //depende si es continue o break
                            return this.iteracionClasica(final, entorno, recolector);
                        }
                        else if (aux.tipo == Tipo.BRAKE) {
                            return;
                        }
                    }
                    else {
                        return aux;
                    }
                }
                //hacer el break
                console.log("antes de ingreasr al incremento");
                if (this.tipoaumento == TipoAumento.INCREMENTO) {
                    console.log(entorno.ObtenerSimbolo(this.idcontrol));
                    var asig = new Asignacion(new Aritmetica(new Literal(1, Tipo.INTEGER, this.linea, this.columna), new Acceso(this.idcontrol, this.linea, this.columna), TipoAritmetica.SUMA, this.linea, this.columna), this.linea, this.columna, this.idcontrol);
                    asig.interpretar(entorno, recolector);
                }
                else {
                    var asig = new Asignacion(new Aritmetica(new Literal(1, Tipo.INTEGER, this.linea, this.columna), new Acceso(this.idcontrol, this.linea, this.columna), TipoAritmetica.RESTA, this.linea, this.columna), this.linea, this.columna, this.idcontrol);
                    asig.interpretar(entorno, recolector);
                }
                return this.iteracionClasica(final, entorno, recolector);
            }
        }
        else {
            throw new EBoolean(this.linea, this.columna, "ERROR TIPO INCORRECTO EN CONDICION", null);
        }
    }
    //***************************************** FOR IN ************************************************* */
    ejecutarforin(idcontrol, inicio, final, entorno, recolector) {
        //this.inicio.interpretar(entorno, recolector); //se ejecuta la variable
        return this.iteracionforin(final, entorno, recolector, 1);
    }
    iteracionforin(final, entorno, recolector, iniciofor1) {
        var iniciofor = iniciofor1;
        var finalfor = final.valor.length + 1; /// hola = 4
        var variable = entorno.ObtenerSimbolo(this.idcontrol);
        //console.log("valor de la variable: "+variable.expresion +" e id: "+variable.id);                                                                         //primero se verifica si es un string o un arreglo y a la variable la dejamos como arreglo
        //finalfor 4 >= 0 true,  0 <= 4
        //console.log("final "+finalfor+" , iniccio: "+iniciofor);
        if (finalfor >= 0 && iniciofor < finalfor) {
            //console.log("Estas entrando pa?");
            var aux = this.listainstrucciones.interpretar(entorno, recolector); //print  imprime solo h
            if (aux != null) { // validas que tenga retorno
                if (aux instanceof Return) { //que se de tipo retorno
                    if (aux.tipo == Tipo.CONTINUE) { //depende si es continue o break
                        return this.iteracionClasica(final, entorno, recolector);
                    }
                    else if (aux.tipo == Tipo.BRAKE) {
                        return;
                    }
                }
                else {
                    return aux;
                }
            }
            //hacer el break
            //console.log("antes de ingresar al incremento del For In con un valor de: "+variable.expresion)
            //console.log(entorno.ObtenerSimbolo(this.idcontrol)) //devuelve h
            var asig = new Asignacion(new Literal(this.final.valor[iniciofor], Tipo.STRING, this.linea, this.columna), this.linea, this.columna, variable.id);
            asig.interpretar(entorno, recolector);
            iniciofor = iniciofor + 1;
            if (iniciofor > finalfor) {
            }
            else {
                //console.log("entra aca con valores: "+iniciofor +" y finalfor "+finalfor);
                return this.iteracionforin(final, entorno, recolector, iniciofor);
            }
        }
        else {
        }
    }
}
