export class AsientoModelo{
    _id:string="";
    numAsiento:number;
    strColor:string="";
    constructor(auxAsientoModelo?:AsientoModelo){
        if(auxAsientoModelo){
            this._id = auxAsientoModelo._id;
            this.numAsiento = auxAsientoModelo.numAsiento;
            this.strColor = auxAsientoModelo.strColor;
        }
    }
}