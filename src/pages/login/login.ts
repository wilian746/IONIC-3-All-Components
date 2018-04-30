import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder) {
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
  cadastrar() {
    this.navCtrl.push('CadastroPage');
  }

}
