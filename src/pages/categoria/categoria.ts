import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CategoriaProvider } from '../../providers/categoria/categoria';
import { CategoriaDto } from '../../Model/categoriaDto';

@IonicPage()
@Component({
  selector: 'page-categoria',
  templateUrl: 'categoria.html',
})
export class CategoriaPage {
  
  categorias : Array<CategoriaDto>;
  categoriaDto : CategoriaDto;
  mensagem : String = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public categoriaProvider : CategoriaProvider,
    private alertCtrl: AlertController
  ) {
    this.limparTela();
    this.carregarCategorias();
  }

  carregarCategorias(){
    this.categorias = new Array<CategoriaDto>();
    console.log(this.categorias);

    this.categoriaProvider.getAll()
      .then((categorias: Array<CategoriaDto>) => {
        this.categorias = categorias;            
      })
      .catch(erro => this.alerta(erro));      
  }

  ionViewDidLoad() {
  }

  alerta(mensagem)
  { 
    let alert = this.alertCtrl.create({
      title: 'Atenção',
      subTitle: mensagem,
      buttons: ['OK']
    });
    alert.present();
  }

  excluir (categoriaDto)
  {
    let confirm = this.alertCtrl.create({
      title: 'Atenção',
      message: 'Deseja realmente excluir esta categoria (' + categoriaDto.descricao + ') ?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
            return;
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.excluirCategoria(categoriaDto.idCategoria);
          }
        }
      ]
    });
    confirm.present();
  }

  excluirCategoria(id)
  {
    this.categoriaProvider.delete(id)
      .then( ok => this.carregarCategorias() )
      .catch( erro => this.alerta(erro));
  }

  editar(categoriaDto)
  {
    console.log(categoriaDto);
    this.categoriaDto = categoriaDto;
  }

  salvar()
  {
    if (this.categoriaDto.idCategoria == 0)
    {   
      this.categoriaProvider.add(this.categoriaDto)
      .then(ok => {
        this.carregarCategorias();
        this.limparTela();
      })
      .catch( erro => this.alerta(erro));
    }
    else
    {
      this.categoriaProvider.update(this.categoriaDto)
      .then(ok => {
        this.carregarCategorias();
        this.limparTela();
      })
      .catch(erro => this.alerta(erro));
    } 
  }

  limparTela() {
    this.categoriaDto = new CategoriaDto();
    this.categoriaDto.idCategoria = 0;
    this.categoriaDto.descricao = "";
  }
}
