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
var CommonHelperService = (function () {
    function CommonHelperService(_http) {
        this._http = _http;
    }
    CommonHelperService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    CommonHelperService.prototype.UploadImageToServer = function (url, formData) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(url, formData, options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CommonHelperService.prototype.ToogleMenu = function () {
        var vProp;
        var vStyleOfElement = document.getElementById("VISNavigationBar");
        var vNewVisNavBarWidth = "300px";
        var vMainContentLeftMargin = "305px";
        var vCurrentStyleInAnchor = "labeldisplayblock";
        var vChangeStyleInAnchor = "labeldisplaynone";
        var vCurrentArrowClass = "arrow";
        var vChangeInArrowClass = "arrownone";
        if (vStyleOfElement.style.width == "300px") {
            vNewVisNavBarWidth = "50px";
            vMainContentLeftMargin = "55px";
        }
        else {
            vNewVisNavBarWidth = "300px";
            vMainContentLeftMargin = "305px";
            vCurrentStyleInAnchor = "labeldisplaynone";
            vChangeStyleInAnchor = "labeldisplayblock";
            vCurrentArrowClass = "arrownone";
            vChangeInArrowClass = "arrow";
        }
        var vArrayOfAnchorTag = document.getElementsByClassName(vCurrentStyleInAnchor);
        while (vArrayOfAnchorTag.length > 0) {
            vArrayOfAnchorTag[0].setAttribute('class', vChangeStyleInAnchor);
        }
        var vArrayOfArrowClass = document.getElementsByClassName(vCurrentArrowClass);
        while (vArrayOfArrowClass.length > 0) {
            vArrayOfArrowClass[0].setAttribute('class', vChangeInArrowClass);
        }
        var vArrayOfMainContentDivTag = document.getElementById("MainDivToLoadChild");
        vArrayOfMainContentDivTag.style.marginLeft = vMainContentLeftMargin;
        vStyleOfElement.style.width = vNewVisNavBarWidth;
        $(".navbar-collapse in").addClass("navbar-collapse");
        $(".navbar-collapse in").toggleClass("collapsed");
    };
    CommonHelperService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], CommonHelperService);
    return CommonHelperService;
}());
exports.CommonHelperService = CommonHelperService;
