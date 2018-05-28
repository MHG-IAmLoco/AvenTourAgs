import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { LoginPage } from '../pages/login/login';
import { RegistroPage } from '../pages/registro/registro';
import { QrPage } from '../pages/qr/qr';
import { ApiService } from '../general/conexionesApi';
import { ConfigGeneral } from '../general/configGeneral';
import { PromocionesPage } from '../pages/promociones/promociones';
import { UsuarioModelo } from '../modelos/usuario.model';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  modeloUsuario: UsuarioModelo;
  rootPage: any = LoginPage;
  @ViewChild(Nav) navCtrl;

  constructor(public configGeneral: ConfigGeneral, public conexionesApi: ApiService, private screenOrientation: ScreenOrientation, platform: Platform, statusBar: StatusBar,
    splashScreen: SplashScreen, public menuCtrl: MenuController, public alertCtrl: AlertController) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    });
  }

  fnBindLoginPage() {
    this.navCtrl.push(LoginPage);
    this.menuCtrl.close();
  }

  fnBindRegistroPage() {
    this.navCtrl.push(RegistroPage);
    this.menuCtrl.close();
  }

  fnCambiarPass() {
    var _id = this.configGeneral.modeloUsuario._id;
    let prompt = this.alertCtrl.create({
      title: 'Contraseña',
      message: "Ingresa tu nueva contraseña",
      inputs: [
        {
          type: 'password',
          name: 'pass',
          placeholder: 'Contraseña'
        },
        {
          type: 'password',
          name: 'cpass',
          placeholder: 'Confirmar Contraseña'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Cambiar',
          handler: data => {
            if (data.pass == data.cpass) {
              this.showConfirm(_id, data.pass);
            } else {
              this.showAlert();
            }
          }
        }
      ]
    });
    prompt.present();
  }

  showConfirm(_id, pass) {
    let confirm = this.alertCtrl.create({
      title: 'Contraseña',
      message: 'Esta seguro de que quiere cambiar su contraseña',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.postPass(_id, pass);
            this.showCambioPass();
          }
        }
      ]
    });
    confirm.present();
  }

  showCambioPass() {
    let confirm = this.alertCtrl.create({
      title: 'Contraseña',
      message: 'Contraseña cambiada correctamente',
      buttons: [
        {
          text: 'Confirmar',
          handler: () => {
          }
        }
      ]
    });
    confirm.present();
  }

  showAlert() {
    let confirm = this.alertCtrl.create({
      title: 'Contraseña',
      message: 'Las contraseñas no coinciden',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
          }
        }
      ]
    });
    confirm.present();
  }

  postPass(strId, strPass) {
    if (strId != undefined) {
      this.conexionesApi.postChangePass(strId, strPass)
        .then((data) => {
          if (data["intStatus"]) {
            if (data["intStatus"] == 1) {
              console.log("Contraseña cambiada");
            } else {
              console.log("Error al intentar cambiar la contraseña 1");
            }
          } else {
            console.log("Error al intentar cambiar la contraseña 2");
          }
        });
    }
  }

  fnBindPromocionesPage() {
    this.comprobarCredenciales();
    this.navCtrl.push(PromocionesPage);
    this.menuCtrl.close();
  }

  fnBindQrPage() {
    this.navCtrl.push(QrPage);
    this.menuCtrl.close();
  }

  closeMenu() {
    this.menuCtrl.close();
  }

  comprobarCredenciales() {
    this.conexionesApi.getLogIn(this.configGeneral.modeloUsuario.strCorreo, this.configGeneral.modeloUsuario.strContraseña)
      .then((data) => {
        console.log(JSON.stringify(data, null, 2));
        if (data["intStatus"] == 1) {
          this.modeloUsuario = new UsuarioModelo(data["jsnAnswer"]);
          this.configGeneral.modeloUsuario = this.modeloUsuario;

        }
      });
  }

}