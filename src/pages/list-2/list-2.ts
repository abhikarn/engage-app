import { Component, ViewChild, OnInit } from '@angular/core';
import {
  NavController, LoadingController,
  Platform, MenuController, Nav, App, ViewController
} from 'ionic-angular';
import 'rxjs/Rx';
import { List2Model } from './list-2.model';
import { List2Service } from './list-2.service';
import { SchoolMasterPage } from '../school-master/school.master.page';
import { SchoolProvider } from '../school-master/school.master.page-provider';
import { List1Service } from '../list-1/list-1.service';

@Component({
  selector: 'list-2-page',
  templateUrl: 'list-2.html'
})
export class List2Page implements OnInit {
  list2: List2Model = new List2Model();
  loading: any;
  pages: Array<{ title: any, icon: string, component: any }>;
  constructor(
    public nav: NavController,
    public appCtrl: App,
    public viewCtrl: ViewController,
    public list2Service: List2Service,
    public list1Service: List1Service,
    public loadingCtrl: LoadingController,
    private schoolProvider: SchoolProvider,
    public menu: MenuController
  ) {
    this.loading = this.loadingCtrl.create();

    this.pages = [
      { title: 'Add School', icon: 'home', component: SchoolMasterPage },
    ];

  }

  ngOnInit() {

  }

  ionViewDidLoad() {
    this.getSchool();
  }

  goToSchool(school) {
    this.appCtrl.getRootNav().push(SchoolMasterPage, { param: school });
  }

  private getSchool() {
    this.loading.present();
    this.schoolProvider.getAllSchool().then(school => {
      this.list2.items = school;
      this.loading.dismiss();
    });
  }

  goToSchoolCreation() {
    this.nav.push(SchoolMasterPage);
  }

  checkClick(item) {
    alert(`${item.schoolName} clicked !!`);
  }
}

