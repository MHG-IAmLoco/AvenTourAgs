export class ActividadModelo{
    strDescripcion:string;
    nmbDuracion:number;
    strClave:string;
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}