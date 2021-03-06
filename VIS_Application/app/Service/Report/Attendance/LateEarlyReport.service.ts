﻿import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo

@Injectable()
export class LateEarlyReportService
{
    constructor(private _http: Http) { }

    getemployee(url: any): Observable<any>
    {
        return this._http.get(url + 'GetEmployee')
            .map((response: Response) => <any>response.json());
    }

    getallemployee(url: any): Observable<any>
    {
        return this._http.get(url + 'GetAllEmployee')
            .map((response: Response) => <any>response.json());
    }

    getdepartment(url: any): Observable<any>
    {
        return this._http.get(url + 'GetDepartment')
            .map((response: Response) => <any>response.json());
    }

    getcompany(url: any): Observable<any>
    {
        return this._http.get(url + 'GetCompany')
            .map((response: Response) => <any>response.json());
    }


    getyear(url: any): Observable<any>
    {
        return this._http.get(url + 'GetYear')
            .map((response: Response) => <any>response.json());
    }

    getemployeeidbydepartment(url: any, Id: number, Fromdate: Date, Todate: Date, MonthWise: boolean, FromMonth: string, FromYear: string): Observable<any>
    {
        return this._http.get(url + 'GetIdByDepartment?Id=' + Id + '&Fromdate=' + Fromdate + '&Todate=' + Todate + "&MonthWise=" + MonthWise + "&FromMonth=" + FromMonth + "&FromYear=" + FromYear)
            .map((response: Response) => <any>response.json());
    }

    getemployeeidbyemployee(url: any, Id: number, Fromdate: Date, Todate: Date, MonthWise: boolean, FromMonth: string, FromYear: string): Observable<any>
    {
        return this._http.get(url + 'GetIdByEmployee?Id=' + Id + '&Fromdate=' + Fromdate + '&Todate=' + Todate + "&MonthWise=" + MonthWise + "&FromMonth=" + FromMonth + "&FromYear=" + FromYear)
            .map((response: Response) => <any>response.json());
    }

    getemployeeidbycompany(url: any, Id: number, Fromdate: Date, Todate: Date, MonthWise: boolean, FromMonth: string, FromYear: string): Observable<any>
    {
        return this._http.get(url + 'GetIdByCompany?Id=' + Id + '&Fromdate=' + Fromdate + '&Todate=' + Todate + "&MonthWise=" + MonthWise + "&FromMonth=" + FromMonth + "&FromYear=" + FromYear)
            .map((response: Response) => <any>response.json());
    }

    getemployeeidbyselectall(url: any, Id: number, Fromdate: Date, Todate: Date, MonthWise: boolean, FromMonth: string, FromYear: string): Observable<any>
    {
        return this._http.get(url + 'GetIdBySelectAll?Id=' + Id + '&Fromdate=' + Fromdate + '&Todate=' + Todate + "&MonthWise=" + MonthWise + "&FromMonth=" + FromMonth + "&FromYear=" + FromYear)
            .map((response: Response) => <any>response.json());
    }


    private handleError(error: Response)
    {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}