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
var AddEmployeeRecordService = (function () {
    function AddEmployeeRecordService(_http) {
        this._http = _http;
    }
    AddEmployeeRecordService.prototype.FillEmployee = function (url) {
        return this._http.get(url + 'FillEmployee')
            .map(function (response) { return response.json(); });
    };
    AddEmployeeRecordService.prototype.BindEmployeeDetails = function (url, EmpId, Date, LoginUserId) {
        return this._http.get(url + 'BindEmployeeDetails?EmpId=' + EmpId + '&Date=' + Date + '&LoginUserId=' + LoginUserId)
            .map(function (response) { return response.json(); });
    };
    AddEmployeeRecordService.prototype.BindEmployeeAttendance = function (url, EmployeeID, Date) {
        return this._http.get(url + 'BindEmployeeAttendance?EmployeeID=' + EmployeeID + '&Date=' + Date)
            .map(function (response) { return response.json(); });
    };
    AddEmployeeRecordService.prototype.BindHRAttendanceDetails = function (url, EmployeeId, forWhichDate) {
        return this._http.get(url + 'BindHRAttendanceDetails?EmployeeId=' + EmployeeId + '&forWhichDate=' + forWhichDate)
            .map(function (response) { return response.json(); });
    };
    AddEmployeeRecordService.prototype.GetAttendanceTransaction = function (url, EmployeeId, Date, EntryType) {
        return this._http.get(url + 'GetAttendanceTransaction?EmployeeId=' + EmployeeId + '&Date=' + Date + '&EntryType=' + EntryType)
            .map(function (response) { return response.json(); });
    };
    AddEmployeeRecordService.prototype.AddEmployee = function (url, EmployeeId, EntryType, Remarks, EntryTime, Date, Time, Grace) {
        return this._http.get(url + 'AddEmployee?EmployeeId=' + EmployeeId + '&EntryType=' + EntryType + '&Remarks=' + Remarks + '&EntryTime=' + EntryTime + '&Date=' + Date + '&Time=' + Time + '&Grace=' + Grace)
            .map(function (response) { return response.json(); });
    };
    AddEmployeeRecordService.prototype.get = function (url) {
        return this._http.get(url)
            .map(function (response) { return response.json(); });
    };
    AddEmployeeRecordService.prototype.GetUpdateEmployeeAttendance = function (url, id, EmployeeId, EntryType, Remarks, EntryTime, Date, Grace, LoginId, ActualEntryTime) {
        return this._http.get(url + 'GetUpdateEmployeeAttendance?id=' + id + '&EmployeeId=' + EmployeeId + '&EntryType=' + EntryType + '&Remarks=' + Remarks + '&EntryTime=' + EntryTime + '&Date=' + Date + '&Grace=' + Grace + '&LoginId=' + LoginId + '&ActualEntryTime=' + ActualEntryTime)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    AddEmployeeRecordService.prototype.put = function (url, id, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.put(url + 'UpdateEntity/' + id, body, options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    AddEmployeeRecordService.prototype.delete = function (url, id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.delete(url + 'DeleteEntity/' + id, options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    AddEmployeeRecordService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    AddEmployeeRecordService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], AddEmployeeRecordService);
    return AddEmployeeRecordService;
}());
exports.AddEmployeeRecordService = AddEmployeeRecordService;
