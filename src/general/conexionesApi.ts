import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigGeneral } from './configGeneral';
import { Observable } from 'rxjs/observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { GaleriaModelo } from '../modelos/galeria.model';
import { QrModelo } from '../modelos/qr.model';
import { UsuarioModelo } from '../modelos/usuario.model';

@Injectable()
export class ApiService {
  constructor(
    private httpClient: HttpClient,
    private configGeneral: ConfigGeneral) { }

  postCanjear(_id, nmbPuntos) {
    var ObjectData = {
      _id: _id,
      nmbPuntos: nmbPuntos
    }
    return new Promise((resolve, reject) => {
      this.httpClient.post(this.configGeneral.strUrlApis + 'canjear', ObjectData)
        .subscribe(data => {
          console.log("respuesta post " + data);
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  public getPromociones() {
    return new Promise(resolve => {
      this.httpClient.get(this.configGeneral.strUrlApis + 'promociones' + "/")
        .subscribe(data => {
          resolve(data['jsnAnswer']);
        }, err => {
          console.log(err);
        });
    });
  }

  public getCategoriasGaleria() {
    return new Promise(resolve => {
      this.httpClient.get(this.configGeneral.strUrlApis + 'categoriasGaleria')
        .subscribe(data => {
          resolve(data['jsnAnswer']);
        }, err => {
          console.log(err);
        });
    });
  }

  getDetalleGaleria(strId) {
    return new Promise(resolve => {
      this.httpClient.get(this.configGeneral.strUrlApis + "detalleGaleria" + "/" + strId)
        .subscribe(data => {
          resolve(data['jsnAnswer']);
        }, err => {
          console.log(err);
        });
    });
  }

  getListaEvento(strTipo) {
    return new Promise(resolve => {
      this.httpClient.get(this.configGeneral.strUrlApis + "listaEvento" + "/" + strTipo)
        .subscribe(data => {
          resolve(data['jsnAnswer']);
        }, err => {
          console.log(err);
        });
    });
  }

  getDetalleEvento(strIdEvento, strTipo) {
    return new Promise(resolve => {
      this.httpClient.get(this.configGeneral.strUrlApis + "detalleEvento" + "/" + strIdEvento + "/" + strTipo)
        .subscribe(data => {
          resolve(data['jsnAnswer']);
        }, err => {
          console.log(err);
        });
    });
  }

  getLogIn(strCorreo, strContraseña) {
    return new Promise(resolve => {
      this.httpClient.get(this.configGeneral.strUrlApis + "login" + "/" + strCorreo + "/" + strContraseña)
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
    });
  }

  getItinerarios(intPresupuesto) {
    return new Promise(resolve => {
      this.httpClient.get(this.configGeneral.strUrlApis + 'itinerarios' + "/" + intPresupuesto)
        .subscribe(data => {
          resolve(data['jsnAnswer']);
        }, err => {
          console.log(err);
        });
    });
  }

  getDetalleForo(idEvento) {
    return new Promise(resolve => {
      this.httpClient.get(this.configGeneral.strUrlApis + 'detalleForo' + "/" + idEvento)
        .subscribe(data => {
          resolve(data['jsnAnswer']['modeloForo']);
        }, err => {
          console.log(err);
        });
    });

  }

  putAsientosForo(idEvento, arrayNumAsientos, strColor) {
    var ObjectData = {
      _id: idEvento,
      arrayNumAsientos: arrayNumAsientos,
      strColor: strColor
    }
    console.log(JSON.stringify(ObjectData));
    return new Promise((resolve, reject) => {
      this.httpClient.post(this.configGeneral.strUrlApis + 'detalleForo', ObjectData)
        .subscribe(data => {
          console.log("respuesta put" + data);
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  putDisponibilidadEvento(idEvento, strFecha, strHora, nmbAsientos) {
    var ObjectData = {
      _id: idEvento,
      strFecha: strFecha,
      strHora: strHora,
      nmbAsientos: nmbAsientos
    }
    console.log("Data put dispo->" + JSON.stringify(ObjectData, null, 2));
    return new Promise((resolve, reject) => {
      this.httpClient.post(this.configGeneral.strUrlApis + 'dispoEvento', ObjectData)
        .subscribe(data => {
          console.log("respuesta put" + data);
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  getArrayHorarios(idEvento, strFecha) {
    return new Promise(resolve => {
      this.httpClient.get(this.configGeneral.strUrlApis + "detalleDisponibilidad" + "/" + idEvento + "/" + strFecha)
        .subscribe(data => {
          resolve(data['jsnAnswer']);
        }, err => {
          console.log(err);
        });
    });
  }

  putDisponibilidadDeportes(idEvento, nmbAsientos) {
    var ObjectData = {
      _id: idEvento,
      nmbAsientos: nmbAsientos
    }
    console.log("Data put dispo->" + JSON.stringify(ObjectData, null, 2));
    return new Promise((resolve, reject) => {
      this.httpClient.post(this.configGeneral.strUrlApis + 'dispoDeportes', ObjectData)
        .subscribe(data => {
          console.log("respuesta put" + data);
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  postQrCode(_id, qrModelo: QrModelo) {
    var ObjectData = {
      _id: _id,
      qrModelo: qrModelo
    }
    return new Promise((resolve, reject) => {
      this.httpClient.post(this.configGeneral.strUrlApis + 'qrCode', ObjectData)
        .subscribe(data => {
          console.log("respuesta post " + data);
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  public getDetallesPaquete(_id) {
    return new Promise(resolve => {
      this.httpClient.get(this.configGeneral.strUrlApis + 'detalleItinerario' + "/" + _id)
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
    });
  }

  getInfQr(_id) {
    return new Promise(resolve => {
      this.httpClient.get(this.configGeneral.strUrlApis + "qrExistente" + "/" + _id)
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
    });
  }

  postChangePass(_id, pass) {
    var ObjectData = {
      _id: _id,
      strContraseña: pass
    }
    console.log(JSON.stringify(ObjectData));
    return new Promise((resolve, reject) => {
      this.httpClient.post(this.configGeneral.strUrlApis + 'changePass', ObjectData)
        .subscribe(data => {
          console.log("respuesta post " + data);
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  postRegistro(usuarioModelo: UsuarioModelo) {
    var ObjectData = {
      strNombre: usuarioModelo.strNombre,
      strApellido: usuarioModelo.strApellido,
      strCorreo: usuarioModelo.strCorreo,
      strContraseña: usuarioModelo.strContraseña,
      nmbPuntos: usuarioModelo.nmbPuntos
    }
    return new Promise((resolve, reject) => {
      this.httpClient.post(this.configGeneral.strUrlApis + 'pRegistro', ObjectData)
        .subscribe(data => {
          console.log("respuesta post " + data);
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  getUsers(strCorreo) {
    return new Promise(resolve => {
      this.httpClient.get(this.configGeneral.strUrlApis + "gRegistro" + "/" + strCorreo)
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
    });
  }

}