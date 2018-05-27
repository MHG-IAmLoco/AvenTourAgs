export class QrModelo {
    _id: string = "";
    strNombre: string = "";
    strUbicacion: string = "";
    nmbPuntos: number;
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}