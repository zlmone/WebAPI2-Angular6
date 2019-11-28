import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo

@Injectable()
export class MyTicketService {
    constructor(private _http: Http) { }

    get(url: string): Observable<any> {

        return this._http.get(url)
            .map((response: Response) => <any>response.json());

        
    }
    getDp(url: string): Observable<any> {

        return this._http.get(url + 'GetDepatmentDll')
            .map((response: Response) => <any>response.json());
    }

    getchildgroup(url: string, CreatedId: number): Observable<any> {
        
        return this._http.get(url + 'GetChildGroupData?CreatedId=' + CreatedId)
            .map((response: Response) => <any>response.json());
    }
    getViewHistory(url: string, id: number): Observable<any> {

        
        return this._http.get(url + 'GetViewHistoryTicket?id=' + id)
            .map((response: Response) => <any>response.json());
    }
    getTicketDetail(url: string, id: number): Observable<any> {

        
        return this._http.get(url + 'GetDetailTicket?id=' + id)
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