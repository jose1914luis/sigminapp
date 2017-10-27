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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapaPage } from '../../pages/mapa/mapa';
/**
 * Generated class for the PuntoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PuntoPage = /** @class */ (function () {
    function PuntoPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.selectZone = 'BOGOTA';
    }
    PuntoPage.prototype.ubicarCoor = function (coorX, coorY, radio, zona) {
        this.navCtrl.setRoot(MapaPage, { coorX: coorX, coorY: coorY, radio: radio, placa: '', zona: zona });
    };
    PuntoPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-punto',
            templateUrl: 'punto.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], PuntoPage);
    return PuntoPage;
}());
export { PuntoPage };
//# sourceMappingURL=punto.js.map