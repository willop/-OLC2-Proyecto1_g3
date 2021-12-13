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
            }
        }
        catch (e) {
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea, this.columna, "ERROR EN FOR", entorno));
        }
    }
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
}
