class Entorno {
    prev: any
    nombre: any
    numero: any
    variables: any
    funciones: any
    estructuras = {}

    constructor(prev: any, nombre: any, numero: any) {
        this.prev = prev;
        this.nombre = nombre;
        this.numero = numero;
        this.variables = new Map<String, Simbolo>();
        this.funciones = new Map<String, Funcion>();
    }

    GuardarSimbolo(valor: any, id: any, tipo: any, auxtipo=null) {
        var entactual = this;

        var nuevosimbolo = new Simbolo(valor, id, tipo,auxtipo);
        if (entactual.variables.has(id)) {
            throw new VariableYaDeclarada(0, 0, "LA VARIABLE " + id + " YA ESTA DECLARADA", this);
        }
        this.variables.set(id, nuevosimbolo);
    }

    ActualizarSimbolo(valor: any, id: any, tipo: any,auxtipo = null) {
        var entactual = this;

        var nuevosimbolo = new Simbolo(valor, id, tipo,auxtipo);
        while (entactual != null) {
            if (entactual.variables.has(id)) {
                entactual.variables.set(id, nuevosimbolo);
                return;
            }
            entactual = entactual.prev
        }
        throw new VariableNoDeclarada(0,0,"LA VARIABLE "+ id + " NO ESTA DECLARADA",this);
    }

    ObtenerSimbolo(id: any) {
        var entactual = this;

        while (entactual != null) {
            if (entactual.variables.has(id)) {
                return entactual.variables.get(id);
            }
            entactual = entactual.prev
        }
        return null;
    }

    guardarfuncion(funcion:any) {
        if(this.funciones.has(funcion.id)){
            throw new FuncionYaDeclarada(0,0,"FUNCION YA DECLARADA",this);

        }
        this.funciones.set(funcion.id,funcion);
    }

    obtenerfuncion(funcion:any) {
        var entactual = this;
        while (entactual != null) {
            if (entactual.funciones.has(funcion)) {
                return entactual.funciones.get(funcion);
            }
            entactual = entactual.prev
        }
        return null;
    }
}
