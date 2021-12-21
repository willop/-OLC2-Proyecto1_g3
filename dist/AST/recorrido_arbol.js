"use strict";
var id_n = 1;
class recorrido_arbol {
    constructor() {
    }
    recorrer_arbol(nodo) {
        var concatenacion = "";
        if (nodo.id == 0) {
            nodo.id = id_n;
            id_n++;
        }
        concatenacion += (nodo.id + '[label ="' + nodo.valor + '" fillcolor ="#d62728" shape="circle"];\n').toString();
        nodo.hijos.forEach((element) => {
            concatenacion += (nodo.id + '->' + id_n + ';\n');
            concatenacion += this.recorrer_arbol(element);
        });
        return concatenacion;
    }
}
