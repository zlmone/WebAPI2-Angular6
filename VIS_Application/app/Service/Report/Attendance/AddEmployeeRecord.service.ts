import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo

@Injectable()

export class AddEmployeeRecordService {
    constructor(private _http: Http) { }

    FillEmployee(url: string): Observable<any> {
        return this._http.get(url + 'FillEmployee')
            .map((response: Response) => <any>response.json());
    }

    BindEmployeeDetails(url: string, EmpId: number, Date: string, LoginUserId: number): Observable<any> {
        return this._http.get(url + 'BindEmployeeDetails?EmpId=' + EmpId + '&Date=' + Date + '&LoginUserId=' + LoginUserId)
            .map((response: Response) => <any>response.json());
    }

    BindEmployeeAttendance(url: string, EmployeeID: number, Date:string): Observable<any> {
        return this._http.get(url + 'BindEmployeeAttendance?EmployeeID=' + EmployeeID + '&Date=' + Date)
            .map((response: Response) => <any>response.json());
    }

    BindHRAttendanceDetails(url: string, EmployeeId: number, forWhichDate:string): Observable<any> {
        return this._http.get(url + 'BindHRAttendanceDetails?EmployeeId=' + EmployeeId + '&forWhichDate=' + forWhichDate)
            .map((response: Response) => <any>response.json());
    }
    GetAttendanceTransaction(url: string, EmployeeId: number, Date: string, EntryType: number): Observable<any> {
        return this._http.get(url + 'GetAttendanceTransaction?EmployeeId=' + EmployeeId + '&Date=' + Date + '&EntryType=' + EntryType)
            .map((response: Response) => <any>response.json());
    }
    AddEmployee(url: string, EmployeeId: number, EntryType: number, Remarks: string, EntryTime: string, Date: string, Time: string, Grace: number): Observable<any> {
        return this._http.get(url + 'AddEmployee?EmployeeId=' + EmployeeId + '&EntryType=' + EntryType + '&Remarks=' + Remarks + '&EntryTime=' + EntryTime + '&Date=' + Date + '&Time=' + Time + '&Grace=' + Grace)
            .map((response: Response) => <any>response.json());
    }
    
    get(url: string): Observable<any> {
        return this._http.get(url)
            .map((response: Response) => <any>response.json());
    }

    GetUpdateEmployeeAttendance(url: string, id: number, EmployeeId: number, EntryType: number, Remarks: string, EntryTime: string, Date: string, Grace: number, LoginId: number,ActualEntryTime:string): Observable<any> {
        return this._http.get(url + 'GetUpdateEmployeeAttendance?id=' + id + '&EmployeeId=' + EmployeeId + '&EntryType=' + EntryType + '&Remarks=' + Remarks + '&EntryTime=' + EntryTime + '&Date=' + Date + '&Grace=' + Grace + '&LoginId=' + LoginId + '&ActualEntryTime=' + ActualEntryTime)
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