import { QrModelo } from "./qr.model";

export class UsuarioModelo {
    _id: string = "";
    strNombre: string = "";
    strApellido: string = "";
    strCorreo: string = "";
    strContraseña: string = "";
    arrayQr: Array<QrModelo> = new Array<QrModelo>();
    nmbPuntos: number;
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}