import { Component } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { AmazingTimePickerService } from 'amazing-time-picker';
import {MatRadioChange} from '@angular/material';
import { ItinerarioModelo } from '../../general/itinerario.model';
import { EventoModelo } from '../../general/evento.model';
import { ForoModelo } from '../../general/foro.model';
import { AsientoModelo } from '../../general/asiento.model';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent {
  fecha: Date;
  value = 30;
  resenia = '';
  titulo = '';
  descripcion = '';
  ubicacion = '';
  tipo = 'TEATRO';
  tipo2 = 'MUSEO';
  minDate = new Date();
  tiempo = '12:00';
  tiempoF = '12:00';
  categoria = 'EVENTO';
  clave = '';
  verEvento = true;
  verActividad = false;
  verDeporte = false;
  filter: any;
  cupoDeporte = '14000';
  cupoEvento = '45';
  evento = new EventoModelo();
  constructor(private atp: AmazingTimePickerService) {}

  categorias(event: MatRadioChange) {
    this.categoria = event.value;
    console.log(this.filter);
    if (this.categoria === 'EVENTO') {
      console.log('Evento');
      this.verEvento = true;
      this.verDeporte = false;
      this.verActividad = false;
    } else if (this.categoria === 'ACTIVIDAD') {
      console.log('Actividad');
      this.verEvento = false;
      this.verDeporte = false;
      this.verActividad = true;
    }else if (this.categoria === 'DEPORTES') {
      console.log('Deporte');
      this.verEvento = false;
      this.verDeporte = true;
      this.verActividad = false;
    }
  }

  open() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      console.log(time);
      this.tiempo = time;
    });
  }
  open2() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      console.log(time);
      this.tiempoF = time;
    });
  }

  obtenerResenia(event: any) {
    this.resenia = '' + event.target.value;
  }
  obtenerTitulo(event: any) { // without type info
    this.titulo = '' + event.target.value;
  }

  obtenerDesc(event: any) { // without type info
    this.descripcion = '' + event.target.value;
  }

  obtenerUbicacion(event: any) {
    this.ubicacion = '' + event.target.value;
  }

  obtenerClave(event: any) {
    this.clave = '' + event.target.value;
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
    const s = document.getElementById('b64eventos');
    s.innerHTML = img2;
    });
    fileReader.readAsDataURL(img);
  }

  guardar() {
    console.log((document.getElementById('num1') as HTMLInputElement).value);
    console.log(this.value);
    if (this.categoria === 'EVENTO') {
      this.evento.strTipo = this.tipo;
      this.evento.dteFecha = this.fecha;
      this.evento.dteHoraInicio = new Date(this.tiempo);
      this.evento.dteHoraFin = new Date(this.tiempoF);
      this.evento.nmbCupo = parseInt(this.cupoEvento, 10);
      this.evento.modeloForo = new ForoModelo();
      this.evento.modeloForo.cantAsientos = this.evento.nmbCupo;
      this.evento.modeloForo.dispAsientos = this.evento.nmbCupo;
      this.evento.modeloForo.arrayAsientos = new Array<AsientoModelo>();
      for ( let i = 0; i < this.evento.nmbCupo; i++) {
        this.evento.modeloForo.arrayAsientos.push(
          new AsientoModelo(
            {
              numAsiento: i + 1,
              strColor: '#b9bdc0'
            }
          )
        );
      }
    }else if (this.categoria === 'ACTIVIDAD') {
      this.evento.strTipo = this.tipo2;
    } else if (this.categoria === 'EVENTO') {

    }
  }

  public onDate(event): void {
    this.fecha = event;
    // this.getData(this.roomsFilter.date);
    // console.log(this.fecha);
  }
}
