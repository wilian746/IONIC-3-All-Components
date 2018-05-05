import { Component } from '@angular/core';
import { ViewController, AlertController } from 'ionic-angular';
import { File } from '@ionic-native/file';

/**
 * Generated class for the EditarArquivoTextoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'editar-arquivo-texto',
  templateUrl: 'editar-arquivo-texto.html'
})
export class EditarArquivoTextoComponent {

  public texto: any;
  public diretorio: any;
  public nomeArquivo: any;
  public erroDePesquisa: any;

  constructor(
    public view: ViewController,
    public alertCtrl: AlertController,
    public file: File) {
      this.diretorio = this.file.dataDirectory;
      this.nomeArquivo = 'arquivo.txt';
  }
  ionViewDidLoad() {
    this.file.readAsText(this.diretorio, this.nomeArquivo)
    .then((response) => {
      this.texto = response;
    })
    .catch((err) => {
      this.erroDePesquisa = err
      if (this.erroDePesquisa.message = "NOT_FOUND_ERR") {
        this.alerta('NÃO EXISTE NENHUM ARQUIVO TEXTO')
        this.texto = null
      } else {
        console.log('Deu errado', err)
      }
    });
  }
  submit(){
    this.file.writeFile(this.diretorio, this.nomeArquivo, this.texto, { replace: true })
    .then((result) => {
      this.view.dismiss()
    })
    .catch((err) => this.alerta("Erro ao criar arquivo texto " + JSON.stringify(err)));
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

}
