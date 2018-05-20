import { Component, OnInit } from '@angular/core';
import { MapaPage } from './../mapa/mapa';

import { NavController, LoadingController } from 'ionic-angular';
import { GaleriaPage } from '../galeria/galeria';
import { MenuGalPage } from '../menu-gal/menu-gal';
import { ItinerariosPage } from '../itinerarios/itinerarios';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { MenuTicketsPage } from '../menu-tickets/menu-tickets';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {


  constructor(private tts: TextToSpeech, public navCtrl: NavController, public loadingCtrl:LoadingController) {
  }

  ngOnInit() {
    this.Speack();
  }

  IrMenGaleria() {
    this.tts.stop();
    this.navCtrl.push(MenuGalPage);
  }

  fnBindItinerariosPage() {
    this.tts.stop();
    this.navCtrl.push(ItinerariosPage);
  }

  fnBindMapaPage() {
    this.tts.stop();
    this.navCtrl.push(MapaPage);
  }

  fnBindTicketsPage(){
    this.tts.stop();
    this.navCtrl.push(MenuTicketsPage);
  }

  async Speack(): Promise<any> {
    try {
      await this.tts.speak({text:
      "Presiona la opción, mapa, para visualizar la ubicación de los lugares más emblemáticos en Aguascalientes."+
      "Presiona la opción, tickets, para conocer los museos, tours,obras de teatro y próximos eventos en Aguascalientes y poder adquirir tus entradas."+
      "Presiona la opción, galería, para conocer y aventurarte virtualmente en los paisajes que tiene Aguascalientes para ofrecer."+
      "Presiona la opción, itinerarios, para ver y planificar las actividades de tu próxima visita a Aguascalientes."
      ,locale:"es-MX"});
    } catch (error) {
      console.log(error);
    }
  }
}
