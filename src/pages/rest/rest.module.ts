import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RestPage } from './rest';

@NgModule({
  declarations: [
    RestPage,
  ],
  imports: [
    IonicPageModule.forChild(RestPage),
  ],
})
export class RestPageModule {}
