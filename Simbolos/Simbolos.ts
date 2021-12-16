class Simbolo{
    valor:any;
    id:any;
    tipo:any;
    auxtipo:any;

    constructor(valor:any,id:any,tipo:any,auxtipo=null){
        this.valor= valor;
        this.id= id;
        this.tipo = tipo;
        this.auxtipo = auxtipo

    }
}