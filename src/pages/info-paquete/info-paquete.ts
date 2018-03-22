import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the InfoPaquetePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info-paquete',
  templateUrl: 'info-paquete.html',
})
export class InfoPaquetePage {

  intTipoPaquete:number = 0;
  strNombrePaquete:string;
  strDescripcionPaquete:string = "";
  arrayActividades:Array<string> = new Array();
  strPrecio:string = "";
  strSource:string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if(this.navParams.get('TipoPaquete')){
      this.intTipoPaquete = this.navParams.get('TipoPaquete');
      console.log(this.intTipoPaquete);
      this.arrayActividades.push("Actividad 1");
      this.arrayActividades.push("Actividad 2");
      this.arrayActividades.push("Actividad 3");
      this.arrayActividades.push("Actividad 4");
      switch (this.intTipoPaquete){
        case 1:
          this.strNombrePaquete = "Paquete Conocedor";
          this.strDescripcionPaquete = "Este itinerario esta pensando para aquellas personas que disfruten conocer lugares simbolicos del estado de Aguascalientes";
          this.strPrecio = "$30.00Mxn";
          this.strSource = "../../assets/imgs/paquete1.jpg";
          break;
          case 2:
          this.strNombrePaquete = "Paquete Aventurero";
          this.strDescripcionPaquete = "Este paquete esta pensado para las personas que les gusta adentrarse en la naturaleza";
          this.strPrecio = "$120.00Mxn";
          this.strSource = "../../assets/imgs/paquete2.jpg";
          break;
          case 3:
          this.strNombrePaquete = "Paquete Artístico";
          this.strDescripcionPaquete = "Si lo tuyo es el arte, este paquete esta pensando para ti.";
          this.strPrecio = "$60.00Mxn";
          this.strSource = "../../assets/imgs/paquete3.jpg";
          break;
      }
    }

     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoPaquetePage');
  }

}
