import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CriarArquivoTextoPage } from './criar-arquivo-texto';

@NgModule({
  declarations: [
    CriarArquivoTextoPage,
  ],
  imports: [
    IonicPageModule.forChild(CriarArquivoTextoPage),
  ],
})
export class CriarArquivoTextoPageModule {}
