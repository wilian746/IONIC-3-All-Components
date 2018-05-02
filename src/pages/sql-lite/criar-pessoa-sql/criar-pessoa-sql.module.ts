import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CriarPessoaSqlPage } from './criar-pessoa-sql';

@NgModule({
  declarations: [
    CriarPessoaSqlPage,
  ],
  imports: [
    IonicPageModule.forChild(CriarPessoaSqlPage),
  ],
})
export class CriarPessoaSqlPageModule {}
