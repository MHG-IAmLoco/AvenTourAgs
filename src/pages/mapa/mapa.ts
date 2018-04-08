import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MarkerManager,AgmMap } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services/google-maps-api-wrapper';
import { GoogleMap, LatLng } from '@agm/core/services/google-maps-types';clearImmediate

@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {

  public lat: number = 21.913867;
  public lng: number = -102.316009;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapaPage');
  }

}
