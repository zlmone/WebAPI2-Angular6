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
var sharedcontents_1 = require("./Shared/sharedcontents");
var router_1 = require("@angular/router");
var AppComponent = (function () {
    function AppComponent(router, service) {
        var _this = this;
        this.router = router;
        this.service = service;
        this.Employee_Name = '';
        this.displayLoader = 'none';
        this.subscription = service.pageWrapper$.subscribe(function (pWrapper) {
            _this.PageWrapper = pWrapper;
        });
        this.subscription = service.showDashboard$.subscribe(function (showDashboard) {
            _this.ShowDashboard = showDashboard;
        });
    }
    AppComponent.prototype.Logout = function () {
        sessionStorage.clear();
        this.ExitDashboard();
        this.router.navigate(['/login']);
    };
    AppComponent.prototype.AttendanceEntry = function () {
        this.router.navigate(['/AttendanceEntry']);
    };
    AppComponent.prototype.ngOnInit = function () {
        this.VISUsername = sessionStorage.getItem('VISUsername');
        this.Employee_Name = sessionStorage.getItem('UserFullName');
        this.GetDynamicMenuLinkText();
    };
    AppComponent.prototype.buttonClick = function () {
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
    };
    AppComponent.prototype.ExitDashboard = function () {
        this.ShowDashboard = false;
        var vMainContentLeftMargin = "55px";
        var vArrayOfMainContentDivTag = document.getElementById("MainDivToLoadChild");
        vArrayOfMainContentDivTag.style.marginLeft = vMainContentLeftMargin;
    };
    AppComponent.prototype.GetDynamicMenuLinkText = function () {
        if (sessionStorage.length > 0) {
            if (JSON.parse(sessionStorage.getItem('IsAdmin')) || JSON.parse(sessionStorage.getItem('IsLineManager'))) {
                this.strDocmentTemplateHeader = 'Document Template';
            }
            else {
                this.strDocmentTemplateHeader = 'My Suggestion';
            }
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "vis-app",
            templateUrl: "app/app.component.html",
        }),
        __metadata("design:paramtypes", [router_1.Router, sharedcontents_1.SharedContents])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
