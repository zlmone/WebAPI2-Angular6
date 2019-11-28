import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';


@Injectable()
export class EmployeeFeedbackService {
    constructor(private _http: Http) { }

    //UpdateFeedback(url: string, id: number, UserId :number): Observable<any> {
    //    debugger;
       
    //    let headers = new Headers({ 'Content-Type': 'application/json' });
    //    let options = new RequestOptions({ headers: headers });
    //    return this._http.put(url + 'UpdateFeedback/Id?=' + id + '&& UserId='+UserId , options)
    //        .map((response: Response) => <any>response.json())
    //        .catch(this.handleError);
    //}



    UpdateFeedback(url: string, Id: number, model: any): Observable<any>
    {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.put(url + 'UpdateFeedback?Id=' + Id, body, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    RejectFeedback(url: string, Id: number, model: any): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.put(url + 'RejectFeedback?Id=' + Id, body, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }
    get(url: string): Observable<any> {

        return this._http.get(url)
            .map((response: Response) => <any>response.json());

    }
    getEmployeeList(url: string, UserId: number): Observable<any> {

        return this._http.get(url + 'GetEmployeeList?UserId=' + UserId)
            .map((response: Response) => <any>response.json());
    }
    GetPendingListEmployee(url: string, UserId: number): Observable<any> {

        return this._http.get(url + 'GetPendingListEmployee?UserId=' + UserId)
            .map((response: Response) => <any>response.json());
    }

    GetEmployeewiseSelect(url: string, TeamEmployeeId :number, UserId: number): Observable<any> {

        return this._http.get(url + 'GetEmployeewiseSelect?TeamEmployeeId=' + TeamEmployeeId + '&&UserId=' + UserId )
            .map((response: Response) => <any>response.json());
    }

    GetEmployeeFeedback(url: string, UserId: number): Observable<any> {

        return this._http.get(url + 'GetEmployeeFeedback?UserId=' + UserId)
            .map((response: Response) => <any>response.json());
    }
    GetMyTeam(url: string, UserId: number): Observable<any> {

        return this._http.get(url + 'GetMyTeam?UserId=' + UserId)
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