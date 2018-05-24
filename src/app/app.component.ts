import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, NavController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {LoginPage} from '../pages/login/login';
import { RegistroPage } from '../pages/registro/registro';
import {  SeleccionPage} from '../pages/seleccion/seleccion';
import { InfoEventoPage } from '../pages/info-evento/info-evento';
import { PagarPage } from '../pages/pagar/pagar';
import {QrPage} from '../pages/qr/qr';
import { InfoPaquetePage } from '../pages/info-paquete/info-paquete';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = InfoPaquetePage;
  @ViewChild(Nav) navCtrl;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public menuCtrl: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  
  fnBindLoginPage() {
    this.navCtrl.push(LoginPage);
    this.menuCtrl.close();
  }

  fnBindRegistroPage() {
    this.navCtrl.push(RegistroPage);
    this.menuCtrl.close();
  }

  closeMenu() {
    this.menuCtrl.close();
  }

}

