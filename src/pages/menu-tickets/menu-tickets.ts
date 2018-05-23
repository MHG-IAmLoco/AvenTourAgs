import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';
import { GaleriaModelo } from '../../modelos/galeria.model';
import { ListaTicketsPage } from '../lista-tickets/lista-tickets';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { ViewChild } from '@angular/core';
import { ListaActividadPage } from '../lista-actividad/lista-actividad';

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
  @ViewChild(Navbar) navBar: Navbar;
  arrayGaleria:Array<GaleriaModelo> = new Array<GaleriaModelo>();
  constructor(public navCtrl: NavController, public navParams: NavParams, private tts:TextToSpeech) {
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

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.Speack();
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = () => {
      this.tts.stop();
      this.navCtrl.pop();
      }
  }

  IrInfo(tipoEvt) {
    if(tipoEvt=="MUSEO"||tipoEvt=="TOURS"){
      this.navCtrl.push(ListaActividadPage,{TipoEvento:tipoEvt});
    }else{
      this.navCtrl.push(ListaTicketsPage,{TipoEvento:tipoEvt});
    }
    this.tts.stop();
  }

  async Speack(): Promise<any> {
    try {
      await this.tts.speak({text:"En el estado de Aguascalientes podrás disfrutar de eventos, exposiciones y recorridos turísticos,"+
      "Para conocer más de ellos, porfavor elige una categoría, desliza hacia arriba para verlas todas."
      ,locale:"es-MX"});
      console.log("Se reprodujo exitosamente");
    } catch (error) {
      console.log(error);
    }
  }

}
