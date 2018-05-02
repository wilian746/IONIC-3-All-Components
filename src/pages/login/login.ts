import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PinConfirmComponent } from '../../components/pin-confirm/pin-confirm';
import { File } from '@ionic-native/file';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public formLogin: FormGroup;
  public showPass = false;
  public type = "password";
  public nameEye = "eye-off";
  public continuaLogado: any;
  public path: any
  public archive: any

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb: FormBuilder,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public file: File) {

    this.path = file.dataDirectory;
    this.archive = 'PIN.txt'
    let emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/

    this.formLogin = fb.group({
      email: [null, Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      senha: [null, Validators.compose([Validators.required, Validators.minLength(6)])]
    })
  }

  ionViewDidLoad() {
    this.file.readAsText(this.path, this.archive).then((res)=>{
      let modalPin = this.modalCtrl.create(PinConfirmComponent, {pin: res})
      modalPin.present()
    }).catch((err)=> {
      this.mostraMenssagem('Olá, Realize login e registre um novo pin', 3500)
    })
  }
  showPassword() {
    this.showPass = !this.showPass;
    if (this.showPass) {
      this.type = "text";
      this.nameEye = "eye";
    }
    else {
      this.type = "password";
      this.nameEye = "eye-off";
    }
  }
  login(){
    let modalPin = this.modalCtrl.create(PinConfirmComponent)
    modalPin.present()
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
