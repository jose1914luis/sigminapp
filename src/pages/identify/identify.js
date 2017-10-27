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
import { MostrarPage } from '../../pages/mostrar/mostrar';
/**
 * Generated class for the IdentifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var IdentifyPage = /** @class */ (function () {
    function IdentifyPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.items = [];
        this.objs = this.navParams.data.list;
        for (var key in this.objs) {
            if ((typeof this.objs[key]) == 'object') {
                this.items.push(this.objs[key].tipo_expediente + ' : ' + this.objs[key].placa);
            }
        }
    }
    IdentifyPage.prototype.showData = function (item) {
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
    };
    IdentifyPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-identify',
            templateUrl: 'identify.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], IdentifyPage);
    return IdentifyPage;
}());
export { IdentifyPage };
//# sourceMappingURL=identify.js.map