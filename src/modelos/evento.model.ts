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
<<<<<<< HEAD
    arrayHorarios:string[] = [];
    arrayInstancias:InstanciaModelo[] = [];
=======
    arrayHorarios:string[];
    arrayInstancias:InstanciaModelo[];
    strClave:string;
>>>>>>> 463b3dee2446367230dcb5bc2a91cf02d3b627e2
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
    
}