import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, ToastController } from 'ionic-angular';
import { PessoaDto } from '../../model/pessoaDto';
import { PessoaSqlProvider } from '../../providers/pessoa-sql/pessoa-sql';
import { EditarPessoaSqlComponent } from '../../components/editar-pessoa-sql/editar-pessoa-sql';

/**
 * Generated class for the SqlLitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sql-lite',
  templateUrl: 'sql-lite.html',
})
export class SqlLitePage {

  public pessoas: Array<PessoaDto>
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl : AlertController,
    public pessoaProvider: PessoaSqlProvider,
    public modal: ModalController,
    public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.adquirirTodos()
  }

  adquirirTodos(){
    this.pessoas = new Array<PessoaDto>();
    this.pessoaProvider.retornaTodasPessoas()
    .then((result: Array<PessoaDto>) => {
      this.pessoas = result;
      this.mostraMenssagem('Busca realizada com sucesso!', 5000)
    })
    .catch(erro => {
      this.mostraMenssagem('Erro ao conectar no servidor', 5000)
    });
  }

  criar(){
    this.navCtrl.push('CriarPessoaSqlPage')
  }

  editar(_pessoa){
    const AlterarPessoaModal = this.modal.create(EditarPessoaSqlComponent, {pessoa: _pessoa});

    AlterarPessoaModal.onDidDismiss(() => {
      this.adquirirTodos()
    });

    AlterarPessoaModal.present();
  }

  deletar(id){
    this.pessoaProvider.deletarPessoa(id).then(()=>{
      this.adquirirTodos()
    }).catch((err) => {
      this.mostraMenssagem('Erro ao conectar no servidor', 5000)
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
