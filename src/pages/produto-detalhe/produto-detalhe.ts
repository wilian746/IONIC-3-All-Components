import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,
   ViewController, AlertController } from 'ionic-angular';

import { ProdutoDto} from '../../Model/produtoDto';
import { CategoriaDto} from '../../Model/categoriaDto';
/**
 * Generated class for the ProdutoDetalhePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produto-detalhe',
  templateUrl: 'produto-detalhe.html',
})
export class ProdutoDetalhePage {

  produtoDto : ProdutoDto 
  listaCategorias : Array<CategoriaDto>;
  categoria : CategoriaDto;
  mensagem : String = "";
  origem : String = "";

  constructor(public navCtrl: NavController,
        public viewCtrl: ViewController, 
        public navParams: NavParams,
        private alertCtrl: AlertController) {
          
        this.montarTela();         
           
  }

  montarTela()
  {
      this.produtoDto = new ProdutoDto();        
      this.produtoDto = this.navParams.get("produtoDto");
      let acao : String;
      acao = this.navParams.get("acao");

      this.listaCategorias = new Array<CategoriaDto>();
      this.listaCategorias = this.navParams.get("categorias");

      if (acao.toUpperCase() == "I")
      {             
        //this.produtoDto.indicadorAtivo = true;
        //let dateString = '2016/03/31' 
        //let newDate = new Date(dateString);
       
        this.produtoDto.quantidadeEstoque = 0;
        this.produtoDto.valorProduto = 0;
        this.produtoDto.idCategoria = 0;
        this.produtoDto.nomeProduto = "";
        this.produtoDto.idProduto = 0;
        this.produtoDto.ativo = true;
        this.produtoDto.fotoProduto = ""; 
        let now = new Date();
        this.produtoDto.dataValidadeProduto = now.toISOString();                        
    }

    this.obterCategoria(this.produtoDto.idCategoria);   

  }

  obterCategoria(idCategoria : Number)
  {
    this.categoria = new CategoriaDto();
    this.categoria.idCategoria = 0;
    
    this.listaCategorias.forEach(element => {
      this.mensagem = this.mensagem + " " + 
          element.idCategoria.toString() + " id: " +
            idCategoria.toString();

         if (element.idCategoria == idCategoria)
         {
             this.categoria = element;
             return;
         }
      
    });

  }

  verificarNumero(value, tipo)
  {
          
    if ((value.key != "0") &&
        (value.key != "1") &&
        (value.key != "2") &&
        (value.key != "3") &&
        (value.key != "4") &&
        (value.key != "5") &&
        (value.key != "6") &&
        (value.key != "7") &&
        (value.key != "8") &&
        (value.key != "9"))
        {
          if (tipo == "I")
             return false;
          else {
            if (value.key != ",")
               return false;
          }
        }
     
  }
  selecionarCategoria(event)
  {          
    this.categoria = event;
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProdutoDetalhePage');
  }

  fechar(){
    this.viewCtrl.dismiss({"produto" : this.produtoDto,
                           "origem" : this.origem});
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

  salvar()
  {
    
    if (this.produtoDto.nomeProduto == ""){
       alert("O nome do produto não foi informado");
       return;
    }

    if (this.produtoDto.valorProduto.toString() == ""){
      alert("O valor do produto não foi informado ou inválido");
      return;
    }
     
    if (this.produtoDto.valorProduto == 0){
      alert("O valor do produto não foi informado");
      return;
    }

    if (this.produtoDto.quantidadeEstoque.toString() == ""){
      alert("A quantidade do produto não foi informada ou inválida");
      return;
    }
    
    if (this.categoria.idCategoria == 0)
    {
      alert("Selecione uma categoria");
      return;
    }
    this.produtoDto.idCategoria = this.categoria.idCategoria;
    
    this.origem = "S";
    this.fechar();     
     
  }

  posicionarCategoria(e1: CategoriaDto, e2: CategoriaDto): boolean {

    if (e1.idCategoria == e2.idCategoria)
        return true;
    else
        return false;
  }
}
