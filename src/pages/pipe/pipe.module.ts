import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PipePage } from './pipe';
import { PipesModule } from '../../pipes/pipes.module';


@NgModule({
  declarations: [
    PipePage,
  ],
  imports: [
    IonicPageModule.forChild(PipePage),
    PipesModule
  ],
})
export class PipePageModule {}
