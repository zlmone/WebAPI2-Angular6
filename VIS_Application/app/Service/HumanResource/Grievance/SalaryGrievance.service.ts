    import { Injectable } from '@angular/core';
    import { Http, Response, Headers, RequestOptions } from '@angular/http';
    import { Observable } from 'rxjs/Observable';
    import 'rxjs/add/operator/map';
    import 'rxjs/add/operator/do';
    import 'rxjs/add/operator/catch';


@Injectable()
export class SalaryGrievanceService {

    constructor(private _http: Http) { }

    get(url: string): Observable<any> {

        return this._http.get(url)
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

    put(url: string, UpdatedBy: number,model:any): Observable<any> {

        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.put(url + 'UpdateEntity?UpdatedBy=' + UpdatedBy, body, options)
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


    GetGrievance(url: string,UserId:number,mode:string): Observable<any> {

        return this._http.get(url + 'GetGrievance?UserId=' + UserId + '&mode=' + mode)
            .map((response: Response) => <any>response.json());
    }

    FillDeductionDate(url: string, UserId: number, mode: string): Observable<any>
    {
        return this._http.get(url + 'FillDeductionDate?UserId=' + UserId + '&mode=' + mode)
            .map((response: Response) => <any>response.json());
    }

    LoadEmployeeAttendance(url: string, EmployeeId: number, Date: string): Observable<any> {
        return this._http.get(url + 'LoadEmployeeAttendance?EmployeeId=' + EmployeeId + '&Date=' + Date)
            .map((response: Response) => <any>response.json());
    }

    LoadEmployeeDailyEntry(url: string, EmployeeId: number, Date: string): Observable<any> {
        return this._http.get(url + 'LoadEmployeeDailyEntry?EmployeeId=' + EmployeeId + '&Date=' + Date)
            .map((response: Response) => <any>response.json());
    }

    AddGrievance(url: string,EmployeeId:number,Date:string,PaycutAmt:string,GrievanceRemark:string): Observable<any> {

        return this._http.get(url + 'AddGrievance?EmployeeId=' + EmployeeId + '&Date=' + Date + '&PaycutAmt=' + PaycutAmt + '&GrievanceRemark=' + GrievanceRemark)
            .map((response: Response) => <any>response.json());
    }

    GetGrievanceData(url: string,id:number): Observable<any> {

        return this._http.get(url + 'GetGrievanceData?Id=' + id)
            .map((response: Response) => <any>response.json());
    }
}