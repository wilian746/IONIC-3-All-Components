import { Component } from '@angular/core';
import { ViewController, NavParams, NavController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PessoaDto } from '../../model/pessoaDto';
import { PessoaSqlProvider } from '../../providers/pessoa-sql/pessoa-sql';
import { CameraOptions, Camera } from '@ionic-native/camera';

@Component({
  selector: 'editar-pessoa-sql',
  templateUrl: 'editar-pessoa-sql.html'
})
export class EditarPessoaSqlComponent {

  public formEditar: FormGroup;
  public pessoa: any;
  public pessoaDto: PessoaDto
  public senhaDiferente: Boolean = false;

  constructor(
    public view: ViewController,
    public fb: FormBuilder,
    public navParams: NavParams,
    public navCtrl: NavController,
    public pessoaProvider: PessoaSqlProvider,
    public alertCtrl: AlertController,
    public camera: Camera) {

      this.pessoa = navParams.get('pessoa')

      let emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

      this.formEditar = fb.group({
        id: [this.pessoa.IdPessoa],
        email: [this.pessoa.Email, Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
        senha: [this.pessoa.Senha, [Validators.required, Validators.minLength(6)]],
        confirmaSenha: [this.pessoa.Senha, [Validators.required, Validators.minLength(6)]],
        nome: [this.pessoa.Nome, [Validators.required]],
        foto: [this.pessoa.Foto]
      })
  }
  ionViewDidLoad() {
    this.pessoaDto = new PessoaDto();
  }
  submit(){
    this.pessoaDto.Email = this.formEditar.value.email
    this.pessoaDto.Senha = this.formEditar.value.senha
    this.pessoaDto.Nome = this.formEditar.value.nome
    this.pessoaDto.Foto = this.formEditar.value.foto
    this.pessoaDto.IdPessoa = this.formEditar.value.id
    if(this.formEditar.value.confirmaSenha != this.formEditar.value.senha){
      this.senhaDiferente = true;
    }else{
      if(!this.pessoaDto.Email){
        this.alerta('Digite o email')
        return
      } else
      if(!this.pessoaDto.Senha){
        this.alerta('Digite a senha')
        return
      } else
      if(!this.pessoaDto.Nome){
        this.alerta('Digite o nome')
        return
      } else {
        this.pessoaProvider.editarPessoa(this.pessoaDto).then((res)=>{
          this.view.dismiss()
        }).catch((err)=>{
          this.alerta('Erro ao Editar')
        })
      }
    }
  }

  closeModal(){
    this.view.dismiss()
  }

  alerta(mensagem){
    let alert = this.alertCtrl.create({
      title: 'Atenção',
      subTitle: mensagem,
      buttons: ['OK']
    });
    alert.present();
  }

  salvarFoto(e){
    e.preventDefault();

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
      this.formEditar.value.foto = "data:image/jpeg;base64," + res;
    })
  }
}
