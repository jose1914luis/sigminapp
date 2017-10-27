import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { MapaPage } from '../../pages/mapa/mapa';
import { Keyboard } from '@ionic-native/keyboard';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  providers: [Keyboard]
})
export class ListPage {
  
  //items.length = 0;
  items = [];
  cargar = false;
  proxy = 'http://www.sigmin.co/finderaccount/Services';
  //proxy= '/api';
  @ViewChild('txt_buscar') txt_buscar ;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, public alertCtrl: AlertController, private keyboard: Keyboard) {
    // If we navigated to this page, we will have an item available as a nav param

  }

  ionViewDidLoad() {

    setTimeout(() => {
      
      this.txt_buscar.setFocus();
      this.keyboard.show();
    },1500);
  }

  presentAlert(titulo, texto) {
    const alert = this.alertCtrl.create({
      title: titulo,
      subTitle: texto,
      buttons: ['Ok']
    });
    alert.present();
  }

  cargarCoor (item) {

    var placa = item.split(' | ');

    this.navCtrl.setRoot(MapaPage, {placa: placa[0]});    
  };

  ionViewWillLeave(){
    this.keyboard.close();
  }


  buscar(dato){

    this.items.length = 0;
    this.items = [];

    if (dato != '' && dato.length > 2) {

      this.cargar = true;

      var config = {
        params : {

         'multicriterio': dato
        }
      };
      var items = this.items;
      var self = this;
      this.http.get(this.proxy+'/sgm_service_multicriterio_mobile.php', config).map(res => res.json()).subscribe(
        data => {
            this.cargar = false;
            for (var key in data) {
              var tipo = (key == 'solicitudes') ? 'Sol' : 'Til';

              for (var key2 in data[key]){

                var value = data[key][key2];
                items.push(value.placa + ' | ' + tipo + ' | ' + value.municipios.charAt(0).toUpperCase() + value.municipios.substr(1, value.municipios.length).toLowerCase());
              }
            }
            self.keyboard.close();
                        
        },
        err => {
          this.presentAlert('Falla de acceso!', 'Error de comunicacion, revise su conexion: '+err );
        }
      );       
    }
  }
}
