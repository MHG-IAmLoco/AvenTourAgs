import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { TextToSpeech } from '@ionic-native/text-to-speech';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private tts: TextToSpeech) {
  }

  ionViewDidLoad() {
    
  }

  ngOnInit(){
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.Speack();
  }

  irHome(){
    this.navCtrl.push(HomePage);
  }

  async Speack(): Promise<any> {
    try {
      await this.tts.speak({text:"Bienvenido a la experiencia aventourags, si ya estas registrado, por favor, ingresa,"+
      "de lo contrario, si deseas obtener una cuenta, presiona la opción ingresar. Para ver el contenido de la aplicación"+
      "sin registrarte, puedes omitir este paso en el botón color marrón."
      ,locale:"es-MX"});
      console.log("Se reprodujo exitosamente");
    } catch (error) {
      console.log(error);
    }
  }

}
