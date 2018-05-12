import { Component } from '@angular/core';
import { ViewController, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection  } from 'angularfire2/firestore';

@Component({
  selector: 'editar-produto-firebase',
  templateUrl: 'editar-produto-firebase.html'
})
export class EditarProdutoFirebaseComponent {
  private formEditar: FormGroup;
  private item: any;
  public loading: any;
  public resultGetOne: any;
  public resultEdit: any;
  private itemsCollection: AngularFirestoreCollection<any>;

  constructor(
    public db: AngularFirestore,
    public view: ViewController,
    public fb: FormBuilder,
    public navParams: NavParams,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController)
  {
    this.itemsCollection = db.collection<any>('items');

    this.formEditar = fb.group({
      id: [null],
      nome: [null, [Validators.required]],
      marca: [null, [Validators.required]],
      valor: [null, [Validators.required]],
      quantidade: [null, [Validators.required]]
    })
  }
  ionViewDidLoad() {
    this.showLoader()

    this.item = this.navParams.get('item')

    this.formEditar.setValue({
      id: this.item.id,
      nome: this.item.nome,
      marca: this.item.marca,
      valor: this.item.valor,
      quantidade: this.item.quantidade
    })

    this.loading.dismiss()
  }

  concluir(){
    this.showLoader();

    this.formEditar.setValue({
      id: this.formEditar.value.id,
      nome: this.formEditar.value.nome,
      marca: this.formEditar.value.marca,
      valor: this.formEditar.value.valor,
      quantidade: this.formEditar.value.quantidade
    })

    this.itemsCollection.doc(this.formEditar.value.id).update(this.formEditar.value).then((res)=>{
      this.loading.dismiss()
      this.mostraMenssagem('Item editado com sucesso', 2500)
      this.view.dismiss();
    })
  }
  closeModal(){
    this.view.dismiss();
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
