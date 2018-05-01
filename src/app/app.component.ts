import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { DatabaseProvider } from '../providers/database/database';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage:any = HomePage;

  public pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public dbProvider: DatabaseProvider) {

      platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();
      });
      dbProvider.createDatabase()
        .then(() => {

        })
        .catch(()=> {

        })

    this.pages = [
      {title: 'Login', component: 'LoginPage'},
      {title: 'Categoria', component: 'CategoriaPage'},
      {title: 'Produto', component: 'ProdutoPage'},
      {title: 'Fechar App', component: 'Fechar'}
    ]
  }
  openPage(page) {
    if (page.title == 'Fechar') {
      this.platform.exitApp();
    } else {
      this.nav.setRoot(page.component);
    }
  }
}

