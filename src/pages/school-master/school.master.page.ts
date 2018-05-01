import { Component, OnInit } from '@angular/core';
import {
    NavController, normalizeURL,
    LoadingController, NavParams, AlertController
} from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { List2Page } from '../list-2/list-2';
import { Masters } from '../../components/constants/master.constant';
import { School } from '../../components/models/school.model';
import { SchoolProvider } from './school.master.page-provider';

@Component({
    selector: 'school-master',
    templateUrl: 'school.master.page.html'
})
export class SchoolMasterPage implements OnInit {
    editMode = false;
    school: School = { schoolName: '' };
    masters = Masters;
    alive = true;
    loading: any;
    buttonText = 'Save';
    constructor(public navCtrl: NavController,
        private geolocation: Geolocation,
        private camera: Camera,
        public loadingCtrl: LoadingController,
        private navParams: NavParams,
        private schoolProvider: SchoolProvider,
        private alertCtrl: AlertController) {

        this.loading = this.loadingCtrl.create();
    }

    ngOnInit() {
        const school = this.navParams.get('param');
        if (!!school) {
            this.loading.present();
            this.school = school;
            this.editMode = true;
            this.buttonText = 'Update';
            this.loading.dismiss();
        }
    }

    getImage() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: this.camera.PictureSourceType.CAMERA,
            targetWidth: 300,
            targetHeight: 300,
            saveToPhotoAlbum: true
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
            this.schoolProvider.updateSchool(this.school).then((id) => {
                this.loading.dismiss();
                this.navCtrl.push(List2Page);
            });
        } else {
            this.schoolProvider.saveSchool(this.school).then((id) => {
                this.loading.dismiss();
                this.navCtrl.push(List2Page);
            });
        }
    }

    goToList() {
        this.navCtrl.push(List2Page);
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
}



