import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SomaNumeroPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'somaNumero',
})
export class SomaNumeroPipe implements PipeTransform {

  transform(value:any, arg1:any, arg2:any) {
    value = parseInt(arg1) + parseInt(arg2)
    return value;
  }
}
