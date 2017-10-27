var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { MapaPage } from '../../pages/mapa/mapa';
var ListPage = /** @class */ (function () {
    function ListPage(navCtrl, navParams, http, alertCtrl) {
        // If we navigated to this page, we will have an item available as a nav param
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.alertCtrl = alertCtrl;
        //items.length = 0;
        this.items = [];
        this.cargar = false;
        this.proxy = 'http://www.sigmin.co/finderaccount/Services';
    }
    ListPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        setTimeout(function () {
            _this.txt_buscar.setFocus();
        }, 1500);
    };
    ListPage.prototype.presentAlert = function (titulo, texto) {
        var alert = this.alertCtrl.create({
            title: titulo,
            subTitle: texto,
            buttons: ['Ok']
        });
        alert.present();
    };
    ListPage.prototype.cargarCoor = function (item) {
        var placa = item.split(' | ');
        this.navCtrl.setRoot(MapaPage, { placa: placa[0] });
    };
    ;
    ListPage.prototype.buscar = function (dato) {
        var _this = this;
        this.items.length = 0;
        this.items = [];
        if (dato != '' && dato.length > 2) {
            this.cargar = true;
            var config = {
                params: {
                    'multicriterio': dato
                }
            };
            var items = this.items;
            this.http.get(this.proxy + '/sgm_service_multicriterio_mobile.php', config).map(function (res) { return res.json(); }).subscribe(function (data) {
                _this.cargar = false;
                for (var key in data) {
                    var tipo = (key == 'solicitudes') ? 'Sol' : 'Til';
                    for (var key2 in data[key]) {
                        var value = data[key][key2];
                        items.push(value.placa + ' | ' + tipo + ' | ' + value.municipios.charAt(0).toUpperCase() + value.municipios.substr(1, value.municipios.length).toLowerCase());
                    }
                }
            }, function (err) {
                _this.presentAlert('Falla de acceso!', 'Error de comunicacion, revise su conexion: ' + err);
            });
        }
    };
    __decorate([
        ViewChild('txt_buscar'),
        __metadata("design:type", Object)
    ], ListPage.prototype, "txt_buscar", void 0);
    ListPage = __decorate([
        Component({
            selector: 'page-list',
            templateUrl: 'list.html'
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Http, AlertController])
    ], ListPage);
    return ListPage;
}());
export { ListPage };
//# sourceMappingURL=list.js.map