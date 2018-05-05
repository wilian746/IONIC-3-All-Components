import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
/**
 * Generated class for the EmailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-email',
  templateUrl: 'email.html',
})
export class EmailPage {

  public email: any;
  public tituloEmail: any;
  public corpoEmail: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public emailCtrl: EmailComposer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmailPage');
  }

  enviarEmailDinamico(){
    this.emailCtrl.open({
      to: this.email,
      subject: this.tituloEmail,
      body: this.corpoEmail,
      isHtml: true
    });
  }
}
