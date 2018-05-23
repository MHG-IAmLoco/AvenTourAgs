import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaActividadPage } from './lista-actividad';

@NgModule({
  declarations: [
    ListaActividadPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaActividadPage),
  ],
})
export class ListaActividadPageModule {}
