"use strict";
class TypeOf {
    constructor() {
        this.tipo = TipoFuncionNativa.TYPEOF;
    }
    type_of(valor) {
        try {
            return new Return(Tipo[valor.tipo], valor.tipo);
        }
        catch (e) {
            throw new ErrorOperacion(0, 0, "NO SE PUEDE OBTENER EL TIPO DE: " + valor.valor, null);
        }
    }
}
