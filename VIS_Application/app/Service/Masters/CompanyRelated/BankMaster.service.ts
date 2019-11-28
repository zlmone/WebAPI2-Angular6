import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo

@Injectable()
export class BankMasterService
{
    constructor(private _http: Http) { }

    get(url: string): Observable<any>
    {
        return this._http.get(url +"Get")
            .map((response: Response) => <any>response.json());
         
    }

    post(url: string, model: any): Observable<any>
    {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(url+"Post", body, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    put(url: string, id: number, model: any): Observable<any> 
    {
        debugger;
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.put(url + 'UpdateEntity?Id=' + id, body, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    delete(url: string, id: number): Observable<any>
    {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.delete(url + 'DeleteEntity?Id=' + id, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    getcompany(url: string): Observable<any> {
        return this._http.get(url + "GetCompany")
            .map((response: Response) => <any>response.json());

    }
    getcurrency(url: string): Observable<any> {
        return this._http.get(url + "GetCurrency")
            .map((response: Response) => <any>response.json());

    }

    private handleError(error: Response)
    {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}