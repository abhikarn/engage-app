import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FormLayoutPage } from '../form-layout/form-layout';
import { FiltersPage } from '../filters/filters';
import { FormValidationsPage } from '../form-validations/form-validations'
import { Observable } from 'rxjs/Observable';
// import { TranslateService } from '@ngx-translate/core';
import { AboutPage } from '../about/about';
import { List2Page } from '../list-2/list-2';
import { List1Page } from '../list-1/list-1';
import { GridPage } from '../grid/grid';
import { SchoolMasterPage } from '../school-master/school.master.page';

// import { ContactPage } from '../contact/contact';
// import { HomePage } from '../home/home';
@Component({
  selector: 'forms-page',
  templateUrl: 'forms.html'
})
export class FormsPage {
  items: Array<{title: string, note?: string, component: any}>;

  constructor(
    public nav: NavController
    // public translate: TranslateService
  ) {
  }

  ionViewWillEnter(){
    this.items = [
          { title: 'FORMS_EXAMPLES', component: FormLayoutPage },
          { title: 'FormValidationsPage', component: FormValidationsPage},
          { title: 'List1Page', component: List1Page },
          { title: 'List2Page', component: List2Page },
          { title: 'GridPage', component: GridPage},
          { title: 'School Masters', component: SchoolMasterPage}
        ];
    // Observable.forkJoin(
    //   this.translate.get('FORMS_EXAMPLES'),
    //   this.translate.get('FILTERS'),
    //   this.translate.get('FORM_VALIDATIONS')
    // ).subscribe(data => {
    //   this.items = [
    //     { title: data[0], component: FormLayoutPage }
    //     // { title: data[1], component: FiltersPage },
    //     // { title: data[2], component: FormValidationsPage }
    //   ];
    // });
  }

  itemTapped(event, item) {
    this.nav.push(item.component);
  }
}
