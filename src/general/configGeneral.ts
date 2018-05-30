import { Injectable } from '@angular/core';
import { UsuarioModelo } from '../modelos/usuario.model';
/*
  Generated class for the GlobalProvider provider.
*/
@Injectable()
export class ConfigGeneral{
    //Servidor
   // public strUrlApis:string="http://192.168.137.1:8081/api/general/";
    //public strUrlImages:string="http://192.168.137.1:8082/media/";

    //Locales
   // public strUrlApis:string="http://192.168.1.66:5000/api/general/";
    //public strUrlImages:string="http://192.168.1.66:80/media/";
    public strUrlApis:string="http://172.16.109.4:5000/api/general/";
    public strUrlImages:string="http://172.16.109.4:80/media/";
   // public strUrlApis:string="http://localhost:5000/api/general/";
    //public strUrlImages:string="http://localhost:80/media/";

    public modeloUsuario: UsuarioModelo;
}