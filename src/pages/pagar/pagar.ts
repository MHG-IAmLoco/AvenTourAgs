import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';

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
  payment: PayPalPayment = new PayPalPayment('10.10', 'MXN', 'TV', 'sale');
  constructor(public navCtrl: NavController, public navParams: NavParams,private payPal: PayPal) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagarPage');
  }

  pagar(){
    this.payPal.init({
			PayPalEnvironmentProduction: '',
			PayPalEnvironmentSandbox: 'AXY8tnUjzkko_FSqywfO1EM6acDa_98dRON1NNKk2NSxyxBgWXwOnNPAT3SeByCcUmeQ3m8DyXwAb8qF'
		}).then(() => {
			this.payPal.prepareToRender('AXY8tnUjzkko_FSqywfO1EM6acDa_98dRON1NNKk2NSxyxBgWXwOnNPAT3SeByCcUmeQ3m8DyXwAb8qF', new PayPalConfiguration({})).then(() => {
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
		});
  }

}
