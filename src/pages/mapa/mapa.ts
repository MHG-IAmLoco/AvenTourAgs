import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ActionSheetController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { TextToSpeech } from '@ionic-native/text-to-speech';

@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {

  public lat: number = 21.911185;
  public lng: number = -102.31538999999998;
  public zoom: number = 16;
  public dir = undefined;

  constructor(private tts: TextToSpeech,private androidPermissions: AndroidPermissions, public navCtrl: NavController, public navParams: NavParams, private _geoLoc: Geolocation,
    public platform: Platform, public actionsheetCtrl: ActionSheetController) {
    this.platform.ready().then(() => {
      this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.GEOLOCATION]);
      this.getLoc();
    });
  }

  ngOnInit() {
    this.Speack();
  }

  async getLoc(): Promise<any> {
      this._geoLoc.getCurrentPosition().then(position => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      console.log(this.lat);
      console.log(this.lng);
    }, error => {
      console.log('Error: ', error);
    });
  }

  openMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Destino',
      buttons: [
        {
          text: 'Aguascalientes',
          handler: () => {
            let actionSheet = this.actionsheetCtrl.create({
              title: 'Aguascalientes',
              buttons: [
                {
                  text: 'Jardín de San Marcos',
                  handler: () => {
                    this.dir = {
                      origin: { lat: this.lat, lng: this.lng },
                      destination: { lat: 21.8794981, lng: -102.3030917 }
                    }
                  }
                },
                {
                  text: 'Plaza de Armas',
                  handler: () => {
                    this.dir = {
                      origin: { lat: this.lat, lng: this.lng },
                      destination: { lat: 21.8806672, lng: -102.2961909 }
                    }
                  }
                },
                {
                  text: 'Cancelar',
                  role: 'cancel', // will always sort to be on the bottom
                  icon: !this.platform.is('ios') ? 'close' : null,
                  handler: () => {
                    console.log('Cancel clicked');
                  }
                }
              ]
            });
            actionSheet.present();
          }
        },
        {
          text: 'Calvillo',
          handler: () => {
            let actionSheet = this.actionsheetCtrl.create({
              title: 'Calvillo',
              buttons: [
                {
                  text: 'Plaza',
                  handler: () => {
                    this.dir = {
                      origin: { lat: this.lat, lng: this.lng },
                      destination: { lat: 21.8463772, lng: -102.7186531 }
                    }
                  }
                },
                {
                  text: 'Presa de Malpaso',
                  handler: () => {
                    this.dir = {
                      origin: { lat: this.lat, lng: this.lng },
                      destination: { lat: 21.8577234, lng: -102.6534021 }
                    }
                  }
                },
                {
                  text: 'Cancelar',
                  role: 'cancel', // will always sort to be on the bottom
                  icon: !this.platform.is('ios') ? 'close' : null,
                  handler: () => {
                    console.log('Cancel clicked');
                  }
                }
              ]
            });
            actionSheet.present();
          }
        },
        {
          text: 'Real de Asientos',
          handler: () => {
            let actionSheet = this.actionsheetCtrl.create({
              title: 'Real de Asientos',
              buttons: [
                {
                  text: 'Plaza Juaréz',
                  handler: () => {
                    this.dir = {
                      origin: { lat: this.lat, lng: this.lng },
                      destination: { lat: 22.2381246, lng: -102.0899569 }
                    }
                  }
                },
                {
                  text: 'Museo del Minero',
                  handler: () => {
                    this.dir = {
                      origin: { lat: this.lat, lng: this.lng },
                      destination: { lat: 22.2390333, lng: -102.0902924 }
                    }
                  }
                },
                {
                  text: 'Cancelar',
                  role: 'cancel', // will always sort to be on the bottom
                  icon: !this.platform.is('ios') ? 'close' : null,
                  handler: () => {
                    console.log('Cancel clicked');
                  }
                }
              ]
            });
            actionSheet.present();
          }
        },
        {
          text: 'San José de Gracia',
          handler: () => {
            let actionSheet = this.actionsheetCtrl.create({
              title: 'San José de Gracia',
              buttons: [
                {
                  text: 'Plaza',
                  handler: () => {
                    this.dir = {
                      origin: { lat: this.lat, lng: this.lng },
                      destination: { lat: 22.1495868, lng: -102.4157716 }
                    }
                  }
                },
                {
                  text: 'Cristo Roto',
                  handler: () => {
                    this.dir = {
                      origin: { lat: this.lat, lng: this.lng },
                      destination: { lat: 22.1503663, lng: -102.4226168 }
                    }
                  }
                },
                {
                  text: 'Cancelar',
                  role: 'cancel', // will always sort to be on the bottom
                  icon: !this.platform.is('ios') ? 'close' : null,
                  handler: () => {
                    console.log('Cancel clicked');
                  }
                }
              ]
            });
            actionSheet.present();
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  async Speack(): Promise<any> {
    try {
      await this.tts.speak({
        text:
          "Presiona el botón verde para elegir un destino"
        , locale: "es-MX"
      });
    } catch (error) {
      console.log(error);
    }
  }

}