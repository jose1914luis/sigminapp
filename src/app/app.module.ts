import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MapaPage } from '../pages/mapa/mapa';
import { PuntoPage } from '../pages/punto/punto';
import { IdentifyPage } from '../pages/identify/identify';
import { MostrarPage } from '../pages/mostrar/mostrar';
import { CuentaPage } from '../pages/cuenta/cuenta';
import { AbouitPage } from '../pages/abouit/abouit';
import { IonicStorageModule } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    MapaPage,
    PuntoPage,
    IdentifyPage,
    MostrarPage,
    CuentaPage,
    AbouitPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    MapaPage,
    PuntoPage,
    IdentifyPage,
    MostrarPage,
    CuentaPage,
    AbouitPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
