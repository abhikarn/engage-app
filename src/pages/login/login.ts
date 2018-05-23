import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';

// import { TabsPage } from '../tabs/tabs';
import { MenuPage } from '../menu/menu';
import { List2Page } from '../list-2/list-2';
import { List1Page } from '../list-1/list-1';
import { HomePage } from '../home/home';

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: FormGroup;
  userName: string = '';
  password: string = '';
  main_page: { component: any };
  loading: any;
  constructor(
    private navController: NavController,
    public loadingCtrl: LoadingController
  ) {
    this.main_page = { component: HomePage };
    // this.navCtrl = this.app.getActiveNav();
    this.login = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('test', Validators.required)
    });
  }

  // get navCtrl(): NavController {
  //   return this.app._roo();
  // }
  doLogin() {
    if (this.userName === 'a' && this.password === 'a') {
      this.navController.setRoot(this.main_page.component);
    } else {
      alert('Invalid Username or pasword.');
    }
  }

  // goToSignup() {
  //   this.nav.push(SignupPage);
  // }

  // goToForgotPassword() {
  //   this.nav.push(ForgotPasswordPage);
  // }

}
