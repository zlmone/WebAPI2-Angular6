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
var AttendanceReportNewService = (function () {
    function AttendanceReportNewService(_http) {
        this._http = _http;
    }
    AttendanceReportNewService.prototype.FillDepartMent = function (url) {
        return this._http.get(url + 'FillDepartMent')
            .map(function (response) { return response.json(); });
    };
    AttendanceReportNewService.prototype.FillEmployee = function (url, UserId, UserType) {
        return this._http.get(url + 'FillEmployee?UserId=' + UserId + '&UserType=' + UserType)
            .map(function (response) { return response.json(); });
    };
    AttendanceReportNewService.prototype.FillYear = function (url) {
        return this._http.get(url + 'FillYear')
            .map(function (response) { return response.json(); });
    };
    AttendanceReportNewService.prototype.FillCompany = function (url, Allow) {
        return this._http.get(url + 'FillCompany?Allow=' + Allow)
            .map(function (response) { return response.json(); });
    };
    AttendanceReportNewService.prototype.FillAllLineManager = function (url, Allow, UserId) {
        return this._http.get(url + 'FillAllLineManager?Allow=' + Allow + '&UserId=' + UserId)
            .map(function (response) { return response.json(); });
    };
    AttendanceReportNewService.prototype.FillUserType = function (url) {
        return this._http.get(url + 'FillUserType')
            .map(function (response) { return response.json(); });
    };
    AttendanceReportNewService.prototype.FillAllEmployee = function (url, Allow, UserId) {
        return this._http.get(url + 'FillAllEmployee?Allow=' + Allow + '&UserId=' + UserId)
            .map(function (response) { return response.json(); });
    };
    AttendanceReportNewService.prototype.GetSystemDateTime = function (url) {
        return this._http.get(url + 'GetSystemDateTime')
            .map(function (response) { return response.json(); });
    };
    AttendanceReportNewService.prototype.GetAllAttendanceReport = function (url, Mode, ModeId, StartDate, EndDate, SortBy, IsAdmin) {
        return this._http.get(url + 'GetAllAttendanceReport?Mode=' + Mode + '&ModeId=' + ModeId + '&StartDate=' + StartDate + '&EndDate=' + EndDate + '&SortBy=' + SortBy + '&IsAdmin=' + IsAdmin)
            .map(function (response) { return response.json(); });
    };
    AttendanceReportNewService.prototype.GetAllAttendanceData = function (url, Mode, ModeId, StartDate, EndDate, SortBy, IsAdmin) {
        return this._http.get(url + 'GetAllAttendanceData?Mode=' + Mode + '&ModeId=' + ModeId + '&StartDate=' + StartDate + '&EndDate=' + EndDate + '&SortBy=' + SortBy + '&IsAdmin=' + IsAdmin)
            .map(function (response) { return response.json(); });
    };
    AttendanceReportNewService.prototype.get = function (url) {
        return this._http.get(url)
            .map(function (response) { return response.json(); });
    };
    AttendanceReportNewService.prototype.put = function (url, id, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.put(url + 'UpdateEntity/' + id, body, options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    AttendanceReportNewService.prototype.delete = function (url, id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.delete(url + 'DeleteEntity/' + id, options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    AttendanceReportNewService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    AttendanceReportNewService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], AttendanceReportNewService);
    return AttendanceReportNewService;
}());
exports.AttendanceReportNewService = AttendanceReportNewService;
