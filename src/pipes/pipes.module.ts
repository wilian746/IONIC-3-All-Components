import { NgModule } from '@angular/core';
import { SomaNumeroPipe } from './soma-numero/soma-numero';
import { TransformaMinusculoPipe } from './transforma-minusculo/transforma-minusculo';
@NgModule({
	declarations: [
    SomaNumeroPipe,
    TransformaMinusculoPipe],
	imports: [],
	exports: [
    SomaNumeroPipe,
    TransformaMinusculoPipe]
})
export class PipesModule {}
