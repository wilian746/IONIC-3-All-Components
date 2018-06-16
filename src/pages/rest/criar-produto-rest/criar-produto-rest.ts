import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, App } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ProdutosProvider } from '../../../providers/produtos/produtos';

/**
 * Generated class for the CriarProdutoRestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-criar-produto-rest',
  templateUrl: 'criar-produto-rest.html',
})
export class CriarProdutoRestPage {
  private formProduto: FormGroup;
  public loading
  public resultCreate: any;
  constructor(
    public fb: FormBuilder,
    public produtos: ProdutosProvider,
    public navParams: NavParams,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public app: App) {

      this.formProduto = fb.group({
        nome: [null, [Validators.required]],
        marca: [null, [Validators.required]],
        valor: [null, [Validators.required]],
        quantidade: [null, [Validators.required]]
      })
  }

  ionViewDidLoad() {
  }

  submit(){
    this.showLoader();
    this.produtos.criarProdutos(this.formProduto.value).then((res)=>{
      this.resultCreate = res
      this.loading.dismiss()
      this.mostraMenssagem(this.resultCreate.message, 2500)
      let nav = this.app.getRootNav();
      nav.setRoot('RestPage');
    }).catch((err) => {
      this.loading.dismiss()
      this.mostraMenssagem('Erro ao conectar no servidor', 5000)
    })
  }
  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });

    this.loading.present();
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
