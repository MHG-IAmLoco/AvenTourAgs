import { Component,OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ImageViewerController } from "ionic-img-viewer";
import { GaleriaModelo } from '../../modelos/galeria.model';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { ApiService } from '../../general/conexionesApi';
import { ConfigGeneral } from '../../general/configGeneral';
 
@Component({
  selector: 'galeria',
  templateUrl: 'galeria.html',
})
export class GaleriaPage implements OnInit{
  Galeria:GaleriaModelo = new GaleriaModelo();
  images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg','5.jpg','6.jpg','7.jpg','8.jpg','9.jpg','10.jpg','11.jpg','12.jpg',
  '13.jpg','14.jpg','15.jpg','16.jpg','17.jpg','18.jpg','19.jpg','20.jpg','21.jpg','22.jpg','23.jpg','24.jpg','25.jpg'];
 
  constructor(
    public navCtrl: NavController, 
    public imageViewerCtrl: ImageViewerController, 
    private tts:TextToSpeech,
    public navParams: NavParams,
    private conexionesApi: ApiService,
    public configGeneral:ConfigGeneral
  ) {
    this.getGaleria(navParams.get('_id'));
    /*this.arrayGaleria.push(new GaleriaModelo({
      _id:"1",
      strTitulo:"CALLE ZARAGOZA",
      strDescripcion:"Ubicada en el centro de Aguascalientes",
      strImagenPrincipal:"assets/img/1.jpg",
      arrayImagenes:[]
    }));

    this.arrayGaleria.push(new GaleriaModelo({
      _id:"2",
      strTitulo:"PRESA DE MALPASO",
      strDescripcion:"Ubicada en Calvillo, Ags",
      strImagenPrincipal:"assets/img/2.jpg",
      arrayImagenes:[]
    }));
    
    this.arrayGaleria.push(new GaleriaModelo({
      _id:"3",
      strTitulo:"RESTAURANT 'PLAYAS'",
      strDescripcion:"Ubicado en San José de Gracia, Ags",
      strImagenPrincipal:"assets/img/3.jpg",
      arrayImagenes:[]
    }));

    this.arrayGaleria.push(new GaleriaModelo({
      _id:"4",
      strTitulo:"TRES CENTURIAS",
      strDescripcion:"Ubicada en Aguascalientes, Ags",
      strImagenPrincipal:"assets/img/4.jpg",
      arrayImagenes:[]
    }));

    this.arrayGaleria.push(new GaleriaModelo({
      _id:"5",
      strTitulo:"CHASKA",
      strDescripcion:"Aperitivo tradicional hidrocalido",
      strImagenPrincipal:"assets/img/5.jpg",
      arrayImagenes:[]
    }));

    this.arrayGaleria.push(new GaleriaModelo({
      _id:"6",
      strTitulo:"TEMPLO DE SAN ANTONIO",
      strDescripcion:"Ubicado en el centro de Aguascalientes",
      strImagenPrincipal:"assets/img/6.jpg",
      arrayImagenes:[]
    }));

    this.arrayGaleria.push(new GaleriaModelo({
      _id:"7",
      strTitulo:"PLAZA PRINCIPAL CALVILLO",
      strDescripcion:"Ubicada en Calvillo,Ags",
      strImagenPrincipal:"assets/img/7.jpg",
      arrayImagenes:[]
    }));

    this.arrayGaleria.push(new GaleriaModelo({
      _id:"8",
      strTitulo:"PARROQUIA DE NUESTRA SEÑORA DE BELÉN",
      strDescripcion:"Ubicada en Real de Asientos,Ags",
      strImagenPrincipal:"assets/img/8.jpg",
      arrayImagenes:[]
    }));

    this.arrayGaleria.push(new GaleriaModelo({
      _id:"9",
      strTitulo:"RIO EN SAN JOSÉ",
      strDescripcion:"Ubicado en San José de Gracia, Ags",
      strImagenPrincipal:"assets/img/9.jpg",
      arrayImagenes:[]
    }));

    this.arrayGaleria.push(new GaleriaModelo({
      _id:"10",
      strTitulo:"CATEDRAL DE NUESTRA SEÑORA DE LA ASUNCIÓN",
      strDescripcion:"Ubicada en el centro de Aguascalientes",
      strImagenPrincipal:"assets/img/10.jpg",
      arrayImagenes:[]
    }));*/
  }
  onClick(imageToView) {
    const viewer = this.imageViewerCtrl.create(imageToView)
    viewer.present();
  }
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'impleme
    this.Speack();
  }
  async Speack(): Promise<any> {
    try {
      await this.tts.speak({text:"Aguascalientes cuenta con una capital y tres pueblos mágicos, presiona la imágen que prefieras para conocer más de ellos."
      ,locale:"es-MX"});
      console.log("Se reprodujo exitosamente");
    } catch (error) {
      console.log(error);
    }
  }

  getGaleria(strId){
    if(strId!=undefined){
      this.conexionesApi.getDetalleGaleria(strId)
      .then((data:GaleriaModelo) => {
        this.Galeria = data;
        console.log(this.Galeria);
      });
    }
  }
}
