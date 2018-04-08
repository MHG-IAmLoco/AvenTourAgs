import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EventoModelo} from '../../modelos/evento.model';

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
  arrayEvento:Array<EventoModelo> = new Array<EventoModelo>();
  TipoEvento:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
          dteHora: new Date(),
          strCosto:"Varios precios."
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
          dteHora: new Date(),
          strCosto:"Varios precios."
        }));
        break;
      case "DEPORTES":
        this.arrayEvento.push(new EventoModelo({
          _id:"1",
          strTipo:"DEPORTES",
          strTitulo:"ESTE ES UN DEPORTE",
          strResenia:"Alguna reseña",
          strDescripcion:"Pepe Aguilar cantando junto a sus hijos.",
          strImagenPrincipal:"assets/img/pepe.jpg",
          dteFecha: new Date(),
          strMunicipio:"Aguascalientes",
          strUbicacion:"Plaza de Toros Monumental",
          dteHora: new Date(),
          strCosto:"Varios precios."
        }));

        this.arrayEvento.push(new EventoModelo({
          _id:"2",
          strTipo:"DEPORTES",
          strTitulo:"ESTE ES UN DEPORTE",
          strDescripcion:"Una vez más se presenta en Aguascalientes el potrillo.",
          strResenia:"Alguna reseña",
          strImagenPrincipal:"assets/img/alejandro.jpg",
          dteFecha: new Date(),
          strMunicipio:"Aguascalientes",
          strUbicacion:"Palenque de la feria",
          dteHora: new Date(),
          strCosto:"Varios precios."
        }));
        break;
  }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaTicketsPage');
  }

}
