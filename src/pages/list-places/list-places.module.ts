import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListPlacesPage } from './list-places';

@NgModule({
  declarations: [
    ListPlacesPage,
  ],
  imports: [
    IonicPageModule.forChild(ListPlacesPage),
  ],
  exports: [
    ListPlacesPage
  ]
})
export class ListPlacesModule {}
