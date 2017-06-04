import { Injectable, EventEmitter } from '@angular/core';
import { Place } from '../place/place';
import { Geolocation } from '@ionic-native/geolocation';

declare var google: any


@Injectable()
export class AreaMapService {

  private map: any;
  public selectPlace = new EventEmitter<Place>();

  constructor(private geolocation: Geolocation) {}

  public displayPlacesByArea(mapElement: any, areaLatitude: number, areaLongitude: number, places: Place[]) {
    return this.initMap(mapElement, areaLatitude, areaLongitude)
        .then(this.displayMarkers.bind(this, places))
        .then(this.displayCurrentPosition.bind(this));
  }


  private initMap(mapElement: any, areaLatitude: number, areaLongitude: number) {

    return new Promise((resolve, reject) => {

      let latLng = new google.maps.LatLng(areaLatitude, areaLongitude);
      
      let mapOptions = {
        center: latLng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.map = new google.maps.Map(mapElement.nativeElement, mapOptions);

      resolve();

    });


  }

  private displayCurrentPosition() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let image = 'assets/icon/me.png';
      new google.maps.Marker({
        position: latLng,
        map: this.map,
        icon: image
      });
    });
  }

  private displayMarkers(places: Place[]) {
    places.forEach(this.displayMarker.bind(this));
  }

  private displayMarker(place: Place) {

    let latLng = new google.maps.LatLng(place.latitude, place.longitude);
    let image = 'assets/icon/bar.png';
    let marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      title: place.title,
      icon: image
    });

    marker.addListener('click', () => this.selectPlace.emit(place));

  }

}

