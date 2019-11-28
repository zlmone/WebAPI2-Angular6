import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo

@Injectable()
export class PositionService
{
    constructor(private _http: Http) { }

    get(url: string): Observable<any> {
        return this._http.get(url + "Get")
            .map((response: Response) => <any>response.json());
        
        
    }
    getskillsforposition(url: string): Observable<any> {
        return this._http.get(url + "GetSkillsForPosition")
            .map((response: Response) => <any>response.json());


    }

    getskills(url: string): Observable<any> {
        return this._http.get(url + "GetSkills")
            .map((response: Response) => <any>response.json());


    }

    post(url: string, model: any): Observable<any>
    {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(url + "Post", body, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    put(url: string, Id: number, model: any): Observable<any>
    {

        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.put(url + "UpdateEntity?Id=" + Id, body, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    delete(url: string, Id: number): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.delete(url + "DeleteEntity?Id=" + Id, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}