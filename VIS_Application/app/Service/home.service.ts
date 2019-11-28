import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/topromise';
import { Router } from '@angular/router';
import { Global } from '../Shared/global';

@Injectable()
export class HomeService {
    constructor(private http: Http, private router: Router) { }



    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}