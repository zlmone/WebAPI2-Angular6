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
var router_1 = require("@angular/router");
require("rxjs/add/observable/throw");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
require("rxjs/add/operator/map");
require("rxjs/add/operator/switchMap");
require("rxjs/add/operator/toPromise");
var core_1 = require("@angular/core");
var Login_Service_1 = require("../service/UserManagement/Login.Service");
var UserAuthGuard = (function () {
    function UserAuthGuard(LoginService, router) {
        this.LoginService = LoginService;
        this.router = router;
    }
    UserAuthGuard.prototype.canActivate = function (route, state) {
        if (sessionStorage.getItem('type') == 'user' && sessionStorage.getItem('name')) {
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    };
    UserAuthGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [Login_Service_1.LoginService, router_1.Router])
    ], UserAuthGuard);
    return UserAuthGuard;
}());
exports.UserAuthGuard = UserAuthGuard;
