import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { RegistroPage } from '../registro/registro';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  usr1:string="alfrecastillo212@gmail.com";
  pwd1:string="Acastillo_29";
  strUsuario:string;
  strPwd:string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private tts: TextToSpeech,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {

  }

  ngOnInit(){
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.Speack();
  }

  irHome(){
    this.tts.stop();
    this.navCtrl.push(HomePage);
  }

  ingresar(){
    
    if(this.usr1==this.strUsuario && this.pwd1==this.strPwd){
      let alert = this.alertCtrl.create({
        title: 'BIENVENIDO ALFREDO',
        subTitle: 'Que disfrutes de la experiencia AvenTourAgs!',
        buttons: ['OK']
      });
      alert.present();
      this.tts.stop();
      this.navCtrl.push(HomePage);
    }
  }

  async Speack(): Promise<any> {
    try {
      await this.tts.speak({text:"Bienvenido a la experiencia aventourags, si ya estas registrado, por favor, ingresa,"+
      "de lo contrario, si deseas obtener una cuenta, presiona la opción de registro. Para ver el contenido de la aplicación"+
      "sin registrarte, puedes omitir este paso en el botón color marrón."
      ,locale:"es-MX"});
      console.log("Se reprodujo exitosamente");
    } catch (error) {
      console.log(error);
    }
  }
  IrRegistro(){
    this.tts.stop();
    this.navCtrl.push(RegistroPage)
  }

}
