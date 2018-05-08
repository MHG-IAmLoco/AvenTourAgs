import { Geolocation } from '@ionic-native/geolocation';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ActionSheetController } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {

  public lat: number;
  public lng: number;
  public zoom: number = 16;
  public dir = undefined;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _geoLoc: Geolocation,
    public platform: Platform, public actionsheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapaPage');
    this.getLocation().then(res => {
      this.lat = res.coords.latitude
      this.lng = res.coords.longitude
    }).catch(err => {
      console.log(err);
    });
  }

  getLocation() {
    return this._geoLoc.getCurrentPosition();
  }

  getDirection(dest) {
    // this.getLocation().then(res => {
    this.dir = {
      origin: { lat: this.lat, lng: this.lng },
      destination: { lat: 21.8804194, lng: -102.3067378 }
    }
    // }).catch(err => {
    //   console.log(err);
    // });
  }

  openMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Destino',
      cssClass: 'action-sheets-basic-page',
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

}



