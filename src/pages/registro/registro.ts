import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  logForm: FormGroup;
  strNombre:string;
  strApellido:string;
  strCorreo:string;
  strPwd:string;
  strPwd2:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl:AlertController,public formBuilder: FormBuilder) {
    
  }


  obtenerDatos(){
    console.log("Imprime nombre "+this.strNombre);
    console.log("Imprime apellido "+this.strApellido);
    console.log("Imprime correo "+this.strCorreo);
    console.log("Imprime pwd "+this.strPwd);
    console.log("Imprime pwd2 "+this.strPwd2);
    if(this.strNombre==undefined||this.strApellido==undefined||this.strCorreo==undefined||this.strPwd==undefined||this.strPwd2==undefined){
      let alert = this.alertCtrl.create({
        title: 'Aún no terminas',
        subTitle: 'Asegurate de introducir todos los campos',
        buttons: ['Entendido']
      });
      alert.present();
    }else if(this.strPwd != this.strPwd2){
      let alert = this.alertCtrl.create({
        title: 'Contraseña Incorrecta',
        subTitle: 'Asegurate de que las contraseñas introducidas sean iguales',
        buttons: ['Entendido']
      });
      alert.present();
      this.strPwd='';
      this.strPwd2='';
    }else if (!(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(this.strCorreo))){
      let alert = this.alertCtrl.create({
        title: 'Correo Invalido',
        subTitle: 'Asegurate de ingresar una dirección de correo valida',
        buttons: ['Entendido']
      });
      alert.present();
    }
  }

}
