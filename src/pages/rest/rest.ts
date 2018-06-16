import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { ProdutosProvider } from '../../providers/produtos/produtos';
import { EditarProdutoRestComponent } from '../../components/editar-produto-rest/editar-produto-rest';

/**
 * Generated class for the RestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rest',
  templateUrl: 'rest.html',
})
export class RestPage {

  public produtos: any = [];
  public resposta: any = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public produtosProvider: ProdutosProvider,
    public modal: ModalController,) {
  }

  ionViewDidLoad() {
    this.getAllProdutos()
  }

  getAllProdutos() {
    this.produtosProvider.getProdutos().then((result) => {
      console.log('deu certo: ', result)
      this.produtos = result
      this.mostraMenssagem('Busca realizada com sucesso!', 5000)
    }).catch((err) => {
      this.mostraMenssagem('Erro ao conectar no servidor', 5000)
    })
  }
  editar(id) {
    const AlterarProdutosModal = this.modal.create(EditarProdutoRestComponent, {id: id});

    AlterarProdutosModal.onDidDismiss(() => {
      this.getAllProdutos()
    });

    AlterarProdutosModal.present();
  }

  deletar(id) {
    this.produtosProvider.deleteProdutos(id).then(() => {
      this.mostraMenssagem('Produto excluído com sucesso', 3000)
      setTimeout(() => {
        this.getAllProdutos()
      }, 200);
    }).catch((err) => {
      this.mostraMenssagem('Erro ao conectar no servidor', 5000)
    })
  }

  incluir() {
    this.navCtrl.push('CriarProdutoRestPage')
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
