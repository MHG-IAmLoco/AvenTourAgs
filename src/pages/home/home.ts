<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
=======
import { MapaPage } from './../mapa/mapa';
import { Component } from '@angular/core';
>>>>>>> 1c204a2d7c71aac4ba6d88446ccaff509221dc0d
import { NavController } from 'ionic-angular';
import { GaleriaPage } from '../galeria/galeria';
import { MenuGalPage } from '../menu-gal/menu-gal';
import { ItinerariosPage } from '../itinerarios/itinerarios';
import { TextToSpeech } from '@ionic-native/text-to-speech';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{


  constructor(private tts: TextToSpeech,public navCtrl: NavController) {
   
  }
  async ngOnInit():Promise<any>{
    try {
      await this.tts.speak("Esta es una prueba");
      console.log("Se reprodujo exitosamente");
    } catch (error) {
      console.log(error);
    }
  }

  IrMenGaleria() {
    this.navCtrl.push(MenuGalPage);
  }

  fnBindItinerariosPage(){
    console.log("entrando a itinerario");
    this.navCtrl.push(ItinerariosPage);
  }

<<<<<<< HEAD
  async repAudio():Promise<any>{
    try {
      await this.tts.speak("Esta es una prueba");
      console.log("Se reprodujo exitosamente");
    } catch (error) {
      console.log(error);
    }
=======
  fnBindMapaPage(){
    this.navCtrl.push(MapaPage);
>>>>>>> 1c204a2d7c71aac4ba6d88446ccaff509221dc0d
  }

}
