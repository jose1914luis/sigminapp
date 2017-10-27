import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MostrarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mostrar',
  templateUrl: 'mostrar.html',
})
export class MostrarPage {

 	area_hec;
	estado_juridico;
	fecha_radica_inscribe;
	minerales;
	modalidad;
	municipios;
	personas;
	placa;
	tipo_expediente;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.area_hec = this.navParams.data.area_hec;
    this.estado_juridico = this.navParams.data.estado_juridico;
    this.fecha_radica_inscribe = this.navParams.data.fecha_radica_inscribe;
    this.minerales = this.navParams.data.minerales;
    this.modalidad = this.navParams.data.modalidad;
    this.municipios = this.navParams.data.municipios;
    this.personas = this.navParams.data.personas;
    this.placa = this.navParams.data.placa;
    this.tipo_expediente = this.navParams.data.tipo_expediente;
  }


}
