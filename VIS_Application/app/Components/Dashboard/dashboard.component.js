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
var dashboard_service_1 = require("../../Service/Dashboard/dashboard.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../Shared/global");
var pager_index_1 = require("../../Shared/pager.index");
var CommonHelper_service_1 = require("../../Shared/CommonHelper.service");
var DashboardComponent = (function () {
    function DashboardComponent(fb, _DashboardService, pagerService, _CommonHelperService) {
        this.fb = fb;
        this._DashboardService = _DashboardService;
        this.pagerService = pagerService;
        this._CommonHelperService = _CommonHelperService;
        this.indLoading = false;
        // pager object
        this.pager = {};
        this.CurrentRecordsPerPage = 10;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.dashboard = ({
            UserProfileData: {
                EmployeeName: '',
                LineManagerName: '',
                FirstName: '',
                MiddleName: '',
                LastName: '',
                Gender: '',
                PhotographFileName: '',
                CompanyName: '',
                EmailID: '',
                Designation: '',
                DepartmentName: '',
                FatherName: '',
                PermenantAddress: '',
                CommunicationAddress: '',
                LandlineNumber: '',
                MobileNumber: '',
                MotherName: '',
                BirthDate: '',
                BloodGroup: '',
                MaritalStatus: '',
                EmplopyeeGrade: ''
            },
            UserSkillData: [
                {
                    Level_Text: '',
                    SkillName: ''
                },
            ],
            MyAttendanceData: [
                {
                    Date: null,
                    InTime: null,
                    OutTime: null,
                    Status: '',
                    TotalWorksheetHours: null
                },
            ],
            UserAllocationData: [
                {
                    FromDate: '',
                    ToDate: '',
                    AllocatedHr: 0,
                    TotalHr: 0,
                    ProjectName: ''
                },
            ],
            UserAlertData: [
                {
                    Name: '',
                    Status: '',
                    Type: ''
                },
            ],
            UserTeamData: [
                {
                    EmployeeId: 0,
                    ProjectId: 0,
                    ProjectName: '',
                    EmployeeName: ''
                },
            ],
            WorksheetLeaveDeta: {
                ID: 0,
                EmployeeID: 0,
                ToDate: null,
                FromDate: null,
                Reason: '',
                ContactDetail: '',
                AppliedTo: 0,
                LeaveType: 0,
                Status: 0,
                GHID: 0,
                EnteredDate: null,
                ResponsiblePersonID: 0,
                Remarks: '',
                IsFullDay: false,
                IsFirstHalf: false,
                IsSecondHalf: false,
                CreatedDate: null,
                contact: '',
                CallOnDate: null,
                CallOnTime: '',
                EmergencyLeave: false,
                LongleaveEntry: false
            },
            WorksheetNwdHistoryData: [
                {
                    id: 0,
                    employeeId: 0,
                    date: null,
                    leaveType: '',
                    nwdId: 0
                },
            ],
            WorksheetCalTotalAttendanceData: {
                EmployeeID: 0,
                EmployeeName: '',
                Date: '',
                InTimeID: 0,
                InTime: null,
                OutTimeID: 0,
                OutTime: null,
                LunchOutTimeID: 0,
                LunchOutTime: null,
                LunchInTimeID: 0,
                LunchInTime: null,
                OtherTimeID: 0,
                TotalOtherTime: '',
                TotalOfficeTime: '',
                TotalLunchTime: '',
                TotalBreakTime: '',
                TotalWorkingTime: '',
                TotalWorksheetHour: 0,
                IsInOffice: false,
                IsInBreak: false,
                IsInLunch: false,
                IsInMeeting: false,
                IsInOfficeWork: false,
                Days: '',
                ImportRemarks: '',
                EmployeeCode: '',
                MMDDYYYY_DateFormate: ''
            },
            WorksheetGetActualEntryTimeAndGraceData: {
                actualEntryTime: '',
                grace: 0
            },
            WorksheetGetEmpLeaveLedgerData: [
                {
                    leaveDuration: '',
                    leaveType: '',
                    approveType: '',
                    shortLeaveType: ''
                },
            ],
            WorksheetGetLeaveDetailsByDateData: [
                {
                    ID: 0,
                    LeaveType: '',
                    LeaveStatus: '',
                    EmployeeId: 0,
                    FromDate: null,
                    ToDate: null,
                    CalendarDays: null,
                    IsFullDay: false,
                    IsFirstHalf: false,
                    IsSecondhalf: false
                },
            ],
            WorksheetGetEmpHolidayListData: [
                {
                    id: 0,
                    holidayName: '',
                    fromDate: null,
                    toDate: null,
                    remarks: '',
                    active: false,
                    noOfDays: 0
                },
            ],
            WorksheetGetHolidayForDateData: [
                {
                    id: 0,
                    holidayName: '',
                    fromDate: null,
                    toDate: null,
                    remarks: '',
                    active: false,
                    noOfDays: 0
                },
            ],
            ProfileGetLevelsListData: [
                {
                    levelnumber: 0,
                    Name: '',
                    Icon: '',
                    startpoint: 0,
                    endpoint: 0
                },
            ],
            ProfileGetPointsLegendData: [
                {
                    Criteria: '',
                    CalculatedOn: '',
                    From: 0,
                    To: 0,
                    Points: 0
                },
            ],
            ProfileGetPointsDeta: [
                {
                    EventName: '',
                    Type: false,
                    CalculatedOn: '',
                    PointsGained: 0,
                    Date: ''
                },
            ],
        });
        this.LoadDashboards();
        this.GetAttendanceDetail();
    };
    DashboardComponent.prototype.LoadDashboards = function () {
        var _this = this;
        this.indLoading = true;
        this._DashboardService.get(global_1.Global.BASE_DASHBOARD_ENDPOINT + 'GetDashboardDataSets?UserId=158&IsApproved=true&FromDate=2014-01-01&ToDate=2017-09-06&IsLineManager=true&date=2014-01-01&PunchInId=158&IsAdmin=true')
            .subscribe(function (dashboarddata) {
            debugger;
            _this.dashboard = dashboarddata;
        });
        this.indLoading = false;
    };
    DashboardComponent.prototype.GetAttendanceDetail = function () {
        var _this = this;
        this.indLoading = true;
        this._DashboardService.get(global_1.Global.BASE_DASHBOARD_ENDPOINT + 'GetMyAttendance?Id=158&&Date=01/01/2015')
            .subscribe(function (attendancedata) {
            _this.attendancedata = attendancedata;
        });
        this.indLoading = false;
    };
    DashboardComponent.prototype.ProgressiveData = function () {
        this.modal.open();
        //this.dbops = DBOperation.create;
        //this.SetControlsState(true);
        this.modalTitle = "Progressive Point Details";
        //this.modalBtnTitle = "Add";
        //this.ContactMasterFrm.reset();
    };
    DashboardComponent.prototype.AchievementsData = function () {
        this.modalAchievements.open();
        this.modalTitle = "Achievements Details";
    };
    DashboardComponent.prototype.PointsData = function () {
        this.modalPoints.open();
        this.modalTitle = "Points Details";
    };
    DashboardComponent.prototype.LegendData = function () {
        this.modalLegend.open();
        this.modalTitle = "Points Details";
    };
    DashboardComponent.prototype.LevelsData = function () {
        this.modalLevels.open();
        this.modalTitle = "Employee Levels Details";
    };
    DashboardComponent.prototype.onSubmit = function (formData) {
        this.msg = "";
    };
    DashboardComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    DashboardComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.dashboards);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    // Function For Close Widget
    DashboardComponent.prototype.CloseWidgetProfile = function () {
        $("#adminProfile").hide(1000);
    };
    DashboardComponent.prototype.CloseWidgetWorkSheet = function () {
        $("#worksheetwidget").hide(1000);
    };
    DashboardComponent.prototype.CloseWidgetAttendance = function () {
        $("#MyAttendance").hide(1000);
    };
    DashboardComponent.prototype.CloseWidgetLeave = function () {
        $("#MyLeave").hide(1000);
    };
    DashboardComponent.prototype.CloseWidgetAllocation = function () {
        $("#MyAllocation").hide(1000);
    };
    DashboardComponent.prototype.CloseWidgetTeam = function () {
        $("#MyTeam").hide(1000);
    };
    DashboardComponent.prototype.CloseWidgetAlert = function () {
        $("#MyAlert").hide(1000);
    };
    DashboardComponent.prototype.CloseWidgetSkill = function () {
        $("#MySkill").hide(1000);
    };
    // Function For Collapse & Expand Widget
    DashboardComponent.prototype.ToogleMyProfile = function () {
        $("#myprofiledata").slideToggle(1000);
    };
    DashboardComponent.prototype.ToogleWorkSheet = function () {
        $("#myworksheetdata").slideToggle(1000);
    };
    DashboardComponent.prototype.ToogleAttendance = function () {
        $("#myattendancedata").slideToggle(1000);
    };
    DashboardComponent.prototype.ToogleLeave = function () {
        $("#myleavedata").slideToggle(1000);
    };
    DashboardComponent.prototype.ToogleAllocation = function () {
        $("#myallocationdata").slideToggle(1000);
    };
    DashboardComponent.prototype.ToogleTeam = function () {
        $("#myteamdata").slideToggle(1000);
    };
    DashboardComponent.prototype.ToogleAlert = function () {
        $("#myalertdata").slideToggle(1000);
    };
    DashboardComponent.prototype.ToogleSkill = function () {
        $("#myskilldata").slideToggle(1000);
    };
    // Function For Full Screen & Actual Size Widget
    DashboardComponent.prototype.MyProfileFullScreen = function () {
        if ($("#adminProfile").hasClass("widgetfullscreen")) {
            $("#adminProfile").removeClass("widgetfullscreen");
            $("#myprofiledata").removeClass("widgetfullscreen");
            $("#worksheetwidget").show(1000);
            $("#MyAttendance").show(1000);
            $("#MyLeave").show(1000);
            $("#MyAllocation").show(1000);
            $("#MyTeam").show(1000);
            $("#MyAlert").show(1000);
            $("#MySkill").show(1000);
        }
        else {
            $("#adminProfile").addClass("widgetfullscreen");
            $("#myprofiledata").addClass("widgetfullscreen");
            $("#worksheetwidget").hide(1000);
            $("#MyAttendance").hide(1000);
            $("#MyLeave").hide(1000);
            $("#MyAllocation").hide(1000);
            $("#MyTeam").hide(1000);
            $("#MyAlert").hide(1000);
            $("#MySkill").hide(1000);
        }
    };
    DashboardComponent.prototype.WorkSheetFullScreen = function () {
        if ($("#worksheetwidget").hasClass("widgetfullscreen")) {
            $("#worksheetwidget").removeClass("widgetfullscreen");
            $("#myworksheetdata").removeClass("widgetfullscreen");
            $("#adminProfile").show(1000);
            $("#MyAttendance").show(1000);
            $("#MyLeave").show(1000);
            $("#MyAllocation").show(1000);
            $("#MyTeam").show(1000);
            $("#MyAlert").show(1000);
            $("#MySkill").show(1000);
        }
        else {
            $("#worksheetwidget").addClass("widgetfullscreen");
            $("#myworksheetdata").addClass("widgetfullscreen");
            $("#adminProfile").hide(1000);
            $("#MyAttendance").hide(1000);
            $("#MyLeave").hide(1000);
            $("#MyAllocation").hide(1000);
            $("#MyTeam").hide(1000);
            $("#MyAlert").hide(1000);
            $("#MySkill").hide(1000);
        }
    };
    DashboardComponent.prototype.AttendanceFullScreen = function () {
        if ($("#MyAttendance").hasClass("widgetfullscreen")) {
            $("#MyAttendance").removeClass("widgetfullscreen");
            $("#myattendancedata").removeClass("widgetfullscreen");
            $("#adminProfile").show(1000);
            $("#worksheetwidget").show(1000);
            $("#MyLeave").show(1000);
            $("#MyAllocation").show(1000);
            $("#MyTeam").show(1000);
            $("#MyAlert").show(1000);
            $("#MySkill").show(1000);
        }
        else {
            $("#MyAttendance").addClass("widgetfullscreen");
            $("#myattendancedata").addClass("widgetfullscreen");
            $("#adminProfile").hide(1000);
            $("#MyLeave").hide(1000);
            $("#MyAllocation").hide(1000);
            $("#MyTeam").hide(1000);
            $("#MyAlert").hide(1000);
            $("#MySkill").hide(1000);
            $("#worksheetwidget").hide(1000);
        }
    };
    DashboardComponent.prototype.MyLeaveFullScreen = function () {
        if ($("#MyLeave").hasClass("widgetfullscreen")) {
            $("#MyLeave").removeClass("widgetfullscreen");
            $("#myleavedata").removeClass("widgetfullscreen");
            $("#adminProfile").show(1000);
            $("#worksheetwidget").show(1000);
            $("#MyAttendance").show(1000);
            $("#MyAllocation").show(1000);
            $("#MyTeam").show(1000);
            $("#MyAlert").show(1000);
            $("#MySkill").show(1000);
        }
        else {
            $("#MyLeave").addClass("widgetfullscreen");
            $("#myleavedata").addClass("widgetfullscreen");
            $("#adminProfile").hide(1000);
            $("#MyAttendance").hide(1000);
            $("#MyAllocation").hide(1000);
            $("#MyTeam").hide(1000);
            $("#MyAlert").hide(1000);
            $("#MySkill").hide(1000);
            $("#worksheetwidget").hide(1000);
        }
    };
    DashboardComponent.prototype.MyAllocationFullScreen = function () {
        if ($("#MyAllocation").hasClass("widgetfullscreen")) {
            $("#MyAllocation").removeClass("widgetfullscreen");
            $("#myallocationdata").removeClass("widgetfullscreen");
            $("#adminProfile").show(1000);
            $("#worksheetwidget").show(1000);
            $("#MyAttendance").show(1000);
            $("#MyLeave").show(1000);
            $("#MyTeam").show(1000);
            $("#MyAlert").show(1000);
            $("#MySkill").show(1000);
        }
        else {
            $("#MyAllocation").addClass("widgetfullscreen");
            $("#myallocationdata").addClass("widgetfullscreen");
            $("#adminProfile").hide(1000);
            $("#MyAttendance").hide(1000);
            $("#MyTeam").hide(1000);
            $("#MyAlert").hide(1000);
            $("#MySkill").hide(1000);
            $("#worksheetwidget").hide(1000);
            $("#MyLeave").hide(1000);
        }
    };
    DashboardComponent.prototype.MyTeamFullScreen = function () {
        if ($("#MyTeam").hasClass("widgetfullscreen")) {
            $("#MyTeam").removeClass("widgetfullscreen");
            $("#myteamdata").removeClass("widgetfullscreen");
            $("#adminProfile").show(1000);
            $("#worksheetwidget").show(1000);
            $("#MyAttendance").show(1000);
            $("#MyLeave").show(1000);
            $("#MyAllocation").show(1000);
            $("#MyAlert").show(1000);
            $("#MySkill").show(1000);
        }
        else {
            $("#MyTeam").addClass("widgetfullscreen");
            $("#myteamdata").addClass("widgetfullscreen");
            $("#adminProfile").hide(1000);
            $("#MyAttendance").hide(1000);
            $("#MyAllocation").hide(1000);
            $("#MyAlert").hide(1000);
            $("#MySkill").hide(1000);
            $("#worksheetwidget").hide(1000);
            $("#MyLeave").hide(1000);
        }
    };
    DashboardComponent.prototype.MyAlertFullScreen = function () {
        if ($("#MyAlert").hasClass("widgetfullscreen")) {
            $("#MyAlert").removeClass("widgetfullscreen");
            $("#myalertdata").removeClass("widgetfullscreen");
            $("#adminProfile").show(1000);
            $("#worksheetwidget").show(1000);
            $("#MyAttendance").show(1000);
            $("#MyLeave").show(1000);
            $("#MyAllocation").show(1000);
            $("#MyTeam").show(1000);
            $("#MySkill").show(1000);
        }
        else {
            $("#MyAlert").addClass("widgetfullscreen");
            $("#myalertdata").addClass("widgetfullscreen");
            $("#adminProfile").hide(1000);
            $("#MyAttendance").hide(1000);
            $("#MyAllocation").hide(1000);
            $("#MyTeam").hide(1000);
            $("#MySkill").hide(1000);
            $("#worksheetwidget").hide(1000);
            $("#MyLeave").hide(1000);
        }
    };
    DashboardComponent.prototype.MySkillFullScreen = function () {
        if ($("#MySkill").hasClass("widgetfullscreen")) {
            $("#MySkill").removeClass("widgetfullscreen");
            $("#myskilldata").removeClass("widgetfullscreen");
            $("#adminProfile").show(1000);
            $("#worksheetwidget").show(1000);
            $("#MyAttendance").show(1000);
            $("#MyLeave").show(1000);
            $("#MyAllocation").show(1000);
            $("#MyTeam").show(1000);
            $("#MyAlert").show(1000);
        }
        else {
            $("#MySkill").addClass("widgetfullscreen");
            $("#myskilldata").addClass("widgetfullscreen");
            $("#adminProfile").hide(1000);
            $("#MyAttendance").hide(1000);
            $("#MyAllocation").hide(1000);
            $("#MyTeam").hide(1000);
            $("#MyAlert").hide(1000);
            $("#worksheetwidget").hide(1000);
            $("#MyLeave").hide(1000);
        }
    };
    __decorate([
        core_1.ViewChild('modal'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], DashboardComponent.prototype, "modal", void 0);
    __decorate([
        core_1.ViewChild('modalAchievements'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], DashboardComponent.prototype, "modalAchievements", void 0);
    __decorate([
        core_1.ViewChild('modalPoints'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], DashboardComponent.prototype, "modalPoints", void 0);
    __decorate([
        core_1.ViewChild('modalLegend'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], DashboardComponent.prototype, "modalLegend", void 0);
    __decorate([
        core_1.ViewChild('modalLevels'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], DashboardComponent.prototype, "modalLevels", void 0);
    DashboardComponent = __decorate([
        core_1.Component({
            providers: [dashboard_service_1.DashboardService],
            templateUrl: 'app/Components/Dashboard/dashboard.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, dashboard_service_1.DashboardService, pager_index_1.PagerService, CommonHelper_service_1.CommonHelperService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
