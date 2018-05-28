import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ApiService } from '../../general/conexionesApi';
import { ConfigGeneral } from '../../general/configGeneral';
import { PromocionModelo } from '../../modelos/promocion.model';
import { HomePage } from '../home/home';
import { UsuarioModelo } from '../../modelos/usuario.model';

/**
 * Generated class for the PromocionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-promociones',
  templateUrl: 'promociones.html',
})
export class PromocionesPage {
  modeloUsuario: UsuarioModelo;
  arrayPromocion: Array<PromocionModelo> = new Array<PromocionModelo>();

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public configGeneral: ConfigGeneral,
    public conexionesApis: ApiService) {
    this.getPromos();
  }

  getPromos() {
    this.conexionesApis.getPromociones()
      .then((data: PromocionModelo[]) => {
        this.arrayPromocion = data;
        console.log(this.arrayPromocion);
      });
  }

  fnCanjear(puntos) {
    var strId = this.configGeneral.modeloUsuario._id;
    if (puntos != undefined) {
      if (this.configGeneral.modeloUsuario.nmbPuntos >= puntos) {
        this.conexionesApis.postCanjear(strId, puntos)
          .then((data) => {
            if (data["intStatus"]) {
              if (data["intStatus"] == 1) {
                this.showCanjeado();
                this.comprobarCredenciales();
              } else {

              }
            } else {

            }
          });
      } else {
        this.showAlert();
      }
    }
  }

  showCanjeado() {
    let confirm = this.alertCtrl.create({
      title: 'Felicidades',
      message: 'Tu promoción ha sido canjeada satisfactoriamente',
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

  showAlert() {
    let confirm = this.alertCtrl.create({
      title: 'Lo sentimos!',
      message: 'No cuentas con suficientes puntos para esa promoción',
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

  comprobarCredenciales() {
    this.conexionesApis.getLogIn(this.configGeneral.modeloUsuario.strCorreo, this.configGeneral.modeloUsuario.strContraseña)
      .then((data) => {
        console.log(JSON.stringify(data, null, 2));
        if (data["intStatus"] == 1) {
          this.modeloUsuario = new UsuarioModelo(data["jsnAnswer"]);
          this.configGeneral.modeloUsuario = this.modeloUsuario;

        }
      });
  }

}
