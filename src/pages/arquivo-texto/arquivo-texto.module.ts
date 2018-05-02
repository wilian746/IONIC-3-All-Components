import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArquivoTextoPage } from './arquivo-texto';

@NgModule({
  declarations: [
    ArquivoTextoPage,
  ],
  imports: [
    IonicPageModule.forChild(ArquivoTextoPage),
  ],
})
export class ArquivoTextoPageModule {}
