import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import 'rxjs/Rx';

import { List2Model } from '../list-2/list-2.model';
import { List2Page } from '../list-2/list-2';
import { List2Service } from '../list-2/list-2.service';
import { SchoolMasterPage } from '../school-master/school.master.page';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  list2: List2Model = new List2Model();
  loading: any;
  constructor(public navCtrl: NavController, public list2Service: List2Service,
    public loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl.create();
  }

  ionViewDidLoad() {
    this.loading.present();
    this.list2Service
      .getData()
      .then(data => {
        this.list2.items = data.items;
        this.loading.dismiss();
      });
  }

  navigate(page) {
    if (page.path === 'school') {
      this.navCtrl.push(List2Page);
    } else {
      alert(page.name);
    }
  }
}

