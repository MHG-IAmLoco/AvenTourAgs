import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapaPage } from './mapa';

@NgModule({
  declarations: [
    MapaPage,
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDKa7xerCxBbtnusdJqvjI-PlyVCpN8rDw '
    }),
    IonicPageModule.forChild(MapaPage),
    AgmDirectionModule,
  ],
})
export class MapaPageModule {}