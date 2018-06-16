import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController, ViewController, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { ProcurarLocalComponent } from '../../components/procurar-local/procurar-local';
import { SearchLocationProvider } from '../../providers/search-location/search-location';

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-geolocation',
  templateUrl: 'geolocation.html',
})
export class GeolocationPage {

  mapa: any;
  lat: any;
  long: any;
  latDest: 0;
  longDest: 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public geolocation: Geolocation,
    public platform: Platform,
    public modal: ModalController,
    public view: ViewController,
    public searchLocal: SearchLocationProvider,
    public toastCtrl: ToastController
    ) {
      platform.ready().then(() => {
        this.posicaoAtual();
      })
  }

  mostrarMapa() {
    let mapContainer = document.getElementById('map');
    this.mapa = new google.maps.Map(
      mapContainer,
      {
        center: new google.maps.LatLng(this.lat, this.long), zoom: 14
      }
    );

    let marcador = new google.maps.Marker({
      icon: 'assets/imgs/marcador.png',
      map: this.mapa,
      position: new google.maps.LatLng(this.lat, this.long)
    });
    console.log(marcador)

    if(this.latDest && this.longDest) {
      var marcador2 = new google.maps.Marker({
        icon: 'assets/imgs/marcador.png',
        map: this.mapa,
        position: new google.maps.LatLng(this.latDest, this.longDest)
      })

      console.log(marcador2)
    }
  }

  posicaoAtual(): any {
    this.geolocation.getCurrentPosition({ timeout: 30000 })
    .then(res => {
      this.lat = res.coords.latitude;
      this.long = res.coords.longitude;
      this.mostrarMapa();
    })
    .catch((err) => {
      console.log(err);
      this.lat = -18.59;
      this.long = -46.515;
      this.mostrarMapa();
    })

    this.latDest = null
    this.longDest = null
  }

  openModal(){
    const ItemModal = this.modal.create(ProcurarLocalComponent);

    let component = new ProcurarLocalComponent(this.view);

    console.log(component)

    ItemModal.onDidDismiss((data: any) => {
      console.log(data)
      if (data.length === 2) {
        this.latDest = data[0]
        this.longDest = data[1]
        this.carregarPontoMapaLatLng()
      }
      else {
        this.carregaPontoMapaEndereco(data)
      }
    });

    ItemModal.present();
  }

  navegar(){
    if (this.latDest && this.longDest){
      let directionsService = new google.maps.DirectionsService
      let directionsDisplay = new google.maps.DirectionsRenderer
      directionsDisplay = new google.maps.DirectionsRenderer()

      let startPosition = new google.maps.LatLng(this.lat, this.long)

      const mapOptions = {
        zoom:18,
        center: startPosition,
        disableDefaultUI: true
      };

      this.mapa = new google.maps.Map(document.getElementById('map'), mapOptions);

      directionsDisplay.setMap(this.mapa);

      const request = {
        origin: new google.maps.LatLng(this.lat, this.long),
          destination: new google.maps.LatLng(this.latDest, this.longDest),
          travelMode: 'DRIVING'
      };
      console.log(request)

      directionsService.route(request, (result, status) => {
        console.log('status', status)
        if (status == 'OK') {
          console.log('result', result)
          directionsDisplay.setDirections(result);
        }
      });
    } else {
      this.mostraMenssagem('Clique no icone de pesquisa e selecione uma rota para navegar')
    }
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
  carregaPontoMapaEndereco(data) {
    this.searchLocal.LocalizacaoEndereco(data.toString())
    .then(retorno => {
      this.latDest = retorno[0].geometry.location.lat();
      this.longDest = retorno[0].geometry.location.lng();
      this.mostrarMapa();
    }).catch((err)=>{
      console.log(err)
    })
  }

  carregarPontoMapaLatLng(){
    this.searchLocal.LocalizacaoCoordenadas(this.latDest, this.longDest)
      .then((result) => {
        this.carregaPontoMapaEndereco(result)
      }).catch((err)=>{
        console.log(err)
      })
  }
}
