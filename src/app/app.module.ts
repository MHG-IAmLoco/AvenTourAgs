import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import {TextToSpeech} from '@ionic-native/text-to-speech'


import { ItinerariosPage } from '../pages/itinerarios/itinerarios';
import { InfoPaquetePage } from '../pages/info-paquete/info-paquete';

import { GaleriaPageModule } from '../pages/galeria/galeria.module';
import { MenuGalPageModule } from'../pages/menu-gal/menu-gal.module';
import { MapaPageModule } from '../pages/mapa/mapa.module';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ItinerariosPage,
    InfoPaquetePage
  ],
  imports: [
    MenuGalPageModule,
    GaleriaPageModule,
    BrowserModule,
    MapaPageModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ItinerariosPage,
    InfoPaquetePage
  ],
  providers: [
    TextToSpeech,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
