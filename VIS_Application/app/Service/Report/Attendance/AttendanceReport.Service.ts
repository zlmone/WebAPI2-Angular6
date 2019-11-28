import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo

@Injectable()
export class AttendanceReportService {

    constructor(private _http: Http) { }

    GetDepartment(url: string): Observable<any> {

        return this._http.get(url + 'GetDepartment')
            .map((response: Response) => <any>response.json());
    }
    GetEmployee(url: string): Observable<any> {

        return this._http.get(url + 'GetEmployee')
            .map((response: Response) => <any>response.json());
    }
    GetAllEmployee(url: string): Observable<any> {

        return this._http.get(url + 'GetAllEmployee')
            .map((response: Response) => <any>response.json());
    }
    GetCompany(url: string): Observable<any> {

        return this._http.get(url + 'GetCompany')
            .map((response: Response) => <any>response.json());
    }
    GetLineManager(url: string): Observable<any> {

        return this._http.get(url + 'GetLineManager')
            .map((response: Response) => <any>response.json());
    }
    //GetBindAttendanceData(url: string, Id: number, strDate: string, ToDate: string, name: string, DRPData: number, rdbDate: string, Rdbmonth: string, month: number, year: number, cbDeduction: boolean, cbMissingEntry:boolean): Observable<any> {
    //    return this._http.get(url + 'GetBindAttendanceData?Id=' + Id + '&strDate=' + strDate + '&ToDate=' + ToDate + '&name=' + name + '&DRPData=' + DRPData + '&rdbDate=' + rdbDate + '&Rdbmonth=' + Rdbmonth + '&month=' + month + '&year=' + year + '&cbDeduction=' + cbDeduction + '&cbMissingEntry='+ cbMissingEntry)
    //        .map((response: Response) => <any>response.json());
    //}
    GetBindAttendanceData(url: string, Id: number, strDate: string, ToDate: string, name: string, DRPData: number, rdbDate: string, Rdbmonth: string, month: number, year: number): Observable<any> {
        return this._http.get(url + 'GetBindAttendanceData?Id=' + Id + '&strDate=' + strDate + '&ToDate=' + ToDate + '&name=' + name + '&DRPData=' + DRPData + '&rdbDate=' + rdbDate + '&Rdbmonth=' + Rdbmonth + '&month=' + month + '&year=' + year)
            .map((response: Response) => <any>response.json());
    }
    GetMissingEntry(url: string, fromdate: string, todate: string, Employeeids:string): Observable<any> {
        return this._http.get(url + 'GetMissingEntry?fromdate=' + fromdate + '&todate=' + todate + '&Employeeids=' + Employeeids)
            .map((response: Response) => <any>response.json());
    }
    SelectDepartment(url: string,Department:string): Observable<any> {
        return this._http.get(url + 'SelectDepartment?Department=' + Department)
            .map((response: Response) => <any>response.json());
    }
    SelectCompany(url: string, Company: string): Observable<any> {
        return this._http.get(url + 'SelectCompany?Company=' + Company)
            .map((response: Response) => <any>response.json());
    }
    SelectLineManager(url: string, LineManager: string): Observable<any> {
        return this._http.get(url + 'SelectLineManager?LineManager=' + LineManager)
            .map((response: Response) => <any>response.json());
    }

    GetDepartmentEmployee(url: string, Id: number): Observable<any> {
        return this._http.get(url + 'GetDepartmentEmployee?Id=' + Id)
            .map((response: Response) => <any>response.json());
    }
    GetDeductionDetails(url: string, fromdate: string, todate: string, Employeeids:string): Observable<any> {
        return this._http.get(url + 'GetDeductionDetails?fromdate=' + fromdate + '&todate=' + todate + '&Employeeids=' + Employeeids)
            .map((response: Response) => <any>response.json());
    }

    GetYear(url: string): Observable<any> {
        return this._http.get(url + 'GetYear')
            .map((response: Response) => <any>response.json());
    }
    GetCheckedData(url: string, name: string, DRPData: string): Observable<any> {
        return this._http.get(url + 'GetCheckedData?name=' + name + '&DRPData=' + DRPData)
            .map((response: Response) => <any>response.json());
    }

    //----Attendance Approve Punch In
    AttendanceApproval(url: string, InId: number, EntryType: number, Remarks: string, Date: string, Time: string, Grace: number, ActualHrs: string): Observable<any> {
        return this._http.get(url + 'AttendanceApproval?InId=' + InId + '&EntryType=' + EntryType + '&Remarks=' + Remarks + '&Date=' + Date + '&Time=' + Time + '&Grace=' + Grace + '&ActualHrs=' + ActualHrs)
            .map((response: Response) => <any>response.json());
    }
    GetDailyEntryTime(url: string, Employee_Id: number, Date: string): Observable<any> {
        return this._http.get(url + 'GetDailyEntryTime?Employee_Id=' + Employee_Id + '&Date=' + Date)
            .map((response: Response) => <any>response.json());
    }
    AddEmployeeAttendance(url: string, Id: number, Employee_Id: number, EntryType: number, HODRemarks: string, Temp: string, strDate: string, Time: string, Grace: number): Observable<any> {
        return this._http.get(url + 'AttendanceApproveAdd?Id=' + Id + '&Employee_Id=' + Employee_Id + '&EntryType=' + EntryType + '&HODRemarks=' + HODRemarks + '&Temp=' + Temp + '&strDate=' + strDate + '&Time=' + Time + '&Grace=' + Grace)
            .map((response: Response) => <any>response.json())
    }
    AttendanceRejectPunchIn(url: string, Employee_Id: number, EntryType: number, Date: string, RemarksIn: string, InId: number): Observable<any> {
        return this._http.get(url + 'AttendanceRejectPunchIn?Employee_Id=' + Employee_Id + '&EntryType=' + EntryType + '&Date=' + Date + '&RemarksIn=' + RemarksIn + '&InId=' + InId)
            .map((response: Response) => <any>response.json());
    }
    ApproveAttendanceOkIn(url: string, InId: number, Remarks: string): Observable<any> {
        return this._http.get(url + 'ApproveAttendanceOkIn?InId=' + InId + '&Remarks=' + Remarks)
            .map((response: Response) => <any>response.json());
    }

    //----Attendance Approve Punch Out
    ApproveAttendancePunchOut(url: string, OutId: number, EntryType: number, Remarks: string, Date: string, Time: string, Grace: number, ActualHrs: string): Observable<any> {
        return this._http.get(url + 'ApproveAttendancePunchOut?OutId=' + OutId + '&EntryType=' + EntryType + '&Remarks=' + Remarks + '&Date=' + Date + '&Time=' + Time + '&Grace=' + Grace + '&ActualHrs=' + ActualHrs)
            .map((response: Response) => <any>response.json());
    }
    AddEmployeeAttendancePunchOut(url: string, Employee_Id: number, EntryType: number, HODRemarks: string, Temp: string, strDate: string, Time: string, Grace: number): Observable<any> {
        return this._http.get(url + 'AddEmployeeAttendancePunchOut?Employee_Id=' + Employee_Id + '&EntryType=' + EntryType + '&HODRemarks=' + HODRemarks + '&Temp=' + Temp + '&strDate=' + strDate + '&Time=' + Time + '&Grace=' + Grace)
            .map((response: Response) => <any>response.json())
    }
    AttendanceRejectPunchOut(url: string, Employee_Id: number, EntryType: number, Date: string, HODRemarks: string, OutId: number): Observable<any> {
        return this._http.get(url + 'AttendanceRejectPunchOut?Employee_Id=' + Employee_Id + '&EntryType=' + EntryType + '&Date=' + Date + '&HODRemarks=' + HODRemarks + '&OutId=' + OutId)
            .map((response: Response) => <any>response.json());
    }
    ApproveAttendanceOkPunchOut(url: string, OutId: number, Remarks: string): Observable<any> {
        return this._http.get(url + 'ApproveAttendanceOkPunchOut?OutId=' + OutId + '&Remarks=' + Remarks)
            .map((response: Response) => <any>response.json());
    }

    //----Attendance Approve Lunch Out

    ApproveAttendanceLunchOut(url: string, LunchOutId: number, Remarks: string, Time: string): Observable<any> {
        return this._http.get(url + 'ApproveAttendanceLunchOut?LunchOutId=' + LunchOutId + '&Remarks=' + Remarks + '&Time=' + Time)
            .map((response: Response) => <any>response.json());
    }
    AddEmployeeAttendanceLunchOut(url: string, Employee_Id: number, EntryType: number, Remarks: string, Temp: string, Date: string, Time: string): Observable<any> {
        return this._http.get(url + 'AddEmployeeAttendanceLunchOut?Employee_Id=' + Employee_Id + '&EntryType=' + EntryType + '&Remarks=' + Remarks + '&Temp=' + Temp + '&Date=' + Date + '&Time=' + Time)
            .map((response: Response) => <any>response.json());
    }
    AttendanceRejectLunchOut(url: string, LunchOutId: number, Employee_Id: number, EntryType: number, Date: string, HODRemarks: string): Observable<any> {
        return this._http.get(url + 'AttendanceRejectLunchOut?LunchOutId=' + LunchOutId + '&Employee_Id=' + Employee_Id + '&EntryType=' + EntryType + '&Date=' + Date + '&HODRemarks=' + HODRemarks)
            .map((response: Response) => <any>response.json());
    }
    ApproveAttendanceOkLunchOut(url: string, LunchOutId: number, Remarks: string): Observable<any> {
        return this._http.get(url + 'ApproveAttendanceOkLunchOut?LunchOutId=' + LunchOutId + '&Remarks=' + Remarks)
            .map((response: Response) => <any>response.json());
    }

    //----Attendance Approve Lunch In
    ApproveAttendanceLunchIn(url: string, LunchInId: number, Remarks: string, Time: string): Observable<any> {
        return this._http.get(url + 'ApproveAttendanceLunchIn?LunchInId=' + LunchInId +'&Remarks=' + Remarks +'&Time=' + Time)
            .map((response: Response) => <any>response.json());
    }
    AddEmployeeAttendanceLunchIn(url: string, Employee_Id: number, EntryType: number, Remarks: string, Temp: string, Date: string, Time: string): Observable<any> {
        return this._http.get(url + 'AddEmployeeAttendanceLunchIn?Employee_Id=' + Employee_Id + '&EntryType=' + EntryType + '&Remarks=' + Remarks + '&Temp=' + Temp + '&Date=' + Date + '&Time=' + Time)
            .map((response: Response) => <any>response.json());
    }
    AttendanceRejectLunchIn(url: string, Employee_Id: number, LunchInId: number,EntryType: number, Date: string, HODRemarks: string): Observable<any> {
        return this._http.get(url + 'AttendanceRejectLunchIn?Employee_Id=' + Employee_Id + '&LunchInId=' + LunchInId + '&EntryType=' + EntryType + '&Date=' + Date + '&HODRemarks=' + HODRemarks)
            .map((response: Response) => <any>response.json());
    }
    ApproveAttendanceOkLunchIn(url: string, LunchInId: number, Remarks: string): Observable<any> {
        return this._http.get(url + 'ApproveAttendanceOkLunchIn?LunchInId=' + LunchInId + '&Remarks=' + Remarks)
            .map((response: Response) => <any>response.json());
    }

    //----Attendance Approve Work In
    ApproveAttendanceOther(url: string, OtherId: number, Remarks: string, Time: string): Observable<any> {
        return this._http.get(url + 'ApproveAttendanceOther?OtherId=' + OtherId + '&Remarks=' + Remarks + '&Time=' + Time)
            .map((response: Response) => <any>response.json());
    }
    GetEmployeeIsNotHostEmployee(url: string, Employee_Id: number): Observable<any> {
        return this._http.get(url + 'GetEmployeeIsNotHostEmployee?Employee_Id=' + Employee_Id)
            .map((response: Response) => <any>response.json());
    }
    AddEmployeeAttendanceOtherwork(url: string, Employee_Id: number, EntryType: number, HODRemarks: string, Temp: string, Date: string, Time: string): Observable<any> {
        return this._http.get(url + 'AddEmployeeAttendanceOtherwork?Employee_Id=' + Employee_Id + '&EntryType=' + Employee_Id + '&HODRemarks=' + HODRemarks + '&Temp=' + Temp + '&Date=' + Date + '&Time=' + Time)
            .map((response: Response) => <any>response.json());
    }
    AttendanceRejectOtherWork(url: string, Employee_Id: number, OtherId: number, EntryType: number, Date: string, HODRemarks: string): Observable<any> {
        return this._http.get(url + 'AttendanceRejectOtherWork?Employee_Id=' + Employee_Id + '&OtherId=' + OtherId + '&EntryType=' + EntryType + '&Date=' + Date + '&HODRemarks=' + HODRemarks)
            .map((response: Response) => <any>response.json());
    }
    ApproveAttendanceOkOtherWorkIn(url: string, OtherId: number, Remarks: string): Observable<any> {
        return this._http.get(url + 'ApproveAttendanceOkOtherWorkIn?OtherId=' + OtherId + '&Remarks=' + Remarks)
            .map((response: Response) => <any>response.json());
    }

    get(url: string): Observable<any> {
        return this._http.get(url)
            .map((response: Response) => <any>response.json());
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