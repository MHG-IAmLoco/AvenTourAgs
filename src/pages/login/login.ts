import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { RegistroPage } from '../registro/registro';
import { ApiService } from '../../general/conexionesApi';
import { UsuarioModelo } from '../../modelos/usuario.model';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit{
  modeloUsuario:UsuarioModelo;
  usr1:string="alfrecastillo212@gmail.com";
  pwd1:string="Acastillo_29";
  strUsuario:string;
  strPwd:string;
  state: number;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private tts: TextToSpeech,
    private alertCtrl: AlertController,
    private conexionesApi: ApiService,
    public loadingCtrl: LoadingController) {
  }


  ngOnInit(){
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.Speack();
  }
  
  irHome(){
    this.tts.stop();
    this.navCtrl.push(HomePage, {
      type: this.state = 1,
    });
  }

  ingresar(){
    //if(this.usr1==this.strUsuario && this.pwd1==this.strPwd)
    this.comprobarCredenciales();
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

  comprobarCredenciales(){
      this.conexionesApi.getLogIn(this.strUsuario,this.strPwd)
      .then((data) => {
        console.log(JSON.stringify(data,null,2));
        if(data["intStatus"]==1){
          this.modeloUsuario = new UsuarioModelo(data["jsnAnswer"]);
          let alert = this.alertCtrl.create({
            title: 'BIENVENIDO '+ this.modeloUsuario.strNombre.toUpperCase(),
            subTitle: 'Que disfrutes de la experiencia AvenTourAgs!',
            buttons: ['OK']
          });
          alert.present();
          this.tts.stop();
          this.navCtrl.setRoot(HomePage,{
            type: this.state = 1,
          })
        }else{
          let alert = this.alertCtrl.create({
            title: 'ERROR AL INGRESAR',
            subTitle: 'Credenciales incorrectas!',
            buttons: ['OK']
          });
          alert.present();
          this.tts.stop();
        }
      });
      
    }
  

}
