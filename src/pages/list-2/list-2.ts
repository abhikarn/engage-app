import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import 'rxjs/Rx';

import { List2Model } from './list-2.model';
import { List2Service } from './list-2.service';
import { SchoolMasterPage } from '../school-master/school.master.page';
import { SchoolProvider } from '../school-master/school.master.page-provider';

@Component({
  selector: 'list-2-page',
  templateUrl: 'list-2.html'
})
export class List2Page {
  list2: List2Model = new List2Model();
  loading: any;

  constructor(
    public nav: NavController,
    public list2Service: List2Service,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    private schoolProvider: SchoolProvider
  ) {
    this.loading = this.loadingCtrl.create();
  }

  ionViewDidLoad() {
    this.getSchool();
    // this.list2Service
    //   .getData()
    //   .then(data => {
    //     this.list2.items = data.items;
    //     this.loading.dismiss();
    //   });
  }

  goToSchool(school) {
    this.nav.push(SchoolMasterPage, { param: school });
  }

  getSchool() {
    this.loading.present();
    this.schoolProvider.getAllSchool().then(school => {
      this.list2.items = school;
      this.loading.dismiss();
    });
    // this.storage.get('school').then(data => {
    //   this.list2.items = data;
    // });
  }
}

