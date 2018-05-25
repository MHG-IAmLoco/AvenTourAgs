import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import {LoginPage} from '../pages/login/login';
import { RegistroPage } from '../pages/registro/registro';
import {QrPage} from '../pages/qr/qr';
import { PerfilPage } from '../pages/perfil/perfil';
import { InfoPaquetePage } from '../pages/info-paquete/info-paquete';
import { ComprobarPage } from '../pages/comprobar/comprobar';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = InfoPaquetePage;
  @ViewChild(Nav) navCtrl;

  constructor(private screenOrientation: ScreenOrientation, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public menuCtrl: MenuController) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
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

  fnBindPerfilPage() {
    this.navCtrl.push(PerfilPage);
    this.menuCtrl.close();
  }

  fnBindQrPage() {
    this.navCtrl.push(QrPage);
    this.menuCtrl.close();
  }

  closeMenu() {
    this.menuCtrl.close();
  }

}