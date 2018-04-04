import { Component, OnInit } from '@angular/core';
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

  async repAudio():Promise<any>{
    try {
      await this.tts.speak("Esta es una prueba");
      console.log("Se reprodujo exitosamente");
    } catch (error) {
      console.log(error);
    }
  }

}
