class Nodo_arbol{
    valor:any;
    id:any;
    tipo:any;
    hijos:any;
    constructor(valor:any,tipo:any){
        this.id=0;
        this.valor=valor;
        this.tipo=tipo;
        this.hijos=[];
    }
    getValor(){
        this.valor;
    }
    sethijo(_hijo:any){
        this.hijos.push(_hijo);
    }
}