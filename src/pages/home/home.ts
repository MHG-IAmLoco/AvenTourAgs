import { Component, OnInit, ViewChild } from '@angular/core';
import { MapaPage } from './../mapa/mapa';

import { NavController, LoadingController, Platform, ActionSheetController, MenuController, Nav, NavParams } from 'ionic-angular';
import { MenuGalPage } from '../menu-gal/menu-gal';
import { ItinerariosPage } from '../itinerarios/itinerarios';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { MenuTicketsPage } from '../menu-tickets/menu-tickets';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  rootPage: any = HomePage;
  state = this.navParams.get("type");
  activeMenu: string;

  @ViewChild(Nav) nav: Nav;

  constructor(public navParams: NavParams, public statusBar: StatusBar, public splashScreen: SplashScreen, public menuCtrl: MenuController, private tts: TextToSpeech, public navCtrl: NavController, public platform: Platform, public actionsheetCtrl: ActionSheetController, public loadingCtrl: LoadingController) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.menuActive();
    });
  }
  
  menuActive() {
    if (this.state == 0) {
      this.activeMenu = 'MenuNoSesion';
      this.menuCtrl.enable(true, 'MenuNoSesion');
      this.menuCtrl.enable(false, 'MenuSesion');
    }
    else {
      this.activeMenu = 'MenuSesion';
      this.menuCtrl.enable(true, 'MenuSesion');
      this.menuCtrl.enable(false, 'MenuNoSesion');
    }
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

  fnBindTicketsPage() {
    this.tts.stop();
    this.navCtrl.push(MenuTicketsPage);
  }

  async Speack(): Promise<any> {
    try {
      await this.tts.speak({
        text:
          "Presiona una de las cuatro actividades para ver el contenido o presiona el botón de la esquina superior izquierda para ver el menú."
        , locale: "es-MX"
      });
    } catch (error) {
      console.log(error);
    }
  }
}
