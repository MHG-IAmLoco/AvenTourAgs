export class MapaModelo {
    _id: string = "";
    strPueblo: string = "";
    strNombre: string = "";
    nmbLatitud: number;
    nmbLongitud: number;
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}