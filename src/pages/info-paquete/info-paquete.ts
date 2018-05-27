import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { ViewChild } from '@angular/core';
import { ItinerarioModelo } from '../../modelos/itinerario.model';
import { EventoModelo } from '../../modelos/evento.model';
import { ForoModelo } from '../../modelos/foro.model';
import { ApiService } from '../../general/conexionesApi';
import { ConfigGeneral } from '../../general/configGeneral';
import { InfoActividadPage } from '../info-actividad/info-actividad';
import { ActividadModelo } from '../../modelos/actividad.model';

@IonicPage()
@Component({
  selector: 'page-info-paquete',
  templateUrl: 'info-paquete.html',
})
export class InfoPaquetePage {
  @ViewChild(Navbar) navBar: Navbar;
  itinerario:ItinerarioModelo;
  arrayEvento: Array <EventoModelo> = new Array<EventoModelo>();
  intTipoPaquete:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,private tts:TextToSpeech,
    public configGeneral:ConfigGeneral) {
    if(this.navParams.get('TipoPaquete')){
      this.intTipoPaquete = this.navParams.get('TipoPaquete');
    }
      console.log(this.intTipoPaquete);

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
        this.itinerario=new ItinerarioModelo({
          _id:"1",
          strTitulo:"AVENTURA EN CALVILLO",
          strDescripcion:"El increible pueblo mágico de Calvillo, en 1 solo día",
          strImagenPrincipal:"assets/img/7.jpg",
          nmbCostoAproximado: 400,
          nmbTiempoAproximado:1,
          arrayActividades:[]
          });
        this.itinerario.arrayActividades.push(new ActividadModelo({
          strDescripcion:"Subir el cerro del picacho en los pies del cerro del muerto",
          nmbDuracion:2,
          strClave:''
        }));
        this.itinerario.arrayActividades.push(new ActividadModelo({
          strDescripcion:"Visitar las cascadas en la sierra brava",
          nmbDuracion:5,
          strClave:''
        }));
        this.itinerario.arrayActividades.push(new ActividadModelo({
          strDescripcion:"Lanzarse en la tirolesa de la sierra brava",
          nmbDuracion:1,
          strClave:''
        }));
    }

     
  

  ionViewDidLoad() {
    this.navBar.backButtonClick = () => {
      this.tts.stop();
      this.navCtrl.pop();
      }
  }

  ngOnInit(){
    this.Speack();
  }
  async Speack(): Promise<any> {
    try {
      await this.tts.speak({text:"Bienvenido a la experiencia aventourags, si ya estas registrado, por favor, ingresa,"+
      "de lo contrario, si deseas obtener una cuenta, presiona la opción de registro. Para ver el contenido de la aplicación"+
      "sin registrarte, puedes omitir este paso en el botón color marrón."
      ,locale:"es-MX"});
      console.log("Se reprodujo exitosamente");
    } catch (error) {
      console.log(error);
    }
  }

  verDetalles(id){
    console.log("Evento "+id);
    this.navCtrl.push(InfoActividadPage,{_id:id});
  }

}
