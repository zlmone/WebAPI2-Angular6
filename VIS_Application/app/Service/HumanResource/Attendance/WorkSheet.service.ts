import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';


@Injectable()
export class WorkSheetService {
    constructor(private _http: Http) { }




    //Saveworksheet(url: string, model: any): Observable<any> {
    //    
    //    let body = JSON.stringify(model);
    //    let headers = new Headers({ 'Content-Type': 'application/json' });
    //    let options = new RequestOptions({ headers: headers });
    //    return this._http.put(url + 'Saveworksheet/', body, options)
    //        .map((response: Response) => <any>response.json())
    //        .catch(this.handleError);
    //}

    Savepost(url: string, model: any): Observable<any> {
        debugger;
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(url + 'SaveWorksheet/', body, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    get(url: string): Observable<any> {

        return this._http.get(url)
            .map((response: Response) => <any>response.json());


    }

   
  
    GetDropDownList(url: string): Observable<any> {
       
        return this._http.get(url + 'GetDropDownList')
            .map((response: Response) => <any>response.json());
    }
    GetDate(url: string): Observable<any> {
        
        return this._http.get(url + 'GetDate')
            .map((response: Response) => <any>response.json());
    }

    GetProjectList(url: any, UserId: number, Date: string): Observable<any> {
        
        return this._http.get(url + 'GetProjectList?UserId=' + UserId + '&&Date=' + Date)
            .map((response: Response) => <any>response.json());
    }
    GetChildTaskDropdown(url: any, ProjectId: number, UserId :number, Date: string): Observable<any> {
        
        return this._http.get(url + 'GetChildtaskDropDown?ProjectId=' + ProjectId + '&&UserId=' + UserId + '&&Date=' + Date)
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