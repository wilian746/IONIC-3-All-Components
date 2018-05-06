import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

/**
 * Generated class for the CodBarraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cod-barra',
  templateUrl: 'cod-barra.html',
})
export class CodBarraPage {

  public numeroCodBarra: any;
  public tipoDeCodBarra: any;

  constructor(
    public navCtrl: NavController,
    public barCode: BarcodeScanner) {

  }

  lerCodBarra(){
    this.barCode.scan({
      "prompt": "Realize a leitura do codigo de barra",
      "orientation": "landscape"
    }).then((res)=>{
      this.numeroCodBarra = res.text
      this.tipoDeCodBarra = res.format
    })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CodBarraPage');
  }

}
