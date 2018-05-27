import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ApiService } from '../../general/conexionesApi';
import { QrModelo } from '../../modelos/qr.model';
import { ConfigGeneral } from '../../general/configGeneral';

/**
 * Generated class for the QrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qr',
  templateUrl: 'qr.html'
})
export class QrPage {
  qrData = null;
  createdCode = null;
  scannedCode = null;
  color = "white";

  constructor(public configGeneral: ConfigGeneral, public conexionesApi: ApiService, public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner) {
    this.scanCode();
  }

  createCode() {
    this.createdCode = this.qrData;
  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
      this.createdCode = this.scannedCode;
      this.getQr(this.scannedCode);
    }, (err) => {
      console.log('Error: ', err);
    });
  }

  getQr(strTextoQr) {
    if (strTextoQr != undefined) {
      var arrayTextQr = strTextoQr.split('|');
      var modelo: QrModelo = new QrModelo();
      modelo._id = arrayTextQr[0];
      modelo.strNombre = arrayTextQr[1];
      modelo.strUbicacion = arrayTextQr[2];
      modelo.nmbPuntos = arrayTextQr[3];
      if (modelo._id) {
        this.conexionesApi.getInfQr(modelo._id)
          .then((data) => {
            if (data["intStatus"]) {
              if (data["intStatus"] == 1) {
                this.postQr(this.configGeneral.modeloUsuario._id, modelo);
              } else {
                this.color = "#f53d3d";
                this.scannedCode = "Código QR inválido";
              }
            } else {
              this.color = "#f53d3d";
              this.scannedCode = "Código QR inválido";
            }
          });
      } else {
        this.color = "#f53d3d";
        this.scannedCode = "Código QR inválido";
      }
    }
  }

  postQr(strId, modeloQr: QrModelo) {
    if (strId != undefined) {
      this.conexionesApi.postQrCode(strId, modeloQr)
        .then((data) => {
          if (data["intStatus"]) {
            if (data["intStatus"] == 1) {
              this.color = "#32db64";
              this.scannedCode = "Código " + modeloQr.strNombre + " registrado con éxito";
            } else {
              this.color = "#f53d3d";
              this.scannedCode = "El Código QR ya estaba registrado";
            }
          } else {
            this.color = "#f53d3d";
            this.scannedCode = "Código QR inválido";
          }
        });
    }
  }

}
