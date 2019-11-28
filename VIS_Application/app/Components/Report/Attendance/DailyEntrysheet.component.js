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
var DailyEntrysheet_service_1 = require("../../../Service/Report/Attendance/DailyEntrysheet.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../../../Shared/enum");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../../Shared/global");
var pager_index_1 = require("../../../Shared/pager.index");
var router_1 = require("@angular/router");
var CommonHelper_service_1 = require("../../../Shared/CommonHelper.service");
var DailyEntrysheetComponent = (function () {
    function DailyEntrysheetComponent(fb, _DailyEntrysheetService, pagerService, route, _CommonHelperService) {
        this.fb = fb;
        this._DailyEntrysheetService = _DailyEntrysheetService;
        this.pagerService = pagerService;
        this.route = route;
        this._CommonHelperService = _CommonHelperService;
        this.MM = new Date().getMonth() + 1;
        this.DD = new Date().getDate();
        this.YYYY = new Date().getFullYear();
        this.todaydate = this.MM + '/' + this.DD + '/' + this.YYYY;
        this.indLoading = false;
        this.isDesc = false;
        this.column = 'EventName';
        // pager object
        this.pager = {};
        this.CurrentRecordsPerPage = 10;
    }
    DailyEntrysheetComponent.prototype.ngOnInit = function () {
        this._CommonHelperService.ToogleMenu();
        this.InLoading = false;
        this.BindEmployeeDropdownlist();
        this.LoadDailyEntryData();
        this.EmployeeId = this.route.snapshot.queryParams["EmployeeId"];
        var EmployeeName = this.route.snapshot.queryParams["EmployeeName"];
        this.Dateval = this.route.snapshot.queryParams["Date"];
        var EntryTime = this.route.snapshot.queryParams["EntryTime"];
        var Remarks = this.route.snapshot.queryParams["Remarks"];
        this.DailyEntrysheetFrm = this.fb.group({
            Id: [''],
            Date: new Date()
        });
        this.dailyentryemployee = ({
            Date: null,
            Employee_Name: '',
            Entry_Time: '',
            Entry_Type: '',
            Grace: 0,
            Id: 0,
            Remarks: '',
            TotalBreakTime: '',
            TotalOfficeTime: '',
            TotalWorkingTime: '',
            TotalWorksheetHours: '',
            Transaction_Id: 0,
            actualEntryTime: ''
        });
        if (this.EmployeeId == undefined && this.Dateval == undefined) {
            this.EmployeeId = 0;
            this.Dateval = new Date();
        }
    };
    DailyEntrysheetComponent.prototype.LoadDailyEntryData = function () {
        var _this = this;
        debugger;
        this.indLoading = true;
        this._DailyEntrysheetService.getalldailyentryreport(global_1.Global.BASE_DailyEntrysheet_ENDPOINT, Number(sessionStorage.getItem('Id')), this.todaydate)
            .subscribe(function (reportdata) {
            _this.dailyentryemployees = reportdata;
            _this.indLoading = false;
            _this.JumpOnPage(1);
        });
        this.indLoading = true;
        this._DailyEntrysheetService.getalldailyentryreporttime(global_1.Global.BASE_DailyEntrysheet_ENDPOINT, Number(sessionStorage.getItem('Id')), this.todaydate)
            .subscribe(function (reportdatatime) {
            _this.dailyentrytime = reportdatatime;
            _this.indLoading = false;
        });
    };
    DailyEntrysheetComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.formbackup = formData;
        if (formData._value.Id == '0' && formData._value.Date != '') {
            debugger;
            this.msg = '';
            this.InLoading = true;
            this._DailyEntrysheetService.getalldailyentryreportallemp(global_1.Global.BASE_DailyEntrysheet_ENDPOINT, formData._value.Date)
                .subscribe(function (reportdata) {
                _this.dailyentryemployees = reportdata;
                _this.dailyentrytime = null;
                _this.JumpOnPage(1);
                $("html, body").animate({ scrollTop: 230 }, 150);
                _this.InLoading = false;
            });
        }
        else {
            this.msg = '';
            if (formData._value.Id != '' && formData._value.Date != '') {
                debugger;
                this.InLoading = true;
                this._DailyEntrysheetService.getalldailyentryreport(global_1.Global.BASE_DailyEntrysheet_ENDPOINT, formData._value.Id, formData._value.Date)
                    .subscribe(function (reportdata) {
                    _this.dailyentryemployees = reportdata;
                    _this.JumpOnPage(1);
                });
                this.dailyentryemployees = null;
                this.indLoading = true;
                this._DailyEntrysheetService.getalldailyentryreporttime(global_1.Global.BASE_DailyEntrysheet_ENDPOINT, formData._value.Id, formData._value.Date)
                    .subscribe(function (reportdatatime) {
                    _this.dailyentrytime = reportdatatime;
                    _this.InLoading = false;
                });
            }
            else {
                this.msg = "Please Select Date and Employee";
            }
        }
    };
    DailyEntrysheetComponent.prototype.ToogleMyProfile = function () {
        $("#myprofiledata").slideToggle(300);
    };
    DailyEntrysheetComponent.prototype.CloseWidgetProfile = function () {
        $("#adminProfile").hide(300);
    };
    DailyEntrysheetComponent.prototype.BindEmployeeDropdownlist = function () {
        var _this = this;
        this.indLoading = true;
        this._DailyEntrysheetService.getemployee(global_1.Global.BASE_DailyEntrysheet_ENDPOINT)
            .subscribe(function (employeedata) {
            _this.employees = employeedata;
            _this.indLoading = false;
        }
        //,error => this.msg = <any>error
        );
    };
    DailyEntrysheetComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.dailyentryemployees);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    DailyEntrysheetComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    DailyEntrysheetComponent.prototype.SelectDate = function () {
        this.msg = '';
    };
    DailyEntrysheetComponent.prototype.EditReport = function (Transaction_Id) {
        this.dbops = enum_1.DBOperation.update;
        this.modalTitle = 'Edit Record';
        this.modalBtnTitle = 'Update';
        this.dailyentryemployee = this.dailyentryemployees.filter(function (asd) { return asd.Transaction_Id == Transaction_Id; })[0];
        this.modal.open();
    };
    DailyEntrysheetComponent.prototype.UpdateReport = function (formDataUpdate) {
        var _this = this;
        this.msgtimevalidation = "";
        formDataUpdate.actualEntryTime = $("#actualEntryTimeHH").val() + ':' + $("#actualEntryTimeMM").val();
        formDataUpdate.Entry_Time = $("#Entry_TimeHH").val() + ':' + $("#Entry_TimeMM").val() + ':' + '00' + ' ' + $("#Entry_TimeAM").val();
        this._DailyEntrysheetService.updatereportdetail(global_1.Global.BASE_DailyEntrysheet_ENDPOINT, formDataUpdate).subscribe(function (data) {
            if (data != null) {
                if (_this.formbackup != null) {
                    _this.onSubmit(_this.formbackup);
                }
                else {
                    _this.LoadDailyEntryData();
                }
                _this.modal.dismiss();
                _this.msg = "Data Saved Successfully....";
            }
            else {
                _this.msg = "Error has occurred while modifying existing Data!";
            }
        }, function (error) {
            _this.msg = error;
        });
    };
    __decorate([
        core_1.ViewChild('modal'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], DailyEntrysheetComponent.prototype, "modal", void 0);
    DailyEntrysheetComponent = __decorate([
        core_1.Component({
            providers: [DailyEntrysheet_service_1.DailyEntrysheetService],
            templateUrl: 'app/Components/Report/Attendance/DailyEntrysheet.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, DailyEntrysheet_service_1.DailyEntrysheetService, pager_index_1.PagerService, router_1.ActivatedRoute, CommonHelper_service_1.CommonHelperService])
    ], DailyEntrysheetComponent);
    return DailyEntrysheetComponent;
}());
exports.DailyEntrysheetComponent = DailyEntrysheetComponent;
