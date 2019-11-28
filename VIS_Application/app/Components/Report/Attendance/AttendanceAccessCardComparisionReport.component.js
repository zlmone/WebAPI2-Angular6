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
var AttendanceAccessCardComparisionReport_service_1 = require("../../../Service/Report/Attendance/AttendanceAccessCardComparisionReport.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../../Shared/global");
var pager_index_1 = require("../../../Shared/pager.index");
var CommonHelper_service_1 = require("../../../Shared/CommonHelper.service");
var AttendanceAccessCardComparisionReportComponent = (function () {
    function AttendanceAccessCardComparisionReportComponent(fb, _AttendanceAccessCardComparisionReportService, pagerService, _CommonHelperService) {
        this.fb = fb;
        this._AttendanceAccessCardComparisionReportService = _AttendanceAccessCardComparisionReportService;
        this.pagerService = pagerService;
        this._CommonHelperService = _CommonHelperService;
        this.pager = {};
        this.CurrentRecordsPerPage = 10;
        this.frommonth = new Date().getMonth() + 1;
        this.fromyear = new Date().getFullYear();
        this.tomonth = new Date().getMonth() + 1;
        this.toyear = new Date().getFullYear();
    }
    AttendanceAccessCardComparisionReportComponent.prototype.ngOnInit = function () {
        this._CommonHelperService.ToogleMenu();
        this.InLoading = false;
        this.Employee =
            [({
                    Id: 0,
                    Employee_Name: ''
                })];
        this.ParameterModel =
            ({
                EmployeeId: 0,
                FromDate: '',
                LoginUserId: 0,
                OrderBy: '',
                ToDate: '',
                FromMonth: '',
                FromYear: '',
                ToMonth: '',
                IssueOnly: '',
                Search: '',
                ToYear: '',
                MonthWise: false
            });
        this.Year =
            [({
                    CurrentYear: ''
                })];
        this.GetEmployee();
        this.GetYear();
    };
    AttendanceAccessCardComparisionReportComponent.prototype.HideShowPanel = function () {
        if ($("#rbtdate").prop("checked")) {
            $("#paneldatewise").show();
            $("#panelmonthwise").hide();
            $("#panelmonthwise2").hide();
            $("#panelmonthwise3").hide();
            $("#panelmonthwise4").hide();
        }
        else {
            $("#paneldatewise").hide();
            $("#panelmonthwise").show();
            $("#panelmonthwise2").show();
            $("#panelmonthwise3").show();
            $("#panelmonthwise4").show();
        }
        if ($("#rbtconsolidated").prop("checked")) {
            $("#panelconsolidate").show();
        }
        else {
            $("#panelconsolidate").hide();
        }
    };
    AttendanceAccessCardComparisionReportComponent.prototype.ToogleMyProfile = function () {
        $("#alltypeoutreportdata").slideToggle(300);
    };
    AttendanceAccessCardComparisionReportComponent.prototype.CloseWidgetProfile = function () {
        $("#alltypeoutreport").hide(300);
    };
    AttendanceAccessCardComparisionReportComponent.prototype.GetEmployee = function () {
        var _this = this;
        this._AttendanceAccessCardComparisionReportService.getemployee(global_1.Global.BASE_AttendanceAccessCardComparisionReportAPI_ENDPOINT).
            subscribe(function (employee) {
            _this.Employee = employee;
        });
    };
    AttendanceAccessCardComparisionReportComponent.prototype.GetYear = function () {
        var _this = this;
        this._AttendanceAccessCardComparisionReportService.getyear(global_1.Global.BASE_AttendanceAccessCardComparisionReportAPI_ENDPOINT).
            subscribe(function (year) {
            _this.Year = year;
        });
    };
    AttendanceAccessCardComparisionReportComponent.prototype.onSubmit = function (ParameterModel) {
        var _this = this;
        ParameterModel.Search = '';
        if ($("#rbtdate").prop("checked")) {
            ParameterModel.MonthWise = false;
        }
        else {
            ParameterModel.MonthWise = true;
            ParameterModel.FromMonth = this.frommonth.toString();
            ParameterModel.FromYear = this.fromyear.toString();
            ParameterModel.ToMonth = this.tomonth.toString();
            ParameterModel.ToYear = this.toyear.toString();
        }
        if ($("#chkissueonly").prop("checked")) {
            ParameterModel.IssueOnly = '1';
        }
        else {
            ParameterModel.IssueOnly = '0';
        }
        ParameterModel.LoginUserId = 158;
        this.EmployeeAccessCardComparisions = null;
        this.InLoading = true;
        this._AttendanceAccessCardComparisionReportService.getoutreportdata(global_1.Global.BASE_AttendanceAccessCardComparisionReportAPI_ENDPOINT, ParameterModel).
            subscribe(function (employeescreencapture) {
            _this.EmployeeAccessCardComparisions = employeescreencapture;
            _this.JumpOnPage(1);
            $("html, body").animate({ scrollTop: 310 }, 150);
            _this.InLoading = false;
        });
    };
    AttendanceAccessCardComparisionReportComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.EmployeeAccessCardComparisions);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    AttendanceAccessCardComparisionReportComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    AttendanceAccessCardComparisionReportComponent.prototype.ImportAccessCardDetail = function () {
        alert("Import Access Card Detail");
    };
    AttendanceAccessCardComparisionReportComponent.prototype.ExportAccessCardDetail = function () {
        alert("Export Access Card Detail");
    };
    AttendanceAccessCardComparisionReportComponent.prototype.DownloadSampleAccessCardDetail = function () {
        alert("Download Sample Access Card Detail");
    };
    __decorate([
        core_1.ViewChild('modal'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], AttendanceAccessCardComparisionReportComponent.prototype, "modal", void 0);
    AttendanceAccessCardComparisionReportComponent = __decorate([
        core_1.Component({
            providers: [AttendanceAccessCardComparisionReport_service_1.AttendanceAccessCardComparisionReportService],
            templateUrl: 'app/Components/Report/Attendance/AttendanceAccessCardReportComparisionReport.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, AttendanceAccessCardComparisionReport_service_1.AttendanceAccessCardComparisionReportService, pager_index_1.PagerService, CommonHelper_service_1.CommonHelperService])
    ], AttendanceAccessCardComparisionReportComponent);
    return AttendanceAccessCardComparisionReportComponent;
}());
exports.AttendanceAccessCardComparisionReportComponent = AttendanceAccessCardComparisionReportComponent;
