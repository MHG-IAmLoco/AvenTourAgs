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


}