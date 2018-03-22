import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GaleriaPage } from '../galeria/galeria';
import { MenuGalPage } from '../menu-gal/menu-gal';
import { ItinerariosPage } from '../itinerarios/itinerarios';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  IrMenGaleria() {
    this.navCtrl.push(MenuGalPage);
  }

  fnBindItinerariosPage(){
    this.navCtrl.push(ItinerariosPage);
  }

}
