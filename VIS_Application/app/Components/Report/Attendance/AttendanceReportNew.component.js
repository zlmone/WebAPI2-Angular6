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
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../../Shared/global");
var pager_index_1 = require("../../../Shared/pager.index");
var router_1 = require("@angular/router");
var AttendanceReportNew_service_1 = require("../../../Service/Report/Attendance/AttendanceReportNew.service");
var AttendanceReportNewcomponent = (function () {
    function AttendanceReportNewcomponent(fb, _AttendanceReportNewService, router, pagerService) {
        this.fb = fb;
        this._AttendanceReportNewService = _AttendanceReportNewService;
        this.router = router;
        this.pagerService = pagerService;
        this.indLoading = false;
        this.CurrentRecordsPerPage = 10;
        this.pager = {};
        this.lastday = function (y, m) {
            return new Date(y, m + 1, 0).getDate();
        };
        this.GetSystemDateTime();
    }
    AttendanceReportNewcomponent.prototype.ngOnInit = function () {
        $("#depart").hide();
        $("#company").hide();
        $("#LineManager").hide();
        $("#usertType").hide();
        $("#emp").show();
        $("#empAll").show();
        $("#date").hide();
        $("#rbtemployee").prop("checked", true);
        $("#rbtMonth").prop("checked", true);
        $("#rbtsortname").prop("checked", true);
        $("#rbtgrid").prop("checked", true);
        this.Yearval = new Date().getFullYear();
        $("#tdAdmin").hide();
        $('#ddlmonth option:eq(' + (new Date).getMonth() + ')').prop('selected', true);
        $('#ddlemp option[value="0"]').attr("selected", "SelectALL");
        this.Month = new Date().getMonth() + 1;
        this.FillDepartMent();
        this.FillEmployee();
        this.FillCompany();
        this.FillAllLineManager();
        this.FillUserType();
        this.FillYear();
    };
    AttendanceReportNewcomponent.prototype.HideECLU = function () {
        $("#emp").hide(-300);
        $("#empAll").hide(-300);
        $("#company").hide(-300);
        $("#LineManager").hide(-300);
        $("#usertType").hide(-300);
        $("#depart").show(-300);
    };
    AttendanceReportNewcomponent.prototype.HideDCLU = function () {
        $("#depart").hide(-300);
        $("#company").hide(-300);
        $("#LineManager").hide(-300);
        $("#usertType").hide(-300);
        $("#emp").show(-300);
        $("#empAll").show(-300);
    };
    AttendanceReportNewcomponent.prototype.HideDELU = function () {
        $("#depart").hide(-300);
        $("#emp").hide(-300);
        $("#empAll").hide(-300);
        $("#LineManager").hide(-300);
        $("#usertType").hide(-300);
        $("#company").show(-300);
    };
    AttendanceReportNewcomponent.prototype.HideDECU = function () {
        $("#depart").hide(-300);
        $("#emp").hide(-300);
        $("#empAll").hide(-300);
        $("#company").hide(-300);
        $("#usertType").hide(-300);
        $("#LineManager").show(-300);
    };
    AttendanceReportNewcomponent.prototype.HideDECL = function () {
        $("#depart").hide(-300);
        $("#emp").hide(-300);
        $("#empAll").hide(-300);
        $("#company").hide(-300);
        $("#LineManager").hide(-300);
        $("#usertType").show(-300);
    };
    AttendanceReportNewcomponent.prototype.HideDate = function () {
        $("#date").hide(-300);
        $("#month").show(-300);
    };
    AttendanceReportNewcomponent.prototype.HideMonth = function () {
        $("#date").show(-300);
        $("#month").hide(-300);
    };
    AttendanceReportNewcomponent.prototype.FillDepartMent = function () {
        var _this = this;
        this._AttendanceReportNewService.FillDepartMent(global_1.Global.BASE_AttendanceReportNew_ENDPOINT)
            .subscribe(function (data) {
            _this.indLoading = false;
            _this.Department = data;
        }, function (error) {
            _this.msg = error;
        });
    };
    AttendanceReportNewcomponent.prototype.FillEmployee = function () {
        var _this = this;
        var UserId = 21;
        var UserType = 'Admin';
        this._AttendanceReportNewService.FillEmployee(global_1.Global.BASE_AttendanceReportNew_ENDPOINT, UserId, UserType)
            .subscribe(function (data) {
            _this.indLoading = false;
            _this.Employee = data;
        }, function (error) {
            _this.msg = error;
        });
    };
    AttendanceReportNewcomponent.prototype.FillAllEmployee = function (event) {
        var _this = this;
        if ($('#chkallemployee').is(':checked')) {
            this._AttendanceReportNewService.FillAllEmployee(global_1.Global.BASE_AttendanceReportNew_ENDPOINT, true, 21)
                .subscribe(function (data) {
                _this.indLoading = false;
                _this.Employee = data;
            }, function (error) {
                _this.msg = error;
            });
        }
        else {
            this._AttendanceReportNewService.FillEmployee(global_1.Global.BASE_AttendanceReportNew_ENDPOINT, 21, 'Admin')
                .subscribe(function (data) {
                _this.indLoading = false;
                _this.Employee = data;
            }, function (error) {
                _this.msg = error;
            });
        }
    };
    AttendanceReportNewcomponent.prototype.FillCompany = function () {
        var _this = this;
        this._AttendanceReportNewService.FillCompany(global_1.Global.BASE_AttendanceReportNew_ENDPOINT, true)
            .subscribe(function (data) {
            _this.indLoading = false;
            _this.Company = data;
        }, function (error) {
            _this.msg = error;
        });
    };
    AttendanceReportNewcomponent.prototype.FillAllLineManager = function () {
        var _this = this;
        this._AttendanceReportNewService.FillAllLineManager(global_1.Global.BASE_AttendanceReportNew_ENDPOINT, true, 21)
            .subscribe(function (data) {
            _this.indLoading = false;
            _this.LineManager = data;
        }, function (error) {
            _this.msg = error;
        });
    };
    AttendanceReportNewcomponent.prototype.FillUserType = function () {
        var _this = this;
        this._AttendanceReportNewService.FillUserType(global_1.Global.BASE_AttendanceReportNew_ENDPOINT)
            .subscribe(function (data) {
            _this.indLoading = false;
            _this.User = data;
        }, function (error) {
            _this.msg = error;
        });
    };
    AttendanceReportNewcomponent.prototype.FillYear = function () {
        var _this = this;
        this._AttendanceReportNewService.FillYear(global_1.Global.BASE_AttendanceReportNew_ENDPOINT)
            .subscribe(function (data) {
            _this.indLoading = false;
            _this.Year = data;
        }, function (error) {
            _this.msg = error;
        });
    };
    AttendanceReportNewcomponent.prototype.GetSystemDateTime = function () {
        var _this = this;
        this._AttendanceReportNewService.GetSystemDateTime(global_1.Global.BASE_AttendanceReportNew_ENDPOINT)
            .subscribe(function (data) {
            _this.indLoading = false;
            _this.SystemDate = data;
        }, function (error) {
            _this.msg = error;
        });
    };
    AttendanceReportNewcomponent.prototype.ChangeId = function (event) {
        this.ModeId = event.target.value;
    };
    AttendanceReportNewcomponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.Attendance);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    AttendanceReportNewcomponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    AttendanceReportNewcomponent.prototype.btnAttendanceApprovePunchIn = function (ATRPNEW) {
        if (ATRPNEW.IsAdmin == true) {
            this.EmployeeName = ATRPNEW.EmployeeName;
            this.Date = ATRPNEW.Date;
            this.Grace = ATRPNEW.Grace;
            if (ATRPNEW.HR_In_Time.length > 4) {
                this.ActualEHr = ATRPNEW.HR_In_Time.trim().slice(0, 2);
                this.ActualEMin = ATRPNEW.HR_In_Time.trim().slice(3, 5);
            }
            else {
                this.ActualEHr = ATRPNEW.HR_In_Time.trim().slice(0, 1);
                this.ActualEMin = ATRPNEW.HR_In_Time.trim().slice(2, 4);
            }
            if (ATRPNEW.PunchIntime != null) {
                this.EntryHr = ATRPNEW.PunchIntime.trim().slice(11, 13);
                this.EntryMin = ATRPNEW.PunchIntime.trim().slice(14, 16);
            }
            this.modalAttendanceApprovalPunchIn.open();
        }
    };
    AttendanceReportNewcomponent.prototype.btnAttendanceApprovePunchOut = function (ATRPNEW) {
        if (ATRPNEW.IsAdmin == true) {
            this.EmployeeName = ATRPNEW.EmployeeName;
            this.Date = ATRPNEW.Date;
            this.Grace = ATRPNEW.Grace;
            if (ATRPNEW.HR_In_Time.length > 4) {
                this.ActualEHr = ATRPNEW.HR_In_Time.trim().slice(0, 2);
                this.ActualEMin = ATRPNEW.HR_In_Time.trim().slice(3, 5);
            }
            else {
                this.ActualEHr = ATRPNEW.HR_In_Time.trim().slice(0, 1);
                this.ActualEMin = ATRPNEW.HR_In_Time.trim().slice(2, 4);
            }
            if (ATRPNEW.PunchOuttime != null) {
                this.EntryHr = ATRPNEW.PunchOuttime.trim().slice(11, 13);
                this.EntryMin = ATRPNEW.PunchOuttime.trim().slice(14, 16);
            }
            this.modalAttendanceApprovalLunchOut.open();
        }
    };
    AttendanceReportNewcomponent.prototype.btnAttendanceApproveLunchOut = function (ATRPNEW) {
        if (ATRPNEW.IsAdmin == true) {
            this.EmployeeName = ATRPNEW.EmployeeName;
            this.Date = ATRPNEW.Date;
            this.Grace = ATRPNEW.Grace;
            if (ATRPNEW.HR_In_Time.length > 4) {
                this.ActualEHr = ATRPNEW.HR_In_Time.trim().slice(0, 2);
                this.ActualEMin = ATRPNEW.HR_In_Time.trim().slice(3, 5);
            }
            else {
                this.ActualEHr = ATRPNEW.HR_In_Time.trim().slice(0, 1);
                this.ActualEMin = ATRPNEW.HR_In_Time.trim().slice(2, 4);
            }
            if (ATRPNEW.LunchOutTime != null) {
                this.EntryHr = ATRPNEW.LunchOutTime.trim().slice(11, 13);
                this.EntryMin = ATRPNEW.LunchOutTime.trim().slice(14, 16);
            }
            this.modalAttendanceApprovalLunchOut.open();
        }
    };
    AttendanceReportNewcomponent.prototype.btnAttendanceApproveLunchIn = function (ATRPNEW) {
        if (ATRPNEW.IsAdmin == true) {
            this.EmployeeName = ATRPNEW.EmployeeName;
            this.Date = ATRPNEW.Date;
            this.Grace = ATRPNEW.Grace;
            if (ATRPNEW.HR_In_Time.length > 4) {
                this.ActualEHr = ATRPNEW.HR_In_Time.trim().slice(0, 2);
                this.ActualEMin = ATRPNEW.HR_In_Time.trim().slice(3, 5);
            }
            else {
                this.ActualEHr = ATRPNEW.HR_In_Time.trim().slice(0, 1);
                this.ActualEMin = ATRPNEW.HR_In_Time.trim().slice(2, 4);
            }
            if (ATRPNEW.LunchInTime != null) {
                this.EntryHr = ATRPNEW.LunchInTime.trim().slice(11, 13);
                this.EntryMin = ATRPNEW.LunchInTime.trim().slice(14, 16);
            }
            this.modalAttendanceApprovalLunchIn.open();
        }
    };
    AttendanceReportNewcomponent.prototype.btnAttendanceApproveOtherwork = function (ATRPNEW) {
        if (ATRPNEW.IsAdmin == true) {
            this.EmployeeName = ATRPNEW.EmployeeName;
            this.Date = ATRPNEW.Date;
            this.Grace = ATRPNEW.Grace;
            if (ATRPNEW.HR_In_Time.length > 4) {
                this.ActualEHr = ATRPNEW.HR_In_Time.trim().slice(0, 2);
                this.ActualEMin = ATRPNEW.HR_In_Time.trim().slice(3, 5);
            }
            else {
                this.ActualEHr = ATRPNEW.HR_In_Time.trim().slice(0, 1);
                this.ActualEMin = ATRPNEW.HR_In_Time.trim().slice(2, 4);
            }
            if (ATRPNEW.OtherWork != null) {
                this.EntryHr = ATRPNEW.OtherWork.trim().slice(0, 2);
                this.EntryMin = ATRPNEW.OtherWork.trim().slice(3, 5);
            }
            this.modalAttendanceApprovalOtherWork.open();
        }
    };
    AttendanceReportNewcomponent.prototype.RedirectToTimeSheet = function (ATRPNEW) {
    };
    AttendanceReportNewcomponent.prototype.RedirectToRecordPerEmp = function (ATRPNEW) {
        this.router.navigate(['/DailyEntryReport'], { queryParams: { EmployeeId: ATRPNEW.EmployeeId, EmployeeName: ATRPNEW.EmployeeName, Date: ATRPNEW.Date, EntryTime: ATRPNEW.PunchIntime, Remarks: ATRPNEW.In_Remarks } });
    };
    AttendanceReportNewcomponent.prototype.RedirectToAddEmpRecord = function (ATRPNEW) {
        var d1 = ATRPNEW.Date.split('/');
        var datval = d1[1] + '/' + d1[0] + '/' + d1[2];
        this.router.navigate(['/AddEmployeeRecord'], { queryParams: { EmployeeId: ATRPNEW.EmployeeId, EmployeeName: ATRPNEW.EmployeeName, Date: datval, EntryTime: ATRPNEW.PunchIntime, Remarks: ATRPNEW.In_Remarks } });
    };
    AttendanceReportNewcomponent.prototype.onSubmit = function (formData) {
        var _this = this;
        var month = formData.Month;
        var year = formData.year;
        year = jQuery("#ddlyear option:selected").text();
        var day = 1;
        var SortBy;
        var Mode;
        if ($('#rbtDate').is(':checked')) {
            if ($('#txtfromdate').val() != "") {
                this.StartDate = $('#txtfromdate').val();
            }
            else {
                this.StartDate = this.SystemDate.toString();
            }
            if ($('#txttodate').val() != "") {
                this.EndDate = $('#txttodate').val();
            }
            else {
                this.EndDate = this.StartDate;
            }
        }
        if ($('#rbtMonth').is(':checked')) {
            this.StartDate = year + '/' + month + '/' + day + ' '.concat('12:00:00 AM');
            var y = this.SystemDate.toString().trim();
            y = y.slice(6, 10);
            var dat = this.SystemDate.toString().trim();
            var mon = this.SystemDate.toString().trim();
            var lastDate = this.lastday(year, month).toString();
            if (year == y) {
                mon = mon.slice(0, 2);
                if (month == mon) {
                    dat = dat.slice(3, 5);
                    this.EndDate = year + '/' + month + '/' + lastDate + ' '.concat('12:00:00 AM');
                    var diff = Date.parse(this.EndDate) - Date.parse(this.StartDate);
                    day = diff / 1000 / 60 / 60 / 24;
                }
                else {
                    this.EndDate = year + '/' + month + '/' + lastDate + ' '.concat('12:00:00 AM');
                }
            }
            else {
                this.EndDate = year + '/' + month + '/' + lastDate + ' '.concat('12:00:00 AM');
            }
        }
        if ($('#rbtsortdate').is(':checked')) {
            SortBy = "Date";
        }
        else {
            SortBy = "Name";
        }
        if ($('#rbtdepartment').is(':checked')) {
            Mode = "department";
            this.ModeId = formData.Department;
        }
        else if ($('#rbtemployee').is(':checked')) {
            Mode = "employee";
            if (formData.Employee == '') {
                if ($('#chkallemployee').is(':checked')) {
                    this.ModeId = -1;
                }
                else {
                    this.ModeId = 0;
                }
            }
            else {
                this.ModeId = formData.Employee;
            }
        }
        else if ($('#rbtcompany').is(':checked')) {
            Mode = "company";
            if (formData.Company == '') {
                this.ModeId = 0;
            }
            else {
                this.ModeId = formData.Company;
            }
        }
        else if ($('#rbtlinemanager').is(':checked')) {
            Mode = "linemanager";
            if (formData.LineManager == '') {
                this.ModeId = 0;
            }
            else {
                this.ModeId = formData.LineManager;
            }
        }
        else if ($('#rbtusertype').is(':checked')) {
            Mode = "usertype";
            if (formData.UserType == '') {
                this.ModeId = 0;
            }
            else {
                this.ModeId = formData.UserType;
            }
        }
        this.IsAdmin = true;
        if ($('#rbtreport').is(':checked')) {
            this._AttendanceReportNewService.GetAllAttendanceReport(global_1.Global.BASE_AttendanceReportNew_ENDPOINT, Mode, this.ModeId, this.StartDate, this.EndDate, SortBy, this.IsAdmin)
                .subscribe(function (data) {
                _this.indLoading = false;
                _this.Attendance = data;
                if (data != '' && data.length > 0) {
                    _this.JumpOnPage(1); //Report Generated
                }
            });
        }
        else {
            this._AttendanceReportNewService.GetAllAttendanceData(global_1.Global.BASE_AttendanceReportNew_ENDPOINT, Mode, this.ModeId, this.StartDate, this.EndDate, SortBy, this.IsAdmin)
                .subscribe(function (data) {
                _this.indLoading = false;
                _this.Attendance = data;
                if (data != '' && data.length > 0) {
                    if ($('#rbtgrid').is(':checked')) {
                        _this.JumpOnPage(1);
                    }
                    else if ($('#rbtexcel').is(':checked')) {
                        // Download
                    }
                    else {
                        //rdlc Report Generate
                    }
                }
            }, function (error) {
                _this.msg = error;
            });
        }
    };
    __decorate([
        core_1.ViewChild('modalAttendanceApprovalPunchIn'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], AttendanceReportNewcomponent.prototype, "modalAttendanceApprovalPunchIn", void 0);
    __decorate([
        core_1.ViewChild('modalAttendanceApprovalPunchOut'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], AttendanceReportNewcomponent.prototype, "modalAttendanceApprovalPunchOut", void 0);
    __decorate([
        core_1.ViewChild('modalAttendanceApprovalLunchOut'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], AttendanceReportNewcomponent.prototype, "modalAttendanceApprovalLunchOut", void 0);
    __decorate([
        core_1.ViewChild('modalAttendanceApprovalLunchIn'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], AttendanceReportNewcomponent.prototype, "modalAttendanceApprovalLunchIn", void 0);
    __decorate([
        core_1.ViewChild('modalAttendanceApprovalOtherWork'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], AttendanceReportNewcomponent.prototype, "modalAttendanceApprovalOtherWork", void 0);
    AttendanceReportNewcomponent = __decorate([
        core_1.Component({
            providers: [AttendanceReportNew_service_1.AttendanceReportNewService],
            templateUrl: 'app/Components/Report/Attendance/AttendanceReportNew.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, AttendanceReportNew_service_1.AttendanceReportNewService, router_1.Router, pager_index_1.PagerService])
    ], AttendanceReportNewcomponent);
    return AttendanceReportNewcomponent;
}());
exports.AttendanceReportNewcomponent = AttendanceReportNewcomponent;
