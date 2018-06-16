import { Component } from '@angular/core';
import { NavController, ModalController, IonicPage, ToastController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection  } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { EditarProdutoFirebaseComponent } from '../../components/editar-produto-firebase/editar-produto-firebase';

@IonicPage()
@Component({
  selector: 'page-firebase',
  templateUrl: 'firebase.html',
})
export class FirebasePage {

  private itemsCollection: AngularFirestoreCollection<any>;
  public items: Observable<any[]>;
  constructor(
    public db: AngularFirestore,
    public navCtrl: NavController,
    public modal: ModalController,
    public toastCtrl: ToastController) {
    this.itemsCollection = db.collection<any>('items');
    this.items = this.itemsCollection.valueChanges();
    this.items.subscribe(item => {
      this.mostraMenssagem('Busca realizada com sucesso!', 1000)
    })
  }

  addItem(){
    this.navCtrl.push('CriarProdutoFirebasePage')
  }

  deleteItem(id){
    this.itemsCollection.doc(id).delete();
    this.mostraMenssagem('Produto deletado com sucesso!', 2500)
  }

  editItem(item){
    console.log(item)
    const AlterarItemModal = this.modal.create(EditarProdutoFirebaseComponent, {item: item});

    AlterarItemModal.onDidDismiss(() => {
      this.itemsCollection = this.db.collection<any>('items');
      this.items = this.itemsCollection.valueChanges();
    });

    AlterarItemModal.present();
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
