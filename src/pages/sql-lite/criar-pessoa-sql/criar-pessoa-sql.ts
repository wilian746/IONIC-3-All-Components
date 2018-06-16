import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController, App, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PessoaDto } from '../../../model/pessoaDto';
import { PessoaSqlProvider } from '../../../providers/pessoa-sql/pessoa-sql';
import { Camera, CameraOptions } from '@ionic-native/camera';
/**
 * Generated class for the CriarPessoaSqlPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-criar-pessoa-sql',
  templateUrl: 'criar-pessoa-sql.html',
})
export class CriarPessoaSqlPage {

  public formCadastro: FormGroup;
  public senhaDiferente: Boolean = false;
  public pessoaDto: PessoaDto
  public showPass = false;
  public type = "password";
  public nameEye = "eye-off";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb: FormBuilder,
    public alertCtrl: AlertController,
    public pessoaProvider: PessoaSqlProvider,
    public view: ViewController,
    public app: App,
    public camera: Camera,
    public toastCtrl: ToastController) {
    let emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

    this.formCadastro = fb.group({
      email: [null, Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      senha: [null, [Validators.required, Validators.minLength(6)]],
      confirmaSenha: [null, [Validators.required, Validators.minLength(6)]],
      nome: [null, [Validators.required]],
      foto: [null]
    })
  }

  ionViewDidLoad() {
    this.pessoaDto = new PessoaDto();
  }

  submit() {
    this.pessoaDto.Email = this.formCadastro.value.email
    this.pessoaDto.Senha = this.formCadastro.value.senha
    this.pessoaDto.Nome = this.formCadastro.value.nome
    this.pessoaDto.Foto = this.formCadastro.value.foto

    if(this.formCadastro.value.confirmaSenha != this.formCadastro.value.senha){
      this.senhaDiferente = true;
    }else{
      if(!this.pessoaDto.Email){
        this.mostraMenssagem('Digite o email')
        return
      } else
      if(!this.pessoaDto.Senha){
        this.mostraMenssagem('Digite a senha')
        return
      } else
      if(!this.pessoaDto.Nome){
        this.mostraMenssagem('Digite o nome')
        return
      } else {
        this.pessoaProvider.criarPessoa(this.pessoaDto).then(()=>{
          let nav = this.app.getRootNav();
          nav.setRoot('SqlLitePage');
        }).catch(()=>{
          this.mostraMenssagem('Erro ao criar Pessoa')
        })
      }
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

  salvarFoto(){
    let configuracoes : CameraOptions = {
      targetWidth:800,
      targetHeight:600,
      quality: 50,
      correctOrientation: true,
      saveToPhotoAlbum:true,
      encodingType: this.camera.EncodingType.JPEG,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA
    }
    this.camera.getPicture(configuracoes).then((res) => {
      this.formCadastro.value.foto = "data:image/jpeg;base64," + res;
    })
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
