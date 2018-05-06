import { Component, ViewChild, OnInit } from '@angular/core';
import {
  NavController, LoadingController, AlertController,
  Platform, MenuController, Nav, App, ViewController, Events
} from 'ionic-angular';
import 'rxjs/Rx';
import { List2Model } from './list-2.model';
import { List2Service } from './list-2.service';
import { SchoolMasterPage } from '../school-master/school.master.page';
import { SchoolProvider } from '../school-master/school.master.page-provider';
import { List1Service } from '../list-1/list-1.service';
import { WebService } from '../../components/webservice/web-service';
import { School } from '../../components/models/school.model';

@Component({
  selector: 'list-2-page',
  templateUrl: 'list-2.html'
})
export class List2Page implements OnInit {
  list2: School[];
  loading: any;
  pages: Array<{ title: any, icon: string, component: any }>;
  constructor(
    private nav: NavController,
    private appCtrl: App,
    private viewCtrl: ViewController,
    private list2Service: List2Service,
    private list1Service: List1Service,
    private loadingCtrl: LoadingController,
    private schoolProvider: SchoolProvider,
    private menu: MenuController,
    private webService: WebService,
    public events: Events,
    private alertCtrl: AlertController
  ) {
    this.loading = this.loadingCtrl.create();

    this.pages = [
      { title: 'Add School', icon: 'home', component: SchoolMasterPage }
    ];

    events.subscribe('sync:school', (type) => {
      this.loading = this.loadingCtrl.create();
      if (type === 'upload') {
        this.uploadSchoolAsync();
      } else if (type === 'download') {
        this.downloadSchoolAsync();
      }
    });
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
      this.list2 = school;
      this.loading.dismiss();
    });
  }

  private downloadSchoolAsync() {
    this.loading.present();
    this.webService.getSchoolAll().subscribe((schoolasync: School[]) => {
      this.list2.push(...schoolasync);
      this.list2 = this.removeDuplicates(this.list2, 'id');
      this.schoolProvider.updateDB(this.list2);
      this.loading.dismiss();
    });
  }

  private uploadSchoolAsync() {
    this.schoolProvider.getAllSchool().then(schools => {
      this.loading.present();
      const schoolFilter = schools.filter((item) => !item.id);
      if (!!schoolFilter && schoolFilter.length > 0) {
        this.webService.bulkUploadSchoolMaster(schoolFilter).subscribe((response) => {
          this.loading.dismiss();
          this.messageBox('All schools uploaded for approval.');
        });
      } else {
        this.loading.dismiss();
        this.messageBox('No schools available for upload.');
      }
    });
  }

  goToSchoolCreation() {
    this.nav.push(SchoolMasterPage);
  }

  checkClick(item) {
    alert(`${item.schoolName} clicked !!`);
  }

  private messageBox(message: string) {
    let alert = this.alertCtrl.create({
      title: 'Success',
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            // this.navCtrl.push(MenuPage);
          }
        }
      ]
    });
    alert.present();
  }

  removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }
}

