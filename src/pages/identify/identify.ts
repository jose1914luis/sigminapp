import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MostrarPage } from '../../pages/mostrar/mostrar';

/**
 * Generated class for the IdentifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-identify',
  templateUrl: 'identify.html',
})
export class IdentifyPage {

items = [];
objs: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  	this.objs =this.navParams.data.list;

  	for (var key in this.objs) {      

      if((typeof this.objs[key]) == 'object'){
        this.items.push(this.objs[key].tipo_expediente + ' : ' + this.objs[key].placa);
      }
    }

  }

  showData(item) {

    var placa = item.split(":")[1].trim();    
    for (var key in this.objs) {      

      if (this.objs[key].placa == placa) {

        this.navCtrl.push(MostrarPage, {
          area_hec: this.objs[key].area_hec,
          estado_juridico: this.objs[key].estado_juridico,
          fecha_radica_inscribe: this.objs[key].fecha_radica_inscribe,
          minerales: this.objs[key].minerales,
          modalidad: this.objs[key].modalidad,
          municipios: this.objs[key].municipios,
          personas: this.objs[key].personas,
          placa: this.objs[key].placa,
          tipo_expediente: this.objs[key].tipo_expediente
        });  
        break;                
      }                
    }
  }
 
}
