import { Component, OnInit } from '@angular/core';
import { MapaPage } from './../mapa/mapa';

import { NavController } from 'ionic-angular';
import { MenuGalPage } from '../menu-gal/menu-gal';
import { ItinerariosPage } from '../itinerarios/itinerarios';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { MenuTicketsPage } from '../menu-tickets/menu-tickets';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {


  constructor(private tts: TextToSpeech, public navCtrl: NavController) {
  }

  ngOnInit() {
    this.Speack();
  }

  IrMenGaleria() {
    this.navCtrl.push(MenuGalPage);
  }

  fnBindItinerariosPage() {
    console.log("entrando a itinerario");
    this.navCtrl.push(ItinerariosPage);
  }

  fnBindMapaPage() {
    this.navCtrl.push(MapaPage);
  }

  fnBindTicketsPage(){
    this.navCtrl.push(MenuTicketsPage);
  }

  async Speack(): Promise<any> {
    try {
      await this.tts.speak({text:"Presiona la opción, mapa, para visualizar la ubicación de los lugares más emblematicos en Aguascalientes."+
      "Presiona la opción, tickets, para conocer los museos, tours,obras de teatro y próximos eventos en Aguascalientes y poder adquirir tus entradas."+
      "Presiona la opción, galería, para conocer y aventurarte virtualmente en los paisajes que tiene Aguascalientes para ofrecer."+
      "Presiona la opción, itinerarios, para ver y planificar las actividades de tu próxima visita a Aguascalientes."
      ,locale:"es-MX"});
      console.log("Se reprodujo exitosamente");
    } catch (error) {
      console.log(error);
    }
  }
}
