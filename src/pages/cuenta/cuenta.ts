import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { HomePage } from '../../pages/home/home';

/**
 * Generated class for the CuentaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cuenta',
  templateUrl: 'cuenta.html',
})
export class CuentaPage {

cargar = false;
proxy: 'http://www.sigmin.co/finderaccount/Services';
  //proxy: this.proxy;
  crear = {doc:'',nombre:'',email:'',pass1:'', pass2: ''};
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, public alertCtrl: AlertController) {
  }

  presentAlert(titulo, texto) {
    const alert = this.alertCtrl.create({
      title: titulo,
      subTitle: texto,
      buttons: [{
                text: 'Ok',
                handler: () => {  }
               }]
    });
    alert.present();
  }

  validarDatos() {

    var patron = /^(\d){5,15}$/;

    if (String(this.crear.doc).search(patron) < 0) {

        this.presentAlert('Alerta!','El número de documento debe ser numerico y no inferior a 5 caracteres');

        return false;
    }

    // validacion del nombre de la persona:
    patron = /[A-Za-z]{3,}/;
    if (String(this.crear.nombre).search(patron) < 0 || String(this.crear.nombre).length < 6) {

        this.presentAlert('Alerta!', "'Nombre' no debe ser inferior a 6 caracteres y poseer letras" );
        return false;
    }

    // validacion de correo electr�nico:
    patron = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    if (String(this.crear.email).search(patron) < 0) {
        this.presentAlert( 'Alerta!',  "'Correo Electrónico' no posee caracteres válidos" );

        return false;
    }

//                // validacion de contrase�as: longitud de la contrase�a
    if ((this.crear.pass1 + '').length < 5) {
        this.presentAlert( 'Alerta!', "La Contrase\u00F1a no debe ser inferior a 6 caracteres" );

        return false;
    }
//
    if (String(this.crear.pass1) != String(this.crear.pass2)) {
        this.presentAlert( 'Alerta!', "Ambas contrase\u00F1as deben coincidir" );

        return false;
    }
    return true;	   

}

  crearCuenta(){

  	if (this.validarDatos()) {
                    this.cargar = true;

	var config = {
        params : {
        'txtNombre': this.crear.nombre, 
        'txtEmail': this.crear.email,
        'txtDocumento': this.crear.doc, 
        'txtPassword': this.crear.pass1,
        'txtPassword2': this.crear.pass2
        }
    };

	 this.http.get(this.proxy+'/sgm_service_crear_cuenta.php', config).map(res => res.json()).subscribe(
	        data => {
            console.log(data);
	        	this.cargar = false;
              var resp = String(data).trim();

              if (resp == "1") {

                const alert = this.alertCtrl.create({
                  title: 'Cuenta creada',
                  subTitle: 'Felicitaciones!!',
                  message: 'Tu usuario ha sido creado satisfactoriamente. Ahora necesitas activar tu cuenta, '+
                    'verifica tu correo electronico '+this.crear.email+' y sigue los pasos para acceder a SIGMIN. Luego ingresa nuevamente a la aplicación.',
                  buttons: [{
                            text: 'Ok',
                            handler: () => { this.navCtrl.setRoot(HomePage); }
                           }]
                });
                alert.present();    

              } else {

                  this.presentAlert( 'Falla!!!', 'Hubo un error al registrar el usuario, intente nuevamente.' );
              }
	        },
	        err => {

	          this.presentAlert('Falla de acceso!', 'Error de comunicacion, revise su conexion: ' + err);
	        }
	    );     
     }       
  }

}
