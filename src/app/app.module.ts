import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireModule } from 'angularfire2';
import { FirebaseConfig } from '../config/firebase.config';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { MyApp } from './app.component';
import { AreaService } from '../shared/model/area/area.service';
import { PlaceService } from '../shared/model/place/place.service';
import { PlaceMapService } from '../shared/model/maps/place-map.service';
import { AreaMapService } from '../shared/model/maps/area-map.service';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { ListAreasModule } from '../pages/list-areas/list-areas.module';
import { MapPlacesModule } from '../pages/map-places/map-places.module';
import { PlaceModule } from '../pages/place/place.module';
import { ListPlacesModule } from '../pages/list-places/list-places.module';
import { AppPipesModule } from "../pipes/app-pipes.module";

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FirebaseConfig),
    AngularFireDatabaseModule,
    ListAreasModule,
    ListPlacesModule,
    PlaceModule,
    MapPlacesModule,
    AppPipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    AreaService,
    PlaceService,
    PlaceMapService,
    AreaMapService,
    LaunchNavigator,
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
