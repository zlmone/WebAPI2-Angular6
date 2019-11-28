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
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../../Shared/global");
var pager_index_1 = require("../../../Shared/pager.index");
var router_1 = require("@angular/router");
var AddEmployeeRecord_service_1 = require("../../../Service/Report/Attendance/AddEmployeeRecord.service");
var AddEmployeeRecordcomponent = (function () {
    function AddEmployeeRecordcomponent(fb, _AddEmployeeRecordService, router, pagerService, route) {
        this.fb = fb;
        this._AddEmployeeRecordService = _AddEmployeeRecordService;
        this.router = router;
        this.pagerService = pagerService;
        this.route = route;
        this.indLoading = false;
        this.CurrentRecordsPerPage = 10;
        this.pager = {};
    }
    AddEmployeeRecordcomponent.prototype.ngOnInit = function () {
        this.FillEmployee();
        this.EmpId = this.route.snapshot.queryParams["EmployeeId"];
        this.Date = this.route.snapshot.queryParams["Date"];
        if (this.EmpId != 0 && this.Date != null) {
            $("#Id").prop("disabled", true);
            $("#txtDate").prop("disabled", true);
        }
        this.BindEmployeeDetails();
        this.BindEmployeeAttendance();
        this.BindHRAttendanceDetails();
    };
    AddEmployeeRecordcomponent.prototype.FillEmployee = function () {
        var _this = this;
        this._AddEmployeeRecordService.FillEmployee(global_1.Global.BASE_AddEmployeeRecord_ENDPOINT)
            .subscribe(function (data) {
            _this.indLoading = false;
            _this.Employees = data;
        }, function (error) {
            _this.msg = error;
        });
    };
    AddEmployeeRecordcomponent.prototype.BindEmployeeDetails = function () {
        var _this = this;
        this._AddEmployeeRecordService.BindEmployeeDetails(global_1.Global.BASE_AddEmployeeRecord_ENDPOINT, this.EmpId, this.Date, 21)
            .subscribe(function (data) {
            _this.indLoading = false;
            _this.EmployeeDailyEntrySheet = data;
            _this.JumpOnPage(1);
        }, function (error) {
            _this.msg = error;
        });
    };
    AddEmployeeRecordcomponent.prototype.BindEmployeeAttendance = function () {
        var _this = this;
        this._AddEmployeeRecordService.BindEmployeeAttendance(global_1.Global.BASE_AddEmployeeRecord_ENDPOINT, this.EmpId, this.Date)
            .subscribe(function (data) {
            _this.indLoading = false;
            _this.EmployeeAttendance = data;
        }, function (error) {
            _this.msg = error;
        });
    };
    AddEmployeeRecordcomponent.prototype.BindHRAttendanceDetails = function () {
        var _this = this;
        this._AddEmployeeRecordService.BindHRAttendanceDetails(global_1.Global.BASE_AddEmployeeRecord_ENDPOINT, this.EmpId, this.Date)
            .subscribe(function (data) {
            _this.indLoading = false;
            if (data != '') {
                _this.HRAttendance = data;
                _this.HRAttendance.forEach(function (data) {
                    _this.Grade = data.Grade;
                    _this.Grace = data.Grace;
                    _this.InTime = data.HRInTime;
                    _this.OutTime = data.HROutTime;
                    if (_this.Grade == "A1" || _this.Grade == "A2") {
                        _this.Mode = "Flexible";
                    }
                    else {
                        _this.Mode = "Non-Flexible";
                    }
                });
            }
        }, function (error) {
            _this.msg = error;
        });
    };
    AddEmployeeRecordcomponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.EmployeeDailyEntrySheet);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    AddEmployeeRecordcomponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    AddEmployeeRecordcomponent.prototype.ClearFields = function () {
        $("#ddltype").empty();
        $("#txtHr").val('');
        $("#txtMinute").val('');
        $("#Remarks").val('Chirendu Gupta' + ':'); // Session Storage Login User Name
        $("#grace").val('');
    };
    AddEmployeeRecordcomponent.prototype.EditReport = function (EmployeeEntrySheet) {
        this.EmployeeEntrySheet = EmployeeEntrySheet;
        var HH = this.EmployeeEntrySheet.Entry_Time;
        var MM = this.EmployeeEntrySheet.Entry_Time;
        var AMPM = this.EmployeeEntrySheet.Entry_Time;
        if (this.EmployeeEntrySheet.Entry_Type == "In Time") {
            this.EntryType = 1;
        }
        else if (this.EmployeeEntrySheet.Entry_Type == "Out Time") {
            this.EntryType = 2;
        }
        else if (this.EmployeeEntrySheet.Entry_Type == "Lunch Out Time") {
            this.EntryType = 3;
        }
        else if (this.EmployeeEntrySheet.Entry_Type == "Lunch In Time") {
            this.EntryType = 4;
        }
        else if (this.EmployeeEntrySheet.Entry_Type == "Other Out Time") {
            this.EntryType = 5;
        }
        else if (this.EmployeeEntrySheet.Entry_Type == "Other In Time") {
            this.EntryType = 6;
        }
        else if (this.EmployeeEntrySheet.Entry_Type == "Meeting Out Time") {
            this.EntryType = 7;
        }
        else if (this.EmployeeEntrySheet.Entry_Type == "Meeting In Time") {
            this.EntryType = 8;
        }
        else if (this.EmployeeEntrySheet.Entry_Type == "Official Work Out Time (Approved)") {
            this.EntryType = 9;
        }
        else if (this.EmployeeEntrySheet.Entry_Type == "Official Work In Time (Approved)") {
            this.EntryType = 10;
        }
        if (HH.length <= 10) {
            HH.split(':');
            this.HR = HH[0];
        }
        else {
            HH.split(':');
            this.HR = HH[0] + HH[1];
        }
        if (MM.length <= 10) {
            MM.split(':');
            this.MIN = MM[2] + MM[3];
        }
        else {
            MM.split(':');
            this.MIN = MM[3] + MM[4];
        }
        if (AMPM.length <= 10) {
            AMPM.split(" ");
            this.AMPM_Data = AMPM[8] + AMPM[9];
        }
        else {
            AMPM.split(" ");
            this.AMPM_Data = AMPM[9] + AMPM[10];
        }
    };
    AddEmployeeRecordcomponent.prototype.ReBindAllDetails = function () {
        this.BindEmployeeDetails();
        this.ClearFields();
        this.BindEmployeeAttendance();
        this.TransactionId = null;
    };
    AddEmployeeRecordcomponent.prototype.onSubmit = function (formData) {
        var _this = this;
        if (formData.EmployeeId > 0) {
            if (formData.EntryType > 0) {
                var Hr = $("#txtHr").val();
                var Minute = $("#txtMinute").val();
                var Remarks_1 = $("#Remarks").val();
                var Grace_1 = $("#grace").val();
                if ((parseInt($("#txtHr").val()) < 13) && (parseInt($("#txtMinute").val())) < 60) {
                    this._AddEmployeeRecordService.BindEmployeeDetails(global_1.Global.BASE_AddEmployeeRecord_ENDPOINT, formData.EmployeeId, formData.Date, 21)
                        .subscribe(function (data) {
                        _this.indLoading = false;
                        var StrEntryType;
                        if (formData.EntryType == 1) {
                            StrEntryType = "In Time";
                        }
                        else if (formData.EntryType == 2) {
                            StrEntryType = "Out Time";
                        }
                        else if (formData.EntryType == 3) {
                            StrEntryType = "Lunch Out Time";
                        }
                        else if (formData.EntryType == 4) {
                            StrEntryType = "Lunch In Time";
                        }
                        _this.EmployeeDailyEntrySheet = data;
                        var first;
                        var firstdata;
                        var EntryType;
                        _this.EmployeeDailyEntrySheet.forEach(function (data) {
                            first = function (element) { return !!element; };
                            firstdata = _this.EmployeeDailyEntrySheet.find(first);
                            EntryType = firstdata.Entry_Type;
                            StrEntryType == EntryType;
                        });
                        var IsExist = false;
                        if (StrEntryType == EntryType) {
                            first = function (element) { return !!element; };
                            firstdata = _this.EmployeeDailyEntrySheet.find(first);
                        }
                        else {
                            IsExist = true;
                        }
                        if (IsExist) {
                            _this._AddEmployeeRecordService.GetAttendanceTransaction(global_1.Global.BASE_AddEmployeeRecord_ENDPOINT, formData.EmployeeId, formData.Date, formData.EntryType)
                                .subscribe(function (success) {
                                _this.indLoading = false;
                                _this.Attendance = success;
                                var date = $("#txtEntryDate").val();
                                var strDate = date.toString().split('-');
                                var stDate = strDate[0] + strDate[1] + strDate[2];
                                _this.EntryTime = stDate + " " + $("#txtHr").val() + ":" + $("#txtMinute").val() + ":00" + " ";
                                var strActualEntry = "";
                                if (success != '') {
                                    var id_1;
                                    var actualEntryTime_1;
                                    _this.Attendance.forEach(function (success) {
                                        id_1 = _this.TransactionId != null ? _this.TransactionId : parseInt(success.Id.toString());
                                        actualEntryTime_1 = success.actualEntryTime;
                                    });
                                    if (formData.EntryType < 3) {
                                        var ActualHr = actualEntryTime_1.trim().toString();
                                        ActualHr.split(':');
                                        var A_HR = ActualHr[0] + ActualHr[1];
                                        var A_MIN = ActualHr[3] + ActualHr[4];
                                        if (_this.AMPM_Data == "PM") {
                                            if (A_HR <= 12) {
                                            }
                                            else {
                                                A_HR += 12;
                                            }
                                            strActualEntry = A_HR.toString();
                                        }
                                        else {
                                            strActualEntry = A_HR;
                                        }
                                        strActualEntry = strActualEntry + ":" + A_MIN;
                                    }
                                    _this._AddEmployeeRecordService.GetUpdateEmployeeAttendance(global_1.Global.BASE_AddEmployeeRecord_ENDPOINT, id_1, formData.EmployeeId, formData.EntryType, Remarks_1, _this.EntryTime, formData.Date, Grace_1, 21, strActualEntry)
                                        .subscribe(function (AddEmployee) {
                                        _this.indLoading = false;
                                        _this.ReBindAllDetails();
                                        alert("Record Updated");
                                    }, function (error) {
                                        _this.msg = error;
                                    });
                                }
                                else if (_this.TransactionId != null) {
                                    var id_2;
                                    var actualEntryTime_2;
                                    _this.Attendance.forEach(function (success) {
                                        id_2 = _this.TransactionId != null ? _this.TransactionId : parseInt(success.Id.toString());
                                        actualEntryTime_2 = success.actualEntryTime;
                                    });
                                    if (formData.EntryType < 3) {
                                        if (_this.AMPM_Data == "PM") {
                                            var ActualHr = actualEntryTime_2.trim().toString();
                                            ActualHr.split(':');
                                            var A_HR = ActualHr[0] + ActualHr[1];
                                            var A_MIN = ActualHr[3] + ActualHr[4];
                                            if (A_HR <= 12) {
                                            }
                                            else {
                                                A_HR += 12;
                                            }
                                            strActualEntry = A_HR.toString();
                                        }
                                        else {
                                            strActualEntry = A_HR;
                                        }
                                        strActualEntry = strActualEntry + ":" + A_MIN;
                                    }
                                    _this._AddEmployeeRecordService.GetUpdateEmployeeAttendance(global_1.Global.BASE_AddEmployeeRecord_ENDPOINT, id_2, formData.EmployeeId, formData.EntryType, Remarks_1, _this.EntryTime, formData.Date, Grace_1, 21, strActualEntry)
                                        .subscribe(function (AddEmployee) {
                                        _this.indLoading = false;
                                        _this.ReBindAllDetails();
                                        alert("Record Updated");
                                    }, function (error) {
                                        _this.msg = error;
                                    });
                                }
                                else {
                                    _this._AddEmployeeRecordService.BindHRAttendanceDetails(global_1.Global.BASE_AddEmployeeRecord_ENDPOINT, formData.EmployeeId, formData.Date)
                                        .subscribe(function (HRAttendance) {
                                        _this.indLoading = false;
                                        _this.HRAttendance = HRAttendance;
                                        var Time = "";
                                        if (formData.EntryType == 1) {
                                            _this.HRAttendance.forEach(function (HRAttendance) {
                                                Time = HRAttendance.HRInTime.toString();
                                            });
                                        }
                                        else if (formData.EntryType == 2) {
                                            _this.HRAttendance.forEach(function (HRAttendance) {
                                                Time = HRAttendance.HROutTime.toString();
                                            });
                                        }
                                        else {
                                            Time = "";
                                        }
                                        _this._AddEmployeeRecordService.AddEmployee(global_1.Global.BASE_AddEmployeeRecord_ENDPOINT, formData.EmployeeId, formData.EntryType, Remarks_1, _this.EntryTime, formData.Date, Time, Grace_1)
                                            .subscribe(function (Add) {
                                            _this.indLoading = false;
                                            _this.ReBindAllDetails();
                                            alert("Record Saved");
                                        }, function (error) {
                                            _this.msg = error;
                                        });
                                    }, function (error) {
                                        _this.msg = error;
                                    });
                                }
                            }, function (error) {
                                _this.msg = error;
                            });
                        }
                        else {
                            _this.ReBindAllDetails();
                            alert("Record Exist");
                        }
                    }, function (error) {
                        _this.msg = error;
                    });
                }
                else {
                    alert("Invalid Time Information !");
                }
            }
            else {
                alert("Select Type !");
            }
        }
        else {
            alert("Select Employee !");
        }
    };
    AddEmployeeRecordcomponent = __decorate([
        core_1.Component({
            providers: [AddEmployeeRecord_service_1.AddEmployeeRecordService],
            templateUrl: 'app/Components/Report/Attendance/AddEmployeeRecord.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, AddEmployeeRecord_service_1.AddEmployeeRecordService, router_1.Router, pager_index_1.PagerService, router_1.ActivatedRoute])
    ], AddEmployeeRecordcomponent);
    return AddEmployeeRecordcomponent;
}());
exports.AddEmployeeRecordcomponent = AddEmployeeRecordcomponent;
