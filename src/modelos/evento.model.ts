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
    dteHoraInicio:Date;
    dteHoraFin:Date;
    nmbCostoAdulto:number;
    nmbCostoMenor:number;
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
            this.dteHoraInicio = auxEventoModelo.dteHoraInicio;
            this.dteHoraFin = auxEventoModelo.dteHoraFin;
            this.nmbCostoAdulto=auxEventoModelo.nmbCostoAdulto;
            this.nmbCostoMenor=auxEventoModelo.nmbCostoMenor;
        }
    }
}