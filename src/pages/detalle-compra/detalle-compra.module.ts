import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleCompraPage } from './detalle-compra';

@NgModule({
  declarations: [
    DetalleCompraPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleCompraPage),
  ],
})
export class DetalleCompraPageModule {}
