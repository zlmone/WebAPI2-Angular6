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
var WorkSheetService = (function () {
    function WorkSheetService(_http) {
        this._http = _http;
    }
    //Saveworksheet(url: string, model: any): Observable<any> {
    //    
    //    let body = JSON.stringify(model);
    //    let headers = new Headers({ 'Content-Type': 'application/json' });
    //    let options = new RequestOptions({ headers: headers });
    //    return this._http.put(url + 'Saveworksheet/', body, options)
    //        .map((response: Response) => <any>response.json())
    //        .catch(this.handleError);
    //}
    WorkSheetService.prototype.Savepost = function (url, model) {
        debugger;
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(url + 'SaveWorksheet/', body, options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    WorkSheetService.prototype.get = function (url) {
        return this._http.get(url)
            .map(function (response) { return response.json(); });
    };
    WorkSheetService.prototype.GetDropDownList = function (url) {
        return this._http.get(url + 'GetDropDownList')
            .map(function (response) { return response.json(); });
    };
    WorkSheetService.prototype.GetDate = function (url) {
        return this._http.get(url + 'GetDate')
            .map(function (response) { return response.json(); });
    };
    WorkSheetService.prototype.GetProjectList = function (url, UserId, Date) {
        return this._http.get(url + 'GetProjectList?UserId=' + UserId + '&&Date=' + Date)
            .map(function (response) { return response.json(); });
    };
    WorkSheetService.prototype.GetChildTaskDropdown = function (url, ProjectId, UserId, Date) {
        return this._http.get(url + 'GetChildtaskDropDown?ProjectId=' + ProjectId + '&&UserId=' + UserId + '&&Date=' + Date)
            .map(function (response) { return response.json(); });
    };
    WorkSheetService.prototype.post = function (url, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(url, body, options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    WorkSheetService.prototype.put = function (url, id, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.put(url + 'UpdateEntity/' + id, body, options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    WorkSheetService.prototype.delete = function (url, id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.delete(url + 'DeleteEntity/' + id, options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    WorkSheetService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    WorkSheetService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], WorkSheetService);
    return WorkSheetService;
}());
exports.WorkSheetService = WorkSheetService;
