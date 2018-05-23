import { Component, OnInit, ViewChild } from '@angular/core';
import { MapaPage } from './../mapa/mapa';

import { NavController, LoadingController, Platform, ActionSheetController, MenuController, Nav } from 'ionic-angular';
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

  text: string = '';

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;


  @ViewChild(Nav) nav: Nav;

  constructor(public statusBar: StatusBar, public splashScreen: SplashScreen, public menuCtrl: MenuController, private tts: TextToSpeech, public navCtrl: NavController, public platform: Platform, public actionsheetCtrl: ActionSheetController, public loadingCtrl: LoadingController) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: HomePage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  openRightMenu() {
    this.menuCtrl.open('right');
  }

  openLeftMenu() {
    this.menuCtrl.open('left');
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
