import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the PinConfirmComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pin-confirm',
  templateUrl: 'pin-confirm.html'
})
export class PinConfirmComponent {

  public pin: any

  constructor(public view: ViewController) {
  }

  close(){
    this.view.dismiss()
  }

  salvaPIN(){
    console.log(this.pin)
  }
}
