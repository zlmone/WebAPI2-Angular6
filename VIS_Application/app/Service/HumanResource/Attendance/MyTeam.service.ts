import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';


@Injectable()
export class MyTeamService {
    constructor(private _http: Http) { }


    get(url: string): Observable<any> {

        return this._http.get(url)
            .map((response: Response) => <any>response.json());

    }
    
    GetMyTeam(url: string, UserId: number): Observable<any> {
      
        return this._http.get(url + 'GetMyTeam?UserId=' + UserId)
            .map((response: Response) => <any>response.json());
    }
    GetLinemanager(url: string, id: number): Observable<any> {
      
        return this._http.get(url + 'GetLinemanager?id=' + id)
            .map((response: Response) => <any>response.json());
    }
    GetSkill(url: string, SkillID:number): Observable<any> {
    
        return this._http.get(url + 'GetSkill?SkillID=' + SkillID)
            .map((response: Response) => <any>response.json());
    }
    GetHoverPopup(url: string, UserId: number): Observable<any> {
      
        return this._http.get(url + 'GetHoverPopup?UserId=' + UserId)
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