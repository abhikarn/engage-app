import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Http, RequestOptions, Headers } from '@angular/http';
// import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { School } from '../models/school.model';

@Injectable()
export class WebService {

    private apiUrl = 'http://fabkitstudio.com/webapi/';
    // private apiUrl = 'http://localhost:50717/webapi/';
    private clientId: 'fe57dfd72c4e44a092dfbd4a2124bb4c';
    // Resolve HTTP using the constructor
    constructor(private httpClient: HttpClient, private http: Http) {
    }

    // getMasters() {
    //     const userModel = this.getState<UserMaster>('usermodel');
    //     const httpParams = new HttpParams()
    //         .set('countryId', userModel.countryId.toString())
    //         .set('stateId', userModel.stateId.toString())
    //         .set('cityId', userModel.cityId.toString());
    //     return this.httpClient.get(`http://localhost:50717/webapi/Masters`,
    //         {
    //             // headers: this.getHeaders(),
    //             params: httpParams
    //         });
    // }

    private postHeaders() {
        const headers: Headers = new Headers({
            'Content-Type': 'application/json',
            'ClientId': 'fe57dfd72c4e44a092dfbd4a2124bb4c'
        });
        return headers;
    }

    private getHeaders() {
        return new HttpHeaders().set('ClientId', 'fe57dfd72c4e44a092dfbd4a2124bb4c');
    }

    saveSchoolMaster(school: School): Observable<any> {
        const options: RequestOptions = new RequestOptions({ headers: this.postHeaders() });
        return this.http.post(`${this.apiUrl}SchoolMastersMobile`, school, options);
    }

    bulkUploadSchoolMaster(schools: School[]): Observable<any> {
        const options: RequestOptions = new RequestOptions({ headers: this.postHeaders() });
        return this.http.post(`${this.apiUrl}SchoolMastersMobile`, schools, options);
    }

    getSchoolAll(): Observable<any[]> {
        return this.httpClient.get(`${this.apiUrl}SchoolMastersMobile`, { headers: this.getHeaders() }) as Observable<any[]>;
    }

    getSchools(): Observable<School[]> {
        return this.httpClient.get(`${this.apiUrl}SchoolMastersMobile`, { headers: this.getHeaders() }) as Observable<School[]>;
    }
}
