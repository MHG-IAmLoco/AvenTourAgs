import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
    {state: 'starter', name: 'Inicio', type: 'link', icon: 'av_timer' },
    {state: 'galeria', type: 'link', name: 'Galeria', icon: 'crop_7_5'},
    {state: 'evento', type: 'link', name: 'Eventos', icon: 'view_comfy'},
    {state: 'itinerarios', type: 'link', name: 'Itinerarios', icon: 'view_list'},
    {state: 'cupones', type: 'link', name: 'Cupones', icon: 'tab'}
]; 

@Injectable()

export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }

}
