import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
/**
 * Generated class for the CadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  public formCadastro: FormGroup;
  public senhaDiferente: Boolean = false;

  public showPass = false;
  public type = "password";
  public nameEye = "eye-off";

  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder,) {
    let emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

    this.formCadastro = fb.group({
      email: [null, Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      senha: [null, [Validators.required, Validators.minLength(6)]],
      confirmaSenha: [null, [Validators.required, Validators.minLength(6)]],
      nome: [null, [Validators.required]],
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

  submit() {
    if(this.formCadastro.value.confirmaSenha != this.formCadastro.value.senha){
      this.senhaDiferente = true;
    }else{
      console.log(this.formCadastro.value)
    }
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

}
