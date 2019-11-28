import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo

@Injectable()
export class AttendanceReportNewService
{
    constructor(private _http: Http) { }

    FillDepartMent(url: string): Observable<any> {
        return this._http.get(url + 'FillDepartMent')
            .map((response: Response) => <any>response.json());
    }
    FillEmployee(url: string, UserId: number, UserType: string): Observable<any> {
        return this._http.get(url + 'FillEmployee?UserId=' + UserId + '&UserType=' + UserType)
            .map((response: Response) => <any>response.json());
    }

    FillYear(url: string): Observable<any> {
        return this._http.get(url + 'FillYear')
            .map((response: Response) => <any>response.json());
    }

    FillCompany(url: string,Allow: boolean): Observable<any> {
        return this._http.get(url + 'FillCompany?Allow=' + Allow)
            .map((response: Response) => <any>response.json());
    }

    FillAllLineManager(url: string, Allow: boolean,UserId:number): Observable<any> {
        return this._http.get(url + 'FillAllLineManager?Allow=' + Allow + '&UserId=' + UserId)
            .map((response: Response) => <any>response.json());
    }

    FillUserType(url: string): Observable<any> {
        return this._http.get(url + 'FillUserType')
            .map((response: Response) => <any>response.json());
    }
    FillAllEmployee(url: string, Allow: boolean, UserId: number): Observable<any> {
        return this._http.get(url + 'FillAllEmployee?Allow=' + Allow + '&UserId=' + UserId)
            .map((response: Response) => <any>response.json());
    }
    GetSystemDateTime(url: string): Observable<any> {
        return this._http.get(url + 'GetSystemDateTime')
            .map((response: Response) => <any>response.json());
    }
    GetAllAttendanceReport(url: string, Mode: string, ModeId: number, StartDate: string, EndDate: string, SortBy: string, IsAdmin: boolean): Observable<any> {
        return this._http.get(url + 'GetAllAttendanceReport?Mode=' + Mode + '&ModeId=' + ModeId + '&StartDate=' + StartDate + '&EndDate=' + EndDate + '&SortBy=' + SortBy + '&IsAdmin=' + IsAdmin)
            .map((response: Response) => <any>response.json());
    }

    GetAllAttendanceData(url: string, Mode: string, ModeId: number, StartDate: string, EndDate: string, SortBy: string, IsAdmin:boolean): Observable<any> {
        return this._http.get(url + 'GetAllAttendanceData?Mode=' + Mode + '&ModeId=' + ModeId + '&StartDate=' + StartDate + '&EndDate=' + EndDate + '&SortBy=' + SortBy + '&IsAdmin=' + IsAdmin)
            .map((response: Response) => <any>response.json());
    }


    get(url: string): Observable<any> {
        return this._http.get(url)
            .map((response: Response) => <any>response.json());
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