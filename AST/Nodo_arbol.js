class Nodo_arbol{
    valor;
    id;
    hijos;
    constructor(valor){
        this.id=0;
        this.valor=valor;
        this.hijos=[];
    }
    getValor(){
        this.valor;
    }
    sethijo(_hijo){
        this.hijos.push(_hijo);
    }
}