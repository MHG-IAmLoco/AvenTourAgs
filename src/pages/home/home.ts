import { Component, OnInit, ViewChild } from '@angular/core';
import { MapaPage } from './../mapa/mapa';

import { NavController, LoadingController, Platform, ActionSheetController, MenuController, Nav, NavParams } from 'ionic-angular';
import { GaleriaPage } from '../galeria/galeria';
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
  pages: Array<{ title: string, component: any }>;
  state = this.navParams.get("type");
  activeMenu: string;

  @ViewChild(Nav) nav: Nav;

  constructor(public navParams: NavParams, public statusBar: StatusBar, public splashScreen: SplashScreen, public menuCtrl: MenuController, private tts: TextToSpeech, public navCtrl: NavController, public platform: Platform, public actionsheetCtrl: ActionSheetController, public loadingCtrl: LoadingController) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: HomePage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      console.log(this.state);
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

  openPage(page) {
    this.nav.setRoot(page.component);
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
          "Presiona la opción, mapa, para visualizar la ubicación de los lugares más emblemáticos en Aguascalientes." +
          "Presiona la opción, tickets, para conocer los museos, tours,obras de teatro y próximos eventos en Aguascalientes y poder adquirir tus entradas." +
          "Presiona la opción, galería, para conocer y aventurarte virtualmente en los paisajes que tiene Aguascalientes para ofrecer." +
          "Presiona la opción, itinerarios, para ver y planificar las actividades de tu próxima visita a Aguascalientes."
        , locale: "es-MX"
      });
    } catch (error) {
      console.log(error);
    }
  }
}
