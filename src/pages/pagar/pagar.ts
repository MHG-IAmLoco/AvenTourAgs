import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { EventoModelo } from '../../modelos/evento.model';
import { ApiService } from '../../general/conexionesApi';
import { ConfigGeneral } from '../../general/configGeneral';
import { ComprobarPage } from '../comprobar/comprobar';

/**
 * Generated class for the PagarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pagar',
  templateUrl: 'pagar.html',
})
export class PagarPage {
	payPalEnvironment: string = 'payPalEnvironmentSandbox';
  payment: PayPalPayment;
  evento:EventoModelo= new EventoModelo();
	cntAdultos=0;
	cntMenores=0;
	idEvento:string;
	totalAdultos=0;
	totalMenores=0;
	subTotal=0;
	comision=0;
	total=0;
	strTipo:string;
	strFecha:string;
	strHora:string;
	arraySeleccion:Array<number>;
	constructor(public navCtrl: NavController, public navParams: NavParams,private payPal: PayPal,private alertCtrl:AlertController,
		private conexionesApi: ApiService,
    public configGeneral:ConfigGeneral) {
		
		if(this.navParams.get('CantAdultos')){
      this.cntAdultos = this.navParams.get('CantAdultos');
    }
    if(this.navParams.get('CantMenores')){
      this.cntMenores = this.navParams.get('CantMenores');
    }
    if(this.navParams.get('IdEvento')){
      this.idEvento = this.navParams.get('IdEvento');
		}
		if(this.navParams.get('ArraySeleccion')){
			this.arraySeleccion = this.navParams.get('ArraySeleccion');
		}
		if(this.navParams.get('strTipo')){
			this.strTipo = this.navParams.get('strTipo');
		}
		if(this.navParams.get('strFecha')){
			this.strFecha = this.navParams.get('strFecha');
		}
		if(this.navParams.get('strHora')){
			this.strHora = this.navParams.get('strHora');
		}
		this.getDetalle(this.idEvento,this.strTipo);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagarPage');
  }

  pagar(){
		this.payment = new PayPalPayment(''+this.total, 'MXN', 'AVENTOURAGS', 'sale');
    this.payPal.init({
			PayPalEnvironmentProduction: '',
			PayPalEnvironmentSandbox: 'AZHPN1VzUkP0ppauC2UFMuTqGa8WFEL2_TWZhTW1CWGqDafwjmttox1uZH4LYvt34hpO4zq-zuGP7dds'
		}).then(() => {
			this.payPal.prepareToRender(this.payPalEnvironment, new PayPalConfiguration({})).then(() => {
				this.payPal.renderSinglePaymentUI(this.payment).then((response) => {
					//alert(`Successfully paid. Status = ${response.response.state}`);
					
					if(response.response.state == "approved"){
						console.log("Se esta pagando un: "+this.evento.strTipo);
						if(this.evento.strTipo=="CONCIERTOS" || this.evento.strTipo=="TEATRO"){
							this.putAsientosForo(this.evento._id,this.arraySeleccion,'#e78867');
						}else if(this.evento.strTipo=="MUSEO" || this.evento.strTipo=="TOURS"){
							this.putDisponibilidadEvento(this.evento._id,this.strFecha,this.strHora,(this.cntAdultos+this.cntMenores));
						}else if(this.evento.strTipo=="DEPORTES"){
							this.putDisponibilidadDeportes(this.evento._id,(this.cntAdultos+this.cntMenores));
						}
					}else{
						this.navCtrl.push(ComprobarPage,{Estatus:"rechazado"});
					}
				}, () => {
					console.log('Error or render dialog closed without being successful');
				});
			}, () => {
				console.log('Error in configuration');
			});
		}, () => {
			console.log('Error in initialization, maybe PayPal isn\'t supported or something else');
			let alert = this.alertCtrl.create({
        title: 'Aún no terminas!',
        subTitle: 'Error in initialization, maybe PayPal isn\'t supported or something else',
        buttons: ['Entendido']
      });
      alert.present();
		});
	}
	
	getDetalle(id,strTipo){
    if(id!=undefined){
      this.conexionesApi.getDetalleEvento(id,strTipo)
      .then((data:EventoModelo) => {
        this.evento = data;
				console.log(this.evento);
				this.totalAdultos=this.cntAdultos*this.evento.nmbCostoAdulto;
				this.totalMenores=this.cntMenores*this.evento.nmbCostoMenor;
				this.subTotal=(this.totalAdultos+this.totalMenores);
				this.comision=this.subTotal*0.10;
				this.total=this.subTotal+this.comision;
        
      });
    }
	}
	
	putAsientosForo(idEvento,arrayNumAsientos,strColor){
    if(idEvento!=undefined){
      this.conexionesApi.putAsientosForo(idEvento,arrayNumAsientos,strColor)
      .then((data) => {
				console.log(data);
				if(data["intStatus"]){
					if(data["intStatus"]==1){
						this.navCtrl.setRoot(ComprobarPage,{Estatus:"Aprobado"});
					}else{
						let alert = this.alertCtrl.create({
							title: '¡Algo salio mal!',
							subTitle: 'Por favor intentalo de nuevo.',
							buttons: ['Entendido']
						});
						alert.present();
					}
				}
      });
    }
	}
	
	putDisponibilidadEvento(idEvento,strFecha,strHora,nmbAsientos){
    if(idEvento!=undefined){
      this.conexionesApi.putDisponibilidadEvento(idEvento,strFecha,strHora,nmbAsientos)
      .then((data) => {
				console.log(data);
				if(data["intStatus"]){
					if(data["intStatus"]==1){
						this.navCtrl.setRoot(ComprobarPage,{Estatus:"Aprobado"});
					}else{
						let alert = this.alertCtrl.create({
							title: '¡Algo salio mal!',
							subTitle: 'Por favor intentalo de nuevo.',
							buttons: ['Entendido']
						});
						alert.present();
					}
				}
      });
    }
	}
	
	putDisponibilidadDeportes(idEvento,nmbAsientos){
    if(idEvento!=undefined){
      this.conexionesApi.putDisponibilidadDeportes(idEvento,nmbAsientos)
      .then((data) => {
				console.log(data);
				if(data["intStatus"]){
					if(data["intStatus"]==1){
						this.navCtrl.setRoot(ComprobarPage,{Estatus:"Aprobado"});
					}else{
						let alert = this.alertCtrl.create({
							title: '¡Algo salio mal!',
							subTitle: 'Por favor intentalo de nuevo.',
							buttons: ['Entendido']
						});
						alert.present();
					}
				}
      });
    }
  }

}
