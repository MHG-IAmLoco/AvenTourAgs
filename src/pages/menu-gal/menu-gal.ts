import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GaleriaPage } from '../galeria/galeria';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  IrGaleria() {
    this.navCtrl.push(GaleriaPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuGalPage');
  }

}
