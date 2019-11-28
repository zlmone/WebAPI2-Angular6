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
var OutReportService = (function () {
    function OutReportService(_http) {
        this._http = _http;
    }
    OutReportService.prototype.getemployee = function (url) {
        return this._http.get(url + 'GetEmployee')
            .map(function (response) { return response.json(); });
    };
    OutReportService.prototype.getallemployee = function (url) {
        return this._http.get(url + 'GetAllEmployee')
            .map(function (response) { return response.json(); });
    };
    OutReportService.prototype.getdepartment = function (url) {
        return this._http.get(url + 'GetDepartment')
            .map(function (response) { return response.json(); });
    };
    OutReportService.prototype.getcompany = function (url) {
        return this._http.get(url + 'GetCompany')
            .map(function (response) { return response.json(); });
    };
    OutReportService.prototype.getlinemanager = function (url) {
        return this._http.get(url + 'GetLineManager')
            .map(function (response) { return response.json(); });
    };
    OutReportService.prototype.getoutreportdata = function (url, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(url + 'GetReportByEmployeeId/', body, options)
            .map(function (response) { return response.json(); });
    };
    OutReportService.prototype.getemployeeidbylm = function (url, LineManagerId) {
        return this._http.get(url + 'GetEmployeeIdByLM?LineManagerId=' + LineManagerId)
            .map(function (response) { return response.json(); });
    };
    OutReportService.prototype.getemployeeidbycompany = function (url, CompanyId) {
        return this._http.get(url + 'GetEmployeeIdByCompany?CompanyId=' + CompanyId)
            .map(function (response) { return response.json(); });
    };
    OutReportService.prototype.getemployeeidbydepartment = function (url, ParentId) {
        return this._http.get(url + 'GetEmployeeIdByDepartment?ParentId=' + ParentId)
            .map(function (response) { return response.json(); });
    };
    OutReportService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    OutReportService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], OutReportService);
    return OutReportService;
}());
exports.OutReportService = OutReportService;
