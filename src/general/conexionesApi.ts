import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ConfigGeneral } from './configGeneral';
import { Observable } from 'rxjs/observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { GaleriaModelo } from '../modelos/galeria.model';

@Injectable()
export class ApiService{
    constructor(
        private httpClient:HttpClient,
        private configGeneral:ConfigGeneral){}

    public getCategoriasGaleria(){
        return new Promise(resolve => {
            this.httpClient.get(this.configGeneral.strUrlApis+'categoriasGaleria')
            .subscribe(data => {
              resolve(data['jsnAnswer']);
            }, err => {
              console.log(err);
            });
          });
    }

    getDetalleGaleria(strId){
        return new Promise(resolve => {
            this.httpClient.get(this.configGeneral.strUrlApis+"detalleGaleria"+"/"+strId)
            .subscribe(data => {
              resolve(data['jsnAnswer']);
            }, err => {
              console.log(err);
            });
          });
    }

    getListaEvento(strTipo){
      return new Promise(resolve => {
          this.httpClient.get(this.configGeneral.strUrlApis+"listaEvento"+"/"+strTipo)
          .subscribe(data => {
            resolve(data['jsnAnswer']);
          }, err => {
            console.log(err);
          });
        });
  }

  getDetalleEvento(strIdEvento,strTipo){
    return new Promise(resolve => {
        this.httpClient.get(this.configGeneral.strUrlApis+"detalleEvento"+"/"+strIdEvento+"/"+strTipo)
        .subscribe(data => {
          resolve(data['jsnAnswer']);
        }, err => {
          console.log(err);
        });
      });
}

    getLogIn(strCorreo,strContraseña){
      return new Promise(resolve => {
          this.httpClient.get(this.configGeneral.strUrlApis+"login"+"/"+strCorreo+"/"+strContraseña)
          .subscribe(data => {
            resolve(data);
          }, err => {
            console.log(err);
          });
        });
    }

    getItinerarios(intPresupuesto){
      return new Promise(resolve => {
          this.httpClient.get(this.configGeneral.strUrlApis+'itinerarios'+"/"+intPresupuesto)
          .subscribe(data => {
            resolve(data['jsnAnswer']);
          }, err => {
            console.log(err);
          });
        });
  }

  getDetalleForo(idEvento){
    return new Promise(resolve => {
        this.httpClient.get(this.configGeneral.strUrlApis+'detalleForo'+"/"+idEvento)
        .subscribe(data => {
          resolve(data['jsnAnswer']['modeloForo']);
        }, err => {
          console.log(err);
        });
      });
      
}

putAsientosForo(idEvento,arrayNumAsientos,strColor){
  var ObjectData = {
    _id:idEvento,
    arrayNumAsientos:arrayNumAsientos,
    strColor:strColor
  }
  return new Promise((resolve, reject) => {
    this.httpClient.put(this.configGeneral.strUrlApis+'detalleForo', JSON.stringify(ObjectData))
      .subscribe(data => {
        console.log("respuesta put" + data);
        resolve(data);
      }, (err) => {
        reject(err);
      });
  });
}

putDisponibilidadEvento(idEvento,strFecha,strHora,nmbAsientos){
  var ObjectData = {
    _id:idEvento,
    strFecha:strFecha,
    strHora:strHora,
    nmbAsientos:nmbAsientos
  }
  return new Promise((resolve, reject) => {
    this.httpClient.put(this.configGeneral.strUrlApis+'dispoEvento', JSON.stringify(ObjectData))
      .subscribe(data => {
        console.log("respuesta put" + data);
        resolve(data);
      }, (err) => {
        reject(err);
      });
  });
}

getArrayHorarios(idEvento,strFecha){
  return new Promise(resolve => {
      this.httpClient.get(this.configGeneral.strUrlApis+"detalleDisponibilidad"+"/"+idEvento+"/"+strFecha)
      .subscribe(data => {
        resolve(data['jsnAnswer']);
      }, err => {
        console.log(err);
      });
    });
  }


}