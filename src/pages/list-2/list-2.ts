import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import {
  NavController, LoadingController, AlertController,
  Platform, MenuController, Nav, App, ViewController, Events,
  NavParams
} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/Rx';
import 'rxjs/add/operator/takeWhile';
import { List2Model } from './list-2.model';
import { List2Service } from './list-2.service';
import { SchoolMasterPage } from '../school-master/school.master.page';
import { SchoolProvider } from '../school-master/school.master.page-provider';
import { List1Service } from '../list-1/list-1.service';
import { WebService } from '../../components/webservice/web-service';
import { ShareService } from '../../components/webservice/shared.service';
import { School } from '../../components/models/school.model';
import { MenuPage } from '../menu/menu';

@Component({
  selector: 'list-2-page',
  templateUrl: 'list-2.html'
})
export class List2Page implements OnInit, OnDestroy {
  list2: School[] = [];
  loading: any;
  alive = true;
  eventSubscription: any;
  pages: Array<{ title: any, icon: string, component: any }>;
  private handler: (type: string) => void;
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
    private events: Events,
    private alertCtrl: AlertController,
    private storage: Storage,
    private navParams: NavParams,
    private shareService: ShareService
  ) {
    this.pages = [
      { title: 'Add School', icon: 'home', component: SchoolMasterPage }
    ];
  }

  ngOnInit() {

  }

  onPageWillEnter() {
    alert('back');
    // You can execute what you want here and it will be executed right before you enter the view
  }

  subsCribe() {
    if (this.shareService.getSubscribe()) {
      this.handler = (type) => {
        if (type === 'upload') {
          this.uploadSchoolAsync();
        } else if (type === 'download') {
          this.downloadSchoolAsync();
        }
      };
      this.events.subscribe('sync:school', this.handler);
    }
  }

  ngOnDestroy() {
  }

  ionViewDidLeave() {
    this.events.unsubscribe('sync:school', this.handler);
    this.handler = null;
  }

  ionViewWillEnter() {
    this.subsCribe();
  }

  ionViewDidLoad() {
    this.getSchool();
  }

  goToSchool(school) {
    this.nav.push(SchoolMasterPage, { param: school });
  }

  private getSchool() {
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    this.schoolProvider.getAllSchool().then(school => {
      console.log('school');
      console.log(school);
      this.list2 = school || [];
      this.loading.dismiss();
    });
  }

  private downloadSchoolAsync(noloader?: boolean) {
    if (!noloader) {
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
    this.webService.getSchoolAll().subscribe((schoolasync: School[]) => {
      this.list2.push(...schoolasync);
      this.list2 = this.removeDuplicates(this.list2, 'id');
      this.schoolProvider.updateDB(this.list2);
      this.loading.dismiss();
    });
  }

  // private uploadSchoolAsync() {
  //   this.schoolProvider.getAllSchool().then(schools => {
  //     this.loading.present();
  //     const schoolFilter = schools.filter((item) => !item.id);
  //     if (!!schoolFilter && schoolFilter.length > 0) {
  //       this.webService.bulkUploadSchoolMaster(schoolFilter).subscribe((response) => {
  //         this.loading.dismiss();
  //         this.schoolProvider.removeBulkSchool(schoolFilter).then((r) => {
  //           this.downloadSchoolAsync(true);
  //           this.messageBox('All schools uploaded for approval.');
  //         });
  //       });
  //     } else {
  //       this.loading.dismiss();
  //       this.messageBox('No schools available for upload.');
  //     }
  //   });
  // }

  private uploadSchoolAsync() {
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    const schoolFilter = this.list2.filter((item) => !item.id);
    console.log(this.list2);
    if (!!schoolFilter && schoolFilter.length > 0) {
      this.webService.bulkUploadSchoolMaster(schoolFilter).subscribe((response) => {
        this.schoolProvider.removeBulkSchool(schoolFilter).then((r) => {
          this.list2 = [];
          this.downloadSchoolAsync(true);
          this.messageBox('All schools uploaded for approval.');
        });
      });
    } else {
      this.loading.dismiss();
      this.messageBox('No schools available for upload.');
    }
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

  private removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }

  removeItem(item1) {
    if (!!item1.schoolTempId && item1.schoolTempId > 0) {
      this.schoolProvider.removeSchool(item1.schoolTempId).then((id) => {
        this.list2 = this.list2.filter((item) => item.schoolTempId !== item1.schoolTempId);
      });
    }
  }

  editItem() {
    alert('edit');
  }

}

