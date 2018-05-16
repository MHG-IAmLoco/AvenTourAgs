import { AsientoModelo } from "./asiento.model";

export class ForoModelo{
    _id:string="";
    cantAsientos:number;
    arrayAsientos:AsientoModelo[];
    constructor(auxForoModelo?:ForoModelo){
        if(auxForoModelo){
            this._id = auxForoModelo._id;
            this.cantAsientos = auxForoModelo.cantAsientos;
            this.arrayAsientos = auxForoModelo.arrayAsientos;
        }
    }
}