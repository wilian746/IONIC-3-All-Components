import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the InputsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inputs',
  templateUrl: 'inputs.html',
})
export class InputsPage {

  public inputText:any;
  public inputNumber:any;
  public inputSelectCheckbox:any;
  public inputSelectRadio:any;
  public inputTogle:any;
  public inputDate:any;

  public modalInside: Boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InputsPage');
  }

  mostrarValores(){
    this.modalInside = !this.modalInside
    console.log(this.inputText)
    console.log(this.inputNumber)
    setTimeout(() => {
      this.modalInside = !this.modalInside
    }, 3000);
  }

}
