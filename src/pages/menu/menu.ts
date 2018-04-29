import { Component, ViewChild } from '@angular/core';
import { MenuController, App, Nav, Platform } from 'ionic-angular';

import { HomePage } from '../home/home';
// import { TabsPage } from '../tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
@Component({
    templateUrl: './menu.html'
})
export class MenuPage {

    pages: Array<{ title: any, icon: string, component: any }>;
    pushPages: Array<{ title: any, icon: string, component: any }>;
    rootPage = HomePage;
    @ViewChild(Nav) nav: Nav;
    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
        public menu: MenuController, public app: App) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
        // this.pages = [
        //     { title: 'Tab', icon: 'tab', component: TabsPage },
        // ];
        alert('ok');
        this.pages = [
            { title: 'Home', icon: 'grid', component: HomePage }
            // { title: 'Contact', icon: 'settings', component: ContactPage },
            // { title: 'About', icon: 'logo-wordpress', component: AboutPage },
        ];
    }

    openPage(page) {
        // close the menu when clicking a link from the menu
        this.menu.close();
        // navigate to the new page if it is not the current page
        this.nav.setRoot(page.component);
    }

    pushPage(page) {
        // close the menu when clicking a link from the menu
        this.menu.close();
        // rootNav is now deprecated (since beta 11) (https://forum.ionicframework.com/t/cant-access-rootnav-after-upgrade-to-beta-11/59889)
        this.app.getRootNav().push(page.component);
    }
}
