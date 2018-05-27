export class InstanciaModelo {
    strFecha: string;
    strHora: string;
    nmbLugares: number;
    constructor(values: Object = {}) {
        Object.assign(this, values);
   }
}
