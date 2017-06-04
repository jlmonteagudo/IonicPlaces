import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { Area } from './../../shared/model/area/area';
import { AreaService } from '../../shared/model/area/area.service';
import { Observable } from 'rxjs/Observable';
import { ListPlacesPage } from '../list-places/list-places';

@IonicPage()
@Component({
  selector: 'page-list-areas',
  templateUrl: 'list-areas.html',
})
export class ListAreasPage {

  showLoader: boolean = true;
  loading: Loading
  listPlaces = ListPlacesPage;
  areas$: Observable<Area[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public areaService: AreaService, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.areas$ = this.areaService.findAll({orderByChild: 'priority'});
  }

  ionViewDidEnter() {

    if (!this.showLoader) return;

    this.loading = this.loadingCtrl.create({
      content: 'Buscando tabernas en Madrid...',
      duration: 2500
    });

    this.loading.present();
    this.showLoader = false;

  }

}
