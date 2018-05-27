import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, AlertController } from 'ionic-angular';
import { EventoModelo } from '../../modelos/evento.model';
import { ImageViewerController } from 'ionic-img-viewer';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { ApiService } from '../../general/conexionesApi';
import { ConfigGeneral } from '../../general/configGeneral';
import { SeleccionPage } from '../seleccion/seleccion';
import { PagarPage } from '../pagar/pagar';
import { ForoModelo } from '../../modelos/foro.model';
import { DatePicker } from '@ionic-native/date-picker';
import { InstanciaModelo } from '../../modelos/instancia.model';

/**
 * Generated class for the InfoActividadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info-actividad',
  templateUrl: 'info-actividad.html',
})
export class InfoActividadPage {
  @ViewChild(Navbar) navBar: Navbar;
  public mostrarB: boolean = true;
  public mostrarC: boolean = false;
  public mostrarHoras: boolean=false;
  cntAdultos:number=0;
  cntMenores:number=0;
  evento:EventoModelo=new EventoModelo();
  _id:string;
  strTipo:string;
  myIcon: string = "ios-microphone-outline";
  strFecha:string;
  strHora:string;
  arrayHorarios:InstanciaModelo[]=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public imageViewerCtrl: ImageViewerController,private tts:TextToSpeech,public alertCtrl:AlertController,
    private conexionesApi: ApiService,
    public configGeneral:ConfigGeneral,
    private datePicker: DatePicker) {
      if(this.navParams.get('_id')){
        this._id = this.navParams.get('_id');
        console.log("Recibe "+this._id);
      }
      if(this.navParams.get('strTipo')){
        this.strTipo = this.navParams.get('strTipo');
        console.log("Recibe "+this.strTipo);
      }
      this.getDetalle(this._id,this.strTipo);
      //this.cntAdultos=0;
      //this.cntMenores=0;
      /*switch (this._id){
        case "1":
        this.evento=new EventoModelo({
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
        });
        break;
        case "2":
        this.evento=new EventoModelo({
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
        }*/
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

  verFechas(){
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_LIGHT,
      allowOldDates: false,
      minDate: Date.now()
    }).then(
      date => this.obtenerArrayHoras(date),
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  obtenerArrayHoras(date:Date){
    this.strHora = "";
    this.arrayHorarios = [];
    var strDate = ""+date.getFullYear() +"-"+(date.getMonth()+1)+"-"+date.getDate();
    this.strFecha = strDate;
    console.log(this.strFecha);
    this.getArrayHorarios(this.evento._id,this.strFecha);
  }

  showVal(i){
    let alert = this.alertCtrl.create({
      title: '¡Bien!',
      subTitle: 'Horario elegido '+i+' hrs',
      buttons: ['CORRECTO']
    });
    this.strHora = i;
    alert.present();
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
        //console.log(this.evento);
        if((this.cntAdultos+this.cntMenores<5)){
        this.cntAdultos++;
        }
        break;
      case 3:
        console.log("Restar menor");
        if(this.cntMenores>0){
          this.cntMenores--;
        }
        break;
      case 4:
        console.log("Agregar menor");
        if((this.cntAdultos+this.cntMenores<5)){
        this.cntMenores++;
        }
        break;
    }

  }

  irSeleccion(){
    if((this.cntAdultos+this.cntMenores)==0){
      let alert = this.alertCtrl.create({
        title: '¡Queremos que asistas!',
        subTitle: 'Debes seleccionar al menos un tipo de boleto para continuar con la compra.',
        buttons: ['Entendido']
      });
      alert.present();
    }else if(this.strHora==""){
      let alert = this.alertCtrl.create({
        title: '¡Queremos que asistas!',
        subTitle: 'Debes seleccionar un horario para continuar con la compra.',
        buttons: ['Entendido']
      });
      alert.present();
    }else{
      if(this.evento.strTipo=="CONCIERTOS" || this.evento.strTipo=="TEATRO"){
        this.navCtrl.push(SeleccionPage,{IdEvento:this.evento._id,CantAdultos:this.cntAdultos,CantMenores:this.cntMenores,Evento:this.evento,strFecha:this.strFecha,strHora:this.strHora});
      }else if(this.evento.strTipo=="DEPORTES" || this.evento.strTipo=="MUSEO" || this.evento.strTipo=="TOURS"){
        this.navCtrl.push(PagarPage,{IdEvento:this.evento._id,CantAdultos:this.cntAdultos,CantMenores:this.cntMenores,strFecha:this.strFecha,strHora:this.strHora});
      }
    }
  }

  getDetalle(id,strTipo){
    if(id!=undefined){
      this.conexionesApi.getDetalleEvento(id,strTipo)
      .then((data:EventoModelo) => {
        this.evento = data;
        console.log(this.evento);
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
      });
    }
  }

  getArrayHorarios(idEvento,strFecha){
    if(idEvento!=undefined && strFecha!=undefined){
      this.conexionesApi.getArrayHorarios(idEvento,strFecha)
      .then((data:InstanciaModelo[]) => {
        this.arrayHorarios = data;
        this.mostrarHoras=true;
        console.log(JSON.stringify(this.evento.arrayInstancias,null,2));
      });
    }
  }

}