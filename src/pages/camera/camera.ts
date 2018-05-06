import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { EmailComposer } from '@ionic-native/email-composer';

/**
 * Generated class for the CameraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {

  public fotoSelecionada: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public camera: Camera,
    public emailCtrl: EmailComposer,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController) {
  }

  tirarFotoBase64(){
    let configuracoes : CameraOptions = {
      targetWidth:800,
      targetHeight:600,
      quality: 50,
      correctOrientation: true,
      saveToPhotoAlbum:true,
      encodingType: this.camera.EncodingType.JPEG,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA
    }
    this.camera.getPicture(configuracoes).then((res) => {
      this.fotoSelecionada = "data:image/jpeg;base64," + res;
    })
  }

  tirarFotoEmail(){
    let configuracoes : CameraOptions = {
      targetWidth:800,
      targetHeight:600,
      quality: 50,
      correctOrientation: true,
      saveToPhotoAlbum:true,
      encodingType: this.camera.EncodingType.JPEG,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA
    }
    this.camera.getPicture(configuracoes).then((res) => {
      this.fotoSelecionada = res;
    })
  }

  enviarEmail() {
    let alert = this.alertCtrl.create({
      title: 'Digite os dados para mandar o email',
      inputs: [
        {
          placeholder: 'E-mail Destinatário'
        },
        {
          placeholder: 'Titulo E-mail'
        },
        {
          placeholder: 'Corpo do E-mail'
        }
      ],
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Enviar',
          role: 'send',
          handler: data => {
            if(this.fotoSelecionada && this.fotoSelecionada.substring(0, 4) !== 'data') {
              this.emailCtrl.open({
                to: data[0],
                subject: data[1],
                attachments: [this.fotoSelecionada],
                body: data[2],
                isHtml: true
              });
            } else {
              this.mostraMenssagem('Erro: Mande uma foto para email', 2500)
            }
          }
        }
      ]
    });
    alert.present()
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
