import { Component } from '@angular/core';
import { ActividadModelo } from '../../general/actividad.model';
import {MatSelectModule} from '@angular/material';

@Component({
  selector: 'app-itinerarios',
  templateUrl: './itinerarios.component.html',
  styleUrls: ['./itinerarios.component.scss']
})
export class ItinerariosComponent {
  titulo = '';
  descripcion = '';
  imagen1 = '';
  actividades = new Array<ActividadModelo>();
  claves = new Array<string>();
  clav = '';
  constructor() {
    console.log('entro');
    this.actividades.push(new ActividadModelo());
    this.claves.push('');
    this.claves.push('Clave2');
    this.claves.push('Clave3');
    this.claves.push('Clave4');
    this.claves.push('Clave5');
   }

   obtenerTitulo(event: any) { // without type info
    this.titulo = '' + event.target.value;
  }

  obtenerDesc(event: any) { // without type info
    this.descripcion = '' + event.target.value;
  }

  obtenerDescAct(event: any, i) {
    this.actividades[i].strDescripcion = '' + event.target.value;
  }

  addImage(event) {
    const file = event.srcElement.files[0],
      imageType = /image.*/;
      console.log( 'file ');
    console.log( file);
      if (!file.type.match(imageType)) {
       return;
      }
      const reader = new FileReader();
      reader.onload = this.fileOnload;
      reader.readAsDataURL(file);

      this.getBase64FromFile(file, function(base64){
        console.log('base64');
        console.log(base64);
        const strImageFormat = /data:image\/(png|jpg|bmp|gif|jpeg);base64,/g;
        const imagen = base64.replace(strImageFormat, '');
        console.log(imagen);
        return imagen;
      });
  }

  fileOnload(e) {
    const result = e.srcElement.result;
    $('#imgSalida').attr('src', result);
  }

  getBase64FromFile(img, callback) {
    const fileReader = new FileReader();
    fileReader.addEventListener('load', function(evt){
    const img2 = callback(fileReader.result);
    const s = document.getElementById('b64');
    s.innerHTML = img2;
    });
    fileReader.readAsDataURL(img);
  }

  addActividad() {
    this.actividades.push(new ActividadModelo());
  }

  elimActividad(i) {
    this.actividades.splice(i, 1);
  }

  guardar() {
    for (var i = 0; i < this.actividades.length; i++) {
      console.log('' + i + ' ' + this.actividades[i].strDescripcion);
    }
  }

  cambio(i, event: any) {
    this.actividades[i].strDescripcion = event.target.value;
  }
}
