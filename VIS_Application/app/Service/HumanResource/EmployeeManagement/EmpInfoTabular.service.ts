import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';


@Injectable()
export class EmpInfoTabularService {
    constructor(private _http: Http) { }


    
    get(url: string): Observable<any> {

        return this._http.get(url)
            .map((response: Response) => <any>response.json());

    }
    GetRoleAdd(url: string): Observable<any> {
    
        return this._http.get(url + 'GetRoleAdd')
            .map((response: Response) => <any>response.json());
    }
    GetRole(url: string): Observable<any> {

        return this._http.get(url + 'GetRole')
            .map((response: Response) => <any>response.json());

    }
    GetTechnology(url: string): Observable<any> {

        return this._http.get(url + 'GetTechnology')
            .map((response: Response) => <any>response.json());

    }
    GetCompany(url: string): Observable<any> {
       
        return this._http.get(url + 'GetCompany')
            .map((response: Response) => <any>response.json());

    }
    GetWorking(url: string): Observable<any> {
       
        return this._http.get(url + 'GetWorking')
            .map((response: Response) => <any>response.json());

    }
    GetJoiningDesignation(url: string): Observable<any> {
       
        return this._http.get(url + 'GetJoiningDesignation')
            .map((response: Response) => <any>response.json());

    }
    GetDepartmentname(url: string): Observable<any> {
       
        return this._http.get(url + 'GetDepartmentname')
            .map((response: Response) => <any>response.json());

    }
    GetPositionName(url: string): Observable<any> {
       
        return this._http.get(url + 'GetPositionName' )
            .map((response: Response) => <any>response.json());

    }
    GetEmployeeGrade(url: string): Observable<any> {
       
        return this._http.get(url + 'GetEmployeeGrade' )
            .map((response: Response) => <any>response.json());

    }
    GetUserRole(url: string): Observable<any> {
       
        return this._http.get(url + 'GetUserRole' )
            .map((response: Response) => <any>response.json());

    }
    GetLinemanager(url: string, Usertype: string, UserId: number): Observable<any> {
        
        return this._http.get(url + 'GetLinemanager?Usertype=' + Usertype + '&&UserId=' + UserId)
            .map((response: Response) => <any>response.json());
    }
    GetEducationType(url: string): Observable<any> {

        return this._http.get(url + 'GetEducationType')
            .map((response: Response) => <any>response.json());

    }
    GetSalaryRangeDropDown(url: string, Salary: number): Observable<any> {

        return this._http.get(url + 'GetSalaryRangeDropDown?Salary=' + Salary)
            .map((response: Response) => <any>response.json());
    }
    GetSalaryBrakup(url: string, SalaryRangeId: number): Observable<any> {
     
        return this._http.get(url + 'GetSalaryBrakup?SalaryRangeId=' + SalaryRangeId)
            .map((response: Response) => <any>response.json());
    }
    FillEmployee(url: string): Observable<any> {

        return this._http.get(url + 'FillEmployee')
            .map((response: Response) => <any>response.json());

    }
    GetOfferdeatils(url: string, UserId:number): Observable<any> {
        
        return this._http.get(url + 'GetOfferdeatils?UserId=' + UserId)
            .map((response: Response) => <any>response.json());

    }
    GetAdustmentleave(url: string, UserId: number): Observable<any> {

        return this._http.get(url + 'GetAdustmentleave?UserId=' + UserId)
            .map((response: Response) => <any>response.json());

    }

    GetEmployeeDeatils(url: string, UserId: string): Observable<any> {
       
        return this._http.get(url + 'GetEmployeeDeatils?UserId=' + UserId)
            .map((response: Response) => <any>response.json());

    }
    FillLeaveDeatil(url: string): Observable<any> {
        debugger;
        return this._http.get(url + 'FillLeaveDeatil')
            .map((response: Response) => <any>response.json());

    }
    GetPendingList(url: string, UserId: string): Observable<any> {
      
        return this._http.get(url + 'GetPendingList?UserId=' + UserId)
            .map((response: Response) => <any>response.json());

    }
    GetFeedbackList(url: string, UserId: string): Observable<any> {
       
        return this._http.get(url + 'GetFeedbackList?UserId=' + UserId)
            .map((response: Response) => <any>response.json());

    }
    GetNonWorking(url: string): Observable<any> {

        return this._http.get(url + 'GetNonWorking')
            .map((response: Response) => <any>response.json());

    }
    GetInTimeOutTimeSelected(url: string): Observable<any> {

        return this._http.get(url + 'GetInTimeOutTimeSelected')
            .map((response: Response) => <any>response.json());

    }

    GetEmployeeTime(url: string, CompanyId: number): Observable<any> {
      
        return this._http.get(url + 'GetEmployeeTime?CompanyId=' + CompanyId)
            .map((response: Response) => <any>response.json());
    }
    FillPassingYear(url: string, EditEmployeeid: string, Editmode:string): Observable<any> {
     
        return this._http.get(url + 'FillPassingYear?EditEmployeeid=' + EditEmployeeid + '&&Editmode=' + Editmode)
            .map((response: Response) => <any>response.json());

    }
    GetIncrementType(url: string): Observable<any> {

        return this._http.get(url + 'GetIncrementType')
            .map((response: Response) => <any>response.json());

    }
    GetLeaveType(url: string): Observable<any> {

        return this._http.get(url + 'GetLeaveType')
            .map((response: Response) => <any>response.json());

    }
    GetSkill(url: string): Observable<any> {

        return this._http.get(url + 'GetSkill')
            .map((response: Response) => <any>response.json());

    }
    GetPopupSkill(url: string, lookupSkilId:number): Observable<any> {

        return this._http.get(url + 'GetPopupSkill?lookupSkilId=' + lookupSkilId)
            .map((response: Response) => <any>response.json());

    }
    GetGridViewList(url: string, UserId: number): Observable<any> {

        return this._http.get(url + 'GetGridViewList?UserId=' + UserId)
            .map((response: Response) => <any>response.json());

    }

    GetAttendanceDetail(url: string, AccessCardId: number, UserId: number): Observable<any> {
        debugger;
        return this._http.get(url + 'GetAttendanceDetail?AccessCardId=' + AccessCardId + '&&UserId=' + UserId)
            .map((response: Response) => <any>response.json());

    }
    GetIncrementList(url: string): Observable<any> {
     
        return this._http.get(url + 'GetIncrementList')
            .map((response: Response) => <any>response.json());

    }
    GetAccountNo(url: string, AccountNumber: string, UserId: string): Observable<any> {

        return this._http.get(url + 'GetAccountNo?AccountNumber=' + AccountNumber + '&&UserId=' + UserId)
            .map((response: Response) => <any>response.json());
    }

    FillProjectDetail(url: string, FromDate: string, ToDate: string, UserId:number): Observable<any> {
       
        return this._http.get(url + 'FillProjectDetail?FromDate=' + FromDate + '&&ToDate=' + ToDate + '&&UserId=' + UserId)
            .map((response: Response) => <any>response.json());
    }
    FillProjectDetailWbs(url: string, FromDate: string, ToDate: string, UserId:number): Observable<any> {
       
        return this._http.get(url + 'FillProjectDetailWbs?FromDate=' + FromDate + '&&ToDate=' + ToDate + '&&UserId=' + UserId)
            .map((response: Response) => <any>response.json());
    }
    SaveMain(url: any, model: any): Observable<any> {
        
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(url + 'SaveMain/', body, options)
            .map((response: Response) => <any>response.json());
    }
    SavePersonal(url: any, model: any): Observable<any> {

        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(url + 'SavePersonal/', body, options)
            .map((response: Response) => <any>response.json());
    }
    SaveEducation(url: any, model: any): Observable<any> {
    
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(url + 'SaveEducation/', body, options)
            .map((response: Response) => <any>response.json());
    }
    SaveSalary(url: any, model: any): Observable<any> {
      
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(url + 'SaveSalary/', body, options)
            .map((response: Response) => <any>response.json());
    }
    SaveAttendance(url: any, model: any): Observable<any> {

        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(url + 'SaveAttendance/', body, options)
            .map((response: Response) => <any>response.json());
    }
    SaveNwdDay(url: any, model: any): Observable<any>
    {
        
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(url + 'SaveNwdDay/', body, options)
            .map((response: Response) => <any>response.json());
    }
    SaveJoining(url: any, model: any): Observable<any> {
      
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(url + 'SaveJoining/', body, options)
            .map((response: Response) => <any>response.json());
    }
    SaveIncrement(url: any, model: any): Observable<any> {
     
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(url + 'SaveIncrement/', body, options)
            .map((response: Response) => <any>response.json());
    }
    SaveOfficial(url: any, model: any): Observable<any> {
   
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(url + 'SaveOfficial/', body, options)
            .map((response: Response) => <any>response.json());
    }
    btnAddExp(url: any, model: any): Observable<any> {

        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(url + 'btnAddExp/', body, options)
            .map((response: Response) => <any>response.json());
    }

    AddLeave(url: any, model: any): Observable<any> {
        
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(url + 'AddLeave/', body, options)
            .map((response: Response) => <any>response.json());
    }
    Saveskill(url: any, model: any): Observable<any> {

        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(url + 'Saveskill/', body, options)
            .map((response: Response) => <any>response.json());
    }


    AddRole(url: any, model: any): Observable<any> {
       
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(url + 'AddRole/', body, options)
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

    //DeleteRole(url: string, ExpRoleId: number): Observable<any> {
    //    debugger;
    //    let headers = new Headers({ 'Content-Type': 'application/json' });
    //    let options = new RequestOptions({ headers: headers });
    //    return this._http.delete(url + 'DeleteRole/' + ExpRoleId, options)
    //        .map((response: Response) => <any>response.json())
    //        .catch(this.handleError);
    //}

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}