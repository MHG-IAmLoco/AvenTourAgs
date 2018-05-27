export class GaleriaModelo {
    _id: string;
    strTitulo: string;
    strDescripcion: string;
    strImagenPrincipal: string;
    arrayImagenes: GaleriaModelo[];
    constructor(values: Object = {}) {
        Object.assign(this, values);
   }
}
