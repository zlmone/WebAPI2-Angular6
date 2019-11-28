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
var PositionService = (function () {
    function PositionService(_http) {
        this._http = _http;
    }
    PositionService.prototype.get = function (url) {
        return this._http.get(url + "Get")
            .map(function (response) { return response.json(); });
    };
    PositionService.prototype.getskillsforposition = function (url) {
        return this._http.get(url + "GetSkillsForPosition")
            .map(function (response) { return response.json(); });
    };
    PositionService.prototype.getskills = function (url) {
        return this._http.get(url + "GetSkills")
            .map(function (response) { return response.json(); });
    };
    PositionService.prototype.post = function (url, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(url + "Post", body, options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    PositionService.prototype.put = function (url, Id, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.put(url + "UpdateEntity?Id=" + Id, body, options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    PositionService.prototype.delete = function (url, Id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.delete(url + "DeleteEntity?Id=" + Id, options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    PositionService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    PositionService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], PositionService);
    return PositionService;
}());
exports.PositionService = PositionService;
