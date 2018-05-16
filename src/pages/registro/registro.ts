import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  strNombre:string;
  strApellido:string;
  strCorreo:string;
  strPwd:string;
  strPwd2:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  obtenerDatos(){
    console.log("Imprime nombre "+this.strNombre);
    console.log("Imprime apellido "+this.strApellido);
    console.log("Imprime correo "+this.strCorreo);
    console.log("Imprime pwd "+this.strPwd);
    console.log("Imprime pwd2 "+this.strPwd2);
  }

}
