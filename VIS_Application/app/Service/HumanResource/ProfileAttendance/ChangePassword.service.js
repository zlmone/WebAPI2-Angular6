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
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var router_1 = require("@angular/router");
var global_1 = require("../../../Shared/global");
var ChangePSWService = (function () {
    function ChangePSWService(_http, router) {
        this._http = _http;
        this.router = router;
    }
    ChangePSWService.prototype.get = function (url) {
        return this._http.get(url)
            .map(function (response) { return response.json(); });
    };
    ChangePSWService.prototype.ChangePassword = function (url, Id, model) {
        //let urltohit = Global.BASE_ChhangePassword_ENDPOINT + 'GetChangePassword?Id=' + 3;
        var urltohit = global_1.Global.BASE_ChhangePassword_ENDPOINT + 'GetChangePassword?Id=';
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(urltohit + Id, body, options)
            .map(function (response) { return response.json(); });
    };
    ChangePSWService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, router_1.Router])
    ], ChangePSWService);
    return ChangePSWService;
}());
exports.ChangePSWService = ChangePSWService;
