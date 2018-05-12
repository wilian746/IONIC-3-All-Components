import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CriarProdutoRestPage } from './criar-produto-rest';

@NgModule({
  declarations: [
    CriarProdutoRestPage,
  ],
  imports: [
    IonicPageModule.forChild(CriarProdutoRestPage),
  ],
})
export class CriarProdutoRestPageModule {}
