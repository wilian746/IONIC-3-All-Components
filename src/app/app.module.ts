import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PinConfirmComponent } from '../components/pin-confirm/pin-confirm'
import { File } from '@ionic-native/file';
import { CategoriaProvider } from '../providers/categoria/categoria';
import { DatabaseProvider } from '../providers/database/database';
import { ProdutoProvider } from '../providers/produto/produto';
import { SQLite } from '@ionic-native/sqlite';
import { Camera } from '@ionic-native/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner'
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PinConfirmComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PinConfirmComponent
  ],
  providers: [
    StatusBar,
    File,
    CategoriaProvider,
    DatabaseProvider,
    ProdutoProvider,
    SQLite,
    Camera,
    BarcodeScanner,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
