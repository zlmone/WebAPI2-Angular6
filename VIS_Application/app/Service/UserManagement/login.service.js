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
require("rxjs/add/operator/topromise");
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var router_1 = require("@angular/router");
var global_1 = require("../../../app/Shared/global");
var LoginService = (function () {
    // This is where your methods and properties go, for example: 
    function LoginService(http, router) {
        this.http = http;
        this.router = router;
    }
    /**
    * // Encodes the parameters.
    *
    * @param params The parameters to be encoded
    * @return The encoded parameters
    */
    //private encodeParams(params: any): string {
    //    let body: string = "";
    //    for (let key in params) {
    //        if (body.length) {
    //            body += "&";
    //        }
    //        body += key + "=";
    //        body += encodeURIComponent(params[key]);
    //    }
    //    return body;
    //}
    LoginService.prototype.doLogin = function (loginObj) {
        var urltohit = global_1.Global.BASE_VISUSER_ENDPOINT + 'PostUserByUserIdPassword';
        var body = JSON.stringify(loginObj);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(urltohit, body, options)
            .map(function (response) { return response.json(); });
    };
    LoginService.prototype.GetActivateImagePath = function () {
        var urltohit = global_1.Global.BASE_VISUSER_ENDPOINT + 'GetActivateLoginImage';
        return this.http.get(urltohit).map(function (response) { return response.json(); });
    };
    LoginService.prototype.ForgotPassword = function (loginObj, model) {
        var urltohit = global_1.Global.BASE_FORGOTPASSWORD_ENDPOINT + 'GetForgotPassword?Email=' + model.VISUsername;
        var body = JSON.stringify(loginObj);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(urltohit)
            .map(function (response) { return response.json(); });
    };
    LoginService.prototype.logout = function () {
        // clear token remove user from local storage to log user out
        this.token = null;
        sessionStorage.clear();
    };
    LoginService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, router_1.Router])
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
