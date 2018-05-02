import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SqlLitePage } from './sql-lite';

@NgModule({
  declarations: [
    SqlLitePage,
  ],
  imports: [
    IonicPageModule.forChild(SqlLitePage),
  ],
})
export class SqlLitePageModule {}
