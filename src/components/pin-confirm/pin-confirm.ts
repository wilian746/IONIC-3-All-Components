import { Component, ViewChild } from '@angular/core';
import { Nav, ViewController,  NavParams,  NavController,  ToastController} from 'ionic-angular';
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

  @ViewChild(Nav) nav: Nav;

  public pin: any
  public path: any
  public archive: any
  public pinRegistrado: any

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
        this.navCtrl.setRoot("ProdutoPage")
      } else {
        this.mostraMenssagem('Os pins não são iguais, por favor realize o login novamente', 3500)
        this.view.dismiss()
      }
    } else {
      this.file.writeFile(this.path, this.archive, this.pin, { replace: true }).then((res) => {
        this.mostraMenssagem('PIN criado com sucesso, no próximo login basta digitar o pin!', 3500)
        this.view.dismiss()
        console.log("ProdutoPage")
        this.navCtrl.push("ProdutoPage".toString())
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
