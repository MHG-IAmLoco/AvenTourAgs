import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AsientoModelo } from '../../modelos/asiento.model';
import { ForoModelo } from '../../modelos/foro.model';
import { PagarPage } from '../pagar/pagar';
import { ApiService } from '../../general/conexionesApi';
import { ConfigGeneral } from '../../general/configGeneral';
import { EventoModelo } from '../../modelos/evento.model';

/**
 * Generated class for the SeleccionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-seleccion',
  templateUrl: 'seleccion.html',
})
export class SeleccionPage {
  foroEvento:ForoModelo;
  public verSwipe:boolean=true;
  evento:EventoModelo = new EventoModelo();
  contador:number;
  colorSel = '#f5a34b';
  colorDisp = '#b9bdc0';
  colorOcup = '#e78867';
  //colorOcup = '#d92129';
  matAsientos:AsientoModelo[][];
  numFilas:number;
  asientosSel=0;
  asientosReq:number;
  cntAdultos=0;
  cntMenores=0;
  idEvento:string;

  arraySeleccion:Array<number>=new Array<number>();
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,
    private conexionesApi: ApiService,
    public configGeneral:ConfigGeneral) {
    this.evento = this.navParams.get('Evento');
    if(this.navParams.get('CantAdultos')){
      this.cntAdultos = this.navParams.get('CantAdultos');
    }
    if(this.navParams.get('CantMenores')){
      this.cntMenores = this.navParams.get('CantMenores');
    }
    if(this.navParams.get('IdEvento')){
      this.idEvento = this.navParams.get('IdEvento');
    }

    this.asientosReq=this.cntAdultos+this.cntMenores
    this.matAsientos = [];
    this.getDetalleForo(this.evento._id);
   /* this.foroEvento = new ForoModelo({
      _id:'1',
      dispAsientos:18,
      cantAsientos:18,
      arrayAsientos:[]
    });*/

    /*for(var i:number =0;i<this.foroEvento.cantAsientos;i++){
      this.foroEvento.arrayAsientos[i]=new AsientoModelo({
        _id:''+(i+1),
        numAsiento:(i+1),
        strColor:this.colorDisp
      })
    }*/
/*this.numFilas = this.foroEvento.cantAsientos/9;
    this.contador=0;
    for(var i:number =0;i<this.numFilas;i++){
      this.matAsientos[i]=[];
      for(var j:number=0;j<9;j++){
        this.matAsientos[i][j]= this.foroEvento.arrayAsientos[this.contador];
        this.contador++;
      }
    }*/

    //this.foroEvento.arrayAsientos[3][2].strColor=this.colorOcup;
    //this.foroEvento.arrayAsientos[1][6].strColor=this.colorOcup;
    //this.foroEvento.arrayAsientos[7][7].strColor=this.colorOcup;

  }

  ionViewDidLoad() {
    console.log("Esto "+this.verSwipe);
    console.log('ionViewDidLoad SeleccionPage');
    setInterval(()=>{this.verSwipe=false;
    console.log(""+this.verSwipe)}, 3000);
  }

  cambioColor(asientoAux){
    if(this.evento.modeloForo.arrayAsientos[(asientoAux-1)].strColor==this.colorDisp){
      if(this.asientosSel<this.asientosReq){
        this.evento.modeloForo.arrayAsientos[(asientoAux-1)].strColor=this.colorSel;
        this.asientosSel++;
        this.arraySeleccion.push(this.evento.modeloForo.arrayAsientos[(asientoAux-1)].numAsiento);
        //console.log('Elementos en array: '+this.arraySeleccion.length);
      }
    }else if(this.evento.modeloForo.arrayAsientos[(asientoAux-1)].strColor==this.colorSel){
      this.evento.modeloForo.arrayAsientos[(asientoAux-1)].strColor=this.colorDisp;
      this.asientosSel--;
      var pos = this.arraySeleccion.indexOf(this.evento.modeloForo.arrayAsientos[(asientoAux-1)].numAsiento);
      var elementoEliminado = this.arraySeleccion.splice(pos, 1);
      //console.log('Eliminado: '+elementoEliminado);
      //console.log('Elementos en array: '+this.arraySeleccion.length);
    }
  }


  pagar(){
    if(this.asientosSel<this.asientosReq){
      let alert = this.alertCtrl.create({
        title: 'Aún no terminas!',
        subTitle: 'Debes seleccionar '+this.asientosReq+' asientos para poder continuar con el pago!',
        buttons: ['Entendido']
      });
      alert.present();
    }else{
      this.navCtrl.push(PagarPage,{IdEvento:this.idEvento,CantAdultos:this.cntAdultos,CantMenores:this.cntMenores,ArraySeleccion:this.arraySeleccion,strTipo:this.evento.strTipo});
    }
  }

  getDetalleForo(id){
    if(id!=undefined){
      this.conexionesApi.getDetalleForo(id)
      .then((data:ForoModelo) => {
        this.evento.modeloForo = data;
        console.log(this.evento.modeloForo);
        
        this.numFilas = this.evento.modeloForo.cantAsientos/9;
        this.contador=0;
        for(var i:number =0;i<this.numFilas;i++){
        this.matAsientos[i]=[];
        for(var j:number=0;j<9;j++){
        this.matAsientos[i][j]= this.evento.modeloForo.arrayAsientos[this.contador];
        this.contador++;
      }
    }


      });
    }
  }
}
 