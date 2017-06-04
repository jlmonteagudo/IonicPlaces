import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListAreasPage } from './list-areas';

@NgModule({
  declarations: [
    ListAreasPage,
  ],
  imports: [
    IonicPageModule.forChild(ListAreasPage),
  ],
  exports: [
    ListAreasPage
  ]
})
export class ListAreasModule {}
