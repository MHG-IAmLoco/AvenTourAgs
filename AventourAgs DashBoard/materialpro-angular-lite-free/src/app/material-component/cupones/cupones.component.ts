import { Component } from '@angular/core';
import {MatChipInputEvent} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
export interface DemoColor {
  name: string;
  color: string;
}
@Component({
  selector: 'app-cupones',
  templateUrl: './cupones.component.html',
  styleUrls: ['./cupones.component.scss']
})
export class CuponesComponent {
  titulo = '';
  descripcion = '';
  ubicacion = '';
  puntos = 0;
  imagen1 = '';

  constructor() {}

  obtenerTitulo(event: any) { // without type info
    this.titulo = '' + event.target.value;
  }

  obtenerDesc(event: any) { // without type info
    this.descripcion = '' + event.target.value;
  }

  obtenerUbicacion(event: any) { // without type info
    this.ubicacion = '' + event.target.value;
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

  guardar() {

  }
}
