import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { PuntoPage } from '../../pages/punto/punto';
import { ListPage } from '../../pages/list/list';
import { IdentifyPage } from '../../pages/identify/identify';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
//import {Component, trigger, state, style, transition, animate} from '@angular/animations';

/**
 * Generated class for the MapaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var ol: any;
declare var google: any;
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {

  inject_3 = '';
  inject_5 = '';
  inject_c = '+';
  class_btn_2 = '';
  class_btn_3 = '';
  menu = 1;
  mostrar2 = false;
  mostrar = false;
  icono_5 = 'map';
  icono_4 = 'logo-buffer';
  icono_3 = 'pin';
  centroIcono = '';
  gmap;
  map = null;
  distLayer = null;
  zonas_exc = null;
  titulos = null;
  MAPA = 'TERRAIN';
  service = "http://www.sigmin.co:8080/geoserver/CMQ/wms";
  proxy = 'http://www.sigmin.co/finderaccount/Services';
  //proxy = this.proxy;
  wkt = 'MULTIPOLYGON EMPTY';
  config:any;
  recarga = false;
  view = new ol.View({
        // make sure the view doesn't go beyond the 22 zoom levels of Google Maps
        center: ol.proj.fromLonLat([-74.5981636036184, 6.25468647083332]),
        zoom: 7,
        minZoom: 5
  });
    
    //
    vector = new ol.layer.Vector({
    });
    source = new ol.source.Vector();
    vectorDibujo = new ol.layer.Vector({
        name: 'my_vectorlayer',
        source: (new ol.source.Vector()),
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#ffcc33',
                width: 1
            })
        })
    });
    vectorPunto = new ol.layer.Vector();

  constructor(public navCtrl: NavController, private http: Http, public navParams: NavParams, public alertCtrl: AlertController, public menuCtrl: MenuController) {

  	var self = this;
  	this.view.on('change:center', function () {

  		
        var center = ol.proj.transform(this.getCenter(), 'EPSG:3857', 'EPSG:4326');
        self.gmap.setCenter(new google.maps.LatLng(center[1], center[0]));
    });
    this.view.on('change:resolution', function () {
        self.gmap.setZoom(this.getZoom());
    }); 

    
    this.menuCtrl.enable(false, 'authenticated');
    this.menuCtrl.enable(true, 'unauthenticated');

  }

  presentAlert(titulo, texto) {
    const alert = this.alertCtrl.create({
      title: titulo,
      subTitle: texto,
      buttons: ['Ok']
    });
    alert.present();
  }

  ionViewWillEnter(){
      //if(this.recarga){

      //    this.recargarMapa();
      //}
  }


  ionViewDidLoad() {    

      if(!this.recarga){

          this.recargarMapa();
          //this.recarga = true;
          //console.log('entro');
      }
      
  }

  recargarMapa(){
      if (this.navParams.data.placa != undefined && this.navParams.data.placa != "") {

        this.config = {
            params : {

              placa:  this.navParams.data.placa
            }
        };

        this.http.get(this.proxy+'/sgm_service_placa.php', this.config).map(res => res.json()).subscribe(
        data => {

            this.wkt = data[0].coordenadas;
            var format = new ol.format.WKT();
            var feature = format.readFeature(this.wkt, {
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:3857'
            });
            this.vector = new ol.layer.Vector({
                source: new ol.source.Vector({
                    features: [feature]
                }),
                style: new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: 'rgba(255, 0, 0, 0.2)'
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#ef473a',
                        width: 3
                    }),
                    text: new ol.style.Text({
                        text: data[0].placa,
                        scale: 1.8,
                        fill: new ol.style.Fill({
                            color: 'black'
                        }),
                        stroke: new ol.style.Stroke({
                            color: 'white',
                            width: 2
                        })
                    })
                })
            });
            this.instanciarMapa();
            var extent = feature.getGeometry().getExtent();            
            this.map.getView().fit(extent, this.map.getSize());
            this.reinsertarMapa();         
          
        },
        err => {

              this.presentAlert('Falla de acceso!', 'Error de comunicacion, revise su conexion: ' + err);
        }
        );

    }else if(this.navParams.data.zona != '0' && this.navParams.data.radio != undefined && 
        this.navParams.data.radio != "" && this.navParams.data.coorX != undefined 
        && this.navParams.data.coorX != "" && this.navParams.data.coorY != undefined 
        && this.navParams.data.coorY != ""){

        this.config = {
            params : {

              mbl_coords: 'point(' +  this.navParams.data.coorX + ' ' + this.navParams.data.coorY + ')', 'mbl_origen': String(this.navParams.data.zona)
            }
        };

        this.http.get(this.proxy+'/sgm_service_point.php', this.config).map(res => res.json()).subscribe(
            data => {

                var puntos = String(data.coordenada);
                puntos = puntos.replace("POINT(", "");
                puntos = puntos.replace(")", "");
                var puntox = puntos.split(" ")[0];
                var puntoy = puntos.split(" ")[1];

                var circle = new ol.geom.Circle(ol.proj.transform([parseFloat(puntox), parseFloat(puntoy)], 'EPSG:4326', 'EPSG:3857'), parseInt(this.navParams.data.radio));

                var CircleFeature = new ol.Feature(circle);


                var vectorSource = new ol.source.Vector({
                    dataProjection: 'EPSG:4326',
                    featureProjection: 'EPSG:3857'
                });

                vectorSource.addFeatures([CircleFeature]);

                var extent = CircleFeature.getGeometry().getExtent();

                this.vectorPunto = new ol.layer.Vector({
                    source: vectorSource,
                    style: [
                        new ol.style.Style({
                            stroke: new ol.style.Stroke({
                                color: 'blue',
                                width: 3
                            }),
                            fill: new ol.style.Fill({
                                color: 'rgba(0, 0, 255, 0.1)'
                            }),
                            radius: 5
                        })]
                });

                this.instanciarMapa();

                this.map.getView().fit(extent, this.map.getSize());

                this.reinsertarMapa();

            },
            err => {

                  this.presentAlert('Falla de acceso!', 'Error de comunicacion, revise su conexion: ' + err);
        }
        );

       
    }else{

        this.instanciarMapa();

        this.gmap.setCenter(new google.maps.LatLng('6.25468647083332', '-74.5981636036184'));
        this.gmap.setZoom(7);
        this.reinsertarMapa();

    }
  }

  buscar(){
      this.navCtrl.push(ListPage);
  }

  reinsertarMapa() {
  		var olMapDiv = document.getElementById('olmap');
        //console.log(olMapDiv.parentNode);
        olMapDiv.parentNode.removeChild(olMapDiv);
        this.gmap.controls[google.maps.ControlPosition.TOP_LEFT].push(olMapDiv);
  };

 instanciarMapa() {

        this.gmap = new google.maps.Map(document.getElementById('gmap'), {
            disableDefaultUI: true,
            keyboardShortcuts: false,
            draggable: true,
            disableDoubleClickZoom: false,
            scrollwheel: true,
            streetViewControl: false,
            mapTypeId: google.maps.MapTypeId.TERRAIN
        });
        
        this.map = new ol.Map({
            layers: [this.vector, this.vectorDibujo, this.vectorPunto],
            interactions: ol.interaction.defaults({altShiftDragRotate:false, pinchRotate:false, doubleClickZoom: false}),
            target: document.getElementById('olmap'),
            view: this.view
        });

        var wshttp = this.http;
        var self = this;
        this.map.on('dblclick', function (evt) {

            var lonlat = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
            var point = 'point(' + lonlat[0] + ' ' + lonlat[1] + ')';

            self.config = {
                params : {

                 mbl_coords: point
                }
            };

            wshttp.get(self.proxy+'/sgm_service_identify.php', self.config).map(res => res.json()).subscribe(
                data => {

                    self.navCtrl.push(IdentifyPage, {list:data});
                },
                err => {

                  self.presentAlert('Falla de acceso!', 'Error de comunicacion, revise su conexion: ' + err);
                }
            );
            
        });        
               
    };

	iniciarBotones = function () {
		this.menu = 1;
  		//this.mostrar2 = true;
        //this.mostrar = true;
		this.icono_5 = 'map';
        this.inject_5  = '';
        this.inject_3  = '';
		this.icono_4 = 'logo-buffer';
		this.icono_3 = 'pin';
		     
        this.class_btn_2 = 'ng-hide-remove';
        this.class_btn_3 = 'ng-hide-remove';
    };

  mostrarMenu() {

        if (this.menu == 1) {

           this.iniciarBotones();
           if (this.mostrar) {

                var self = this;
                setTimeout(function(){
                    
                    self.mostrar = false;
                    self.mostrar2 = false;               
                },500)
                
                this.centroIcono = '';
                this.inject_c = '+';
                this.class_btn_2 = 'ng-hide-add';
                this.class_btn_3 = 'ng-hide-add';

            } else {
                this.centroIcono = '';
                this.inject_c = '−';
                this.mostrar = true;
                this.mostrar2 = true;
            }

        }else{

            this.iniciarBotones();
            var self = this;
            setTimeout(function(){
                
                self.mostrar = true;
                self.mostrar2 = true;               
            },500)
            
            this.centroIcono = '';
            this.inject_c = '−';
            this.class_btn_2 = 'ng-hide-remove';
            this.class_btn_3 = 'ng-hide-remove';
            this.menu = 1
        }
    };

    cambiarMapa = function () {

        if (this.menu == 1) {

            if (this.MAPA == "SATELLITE") {

                this.gmap.setMapTypeId(google.maps.MapTypeId.TERRAIN);
                this.MAPA = 'TERRAIN';
            } else if (this.MAPA == 'TERRAIN') {

                this.gmap.setMapTypeId(google.maps.MapTypeId.SATELLITE);
                this.MAPA = 'SATELLITE';
            }
        } else if (this.menu == 3) {

            if (this.distLayer == null) {
                this.distLayer = new ol.layer.Tile({
                    source: new ol.source.TileWMS({
                        url: this.service,
                        params: {
                            'LAYERS': 'solicitudes_col',
                            'VERSION': '1.1.1',
                            'FORMAT': 'image/png',
                            'TILED': true
                        }
                    })
                });
                this.map.addLayer(this.distLayer);
            } else {

                this.map.removeLayer(this.distLayer);
                this.distLayer = null;
            }

        }
    };

    clickBoton_4(){


        if (this.menu == 1) {

            var self = this;
            setTimeout(function(){
                self.mostrar2 = false;                
            },500)
            

            this.class_btn_2 = 'ng-hide-add';
            this.icono_5 = '';
            this.inject_5  = 'S';
		    this.icono_4 = 'alert';
		    this.icono_3 = '';
            this.inject_3  = 'T';
            this.inject_c  = '';
		    this.centroIcono = 'logo-buffer';
		    this.menu = 3;    
            //this.mostrar2 = false;        

        } else if (this.menu == 3) {

            if (this.zonas_exc == null) {

                this.zonas_exc = new ol.layer.Tile({
                    source: new ol.source.TileWMS({
                        url: this.service,
                        params: {
                            'LAYERS': 'zonas_excluibles_col',
                            'VERSION': '1.1.1',
                            'FORMAT': 'image/png',
                            'TILED': true
                        }
                    })
                });
                this.map.addLayer(this.zonas_exc);
            } else {
                this.map.removeLayer(this.zonas_exc);
                this.zonas_exc = null;
            }
        }
    };

    mostrarFinder() {

        if (this.menu == 1) {
           
           this.navCtrl.push(PuntoPage);
           
        } else if (this.menu == 3) {

            if (this.titulos == null) {

                this.titulos = new ol.layer.Tile({
                    source: new ol.source.TileWMS({
                        url: this.service,
                        params: {
                            'LAYERS': 'titulos_col',
                            'VERSION': '1.1.1',
                            'FORMAT': 'image/png',
                            'TILED': true
                        }
                    })
                });
                this.map.addLayer(this.titulos);


            } else {
                this.map.removeLayer(this.titulos);
                this.titulos = null;
            }
        }
    };

}
