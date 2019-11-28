import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';


@Injectable()
export class MySkillService {
    constructor(private _http: Http) { }


    get(url: string): Observable<any> {

        return this._http.get(url)
            .map((response: Response) => <any>response.json());


    }
    //DeleteSkill(url: string, UserId: number, SkillID: number): Observable<any> {
    //    
    //    let headers = new Headers({ 'Content-Type': 'application/json' });
    //    let options = new RequestOptions({ headers: headers }); 
    //    return this._http.delete(url + 'DeleteSkill/' + UserId  + SkillID, options)
    //        .map((response: Response) => <any>response.json())
    //        .catch(this.handleError);
    //}

    DeleteSkill(url: string, SkillID: number, UserId: number): Observable<any> {

        return this._http.delete(url + 'DeleteSkill?SkillID=' + SkillID + '&&UserId=' + UserId )
            .map((response: Response) => <any>response.json());
    }

   GetMySkill(url: string, UserId :number): Observable<any> {

        return this._http.get(url + 'GetMySkill?UserId=' + UserId)
            .map((response: Response) => <any>response.json());
    }
    GetNewSkill(url: string, UserId: number): Observable<any> {

        return this._http.get(url + 'GetNewSkill?UserId=' + UserId)
            .map((response: Response) => <any>response.json());
   }
    GetPopupChildSkill(url: string): Observable<any> {

        return this._http.get(url + 'GetPopupChildSkill')
            .map((response: Response) => <any>response.json());
    }
    GetPopupSecondSkill(url: string, lookupSkilId: number): Observable<any> {
        
        return this._http.get(url + 'GetPopupSecondSkill?lookupSkilId=' + lookupSkilId)
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