import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo

@Injectable()
export class RFQResponseService {
    constructor(private _http: Http) { }


    GetActionTaken(url: string, UserId:number, Access : boolean): Observable<any> {

        return this._http.get(url + 'GetActionTaken?UserId='+ UserId + '&' +'Access='+ Access )
            .map((response: Response) => <any>response.json());
    }
    GetOnLoadData(url: string, UserId: number, RFQId: number): Observable<any> {

        return this._http.get(url + 'GetOnLoadData?UserId=' + UserId + '&' + 'RFQId=' + RFQId)
            .map((response: Response) => <any>response.json());
    }
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
    post(url: string, model: any): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(url, body, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }
    GetTechnology(url: string): Observable<any> {

        return this._http.get(url + 'GetTechnology')
            .map((response: Response) => <any>response.json());
    }
    GetRFQLink(url: string): Observable<any> {

        return this._http.get(url + 'GetRFQLink')
            .map((response: Response) => <any>response.json());
    }
    GetRFQDocument(url: string): Observable<any> {

        return this._http.get(url + 'GetRFQDocument')
            .map((response: Response) => <any>response.json());
    }
    GetViewRFQResponseById(url: string, Id:number): Observable<any> {

        return this._http.get(url + 'GetViewRFQResponseById?Id=' + Id)
            .map((response: Response) => <any>response.json());
    }
    //GetProspectClient(url: string, model: any): Observable<any> {
    //    debugger;
    //    url = url + 'GetProspectClient';
    //    let body = JSON.stringify(model);
    //    let headers = new Headers({ 'Content-Type': 'application/json' });
    //    let options = new RequestOptions({ headers: headers });
    //    return this._http.post(url, body, options)
    //        .map((response: Response) => <any>response.json())
    //        .catch(this.handleError);
    //}

}