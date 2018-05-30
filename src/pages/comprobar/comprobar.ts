import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the ComprobarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comprobar',
  templateUrl: 'comprobar.html',
})
export class ComprobarPage {
  public verCheck:boolean;
  public verAvion:boolean;
  public verTriste: boolean;
  Estatus:string
  band:number=0;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if(this.navParams.get('Estatus')){
      this.Estatus = this.navParams.get('Estatus');
    }
    //this.Estatus='Aprobado';
    if(this.Estatus=='Aprobado'){
      this.verCheck=true;
      this.verAvion=false;
      this.verTriste=false;
    }else if(this.Estatus=='Promocion'){
      this.verCheck=false;
      this.verAvion=true;
      this.verTriste=false;
    }else{
      this.verCheck=false;
      this.verAvion=false;
      this.verTriste=true;
    }
  }

  ionViewDidLoad() {
    setInterval(()=>{
      if(this.Estatus=='Aprobado' && this.band==0){
        this.verCheck=false;
        this.verAvion=true;
        this.band=1;
      }else if(this.Estatus=='Aprobado' && this.band==1){
        this.band=2;
      }else if(this.Estatus=='Aprobado' && this.band==2){
        this.navCtrl.setRoot(HomePage);
        this.band = 3;
      }else if(this.Estatus=='Promocion' && this.band==0){
        this.navCtrl.setRoot(HomePage);
        this.band = 3;
      }
    }, 6000);
  }

}
