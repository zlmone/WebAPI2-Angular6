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
var RFQService = (function () {
    function RFQService(_http) {
        this._http = _http;
    }
    RFQService.prototype.get = function (url, UserName) {
        return this._http.get(url + "GetMyRFQ?CommunicationId=" + UserName)
            .map(function (response) { return response.json(); });
    };
    RFQService.prototype.getAllRFQ = function (url, UserName) {
        return this._http.get(url + "GetAllRFQ?CommunicationId=" + UserName)
            .map(function (response) { return response.json(); });
    };
    RFQService.prototype.getResponceRequestedRFQ = function (url, UserName) {
        return this._http.get(url + "GetResponceRequestedRFQ?CommunicationId=" + UserName)
            .map(function (response) { return response.json(); });
    };
    RFQService.prototype.GetMyActionRFQ = function (url, UserName) {
        return this._http.get(url + "GetMyActionRFQ?CommunicationId=" + UserName)
            .map(function (response) { return response.json(); });
    };
    RFQService.prototype.GetMyWatchListRFQ = function (url, UserName) {
        return this._http.get(url + "GetMyWatchListRFQ?CommunicationId=" + UserName)
            .map(function (response) { return response.json(); });
    };
    //GetBusinessManager
    RFQService.prototype.FillBusinessHead = function (url) {
        return this._http.get(url + 'FillBusinessHead')
            .map(function (response) { return response.json(); });
    };
    RFQService.prototype.GetBusinessManager = function (url, UserName) {
        return this._http.get(url + "GetBusinessManager?UserId=" + UserName)
            .map(function (response) { return response.json(); });
    };
    RFQService.prototype.GetBusinessType = function (url) {
        return this._http.get(url + 'GetBusinessType')
            .map(function (response) { return response.json(); });
    };
    RFQService.prototype.GetProjectType = function (url) {
        return this._http.get(url + 'GetProjectType')
            .map(function (response) { return response.json(); });
    };
    RFQService.prototype.GetIndustries = function (url) {
        return this._http.get(url + 'GetIndustries')
            .map(function (response) { return response.json(); });
    };
    RFQService.prototype.GetSolution = function (url) {
        return this._http.get(url + 'GetSolution')
            .map(function (response) { return response.json(); });
    };
    RFQService.prototype.GetServiceOffering = function (url) {
        return this._http.get(url + 'GetServiceOffering')
            .map(function (response) { return response.json(); });
    };
    RFQService.prototype.GetFileType = function (url) {
        return this._http.get(url + 'GetFileType')
            .map(function (response) { return response.json(); });
    };
    RFQService.prototype.GetAuthor = function (url) {
        return this._http.get(url + 'GetAuthor')
            .map(function (response) { return response.json(); });
    };
    RFQService.prototype.GetTechnology = function (url) {
        return this._http.get(url + 'GetTechnology')
            .map(function (response) { return response.json(); });
    };
    RFQService.prototype.GetEmployee = function (url) {
        return this._http.get(url + 'GetEmployee')
            .map(function (response) { return response.json(); });
    };
    RFQService.prototype.GetRFQStatus = function (url) {
        return this._http.get(url + 'GetRFQStatus')
            .map(function (response) { return response.json(); });
    };
    RFQService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    RFQService.prototype.post = function (url, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(url, body, options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    RFQService.prototype.GetProspectClient = function (url, model) {
        debugger;
        url = url + 'GetProspectClient';
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(url, body, options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    RFQService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], RFQService);
    return RFQService;
}());
exports.RFQService = RFQService;
