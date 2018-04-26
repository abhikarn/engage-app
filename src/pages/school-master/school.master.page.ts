import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { School } from '../../components/models/school.model';
import { Masters } from '../../components/constants/master.constant';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';
@Component({
    selector: 'school-home',
    templateUrl: 'school.master.page.html'
})
export class SchoolMasterPage {

    school: School = { schoolName: '' };
    masters = Masters;
    constructor(private platform: Platform, public navCtrl: NavController,
        private geolocation: Geolocation) {


    }

    getLocation() {
        this.platform.ready().then(() => {

            // get current position
            this.geolocation.getCurrentPosition().then(pos => {
                console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
                this.school.geoCoordinate = 'lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude;
            });

            const watch = this.geolocation.watchPosition().subscribe(pos => {
                console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
            });
            // to stop watching
            watch.unsubscribe();
        });
    }
}

