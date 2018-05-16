import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AsientoModelo } from '../../modelos/asiento.model';
import { ForoModelo } from '../../modelos/foro.model';
import { PagarPage } from '../pagar/pagar';

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
  contador:number;
  colorSel = '#f5a34b';
  colorDisp = '#b9bdc0';
  colorOcup = 'e78867';
  //colorOcup = '#d92129';
  matAsientos:AsientoModelo[][];
  numFilas:number;
  asientosSel=0;
  asientosReq:number;
  cntAdultos=0;
  cntMenores=0;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
    if(this.navParams.get('CantAdultos')){
      this.cntAdultos = this.navParams.get('CantAdultos');
    }
    if(this.navParams.get('CantMenores')){
      this.cntMenores = this.navParams.get('CantMenores');
    }
    this.asientosReq=this.cntAdultos+this.cntMenores
    this.matAsientos = [];
    this.foroEvento = new ForoModelo({
      _id:'1',
      cantAsientos:18,
      arrayAsientos:[]
    });

    for(var i:number =0;i<this.foroEvento.cantAsientos;i++){
      this.foroEvento.arrayAsientos[i]=new AsientoModelo({
        _id:''+(i+1),
        numAsiento:(i+1),
        strColor:this.colorDisp
      })
    }
    this.foroEvento.arrayAsientos[0].strColor=this.colorOcup;
    this.numFilas = this.foroEvento.cantAsientos/9;
    this.contador=0;
    for(var i:number =0;i<this.numFilas;i++){
      this.matAsientos[i]=[];
      for(var j:number=0;j<9;j++){
        this.matAsientos[i][j]= this.foroEvento.arrayAsientos[this.contador];
        this.contador++;
      }
    }

    //this.foroEvento.arrayAsientos[3][2].strColor=this.colorOcup;
    //this.foroEvento.arrayAsientos[1][6].strColor=this.colorOcup;
    //this.foroEvento.arrayAsientos[7][7].strColor=this.colorOcup;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SeleccionPage');
  }

  cambioColor(asientoAux){
    if(this.foroEvento.arrayAsientos[(asientoAux-1)].strColor==this.colorDisp){
      if(this.asientosSel<this.asientosReq){
        this.foroEvento.arrayAsientos[(asientoAux-1)].strColor=this.colorSel;
        this.asientosSel++;
      }
    }else if(this.foroEvento.arrayAsientos[(asientoAux-1)].strColor==this.colorOcup){

    }else if(this.foroEvento.arrayAsientos[(asientoAux-1)].strColor==this.colorSel){
      this.foroEvento.arrayAsientos[(asientoAux-1)].strColor=this.colorDisp;
      this.asientosSel--;
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
      this.navCtrl.push(PagarPage);
    }
  }

}
