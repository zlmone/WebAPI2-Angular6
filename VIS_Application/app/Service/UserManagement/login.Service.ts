import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/topromise';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Router } from '@angular/router';
import { Global } from '../../../app/Shared/global';

@Injectable()
export class LoginService {
    public token: string;

    // This is where your methods and properties go, for example: 
    constructor(private http: Http, private router: Router) { }
    /** 
    * // Encodes the parameters. 
    * 
    * @param params The parameters to be encoded 
    * @return The encoded parameters 
    */
    //private encodeParams(params: any): string {

    //    let body: string = "";
    //    for (let key in params) {
    //        if (body.length) {
    //            body += "&";
    //        }
    //        body += key + "=";
    //        body += encodeURIComponent(params[key]);
    //    }

    //    return body;
    //}

    public doLogin(loginObj: any): Observable<any> {
        let urltohit = Global.BASE_VISUSER_ENDPOINT + 'PostUserByUserIdPassword';
        let body = JSON.stringify(loginObj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(urltohit, body, options)
            .map((response: Response) => <any>response.json())
    }   
        
    public GetActivateImagePath(): Observable<any>
    {
        let urltohit = Global.BASE_VISUSER_ENDPOINT + 'GetActivateLoginImage';
        return this.http.get(urltohit).map((response: Response) => <any>response.json())
    }   

    public ForgotPassword(loginObj: any, model: any): Observable<any>
    {
        
        let urltohit = Global.BASE_FORGOTPASSWORD_ENDPOINT + 'GetForgotPassword?Email=' + model.VISUsername ;
        let body = JSON.stringify(loginObj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(urltohit)
            .map((response: Response) => <any>response.json())
    } 
    
    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        sessionStorage.clear();
    }
}