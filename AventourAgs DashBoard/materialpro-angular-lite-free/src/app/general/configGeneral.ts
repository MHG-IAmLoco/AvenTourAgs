import { Injectable } from '@angular/core';

@Injectable()
export class ConfigGeneral {
    // Servidor
    /*
    public strUrlApis= 'http://192.168.137.1:8081/api/general/';
    public strUrlImages= 'http://192.168.137.1:8082/media/';*/

    // Locales
     public strUrlApis = 'http://localhost:5000/api/general/';
     public strUrlImages = 'http://localhost:80/media/';
}
