import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection  } from 'angularfire2/firestore';

@IonicPage()
@Component({
  selector: 'page-criar-produto-firebase',
  templateUrl: 'criar-produto-firebase.html',
})
export class CriarProdutoFirebasePage {
  private formItem: FormGroup;
  public loading
  public resultCreate: any;
  private itemsCollection: AngularFirestoreCollection<any>;

  constructor(
    public db: AngularFirestore,
    public fb: FormBuilder,
    public navParams: NavParams,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController)
  {
    this.formItem = fb.group({
      id: [null],
      nome: [null, [Validators.required]],
      marca: [null, [Validators.required]],
      valor: [null, [Validators.required]],
      quantidade: [null, [Validators.required]]
    })
    this.itemsCollection = db.collection<any>('items');
  }

  ionViewDidLoad() {
  }

  submit(){
    this.showLoader();

    const id = this.db.createId();

    this.formItem.setValue({
      id: id,
      nome: this.formItem.value.nome,
      marca: this.formItem.value.marca,
      valor: this.formItem.value.valor,
      quantidade: this.formItem.value.quantidade
    })

    this.itemsCollection.doc(id).set(this.formItem.value).then((res)=>{
      this.loading.dismiss()
      this.mostraMenssagem('Item criado com sucesso', 2500)
      this.navCtrl.setRoot('FirebasePage')
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
