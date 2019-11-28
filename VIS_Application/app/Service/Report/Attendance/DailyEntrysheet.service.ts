import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo

@Injectable()
export class DailyEntrysheetService
{
    constructor(private _http: Http) { }

    getemployee(url: any): Observable<any>
    {
        return this._http.get(url + 'GetAllEmployee')
            .map((response: Response) => <any>response.json());
    }

    getalldailyentryreport(url:any,Id:number,Date:string): Observable<any>
    {
        return this._http.get(url + 'GetDailyEntryRecord?Id=' + Id + '&&Date=' + Date)
            .map((response: Response) => <any>response.json());
    }

    getalldailyentryreportallemp(url: any,Date:string): Observable<any>
    {
        return this._http.get(url + 'GetDailyEntryTimeAllEmp?Date='+Date)
            .map((response: Response) => <any>response.json());
    }

    getalldailyentryreporttime(url: any, Id: number, Date: string): Observable<any>
    {
        return this._http.get(url + 'GetDailyEntryTime?Id=' + Id + '&&Date=' + Date)
            .map((response: Response) => <any>response.json());
    }

    updatereportdetail(url: string, model: any): Observable<any>
    {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.put(url + 'UpdateReportDeatil/' , body, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response)
    {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}