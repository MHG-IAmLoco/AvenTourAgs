import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';
import { GaleriaPage } from '../galeria/galeria';
import { GaleriaModelo } from '../../modelos/galeria.model';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { ViewChild } from '@angular/core';

/**
 * Generated class for the MenuGalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

@Component({
  selector: 'page-menu-gal',
  templateUrl: 'menu-gal.html',
})
export class MenuGalPage {
  @ViewChild(Navbar) navBar: Navbar;
  arrayGaleria:Array<GaleriaModelo> = new Array<GaleriaModelo>();
  constructor(public navCtrl: NavController, public navParams: NavParams, private tts:TextToSpeech) {
    
    this.arrayGaleria.push(new GaleriaModelo({
      _id:"1",
      strTitulo:"Aguascalientes",
      strDescripcion:"Capital",
      strImagenPrincipal:"assets/img/Ags.jpg",
      arrayImagenes:[]
    }));

    this.arrayGaleria.push(new GaleriaModelo({
      _id:"2",
      strTitulo:"Calvillo",
      strDescripcion:"Pueblo Mágico",
      strImagenPrincipal:"assets/img/Calv.jpg",
      arrayImagenes:[]
    }));
  }

  IrGaleria(strId) {
    console.log("Id seleccionado"+strId);
    this.tts.stop();
    this.navCtrl.push(GaleriaPage);
  }

  ngOnInit(){
    this.Speack();
  }
  async Speack(): Promise<any> {
    try {
      await this.tts.speak({text:"Aguascalientes cuenta con una capital y tres pueblos mágicos, presiona la imágen que prefieras para conocer más de ellos."
      ,locale:"es-MX"});
      console.log("Se reprodujo exitosamente");
    } catch (error) {
      console.log(error);
    }
  }
  ionViewDidLoad(){
    this.navBar.backButtonClick = () => {
      this.tts.stop();
      this.navCtrl.pop();
      }
  }

}
