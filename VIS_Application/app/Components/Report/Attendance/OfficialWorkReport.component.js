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
var OfficialWorkReport_service_1 = require("../../../Service/Report/Attendance/OfficialWorkReport.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../../Shared/global");
var pager_index_1 = require("../../../Shared/pager.index");
var CommonHelper_service_1 = require("../../../Shared/CommonHelper.service");
var OfficialWorkReportComponent = (function () {
    function OfficialWorkReportComponent(fb, _OfficialWorkReportService, pagerService, _CommonHelperService) {
        this.fb = fb;
        this._OfficialWorkReportService = _OfficialWorkReportService;
        this.pagerService = pagerService;
        this._CommonHelperService = _CommonHelperService;
        this.pager = {};
        this.CurrentRecordsPerPage = 10;
        this.isDesc = false;
        this.column = 'Employee_Name';
        this.ShowHideSearch = false;
        this.EmployeeId = 0;
        this.frommonth = new Date().getMonth() + 1;
        this.fromyear = new Date().getFullYear();
    }
    OfficialWorkReportComponent.prototype.ngOnInit = function () {
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
        this.ParameterModel =
            {
                EmployeeId: 0,
                FromDate: new Date(),
                ToDate: new Date(),
                ReportSort: '',
                Sort: 0,
                UserId: 0,
                UserType: '',
                FromMonth: '',
                FromYear: '',
                ToMonth: '',
                ToYear: '',
                MonthWise: false
            };
        this.GetEmployee();
        this.GetYear();
    };
    OfficialWorkReportComponent.prototype.ToogleMyProfile = function () {
        $("#alltypeoutreportdata").slideToggle(300);
    };
    OfficialWorkReportComponent.prototype.CloseWidgetProfile = function () {
        $("#alltypeoutreport").hide(300);
    };
    OfficialWorkReportComponent.prototype.ViewStyleToogle = function () {
        if ($("#rbtconsolidated").prop('checked')) {
            $("#viewstyle").show();
        }
        else {
            $("#viewstyle").hide();
        }
    };
    OfficialWorkReportComponent.prototype.ToogleHideShowOption = function () {
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
    OfficialWorkReportComponent.prototype.ToogleDateOption = function () {
        if ($("#rbtdate").prop("checked")) {
            $("#searchbydate").show();
            $("#searchbymonth").hide();
        }
        else {
            $("#searchbydate").hide();
            $("#searchbymonth").show();
        }
    };
    // function for bind dropdownlist
    OfficialWorkReportComponent.prototype.GetEmployee = function () {
        var _this = this;
        this._OfficialWorkReportService.getemployee(global_1.Global.BASE_OfficialWorkReportAPI_ENDPOINT).
            subscribe(function (employee) {
            _this.Employee = employee;
        });
    };
    OfficialWorkReportComponent.prototype.GetYear = function () {
        var _this = this;
        this._OfficialWorkReportService.getyear(global_1.Global.BASE_OfficialWorkReportAPI_ENDPOINT).
            subscribe(function (year) {
            _this.Year = year;
        });
    };
    OfficialWorkReportComponent.prototype.GetOfficialWorkReport = function (entityobject) {
        var _this = this;
        this._OfficialWorkReportService.getofficialworkreportdata(global_1.Global.BASE_OfficialWorkReportAPI_ENDPOINT, entityobject).
            subscribe(function (data) {
            _this.OfficialWorkReportBindList = data;
            _this.JumpOnPage(1);
        });
    };
    OfficialWorkReportComponent.prototype.onSubmit = function (entityobject) {
        debugger;
        entityobject.UserId = 21;
        entityobject.UserType = 'Admin';
        // check search date wise or monthwise
        if ($("#rbtdate").prop("checked")) {
            entityobject.MonthWise = false;
        }
        else {
            entityobject.MonthWise = true;
            entityobject.FromMonth = this.frommonth.toString();
            entityobject.FromYear = this.fromyear.toString();
        }
        // check sorting date wise or name
        if ($("#rbtdatesort").prop("checked")) {
            entityobject.ReportSort = 'Date';
        }
        else {
            entityobject.ReportSort = 'Name';
        }
        // check approve status 
        if ($("#rbtall").prop("checked")) {
            entityobject.Sort = 3;
        }
        else if ($("#rbtapproved").prop("checked")) {
            entityobject.Sort = 1;
        }
        else if ($("#rbtunapproved").prop("checked")) {
            entityobject.Sort = 0;
        }
        else {
            entityobject.Sort = 2;
        }
        this.GetOfficialWorkReport(entityobject);
        $("html, body").animate({ scrollTop: 500 }, 150);
    };
    OfficialWorkReportComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.OfficialWorkReportBindList);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    OfficialWorkReportComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    __decorate([
        core_1.ViewChild('modal'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], OfficialWorkReportComponent.prototype, "modal", void 0);
    OfficialWorkReportComponent = __decorate([
        core_1.Component({
            providers: [OfficialWorkReport_service_1.OfficialWorkReportService],
            templateUrl: 'app/Components/Report/Attendance/OfficialWorkReport.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, OfficialWorkReport_service_1.OfficialWorkReportService, pager_index_1.PagerService, CommonHelper_service_1.CommonHelperService])
    ], OfficialWorkReportComponent);
    return OfficialWorkReportComponent;
}());
exports.OfficialWorkReportComponent = OfficialWorkReportComponent;
