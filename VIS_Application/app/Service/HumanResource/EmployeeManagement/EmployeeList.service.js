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
var EmployeeListService = (function () {
    function EmployeeListService(_http) {
        this._http = _http;
    }
    EmployeeListService.prototype.GetEmployeeListActive = function (url, Usertype, UserId, EmployeeCode) {
        return this._http.get(url + 'GetEmployeeListActive?Usertype=' + Usertype + '&&UserId=' + UserId + '&&EmployeeCode=' + EmployeeCode)
            .map(function (response) { return response.json(); });
    };
    EmployeeListService.prototype.GetEmployeeListAll = function (url, Usertype, UserId, EmployeeCode) {
        return this._http.get(url + 'GetEmployeeListAll?Usertype=' + Usertype + '&&UserId=' + UserId + '&&EmployeeCode=' + EmployeeCode)
            .map(function (response) { return response.json(); });
    };
    EmployeeListService.prototype.GetEmployeeListInActive = function (url, Usertype, UserId, EmployeeCode) {
        return this._http.get(url + 'GetEmployeeListInActive?Usertype=' + Usertype + '&&UserId=' + UserId + '&&EmployeeCode=' + EmployeeCode)
            .map(function (response) { return response.json(); });
    };
    EmployeeListService.prototype.GetEmployeeModeActive = function (url, Usertype, UserId) {
        debugger;
        return this._http.get(url + 'GetEmployeeModeActive?Usertype=' + Usertype + '&&UserId=' + UserId)
            .map(function (response) { return response.json(); });
    };
    EmployeeListService.prototype.GetEmployeeModeAll = function (url, Usertype, UserId) {
        debugger;
        return this._http.get(url + 'GetEmployeeModeAll?Usertype=' + Usertype + '&&UserId=' + UserId)
            .map(function (response) { return response.json(); });
    };
    EmployeeListService.prototype.GetEmployeeModeInActive = function (url, Usertype, UserId) {
        debugger;
        return this._http.get(url + 'GetEmployeeModeInActive?Usertype=' + Usertype + '&&UserId=' + UserId)
            .map(function (response) { return response.json(); });
    };
    EmployeeListService.prototype.get = function (url) {
        return this._http.get(url)
            .map(function (response) { return response.json(); });
    };
    EmployeeListService.prototype.post = function (url, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(url, body, options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    EmployeeListService.prototype.put = function (url, id, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.put(url + 'UpdateEntity/' + id, body, options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    EmployeeListService.prototype.delete = function (url, id) {
        debugger;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.delete(url + 'DeleteEntity/' + id, options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    EmployeeListService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    EmployeeListService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], EmployeeListService);
    return EmployeeListService;
}());
exports.EmployeeListService = EmployeeListService;
