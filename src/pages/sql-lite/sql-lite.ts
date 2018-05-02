import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
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
    public modal: ModalController) {
  }

  ionViewDidLoad() {
    this.adquirirTodos()
  }

  adquirirTodos(){
    this.pessoas = new Array<PessoaDto>();
    this.pessoaProvider.retornaTodasPessoas()
    .then((result: Array<PessoaDto>) => {
      this.pessoas = result;
    })
    .catch(erro => {
      this.alerta(erro);
    });
  }
  alerta(mensagem){
    let alert = this.alertCtrl.create({
      title: 'Atenção',
      subTitle: mensagem,
      buttons: ['OK']
    });
    alert.present();
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
    }).catch((err)=>{
      this.alerta('Erro ao deletar pessoa')
    })
  }
}
