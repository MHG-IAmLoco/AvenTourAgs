import { ForoModelo } from "./foro.model";

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
    dteHoraInicio:Date;
    dteHoraFin:Date;
    nmbCostoAdulto:number;
    nmbCostoMenor:number;
    modeloForo:ForoModelo;
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
    
}