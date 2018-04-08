import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaTicketsPage } from './lista-tickets';

@NgModule({
  declarations: [
    ListaTicketsPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaTicketsPage),
  ],
})
export class ListaTicketsPageModule {}
