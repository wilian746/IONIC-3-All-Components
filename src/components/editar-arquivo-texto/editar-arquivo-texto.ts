import { Component } from '@angular/core';

/**
 * Generated class for the EditarArquivoTextoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'editar-arquivo-texto',
  templateUrl: 'editar-arquivo-texto.html'
})
export class EditarArquivoTextoComponent {

  text: string;

  constructor() {
    console.log('Hello EditarArquivoTextoComponent Component');
    this.text = 'Hello World';
  }

}
