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
var global_1 = require("../../../app/Shared/global");
var pager_index_1 = require("../../../app/Shared/pager.index");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var AttendanceEntry_Service_1 = require("../../Service/UserManagement/AttendanceEntry.Service");
var AttendanceEntryComponent = (function () {
    function AttendanceEntryComponent(fb, _AttendanceEntryService, http, router, pagerService) {
        this.fb = fb;
        this._AttendanceEntryService = _AttendanceEntryService;
        this.http = http;
        this.router = router;
        this.pagerService = pagerService;
        this.indLoading = false;
    }
    AttendanceEntryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.modal.open();
        $("#rdbpunchout").prop("disabled", true);
        $("#rdbLunchout").prop("disabled", true);
        $("#rdbLunchin").prop("disabled", true);
        $("#rdbotherout").prop("disabled", true);
        $("#rdbotherin").prop("disabled", true);
        $("#rdbmeetingout").prop("disabled", true);
        $("#rdbmeetingin").prop("disabled", true);
        $("#rdbOffworkout").prop("disabled", true);
        $("#rdbOffworkin").prop("disabled", true);
        this.GetEmployeeName();
        this.CheckIsPunchOutOnNextDay();
        setInterval(function () {
            _this.Datetime = new Date();
        }, 1000);
        this.Datetime = new Date();
        var month = this.Datetime.getMonth() + 1;
        var year = this.Datetime.getFullYear();
        var date1 = this.Datetime.getDate();
        this.Date = +month + '/' + this.Datetime.getDate() + '/' + this.Datetime.getFullYear();
        this.forewhichdate = +month + '/' + this.Datetime.getDate() + '/' + this.Datetime.getFullYear();
        this.GetTimer();
        if (this.Entry_Type == 0) {
            this.DisableEntry_Type();
        }
        else {
            this.EnableEntry_Type();
        }
        this.AttendanceEntryFrm = this.fb.group({
            Employee_Id: [''],
            Entry_Type: [''],
            Remarks: [''],
            Entry_Time: [''],
            Date: [''],
            actualEntryTime: [''],
            grace: [''],
            macID: [''],
            forWhichDate: [''],
            ipAddress: [''],
            source: [''],
            isApproved: [''],
            groupId: [''],
            attendancePolicy: [''],
            Grade: [''],
            ImportRemarks: [''],
            Days: [''],
            forWhichEntryType: ['']
        });
        this.AttendanceEntryTimer = [{
                TotalOfficeTime: null,
                TotalPunchInHours: null,
                TotalBreakTime: null,
                TotalWorkingTime: null,
                PunchIn: 0,
                InBreak: 0
            }];
        this.AttendanceEmployeeName = ({
            Employee_Id: 0,
            Employee_Name: ''
        });
    };
    AttendanceEntryComponent.prototype.DisableEntry_Type = function () {
        var punchout = document.getElementById("rdbpunchout");
        var LunchOut = document.getElementById("rdbLunchout");
        var Lunchin = document.getElementById("rdbLunchin");
        var Otherchout = document.getElementById("rdbotherout");
        var OtherIn = document.getElementById("rdbotherin");
        var MeetingOut = document.getElementById("rdbmeetingout");
        var meetingIn = document.getElementById("rdbmeetingin");
        var Officialworkout = document.getElementById("rdbOffworkout");
        var Officialworkin = document.getElementById("rdbOffworkin");
        punchout.disabled = true;
        LunchOut.disabled = true;
        Lunchin.disabled = true;
        Otherchout.disabled = true;
        OtherIn.disabled = true;
        MeetingOut.disabled = true;
        meetingIn.disabled = true;
        Officialworkout.disabled = true;
        Officialworkin.disabled = true;
    };
    AttendanceEntryComponent.prototype.EnableEntry_Type = function () {
        var punchout = document.getElementById("rdbpunchout");
        var LunchOut = document.getElementById("rdbLunchout");
        var Lunchin = document.getElementById("rdbLunchin");
        var Otherchout = document.getElementById("rdbotherout");
        var OtherIn = document.getElementById("rdbotherin");
        var MeetingOut = document.getElementById("rdbmeetingout");
        var meetingIn = document.getElementById("rdbmeetingin");
        var Officialworkout = document.getElementById("rdbOffworkout");
        var Officialworkin = document.getElementById("rdbOffworkin");
        punchout.disabled = false;
        LunchOut.disabled = false;
        Lunchin.disabled = false;
        Otherchout.disabled = false;
        OtherIn.disabled = false;
        MeetingOut.disabled = false;
        meetingIn.disabled = false;
        Officialworkout.disabled = false;
        Officialworkin.disabled = false;
    };
    AttendanceEntryComponent.prototype.GetTimer = function () {
        var _this = this;
        this.indLoading = true;
        this._AttendanceEntryService.getTime(global_1.Global.BASE_AttendanceEntry_ENDPOINT, 21, this.Date)
            .subscribe(function (sucess) {
            _this.AttendanceEntryTimer = sucess;
            _this.AttendanceEntryTime = sucess;
            _this.indLoading = false;
            _this.AttendanceEntryTimer.forEach(function (sucess) {
                _this.PunchInHours = sucess.TotalPunchInHours;
                _this.WorkingTime = sucess.TotalWorkingTime;
                _this.BreakTime = sucess.TotalBreakTime;
                if (_this.PunchInHours == null) {
                    document.getElementById("lblPunchTime").innerHTML = "00:00:00";
                }
                else {
                    _this.PunchInHours;
                }
                if (_this.WorkingTime == null) {
                    document.getElementById("lblWorkTime").innerHTML = "00:00:00";
                }
                else {
                    _this.WorkingTime;
                }
                if (_this.BreakTime == null) {
                    document.getElementById("lblBreakTime").innerHTML = "00:00:00";
                }
                else {
                    _this.BreakTime;
                }
            });
        }, function (error) {
            alert("Error");
        });
    };
    AttendanceEntryComponent.prototype.CheckIsPunchOutOnNextDay = function () {
        var _this = this;
        this.indLoading = true;
        this._AttendanceEntryService.GetPunchOutNextDay(global_1.Global.BASE_AttendanceEntry_ENDPOINT, 199, '04/01/2016')
            .subscribe(function (data) {
            _this.AttendancePunchOutonNextDay = data;
            _this.indLoading = false;
        });
    };
    AttendanceEntryComponent.prototype.GetEmployeeName = function () {
        var _this = this;
        this.indLoading = true;
        this._AttendanceEntryService.GetEmployeeName(global_1.Global.BASE_AttendanceEntry_ENDPOINT, 21)
            .subscribe(function (success) {
            _this.AttendanceEmployee = success;
            console.log(_this.AttendanceEmployeeName);
        }, function (error) {
            alert("error");
        });
    };
    AttendanceEntryComponent.prototype.onsubmit = function (formData) {
        var _this = this;
        this.msg = "";
        this._AttendanceEntryService.post(global_1.Global.BASE_AttendanceEntry_ENDPOINT, formData)
            .subscribe(function (data) {
            if (data.startsWith("Success: ")) {
                _this.msg = data;
                _this.AttendanceEntrys = data;
            }
            else {
                alert(data);
            }
        }, function (error) {
            _this.msg = error;
        });
    };
    __decorate([
        core_1.ViewChild('modalAttendanceEntry'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], AttendanceEntryComponent.prototype, "modal", void 0);
    AttendanceEntryComponent = __decorate([
        core_1.Component({
            providers: [AttendanceEntry_Service_1.AttendanceEntryService],
            templateUrl: 'app/Components/UserManagement/AttendanceEntry.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, AttendanceEntry_Service_1.AttendanceEntryService, http_1.Http, router_1.Router, pager_index_1.PagerService])
    ], AttendanceEntryComponent);
    return AttendanceEntryComponent;
}());
exports.AttendanceEntryComponent = AttendanceEntryComponent;
