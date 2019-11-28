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
var EmpInfoTabularService = (function () {
    function EmpInfoTabularService(_http) {
        this._http = _http;
    }
    EmpInfoTabularService.prototype.get = function (url) {
        return this._http.get(url)
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.GetRoleAdd = function (url) {
        return this._http.get(url + 'GetRoleAdd')
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.GetRole = function (url) {
        return this._http.get(url + 'GetRole')
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.GetTechnology = function (url) {
        return this._http.get(url + 'GetTechnology')
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.GetCompany = function (url) {
        return this._http.get(url + 'GetCompany')
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.GetWorking = function (url) {
        return this._http.get(url + 'GetWorking')
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.GetJoiningDesignation = function (url) {
        return this._http.get(url + 'GetJoiningDesignation')
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.GetDepartmentname = function (url) {
        return this._http.get(url + 'GetDepartmentname')
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.GetPositionName = function (url) {
        return this._http.get(url + 'GetPositionName')
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.GetEmployeeGrade = function (url) {
        return this._http.get(url + 'GetEmployeeGrade')
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.GetUserRole = function (url) {
        return this._http.get(url + 'GetUserRole')
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.GetLinemanager = function (url, Usertype, UserId) {
        return this._http.get(url + 'GetLinemanager?Usertype=' + Usertype + '&&UserId=' + UserId)
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.GetEducationType = function (url) {
        return this._http.get(url + 'GetEducationType')
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.GetSalaryRangeDropDown = function (url, Salary) {
        return this._http.get(url + 'GetSalaryRangeDropDown?Salary=' + Salary)
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.GetSalaryBrakup = function (url, SalaryRangeId) {
        return this._http.get(url + 'GetSalaryBrakup?SalaryRangeId=' + SalaryRangeId)
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.FillEmployee = function (url) {
        return this._http.get(url + 'FillEmployee')
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.GetOfferdeatils = function (url, UserId) {
        return this._http.get(url + 'GetOfferdeatils?UserId=' + UserId)
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.GetAdustmentleave = function (url, UserId) {
        return this._http.get(url + 'GetAdustmentleave?UserId=' + UserId)
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.GetEmployeeDeatils = function (url, UserId) {
        return this._http.get(url + 'GetEmployeeDeatils?UserId=' + UserId)
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.FillLeaveDeatil = function (url) {
        debugger;
        return this._http.get(url + 'FillLeaveDeatil')
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.GetPendingList = function (url, UserId) {
        return this._http.get(url + 'GetPendingList?UserId=' + UserId)
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.GetFeedbackList = function (url, UserId) {
        return this._http.get(url + 'GetFeedbackList?UserId=' + UserId)
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.GetNonWorking = function (url) {
        return this._http.get(url + 'GetNonWorking')
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.GetInTimeOutTimeSelected = function (url) {
        return this._http.get(url + 'GetInTimeOutTimeSelected')
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.GetEmployeeTime = function (url, CompanyId) {
        return this._http.get(url + 'GetEmployeeTime?CompanyId=' + CompanyId)
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.FillPassingYear = function (url, EditEmployeeid, Editmode) {
        return this._http.get(url + 'FillPassingYear?EditEmployeeid=' + EditEmployeeid + '&&Editmode=' + Editmode)
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.GetIncrementType = function (url) {
        return this._http.get(url + 'GetIncrementType')
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.GetLeaveType = function (url) {
        return this._http.get(url + 'GetLeaveType')
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.GetSkill = function (url) {
        return this._http.get(url + 'GetSkill')
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.GetPopupSkill = function (url, lookupSkilId) {
        return this._http.get(url + 'GetPopupSkill?lookupSkilId=' + lookupSkilId)
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.GetGridViewList = function (url, UserId) {
        return this._http.get(url + 'GetGridViewList?UserId=' + UserId)
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.GetAttendanceDetail = function (url, AccessCardId, UserId) {
        debugger;
        return this._http.get(url + 'GetAttendanceDetail?AccessCardId=' + AccessCardId + '&&UserId=' + UserId)
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.GetIncrementList = function (url) {
        return this._http.get(url + 'GetIncrementList')
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.GetAccountNo = function (url, AccountNumber, UserId) {
        return this._http.get(url + 'GetAccountNo?AccountNumber=' + AccountNumber + '&&UserId=' + UserId)
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.FillProjectDetail = function (url, FromDate, ToDate, UserId) {
        return this._http.get(url + 'FillProjectDetail?FromDate=' + FromDate + '&&ToDate=' + ToDate + '&&UserId=' + UserId)
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.FillProjectDetailWbs = function (url, FromDate, ToDate, UserId) {
        return this._http.get(url + 'FillProjectDetailWbs?FromDate=' + FromDate + '&&ToDate=' + ToDate + '&&UserId=' + UserId)
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.SaveMain = function (url, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(url + 'SaveMain/', body, options)
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.SavePersonal = function (url, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(url + 'SavePersonal/', body, options)
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.SaveEducation = function (url, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(url + 'SaveEducation/', body, options)
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.SaveSalary = function (url, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(url + 'SaveSalary/', body, options)
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.SaveAttendance = function (url, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(url + 'SaveAttendance/', body, options)
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.SaveNwdDay = function (url, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(url + 'SaveNwdDay/', body, options)
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.SaveJoining = function (url, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(url + 'SaveJoining/', body, options)
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.SaveIncrement = function (url, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(url + 'SaveIncrement/', body, options)
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.SaveOfficial = function (url, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(url + 'SaveOfficial/', body, options)
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.btnAddExp = function (url, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(url + 'btnAddExp/', body, options)
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.AddLeave = function (url, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(url + 'AddLeave/', body, options)
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.Saveskill = function (url, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(url + 'Saveskill/', body, options)
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.AddRole = function (url, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(url + 'AddRole/', body, options)
            .map(function (response) { return response.json(); });
    };
    EmpInfoTabularService.prototype.post = function (url, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(url, body, options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    EmpInfoTabularService.prototype.put = function (url, id, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.put(url + 'UpdateEntity/' + id, body, options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    EmpInfoTabularService.prototype.delete = function (url, id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.delete(url + 'DeleteEntity/' + id, options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    //DeleteRole(url: string, ExpRoleId: number): Observable<any> {
    //    debugger;
    //    let headers = new Headers({ 'Content-Type': 'application/json' });
    //    let options = new RequestOptions({ headers: headers });
    //    return this._http.delete(url + 'DeleteRole/' + ExpRoleId, options)
    //        .map((response: Response) => <any>response.json())
    //        .catch(this.handleError);
    //}
    EmpInfoTabularService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    EmpInfoTabularService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], EmpInfoTabularService);
    return EmpInfoTabularService;
}());
exports.EmpInfoTabularService = EmpInfoTabularService;
