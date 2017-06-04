import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShortenPipe } from './shorten.pipe';

@NgModule({
  declarations: [
    ShortenPipe,
  ],
  imports: [
    IonicPageModule.forChild(ShortenPipe),
  ],
  exports: [
    ShortenPipe
  ]
})
export class AppPipesModule {}
