import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';

// import { TabsPage } from '../tabs/tabs';
import { MenuPage } from '../menu/menu';
import { List2Page } from '../list-2/list-2';
import { List1Page } from '../list-1/list-1';
import { HomePage } from '../home/home';
import { AuthService } from '../../components/webservice/auth.service';
import { Authorization } from '../../components/models/auth.model';
import { UserMaster } from '../../components/models/user.model';

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: FormGroup;
  userName: string = '';
  password: string = '';
  authModel: Authorization = { username: '', password: '', grant_type: 'password' };
  model: UserMaster = { id: 0, userName: '', userPassword: '' };
  main_page: { component: any };
  loading: any;
  constructor(
    private navController: NavController,
    public loadingCtrl: LoadingController,
    private authService: AuthService,
    public storage: Storage
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
    this.authService.login(this.model)
      .subscribe(
        data => {
          this.model = JSON.parse(data.text());
          this.authModel.username = this.model.userName;
          this.authModel.password = this.model.userPassword;
          this.authService.getToken(this.authModel)
            .subscribe(tokenDetail => {
              const authResponse = tokenDetail;
              this.storage.set('authtoken', authResponse.access_token);
              this.storage.set('tokentype', authResponse.token_type);
              this.storage.set('usermodel', this.model);
              this.navController.setRoot(this.main_page.component);
            });
        });
    // if (this.userName === 'a' && this.password === 'a') {
    //   this.navController.setRoot(this.main_page.component);
    // } else {
    //   alert('Invalid Username or pasword.');
    // }
  }

  // goToSignup() {
  //   this.nav.push(SignupPage);
  // }

  // goToForgotPassword() {
  //   this.nav.push(ForgotPasswordPage);
  // }

}
