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
var LateEarlyReport_service_1 = require("../../../Service/Report/Attendance/LateEarlyReport.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../../Shared/global");
var pager_index_1 = require("../../../Shared/pager.index");
var CommonHelper_service_1 = require("../../../Shared/CommonHelper.service");
var LateEarlyReportComponent = (function () {
    function LateEarlyReportComponent(fb, _LateEarlyReportService, pagerService, _CommonHelperService) {
        this.fb = fb;
        this._LateEarlyReportService = _LateEarlyReportService;
        this.pagerService = pagerService;
        this._CommonHelperService = _CommonHelperService;
        this.pager = {};
        this.CurrentRecordsPerPage = 10;
        this.EmployeeId = 0;
        this.DepartmentId = 0;
        this.CompanyId = 0;
        this.frommonth = new Date().getMonth() + 1;
        this.fromyear = new Date().getFullYear();
    }
    LateEarlyReportComponent.prototype.ngOnInit = function () {
        this._CommonHelperService.ToogleMenu();
        this.InLoading = false;
        this.Employee =
            [({
                    Id: 0,
                    Employee_Name: ''
                })];
        this.Year =
            [({
                    CurrentYear: ''
                })];
        this.Department =
            [({
                    Department_Name: '',
                    Id: 0
                })];
        this.Company =
            [({
                    CompanyName: '',
                    Id: 0
                })];
        this.ParameterModel =
            {
                Id: 0,
                Fromdate: new Date(),
                Todate: new Date(),
                MonthWise: false,
                FromMonth: '',
                FromYear: ''
            };
        this.GetDepartment();
        this.GetEmployee();
        this.GetCompany();
        this.GetYear();
    };
    LateEarlyReportComponent.prototype.ToogleMyProfile = function () {
        $("#alltypeoutreportdata").slideToggle(300);
    };
    LateEarlyReportComponent.prototype.CloseWidgetProfile = function () {
        $("#alltypeoutreport").hide(300);
    };
    LateEarlyReportComponent.prototype.ViewStyleToogle = function () {
        if ($("#rbtconsolidated").prop('checked')) {
            $("#viewstyle").show();
        }
        else {
            $("#viewstyle").hide();
        }
    };
    LateEarlyReportComponent.prototype.ToogleHideShowOption = function () {
        if ($("#rbtdepartment").prop('checked')) {
            $("#ddlemployee").hide();
            $("#chkallemployeediv").hide();
            $("#ddlcompany").hide();
            $("#ddllinemanager").hide();
            $("#ddldepartment").show();
        }
        else if ($("#rbtcompany").prop('checked')) {
            $("#ddldepartment").hide();
            $("#ddlemployee").hide();
            $("#chkallemployeediv").hide();
            $("#ddlcompany").show();
            $("#ddllinemanager").hide();
        }
        else if ($("#rbtlinemanager").prop('checked')) {
            $("#ddldepartment").hide();
            $("#ddlemployee").hide();
            $("#chkallemployeediv").hide();
            $("#ddlcompany").hide();
            $("#ddllinemanager").show();
        }
        else {
            $("#ddldepartment").hide();
            $("#ddlemployee").show();
            $("#chkallemployeediv").show();
            $("#ddlcompany").hide();
            $("#ddllinemanager").hide();
        }
    };
    LateEarlyReportComponent.prototype.ToogleDateOption = function () {
        if ($("#rbtdate").prop("checked")) {
            $("#searchbydate").show();
            $("#searchbymonth").hide();
        }
        else {
            $("#searchbydate").hide();
            $("#searchbymonth").show();
        }
    };
    LateEarlyReportComponent.prototype.GetDepartment = function () {
        var _this = this;
        this._LateEarlyReportService.getdepartment(global_1.Global.BASE_LateEarlyReport_ENDPOINT).
            subscribe(function (department) {
            _this.Department = department;
        });
    };
    LateEarlyReportComponent.prototype.GetEmployee = function () {
        var _this = this;
        this._LateEarlyReportService.getemployee(global_1.Global.BASE_LateEarlyReport_ENDPOINT).
            subscribe(function (employee) {
            _this.Employee = employee;
        });
    };
    LateEarlyReportComponent.prototype.GetCompany = function () {
        var _this = this;
        this._LateEarlyReportService.getcompany(global_1.Global.BASE_LateEarlyReport_ENDPOINT).
            subscribe(function (company) {
            _this.Company = company;
        });
    };
    LateEarlyReportComponent.prototype.GetYear = function () {
        var _this = this;
        this._LateEarlyReportService.getyear(global_1.Global.BASE_LateEarlyReport_ENDPOINT).
            subscribe(function (year) {
            _this.Year = year;
        });
    };
    LateEarlyReportComponent.prototype.GetIdByDepartment = function (Id, Fromdate, Todate, MonthWise, FromMonth, FromYear) {
        var _this = this;
        this.LateEarlyReports = null;
        this.InLoading = true;
        this._LateEarlyReportService.getemployeeidbydepartment(global_1.Global.BASE_LateEarlyReport_ENDPOINT, Id, Fromdate, Todate, MonthWise, FromMonth, FromYear).
            subscribe(function (lateearlyreports) {
            _this.LateEarlyReports = lateearlyreports;
            _this.JumpOnPage(1);
            _this.InLoading = false;
        });
    };
    LateEarlyReportComponent.prototype.GetIdByEmployee = function (Id, Fromdate, Todate, MonthWise, FromMonth, FromYear) {
        var _this = this;
        this.LateEarlyReports = null;
        this.InLoading = true;
        this._LateEarlyReportService.getemployeeidbyemployee(global_1.Global.BASE_LateEarlyReport_ENDPOINT, Id, Fromdate, Todate, MonthWise, FromMonth, FromYear).
            subscribe(function (lateearlyreports) {
            _this.LateEarlyReports = lateearlyreports;
            _this.JumpOnPage(1);
            _this.InLoading = false;
        });
    };
    LateEarlyReportComponent.prototype.GetIdByCompany = function (Id, Fromdate, Todate, MonthWise, FromMonth, FromYear) {
        var _this = this;
        this._LateEarlyReportService.getemployeeidbycompany(global_1.Global.BASE_LateEarlyReport_ENDPOINT, Id, Fromdate, Todate, MonthWise, FromMonth, FromYear).
            subscribe(function (employees) {
            _this.Employees = employees;
            _this.JumpOnPage(1);
        });
    };
    LateEarlyReportComponent.prototype.GetIdBySelectAll = function (Id, Fromdate, Todate, MonthWise, FromMonth, FromYear) {
        var _this = this;
        this._LateEarlyReportService.getemployeeidbyselectall(global_1.Global.BASE_LateEarlyReport_ENDPOINT, Id, Fromdate, Todate, MonthWise, FromMonth, FromYear).
            subscribe(function (employees) {
            _this.Employees = employees;
            _this.JumpOnPage(1);
        });
    };
    LateEarlyReportComponent.prototype.onSubmit = function (formData) {
        if (formData.Id != 0) {
            this.Employees = null;
            if ($("#rbtemployee").prop("checked")) {
                if ($("#rbtdate").prop("checked")) {
                    formData.MonthWise = false;
                }
                else {
                    formData.MonthWise = true;
                    formData.FromMonth = this.frommonth.toString();
                    formData.FromYear = this.fromyear.toString();
                }
                this.GetIdByEmployee(formData.Id, formData.Fromdate, formData.Todate, formData.MonthWise, formData.FromMonth, formData.FromYear);
                $("html, body").animate({ scrollTop: 500 }, 150);
            }
            else if ($("#rbtdepartment").prop("checked")) {
                if ($("#rbtdate").prop("checked")) {
                    formData.MonthWise = false;
                }
                else {
                    formData.MonthWise = true;
                    formData.FromMonth = this.frommonth.toString();
                    formData.FromYear = this.fromyear.toString();
                }
                this.GetIdByDepartment(formData.Id, formData.Fromdate, formData.Todate, formData.MonthWise, formData.FromMonth, formData.FromYear);
                $("html, body").animate({ scrollTop: 500 }, 150);
            }
            else if ($("#rbtcompany").prop("checked")) {
                if ($("#rbtdate").prop("checked")) {
                    formData.MonthWise = false;
                }
                else {
                    formData.MonthWise = true;
                    formData.FromMonth = this.frommonth.toString();
                    formData.FromYear = this.fromyear.toString();
                }
                this.GetIdByCompany(formData.Id, formData.Fromdate, formData.Todate, formData.MonthWise, formData.FromMonth, formData.FromYear);
                $("html, body").animate({ scrollTop: 500 }, 150);
            }
        }
        else {
            if ($("#rbtdate").prop("checked")) {
                formData.MonthWise = false;
            }
            else {
                formData.MonthWise = true;
                formData.FromMonth = this.frommonth.toString();
                formData.FromYear = this.fromyear.toString();
            }
            this.GetIdBySelectAll(formData.Id, formData.Fromdate, formData.Todate, formData.MonthWise, formData.FromMonth, formData.FromYear);
            $("html, body").animate({ scrollTop: 500 }, 150);
        }
    };
    LateEarlyReportComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.LateEarlyReports);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    LateEarlyReportComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    __decorate([
        core_1.ViewChild('modal'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], LateEarlyReportComponent.prototype, "modal", void 0);
    LateEarlyReportComponent = __decorate([
        core_1.Component({
            providers: [LateEarlyReport_service_1.LateEarlyReportService],
            templateUrl: 'app/Components/Report/Attendance/LateEarlyReport.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, LateEarlyReport_service_1.LateEarlyReportService, pager_index_1.PagerService, CommonHelper_service_1.CommonHelperService])
    ], LateEarlyReportComponent);
    return LateEarlyReportComponent;
}());
exports.LateEarlyReportComponent = LateEarlyReportComponent;
