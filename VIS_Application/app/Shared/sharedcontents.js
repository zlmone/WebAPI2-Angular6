"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var SharedContents = (function () {
    function SharedContents() {
        this.PageWrapper = new Subject_1.Subject();
        this.ShowDashboard = new Subject_1.Subject();
        this.loader = new Subject_1.Subject();
        this.pageWrapper$ = this.PageWrapper.asObservable();
        this.showDashboard$ = this.ShowDashboard.asObservable();
        this.loader$ = this.loader.asObservable();
    }
    SharedContents.prototype.setData = function (pWrapper, showDashboard) {
        this.PageWrapper.next(pWrapper);
        this.ShowDashboard.next(showDashboard);
    };
    SharedContents.prototype.setLoader = function (loader) {
        this.loader.next(loader);
    };
    SharedContents = __decorate([
        core_1.Injectable()
    ], SharedContents);
    return SharedContents;
}());
exports.SharedContents = SharedContents;
