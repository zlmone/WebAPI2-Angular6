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
var EmployeeDashboardHeartBeat_service_1 = require("../../../Service/Report/Attendance/EmployeeDashboardHeartBeat.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../../Shared/global");
var pager_index_1 = require("../../../Shared/pager.index");
var CommonHelper_service_1 = require("../../../Shared/CommonHelper.service");
var EmployeeDashboardHeartBeatReportComponent = (function () {
    function EmployeeDashboardHeartBeatReportComponent(fb, _EmployeeDashboardHeartBeatReportService, pagerService, _CommonHelperService) {
        this.fb = fb;
        this._EmployeeDashboardHeartBeatReportService = _EmployeeDashboardHeartBeatReportService;
        this.pagerService = pagerService;
        this._CommonHelperService = _CommonHelperService;
        this.pager = {};
        this.CurrentRecordsPerPage = 10;
        this.frommonth = new Date().getMonth() + 1;
        this.fromyear = new Date().getFullYear();
        this.tomonth = new Date().getMonth() + 1;
        this.toyear = new Date().getFullYear();
    }
    EmployeeDashboardHeartBeatReportComponent.prototype.ngOnInit = function () {
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
                ConsolidateBy: '',
                ViewBy: '',
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
    EmployeeDashboardHeartBeatReportComponent.prototype.HideShowPanel = function () {
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
    EmployeeDashboardHeartBeatReportComponent.prototype.ToogleMyProfile = function () {
        $("#alltypeoutreportdata").slideToggle(300);
    };
    EmployeeDashboardHeartBeatReportComponent.prototype.CloseWidgetProfile = function () {
        $("#alltypeoutreport").hide(300);
    };
    EmployeeDashboardHeartBeatReportComponent.prototype.GetEmployee = function () {
        var _this = this;
        this._EmployeeDashboardHeartBeatReportService.getemployee(global_1.Global.BASE_EmployeeDashboarHeartBeatAPI_ENDPOINT).
            subscribe(function (employee) {
            _this.Employee = employee;
        });
    };
    EmployeeDashboardHeartBeatReportComponent.prototype.GetYear = function () {
        var _this = this;
        this._EmployeeDashboardHeartBeatReportService.getyear(global_1.Global.BASE_EmployeeDashboarHeartBeatAPI_ENDPOINT).
            subscribe(function (year) {
            _this.Year = year;
        });
    };
    EmployeeDashboardHeartBeatReportComponent.prototype.onSubmit = function (ParameterModel) {
        var _this = this;
        if ($("#rbtconsolidated").prop("checked")) {
            $("#headerouttype").hide();
            $("#headerstarttime").hide();
            $(".inputcentetext").hide();
        }
        else {
            $("#headerouttype").show();
            $("#headerstarttime").show();
            $(".inputcentetext").show();
        }
        if ($("#rbtdate").prop("checked")) {
            ParameterModel.MonthWise = false;
        }
        else {
            ParameterModel.MonthWise = true;
        }
        if ($("#rbtdeatil").prop("checked")) {
            ParameterModel.ViewBy = 'detail';
        }
        else {
            ParameterModel.ViewBy = '';
            if ($("#rbtnone").prop("checked")) {
                ParameterModel.ConsolidateBy = 'None';
            }
            else if ($("#rbtname").prop("checked")) {
                ParameterModel.ConsolidateBy = 'Name';
            }
            else {
                ParameterModel.ConsolidateBy = 'Date';
            }
        }
        if ($("#rbtsortdate").prop("checked")) {
            ParameterModel.OrderBy = 'Date';
        }
        else {
            ParameterModel.OrderBy = 'Name';
        }
        ParameterModel.LoginUserId = 158;
        this.InLoading = true;
        this._EmployeeDashboardHeartBeatReportService.getemployeedashboardheartbeatreport(global_1.Global.BASE_EmployeeDashboarHeartBeatAPI_ENDPOINT, ParameterModel).
            subscribe(function (empdashboardheartbeat) {
            _this.EmployeeDashboardHeartBeats = empdashboardheartbeat;
            _this.JumpOnPage(1);
            $("html, body").animate({ scrollTop: 500 }, 150);
            _this.InLoading = false;
        });
    };
    EmployeeDashboardHeartBeatReportComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.EmployeeDashboardHeartBeats);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    EmployeeDashboardHeartBeatReportComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    __decorate([
        core_1.ViewChild('modal'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], EmployeeDashboardHeartBeatReportComponent.prototype, "modal", void 0);
    EmployeeDashboardHeartBeatReportComponent = __decorate([
        core_1.Component({
            providers: [EmployeeDashboardHeartBeat_service_1.EmployeeDashboardHeartBeatReportService],
            templateUrl: 'app/Components/Report/Attendance/EmployeeDashboardHeartBeatReport.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, EmployeeDashboardHeartBeat_service_1.EmployeeDashboardHeartBeatReportService, pager_index_1.PagerService, CommonHelper_service_1.CommonHelperService])
    ], EmployeeDashboardHeartBeatReportComponent);
    return EmployeeDashboardHeartBeatReportComponent;
}());
exports.EmployeeDashboardHeartBeatReportComponent = EmployeeDashboardHeartBeatReportComponent;
