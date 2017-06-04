import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapPlacesPage } from './map-places';

@NgModule({
  declarations: [
    MapPlacesPage,
  ],
  imports: [
    IonicPageModule.forChild(MapPlacesPage),
  ],
  exports: [
    MapPlacesPage
  ]
})
export class MapPlacesModule {}
