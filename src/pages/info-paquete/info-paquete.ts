import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { ViewChild } from '@angular/core';
import { ItinerarioModelo } from '../../modelos/itinerario.model';
import { EventoModelo } from '../../modelos/evento.model';
import { InfoEventoPage } from '../info-evento/info-evento';

@IonicPage()
@Component({
  selector: 'page-info-paquete',
  templateUrl: 'info-paquete.html',
})
export class InfoPaquetePage {
  @ViewChild(Navbar) navBar: Navbar;
  itinerario:ItinerarioModelo;
  arrayAux: Array <EventoModelo> = new Array<EventoModelo>();
  intTipoPaquete:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,private tts:TextToSpeech) {
    if(this.navParams.get('TipoPaquete')){
      this.intTipoPaquete = this.navParams.get('TipoPaquete');
      console.log(this.intTipoPaquete);
      switch (this.intTipoPaquete){
        case "1":
        this.arrayAux.push(new EventoModelo({
          _id:"1",
          strTipo:"CONCIERTOS",
          strTitulo:"PEPE AGUILAR • JARIPEO SIN FRONTERAS",
          strDescripcion:"Pepe Aguilar cantando junto a sus hijos.",
          strResenia:"Pepe Aguilar y Familia junto con Christian Nodal recuperan la tradición del Jaripeo "+
          "La historia continúa y se reinventa. Tras una exitosa carrera, acreedor de nueve premios Grammy, "+
          "los reconocimientos más importantes en la industria musical y sin duda una de las mejores voces de "+
          "habla hispana Pepe Aguilar toma la iniciativa acompañado de la 3ra generación de los Aguilar y regresa a los ruedos.",
          strImagenPrincipal:"../../assets/img/pepe.jpg",
          dteFecha: new Date(2018,4,28),
          strMunicipio:"Aguascalientes",
          strUbicacion:"Plaza de Toros Monumental",
          dteHoraInicio: new Date(),
          dteHoraFin: new Date(),
          nmbCostoAdulto:0.0,
          nmbCostoMenor:0.0
        }));
        this.arrayAux.push(new EventoModelo({
          _id:"2",
          strTipo:"CONCIERTOS",
          strTitulo:"ALEJANDRO FERNANDEZ • PALENQUE DE LA FERIA",
          strDescripcion:"Una vez más se presenta en Aguascalientes el potrillo.",
          strResenia:"Alguna reseña",
          strImagenPrincipal:"../../assets/img/alejandro.jpg",
          dteFecha: new Date(),
          strMunicipio:"Aguascalientes",
          strUbicacion:"Palenque de la feria",
          dteHoraInicio: new Date(),
          dteHoraFin: new Date(),
          nmbCostoAdulto:0.0,
          nmbCostoMenor:0.0
        }));
        this.itinerario=new ItinerarioModelo({
          _id:"1",
          strTitulo:"AVENTURA EN CALVILLO",
          strDescripcion:"El increible pueblo mágico de Calvillo, en 1 solo día",
          strImagenPrincipal:"assets/img/7.jpg",
          nmbCostoAproximado: 400,
          nmbTiempoAproximado:1,
          arrayEventos:this.arrayAux});
        break;

        case "2":
        this.arrayAux.push(new EventoModelo({
          _id:"1",
          strTipo:"CONCIERTOS",
          strTitulo:"PEPE AGUILAR • JARIPEO SIN FRONTERAS",
          strDescripcion:"Pepe Aguilar cantando junto a sus hijos.",
          strResenia:"Pepe Aguilar y Familia junto con Christian Nodal recuperan la tradición del Jaripeo "+
          "La historia continúa y se reinventa. Tras una exitosa carrera, acreedor de nueve premios Grammy, "+
          "los reconocimientos más importantes en la industria musical y sin duda una de las mejores voces de "+
          "habla hispana Pepe Aguilar toma la iniciativa acompañado de la 3ra generación de los Aguilar y regresa a los ruedos.",
          strImagenPrincipal:"../../assets/img/pepe.jpg",
          dteFecha: new Date(2018,4,28),
          strMunicipio:"Aguascalientes",
          strUbicacion:"Plaza de Toros Monumental",
          dteHoraInicio: new Date(),
          dteHoraFin: new Date(),
          nmbCostoAdulto:0.0,
          nmbCostoMenor:0.0
        }));
        this.arrayAux.push(new EventoModelo({
          _id:"2",
          strTipo:"CONCIERTOS",
          strTitulo:"ALEJANDRO FERNANDEZ • PALENQUE DE LA FERIA",
          strDescripcion:"Una vez más se presenta en Aguascalientes el potrillo.",
          strResenia:"Alguna reseña",
          strImagenPrincipal:"../../assets/img/alejandro.jpg",
          dteFecha: new Date(),
          strMunicipio:"Aguascalientes",
          strUbicacion:"Palenque de la feria",
          dteHoraInicio: new Date(),
          dteHoraFin: new Date(),
          nmbCostoAdulto:0.0,
          nmbCostoMenor:0.0
        }));
        this.itinerario=new ItinerarioModelo({
          _id:"2",
          strTitulo:"CULTURA EN AGUASCALIENTES",
          strDescripcion:"Todos los museos de Aguascalientes en tu próxima visita",
          strImagenPrincipal:"assets/img/museo.jpg",
          nmbCostoAproximado: 500,
          nmbTiempoAproximado:4,
          arrayEventos:null
        });
        break;
      }
    }

     
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = () => {
      this.tts.stop();
      this.navCtrl.pop();
      }
  }

  ngOnInit(){
    this.Speack();
  }
  async Speack(): Promise<any> {
    try {
      await this.tts.speak({text:"Bienvenido a la experiencia aventourags, si ya estas registrado, por favor, ingresa,"+
      "de lo contrario, si deseas obtener una cuenta, presiona la opción de registro. Para ver el contenido de la aplicación"+
      "sin registrarte, puedes omitir este paso en el botón color marrón."
      ,locale:"es-MX"});
      console.log("Se reprodujo exitosamente");
    } catch (error) {
      console.log(error);
    }
  }

  verDetalles(id){
    console.log("Evento "+id);
    this.navCtrl.push(InfoEventoPage,{_id:id});
  }

}
