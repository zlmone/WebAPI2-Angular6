"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var AttendanceReportService = (function () {
    function AttendanceReportService(_http) {
        this._http = _http;
    }
    AttendanceReportService.prototype.GetDepartment = function (url) {
        return this._http.get(url + 'GetDepartment')
            .map(function (response) { return response.json(); });
    };
    AttendanceReportService.prototype.GetEmployee = function (url) {
        return this._http.get(url + 'GetEmployee')
            .map(function (response) { return response.json(); });
    };
    AttendanceReportService.prototype.GetAllEmployee = function (url) {
        return this._http.get(url + 'GetAllEmployee')
            .map(function (response) { return response.json(); });
    };
    AttendanceReportService.prototype.GetCompany = function (url) {
        return this._http.get(url + 'GetCompany')
            .map(function (response) { return response.json(); });
    };
    AttendanceReportService.prototype.GetLineManager = function (url) {
        return this._http.get(url + 'GetLineManager')
            .map(function (response) { return response.json(); });
    };
    //GetBindAttendanceData(url: string, Id: number, strDate: string, ToDate: string, name: string, DRPData: number, rdbDate: string, Rdbmonth: string, month: number, year: number, cbDeduction: boolean, cbMissingEntry:boolean): Observable<any> {
    //    return this._http.get(url + 'GetBindAttendanceData?Id=' + Id + '&strDate=' + strDate + '&ToDate=' + ToDate + '&name=' + name + '&DRPData=' + DRPData + '&rdbDate=' + rdbDate + '&Rdbmonth=' + Rdbmonth + '&month=' + month + '&year=' + year + '&cbDeduction=' + cbDeduction + '&cbMissingEntry='+ cbMissingEntry)
    //        .map((response: Response) => <any>response.json());
    //}
    AttendanceReportService.prototype.GetBindAttendanceData = function (url, Id, strDate, ToDate, name, DRPData, rdbDate, Rdbmonth, month, year) {
        return this._http.get(url + 'GetBindAttendanceData?Id=' + Id + '&strDate=' + strDate + '&ToDate=' + ToDate + '&name=' + name + '&DRPData=' + DRPData + '&rdbDate=' + rdbDate + '&Rdbmonth=' + Rdbmonth + '&month=' + month + '&year=' + year)
            .map(function (response) { return response.json(); });
    };
    AttendanceReportService.prototype.GetMissingEntry = function (url, fromdate, todate, Employeeids) {
        return this._http.get(url + 'GetMissingEntry?fromdate=' + fromdate + '&todate=' + todate + '&Employeeids=' + Employeeids)
            .map(function (response) { return response.json(); });
    };
    AttendanceReportService.prototype.SelectDepartment = function (url, Department) {
        return this._http.get(url + 'SelectDepartment?Department=' + Department)
            .map(function (response) { return response.json(); });
    };
    AttendanceReportService.prototype.SelectCompany = function (url, Company) {
        return this._http.get(url + 'SelectCompany?Company=' + Company)
            .map(function (response) { return response.json(); });
    };
    AttendanceReportService.prototype.SelectLineManager = function (url, LineManager) {
        return this._http.get(url + 'SelectLineManager?LineManager=' + LineManager)
            .map(function (response) { return response.json(); });
    };
    AttendanceReportService.prototype.GetDepartmentEmployee = function (url, Id) {
        return this._http.get(url + 'GetDepartmentEmployee?Id=' + Id)
            .map(function (response) { return response.json(); });
    };
    AttendanceReportService.prototype.GetDeductionDetails = function (url, fromdate, todate, Employeeids) {
        return this._http.get(url + 'GetDeductionDetails?fromdate=' + fromdate + '&todate=' + todate + '&Employeeids=' + Employeeids)
            .map(function (response) { return response.json(); });
    };
    AttendanceReportService.prototype.GetYear = function (url) {
        return this._http.get(url + 'GetYear')
            .map(function (response) { return response.json(); });
    };
    AttendanceReportService.prototype.GetCheckedData = function (url, name, DRPData) {
        return this._http.get(url + 'GetCheckedData?name=' + name + '&DRPData=' + DRPData)
            .map(function (response) { return response.json(); });
    };
    //----Attendance Approve Punch In
    AttendanceReportService.prototype.AttendanceApproval = function (url, InId, EntryType, Remarks, Date, Time, Grace, ActualHrs) {
        return this._http.get(url + 'AttendanceApproval?InId=' + InId + '&EntryType=' + EntryType + '&Remarks=' + Remarks + '&Date=' + Date + '&Time=' + Time + '&Grace=' + Grace + '&ActualHrs=' + ActualHrs)
            .map(function (response) { return response.json(); });
    };
    AttendanceReportService.prototype.GetDailyEntryTime = function (url, Employee_Id, Date) {
        return this._http.get(url + 'GetDailyEntryTime?Employee_Id=' + Employee_Id + '&Date=' + Date)
            .map(function (response) { return response.json(); });
    };
    AttendanceReportService.prototype.AddEmployeeAttendance = function (url, Id, Employee_Id, EntryType, HODRemarks, Temp, strDate, Time, Grace) {
        return this._http.get(url + 'AttendanceApproveAdd?Id=' + Id + '&Employee_Id=' + Employee_Id + '&EntryType=' + EntryType + '&HODRemarks=' + HODRemarks + '&Temp=' + Temp + '&strDate=' + strDate + '&Time=' + Time + '&Grace=' + Grace)
            .map(function (response) { return response.json(); });
    };
    AttendanceReportService.prototype.AttendanceRejectPunchIn = function (url, Employee_Id, EntryType, Date, RemarksIn, InId) {
        return this._http.get(url + 'AttendanceRejectPunchIn?Employee_Id=' + Employee_Id + '&EntryType=' + EntryType + '&Date=' + Date + '&RemarksIn=' + RemarksIn + '&InId=' + InId)
            .map(function (response) { return response.json(); });
    };
    AttendanceReportService.prototype.ApproveAttendanceOkIn = function (url, InId, Remarks) {
        return this._http.get(url + 'ApproveAttendanceOkIn?InId=' + InId + '&Remarks=' + Remarks)
            .map(function (response) { return response.json(); });
    };
    //----Attendance Approve Punch Out
    AttendanceReportService.prototype.ApproveAttendancePunchOut = function (url, OutId, EntryType, Remarks, Date, Time, Grace, ActualHrs) {
        return this._http.get(url + 'ApproveAttendancePunchOut?OutId=' + OutId + '&EntryType=' + EntryType + '&Remarks=' + Remarks + '&Date=' + Date + '&Time=' + Time + '&Grace=' + Grace + '&ActualHrs=' + ActualHrs)
            .map(function (response) { return response.json(); });
    };
    AttendanceReportService.prototype.AddEmployeeAttendancePunchOut = function (url, Employee_Id, EntryType, HODRemarks, Temp, strDate, Time, Grace) {
        return this._http.get(url + 'AddEmployeeAttendancePunchOut?Employee_Id=' + Employee_Id + '&EntryType=' + EntryType + '&HODRemarks=' + HODRemarks + '&Temp=' + Temp + '&strDate=' + strDate + '&Time=' + Time + '&Grace=' + Grace)
            .map(function (response) { return response.json(); });
    };
    AttendanceReportService.prototype.AttendanceRejectPunchOut = function (url, Employee_Id, EntryType, Date, HODRemarks, OutId) {
        return this._http.get(url + 'AttendanceRejectPunchOut?Employee_Id=' + Employee_Id + '&EntryType=' + EntryType + '&Date=' + Date + '&HODRemarks=' + HODRemarks + '&OutId=' + OutId)
            .map(function (response) { return response.json(); });
    };
    AttendanceReportService.prototype.ApproveAttendanceOkPunchOut = function (url, OutId, Remarks) {
        return this._http.get(url + 'ApproveAttendanceOkPunchOut?OutId=' + OutId + '&Remarks=' + Remarks)
            .map(function (response) { return response.json(); });
    };
    //----Attendance Approve Lunch Out
    AttendanceReportService.prototype.ApproveAttendanceLunchOut = function (url, LunchOutId, Remarks, Time) {
        return this._http.get(url + 'ApproveAttendanceLunchOut?LunchOutId=' + LunchOutId + '&Remarks=' + Remarks + '&Time=' + Time)
            .map(function (response) { return response.json(); });
    };
    AttendanceReportService.prototype.AddEmployeeAttendanceLunchOut = function (url, Employee_Id, EntryType, Remarks, Temp, Date, Time) {
        return this._http.get(url + 'AddEmployeeAttendanceLunchOut?Employee_Id=' + Employee_Id + '&EntryType=' + EntryType + '&Remarks=' + Remarks + '&Temp=' + Temp + '&Date=' + Date + '&Time=' + Time)
            .map(function (response) { return response.json(); });
    };
    AttendanceReportService.prototype.AttendanceRejectLunchOut = function (url, LunchOutId, Employee_Id, EntryType, Date, HODRemarks) {
        return this._http.get(url + 'AttendanceRejectLunchOut?LunchOutId=' + LunchOutId + '&Employee_Id=' + Employee_Id + '&EntryType=' + EntryType + '&Date=' + Date + '&HODRemarks=' + HODRemarks)
            .map(function (response) { return response.json(); });
    };
    AttendanceReportService.prototype.ApproveAttendanceOkLunchOut = function (url, LunchOutId, Remarks) {
        return this._http.get(url + 'ApproveAttendanceOkLunchOut?LunchOutId=' + LunchOutId + '&Remarks=' + Remarks)
            .map(function (response) { return response.json(); });
    };
    //----Attendance Approve Lunch In
    AttendanceReportService.prototype.ApproveAttendanceLunchIn = function (url, LunchInId, Remarks, Time) {
        return this._http.get(url + 'ApproveAttendanceLunchIn?LunchInId=' + LunchInId + '&Remarks=' + Remarks + '&Time=' + Time)
            .map(function (response) { return response.json(); });
    };
    AttendanceReportService.prototype.AddEmployeeAttendanceLunchIn = function (url, Employee_Id, EntryType, Remarks, Temp, Date, Time) {
        return this._http.get(url + 'AddEmployeeAttendanceLunchIn?Employee_Id=' + Employee_Id + '&EntryType=' + EntryType + '&Remarks=' + Remarks + '&Temp=' + Temp + '&Date=' + Date + '&Time=' + Time)
            .map(function (response) { return response.json(); });
    };
    AttendanceReportService.prototype.AttendanceRejectLunchIn = function (url, Employee_Id, LunchInId, EntryType, Date, HODRemarks) {
        return this._http.get(url + 'AttendanceRejectLunchIn?Employee_Id=' + Employee_Id + '&LunchInId=' + LunchInId + '&EntryType=' + EntryType + '&Date=' + Date + '&HODRemarks=' + HODRemarks)
            .map(function (response) { return response.json(); });
    };
    AttendanceReportService.prototype.ApproveAttendanceOkLunchIn = function (url, LunchInId, Remarks) {
        return this._http.get(url + 'ApproveAttendanceOkLunchIn?LunchInId=' + LunchInId + '&Remarks=' + Remarks)
            .map(function (response) { return response.json(); });
    };
    //----Attendance Approve Work In
    AttendanceReportService.prototype.ApproveAttendanceOther = function (url, OtherId, Remarks, Time) {
        return this._http.get(url + 'ApproveAttendanceOther?OtherId=' + OtherId + '&Remarks=' + Remarks + '&Time=' + Time)
            .map(function (response) { return response.json(); });
    };
    AttendanceReportService.prototype.GetEmployeeIsNotHostEmployee = function (url, Employee_Id) {
        return this._http.get(url + 'GetEmployeeIsNotHostEmployee?Employee_Id=' + Employee_Id)
            .map(function (response) { return response.json(); });
    };
    AttendanceReportService.prototype.AddEmployeeAttendanceOtherwork = function (url, Employee_Id, EntryType, HODRemarks, Temp, Date, Time) {
        return this._http.get(url + 'AddEmployeeAttendanceOtherwork?Employee_Id=' + Employee_Id + '&EntryType=' + Employee_Id + '&HODRemarks=' + HODRemarks + '&Temp=' + Temp + '&Date=' + Date + '&Time=' + Time)
            .map(function (response) { return response.json(); });
    };
    AttendanceReportService.prototype.AttendanceRejectOtherWork = function (url, Employee_Id, OtherId, EntryType, Date, HODRemarks) {
        return this._http.get(url + 'AttendanceRejectOtherWork?Employee_Id=' + Employee_Id + '&OtherId=' + OtherId + '&EntryType=' + EntryType + '&Date=' + Date + '&HODRemarks=' + HODRemarks)
            .map(function (response) { return response.json(); });
    };
    AttendanceReportService.prototype.ApproveAttendanceOkOtherWorkIn = function (url, OtherId, Remarks) {
        return this._http.get(url + 'ApproveAttendanceOkOtherWorkIn?OtherId=' + OtherId + '&Remarks=' + Remarks)
            .map(function (response) { return response.json(); });
    };
    AttendanceReportService.prototype.get = function (url) {
        return this._http.get(url)
            .map(function (response) { return response.json(); });
    };
    AttendanceReportService.prototype.put = function (url, id, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.put(url + 'UpdateEntity/' + id, body, options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    AttendanceReportService.prototype.delete = function (url, id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.delete(url + 'DeleteEntity/' + id, options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    AttendanceReportService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    AttendanceReportService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], AttendanceReportService);
    return AttendanceReportService;
}());
exports.AttendanceReportService = AttendanceReportService;
