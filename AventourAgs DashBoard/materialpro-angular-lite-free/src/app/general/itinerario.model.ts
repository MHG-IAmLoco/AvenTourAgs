import { ActividadModelo } from './actividad.model';
export class ItinerarioModelo {
    _id: string;
    strTitulo: string;
    strDescripcion: string;
    strImagenPrincipal: string;
    nmbCostoAproximado: number;
    nmbTiempoAproximado: number;
    arrayActividades: ActividadModelo[];
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
