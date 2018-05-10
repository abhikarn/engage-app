import { Component, ViewChild } from '@angular/core';
import { MenuController, App, Nav, Platform, Events } from 'ionic-angular';

import { HomePage } from '../home/home';
import { List2Page } from '../list-2/list-2';
import { SchoolMasterPage } from '../school-master/school.master.page';
import { SchoolProvider } from '../school-master/school.master.page-provider';
// import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
@Component({
    templateUrl: './menu.html'
})
export class MenuPage {

    pages: Array<{ title: any, icon: string, component: any }>;
    rootPage = List2Page;
    @ViewChild(Nav) nav: Nav;
    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
        public menu: MenuController, public app: App,
        private schoolProvider: SchoolProvider, public events: Events, private storage: Storage) {
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
            this.storage.set('actionMenu', true);

            this.syncSchool();
        } else if (page.title === 'Download') {
            this.storage.set('actionMenu', true);

            this.viewSchool();
        }
    }

    syncSchool() {
        // alert('upload-menu');
        this.events.publish('sync:school', 'upload');
        // this.nav.setRoot(List2Page);
    }

    viewSchool() {
        // alert('download-menu');
        this.events.publish('sync:school', 'download');
        // this.nav.setRoot(List2Page);
    }
}

