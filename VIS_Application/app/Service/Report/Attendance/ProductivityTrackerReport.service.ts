import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo

@Injectable()
export class ProductivityTrackerReportService
{
    constructor(private _http: Http) { }

    FillAllEmployees(url: string, UserId: number, Allow: boolean): Observable<any>
    {
        return this._http.get(url + 'FillAllEmployees?UserId=' + UserId + '&Allow=' + Allow)
            .map((response: Response) => <any>response.json());
    }

    FillEmployee(url: string, UserId: number, Mode: string, InActive: boolean): Observable<any>
    {
        return this._http.get(url + 'FillEmployee?UserId=' + UserId + '&Mode=' + Mode + '&InActive=' + InActive)
            .map((response: Response) => <any>response.json());
    }

    FillLineManager(url: string, UserId: number, Allow: boolean): Observable<any>
    {
        return this._http.get(url + 'FillLineManager?UserId=' + UserId+ '&Allow=' + Allow)
            .map((response: Response) => <any>response.json());
    }

    FillDepartment(url: string): Observable<any>
    {
        return this._http.get(url + 'FillDepartment')
            .map((response: Response) => <any>response.json());
    }

    FillOverall(url: string): Observable<any>
    {
        return this._http.get(url + 'FillOverall')
            .map((response: Response) => <any>response.json());
    }

    FillLookup(url: string): Observable<any>
    {
        return this._http.get(url + 'FillLookup')
            .map((response: Response) => <any>response.json());
    }

    FillYear(url: string): Observable<any>
    {
        return this._http.get(url + 'FillYear')
            .map((response: Response) => <any>response.json());
    }
    GetProductivity(url: string, sort: string, FromDate: string, ToDate: string, Employeeids: number, Mode: string, OutIds: string, Consolidatedview:string,chk:number): Observable<any>
    {
        debugger;
        return this._http.get(url + 'GetProductivity?sort=' + sort + '&FromDate=' + FromDate + '&ToDate=' + ToDate + '&Employeeids=' + Employeeids + '&Mode=' + Mode + '&OutIds=' + OutIds + '&Consolidatedview=' + Consolidatedview + '&chk=' + chk)
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