import { Geolocation } from '@ionic-native/geolocation';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private _geoLoc: Geolocation) {
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


}



