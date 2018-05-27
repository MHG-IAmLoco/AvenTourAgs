import { Component } from '@angular/core';
import { MatRadioChange } from '@angular/material';
import { GaleriaModelo } from '../../general/galeria.model';
import { ApiService } from '../../general/conexionesApi';
import { ConfigGeneral } from '../../general/configGeneral';
import { AlertsService } from 'angular-alert-module';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss']
})
export class GaleriaComponent {
  galeria: GaleriaModelo = new GaleriaModelo();
  titulo = '';
  descripcion = '';
  categoria= 'Calvillo';
  imagen1 = '';
  _id = '';
  categorias = new Array<string>();
  arrayGaleria = new Array<GaleriaModelo>();
  constructor(public configGeneral: ConfigGeneral,
    private conexionesApi: ApiService,
    private alerts: AlertsService) {
    console.log('entro');
    this.getCategorias();
   }

   categorias1(event: MatRadioChange) {
     this.categoria = event.value;
   }

   obtenerTitulo(event: any) { // without type info
    this.titulo = '' + event.target.value;
  }

  obtenerDesc(event: any) { // without type info
    this.descripcion = '' + event.target.value;
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
    console.log('Categoria:' + this.categoria);
    console.log('Descripcion: ' + this.descripcion);
    console.log('Titulo: ' + this.titulo);
    this.imagen1 = document.getElementById('b64').innerHTML;
    console.log('Imagen: ' + this.imagen1);
    if ( this.descripcion === '' || this.titulo === '') {
      console.log( 'Entra al if' );
      this.alerts.setMessage('FAVOR DE LLENAR TODOS LOS CAMPOS', 'error');
    }else {
      let pos = 0;
      for (let i = 0; i < this.arrayGaleria.length; i++) {
        if (this.arrayGaleria[i].strTitulo === this.categoria) {
          pos = i;
        }
      }
      this._id = this.arrayGaleria[pos]._id;
      console.log('posicion: ' + pos);
      this.galeria.strDescripcion = this.descripcion;
      this.galeria.strTitulo = this.titulo;
      this.galeria.strImagenPrincipal = this.imagen1;
      this.postImagen(this._id, this.galeria);
    }
  }


  getCategorias() {
    this.conexionesApi.getCategoriasGaleria()
    .then((data: GaleriaModelo[]) => {
      this.arrayGaleria = data;
      console.log(this.arrayGaleria);
      if (this.arrayGaleria.length > 0) {
        this.categoria = this.arrayGaleria[0].strTitulo;
      }
    });
  }

  postImagen(strId, modeloGaleria: GaleriaModelo) {
    this.conexionesApi.postImagenGaleria(strId, modeloGaleria)
    .then((data) => {
      if (data['intStatus']) {
        if (data['intStatus'] === 1) {
          alert('Agregado con exito');
        }else {
          alert('Error -> ' + JSON.stringify(data['strAnswer'], null, 2));
        }
      }else {
        alert('Error');
      }
    });
  }
}
