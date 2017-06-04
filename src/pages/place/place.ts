import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading } from 'ionic-angular';
import { Place } from './../../shared/model/place/place';
import { PlaceMapService } from './../../shared/model/maps/place-map.service';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { AlertController, LoadingController } from 'ionic-angular';
import { ShortenPipe } from "../../pipes/shorten.pipe";

@IonicPage()
@Component({
  selector: 'page-place',
  templateUrl: 'place.html',
})
export class PlacePage {

  @ViewChild('map') mapElement;
  place: Place;
  placeDescription: string;
  distance: string;
  duration: string;
  isReadingMore: boolean;
  isDisplayingRoute: boolean;
  loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, public placeMapService: PlaceMapService, private launchNavigator: LaunchNavigator, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    this.place = navParams.data;
    this.placeDescription = this.shortenDescription(this.place.description);
  }

  shortenDescription(description: string): string {
    return new ShortenPipe().transform(description, 200, ' ...', false);
  }


  ionViewDidLoad() {
    this.displayPlaceLocation();
  }

  displayRoute() {
    this.showLoading('Calculando ruta...');
    this.resetDistanceAndTime();
    this.isDisplayingRoute = true;
    this.placeMapService.displayRouteToPlace(this.mapElement, this.place.latitude, this.place.longitude)
      .then(this.displayDistanceAndTime.bind(this))
      .catch((err) => {
        this.loading.dismiss();
        this.showAlert(err.message);
      });
  }

  displayPlaceLocation() {
    this.isDisplayingRoute = false;
    this.placeMapService.displayPlacePosition(this.mapElement, this.place);
    this.placeMapService.displayCurrentPosition();
  }

  showLoading(message) {
    this.loading = this.loadingCtrl.create({content: message});
    this.loading.present();
  }

  showAlert(message) {

    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: `Ha ocurrido un error intentado localizar la taberna <strong>${this.place.title}</strong>. No se podrá ubicar en el mapa.<p>Error: ${message}</p>`,
      buttons: ['OK']
    });

    alert.present();

  }

  readMore() {
    this.placeDescription = this.place.description;
    this.isReadingMore = true;
  }

  readLess() {
    this.placeDescription = this.shortenDescription(this.place.description);
    this.isReadingMore = false;
  }

  resetDistanceAndTime() {
    this.distance = '';
    this.duration = '';
  }

  displayDistanceAndTime() {
    this.distance = this.placeMapService.distance;
    this.duration = this.placeMapService.duration;
    this.loading.dismiss();
  }

  navigate() {
    this.launchNavigator.navigate([this.place.latitude, this.place.longitude]);
  }

}
