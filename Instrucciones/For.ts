class For implements Instruccion {
    idcontrol: any;
    inicio: any;                  // for(var idcontrol = inicio; final, tipoaumento){  listainstrucciones }  ----- tipo 
    final: any;                    // for idcontrol in final { listainstrucciones   } ------- TipoFor.IN 
    tipoaumento: any;
    tipo: any;
    listainstrucciones: any;
    linea: number;
    columna: number;
    constructor(_idcontrol: any, _inicio: any, _final: any, _tipoaumento: any, _tipo: any, listainstrucciones: any, linea: number, columna: number) {
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

    interpretar(entorno: any, recolector: any) {
        try {
            //for clasico
            if (this.tipo == TipoFor.CLASICO) {
                return this.ejecutarfclasico(this.idcontrol, this.inicio, this.final, entorno, recolector);
            }
            else {
                if (this.final.tipo == Tipo.STRING) {
                    this.final.valor = Array.from(this.final.valor);
                    var lit = new Declaracion(null, this.linea, this.columna, Tipo.STRING, this.idcontrol)//declaro la variable
                    lit.interpretar(entorno, recolector);
                    var simbolo = entorno.ObtenerSimbolo(this.idcontrol);
                    //console.log("Imprimiendo simbolo");
                    //console.log(simbolo);
                    var asig = new Asignacion(new Literal(this.final.valor[0], Tipo.STRING, this.linea, this.columna), this.linea, this.columna, new Acceso(this.idcontrol, this.linea, this.columna));
                    asig.interpretar(entorno, recolector);
                    //var variable = entorno.ObtenerSimbolo(this.idcontrol);
                    this.ejecutarforin(this.idcontrol, this.inicio, this.final, entorno, recolector)
                }
                else {
                    console.log("VIENDO QUE TRAE");
                    console.log(this.final);                   
                    if (this.final instanceof ConstruirArray) {
                        var auxfinal = [];
                        //console.log(this.final);
                        var tipoarreglo = this.final.expresion[0].tipo;
                        for (var i = 0; i < this.final.expresion.length; i++) {
                            auxfinal.push(this.final.expresion[i].valor)
                        }
                        //console.log(auxfinal);
                        this.final.expresion = auxfinal;
                        var lit = new Declaracion(null, this.linea, this.columna, tipoarreglo, this.idcontrol)//declaro la variable
                        lit.interpretar(entorno, recolector);
                        var simbolo = entorno.ObtenerSimbolo(this.idcontrol);
                        //console.log("Imprimiendo simbolo");
                        //console.log(simbolo);
                        var asig = new Asignacion(new Literal(this.final.expresion[0], Tipo.INTEGER, this.linea, this.columna), this.linea, this.columna, new Acceso(this.idcontrol, this.linea, this.columna));
                        asig.interpretar(entorno, recolector);
                        var simbolo2 = entorno.ObtenerSimbolo(this.idcontrol);
                        //console.log(simbolo2);

                        this.ejecutarforinarreglo(this.idcontrol, this.inicio, this.final, entorno, recolector)

                    }else{
                        console.log("entramos al else de varialb arreglo");
                        var fin = this.final.interpretar(entorno,recolector);
                        var nuevoaux = [];
                        var tipoarr = fin.valor[0].tipo;
                        for(var x = 0; x<fin.valor.length; x++){
                            nuevoaux.push(fin.valor[x].valor);
                        }
                        fin.valor = nuevoaux;
                        console.log(fin.valor);
                        var nliteral = new Declaracion(null,this.linea,this.columna,tipoarr,this.idcontrol);
                        nliteral.interpretar(entorno,recolector);
                        var nsimbolo = entorno.ObtenerSimbolo(this.idcontrol);
                        var aisnacion = new Asignacion(new Literal(fin.valor[0],Tipo.INTEGER,this.linea,this.columna),this.linea,this.columna,new Acceso(this.idcontrol,this.linea,this.columna));
                        aisnacion.interpretar(entorno,recolector);        
                        this.ejecutarforinarreglovariable(this.idcontrol,this.inicio,fin,entorno,recolector);
                        
                    }
                    //si entra con un arreglo para

                }
            }

        } catch (e) {
            recolector.listaerrores.push(e);
            recolector.listaerrores.push(new ErrorGeneral(this.linea, this.columna, "ERROR EN FOR", entorno));
        }
    }


    //***************************************** FOR CLASICO ************************************************* */
    ejecutarfclasico(idcontrol: any, inicio: any, final: any, entorno: any, recolector: any) {
        this.inicio.interpretar(entorno, recolector); //se ejecuta la variable
        console.log("for clasico")
        console.log(final);
        return this.iteracionClasica(final, entorno, recolector);
    }

    iteracionClasica(final: any, entorno: any, recolector: any): void { //metodo vacio
        var auxfinal = final.interpretar(entorno, recolector);
        console.log("valor en for auxfinal interpretado: ");
        console.log(auxfinal);
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
                    } else {
                        return aux;
                    }
                }
                //hacer el break
                console.log("antes de sumar")
                if (this.tipoaumento == TipoAumento.INCREMENTO) {
                    console.log(entorno.ObtenerSimbolo(this.idcontrol)) //2
                    var asig = new Asignacion(new Aritmetica(new Literal(1, Tipo.INTEGER, this.linea, this.columna), new Acceso(this.idcontrol, this.linea, this.columna), TipoAritmetica.SUMA, this.linea, this.columna), this.linea, this.columna, new Acceso(this.idcontrol, this.linea, this.columna));
                    asig.interpretar(entorno, recolector); //3
                    console.log(entorno.ObtenerSimbolo(this.idcontrol)) //3

                } else {
                    var asig = new Asignacion(new Aritmetica(new Literal(1, Tipo.INTEGER, this.linea, this.columna), new Acceso(this.idcontrol, this.linea, this.columna), TipoAritmetica.RESTA, this.linea, this.columna), this.linea, this.columna, new Acceso(this.idcontrol, this.linea, this.columna));
                    asig.interpretar(entorno, recolector);
                }
                /*console.log("antes de retornar")
                console.log(final);
                console.log(entorno.ObtenerSimbolo(this.idcontrol))
                console.log(asig)
                //console.log(asig.interpretar(entorno, recolector));
                console.log(this.idcontrol);*/
                return this.iteracionClasica(final, entorno, recolector);
            }

        } else {
            throw new EBoolean(this.linea, this.columna, "ERROR TIPO INCORRECTO EN CONDICION", null);
        }
    }

    //***************************************** FOR IN ************************************************* */
    ejecutarforin(idcontrol: any, inicio: any, final: any, entorno: any, recolector: any) {
        //this.inicio.interpretar(entorno, recolector); //se ejecuta la variable
        return this.iteracionforin(final, entorno, recolector, 1);
    }

    iteracionforin(final: any, entorno: any, recolector: any, iniciofor1: any): void { //metodo vacio
        var iniciofor = iniciofor1
        var finalfor = final.valor.length + 1   /// hola = 4
        var variable = entorno.ObtenerSimbolo(this.idcontrol); // letra

        //console.log("valor de la variable: "+variable.expresion +" e id: "+variable.id);                                                                         //primero se verifica si es un string o un arreglo y a la variable la dejamos como arreglo
        //finalfor 4 >= 0 true,  0 <= 4
        //console.log("final "+finalfor+" , iniccio: "+iniciofor);
        if (finalfor >= 0 && iniciofor < finalfor) {
            //console.log("Estas entrando pa?");
            var aux = this.listainstrucciones.interpretar(entorno, recolector);   //print  imprime solo h
            if (aux != null) { // validas que tenga retorno
                if (aux instanceof Return) { //que se de tipo retorno
                    if (aux.tipo == Tipo.CONTINUE) { //depende si es continue o break
                        return this.iteracionClasica(final, entorno, recolector);
                    }
                    else if (aux.tipo == Tipo.BRAKE) {
                        return;
                    }
                } else {
                    return aux;
                }
            }
            //console.log("antes de ingresar al incremento del For In con un valor de: "+variable.expresion)
            //console.log(entorno.ObtenerSimbolo(this.idcontrol)) //devuelve h
            var asig = new Asignacion(new Literal(this.final.valor[iniciofor], Tipo.INTEGER, this.linea, this.columna), this.linea, this.columna, new Acceso(this.idcontrol, this.linea, this.columna));
            asig.interpretar(entorno, recolector);
            iniciofor = iniciofor + 1;
            if (iniciofor >= finalfor) {

            } else {
                //console.log("entra aca con valores: "+iniciofor +" y finalfor "+finalfor);
                return this.iteracionforin(final, entorno, recolector, iniciofor);
            }
        }
        else {

        }
    }



    ejecutarforinarreglo(idcontrol: any, inicio: any, final: any, entorno: any, recolector: any) {
        //this.inicio.interpretar(entorno, recolector); //se ejecuta la variable
        return this.iteracionforinarreglo(final, entorno, recolector, 1);
    }

    iteracionforinarreglo(final: any, entorno: any, recolector: any, iniciofor1: any): void { //metodo vacio
        var iniciofor = iniciofor1
        var finalfor = final.expresion.length + 1   /// hola = 4
        var variable = entorno.ObtenerSimbolo(this.idcontrol); // letra

        //console.log("ACA ENTRAMOS A ITERACION FOR ARREGLO");
        //console.log(iniciofor, finalfor, variable);

        //console.log("valor de la variable: "+variable.expresion +" e id: "+variable.id);                                                                         //primero se verifica si es un string o un arreglo y a la variable la dejamos como arreglo
        //finalfor 4 >= 0 true,  0 <= 4
        //console.log("final "+finalfor+" , iniccio: "+iniciofor);
        if (finalfor >= 0 && iniciofor < finalfor) {
            //console.log("Estas entrando pa?");
            console.log(this.listainstrucciones);
            var aux = this.listainstrucciones.interpretar(entorno, recolector);   //print  imprime solo h
            console.log("IMPRIMIENDO AUX")
            console.log(aux)
            if (aux != null) { // validas que tenga retorno
                if (aux instanceof Return) { //que se de tipo retorno
                    if (aux.tipo == Tipo.CONTINUE) { //depende si es continue o break
                        return this.iteracionClasica(final, entorno, recolector);
                    }
                    else if (aux.tipo == Tipo.BRAKE) {
                        return;
                    }
                } else {
                    return aux;
                }
            }
            //console.log("antes de ingresar al incremento del For In con un valor de: "+variable.expresion)
            //console.log(entorno.ObtenerSimbolo(this.idcontrol)) //devuelve h
            var asig = new Asignacion(new Literal(this.final.expresion[iniciofor], Tipo.INTEGER, this.linea, this.columna), this.linea, this.columna, new Acceso(this.idcontrol, this.linea, this.columna));
            asig.interpretar(entorno, recolector);
            iniciofor = iniciofor + 1;
            if (iniciofor >= finalfor) {

            } else {
                //console.log("entra aca con valores: "+iniciofor +" y finalfor "+finalfor);
                return this.iteracionforinarreglo(final, entorno, recolector, iniciofor);
            }
        }
        else {

        }
    }

    ejecutarforinarreglovariable(idcontrol: any, inicio: any, final: any, entorno: any, recolector: any) {
        //this.inicio.interpretar(entorno, recolector); //se ejecuta la variable
        return this.iteracionforinarreglovariable(final, entorno, recolector, 1);
    }

    iteracionforinarreglovariable(final: any, entorno: any, recolector: any, iniciofor1: any): void { //metodo vacio
        var iniciofor = iniciofor1
        var finalfor = final.valor.length + 1   /// hola = 4
        var variable = entorno.ObtenerSimbolo(this.idcontrol); // letra
        //console.log("ACA ENTRAMOS A ITERACION FOR ARREGLO");
        //console.log(iniciofor, finalfor, variable);

        //console.log("valor de la variable: "+variable.expresion +" e id: "+variable.id);                                                                         //primero se verifica si es un string o un arreglo y a la variable la dejamos como arreglo
        //finalfor 4 >= 0 true,  0 <= 4
        //console.log("final "+finalfor+" , iniccio: "+iniciofor);
        if (finalfor >= 0 && iniciofor < finalfor) {
            //console.log("Estas entrando pa?");
            console.log(this.listainstrucciones);
            var aux = this.listainstrucciones.interpretar(entorno, recolector);   //print  imprime solo h
            console.log("IMPRIMIENDO AUX")
            console.log(aux)
            if (aux != null) { // validas que tenga retorno
                if (aux instanceof Return) { //que se de tipo retorno
                    if (aux.tipo == Tipo.CONTINUE) { //depende si es continue o break
                        return this.iteracionClasica(final, entorno, recolector);
                    }
                    else if (aux.tipo == Tipo.BRAKE) {
                        return;
                    }
                } else {
                    return aux;
                }
            }
            //console.log("antes de ingresar al incremento del For In con un valor de: "+variable.expresion)
            //console.log(entorno.ObtenerSimbolo(this.idcontrol)) //devuelve h
            var asig = new Asignacion(new Literal(final.valor[iniciofor], Tipo.INTEGER, this.linea, this.columna), this.linea, this.columna, new Acceso(this.idcontrol, this.linea, this.columna));
            asig.interpretar(entorno, recolector);
            iniciofor = iniciofor + 1;
            if (iniciofor >= finalfor) {

            } else {
                //console.log("entra aca con valores: "+iniciofor +" y finalfor "+finalfor);
                return this.iteracionforinarreglovariable(final, entorno, recolector, iniciofor);
            }
        }
        else {

        }
    }

    ///CUANDO SEA UN STRING , SE COMPARA EL INDEX DE LA CADENA CONTRA EL TAMANIO DE LA CADENA (INCIO,FIN)
}


    ///CUANDO SEA UN STRING , SE COMPARA EL INDEX DE LA CADENA CONTRA EL TAMANIO DE LA CADENA (INCIO,FIN)




