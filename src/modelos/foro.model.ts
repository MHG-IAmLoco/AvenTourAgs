import { AsientoModelo } from "./asiento.model";

export class ForoModelo{
    //_id:string="";
    cantAsientos:number;
    dispAsientos:number;
    arrayAsientos:AsientoModelo[];
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}