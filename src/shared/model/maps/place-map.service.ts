import { Injectable } from '@angular/core';
import { Place } from "../place/place";

declare var google: any


@Injectable()
export class PlaceMapService {

  private map: any;
  public distance: string;
  public duration: string;

  public displayRouteToPlace(mapElement: any, latitude: number, longitude: number) {

    const placeLocation = { latitude, longitude }

    return this.initMap(mapElement, placeLocation)
      .then(this.getUserPosition)
      .then(this.getRoute.bind(this, placeLocation))
      .then(this.displayRoute.bind(this, this.map))
      .then(this.setDistanceAndTime.bind(this));
  }

  public displayPlacePosition(mapElement: any, place: Place) {

    const placeLocation = { latitude: place.latitude, longitude: place.longitude };

    return this.initMap(mapElement, placeLocation)
      .then(this.displayMarker.bind(this, place));
  }

  public displayCurrentPosition() {

    navigator.geolocation.getCurrentPosition((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let image = 'assets/icon/me.png';
      new google.maps.Marker({
        position: latLng,
        map: this.map,
        icon: image
      });

    });
  }

  private initMap(mapElement: any, placePosition: any) {

    return new Promise((resolve, reject) => {

      let latLng = new google.maps.LatLng(placePosition.latitude, placePosition.longitude);
      
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.map = new google.maps.Map(mapElement.nativeElement, mapOptions);

      resolve();

    });

  }

  private getUserPosition() {

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition( 
        (position) => resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude }),
        (error) => reject(error)
      );
    });

  }

  private getRoute(placePosition: any, userPosition: any) {
    
    let directionsService = new google.maps.DirectionsService;
    let routeRequest = {
      origin: new google.maps.LatLng(userPosition.latitude, userPosition.longitude),
      destination: new google.maps.LatLng(placePosition.latitude, placePosition.longitude),
      travelMode: google.maps.TravelMode.WALKING
    }

    return new Promise((resolve, reject) => {
      directionsService.route(routeRequest, (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          resolve(response);
        }
        else {
          reject('Directions request failed due to ' + status);
        }
      });
    });

  }

  private displayRoute(map: any, route: any) {
    
    let directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay.setMap(map);
    directionsDisplay.setDirections(route);

    return new Promise((resolve, reject) => resolve(route));

  }

  private setDistanceAndTime(route: any) {
    this.distance = route.routes[0].legs[0].distance.text;
    this.duration = route.routes[0].legs[0].duration.text;
  }


  private displayMarker(location: any) {
    let latLng = new google.maps.LatLng(location.latitude, location.longitude);
    let image = 'assets/icon/bar.png';
    new google.maps.Marker({
      position: latLng,
      map: this.map,
      icon: image
    });

  }

}
