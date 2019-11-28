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
var EmployeeScreenCaptureReport_service_1 = require("../../../Service/Report/Attendance/EmployeeScreenCaptureReport.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../../Shared/global");
var pager_index_1 = require("../../../Shared/pager.index");
var CommonHelper_service_1 = require("../../../Shared/CommonHelper.service");
var EmployeeScreenCaptureReportComponent = (function () {
    function EmployeeScreenCaptureReportComponent(fb, _EmployeeScreenCaptureReportService, pagerService, _CommonHelperService) {
        this.fb = fb;
        this._EmployeeScreenCaptureReportService = _EmployeeScreenCaptureReportService;
        this.pagerService = pagerService;
        this._CommonHelperService = _CommonHelperService;
        this.pager = {};
        this.CurrentRecordsPerPage = 10;
        this.frommonth = new Date().getMonth() + 1;
        this.fromyear = new Date().getFullYear();
        this.tomonth = new Date().getMonth() + 1;
        this.toyear = new Date().getFullYear();
    }
    EmployeeScreenCaptureReportComponent.prototype.ngOnInit = function () {
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
    EmployeeScreenCaptureReportComponent.prototype.HideShowPanel = function () {
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
    };
    EmployeeScreenCaptureReportComponent.prototype.ToogleMyProfile = function () {
        $("#alltypeoutreportdata").slideToggle(300);
    };
    EmployeeScreenCaptureReportComponent.prototype.CloseWidgetProfile = function () {
        $("#alltypeoutreport").hide(300);
    };
    EmployeeScreenCaptureReportComponent.prototype.GetEmployee = function () {
        var _this = this;
        this._EmployeeScreenCaptureReportService.getemployee(global_1.Global.BASE_EmployeeScreenCaptureReportAPI_ENDPOINT).
            subscribe(function (employee) {
            _this.Employee = employee;
        });
    };
    EmployeeScreenCaptureReportComponent.prototype.GetYear = function () {
        var _this = this;
        this._EmployeeScreenCaptureReportService.getyear(global_1.Global.BASE_EmployeeScreenCaptureReportAPI_ENDPOINT).
            subscribe(function (year) {
            debugger;
            _this.Year = year;
        });
    };
    EmployeeScreenCaptureReportComponent.prototype.onSubmit = function (ParameterModel) {
        var _this = this;
        if ($("#rbtdate").prop("checked")) {
            ParameterModel.OrderBy = 'Name';
            ParameterModel.MonthWise = false;
        }
        else {
            ParameterModel.MonthWise = true;
            ParameterModel.FromMonth = this.frommonth.toString();
            ParameterModel.FromYear = this.fromyear.toString();
            ParameterModel.ToMonth = this.tomonth.toString();
            ParameterModel.ToYear = this.toyear.toString();
            if ($("#rbtsortdate").prop("checked")) {
                ParameterModel.OrderBy = 'Date';
            }
            else {
                ParameterModel.OrderBy = 'Name';
            }
        }
        ParameterModel.LoginUserId = 158;
        this.EmployeeScreenCaptures = null;
        this.InLoading = true;
        this._EmployeeScreenCaptureReportService.getoutreportdata(global_1.Global.BASE_EmployeeScreenCaptureReportAPI_ENDPOINT, ParameterModel).
            subscribe(function (employeescreencapture) {
            _this.EmployeeScreenCaptures = employeescreencapture;
            _this.JumpOnPage(1);
            $("html, body").animate({ scrollTop: 310 }, 150);
            _this.InLoading = false;
        });
    };
    EmployeeScreenCaptureReportComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.EmployeeScreenCaptures);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    EmployeeScreenCaptureReportComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    EmployeeScreenCaptureReportComponent.prototype.ShowPopup = function () {
        this.modal.open();
        this.modalTitle = 'Screen Capture Images';
    };
    __decorate([
        core_1.ViewChild('modal'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], EmployeeScreenCaptureReportComponent.prototype, "modal", void 0);
    EmployeeScreenCaptureReportComponent = __decorate([
        core_1.Component({
            providers: [EmployeeScreenCaptureReport_service_1.EmployeeScreenCaptureReportService],
            templateUrl: 'app/Components/Report/Attendance/EmployeeScreenCapture.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, EmployeeScreenCaptureReport_service_1.EmployeeScreenCaptureReportService, pager_index_1.PagerService, CommonHelper_service_1.CommonHelperService])
    ], EmployeeScreenCaptureReportComponent);
    return EmployeeScreenCaptureReportComponent;
}());
exports.EmployeeScreenCaptureReportComponent = EmployeeScreenCaptureReportComponent;
