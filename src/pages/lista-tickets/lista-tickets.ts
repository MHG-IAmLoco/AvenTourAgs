import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';
import {EventoModelo} from '../../modelos/evento.model';
import { InfoEventoPage } from '../info-evento/info-evento';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { ViewChild } from '@angular/core';

/**
 * Generated class for the ListaTicketsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-tickets',
  templateUrl: 'lista-tickets.html',
})
export class ListaTicketsPage {
  @ViewChild(Navbar) navBar: Navbar;
  arrayEvento:Array<EventoModelo> = new Array<EventoModelo>();
  TipoEvento:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private tts:TextToSpeech) {
    if(this.navParams.get('TipoEvento')){
      this.TipoEvento = this.navParams.get('TipoEvento');
    }
    switch (this.TipoEvento){
      case "CONCIERTOS":
        this.arrayEvento.push(new EventoModelo({
          _id:"1",
          strTipo:"CONCIERTOS",
          strTitulo:"PEPE AGUILAR • JARIPEO SIN FRONTERAS",
          strDescripcion:"Pepe Aguilar cantando junto a sus hijos.",
          strResenia:"Alguna reseña",
          strImagenPrincipal:"assets/img/pepe.jpg",
          dteFecha: new Date(),
          strMunicipio:"Aguascalientes",
          strUbicacion:"Plaza de Toros Monumental",
          dteHoraInicio: new Date(),
          dteHoraFin: new Date(),
          nmbCostoAdulto:0.0,
          nmbCostoMenor:0.0
        }));

        this.arrayEvento.push(new EventoModelo({
          _id:"2",
          strTipo:"CONCIERTOS",
          strTitulo:"ALEJANDRO FERNANDEZ • PALENQUE DE LA FERIA",
          strDescripcion:"Una vez más se presenta en Aguascalientes el potrillo.",
          strResenia:"Alguna reseña",
          strImagenPrincipal:"assets/img/alejandro.jpg",
          dteFecha: new Date(),
          strMunicipio:"Aguascalientes",
          strUbicacion:"Palenque de la feria",
          dteHoraInicio: new Date(),
          dteHoraFin: new Date(),
          nmbCostoAdulto:0.0,
          nmbCostoMenor:0.0
        }));
        break;
      case "DEPORTES":
        this.arrayEvento.push(new EventoModelo({
          _id:"3",
          strTipo:"DEPORTES",
          strTitulo:"ESTE ES UN DEPORTE",
          strResenia:"Alguna reseña",
          strDescripcion:"Pepe Aguilar cantando junto a sus hijos.",
          strImagenPrincipal:"assets/img/pepe.jpg",
          dteFecha: new Date(),
          strMunicipio:"Aguascalientes",
          strUbicacion:"Plaza de Toros Monumental",
          dteHoraInicio: new Date(),
          dteHoraFin: new Date(),
          nmbCostoAdulto:0.0,
          nmbCostoMenor:0.0
        }));

        this.arrayEvento.push(new EventoModelo({
          _id:"4",
          strTipo:"DEPORTES",
          strTitulo:"ESTE ES UN DEPORTE",
          strDescripcion:"Una vez más se presenta en Aguascalientes el potrillo.",
          strResenia:"Alguna reseña",
          strImagenPrincipal:"assets/img/alejandro.jpg",
          dteFecha: new Date(),
          strMunicipio:"Aguascalientes",
          strUbicacion:"Palenque de la feria",
          dteHoraInicio: new Date(),
          dteHoraFin: new Date(),
          nmbCostoAdulto:0.0,
          nmbCostoMenor:0.0
        }));
        break;
  }
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.Speack();
  }

  ionViewDidLoad(){
    this.navBar.backButtonClick = () => {
          this.tts.stop();
          this.navCtrl.pop();
          }
    }

  verDetalles(id){
    console.log("Evento "+id);
    this.navCtrl.push(InfoEventoPage,{_id:id});
  }

  async Speack(): Promise<any> {
    try {
      await this.tts.speak({text:"Aquí puedes observar una previsualización de los próximos eventos en Aguascalientes, puedes navegar "+
      "deslizando la pantalla hacia arriba y conocer más detalles sobre un evento de tu interés, presionando el "+
      "botón ver que se encuentra enseguida de la descripción."
      ,locale:"es-MX"});
      console.log("Se reprodujo exitosamente");
    } catch (error) {
      console.log(error);
    }
  }

}
