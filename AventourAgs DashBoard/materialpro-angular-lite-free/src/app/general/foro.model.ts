import { AsientoModelo } from './asiento.model';

export class ForoModelo {
    cantAsientos: number;
    dispAsientos: number;
    arrayAsientos: AsientoModelo[];
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
