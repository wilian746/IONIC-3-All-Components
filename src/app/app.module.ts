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
import { ProdutosProvider } from '../providers/produtos/produtos';
import { EditarProdutoRestComponent } from '../components/editar-produto-rest/editar-produto-rest';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { EditarProdutoFirebaseComponent } from '../components/editar-produto-firebase/editar-produto-firebase';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PinConfirmComponent,
    EditarPessoaSqlComponent,
    EditarArquivoTextoComponent,
    EditarProdutoRestComponent,
    EditarProdutoFirebaseComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase, 'start-project'), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PinConfirmComponent,
    EditarPessoaSqlComponent,
    EditarArquivoTextoComponent,
    EditarProdutoRestComponent,
    EditarProdutoFirebaseComponent
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
    PessoaSqlProvider,
    ProdutosProvider
  ]
})
export class AppModule {}
