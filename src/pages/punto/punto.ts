import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapaPage } from '../../pages/mapa/mapa';

/**
 * Generated class for the PuntoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-punto',
  templateUrl: 'punto.html',
})
export class PuntoPage {

  selectZone = 'BOGOTA';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ubicarCoor(coorX, coorY, radio, zona){

	this.navCtrl.setRoot(MapaPage, {coorX: coorX, coorY: coorY, radio: radio, placa: '', zona: zona});  	
  }

}
