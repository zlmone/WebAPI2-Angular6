import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo

@Injectable()
export class RFQService {
    constructor(private _http: Http) { }



    get(url: string, UserName: string): Observable<any> {

        return this._http.get(url + "GetMyRFQ?CommunicationId=" + UserName)
            .map((response: Response) => <any>response.json());
    }
    getAllRFQ(url: string, UserName: string): Observable<any> {

        return this._http.get(url + "GetAllRFQ?CommunicationId=" + UserName)
            .map((response: Response) => <any>response.json());
    }
    getResponceRequestedRFQ(url: string, UserName: string): Observable<any> {

        return this._http.get(url + "GetResponceRequestedRFQ?CommunicationId=" + UserName)
            .map((response: Response) => <any>response.json());
    }

    GetMyActionRFQ(url: string, UserName: string): Observable<any> {

        return this._http.get(url + "GetMyActionRFQ?CommunicationId=" + UserName)
            .map((response: Response) => <any>response.json());
    }
    GetMyWatchListRFQ(url: string, UserName: string): Observable<any> {

        return this._http.get(url + "GetMyWatchListRFQ?CommunicationId=" + UserName)
            .map((response: Response) => <any>response.json());
    }

    //GetBusinessManager

    FillBusinessHead(url: string): Observable<any> {

        return this._http.get(url + 'FillBusinessHead')
            .map((response: Response) => <any>response.json());
    }
    GetBusinessManager(url: string, UserName: string): Observable<any> {

        return this._http.get(url + "GetBusinessManager?UserId=" + UserName)
            .map((response: Response) => <any>response.json());
    }

    GetBusinessType(url: string): Observable<any> {

        return this._http.get(url + 'GetBusinessType')
            .map((response: Response) => <any>response.json());
    }
    GetProjectType(url: string): Observable<any> {

        return this._http.get(url + 'GetProjectType')
            .map((response: Response) => <any>response.json());
    }
    GetIndustries(url: string): Observable<any> {

        return this._http.get(url + 'GetIndustries')
            .map((response: Response) => <any>response.json());
    }
    GetSolution(url: string): Observable<any> {

        return this._http.get(url + 'GetSolution')
            .map((response: Response) => <any>response.json());
    }
    GetServiceOffering(url: string): Observable<any> {

        return this._http.get(url + 'GetServiceOffering')
            .map((response: Response) => <any>response.json());
    }
    GetFileType(url: string): Observable<any> {

        return this._http.get(url + 'GetFileType')
            .map((response: Response) => <any>response.json());
    }
    GetAuthor(url: string): Observable<any> {

        return this._http.get(url + 'GetAuthor')
            .map((response: Response) => <any>response.json());
    }
    GetTechnology(url: string): Observable<any> {

        return this._http.get(url + 'GetTechnology')
            .map((response: Response) => <any>response.json());
    }
    GetEmployee(url: string): Observable<any> {

        return this._http.get(url + 'GetEmployee')
            .map((response: Response) => <any>response.json());
    }
    GetRFQStatus(url: string): Observable<any> {

        return this._http.get(url + 'GetRFQStatus')
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
    GetProspectClient(url : string, model:any): Observable<any> {
        debugger;
        url = url + 'GetProspectClient';
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(url, body, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

}