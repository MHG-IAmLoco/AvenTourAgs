import { Routes } from '@angular/router';

import { GaleriaComponent } from './galeria/galeria.component';
import { EventosComponent } from './eventos/eventos.component';
import { ItinerariosComponent } from './itinerarios/itinerarios.component'; 
import { MenuComponent } from './menu/menu.component';
import { TabsComponent } from './tabs/tabs.component'; 
import { StepperComponent } from './stepper/stepper.component'; 
import { ExpansionComponent } from './expansion/expansion.component'; 
import { ChipsComponent } from './chips/chips.component';
import { CuponesComponent } from './cupones/cupones.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProgressSnipperComponent } from './progress-snipper/progress-snipper.component'; 
import { ProgressComponent } from './progress/progress.component';
import { DialogComponent } from './dialog/dialog.component';
import { TooltipComponent } from './tooltip/tooltip.component'; 
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SliderComponent } from './slider/slider.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';


export const MaterialRoutes: Routes = [
    {
      path: 'galeria',
      component: GaleriaComponent
    }, {
      path: 'evento',
      component: EventosComponent
    }, {
      path: 'itinerarios',
      component: ItinerariosComponent
    }, {
      path: 'menu',
      component: MenuComponent
    }, {
      path: 'tabs',
      component: TabsComponent
    }, {
      path: 'stepper',
      component: StepperComponent
    }, {
      path: 'expansion',
      component: ExpansionComponent
    }, {
      path: 'chips',
      component: ChipsComponent
    }, {
      path: 'toolbar',
      component: ToolbarComponent
    }, {
      path: 'progress-snipper',
      component: ProgressSnipperComponent
    }, {
      path: 'progress',
      component: ProgressComponent
    }, {
      path: 'dialog',
      component: DialogComponent
    }, {
      path: 'tooltip',
      component: TooltipComponent
    }, {
      path: 'snackbar',
      component: SnackbarComponent
    }, {
      path: 'slider',
      component: SliderComponent
    }, {
      path: 'cupones',
      component: CuponesComponent
    }
];
