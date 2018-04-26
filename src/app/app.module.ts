import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { GooglePlus } from '@ionic-native/google-plus';
import { Crop } from '@ionic-native/crop';
import { ImagePicker } from '@ionic-native/image-picker';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { MenuPage } from '../pages/menu/menu';
import { List2Page } from '../pages/list-2/list-2';
import { List1Page } from '../pages/list-1/list-1';
import { List2Service } from '../pages/list-2/list-2.service';
import { List1Service } from '../pages/list-1/list-1.service';
import { FormsPage } from '../pages/forms/forms';
import { FormLayoutPage } from '../pages/form-layout/form-layout';
import { FiltersPage } from '../pages/filters/filters';
import { FormValidationsPage } from '../pages/form-validations/form-validations';
import { GridPage } from '../pages/grid/grid';
import { SchoolMasterPage } from '../pages/school-master/school.master.page';
//custom components
import { PreloadImage } from '../components/preload-image/preload-image';
import { BackgroundImage } from '../components/background-image/background-image';
import { ShowHideContainer } from '../components/show-hide-password/show-hide-container';
import { ShowHideInput } from '../components/show-hide-password/show-hide-input';
import { ColorRadio } from '../components/color-radio/color-radio';
import { CounterInput } from '../components/counter-input/counter-input';
import { Rating } from '../components/rating/rating';
import { GoogleMap } from '../components/google-map/google-map';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Geolocation } from '@ionic-native/geolocation';

// import { VideoPlayerModule } from '../components/video-player/video-player.module';
// import { ValidatorsModule } from '../components/validators/validators.module';
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    MenuPage,
    List2Page,
    List1Page,
    FormsPage,
    FormLayoutPage,
    FiltersPage,
    FormValidationsPage,
    GridPage,
    SchoolMasterPage,
    //custom components
    PreloadImage,
    BackgroundImage,
    ShowHideContainer,
    ShowHideInput,
    ColorRadio,
    CounterInput,
    Rating,
    GoogleMap
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AngularFontAwesomeModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    MenuPage,
    List2Page,
    List1Page,
    FormsPage,
    FormLayoutPage,
    FiltersPage,
    FormValidationsPage,
    GridPage,
    SchoolMasterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    GooglePlus,
    List2Service,
    List1Service,
    ImagePicker,
    Crop,
    GooglePlus,

    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
