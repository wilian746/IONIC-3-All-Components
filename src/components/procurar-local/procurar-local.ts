import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the ProcurarLocalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'procurar-local',
  templateUrl: 'procurar-local.html'
})
export class ProcurarLocalComponent {

  public tabsEndereco: boolean = true;

  public rua: any = 'rua Padre Caldeira';
  public numero: any = 35;
  public cidade: any = 'Patos de Minas';
  public estado: any = 'MG';

  public latitude: any =  -18.5742094;
  public longitude: any = -46.5130544;

  public buscaLocal: any;
  public buscaEndereco: any;


  constructor(
    public view: ViewController) {
  }

  close(){
    this.view.dismiss()
  }

  changeTabsEndereco () {
    this.tabsEndereco = true
  }

  changeTabsLocal () {
    this.tabsEndereco = false
  }

  salvarEndereco() {
    this.buscaEndereco = `${this.rua}, ${this.numero}, ${this.cidade}, ${this.estado}`
    this.view.dismiss(this.buscaEndereco);
  }

  salvarLocal() {
    this.buscaLocal = [this.latitude, this.longitude]
    this.view.dismiss(this.buscaLocal);
  }
}
