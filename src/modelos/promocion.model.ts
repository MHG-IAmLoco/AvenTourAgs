export class PromocionModelo {
    _id: string = "";
    strNombre: string = "";
    strUbicacion: string = "";
    strDescripcion: string = "";
    strImagen: string = "";
    nmbPuntos: number;
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}