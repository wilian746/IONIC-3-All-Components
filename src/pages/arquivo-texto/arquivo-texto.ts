import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { EditarArquivoTextoComponent } from '../../components/editar-arquivo-texto/editar-arquivo-texto';

/**
 * Generated class for the ArquivoTextoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-arquivo-texto',
  templateUrl: 'arquivo-texto.html',
})
export class ArquivoTextoPage {
  public texto: any = '';
  public diretorio: any;
  public nomeArquivo:any;
  public erroDePesquisa: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public file: File,
    public alertCtrl: AlertController,
    public modal: ModalController) {
      this.diretorio = this.file.dataDirectory;
      this.nomeArquivo = 'arquivo.txt';
  }

  ionViewDidLoad() {
    this.conferirSeExiste()
  }

  conferirSeExiste(){
    this.file.readAsText(this.diretorio, this.nomeArquivo)
    .then((ok) => {
      this.texto = ok;
    })
    .catch((err) => {
      this.erroDePesquisa = err
      if (this.erroDePesquisa.message = "NOT_FOUND_ERR") {
        this.alerta('ERRO!', 'NÃO EXISTE NENHUM ARQUIVO TEXTO')
        this.texto = null
      } else {
        console.log('Deu errado', err)
      }
    });
  }

  alerta(titulo, mensagem){
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensagem,
      buttons: ['OK']
    });
    alert.present();
  }

  criar(){
    if(this.texto === null){
      this.navCtrl.push('CriarArquivoTextoPage')
    } else {
      this.alerta('ATENÇÃO!', 'Já existe um arquivo texto cadastrado, por favor altere ou delete o atual')
    }
  }

  editar(){
    const ArquivoTextoModal = this.modal.create(EditarArquivoTextoComponent);
    ArquivoTextoModal.onDidDismiss(() => {
      this.conferirSeExiste()
    });
    ArquivoTextoModal.present();
  }
  deletar(){

    this.file.removeFile(this.diretorio, this.nomeArquivo).then((res) => {
      console.log(res)
      this.alerta("Sucesso!", "Deletado com sucesso");
      this.texto = null
    })
    .catch((err) => this.alerta("Atenção", "Erro ao deletar" + JSON.stringify(err)));
  }
}
