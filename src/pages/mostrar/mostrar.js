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
/**
 * Generated class for the MostrarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MostrarPage = /** @class */ (function () {
    function MostrarPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
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
    MostrarPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-mostrar',
            templateUrl: 'mostrar.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], MostrarPage);
    return MostrarPage;
}());
export { MostrarPage };
//# sourceMappingURL=mostrar.js.map