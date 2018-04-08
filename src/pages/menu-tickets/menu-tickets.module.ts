import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuTicketsPage } from './menu-tickets';

@NgModule({
  declarations: [
    MenuTicketsPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuTicketsPage),
  ],
})
export class MenuTicketsPageModule {}
