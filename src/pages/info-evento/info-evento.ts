import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, AlertController } from 'ionic-angular';
import { EventoModelo } from '../../modelos/evento.model';
import { ImageViewerController } from 'ionic-img-viewer';
import { ViewChild } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { SeleccionPage } from '../seleccion/seleccion';

/**
 * Generated class for the InfoEventoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info-evento',
  templateUrl: 'info-evento.html',
})
export class InfoEventoPage {
  @ViewChild(Navbar) navBar: Navbar;
  public mostrarB: boolean = true;
  public mostrarC: boolean = false;
  cntAdultos:number;
  cntMenores:number;
  evento:EventoModelo;
  _id:string;
  myIcon: string = "ios-microphone-outline";
  constructor(public navCtrl: NavController, public navParams: NavParams, public imageViewerCtrl: ImageViewerController,private tts:TextToSpeech,public alertCtrl:AlertController) {
    if(this.navParams.get('_id')){
      this._id = this.navParams.get('_id');
      console.log("Recibe "+this._id);
      
    }
    this.cntAdultos=0;
    this.cntMenores=0;
    //this._id='1';
    switch (this._id){
      case "1":
        this.evento=new EventoModelo({
          _id:"1",
          strTipo:"CONCIERTOS",
          strTitulo:"PEPE AGUILAR • JARIPEO SIN FRONTERAS",
          strDescripcion:"Pepe Aguilar cantando junto a sus hijos.",
          strResenia:"Pepe Aguilar y Familia junto con Christian Nodal recuperan la tradición del Jaripeo "+
          "La historia continúa y se reinventa. Tras una exitosa carrera, acreedor de nueve premios Grammy, "+
          "los reconocimientos más importantes en la industria musical y sin duda una de las mejores voces de "+
          "habla hispana Pepe Aguilar toma la iniciativa acompañado de la 3ra generación de los Aguilar y regresa a los ruedos.",
          strImagenPrincipal:"../../assets/img/pepe.jpg",
          dteFecha: new Date(2018,4,28),
          strMunicipio:"Aguascalientes",
          strUbicacion:"Plaza de Toros Monumental",
          dteHoraInicio: new Date(),
          dteHoraFin: new Date(),
          nmbCostoAdulto:0.0,
          nmbCostoMenor:0.0
        });
        break;
      case "2":
        this.evento=new EventoModelo({
          _id:"2",
          strTipo:"CONCIERTOS",
          strTitulo:"ALEJANDRO FERNANDEZ • PALENQUE DE LA FERIA",
          strDescripcion:"Una vez más se presenta en Aguascalientes el potrillo.",
          strResenia:"Alguna reseña",
          strImagenPrincipal:"../../assets/img/alejandro.jpg",
          dteFecha: new Date(),
          strMunicipio:"Aguascalientes",
          strUbicacion:"Palenque de la feria",
          dteHoraInicio: new Date(),
          dteHoraFin: new Date(),
          nmbCostoAdulto:0.0,
          nmbCostoMenor:0.0
        });
        break;
      case "3":
        this.evento=new EventoModelo({
          _id:"1",
          strTipo:"DEPORTES",
          strTitulo:"ESTE ES UN DEPORTE",
          strResenia:"Alguna reseña",
          strDescripcion:"Pepe Aguilar cantando junto a sus hijos.",
          strImagenPrincipal:"../../assets/img/pepe.jpg",
          dteFecha: new Date(),
          strMunicipio:"Aguascalientes",
          strUbicacion:"Plaza de Toros Monumental",
          dteHoraInicio: new Date(),
          dteHoraFin: new Date(),
          nmbCostoAdulto:0.0,
          nmbCostoMenor:0.0
        });
        break;
      case "4":
        this.evento=new EventoModelo({
          _id:"2",
          strTipo:"DEPORTES",
          strTitulo:"ESTE ES UN DEPORTE",
          strDescripcion:"Una vez más se presenta en Aguascalientes el potrillo.",
          strResenia:"Alguna reseña",
          strImagenPrincipal:"../../assets/img/alejandro.jpg",
          dteFecha: new Date(),
          strMunicipio:"Aguascalientes",
          strUbicacion:"Palenque de la feria",
          dteHoraInicio: new Date(),
          dteHoraFin: new Date(),
          nmbCostoAdulto:0.0,
          nmbCostoMenor:0.0
        });
        break;
      }
      if(this.evento.strTipo=="CONCIERTOS"){
        this.myIcon = "ios-microphone-outline";
      }else if(this.evento.strTipo=="DEPORTES"){
        this.myIcon = "ios-american-football-outline";
      }else if(this.evento.strTipo=="MUSEO"){
        this.myIcon = "ios-color-palette-outline";
      }else if(this.evento.strTipo=="TEATRO"){
        this.myIcon = "ios-people-outline";
      }else if(this.evento.strTipo=="TOURS"){
        this.myIcon = "ios-camera-outline";
      }
  }

  onClick(imageToView) {
    const viewer = this.imageViewerCtrl.create(imageToView)
    viewer.present();
  }

  ionViewDidLoad(){
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
      await this.tts.speak({text:"Si deseas asistir a este evento, pulsa el botón de compra al final de la página."
      ,locale:"es-MX"});
      console.log("Se reprodujo exitosamente");
    } catch (error) {
      console.log(error);
    }
    
  }
  async Speack2(): Promise<any> {
    try {
      await this.tts.speak({text:"Para acercar la imágen, usa dos dedos desplazando del centro de la pantalla hacia afuera, "+
      "asegurate que tus dedos se desplacen en dirección contraría"
      ,locale:"es-MX"});
      console.log("Se reprodujo exitosamente");
    } catch (error) {
      console.log(error);
    }
  }

  comprar(){
    this.mostrarB = !this.mostrarB;
    this.mostrarC = !this.mostrarC;
  }

  contar(caso){
    switch (caso){
      case 1:
        console.log("Restar adulto");
        if(this.cntAdultos>0){
          this.cntAdultos--;
        }
        break;
      case 2:
        console.log("Agregar adulto");
        this.cntAdultos++;
        break;
      case 3:
        console.log("Restar menor");
        if(this.cntMenores>0){
          this.cntMenores--;
        }
        break;
      case 4:
        console.log("Agregar menor");
        this.cntMenores++;
        break;
    }

  }

  irSeleccion(){
    if((this.cntAdultos+this.cntMenores)==0){
      let alert = this.alertCtrl.create({
        title: 'Queremos que asistas!',
        subTitle: 'Debes comprar al menos un ticket para poder seleccionar asientos.',
        buttons: ['Entendido']
      });
      alert.present();
    }else{
      this.navCtrl.push(SeleccionPage,{IdEvento:this.evento._id,CantAdultos:this.cntAdultos,CantMenores:this.cntMenores});
    }
  }

}
