import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,
   ViewController, AlertController } from 'ionic-angular';

import { ProdutoDto} from '../../Model/produtoDto';
import { CategoriaDto} from '../../Model/categoriaDto';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
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
        private alertCtrl: AlertController,
        private camera: Camera,
        public barCode: BarcodeScanner) {

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
        this.produtoDto.ativo = false;
        this.produtoDto.fotoProduto = "";
        this.produtoDto.codBarra = "";

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

    if (this.produtoDto.fotoProduto == "")
    {
      alert("Selecione uma foto");
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

  salvarFoto(){
    let options : CameraOptions = {
      targetWidth:800,
      targetHeight:600,
      quality: 50,
      correctOrientation: true,
      saveToPhotoAlbum:true,
      encodingType: this.camera.EncodingType.JPEG,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA
    }
    this.camera.getPicture(options).then((res) => {
      this.produtoDto.fotoProduto = "data:image/jpeg;base64," + res;
    }).catch((err)=>{
      console.log(err)
    })
  }

  lerCodBarra(){
    this.barCode.scan({
      "prompt": "Posicione a leitura no codigo de barra",
      "orientation": "landscape"
    }).then((res)=>{
      this.produtoDto.codBarra = res.text
    }).catch((err)=>{
      this.alerta('ERRO AO ABRIR CODIGO DE BARRA')
    })
  }
}
