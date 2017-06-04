import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Area } from './../../shared/model/area/area';
import { PlaceService } from './../../shared/model/place/place.service';
import { Place } from "../../shared/model/place/place";
import { PlacePage } from './../place/place';
import { MapPlacesPage } from './../map-places/map-places';


@IonicPage()
@Component({
  selector: 'page-list-places',
  templateUrl: 'list-places.html',
})
export class ListPlacesPage {

  placePage = PlacePage;
  mapPlacesPage = MapPlacesPage;
  area: Area;
  places$: Observable<Place[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public placeService: PlaceService) {
  }

  ionViewDidLoad() {
    this.area = this.navParams.data;
    this.places$ = this.placeService.findByArea(this.area.$key);
  }

}
