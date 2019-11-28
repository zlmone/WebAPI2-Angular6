﻿import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Global } from '../../Shared/global';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo

@Injectable()
export class AttendanceEntryService {
    constructor(private _http: Http) { }

    getTime(url: string, Id: number, Date: string): Observable<any> {
        return this._http.get(url + 'GetTime?Id=' + Id + '&&'+ 'Date=' + Date)
            .map((response: Response) => <any>response.json());
    }
    
    GetPunchOutNextDay(url: string, Id: number, Forewhichdate: string): Observable<any> {
        return this._http.get(url + 'GetPunchOutNextDayDetails?Id=' + Id + '&&' + 'Date=' + Forewhichdate)
            .map((response: Response) => <any>response.json());
    }
    GetEmployeeName(url: string, Id: number): Observable<any> {
        return this._http.get(url + 'GetEmployeeName?Id=' + Id)
            .map((response: Response) => <any>response.json());
    }
    post(url: string, model: any): Observable<any>
    {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(url + 'AddAttendanceEntryDetails', body, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    put(url: string, id: number, model: any): Observable<any> {

        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.put(url + 'UpdateEntity/' + id, body, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    delete(url: string, id: number): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.delete(url + 'DeleteEntity/' + id, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}