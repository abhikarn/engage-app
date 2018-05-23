import { Component, ViewChild } from '@angular/core';
import { MenuController, App, Nav, Platform, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../home/home';
import { List2Page } from '../list-2/list-2';
import { List1Page } from '../list-1/list-1';
import { SchoolMasterPage } from '../school-master/school.master.page';
import { SchoolProvider } from '../school-master/school.master.page-provider';
import { ShareService } from '../../components/webservice/shared.service';

// import { TabsPage } from '../tabs/tabs';

@Component({
    templateUrl: './menu.html'
})
export class MenuPage {

    pages: Array<{ title: any, icon: string, component: any }>;
    rootPage = List2Page;
    syncDate = new Date().toLocaleDateString();
    @ViewChild(Nav) nav: Nav;
    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
        public menu: MenuController, public app: App,
        private schoolProvider: SchoolProvider, public events: Events,
        private storage: Storage, private shareService: ShareService) {
        this.schoolProvider.createDB();
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });

        //TODO: // Set Menu from service
        this.pages = [
            { title: 'Home', icon: 'home', component: HomePage },
            { title: 'Add School', icon: 'school', component: SchoolMasterPage },
            { title: 'Upload', icon: 'cloud-upload', component: null },
            { title: 'Download', icon: 'cloud-download', component: null }
        ];
    }

    openPage(page) {
        // close the menu when clicking a link from the menu
        this.menu.close();
        // navigate to the new page if it is not the current page
        if (!!page.component) {
            this.nav.push(page.component);
        } else if (page.title === 'Upload') {
            this.syncSchool();
        } else if (page.title === 'Download') {
            this.viewSchool();
        }
    }

    syncSchool() {
        console.log(this.rootPage);
        this.shareService.setSubscribe(true);
        // (<any>this.rootPage).checkCall();
        // alert('upload-menu');
        this.events.publish('sync:school', 'upload');
        // this.nav.setRoot(List2Page);
    }

    viewSchool() {
        this.shareService.setSubscribe(true);
        // alert('download-menu');
        this.events.publish('sync:school', 'download');
        // this.nav.setRoot(List2Page);
    }
}

