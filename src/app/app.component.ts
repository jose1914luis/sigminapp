import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AbouitPage } from '../pages/abouit/abouit';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  public pages: Array<{title: string, component: any}>;
  public pages2: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Nosotros', component: AbouitPage }
    ];

    // used for an example of ngFor and navigation
    this.pages2 = [
      { title: 'Nosotros', component: AbouitPage },
      { title: 'Salir', component: HomePage }
    ];
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    //console.log(this.rootPage);
    if(page.title == 'Nosotros'){

      this.nav.push(page.component);  
    }else{
      
      this.nav.setRoot(page.component);
    }    
  }
}
