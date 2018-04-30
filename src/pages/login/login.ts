import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PinConfirmComponent } from '../../components/pin-confirm/pin-confirm';

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
  public continuaLogado: any
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb: FormBuilder,
    public modalCtrl: ModalController) {

    let emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/

    this.formLogin = fb.group({
      email: [null, Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      senha: [null, Validators.compose([Validators.required, Validators.minLength(6)])]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
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
    console.log(this.formLogin.value)
    let modalPin = this.modalCtrl.create(PinConfirmComponent)
    modalPin.present()
  }
  cadastrar() {
    this.navCtrl.push('CadastroPage');
  }

}
