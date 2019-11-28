import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo

@Injectable()
export class EmployeeListService {
    constructor(private _http: Http) { }

    

    GetEmployeeListActive(url: string, Usertype: string, UserId: number, EmployeeCode: string): Observable<any> {
       
        return this._http.get(url + 'GetEmployeeListActive?Usertype=' + Usertype + '&&UserId=' + UserId + '&&EmployeeCode=' + EmployeeCode)
            .map((response: Response) => <any>response.json());
    }
    GetEmployeeListAll(url: string, Usertype: string, UserId: number, EmployeeCode: string): Observable<any> {
      
        return this._http.get(url + 'GetEmployeeListAll?Usertype=' + Usertype + '&&UserId=' + UserId + '&&EmployeeCode=' + EmployeeCode)
            .map((response: Response) => <any>response.json());
    }
    GetEmployeeListInActive(url: string, Usertype: string, UserId: number, EmployeeCode: string): Observable<any> {
       
        return this._http.get(url + 'GetEmployeeListInActive?Usertype=' + Usertype + '&&UserId=' + UserId + '&&EmployeeCode=' + EmployeeCode)
            .map((response: Response) => <any>response.json());
    }
    GetEmployeeModeActive(url: string, Usertype: string, UserId: number): Observable<any> {
        debugger;
        return this._http.get(url + 'GetEmployeeModeActive?Usertype=' + Usertype + '&&UserId=' + UserId)
            .map((response: Response) => <any>response.json());
    }
    GetEmployeeModeAll(url: string, Usertype: string, UserId: number): Observable<any> {
        debugger;
        return this._http.get(url + 'GetEmployeeModeAll?Usertype=' + Usertype + '&&UserId=' + UserId)
            .map((response: Response) => <any>response.json());
    }
    GetEmployeeModeInActive(url: string, Usertype: string, UserId: number): Observable<any> {
        debugger;
        return this._http.get(url + 'GetEmployeeModeInActive?Usertype=' + Usertype + '&&UserId=' + UserId)
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
        debugger;
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