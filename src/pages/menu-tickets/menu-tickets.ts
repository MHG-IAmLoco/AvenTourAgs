import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GaleriaModelo } from '../../modelos/galeria.model';
import { ListaTicketsPage } from '../lista-tickets/lista-tickets';

/**
 * Generated class for the MenuTicketsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu-tickets',
  templateUrl: 'menu-tickets.html',
})
export class MenuTicketsPage {
  arrayGaleria:Array<GaleriaModelo> = new Array<GaleriaModelo>();
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.arrayGaleria.push(new GaleriaModelo({
      _id:"1",
      strTitulo:"assets/img/conciertoIcono.png",
      strDescripcion:"CONCIERTOS",
      strImagenPrincipal:"assets/img/concierto.jpg",
      arrayImagenes:[]
    }));

    this.arrayGaleria.push(new GaleriaModelo({
      _id:"2",
      strTitulo:"assets/img/deportesIcono.png",
      strDescripcion:"DEPORTES",
      strImagenPrincipal:"assets/img/deportes.jpg",
      arrayImagenes:[]
    }));

    this.arrayGaleria.push(new GaleriaModelo({
      _id:"3",
      strTitulo:"assets/img/museoIcono.png",
      strDescripcion:"MUSEO",
      strImagenPrincipal:"assets/img/museo.jpg",
      arrayImagenes:[]
    }));

    this.arrayGaleria.push(new GaleriaModelo({
      _id:"4",
      strTitulo:"assets/img/teatroIcono.png",
      strDescripcion:"TEATRO",
      strImagenPrincipal:"assets/img/teatro.jpg",
      arrayImagenes:[]
    }));

    this.arrayGaleria.push(new GaleriaModelo({
      _id:"5",
      strTitulo:"assets/img/toursIcono.png",
      strDescripcion:"TOURS",
      strImagenPrincipal:"../../assets/img/tours.jpg",
      arrayImagenes:[]
    }));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuTicketsPage');
  }

  IrInfo(tipoEvt) {
    this.navCtrl.push(ListaTicketsPage,{TipoEvento:tipoEvt});
  }

}
