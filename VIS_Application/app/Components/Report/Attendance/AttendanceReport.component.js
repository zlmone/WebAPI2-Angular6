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
var AttendanceReport_Service_1 = require("../../../Service/Report/Attendance/AttendanceReport.Service");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../../Shared/global");
var pager_index_1 = require("../../../Shared/pager.index");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
//import { AttendanceReportFilterPipe } from '../../../Filter/Report/Attendance/Attendance_Report';
var AttendanceReportComponent = (function () {
    function AttendanceReportComponent(fb, _AttendanceReportService, http, router, pagerService) {
        this.fb = fb;
        this._AttendanceReportService = _AttendanceReportService;
        this.http = http;
        this.router = router;
        this.pagerService = pagerService;
        this.indLoading = false;
        this.CurrentRecordsPerPage = 10;
        this.pager = {};
    }
    AttendanceReportComponent.prototype.ngOnInit = function () {
        $("#depart").hide();
        $("#companydata").hide();
        $("#LM").hide();
        $("#emp").show();
        $("#empAll").show();
        $("#Employee").prop("checked", true);
        $("#datedata").hide();
        $("#rdbmonth").prop("checked", true);
        $("#rdbDate").prop("checked", false);
        $("#RdbSortName").prop("checked", true);
        $('#ddlmonth option:eq(' + (new Date).getMonth() + ')').prop('selected', true);
        this.Yearval = new Date().getFullYear();
        this.AttendanceDepart = [
            ({
                Id: 0,
                Department_Name: '',
                mode: ''
            })
        ];
        this.AttendanceEmployee = [({
                Id: 0,
                Employee_Name: '',
                mode: ''
            })];
        this.AttendanceCompany = [({
                Id: 0,
                CompanyName: '',
                mode: ''
            })];
        this.AttendanceLineManager = [({
                Id: 0,
                LineManager: '',
                mode: ''
            })];
        this.AttendancebindData = [({
                Employee_Id: 0,
                EmployeeCode: '',
                Employee_Name: '',
                Date: '',
                MMDDYYYY_DateFormat: '',
                Days: '',
                ImportRemarks: '',
                HoverImportRemarks: '',
                InId: 0,
                In_Time: null,
                OutId: 0,
                Out_Time: null,
                LunchOutId: 0,
                LunchOut_Time: null,
                LunchInId: 0,
                LunchIn_Time: null,
                OtherId: 0,
                Other_Time: null,
                TotalWorksheet_Hr: 0,
                status: '',
                Total_W_Hr: '',
                Total_Hrs: '',
                diff: '',
                TotalId: '',
                ActualEntryTime: '',
                Grace: 0,
                EntryType: ''
            })];
        this.AttendanceYear = [({
                Id: 0,
                Month: '',
                Year: ''
            })];
        this.LoadDepartment();
        this.LoadCompany();
        this.LoadLineManager();
        this.LoadYear();
        this.LoadEmployee();
    };
    AttendanceReportComponent.prototype.HideEMCOLM = function () {
        $("#emp").hide(-300);
        $("#empAll").hide(-300);
        $("#companydata").hide(-300);
        $("#LM").hide(-300);
        $("#depart").show(-300);
    };
    AttendanceReportComponent.prototype.HideCOLMDP = function () {
        $("#depart").hide(-300);
        $("#companydata").hide(-300);
        $("#LM").hide(-300);
        $("#emp").show(-300);
        $("#empAll").show(-300);
    };
    AttendanceReportComponent.prototype.HideLMDPEM = function () {
        $("#depart").hide(-300);
        $("#emp").hide(-300);
        $("#empAll").hide(-300);
        $("#LM").hide(-300);
        $("#companydata").show(-300);
    };
    AttendanceReportComponent.prototype.HideDPEMCO = function () {
        $("#depart").hide(-300);
        $("#emp").hide(-300);
        $("#empAll").hide(-300);
        $("#companydata").hide(-300);
        $("#LM").show(-300);
    };
    AttendanceReportComponent.prototype.HideMonth = function () {
        $("#monthData").hide(-300);
        $("#datedata").show(-300);
    };
    AttendanceReportComponent.prototype.HideDate = function () {
        $("#monthData").show(-300);
        $("#datedata").hide(-300);
    };
    AttendanceReportComponent.prototype.btnAttendanceApprovePunchIn = function (data) {
        this.EmployeeName = data.Employee_Name;
        this.AttendanceDate = data.Date;
        this.Employee_Id = data.Employee_Id;
        this.Grace = data.Grace;
        this.EntryHr = data.In_Time;
        this.EntryMin = data.In_Time;
        var HH_EIN = this.EntryHr.slice(8, 10).trim();
        this.EntryHr = HH_EIN;
        var MIN_EIN = this.EntryMin.slice(11, 13).trim();
        this.EntryMin = MIN_EIN;
        this.DrpEntryIn = data.In_Time;
        var DrpIn = this.DrpEntryIn.slice(17, 19).trim();
        this.InId = data.InId;
        this.DrpEntryIn = DrpIn;
        this.ActualHr = data.ActualEntryTime;
        var HH_AIN = this.ActualHr.slice(0, 2).trim();
        this.ActualHr = HH_AIN;
        this.ActualMin = data.ActualEntryTime;
        var MIN_AIN = this.ActualMin.slice(3, 5).trim();
        this.ActualMin = MIN_AIN;
        this.modalAttendanceApprovalPunchIn.open();
    };
    AttendanceReportComponent.prototype.btnAttendanceApprovePunchOut = function (data) {
        this.EmployeeName = data.Employee_Name;
        this.AttendanceDate = data.Date;
        this.Employee_Id = data.Employee_Id;
        this.Grace = data.Grace;
        this.EntryHr = data.Out_Time;
        this.EntryMin = data.Out_Time;
        var HH_EOUT = this.EntryHr.slice(8, 10).trim();
        this.EntryHr = HH_EOUT;
        var MIN_EOUT = this.EntryMin.slice(11, 13).trim();
        this.EntryMin = MIN_EOUT;
        this.DrpEntryIn = data.Out_Time;
        var DrpOut = this.DrpEntryIn.slice(17, 19).trim();
        this.DrpEntryIn = DrpOut;
        this.ActualHr = data.ActualEntryTime;
        var HH_AOUT = this.ActualHr.slice(0, 2).trim();
        this.ActualHr = HH_AOUT;
        this.ActualMin = data.ActualEntryTime;
        var MIN_AOUT = this.ActualMin.slice(3, 5).trim();
        this.ActualMin = MIN_AOUT;
        this.OutId = data.OutId;
        this.modalAttendanceApprovalPunchOut.open();
    };
    AttendanceReportComponent.prototype.btnAttendanceApproveLunchOut = function (data) {
        this.EmployeeName = data.Employee_Name;
        this.AttendanceDate = data.Date;
        this.Employee_Id = data.Employee_Id;
        this.LunchOutId = data.LunchOutId;
        this.modalAttendanceApprovalLunchOut.open();
    };
    AttendanceReportComponent.prototype.btnAttendanceApproveLunchIn = function (data) {
        this.LunchInId = data.LunchInId;
        this.Employee_Id = data.Employee_Id;
        this.EmployeeName = data.Employee_Name;
        this.AttendanceDate = data.Date;
        this.modalAttendanceApprovalLunchIn.open();
    };
    AttendanceReportComponent.prototype.btnAttendanceApproveOtherwork = function (data) {
        this.OtherId = data.OtherId;
        this.Employee_Id = data.Employee_Id;
        this.EmployeeName = data.Employee_Name;
        this.AttendanceDate = data.Date;
        this.modalAttendanceApprovalWorkIn.open();
    };
    //----Punch-In Attendance Approve
    AttendanceReportComponent.prototype.ApproveAttendancePunchIn = function () {
        var _this = this;
        this.EntryHr = $("#EntryHour").val();
        this.EntryMin = $("#EntryMinute").val();
        this.DRPAM_PM = $("#ddlIn").val();
        this.HODRemarks = $("#HODRemarks").val();
        this.Grace = $("#Grace").val();
        this.ActualHr = $("#ActualHour").val();
        this.ActualMin = $("#ActualMinute").val();
        this.DrpActualIn = $("#ddlAIn").val();
        if ((parseInt(this.EntryHr.toString()) < 24) && (parseInt(this.EntryMin.toString()) < 60)) {
            this.strDate = this.AttendanceDate;
            this.strarrdate = this.strDate.split("/");
            this.Temp = this.strarrdate[2] + this.strarrdate[1] + this.strarrdate[0] + " " + this.EntryHr + ":" + this.EntryMin + ":00" + "  " + this.DRPAM_PM;
            this.EntryType = 1;
            if (this.InId.toString().length > 0) {
                if (this.EntryType < 3) {
                    if (this.DrpActualIn == "PM") {
                        if (parseInt(this.ActualHr) <= 12) {
                        }
                        else {
                            this.ActualHr += 12;
                        }
                        this.ActualHr;
                    }
                    else {
                        this.ActualHr;
                    }
                    this.ActualHr = this.ActualHr + ":" + this.ActualMin;
                }
                this.indLoading = true;
                this._AttendanceReportService.AttendanceApproval(global_1.Global.BASE_AttendanceReport_ENDPOINT, this.InId, 1, this.HODRemarks, this.strDate, this.Temp, this.Grace, this.ActualHr)
                    .subscribe(function (data) {
                    _this.indLoading = false;
                }, function (error) {
                    _this.msg = error;
                });
            }
            else {
                this._AttendanceReportService.GetDailyEntryTime(global_1.Global.BASE_AttendanceReport_ENDPOINT, this.Employee_Id, this.strDate)
                    .subscribe(function (data) {
                    _this.indLoading = false;
                    _this.EmployeeDailyTime = data;
                    var Datetime = new Date(_this.strDate);
                    var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                    var weekday = weekdays[Datetime.getDay()];
                    if (data != "") {
                        var Time_1 = "";
                        _this.EmployeeDailyTime = data;
                        if (_this.EntryType == 1) {
                            if (weekday == "Saturday") {
                                _this.EmployeeDailyTime.forEach(function (data) {
                                    Time_1 = data.In_Sat;
                                });
                            }
                            else {
                                _this.EmployeeDailyTime.forEach(function (data) {
                                    Time_1 = data.In_Mon_Fri;
                                });
                            }
                        }
                        else if (_this.EntryType = 2) {
                            if (weekday == "Saturday") {
                                _this.EmployeeDailyTime.forEach(function (data) {
                                    Time_1 = data.Out_Sat;
                                });
                            }
                            else {
                                _this.EmployeeDailyTime.forEach(function (data) {
                                    Time_1 = data.Out_Mon_Fri;
                                });
                            }
                        }
                        else {
                            Time_1 = "";
                        }
                        _this.strDate = _this.AttendanceDate;
                        _this.strarrdate = _this.strDate.split("/");
                        _this.Temp = _this.strarrdate[2] + _this.strarrdate[1] + _this.strarrdate[0] + " " + _this.EntryHr + ":" + _this.EntryMin + ":00" + "  " + _this.DRPAM_PM;
                        _this.EntryType = 1;
                        _this._AttendanceReportService.AddEmployeeAttendance(global_1.Global.BASE_AttendanceReport_ENDPOINT, 0, _this.Employee_Id, _this.EntryType, _this.HODRemarks, _this.Temp, _this.strDate, Time_1, _this.Grace)
                            .subscribe(function (success) {
                            _this.indLoading = false;
                        }, function (error) {
                            _this.msg = error;
                        });
                    }
                }, function (error) {
                    _this.msg = error;
                });
            }
        }
    };
    AttendanceReportComponent.prototype.AttendanceRejectPunchIn = function () {
        var _this = this;
        this.EntryType = 1;
        this.HODRemarks = $("#HODRemarks").val();
        this._AttendanceReportService.AttendanceRejectPunchIn(global_1.Global.BASE_AttendanceReport_ENDPOINT, this.Id, this.EntryType, this.AttendanceDate, this.HODRemarks, this.InId)
            .subscribe(function (data) {
            _this.indLoading = false;
        }, function (error) {
            _this.msg = error;
        });
    };
    AttendanceReportComponent.prototype.ApproveAttendanceOkPunchIn = function () {
        var _this = this;
        var Remarks = $("#RemarksQuickApprove").val();
        this._AttendanceReportService.ApproveAttendanceOkIn(global_1.Global.BASE_AttendanceReport_ENDPOINT, this.InId, Remarks)
            .subscribe(function (data) {
            _this.indLoading = true;
        }, function (error) {
            _this.msg = error;
        });
    };
    //----Punch-Out Attendance Approve
    AttendanceReportComponent.prototype.ApproveAttendancePunchOut = function () {
        var _this = this;
        this.EntryHr = $("#EntryHrPunchout").val();
        this.EntryMin = $("#EntryMinPunchOut").val();
        this.DRPAM_PM = $("#ddlout").val();
        this.HODRemarks = $("#HODRemarksPunchOut").val();
        this.Grace = $("#GracePunchOut").val();
        this.ActualHr = $("#ActualHourPunchOut").val();
        this.ActualMin = $("#ActualMinute").val();
        this.DrpActualOut = $("#ddlout").val();
        this.EntryType = 2;
        if ((parseInt(this.EntryHr.toString()) < 12) && (parseInt(this.EntryMin.toString()) < 60)) {
            this.strDate = this.AttendanceDate;
            this.strarrdate = this.strDate.split("/");
            this.Temp = this.strarrdate[2] + this.strarrdate[1] + this.strarrdate[0] + " " + this.EntryHr + ":" + this.EntryMin + ":00" + "  " + this.DRPAM_PM;
            if (this.OutId.toString().length > 0) {
                if (this.EntryType < 3) {
                    if (this.DrpActualOut == "PM") {
                        if (parseInt(this.ActualHr) <= 12) {
                        }
                        else {
                            this.ActualHr += 12;
                        }
                        this.ActualHr;
                    }
                    else {
                        this.ActualHr;
                    }
                    this.ActualHr = this.ActualHr + ":" + this.ActualMin;
                }
                this._AttendanceReportService.ApproveAttendancePunchOut(global_1.Global.BASE_AttendanceReport_ENDPOINT, this.OutId, this.EntryType, this.HODRemarks, this.strDate, this.Temp, this.Grace, this.ActualHr)
                    .subscribe(function (data) {
                    _this.indLoading = false;
                }, function (error) {
                    _this.msg = error;
                });
            }
            else {
                this._AttendanceReportService.GetDailyEntryTime(global_1.Global.BASE_AttendanceReport_ENDPOINT, this.Employee_Id, this.strDate)
                    .subscribe(function (data) {
                    _this.indLoading = false;
                    _this.EmployeeDailyTime = data;
                    var Datetime = new Date(_this.strDate);
                    var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                    var weekday = weekdays[Datetime.getDay()];
                    if (data != "") {
                        var Time_2 = "";
                        _this.EmployeeDailyTime = data;
                        if (_this.EntryType == 1) {
                            if (weekday == "Saturday") {
                                _this.EmployeeDailyTime.forEach(function (data) {
                                    Time_2 = data.In_Sat;
                                });
                            }
                            else {
                                _this.EmployeeDailyTime.forEach(function (data) {
                                    Time_2 = data.In_Mon_Fri;
                                });
                            }
                        }
                        else if (_this.EntryType = 2) {
                            if (weekday == "Saturday") {
                                _this.EmployeeDailyTime.forEach(function (data) {
                                    Time_2 = data.Out_Sat;
                                });
                            }
                            else {
                                _this.EmployeeDailyTime.forEach(function (data) {
                                    Time_2 = data.Out_Mon_Fri;
                                });
                            }
                        }
                        else {
                            Time_2 = "";
                        }
                        _this.strDate = _this.AttendanceDate;
                        _this.strarrdate = _this.strDate.split("/");
                        _this.Temp = _this.strarrdate[2] + _this.strarrdate[1] + _this.strarrdate[0] + " " + _this.EntryHr + ":" + _this.EntryMin + ":00" + "  " + _this.DRPAM_PM;
                        _this.EntryType = 2;
                        _this._AttendanceReportService.AddEmployeeAttendancePunchOut(global_1.Global.BASE_AttendanceReport_ENDPOINT, _this.Employee_Id, _this.EntryType, _this.HODRemarks, _this.Temp, _this.strDate, _this.ActualHr, _this.Grace)
                            .subscribe(function (success) {
                            _this.indLoading = false;
                        }, function (error) {
                            _this.msg = error;
                        });
                    }
                }, function (error) {
                    _this.msg = error;
                });
            }
        }
    };
    AttendanceReportComponent.prototype.AttendanceRejectPunchOut = function () {
        var _this = this;
        this.EntryType = 2;
        this.HODRemarks = $("#HODRemarksPunchOut").val();
        this._AttendanceReportService.AttendanceRejectPunchOut(global_1.Global.BASE_AttendanceReport_ENDPOINT, this.Id, this.EntryType, this.AttendanceDate, this.HODRemarks, this.OutId)
            .subscribe(function (data) {
            _this.indLoading = false;
        }, function (error) {
            _this.msg = error;
        });
    };
    AttendanceReportComponent.prototype.ApproveAttendanceOkPunchOut = function () {
        var _this = this;
        var Remarks = $("#ApprovalRemarksOut").val();
        this._AttendanceReportService.ApproveAttendanceOkPunchOut(global_1.Global.BASE_AttendanceReport_ENDPOINT, this.OutId, Remarks)
            .subscribe(function (data) {
            _this.indLoading = false;
        }, function (error) {
            _this.msg = error;
        });
    };
    //----Lunch-Out Attendance Approve 
    AttendanceReportComponent.prototype.ApproveAttendanceLunchOut = function () {
        var _this = this;
        this.EntryHr = $("#EntryHrLunchOut").val();
        this.EntryMin = $("#EntryMinuteLunchOut").val();
        this.DRPAM_PM = $("#ddlLunchOut").val();
        this.HODRemarks = $("#RemarksLunchOut").val();
        this.EntryType = 3;
        if ((parseInt(this.EntryHr.toString()) < 12) && (parseInt(this.EntryMin.toString()) < 60)) {
            this.strDate = this.AttendanceDate;
            this.strarrdate = this.strDate.split("/");
            this.Temp = this.strarrdate[2] + this.strarrdate[1] + this.strarrdate[0] + " " + this.EntryHr + ":" + this.EntryMin + ":00" + "  " + this.DRPAM_PM;
            if (this.LunchOutId.toString().length > 0) {
                this._AttendanceReportService.ApproveAttendanceLunchOut(global_1.Global.BASE_AttendanceReport_ENDPOINT, this.LunchOutId, this.HODRemarks, this.Temp)
                    .subscribe(function (data) {
                    _this.indLoading = false;
                }, function (error) {
                    _this.msg = error;
                });
            }
            else {
                this.strDate = this.AttendanceDate;
                this._AttendanceReportService.GetDailyEntryTime(global_1.Global.BASE_AttendanceReport_ENDPOINT, this.Employee_Id, this.strDate)
                    .subscribe(function (data) {
                    _this.indLoading = false;
                    _this.EmployeeDailyTime = data;
                    var Datetime = new Date(_this.strDate);
                    var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                    var weekday = weekdays[Datetime.getDay()];
                    if (data != "") {
                        var Time_3 = "";
                        _this.EmployeeDailyTime = data;
                        if (_this.EntryType == 1) {
                            if (weekday == "Saturday") {
                                _this.EmployeeDailyTime.forEach(function (data) {
                                    Time_3 = data.In_Sat;
                                });
                            }
                            else {
                                _this.EmployeeDailyTime.forEach(function (data) {
                                    Time_3 = data.In_Mon_Fri;
                                });
                            }
                        }
                        else if (_this.EntryType = 2) {
                            if (weekday == "Saturday") {
                                _this.EmployeeDailyTime.forEach(function (data) {
                                    Time_3 = data.Out_Sat;
                                });
                            }
                            else {
                                _this.EmployeeDailyTime.forEach(function (data) {
                                    Time_3 = data.Out_Mon_Fri;
                                });
                            }
                        }
                        else {
                            Time_3 = "";
                        }
                        _this.strDate = _this.AttendanceDate;
                        _this.strarrdate = _this.strDate.split("/");
                        _this.Temp = _this.strarrdate[2] + _this.strarrdate[1] + _this.strarrdate[0] + " " + _this.EntryHr + ":" + _this.EntryMin + ":00" + "  " + _this.DRPAM_PM;
                        _this.EntryType = 3;
                        _this._AttendanceReportService.AddEmployeeAttendanceLunchOut(global_1.Global.BASE_AttendanceReport_ENDPOINT, _this.Employee_Id, _this.EntryType, _this.HODRemarks, _this.Temp, _this.strDate, Time_3)
                            .subscribe(function (success) {
                            _this.indLoading = false;
                        }, function (error) {
                            _this.msg = error;
                        });
                    }
                }, function (error) {
                    _this.msg = error;
                });
            }
        }
    };
    AttendanceReportComponent.prototype.AttendanceRejectLunchOut = function () {
        var _this = this;
        this.EntryType = 3;
        this.strDate = this.AttendanceDate;
        this.HODRemarks = $("#RemarksLunchOut").val();
        this._AttendanceReportService.AttendanceRejectLunchOut(global_1.Global.BASE_AttendanceReport_ENDPOINT, this.LunchOutId, this.Employee_Id, this.EntryType, this.strDate, this.HODRemarks)
            .subscribe(function (data) {
            _this.indLoading = false;
        }, function (error) {
            _this.msg = error;
        });
    };
    AttendanceReportComponent.prototype.ApproveAttendanceOkLunchOut = function () {
        var _this = this;
        var Remarks = $("#ApprovalRemarksLunchOut").val();
        this._AttendanceReportService.ApproveAttendanceOkLunchOut(global_1.Global.BASE_AttendanceReport_ENDPOINT, this.LunchOutId, Remarks)
            .subscribe(function (data) {
            _this.indLoading = false;
        }, function (error) {
            _this.msg = error;
        });
    };
    //----Lunch-In Attendance Approve
    AttendanceReportComponent.prototype.ApproveAttendanceLunchIn = function () {
        var _this = this;
        this.EntryHr = $("#EntryHourLunchIn").val();
        this.EntryMin = $("#EntryMinuteLunchIn").val();
        this.HODRemarks = $("#RemarksLunchIn").val();
        this.DRPAM_PM = $("#ddlLunchIn").val();
        this.EntryType = 4;
        if ((parseInt(this.EntryHr.toString()) < 12) && (parseInt(this.EntryMin.toString()) < 60)) {
            this.strDate = this.AttendanceDate;
            this.strarrdate = this.strDate.split("/");
            this.Temp = this.strarrdate[2] + this.strarrdate[1] + this.strarrdate[0] + " " + this.EntryHr + ":" + this.EntryMin + ":00" + "  " + this.DRPAM_PM;
            if (this.LunchInId.toString().length > 0) {
                this._AttendanceReportService.ApproveAttendanceLunchIn(global_1.Global.BASE_AttendanceReport_ENDPOINT, this.LunchInId, this.HODRemarks, this.Temp)
                    .subscribe(function (data) {
                    _this.indLoading = false;
                }, function (error) {
                    _this.msg = error;
                });
            }
            else {
                this.strDate = this.AttendanceDate;
                this._AttendanceReportService.GetDailyEntryTime(global_1.Global.BASE_AttendanceReport_ENDPOINT, this.Employee_Id, this.strDate)
                    .subscribe(function (data) {
                    _this.indLoading = false;
                    _this.EmployeeDailyTime = data;
                    var Datetime = new Date(_this.strDate);
                    var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                    var weekday = weekdays[Datetime.getDay()];
                    if (data != "") {
                        var Time_4 = "";
                        _this.EmployeeDailyTime = data;
                        if (_this.EntryType == 1) {
                            if (weekday == "Saturday") {
                                _this.EmployeeDailyTime.forEach(function (data) {
                                    Time_4 = data.In_Sat;
                                });
                            }
                            else {
                                _this.EmployeeDailyTime.forEach(function (data) {
                                    Time_4 = data.In_Mon_Fri;
                                });
                            }
                        }
                        else if (_this.EntryType = 2) {
                            if (weekday == "Saturday") {
                                _this.EmployeeDailyTime.forEach(function (data) {
                                    Time_4 = data.Out_Sat;
                                });
                            }
                            else {
                                _this.EmployeeDailyTime.forEach(function (data) {
                                    Time_4 = data.Out_Mon_Fri;
                                });
                            }
                        }
                        else {
                            Time_4 = "";
                        }
                        _this.strDate = _this.AttendanceDate;
                        _this.strarrdate = _this.strDate.split("/");
                        _this.Temp = _this.strarrdate[2] + _this.strarrdate[1] + _this.strarrdate[0] + " " + _this.EntryHr + ":" + _this.EntryMin + ":00" + "  " + _this.DRPAM_PM;
                        _this.EntryType = 4;
                        _this._AttendanceReportService.AddEmployeeAttendanceLunchIn(global_1.Global.BASE_AttendanceReport_ENDPOINT, _this.Employee_Id, _this.EntryType, _this.HODRemarks, _this.Temp, _this.strDate, Time_4)
                            .subscribe(function (success) {
                            _this.indLoading = false;
                        }, function (error) {
                            _this.msg = error;
                        });
                    }
                }, function (error) {
                    _this.msg = error;
                });
            }
        }
    };
    AttendanceReportComponent.prototype.AttendanceRejectLunchIn = function () {
        var _this = this;
        this.EntryType = 4;
        this.HODRemarks = $("#RemarksLunchIn").val();
        this._AttendanceReportService.AttendanceRejectLunchIn(global_1.Global.BASE_AttendanceReport_ENDPOINT, this.Employee_Id, this.LunchInId, this.EntryType, this.AttendanceDate, this.HODRemarks)
            .subscribe(function (data) {
            _this.indLoading = false;
        }, function (error) {
            _this.msg = error;
        });
    };
    AttendanceReportComponent.prototype.ApproveAttendanceOkLunchIn = function () {
        var _this = this;
        var Remarks = $("#approvalRemarkslunchin").val();
        this._AttendanceReportService.ApproveAttendanceOkLunchIn(global_1.Global.BASE_AttendanceReport_ENDPOINT, this.LunchInId, Remarks)
            .subscribe(function (data) {
            _this.indLoading = false;
        }, function (error) {
            _this.msg = error;
        });
    };
    //-----Other In Attendance Approve
    AttendanceReportComponent.prototype.ApproveAttendanceOther = function () {
        var _this = this;
        this.EntryHr = $("#EntryHrother").val();
        this.EntryMin = $("#EntryMinother").val();
        this.DRPAM_PM = $("#ddlotherin").val();
        this.HODRemarks = $("#Remarksother").val();
        this.EntryType = 6;
        if ((parseInt(this.EntryHr.toString()) < 12) && (parseInt(this.EntryMin.toString()) < 60)) {
            this.strDate = this.AttendanceDate;
            this.strarrdate = this.strDate.split("/");
            this.Temp = this.strarrdate[2] + this.strarrdate[1] + this.strarrdate[0] + " " + this.EntryHr + ":" + this.EntryMin + ":00" + "  " + this.DRPAM_PM;
            if (this.OtherId.toString().length > 0) {
                this._AttendanceReportService.ApproveAttendanceOther(global_1.Global.BASE_AttendanceReport_ENDPOINT, this.OtherId, this.HODRemarks, this.Temp)
                    .subscribe(function (data) {
                    _this.indLoading = false;
                }, function (error) {
                    _this.msg = error;
                });
            }
            else {
                this._AttendanceReportService.GetEmployeeIsNotHostEmployee(global_1.Global.BASE_AttendanceReport_ENDPOINT, this.Employee_Id)
                    .subscribe(function (data) {
                    _this.indLoading = false;
                    _this.EmployeeDailyTime = data;
                    var Datetime = new Date(_this.strDate);
                    var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                    var weekday = weekdays[Datetime.getDay()];
                    if (data != "") {
                        var Time_5 = "";
                        _this.EmployeeDailyTime = data;
                        if (_this.EntryType == 1) {
                            if (weekday == "Saturday") {
                                _this.EmployeeDailyTime.forEach(function (data) {
                                    Time_5 = data.In_Sat;
                                });
                            }
                            else {
                                _this.EmployeeDailyTime.forEach(function (data) {
                                    Time_5 = data.In_Mon_Fri;
                                });
                            }
                        }
                        else if (_this.EntryType = 2) {
                            if (weekday == "Saturday") {
                                _this.EmployeeDailyTime.forEach(function (data) {
                                    Time_5 = data.Out_Sat;
                                });
                            }
                            else {
                                _this.EmployeeDailyTime.forEach(function (data) {
                                    Time_5 = data.Out_Mon_Fri;
                                });
                            }
                        }
                        else {
                            Time_5 = "";
                        }
                        _this.strDate = _this.AttendanceDate;
                        _this.strarrdate = _this.strDate.split("/");
                        _this.Temp = _this.strarrdate[2] + _this.strarrdate[1] + _this.strarrdate[0] + " " + _this.EntryHr + ":" + _this.EntryMin + ":00" + "  " + _this.DRPAM_PM;
                        _this.EntryType = 6;
                        _this._AttendanceReportService.AddEmployeeAttendanceOtherwork(global_1.Global.BASE_AttendanceReport_ENDPOINT, _this.Employee_Id, _this.EntryType, _this.HODRemarks, _this.Temp, _this.strDate, Time_5)
                            .subscribe(function (success) {
                            _this.indLoading = false;
                        }, function (error) {
                            _this.msg = error;
                        });
                    }
                }, function (error) {
                    _this.msg = error;
                });
            }
        }
    };
    AttendanceReportComponent.prototype.AttendanceRejectOther = function () {
        var _this = this;
        this.EntryType = 6;
        this.HODRemarks = $("#Remarksother").val();
        this._AttendanceReportService.AttendanceRejectOtherWork(global_1.Global.BASE_AttendanceReport_ENDPOINT, this.Employee_Id, this.OtherId, this.EntryType, this.AttendanceDate, this.HODRemarks)
            .subscribe(function (data) {
            _this.indLoading = false;
        }, function (error) {
            _this.msg = error;
        });
    };
    AttendanceReportComponent.prototype.ApproveAttendanceOkOtherWork = function () {
        var _this = this;
        var Remarks = $("#approvalRemarksother").val();
        this._AttendanceReportService.ApproveAttendanceOkOtherWorkIn(global_1.Global.BASE_AttendanceReport_ENDPOINT, this.OtherId, Remarks)
            .subscribe(function (data) {
            _this.indLoading = false;
        }, function (error) {
            _this.msg = error;
        });
    };
    //-------Change Event--------//
    AttendanceReportComponent.prototype.ChangeDepartData = function (event) {
        this.Id = event.target.value;
    };
    AttendanceReportComponent.prototype.ChangeEmpData = function (event) {
        this.Id = event.target.value;
        var empid = event.target.value;
    };
    AttendanceReportComponent.prototype.ChangeCompData = function (event) {
        this.Id = event.target.value;
    };
    AttendanceReportComponent.prototype.ChangeLMData = function (event) {
        this.Id = event.target.value;
    };
    //-------end drop-down----------//
    AttendanceReportComponent.prototype.LoadEmployee = function () {
        var _this = this;
        this.indLoading = true;
        this._AttendanceReportService.GetEmployee(global_1.Global.BASE_AttendanceReport_ENDPOINT)
            .subscribe(function (data) {
            _this.AttendanceEmployee = data;
            _this.indLoading = false;
        });
    };
    AttendanceReportComponent.prototype.LoadAllEmployee = function (event) {
        var _this = this;
        this.indLoading = true;
        this._AttendanceReportService.GetAllEmployee(global_1.Global.BASE_AttendanceReport_ENDPOINT)
            .subscribe(function (data) {
            _this.AttendanceEmployee = data;
            _this.indLoading = false;
        });
    };
    AttendanceReportComponent.prototype.LoadDepartment = function () {
        var _this = this;
        this.indLoading = true;
        this._AttendanceReportService.GetDepartment(global_1.Global.BASE_AttendanceReport_ENDPOINT)
            .subscribe(function (data) {
            _this.AttendanceDepart = data;
            _this.indLoading = false;
        });
    };
    AttendanceReportComponent.prototype.LoadCompany = function () {
        var _this = this;
        this.indLoading = true;
        this._AttendanceReportService.GetCompany(global_1.Global.BASE_AttendanceReport_ENDPOINT)
            .subscribe(function (data) {
            _this.AttendanceCompany = data;
            _this.indLoading = false;
        });
    };
    AttendanceReportComponent.prototype.LoadLineManager = function () {
        var _this = this;
        this.indLoading = true;
        this._AttendanceReportService.GetLineManager(global_1.Global.BASE_AttendanceReport_ENDPOINT)
            .subscribe(function (data) {
            _this.AttendanceLineManager = data;
            _this.indLoading = false;
        });
    };
    AttendanceReportComponent.prototype.LoadYear = function () {
        var _this = this;
        this.indLoading = true;
        this._AttendanceReportService.GetYear(global_1.Global.BASE_AttendanceReport_ENDPOINT)
            .subscribe(function (data) {
            _this.AttendanceYear = data;
            _this.indLoading = false;
        });
    };
    AttendanceReportComponent.prototype.RedirectToAddEmpRecord = function (data) {
        var d1 = data.Date.split('/');
        var datval = d1[1] + '/' + d1[0] + '/' + d1[2];
        this.router.navigate(['/AddEmployeeRecord'], { queryParams: { EmployeeId: data.Employee_Id, EmployeeName: data.Employee_Name, Date: datval, EntryTime: data.In_Time, Remarks: data.ImportRemarks } });
    };
    AttendanceReportComponent.prototype.RedirectToRecordPerEmp = function (data) {
        this.router.navigate(['/DailyEntryReport'], { queryParams: { EmployeeId: data.Employee_Id, EmployeeName: data.Employee_Name, Date: data.Date, EntryTime: data.In_Time, Remarks: data.ImportRemarks } });
    };
    AttendanceReportComponent.prototype.Getselectedmon = function (event) {
        this.Rdbmonth = $("#ddlmonth").val();
    };
    AttendanceReportComponent.prototype.Getselectedyear = function (event) {
        this.year = parseInt($("#ddlyear option:selected").text());
    };
    AttendanceReportComponent.prototype.ToogleMyProfile = function () {
        $("#AttendanceReport").slideToggle(300);
    };
    AttendanceReportComponent.prototype.CloseWidgetProfile = function () {
        $("#AttendanceReport").hide(300);
    };
    AttendanceReportComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.AttendancebindData);
        this.pager = this.pagerService.pager;
        this.pagedItems = null;
        this.pagedItems = this.pagerService.pagedItems;
    };
    AttendanceReportComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    AttendanceReportComponent.prototype.ColorChange = function (data) {
        if (data.Total_W_Hr < data.TotalWorksheet_Hr) {
            //if ((data.TotalWorksheet_Hr - data.Total_W_Hr) )
            //{
            //}
        }
    };
    AttendanceReportComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        if ($("#LineManager").prop("checked")) {
            this.DRPData = $("#ddllm").val();
            this.name = "LineManager";
        }
        if ($("#Employee").prop("checked")) {
            this.DRPData = $("#ddlemp").val();
            this.name = "Employee";
        }
        if ($("#Department").prop("checked")) {
            this.name = "DepartMent";
            this.DRPData = 0;
        }
        if ($("#Company").prop("checked")) {
            this.DRPData = $("#ddlcompany").val();
            this.name = "Company";
        }
        if ($("#rdbDate").prop("checked")) {
            this.strDate = $("#txtfromdate").val();
            this.ToDate = $("#txttodate").val();
            this.RDBDate = "checkedDate";
            this.month = 0;
            this.year = 0;
            this.Rdbmonth = "";
        }
        if ($("#rdbmonth").prop("checked")) {
            this.Rdbmonth = "Month";
            this.RDBDate = "";
            this.month = parseInt($("#ddlmonth").val());
            this.year = parseInt($("#ddlyear option:selected").text());
            this.strDate = "";
            this.ToDate = "";
        }
        var fromdate;
        var todate;
        if (this.RDBDate == 'checkedDate') {
            fromdate = this.strDate;
            todate = this.ToDate;
        }
        if (this.Rdbmonth == 'Month') {
            if (this.month.toString().length == 1) {
                fromdate = (this.year).toString().concat('0').toString().concat(this.month.toString()).concat('01').toString();
                todate = (this.year).toString().concat('0').toString().concat(this.month.toString()).concat('30').toString();
            }
            else {
                fromdate = (this.year).toString().concat(this.month.toString()).concat('01').toString();
                todate = (this.year).toString().concat(this.month.toString()).concat('30').toString();
            }
        }
        if (formData.cbMissingEntry == true) {
            var strEmployeeids = '';
            if (this.name == "DepartMent") {
                this._AttendanceReportService.SelectDepartment(global_1.Global.BASE_AttendanceReport_ENDPOINT, formData.ddldept)
                    .subscribe(function (data) {
                    _this.indLoading = false;
                    if (data != '') {
                        for (var i = 0; i < data.length; i++) {
                            strEmployeeids += data[i].id + ',';
                        }
                        strEmployeeids = strEmployeeids.substring(0, strEmployeeids.length - 1);
                        _this._AttendanceReportService.GetMissingEntry(global_1.Global.BASE_AttendanceReport_ENDPOINT, fromdate, todate, strEmployeeids)
                            .subscribe(function (data) {
                            _this.indLoading = false;
                            _this.AttendancebindData = data;
                        }, function (error) {
                            _this.msg = error;
                        });
                    }
                }, function (error) {
                    _this.msg = error;
                });
            }
            else if (this.name == "Company") {
                this._AttendanceReportService.SelectCompany(global_1.Global.BASE_AttendanceReport_ENDPOINT, formData.ddlcompany)
                    .subscribe(function (data) {
                    _this.indLoading = false;
                    if (data != '') {
                        for (var i = 0; i < data.length; i++) {
                            strEmployeeids += data[i].id + ',';
                        }
                        strEmployeeids = strEmployeeids.substring(0, strEmployeeids.length - 1);
                        _this._AttendanceReportService.GetMissingEntry(global_1.Global.BASE_AttendanceReport_ENDPOINT, fromdate, todate, strEmployeeids)
                            .subscribe(function (data) {
                            _this.indLoading = false;
                            _this.AttendancebindData = data;
                        }, function (error) {
                            _this.msg = error;
                        });
                    }
                }, function (error) {
                    _this.msg = error;
                });
            }
            else if (this.name == "LineManager") {
                this._AttendanceReportService.SelectLineManager(global_1.Global.BASE_AttendanceReport_ENDPOINT, formData.ddllm)
                    .subscribe(function (data) {
                    _this.indLoading = false;
                    if (data != '') {
                        for (var i = 0; i < data.length; i++) {
                            strEmployeeids += data[i].id + ',';
                        }
                        strEmployeeids = strEmployeeids.substring(0, strEmployeeids.length - 1);
                        _this._AttendanceReportService.GetMissingEntry(global_1.Global.BASE_AttendanceReport_ENDPOINT, fromdate, todate, strEmployeeids)
                            .subscribe(function (data) {
                            _this.indLoading = false;
                            _this.AttendancebindData = data;
                        }, function (error) {
                            _this.msg = error;
                        });
                    }
                }, function (error) {
                    _this.msg = error;
                });
            }
        }
        else if (formData.cbDeduction == true) {
            var strEmployeeids = '';
            if (this.name == "DepartMent") {
                this._AttendanceReportService.SelectDepartment(global_1.Global.BASE_AttendanceReport_ENDPOINT, formData.ddldept)
                    .subscribe(function (data) {
                    _this.indLoading = false;
                    if (data != '') {
                        for (var i = 0; i < data.length; i++) {
                            strEmployeeids += data[i].id + ',';
                        }
                        strEmployeeids = strEmployeeids.substring(0, strEmployeeids.length - 1);
                        _this._AttendanceReportService.GetDeductionDetails(global_1.Global.BASE_AttendanceReport_ENDPOINT, fromdate, todate, strEmployeeids)
                            .subscribe(function (data) {
                            _this.indLoading = false;
                            _this.AttendancebindData = data;
                        }, function (error) {
                            _this.msg = error;
                        });
                    }
                });
            }
            else if (this.name == "Company") {
                this._AttendanceReportService.SelectCompany(global_1.Global.BASE_AttendanceReport_ENDPOINT, formData.ddlcompany)
                    .subscribe(function (data) {
                    _this.indLoading = false;
                    if (data != '') {
                        for (var i = 0; i < data.length; i++) {
                            strEmployeeids += data[i].id + ',';
                        }
                        strEmployeeids = strEmployeeids.substring(0, strEmployeeids.length - 1);
                        _this._AttendanceReportService.GetDeductionDetails(global_1.Global.BASE_AttendanceReport_ENDPOINT, fromdate, todate, strEmployeeids)
                            .subscribe(function (data) {
                            _this.indLoading = false;
                            _this.AttendancebindData = data;
                        }, function (error) {
                            _this.msg = error;
                        });
                    }
                }, function (error) {
                    _this.msg = error;
                });
            }
            else if (this.name == "LineManager") {
                this._AttendanceReportService.SelectLineManager(global_1.Global.BASE_AttendanceReport_ENDPOINT, formData.ddllm)
                    .subscribe(function (data) {
                    _this.indLoading = false;
                    if (data != '') {
                        for (var i = 0; i < data.length; i++) {
                            strEmployeeids += data[i].id + ',';
                        }
                        strEmployeeids = strEmployeeids.substring(0, strEmployeeids.length - 1);
                        _this._AttendanceReportService.GetDeductionDetails(global_1.Global.BASE_AttendanceReport_ENDPOINT, fromdate, todate, strEmployeeids)
                            .subscribe(function (data) {
                            _this.indLoading = false;
                            _this.AttendancebindData = data;
                        }, function (error) {
                            _this.msg = error;
                        });
                    }
                }, function (error) {
                    _this.msg = error;
                });
            }
        }
        else {
            this._AttendanceReportService.GetBindAttendanceData(global_1.Global.BASE_AttendanceReport_ENDPOINT, this.Id, this.strDate, this.ToDate, this.name, this.DRPData, this.RDBDate, this.Rdbmonth, this.month, this.year)
                .subscribe(function (success) {
                _this.AttendancebindData = success;
                _this.JumpOnPage(1);
            }, function (error) {
                _this.msg = error;
            });
        }
    };
    __decorate([
        core_1.ViewChild('modal'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], AttendanceReportComponent.prototype, "modal", void 0);
    __decorate([
        core_1.ViewChild('modalAttendanceApprovalPunchIn'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], AttendanceReportComponent.prototype, "modalAttendanceApprovalPunchIn", void 0);
    __decorate([
        core_1.ViewChild('modalAttendanceApprovalPunchOut'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], AttendanceReportComponent.prototype, "modalAttendanceApprovalPunchOut", void 0);
    __decorate([
        core_1.ViewChild('modalAttendanceApprovalLunchOut'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], AttendanceReportComponent.prototype, "modalAttendanceApprovalLunchOut", void 0);
    __decorate([
        core_1.ViewChild('modalAttendanceApprovalLunchIn'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], AttendanceReportComponent.prototype, "modalAttendanceApprovalLunchIn", void 0);
    __decorate([
        core_1.ViewChild('modalAttendanceApprovalWorkIn'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], AttendanceReportComponent.prototype, "modalAttendanceApprovalWorkIn", void 0);
    AttendanceReportComponent = __decorate([
        core_1.Component({
            providers: [AttendanceReport_Service_1.AttendanceReportService],
            templateUrl: 'app/Components/Report/Attendance/AttendanceReport.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, AttendanceReport_Service_1.AttendanceReportService, http_1.Http, router_1.Router, pager_index_1.PagerService])
    ], AttendanceReportComponent);
    return AttendanceReportComponent;
}());
exports.AttendanceReportComponent = AttendanceReportComponent;
