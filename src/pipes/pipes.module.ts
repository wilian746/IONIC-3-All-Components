import { NgModule } from '@angular/core';
import { MypipePipe } from './mypipe/mypipe';
import { SomaNumeroPipe } from './soma-numero/soma-numero';
@NgModule({
	declarations: [MypipePipe,
    SomaNumeroPipe],
	imports: [],
	exports: [MypipePipe,
    SomaNumeroPipe]
})
export class PipesModule {}
