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
var ConfigureTicketService = (function () {
    function ConfigureTicketService(_http) {
        this._http = _http;
    }
    ConfigureTicketService.prototype.saveemployeeid = function (url, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.put(url + 'SaveEmployeeId/', model, options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ConfigureTicketService.prototype.getticketdisplay = function (url, Organization_Id) {
        return this._http.get(url + 'GetListofTicketDisplay?Organization_Id=' + Organization_Id)
            .map(function (response) { return response.json(); });
    };
    ConfigureTicketService.prototype.getparantgroup = function (url) {
        return this._http.get(url + 'GetParentGroupData')
            .map(function (response) { return response.json(); });
    };
    ConfigureTicketService.prototype.getchildgroup = function (url, Parent_Id) {
        return this._http.get(url + 'GetChildGroupData?Parent_Id=' + Parent_Id)
            .map(function (response) { return response.json(); });
    };
    ConfigureTicketService.prototype.getemployeehead = function (url) {
        return this._http.get(url + 'GetEmployeeHeadData')
            .map(function (response) { return response.json(); });
    };
    ConfigureTicketService.prototype.put = function (url, id, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.put(url + 'UpdateEntity/' + id, body, options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ConfigureTicketService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    ConfigureTicketService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], ConfigureTicketService);
    return ConfigureTicketService;
}());
exports.ConfigureTicketService = ConfigureTicketService;
