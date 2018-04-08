export class GaleriaModelo{
    _id:string="";
    strTitulo:string="";
    strDescripcion:string="";
    strImagenPrincipal:string="";
    arrayImagenes:GaleriaModelo[]=[];
    constructor(auxGaleriaModelo?:GaleriaModelo){
        if(auxGaleriaModelo){
            this._id = auxGaleriaModelo._id;
            this.strTitulo = auxGaleriaModelo.strTitulo;
            this.strDescripcion = auxGaleriaModelo.strDescripcion;
            this.strImagenPrincipal = auxGaleriaModelo.strImagenPrincipal;
            this.arrayImagenes = auxGaleriaModelo.arrayImagenes;
        }
    }
}
