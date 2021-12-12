"use strict";
class Aritmetica {
    constructor(izquierda, derecha, tipo, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.izquierda = izquierda;
        this.derecha = derecha;
        this.tipo = tipo;
    }
    interpretar(entorno, recolector) {
        try {
            var izquierda = this.izquierda.interpretar(entorno, recolector);
            var derecha = this.derecha.interpretar(entorno, recolector);
            var resultado = new Return(0, Tipo.INTEGER);
            switch (this.tipo) {
                case TipoAritmetica.SUMA:
                    var vsumar = new Sumar();
                    //salidaConsolaconsole.log("antes de sumar");
                    resultado = vsumar.sumar(izquierda, derecha);
                    //console.log(resultado);
                    break;
                case TipoAritmetica.RESTA:
                    //console.log("Entra a restar");
                    var vresta = new Restar(); //hago referencia a un nuevo objeto de la clase Restar.ts
                    resultado = vresta.restar(izquierda, derecha);
                    //console.log(resultado);
                    break;
                case TipoAritmetica.MULTIPLICACION:
                    //console.log("Entra a restar");
                    var vmultiplicacion = new Multiplicacion(); //hago referencia a un nuevo objeto de la clase Restar.ts
                    resultado = vmultiplicacion.multiplicar(izquierda, derecha);
                    //console.log(resultado);
                    break;
                case TipoAritmetica.DIVISION:
                    //console.log("Entra a restar");
                    var vdivision = new Division(); //hago referencia a un nuevo objeto de la clase Restar.ts
                    resultado = vdivision.dividir(izquierda, derecha);
                    //console.log(resultado);
                    break;
                case TipoAritmetica.MODULO:
                    var vmodulo = new Modulo();
                    resultado = vmodulo.modulo(izquierda, derecha);
                    break;
                case TipoAritmetica.COSENO:
                    var vcoseno = new Coseno();
                    resultado = vcoseno.coseno(izquierda, derecha);
                    break;
                case TipoAritmetica.SENO:
                    var vseno = new Seno();
                    resultado = vseno.seno(izquierda, derecha);
                    break;
                case TipoAritmetica.TANGENTE:
                    var vtangente = new Tangente();
                    resultado = vtangente.tangente(izquierda, derecha);
                    break;
                case TipoAritmetica.RAIZ:
                    var vraiz = new Raiz();
                    resultado = vraiz.raiz(izquierda, derecha);
                    break;
                case TipoAritmetica.LOGARITMO:
                    var vlogaritmo = new Logaritmo();
                    resultado = vlogaritmo.logaritmo(izquierda, derecha);
                    break;
                case TipoAritmetica.POW:
                    var vpow = new Pow();
                    resultado = vpow.pow(izquierda, derecha);
                    break;
            }
            return resultado;
        }
        catch (e) {
            e.linea = this.linea;
            e.columna = this.columna;
            e.entorno = entorno;
            throw e;
        }
    }
}
