import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo

@Injectable()
export class OutReportService
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

    getlinemanager(url: any): Observable<any>
    {
        return this._http.get(url + 'GetLineManager')
            .map((response: Response) => <any>response.json());
    }

    getoutreportdata(url: any,model:any): Observable<any>
    {

        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(url + 'GetReportByEmployeeId/', body, options)
            .map((response: Response) => <any>response.json());
    }

    getemployeeidbylm(url: any, LineManagerId:number): Observable<any>
    {
        return this._http.get(url + 'GetEmployeeIdByLM?LineManagerId=' + LineManagerId)
            .map((response: Response) => <any>response.json());
    }

    getemployeeidbycompany(url: any, CompanyId: number): Observable<any>
    {
        return this._http.get(url + 'GetEmployeeIdByCompany?CompanyId=' + CompanyId)
            .map((response: Response) => <any>response.json());
    }

    getemployeeidbydepartment(url: any, ParentId: number): Observable<any>
    {
        return this._http.get(url + 'GetEmployeeIdByDepartment?ParentId=' + ParentId)
            .map((response: Response) => <any>response.json());
    }
    
    private handleError(error: Response)
    {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}