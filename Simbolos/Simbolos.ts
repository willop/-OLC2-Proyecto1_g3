class Simbolo{
    valor:any;
    id:any;
    tipo:any;
    auxtipo:any;
    atributos:any;

    constructor(valor:any,id:any,tipo:any,auxtipo=null,atributos=null){
        this.valor= valor;
        this.id= id;
        this.tipo = tipo;
        this.auxtipo = auxtipo;
        this.atributos = new Map<String,Return>();

    }
}