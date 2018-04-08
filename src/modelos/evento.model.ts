export class EventoModelo{
    _id:string="";
    strTipo:string="";
    strTitulo:string="";
    strDescripcion:string="";
    strResenia:string="";
    strImagenPrincipal:string="";
    dteFecha:Date;
    strMunicipio:string="";
    strUbicacion:string="";
    dteHora:Date;
    strCosto:string="";
    constructor(auxEventoModelo?:EventoModelo){
        if(auxEventoModelo){
            this._id = auxEventoModelo._id;
            this.strTipo = auxEventoModelo.strTipo;
            this.strTitulo = auxEventoModelo.strTitulo;
            this.strDescripcion = auxEventoModelo.strDescripcion;
            this.strResenia = auxEventoModelo.strResenia;
            this.strImagenPrincipal = auxEventoModelo.strImagenPrincipal;
            this.dteFecha = auxEventoModelo.dteFecha;
            this.strMunicipio = auxEventoModelo.strMunicipio;
            this.strUbicacion = auxEventoModelo.strUbicacion;
            this.dteHora = auxEventoModelo.dteHora;
            this.strCosto=auxEventoModelo.strCosto;
        }
    }
}