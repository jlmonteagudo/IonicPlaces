import { Component, ViewChild, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Place } from './../../shared/model/place/place';
import { Area } from './../../shared/model/area/area';
import { PlacePage } from './../place/place';
import { AreaMapService } from './../../shared/model/maps/area-map.service';
import { Observable } from 'rxjs/Observable';
import { ShortenPipe } from "../../pipes/shorten.pipe";

@IonicPage()
@Component({
  selector: 'page-map-places',
  templateUrl: 'map-places.html',
})
export class MapPlacesPage {

  @ViewChild('map') mapElement;
  area: Area;
  places$: Observable<Place[]>;
  placePage = PlacePage;
  selectPlaceSubscription: EventEmitter<Place>;


  constructor(public navCtrl: NavController, public navParams: NavParams, public areaMapService: AreaMapService, public alertCtrl: AlertController) {
    this.area = navParams.get('area');
    this.places$ = navParams.get('places$');
  }

  ionViewDidLoad() {
    this.places$.subscribe(places => {
      this.areaMapService.displayPlacesByArea(this.mapElement, this.area.latitude, this.area.longitude, places);
    });
  }

  ionViewWillEnter() {
    this.selectPlaceSubscription = this.areaMapService.selectPlace.subscribe((place: Place) => {
      this.showInfoSelectedPlace(place);
    });
  }

  ionViewDidLeave() {
    this.selectPlaceSubscription.unsubscribe();
  }

  showInfoSelectedPlace(place: Place) {
    
    let imageUrl = place.images[0];
    let description = this.shortenDescription(place.description);
    let info: string = `
      <img src="${imageUrl}">
      ${description}
    `;

    let alert = this.alertCtrl.create({
      title: place.title,
      subTitle: info,
      buttons: [
        {
          text: 'Salir',
          role: 'cancel'
        },
        {
          text: 'Más Información',
          handler: data => this.navCtrl.push(this.placePage, place)
        }
      ]

    });

    alert.present();

  }

  shortenDescription(description: string): string {
    return new ShortenPipe().transform(description, 100, ' ...', false);
  }

}
