import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs";


@Injectable()
export class SchoolMasterService {
  constructor(public http: HttpClient) {}

  getState(): Observable<any> {
    return this.http.get('./assets/example_data/state.json')
    //  .toPromise()
    //  .then(response => response as any)
    //  .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
