import { Component } from '@angular/core';
import { NavController, AlertController, MenuController } from 'ionic-angular';
import {Md5} from 'ts-md5/dist/md5';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { MapaPage } from '../../pages/mapa/mapa';
import { CuentaPage } from '../../pages/cuenta/cuenta';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loginData = {password:'', username:''};
  proxy = 'http://www.sigmin.co/finderaccount/Services';
  //proxy = '/api';
  constructor(public navCtrl: NavController, private http: Http, public alertCtrl: AlertController, public menuCtrl: MenuController,private storage: Storage) {

    this.menuCtrl.enable(true, 'authenticated');
    this.menuCtrl.enable(false, 'unauthenticated');

    this.storage.get('password').then((val) => {
      this.loginData.password = val;
    });

    this.storage.get('username').then((val) => {
      this.loginData.username = val;
    });

  }

  ionViewDidLoad() {
    
  }


  crearCuenta(){
     this.navCtrl.push(CuentaPage);
  }
  presentAlert(titulo, texto) {
    const alert = this.alertCtrl.create({
      title: titulo,
      subTitle: texto,
      buttons: ['Ok']
    });
    alert.present();
  }

  doLogin(){

    var yyyymmdd = function(dia) {
      var mm = dia.getMonth() + 1; // getMonth() is zero-based
      var dd = dia.getDate();

      return [dia.getFullYear(),
              (mm>9 ? '' : '0') + mm,
              (dd>9 ? '' : '0') + dd
             ].join('');
    };

    var fecha = yyyymmdd(new Date()); //$filter('date')(new Date(), 'yyyyMMdd');
    var code = Md5.hashStr(fecha + '-' + this.loginData.username + '-' + Md5.hashStr(this.loginData.password));
    var respuesta =  Md5.hashStr( Md5.hashStr(this.loginData.password) + '-' + fecha + '-' +this.loginData.username);
    
    var config = {
        params : {

          login_user: this.loginData.username,
          verification_code: code
        }
    };
    //this.presentAlert('Falla de acceso!', this.proxy+'/sgm_service_user.php');
    //console.log();
    this.http.get(this.proxy+'/sgm_service_user.php', config).map(res => res.json()).subscribe(
        data => {

          if (data.estado_acceso == respuesta) {

              this.storage.set('username', this.loginData.username);
              this.storage.set('password', this.loginData.password);
              this.navCtrl.setRoot(MapaPage);

          } else {

              this.presentAlert('Falla de acceso!', 'Por favor revisa tus credenciales!');
          }
          
        },
        err => {

          this.presentAlert('Falla de acceso!', this.proxy+'/sgm_service_user.php');
          this.presentAlert('Falla de acceso!', 'Error de comunicacion, revise su conexion: ' + err);
        }
    );
   
  }

}
