import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';
import { InfoEventoPage } from '../info-evento/info-evento';
import { EventoModelo } from '../../modelos/evento.model';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { ApiService } from '../../general/conexionesApi';
import { ConfigGeneral } from '../../general/configGeneral';
import { ForoModelo } from '../../modelos/foro.model';
import { InstanciaModelo } from '../../modelos/instancia.model';
import { InfoActividadPage } from '../info-actividad/info-actividad';

/**
 * Generated class for the ListaActividadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-actividad',
  templateUrl: 'lista-actividad.html',
})
export class ListaActividadPage {
  @ViewChild(Navbar) navBar: Navbar;
  arrayEvento:Array<EventoModelo> = new Array<EventoModelo>();
  TipoEvento:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private tts:TextToSpeech,
    private conexionesApi: ApiService,
    public configGeneral:ConfigGeneral) {
    if(this.navParams.get('TipoEvento')){
      this.TipoEvento = this.navParams.get('TipoEvento');
    }
    switch (this.TipoEvento){
      case "MUSEO":
        this.arrayEvento.push(new EventoModelo({
          _id:"1",
          strTipo:"MUSEO",
          strTitulo:"MUSEO AGUASCALIENTES",
          strDescripcion:"Uno de los museos más importantes de Aguascalientes.",
          strResenia:"Alguna reseña",
          strImagenPrincipal:"14.jpg",
          dteFecha: new Date(),
          strUbicacion:"Plaza de Toros Monumental",
          dteHoraInicio: new Date(),
          dteHoraFin: new Date(),
          nmbCostoAdulto:40,
          nmbCostoMenor:20,
          modeloForo:new ForoModelo(),
          nmbCupo:50,
          arrayHorarios:[],
          arrayInstancias:[]
        }));
        break;
      case "TOURS":
        this.arrayEvento.push(new EventoModelo({
          _id:"2",
          strTipo:"TOURS",
          strTitulo:"CALVILLO MÁGICO",
          strDescripcion:"Un lugar encantador.",
          strResenia:"Alguna reseña",
          strImagenPrincipal:"Calv.jpg",
          dteFecha: new Date(),
          strUbicacion:"Calvillo",
          dteHoraInicio: new Date(),
          dteHoraFin: new Date(),
          nmbCostoAdulto:100,
          nmbCostoMenor:60,
          modeloForo:new ForoModelo(),
          nmbCupo:50,
          arrayHorarios:[],
          arrayInstancias:[]
        }));
        break;
  }
    for(var i=0;i<4;i++){
      this.arrayEvento[0].arrayHorarios.push(""+i);
    }
    for(var i=0;i<4;i++){
      this.arrayEvento[0].arrayInstancias.push(new InstanciaModelo(
        {
          strFecha:""+i,
          strHora:""+i,
          nmbLugares:50
        }
      ))
    }
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.Speack();
  }

  ionViewDidLoad(){
    this.navBar.backButtonClick = () => {
          this.tts.stop();
          this.navCtrl.pop();
          }
    }

  verDetalles(id){
    console.log("Evento "+id);
    this.navCtrl.push(InfoActividadPage,{_id:id});
  }

  async Speack(): Promise<any> {
    try {
      await this.tts.speak({text:"Aquí puedes observar una previsualización de los próximos eventos en Aguascalientes, puedes navegar "+
      "deslizando la pantalla hacia arriba y conocer más detalles sobre un evento de tu interés, presionando el "+
      "botón ver que se encuentra enseguida de la descripción."
      ,locale:"es-MX"});
      console.log("Se reprodujo exitosamente");
    } catch (error) {
      console.log(error);
    }
  }

}
