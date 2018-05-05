import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PinConfirmComponent } from '../components/pin-confirm/pin-confirm'
import { File } from '@ionic-native/file';
import { DatabaseProvider } from '../providers/database/database';
import { SQLite } from '@ionic-native/sqlite';
import { Camera } from '@ionic-native/camera';
import { PessoaSqlProvider } from '../providers/pessoa-sql/pessoa-sql';
import { EditarPessoaSqlComponent } from '../components/editar-pessoa-sql/editar-pessoa-sql';
import { EditarArquivoTextoComponent } from '../components/editar-arquivo-texto/editar-arquivo-texto';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { EmailComposer } from '@ionic-native/email-composer';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PinConfirmComponent,
    EditarPessoaSqlComponent,
    EditarArquivoTextoComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PinConfirmComponent,
    EditarPessoaSqlComponent,
    EditarArquivoTextoComponent
  ],
  providers: [
    StatusBar,
    File,
    DatabaseProvider,
    SQLite,
    Camera,
    EmailComposer,
    BarcodeScanner,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PessoaSqlProvider
  ]
})
export class AppModule {}
