import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ConfigGeneral } from './configGeneral';
import { Observable } from 'rxjs/observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { GaleriaModelo } from './galeria.model';

@Injectable()
export class ApiService {
    constructor(
        private httpClient: HttpClient,
        private configGeneral: ConfigGeneral) {}

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
    public postImagenGaleria(strId, modeloGaleria: GaleriaModelo) {
        const ObjectData = {
            _id: strId,
            modeloGaleria: modeloGaleria
        };
        console.log('Objeto imagen->' + JSON.stringify(ObjectData, null, 2));
        return new Promise((resolve, reject) => {
            this.httpClient.post(this.configGeneral.strUrlApis + 'imgGaleria', ObjectData)
            .subscribe(data => {
              resolve(data);
            }, err => {
              reject(err);
            });
          });
    }
}
