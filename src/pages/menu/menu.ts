import { Component, ViewChild } from '@angular/core';
import { MenuController, App, Nav, Platform } from 'ionic-angular';

import { HomePage } from '../home/home';
import { List2Page } from '../list-2/list-2';
import { SchoolMasterPage } from '../school-master/school.master.page';
// import { TabsPage } from '../tabs/tabs';

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
        public menu: MenuController, public app: App) {
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
            { title: 'Sync', icon: 'sync', component: null }
        ];
    }

    openPage(page) {
        // close the menu when clicking a link from the menu
        this.menu.close();
        // navigate to the new page if it is not the current page
        if (!!page.component) {
            this.app.getRootNav().push(page.component);
        }
    }
}

