import { ForoModelo } from "./foro.model";
import { InstanciaModelo } from "./instancia.model";

export class EventoModelo{
    _id:string="";
    strTipo:string="";
    strTitulo:string="";
    strDescripcion:string="";
    strResenia:string="";
    strImagenPrincipal:string="";
    dteFecha:Date;
    strUbicacion:string="";
    dteHoraInicio:Date;
    dteHoraFin:Date;
    nmbCostoAdulto:number;
    nmbCostoMenor:number;
    modeloForo:ForoModelo;
    nmbCupo:number;
    arrayHorarios:string[];
    arrayInstancias:InstanciaModelo[];
    strClave:string;
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
    
}