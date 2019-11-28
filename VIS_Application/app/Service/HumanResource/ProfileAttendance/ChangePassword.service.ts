import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Router } from '@angular/router';
import { Global } from '../../../Shared/global';


@Injectable()
export class ChangePSWService {
    constructor(private _http: Http, private router: Router) { }

    get(url: string): Observable<any> {

        return this._http.get(url)
            .map((response: Response) => <any>response.json());


    }
    public ChangePassword(url:string,Id: number, model:any): Observable<any> {
        
        //let urltohit = Global.BASE_ChhangePassword_ENDPOINT + 'GetChangePassword?Id=' + 3;
        let urltohit = Global.BASE_ChhangePassword_ENDPOINT + 'GetChangePassword?Id=';
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(urltohit + Id, body, options)
            .map((response: Response) => <any>response.json())
    }

}