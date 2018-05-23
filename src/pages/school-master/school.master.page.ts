import { Component, OnInit } from '@angular/core';
import {
    NavController, normalizeURL,
    LoadingController, NavParams, AlertController
} from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { List2Page } from '../list-2/list-2';
import { MenuPage } from '../menu/menu';
import { Masters } from '../../components/constants/master.constant';
import { School } from '../../components/models/school.model';
import { WebService } from '../../components/webservice/web-service';
import { ShareService } from '../../components/webservice/shared.service';
import { SchoolProvider } from './school.master.page-provider';

@Component({
    selector: 'school-master',
    templateUrl: 'school.master.page.html'
})
export class SchoolMasterPage implements OnInit {
    editMode = false;
    school: School = { schoolName: '', source: 'm', status: 'Active', approved: false };
    masters = Masters;
    alive = true;
    loading: any;
    formDisabled = false;
    buttonDisabled = null;
    buttonText = 'Save';
    constructor(public navCtrl: NavController,
        private geolocation: Geolocation,
        private camera: Camera,
        public loadingCtrl: LoadingController,
        private navParams: NavParams,
        private schoolProvider: SchoolProvider,
        private alertCtrl: AlertController,
        private webService: WebService,
        private shareService: ShareService
    ) {

        this.loading = this.loadingCtrl.create();
    }

    ngOnInit() {

    }

    ionViewDidLoad() {
        const school = this.navParams.get('param');
        if (!!school) {
            this.school = school;
            // this.school.schoolTempId = !this.school.schoolTempId ?
            this.formDisabled = !!this.school.id;
            this.buttonDisabled = this.formDisabled ? true : null;
            this.editMode = true;
            this.buttonText = 'Update';
        }
    }

    getImage() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: this.camera.PictureSourceType.CAMERA,
            targetWidth: 300,
            targetHeight: 300,
            saveToPhotoAlbum: true,
            correctOrientation: true
        }

        this.camera.getPicture(options).then((imageData) => {
            this.school.schoolImageUri = imageData;
            this.school.schoolImageName = normalizeURL(imageData);
        }, (err) => {
            console.log(err);
            // this.presentToast(err);
        });
    }

    getLocation() {
        this.geolocation.getCurrentPosition().then(pos => {
            // data can be a set of coordinates, or an error (if an error occurred).
            this.school.geoCoordinate = `latitude: ${pos.coords.latitude}, longitude: ${pos.coords.longitude}`;
            this.school.schoolLatitudeCoordinate = `${pos.coords.latitude}`;
            this.school.schoolLongitudeCoordinate = `${pos.coords.longitude}`;
        });

        // let watch = this.geolocation.getCurrentPosition();
        // watch.takeWhile(() => this.alive).subscribe((data) => {
        //     // data can be a set of coordinates, or an error (if an error occurred).
        //     this.school.geoCoordinate = `latitude: ${data.coords.latitude}, longitude: ${data.coords.longitude}`;
        //     this.school.schoolLatitudeCoordinate = `${data.coords.latitude}`;
        //     this.school.schoolLongitudeCoordinate = `${data.coords.longitude}`;
        //     // this.alive = false;
        // });
        // const watch = this.geolocation.watchPosition().subscribe(pos => {
        //     console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
        // });
        // to stop watching
        // watch.unsubscribe();
    }

    saveSchool() {
        this.loading.present();
        if (this.editMode) {
            this.school.stateId = 15;
            this.schoolProvider.updateSchool(this.school).then((id) => {
                this.loading.dismiss();
                this.shareService.setSubscribe(true);
                this.navCtrl.push(MenuPage);
                // this.messageBox('School updated successfully !!!');
            });
        } else {
            this.schoolProvider.saveSchool(this.school).then((id) => {
                this.loading.dismiss();
                this.shareService.setSubscribe(true);
                this.navCtrl.push(MenuPage);
                // this.messageBox('School saved successfully !!!');
            });
        }
    }

    saveSchoolAsync() {
        this.loading.present();
        this.webService.saveSchoolMaster(this.school).subscribe((response: School) => {
            this.loading.dismiss();
            this.school = response;
            const message = this.editMode ? 'School saved successfully !!!' :
                'School updated successfully !!!';
            this.messageBox(message);
        });
    }

    goToList() {
        this.navCtrl.setRoot(List2Page);
    }

    saveConfirm() {
        let alert = this.alertCtrl.create({
            title: 'Confirm',
            message: 'Are you sure you want to save ?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: this.editMode ? 'Update' : 'Save',
                    handler: () => {
                        this.saveSchool();
                    }
                }
            ]
        });
        alert.present();
    }

    private messageBox(message: string) {
        let alert = this.alertCtrl.create({
            title: 'Success',
            message: message,
            buttons: [
                {
                    text: 'OK',
                    handler: () => {
                        this.navCtrl.push(MenuPage);
                    }
                }
            ]
        });
        alert.present();
    }
}



