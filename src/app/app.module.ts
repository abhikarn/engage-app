import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
// Angular components ends

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { GooglePlus } from '@ionic-native/google-plus';
import { Crop } from '@ionic-native/crop';
import { ImagePicker } from '@ionic-native/image-picker';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicStorageModule } from '@ionic/storage';
// ionic component ends

// ionic pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MenuPage } from '../pages/menu/menu';
import { List2Page } from '../pages/list-2/list-2';
import { List1Page } from '../pages/list-1/list-1';
import { List2Service } from '../pages/list-2/list-2.service';
import { List1Service } from '../pages/list-1/list-1.service';
import { SchoolMasterPage } from '../pages/school-master/school.master.page';
import { SchoolProvider } from '../pages/school-master/school.master.page-provider';


import { PreloadImage } from '../components/preload-image/preload-image';
import { BackgroundImage } from '../components/background-image/background-image';
import { ShowHideContainer } from '../components/show-hide-password/show-hide-container';
import { ShowHideInput } from '../components/show-hide-password/show-hide-input';
import { CounterInput } from '../components/counter-input/counter-input';
import { Rating } from '../components/rating/rating';
import { GoogleMap } from '../components/google-map/google-map';
//custom components ends

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    MenuPage,
    List2Page,
    List1Page,
    SchoolMasterPage,
    //custom components
    PreloadImage,
    BackgroundImage,
    ShowHideContainer,
    ShowHideInput,
    CounterInput,
    Rating,
    GoogleMap
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AngularFontAwesomeModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    HomePage,
    LoginPage,
    MenuPage,
    List2Page,
    List1Page,
    SchoolMasterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    GooglePlus,
    List2Service,
    List1Service,
    SchoolProvider,
    ImagePicker,
    Crop,
    GooglePlus,
    FileTransfer,
    FileTransferObject,
    File,
    Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
