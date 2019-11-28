import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo

@Injectable()
export class ConfigureTicketService
{
    constructor(private _http: Http) { }

    saveemployeeid(url: string, model: any): Observable<any>
    {
        
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.put(url + 'SaveEmployeeId/', model, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    getticketdisplay(url: string, Organization_Id: number): Observable<any>
    {
        return this._http.get(url + 'GetListofTicketDisplay?Organization_Id=' + Organization_Id)
            .map((response: Response) => <any>response.json());
    }

    getparantgroup(url: string): Observable<any>
    {
        return this._http.get(url + 'GetParentGroupData')
            .map((response: Response) => <any>response.json());
    }

    getchildgroup(url: string, Parent_Id:number): Observable<any>
    {
        return this._http.get(url + 'GetChildGroupData?Parent_Id=' + Parent_Id)
            .map((response: Response) => <any>response.json());
    }

    getemployeehead(url: string): Observable<any>
    {
        return this._http.get(url + 'GetEmployeeHeadData')
            .map((response: Response) => <any>response.json());
    }
   
    put(url: string, id: number, model: any): Observable<any>
    {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.put(url + 'UpdateEntity/' + id, body, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}