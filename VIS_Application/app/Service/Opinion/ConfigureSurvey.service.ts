﻿import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo

@Injectable()
export class ConfigureSurveyService {
    constructor(private _http: Http) { }


    GetSurveyDetails(url: string, SearchField: string, searchValue: string, EmployeeId: number, RoleType: string, ServeyType: string, Approvetype:string): Observable<any>
    {
        return this._http.get(url + 'GetSurveyDetails?SearchField=' + SearchField + '&searchValue=' + searchValue + '&EmployeeId=' + EmployeeId + '&RoleType=' + RoleType + '&ServeyType=' + ServeyType + '&Approvetype=' + Approvetype)
            .map((response: Response) => <any>response.json());
    }
    GetRollOfEmployee(url: string, EmployeeId: number, RoleType: string): Observable<any> {
        return this._http.get(url + 'GetRollOfEmployee?EmployeeId=' + EmployeeId + '&RoleType=' + RoleType)
            .map((response: Response) => <any>response.json());
    }

    BindSurveyType(url: string): Observable<any>
    {
        return this._http.get(url + 'BindSurveyType')
            .map((response: Response) => <any>response.json());
    }
    BindUsersForOwnerSelection(url: string,Id:number): Observable<any>
    {
        return this._http.get(url + 'BindUsersForOwnerSelection?Id=' + Id)
            .map((response: Response) => <any>response.json());
    }

    get(url: string): Observable<any> {

        return this._http.get(url)
            .map((response: Response) => <any>response.json());
    }

    post(url: string, model: any): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(url, body, options)
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