import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { EventoModelo } from '../../modelos/evento.model';
import { ApiService } from '../../general/conexionesApi';
import { ConfigGeneral } from '../../general/configGeneral';

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
		this.getDetalle(this.idEvento);
    /*this.evento=new EventoModelo({
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
			nmbCostoAdulto:700.0,
			nmbCostoMenor:700.0
		});*/
		//this.cntAdultos= this.cntMenores =1;
		
	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagarPage');
  }

  pagar(){
		this.payment = new PayPalPayment(''+this.total, 'MXN', 'AVENTOURAGS', 'sale');
    this.payPal.init({
			PayPalEnvironmentProduction: '',
			PayPalEnvironmentSandbox: 'AXY8tnUjzkko_FSqywfO1EM6acDa_98dRON1NNKk2NSxyxBgWXwOnNPAT3SeByCcUmeQ3m8DyXwAb8qF'
		}).then(() => {
			this.payPal.prepareToRender(this.payPalEnvironment, new PayPalConfiguration({})).then(() => {
				this.payPal.renderSinglePaymentUI(this.payment).then((response) => {
					alert(`Successfully paid. Status = ${response.response.state}`);
					console.log(response);
					
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
	
	getDetalle(id){
    if(id!=undefined){
      this.conexionesApi.getDetalleEvento(id)
      .then((data:EventoModelo) => {
        this.evento = data;
				console.log(this.evento);
				this.totalAdultos=this.cntAdultos*this.evento.nmbCostoAdulto;
				this.totalMenores=this.cntMenores*this.evento.nmbCostoMenor;
				this.subTotal=(this.totalAdultos+this.totalMenores);
				this.comision=this.subTotal*0.10;
				this.total=this.subTotal+this.comision;
        if(this.evento.strTipo=="CONCIERTOS"){
          
        }else if(this.evento.strTipo=="DEPORTES"){
          
        }else if(this.evento.strTipo=="MUSEO"){
          
        }else if(this.evento.strTipo=="TEATRO"){
          
        }else if(this.evento.strTipo=="TOURS"){
          
        }
      });
    }
  }

}
