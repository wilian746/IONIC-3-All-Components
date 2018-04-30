import { Component } from '@angular/core';
import { ViewController, NavParams, NavController, ToastController } from 'ionic-angular';
import { File } from '@ionic-native/file';
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
  public path: any
  public archive: any

  public pinRegistrado
  constructor(
    public view: ViewController,
    public file: File,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public navCtrl: NavController) {
      this.path = file.dataDirectory;
      this.archive = 'PIN.txt'

      this.pinRegistrado = navParams.get('pin')
  }

  close(){
    this.view.dismiss()
  }

  salvaPIN(){
    if (this.pinRegistrado) {
      if(this.pinRegistrado === this.pin) {
        this.mostraMenssagem('Bem vindo!', 3500)
        this.view.dismiss()
        this.navCtrl.setRoot('TestePage')
      } else {
        this.mostraMenssagem('Os pins não são iguais, por favor realize o login novamente', 3500)
        this.view.dismiss()
      }
    } else {
      this.file.writeFile(this.path, this.archive, this.pin, { replace: true }).then((res) => {
        this.mostraMenssagem('PIN criado com sucesso, no próximo login basta digitar o pin!', 3500)
        this.view.dismiss()
        this.navCtrl.setRoot('TestePage')
      }).catch((err) => this.mostraMenssagem('Erro ao criar PIN!', 3500));
    }
  }

  mostraMenssagem(message: string, duration?: number) {
    let menssagem = this.toastCtrl.create({
      message: message,
      duration: duration,
      showCloseButton: true,
      closeButtonText: "Ok"
    });
    menssagem.present();
  }
}
