import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoPaquetePage } from './info-paquete';

@NgModule({
  declarations: [
    InfoPaquetePage,
  ],
  imports: [
    IonicPageModule.forChild(InfoPaquetePage),
  ],
})
export class InfoPaquetePageModule {}
