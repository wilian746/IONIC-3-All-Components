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

    this.pages = [
      {title: 'Login', component: 'LoginPage'},
      {title: 'SQL Lite', component: 'SqlLitePage'},
      {title: 'Arquivo Texto', component: 'ArquivoTextoPage'},
      {title: 'Cod Barra', component: 'CodBarraPage'},
      {title: 'E-mail', component: 'EmailPage'},
      {title: 'Camera', component: 'CameraPage'}
    ]
  }
  openPage(page) {
    this.nav.setRoot(page.component);
  }
}

