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
var LateEarlyReportService = (function () {
    function LateEarlyReportService(_http) {
        this._http = _http;
    }
    LateEarlyReportService.prototype.getemployee = function (url) {
        return this._http.get(url + 'GetEmployee')
            .map(function (response) { return response.json(); });
    };
    LateEarlyReportService.prototype.getallemployee = function (url) {
        return this._http.get(url + 'GetAllEmployee')
            .map(function (response) { return response.json(); });
    };
    LateEarlyReportService.prototype.getdepartment = function (url) {
        return this._http.get(url + 'GetDepartment')
            .map(function (response) { return response.json(); });
    };
    LateEarlyReportService.prototype.getcompany = function (url) {
        return this._http.get(url + 'GetCompany')
            .map(function (response) { return response.json(); });
    };
    LateEarlyReportService.prototype.getyear = function (url) {
        return this._http.get(url + 'GetYear')
            .map(function (response) { return response.json(); });
    };
    LateEarlyReportService.prototype.getemployeeidbydepartment = function (url, Id, Fromdate, Todate, MonthWise, FromMonth, FromYear) {
        return this._http.get(url + 'GetIdByDepartment?Id=' + Id + '&Fromdate=' + Fromdate + '&Todate=' + Todate + "&MonthWise=" + MonthWise + "&FromMonth=" + FromMonth + "&FromYear=" + FromYear)
            .map(function (response) { return response.json(); });
    };
    LateEarlyReportService.prototype.getemployeeidbyemployee = function (url, Id, Fromdate, Todate, MonthWise, FromMonth, FromYear) {
        return this._http.get(url + 'GetIdByEmployee?Id=' + Id + '&Fromdate=' + Fromdate + '&Todate=' + Todate + "&MonthWise=" + MonthWise + "&FromMonth=" + FromMonth + "&FromYear=" + FromYear)
            .map(function (response) { return response.json(); });
    };
    LateEarlyReportService.prototype.getemployeeidbycompany = function (url, Id, Fromdate, Todate, MonthWise, FromMonth, FromYear) {
        return this._http.get(url + 'GetIdByCompany?Id=' + Id + '&Fromdate=' + Fromdate + '&Todate=' + Todate + "&MonthWise=" + MonthWise + "&FromMonth=" + FromMonth + "&FromYear=" + FromYear)
            .map(function (response) { return response.json(); });
    };
    LateEarlyReportService.prototype.getemployeeidbyselectall = function (url, Id, Fromdate, Todate, MonthWise, FromMonth, FromYear) {
        return this._http.get(url + 'GetIdBySelectAll?Id=' + Id + '&Fromdate=' + Fromdate + '&Todate=' + Todate + "&MonthWise=" + MonthWise + "&FromMonth=" + FromMonth + "&FromYear=" + FromYear)
            .map(function (response) { return response.json(); });
    };
    LateEarlyReportService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    LateEarlyReportService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], LateEarlyReportService);
    return LateEarlyReportService;
}());
exports.LateEarlyReportService = LateEarlyReportService;
