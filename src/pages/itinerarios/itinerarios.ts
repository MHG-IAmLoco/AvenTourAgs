import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';
import { InfoPaquetePage } from '../info-paquete/info-paquete'
import { ItinerarioModelo } from '../../modelos/itinerario.model';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { ViewChild } from '@angular/core';
import { ConfigGeneral } from '../../general/configGeneral';
import { ApiService } from '../../general/conexionesApi';

/**
 * Generated class for the ItinerariosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-itinerarios',
  templateUrl: 'itinerarios.html',
})
export class ItinerariosPage {
  @ViewChild(Navbar) navBar: Navbar;
  arrayItinerario:Array<ItinerarioModelo>= new Array<ItinerarioModelo>();
  selectOptions;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private tts:TextToSpeech, 
    public configGeneral:ConfigGeneral,
    public conexionesApis:ApiService
  ) {
    this.selectOptions = {
      title: 'Margen de presupuesto',
      subTitle: 'Selecciona tu presupuesto disponible',
      mode: 'md'
    };

    this.getItineratios(0);
    /*this.arrayItinerario.push(new ItinerarioModelo({
      _id:"1",
      strTitulo:"AVENTURA EN CALVILLO",
      strDescripcion:"El increible pueblo mágico de Calvillo, en 1 solo día",
      strImagenPrincipal:"assets/img/7.jpg",
      nmbCostoAproximado: 400,
      nmbTiempoAproximado:1,
      arrayEventos:null
    }));

    this.arrayItinerario.push(new ItinerarioModelo({
      _id:"2",
      strTitulo:"CULTURA EN AGUASCALIENTES",
      strDescripcion:"Todos los museos de Aguascalientes en tu próxima visita",
      strImagenPrincipal:"assets/img/museo.jpg",
      nmbCostoAproximado: 500,
      nmbTiempoAproximado:4,
      arrayEventos:null
    }));*/
  }

  ngOnInit() {
    this.Speack();
    
  }

  ionViewDidLoad(){
    this.navBar.backButtonClick = () => {
          this.tts.stop();
          this.navCtrl.pop();
          }
  }

  fnBindConocerPaquete(idPaquete){
    
    this.navCtrl.push(InfoPaquetePage,{idPaquete:idPaquete});
    this.tts.stop();
  }

  async Speack(): Promise<any> {
    try {
      await this.tts.speak({text:"Aquí te presentamos diversas actividades que puedes realizar en el estado de Aguascalientes "+
      "de acuerdo a tu presupuesto y el tiempo con el que dispongas"
      ,locale:"es-MX"});
      console.log("Se reprodujo exitosamente");
    } catch (error) {
      console.log(error);
    }
  }

  showVal(presupuesto){
    this.arrayItinerario=new Array<ItinerarioModelo>();
    if(presupuesto == 501){
      presupuesto = 10000;
    }
    this.getItineratios(presupuesto);
    /*if(presupuesto==400){
      this.arrayItinerario.push(new ItinerarioModelo({
        _id:"1",
        strTitulo:"AVENTURA EN CALVILLO",
        strDescripcion:"El increible pueblo mágico de Calvillo, en 1 solo día",
        strImagenPrincipal:"assets/img/7.jpg",
        nmbCostoAproximado: 400,
        nmbTiempoAproximado:1,
        arrayEventos:null
      }));

    }else if(presupuesto==500){
      this.arrayItinerario.push(new ItinerarioModelo({
        _id:"2",
        strTitulo:"CULTURA EN AGUASCALIENTES",
        strDescripcion:"Todos los museos de Aguascalientes en tu próxima visita",
        strImagenPrincipal:"assets/img/museo.jpg",
        nmbCostoAproximado: 500,
        nmbTiempoAproximado:4,
        arrayEventos:null
      }));

    }*/
  }

  getItineratios(intPresupuesto){
    this.conexionesApis.getItinerarios(intPresupuesto)
    .then((data:ItinerarioModelo[]) => {
      this.arrayItinerario = data;
    });
  }

}
