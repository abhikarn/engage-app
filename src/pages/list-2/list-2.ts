import { Component, ViewChild } from '@angular/core';
import {
  NavController, LoadingController,
  Platform, MenuController, Nav, App
} from 'ionic-angular';
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
  pages: Array<{ title: any, icon: string, component: any }>;
  constructor(
    public nav: NavController,
    public list2Service: List2Service,
    public loadingCtrl: LoadingController,
    private schoolProvider: SchoolProvider,
    public menu: MenuController
  ) {
    this.loading = this.loadingCtrl.create();

    this.pages = [
      { title: 'Add School', icon: 'home', component: SchoolMasterPage },
    ];

  }

  ionViewWillEnter() {
    this.menu.enable(true, 'menu-right');
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  ionViewDidLoad() {
    this.getSchool();
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
  }

  goToSchoolCreation() {
    this.nav.push(SchoolMasterPage);
  }
  checkClick() {
    alert('ok');
  }
}

