import {EventoModelo} from '../modelos/evento.model';
export class ItinerarioModelo{
    _id:string="";
    strTitulo:string="";
    strDescripcion:string="";
    strImagenPrincipal:string="";
    nmbCostoAproximado:number;
    nmbTiempoAproximado:number;
    arrayEventos:EventoModelo[]=[];
    constructor(auxItinerarioModelo?:ItinerarioModelo){
        if(auxItinerarioModelo){
            this._id=auxItinerarioModelo._id;
            this.strTitulo=auxItinerarioModelo.strTitulo;
            this.strDescripcion=auxItinerarioModelo.strDescripcion;
            this.strImagenPrincipal=auxItinerarioModelo.strImagenPrincipal;
            this.nmbCostoAproximado=auxItinerarioModelo.nmbCostoAproximado;
            this.nmbTiempoAproximado=auxItinerarioModelo.nmbTiempoAproximado;
            this.arrayEventos=auxItinerarioModelo.arrayEventos;
        }
    }
}