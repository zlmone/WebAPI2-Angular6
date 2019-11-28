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
var MyProfiles_service_1 = require("../../../Service/HumanResource/ProfileAttendance/MyProfiles.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../../Shared/global");
var pager_index_1 = require("../../../Shared/pager.index");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var MyProfilesComponent = (function () {
    function MyProfilesComponent(fb, _MyProfilesService, http, router, pagerService) {
        this.fb = fb;
        this._MyProfilesService = _MyProfilesService;
        this.http = http;
        this.router = router;
        this.pagerService = pagerService;
        this.indLoading = false;
        this.isDesc = false;
        this.CurrentRecordsPerPage = 10;
        // pager object
        this.pager = {};
    }
    MyProfilesComponent.prototype.ngOnInit = function () {
        this.MyProfilesFrm = this.fb.group({
            Mode: [''],
            UserId: [''],
            Employee_Name: [''],
            LineManagerName: [''],
            FirstName: [''],
            MiddleName: [''],
            LastName: [''],
            Gender: [''],
            PhotographFileName: [''],
            CompanyName: [''],
            Email: [''],
            JoiningDesignation: [''],
            DepartmentName: [''],
            FatherName: [''],
            MotherName: [''],
            PermenantAddres: [''],
            CommunicationAddress: [''],
            LandlineNumber: [''],
            MobileNumber: [''],
            BirthDate: [''],
            BloodGroup: [''],
            MaritalStatus: [''],
        });
        this.LoadGetUserProfiles(21);
        this.LoadEducationDetail(21);
        this.LoadEmployeeList();
    };
    MyProfilesComponent.prototype.LoadGetUserProfiles = function (UserId) {
        var _this = this;
        this.ImgGlobalPath = global_1.Global.WebAccessURL;
        this.indLoading = true;
        this._MyProfilesService.getuserProfile(global_1.Global.BASE_MyProfiles_ENDPOINT, UserId)
            .subscribe(function (DATADP) {
            _this.ViewHistory = DATADP;
            _this.indLoading = false;
        });
    };
    MyProfilesComponent.prototype.LoadEducationDetail = function (UserId) {
        var _this = this;
        this.indLoading = true;
        this._MyProfilesService.getEducatinDeatils(global_1.Global.BASE_MyProfiles_ENDPOINT, UserId)
            .subscribe(function (DATADP) {
            _this.ViewEducation = DATADP;
            _this.indLoading = false;
        });
    };
    MyProfilesComponent.prototype.LoadSelectValue = function (event) {
        var _this = this;
        debugger;
        this.indLoading = true;
        this.Dropdownlist = this.employeeheadlist.filter(function (x) { return x.UserId == event.target.value; })[0];
        console.log(this.Dropdownlist);
        this._MyProfilesService.getuserProfile(global_1.Global.BASE_MyProfiles_ENDPOINT, this.Dropdownlist.UserId)
            .subscribe(function (DATADP) {
            _this.ViewHistory = DATADP;
            console.log(DATADP);
            _this.indLoading = false;
        });
        this._MyProfilesService.getEducatinDeatils(global_1.Global.BASE_MyProfiles_ENDPOINT, this.Dropdownlist.UserId)
            .subscribe(function (DATADP) {
            _this.ViewEducation = DATADP;
            console.log(DATADP);
            _this.indLoading = false;
        });
        //this.LoadGetUserProfiles(event.traget.value);
        //this.LoadEducationDetail(event.traget.value);
        // this.indLoading = false;
    };
    MyProfilesComponent.prototype.LoadEmployeeList = function () {
        var _this = this;
        this.indLoading = true;
        this._MyProfilesService.getEmployeeList(global_1.Global.BASE_MyProfiles_ENDPOINT)
            .subscribe(function (data) {
            _this.employeeheadlist = data;
            _this.indLoading = false;
        });
    };
    MyProfilesComponent.prototype.onSubmit = function (formData) {
    };
    __decorate([
        core_1.ViewChild('modal'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], MyProfilesComponent.prototype, "modal", void 0);
    MyProfilesComponent = __decorate([
        core_1.Component({
            providers: [MyProfiles_service_1.MyProfilesService],
            templateUrl: 'app/Components/HumanResource/ProfileAttendance/MyProfiles.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, MyProfiles_service_1.MyProfilesService, http_1.Http, router_1.Router, pager_index_1.PagerService])
    ], MyProfilesComponent);
    return MyProfilesComponent;
}());
exports.MyProfilesComponent = MyProfilesComponent;
