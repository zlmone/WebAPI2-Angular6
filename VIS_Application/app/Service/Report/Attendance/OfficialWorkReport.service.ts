﻿import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo

@Injectable()
export class OfficialWorkReportService
{
    constructor(private _http: Http) { }

    getemployee(url: any): Observable<any>
    {
        return this._http.get(url + 'GetEmployee')
            .map((response: Response) => <any>response.json());
    }

    getyear(url: any): Observable<any>
    {
        return this._http.get(url + 'GetYear')
            .map((response: Response) => <any>response.json());
    }

    getofficialworkreportdata(url: any, model: any): Observable<any>
    {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(url + 'GetOfficialWorkReport/', body, options)
            .map((response: Response) => <any>response.json());
    }

    private handleError(error: Response)
    {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}