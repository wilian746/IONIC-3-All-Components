import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CriarProdutoFirebasePage } from './criar-produto-firebase';

@NgModule({
  declarations: [
    CriarProdutoFirebasePage,
  ],
  imports: [
    IonicPageModule.forChild(CriarProdutoFirebasePage),
  ],
})
export class CriarProdutoFirebasePageModule {}
