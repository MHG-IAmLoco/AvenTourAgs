import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrPage } from './qr';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  declarations: [
    QrPage,
  ],
  imports: [
    IonicPageModule.forChild(QrPage),
    NgxQRCodeModule,
  ],
})
export class QrPageModule {}
