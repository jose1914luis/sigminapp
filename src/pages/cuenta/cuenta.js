var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
var CuentaPage = /** @class */ (function () {
    function CuentaPage(navCtrl, navParams, http, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.cargar = false;
        //proxy: this.proxy;
        this.crear = { doc: '', nombre: '', email: '', pass1: '', pass2: '' };
    }
    CuentaPage.prototype.presentAlert = function (titulo, texto) {
        var alert = this.alertCtrl.create({
            title: titulo,
            subTitle: texto,
            buttons: [{
                    text: 'Ok',
                    handler: function () { }
                }]
        });
        alert.present();
    };
    CuentaPage.prototype.validarDatos = function () {
        var patron = /^(\d){5,15}$/;
        if (String(this.crear.doc).search(patron) < 0) {
            this.presentAlert('Alerta!', 'El número de documento debe ser numerico y no inferior a 5 caracteres');
            return false;
        }
        // validacion del nombre de la persona:
        patron = /[A-Za-z]{3,}/;
        if (String(this.crear.nombre).search(patron) < 0 || String(this.crear.nombre).length < 6) {
            this.presentAlert('Alerta!', "'Nombre' no debe ser inferior a 6 caracteres y poseer letras");
            return false;
        }
        // validacion de correo electr�nico:
        patron = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
        if (String(this.crear.email).search(patron) < 0) {
            this.presentAlert('Alerta!', "'Correo Electrónico' no posee caracteres válidos");
            return false;
        }
        //                // validacion de contrase�as: longitud de la contrase�a
        if ((this.crear.pass1 + '').length < 5) {
            this.presentAlert('Alerta!', "La Contrase\u00F1a no debe ser inferior a 6 caracteres");
            return false;
        }
        //
        if (String(this.crear.pass1) != String(this.crear.pass2)) {
            this.presentAlert('Alerta!', "Ambas contrase\u00F1as deben coincidir");
            return false;
        }
        return true;
    };
    CuentaPage.prototype.crearCuenta = function () {
        var _this = this;
        if (this.validarDatos()) {
            this.cargar = true;
            var config = {
                params: {
                    'txtNombre': this.crear.nombre,
                    'txtEmail': this.crear.email,
                    'txtDocumento': this.crear.doc,
                    'txtPassword': this.crear.pass1,
                    'txtPassword2': this.crear.pass2
                }
            };
            this.http.get(this.proxy + '/sgm_service_crear_cuenta.php', config).map(function (res) { return res.json(); }).subscribe(function (data) {
                console.log(data);
                _this.cargar = false;
                var resp = String(data).trim();
                if (resp == "1") {
                    var alert_1 = _this.alertCtrl.create({
                        title: 'Cuenta creada',
                        subTitle: 'Felicitaciones!!',
                        message: 'Tu usuario ha sido creado satisfactoriamente. Ahora necesitas activar tu cuenta, ' +
                            'verifica tu correo electronico ' + _this.crear.email + ' y sigue los pasos para acceder a SIGMIN. Luego ingresa nuevamente a la aplicación.',
                        buttons: [{
                                text: 'Ok',
                                handler: function () { _this.navCtrl.setRoot(HomePage); }
                            }]
                    });
                    alert_1.present();
                }
                else {
                    _this.presentAlert('Falla!!!', 'Hubo un error al registrar el usuario, intente nuevamente.');
                }
            }, function (err) {
                _this.presentAlert('Falla de acceso!', 'Error de comunicacion, revise su conexion: ' + err);
            });
        }
    };
    CuentaPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-cuenta',
            templateUrl: 'cuenta.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Http, AlertController])
    ], CuentaPage);
    return CuentaPage;
}());
export { CuentaPage };
//# sourceMappingURL=cuenta.js.map