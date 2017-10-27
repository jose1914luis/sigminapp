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
import { NavController, AlertController, MenuController } from 'ionic-angular';
import { Md5 } from 'ts-md5/dist/md5';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { MapaPage } from '../../pages/mapa/mapa';
import { CuentaPage } from '../../pages/cuenta/cuenta';
import { Storage } from '@ionic/storage';
var HomePage = /** @class */ (function () {
    //proxy = '/api';
    function HomePage(navCtrl, http, alertCtrl, menuCtrl, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.menuCtrl = menuCtrl;
        this.storage = storage;
        this.loginData = { password: '', username: '' };
        this.proxy = 'http://www.sigmin.co/finderaccount/Services';
        this.menuCtrl.enable(true, 'authenticated');
        this.menuCtrl.enable(false, 'unauthenticated');
        this.storage.get('password').then(function (val) {
            _this.loginData.password = val;
        });
        this.storage.get('username').then(function (val) {
            _this.loginData.username = val;
        });
    }
    HomePage.prototype.ionViewDidLoad = function () {
    };
    HomePage.prototype.crearCuenta = function () {
        this.navCtrl.push(CuentaPage);
    };
    HomePage.prototype.presentAlert = function (titulo, texto) {
        var alert = this.alertCtrl.create({
            title: titulo,
            subTitle: texto,
            buttons: ['Ok']
        });
        alert.present();
    };
    HomePage.prototype.doLogin = function () {
        var _this = this;
        var yyyymmdd = function (dia) {
            var mm = dia.getMonth() + 1; // getMonth() is zero-based
            var dd = dia.getDate();
            return [dia.getFullYear(),
                (mm > 9 ? '' : '0') + mm,
                (dd > 9 ? '' : '0') + dd
            ].join('');
        };
        var fecha = yyyymmdd(new Date()); //$filter('date')(new Date(), 'yyyyMMdd');
        var code = Md5.hashStr(fecha + '-' + this.loginData.username + '-' + Md5.hashStr(this.loginData.password));
        var respuesta = Md5.hashStr(Md5.hashStr(this.loginData.password) + '-' + fecha + '-' + this.loginData.username);
        var config = {
            params: {
                login_user: this.loginData.username,
                verification_code: code
            }
        };
        //this.presentAlert('Falla de acceso!', this.proxy+'/sgm_service_user.php');
        //console.log();
        this.http.get(this.proxy + '/sgm_service_user.php', config).map(function (res) { return res.json(); }).subscribe(function (data) {
            if (data.estado_acceso == respuesta) {
                _this.storage.set('username', _this.loginData.username);
                _this.storage.set('password', _this.loginData.password);
                _this.navCtrl.setRoot(MapaPage);
            }
            else {
                _this.presentAlert('Falla de acceso!', 'Por favor revisa tus credenciales!');
            }
        }, function (err) {
            _this.presentAlert('Falla de acceso!', _this.proxy + '/sgm_service_user.php');
            _this.presentAlert('Falla de acceso!', 'Error de comunicacion, revise su conexion: ' + err);
        });
    };
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [NavController, Http, AlertController, MenuController, Storage])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map