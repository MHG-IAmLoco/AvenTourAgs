import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import {TextToSpeech} from '@ionic-native/text-to-speech';
import {HttpClientModule} from '@angular/common/http';
import {ApiService} from '../general/conexionesApi';
import {ConfigGeneral} from '../general/configGeneral';
import { Geolocation } from '@ionic-native/geolocation';

import { ItinerariosPage } from '../pages/itinerarios/itinerarios';
import { InfoPaquetePage } from '../pages/info-paquete/info-paquete';
import { MenuTicketsPageModule } from '../pages/menu-tickets/menu-tickets.module';

import { LoginPageModule } from '../pages/login/login.module';
import { RegistroPageModule } from '../pages/registro/registro.module';
import { GaleriaPageModule } from '../pages/galeria/galeria.module';
import { MenuGalPageModule } from '../pages/menu-gal/menu-gal.module';
import { MapaPageModule } from '../pages/mapa/mapa.module';
import { QrPageModule } from '../pages/qr/qr.module'
import { ListaTicketsPageModule } from '../pages/lista-tickets/lista-tickets.module';
import { InfoEventoPageModule } from '../pages/info-evento/info-evento.module';
import { SeleccionPageModule } from '../pages/seleccion/seleccion.module';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { DatePicker } from '@ionic-native/date-picker'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PagarPage } from '../pages/pagar/pagar';
import { PagarPageModule } from '../pages/pagar/pagar.module';
import { PayPal } from '@ionic-native/paypal';
import { ListaActividadPageModule } from '../pages/lista-actividad/lista-actividad.module';
import { InfoActividadPageModule } from '../pages/info-actividad/info-actividad.module';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
<<<<<<< HEAD
=======
import { PerfilPageModule } from '../pages/perfil/perfil.module';
>>>>>>> 22c5dc3a0193963bd7ab2207a72b7f5513aba179
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ItinerariosPage,
    InfoPaquetePage
  ],
  imports: [
    IonicImageViewerModule,
    LoginPageModule,
    MenuGalPageModule,
    GaleriaPageModule,
    BrowserModule,
    MapaPageModule,
    QrPageModule,
    HttpClientModule,
    MenuTicketsPageModule,
    ListaTicketsPageModule,
    RegistroPageModule,
    NgxQRCodeModule,
    IonicModule.forRoot(MyApp),
    InfoEventoPageModule,
    SeleccionPageModule,
    PagarPageModule,
    ListaActividadPageModule,
    InfoActividadPageModule, 
    PerfilPageModule
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
    Geolocation,
    ApiService,
    ConfigGeneral,
    PayPal,
    BarcodeScanner,
    DatePicker,
    AndroidPermissions,
    ScreenOrientation,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
