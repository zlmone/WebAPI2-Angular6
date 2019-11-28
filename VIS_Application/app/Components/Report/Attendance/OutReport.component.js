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
var OutReport_service_1 = require("../../../Service/Report/Attendance/OutReport.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../../Shared/global");
var pager_index_1 = require("../../../Shared/pager.index");
;
;
var exportexcel_service_1 = require("../../../Shared/exportexcel.service");
var CommonHelper_service_1 = require("../../../Shared/CommonHelper.service");
var OutReportComponent = (function () {
    function OutReportComponent(fb, _OutReportService, _ExcelService, pagerService, _CommonHelperService) {
        this.fb = fb;
        this._OutReportService = _OutReportService;
        this._ExcelService = _ExcelService;
        this.pagerService = pagerService;
        this._CommonHelperService = _CommonHelperService;
        this.isDesc = false;
        this.column = 'EventName';
        // pager object
        this.pager = {};
        this.CurrentRecordsPerPage = 10;
    }
    // Load Event Function
    OutReportComponent.prototype.ngOnInit = function () {
        this._CommonHelperService.ToogleMenu();
        this.InLoading = false;
        this.AttendanceDepart =
            [({
                    Id: 0,
                    Department_Name: '',
                    mode: ''
                })];
        this.AttendanceEmployee =
            [({
                    Id: 0,
                    Employee_Name: '',
                    mode: ''
                })];
        this.AttendanceCompany =
            [({
                    Id: 0,
                    CompanyName: '',
                    mode: ''
                })];
        this.AttendanceLineManager =
            [({
                    Id: 0,
                    LineManager: '',
                    mode: ''
                })];
        this.AttendancebindData =
            [({
                    EmployeeID: 0,
                    EmployeeName: '',
                    Date: '',
                    ToDate: '',
                    InTimeID: 0,
                    InTIme: null,
                    OutTimeID: 0,
                    OutTIme: null,
                    LunchOutTimeID: 0,
                    LunchOutTIme: null,
                    LunchInTimeID: 0,
                    LunchInTIme: null,
                    OtherTimeID: 0,
                    TotalOtherTime: '',
                    TotalOfficeTime: '',
                    TotalLunchTime: '',
                    TotalBreakTime: '',
                    TotalWorkingTime: '',
                    TotalWorksheetHours: 0,
                    IsInOffice: false,
                    IsInBreak: false,
                    IsInLunch: false,
                    IsInMeeting: false,
                    IsInOfficeWork: false,
                    Days: '',
                    ImportRemarks: '',
                    EmployeeCode: '',
                    MMDDYYYY_DateFormat: ''
                })];
        this.outreport =
            {
                EmployeeId: 0,
                Active: 0,
                AllDate: false,
                Consolidated: '',
                Employeelist: '',
                FromDate: new Date(),
                Minute: 0,
                OutType: '',
                Sort: '',
                ToDate: new Date()
            };
        this.GetEmployee();
        this.GetDepartment();
        this.GetCompany();
        this.GetLineManager();
    };
    // Hide & Show Element jQuery Function
    OutReportComponent.prototype.ToogleMyProfile = function () {
        $("#alltypeoutreportdata").slideToggle(300);
    };
    OutReportComponent.prototype.CloseWidgetProfile = function () {
        $("#alltypeoutreport").hide(300);
    };
    OutReportComponent.prototype.ViewStyleToogle = function () {
        if ($("#rbtconsolidated").prop('checked')) {
            $("#viewstyle").show();
        }
        else {
            $("#viewstyle").hide();
        }
    };
    OutReportComponent.prototype.ToogleHideShowOption = function () {
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
    OutReportComponent.prototype.ToogleAllDate = function () {
        if ($("#alldate").prop('checked')) {
            $("#fromdate").attr("disabled", "disabled");
            $("#todate").attr("disabled", "disabled");
        }
        else {
            $("#fromdate").removeAttr("disabled");
            $("#todate").removeAttr("disabled");
        }
    };
    OutReportComponent.prototype.ToogleAllTypesofOut = function () {
        if ($("#rbtall").prop('checked')) {
            $("#chkall").attr("disabled", "disabled");
            $("#chklunch").attr("disabled", "disabled");
            $("#chkother").attr("disabled", "disabled");
            $("#chkmeeting").attr("disabled", "disabled");
            $("#chkofficeout").attr("disabled", "disabled");
            $("#chkall").attr("checked", "checked");
            $("#chklunch").prop("checked", false);
            $("#chkother").prop("checked", false);
            $("#chkmeeting").prop("checked", false);
            $("#chkofficeout").prop("checked", false);
        }
        else {
            $("#chkall").attr("disabled", "disabled");
            $("#chkall").removeAttr("checked");
            $("#chklunch").removeAttr("disabled");
            $("#chkother").removeAttr("disabled");
            $("#chkmeeting").removeAttr("disabled");
            $("#chkofficeout").removeAttr("disabled");
        }
    };
    OutReportComponent.prototype.ToogleMinute = function () {
        if ($("#toogleminute").prop('checked')) {
            $("#txtminute").removeAttr("disabled");
        }
        else {
            $("#txtminute").attr("disabled", "disabled");
        }
    };
    // Dropdown bind Function
    OutReportComponent.prototype.GetEmployee = function () {
        var _this = this;
        this._OutReportService.getemployee(global_1.Global.BASE_OutReportApi_ENDPOINT).
            subscribe(function (employee) {
            _this.AttendanceEmployee = employee;
        });
    };
    OutReportComponent.prototype.GetAllEmployee = function () {
        var _this = this;
        if ($("#chkallemployee").prop("checked")) {
            this._OutReportService.getallemployee(global_1.Global.BASE_OutReportApi_ENDPOINT).
                subscribe(function (allemployee) {
                _this.AttendanceEmployee = allemployee;
            });
        }
        else {
            this.GetEmployee();
        }
    };
    OutReportComponent.prototype.GetDepartment = function () {
        var _this = this;
        this._OutReportService.getdepartment(global_1.Global.BASE_OutReportApi_ENDPOINT).
            subscribe(function (department) {
            _this.AttendanceDeparts = department;
        });
    };
    OutReportComponent.prototype.GetCompany = function () {
        var _this = this;
        this._OutReportService.getcompany(global_1.Global.BASE_OutReportApi_ENDPOINT).
            subscribe(function (companydata) {
            _this.AttendanceCompany = companydata;
        });
    };
    OutReportComponent.prototype.GetLineManager = function () {
        var _this = this;
        this._OutReportService.getlinemanager(global_1.Global.BASE_OutReportApi_ENDPOINT).
            subscribe(function (linemanagaer) {
            _this.AttendanceLineManager = linemanagaer;
        });
    };
    OutReportComponent.prototype.GetEmployeeIdByLM = function (LineManager) {
        var _this = this;
        if ($("#ddllinemanager").val() != '0') {
            this._OutReportService.getemployeeidbylm(global_1.Global.BASE_OutReportApi_ENDPOINT, LineManager).
                subscribe(function (emplist) {
                _this.EmployeeIdByLM = emplist;
            });
        }
    };
    OutReportComponent.prototype.GetEmployeeIdByCompany = function (Company) {
        var _this = this;
        if ($("#ddlcompany").val() != '0') {
            this._OutReportService.getemployeeidbycompany(global_1.Global.BASE_OutReportApi_ENDPOINT, Company).
                subscribe(function (emplist) {
                _this.EmployeeIdByLM = emplist;
            });
        }
    };
    OutReportComponent.prototype.GetEmployeeIdByDepartment = function (ParentId) {
        var _this = this;
        if ($("#ddldepartment").val() != '0') {
            this._OutReportService.getemployeeidbydepartment(global_1.Global.BASE_OutReportApi_ENDPOINT, ParentId).
                subscribe(function (emplist) {
                _this.EmployeeIdByLM = emplist;
            });
        }
    };
    // Post Report By Selected Category
    OutReportComponent.prototype.onSubmit = function (entityobject) {
        var _this = this;
        $("html, body").animate({ scrollTop: 590 }, 250);
        entityobject.Employeelist = '';
        if ($("#rbtlinemanager").prop("checked") && $("#ddllinemanager").val() != '0' && $("#ddllinemanager").val() != '' && $("#ddllinemanager").val() != undefined) {
            for (var _i = 0, _a = this.EmployeeIdByLM; _i < _a.length; _i++) {
                var item = _a[_i];
                entityobject.Employeelist += item.Id + ',';
            }
        }
        else if ($("#rbtcompany").prop("checked") && $("#ddlcompany").val() != '0' && $("#ddlcompany").val() != '' && $("#ddlcompany").val() != undefined) {
            for (var _b = 0, _c = this.EmployeeIdByLM; _b < _c.length; _b++) {
                var item = _c[_b];
                entityobject.Employeelist += item.Id + ',';
            }
        }
        else if ($("#rbtdepartment").prop("checked") && $("#ddldepartment").val() != '0' && $("#ddldepartment").val() != '' && $("#ddldepartment").val() != undefined) {
            for (var _d = 0, _e = this.EmployeeIdByLM; _d < _e.length; _d++) {
                var item = _e[_d];
                entityobject.Employeelist += item.Id + ',';
            }
        }
        else if ($("#ddlemployee").val() == '0' || $("#ddldepartment").val() == '0' || $("#ddlcompany").val() == '0' || $("#ddllinemanager").val() == '0') {
            entityobject.EmployeeId = 0;
        }
        else {
            entityobject.Employeelist = entityobject.EmployeeId.toString();
        }
        if ($("#toogleminute").prop("checked")) {
            entityobject.Minute = $("#txtminute").val();
        }
        else {
            entityobject.Minute = 0;
        }
        if ($("#chkallemployee").prop("checked")) {
            entityobject.Active = 1;
        }
        else {
            entityobject.Active = 0;
        }
        if ($("#alldate").prop("checked")) {
            entityobject.AllDate = true;
        }
        if ($("#rbtall").prop("checked")) {
            entityobject.OutType = 'All';
        }
        else if ($("#rbtother").prop("checked")) {
            if ($("#chklunch").prop("checked") && $("#chkother").prop("checked") && $("#chkmeeting").prop("checked") && $("#chkofficeout").prop("checked")) {
                entityobject.OutType = 'Lunch' + ',' + 'Other Breaks' + ',' + 'Meeting' + ',' + 'office Out';
            }
            else if ($("#chklunch").prop("checked") && $("#chkother").prop("checked") && $("#chkmeeting").prop("checked")) {
                entityobject.OutType = 'Lunch' + ',' + 'Other Breaks' + ',' + 'Meeting';
            }
            else if ($("#chkother").prop("checked") && $("#chkmeeting").prop("checked") && $("#chkofficeout").prop("checked")) {
                entityobject.OutType = 'Other Breaks' + ',' + 'Meeting' + ',' + 'office Out';
            }
            else if ($("#chklunch").prop("checked") && $("#chkother").prop("checked")) {
                entityobject.OutType = 'Lunch' + ',' + 'Other Breaks';
            }
            else if ($("#chklunch").prop("checked") && $("#chkmeeting").prop("checked")) {
                entityobject.OutType = 'Lunch' + ',' + 'Meeting';
            }
            else if ($("#chklunch").prop("checked") && $("#chkofficeout").prop("checked")) {
                entityobject.OutType = 'Lunch' + ',' + 'office Out';
            }
            else if ($("#chkother").prop("checked") && $("#chkmeeting").prop("checked")) {
                entityobject.OutType = 'Other Breaks' + ',' + 'Meeting';
            }
            else if ($("#chkother").prop("checked") && $("#chkofficeout").prop("checked")) {
                entityobject.OutType = 'Other Breaks' + ',' + 'office Out';
            }
            else if ($("#chkmeeting").prop("checked") && $("#chkofficeout").prop("checked")) {
                entityobject.OutType = 'Meeting' + ',' + 'office Out';
            }
            else if ($("#chklunch").prop("checked")) {
                entityobject.OutType = 'Lunch';
            }
            else if ($("#chkother").prop("checked")) {
                entityobject.OutType = 'Other Breaks';
            }
            else if ($("#chkmeeting").prop("checked")) {
                entityobject.OutType = 'Meeting';
            }
            else if ($("#chkofficeout").prop("checked")) {
                entityobject.OutType = 'office Out';
            }
        }
        if (($("#toogleminute").prop("checked"))) {
            entityobject.Minute = ($("#txtminute").val());
            entityobject.Consolidated = 'Date';
            entityobject.Sort = 'Name';
        }
        else {
            entityobject.Minute = 0;
        }
        if ($("#alldate").prop("checked")) {
            entityobject.AllDate = true;
        }
        else {
            entityobject.AllDate = false;
        }
        if ($("#rbtdetailed").prop("checked")) {
            entityobject.Consolidated = 'All';
        }
        if ($("#rbtconsolidated").prop("checked")) {
            if ($("#rbtnone").prop("checked")) {
                entityobject.Consolidated = 'None';
            }
            else if ($("#rbtname").prop("checked")) {
                entityobject.Consolidated = 'Name';
            }
            else if ($("#rbttype").prop("checked")) {
                entityobject.Consolidated = 'Type';
            }
            else {
                entityobject.Consolidated = 'Date';
            }
        }
        if ($("#rbtsortname").prop("checked")) {
            entityobject.Sort = 'Name';
        }
        else if ($("#rbtsortdate").prop("checked")) {
            entityobject.Sort = 'Date';
        }
        else if ($("#rbtsorttype").prop("checked")) {
            entityobject.Sort = 'Type';
        }
        else {
            entityobject.Sort = 'Duration';
        }
        if ($("#toogleminute").prop("checked")) {
            entityobject.Consolidated = 'Date';
        }
        this.InLoading = true;
        this._OutReportService.getoutreportdata(global_1.Global.BASE_OutReportApi_ENDPOINT, entityobject).
            subscribe(function (reportdata) {
            _this.outreports = reportdata;
            _this.JumpOnPage(1);
            $("html, body").animate({ scrollTop: 590 }, 250);
            _this.InLoading = false;
        });
        if (entityobject.Consolidated == 'None' || entityobject.Consolidated == 'Name' || entityobject.Consolidated == 'Type' || entityobject.Consolidated == 'Date') {
            $("#headerstarttime").hide();
            $("#headerendtime").hide();
            $("#headerremarks").hide();
            $("#col2starttime").hide();
            $("#col2endtime").hide();
            $("#col2remarks").hide();
        }
        else {
            $("#headerstarttime").show();
            $("#headerendtime").show();
            $("#headerremarks").show();
            $("#col2starttime").show();
            $("#col2endtime").show();
            $("#col2remarks").show();
        }
    };
    // pagination Function
    OutReportComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.outreports);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
        this.pagedItemscount = this.pagerService.pagedItems;
        var total = 0;
        for (var _i = 0, _a = this.pagedItemscount; _i < _a.length; _i++) {
            var item = _a[_i];
            total += item.Duration;
            this.cnttotal = total;
        }
    };
    OutReportComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    OutReportComponent.prototype.ExportToExcel = function () {
        if (this.outreports != null && this.outreports.length > 0) {
            this._ExcelService.exportAsExcelFile(this.outreports, 'OutReport');
        }
        else {
            alert("No Record Found !");
        }
    };
    __decorate([
        core_1.ViewChild('modal'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], OutReportComponent.prototype, "modal", void 0);
    OutReportComponent = __decorate([
        core_1.Component({
            providers: [OutReport_service_1.OutReportService],
            templateUrl: 'app/Components/Report/Attendance/OutReport.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, OutReport_service_1.OutReportService, exportexcel_service_1.ExcelService, pager_index_1.PagerService, CommonHelper_service_1.CommonHelperService])
    ], OutReportComponent);
    return OutReportComponent;
}());
exports.OutReportComponent = OutReportComponent;
