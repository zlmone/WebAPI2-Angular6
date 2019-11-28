import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../../Service/Dashboard/dashboard.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IDashboard } from '../../Model/Dashboard/dashboard';
import { ILegend } from '../../Model/Dashboard/Legend';
import { DBOperation } from '../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../Shared/global';
import { PagerService } from '../../Shared/pager.index';
import { IMyAttendance } from '../../Model/Dashboard/MyAttendance';
import { DatePipe } from '@angular/common';
import { CommonHelperService } from '../../Shared/CommonHelper.service';
@Component({
    providers: [DashboardService],
    templateUrl: 'app/Components/Dashboard/dashboard.component.html'
})

export class DashboardComponent implements OnInit
{
    @ViewChild('modal') modal: ModalComponent;
    @ViewChild('modalAchievements') modalAchievements: ModalComponent;
    @ViewChild('modalPoints') modalPoints: ModalComponent;
    @ViewChild('modalLegend') modalLegend: ModalComponent;
    @ViewChild('modalLevels') modalLevels: ModalComponent;
    dashboard: IDashboard;
    dashboards: ILegend[];
    msg: string;
    indLoading: boolean = false;
    dashboardFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    direction: number;
    // pager object
    pager: any = {};
    CurrentRecordsPerPage: number = 10;
    PagerInformation: string;
    // paged items
    pagedItems: any[];
    attendancedata: IMyAttendance[];

    constructor(private fb: FormBuilder, private _DashboardService: DashboardService, private pagerService: PagerService, private _CommonHelperService: CommonHelperService ) {

    }

    ngOnInit(): void
    {
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
    }

    LoadDashboards(): void {

        this.indLoading = true;
        this._DashboardService.get(Global.BASE_DASHBOARD_ENDPOINT + 'GetDashboardDataSets?UserId=158&IsApproved=true&FromDate=2014-01-01&ToDate=2017-09-06&IsLineManager=true&date=2014-01-01&PunchInId=158&IsAdmin=true')
            .subscribe(dashboarddata => {
                debugger;
                this.dashboard = dashboarddata;
            });
        this.indLoading = false;

    }

    GetAttendanceDetail()
    {
        
        this.indLoading = true;
        this._DashboardService.get(Global.BASE_DASHBOARD_ENDPOINT + 'GetMyAttendance?Id=158&&Date=01/01/2015')
            .subscribe(attendancedata =>
            {
                this.attendancedata = attendancedata;
            });
        this.indLoading = false;
    }

    ProgressiveData() {
        this.modal.open();
        //this.dbops = DBOperation.create;
        //this.SetControlsState(true);
        this.modalTitle = "Progressive Point Details";
        //this.modalBtnTitle = "Add";
        //this.ContactMasterFrm.reset();

    }

    AchievementsData()
    {
        this.modalAchievements.open();
        this.modalTitle = "Achievements Details";
    }

    PointsData() {
        this.modalPoints.open();
        this.modalTitle = "Points Details";
    }

    LegendData() {
        this.modalLegend.open();
        this.modalTitle = "Points Details";
    }

    LevelsData() {
        this.modalLevels.open();
        this.modalTitle = "Employee Levels Details";

    }

    onSubmit(formData: any) {
        this.msg = "";
    }

    ChangeRecordsPerPage(RecordsPerPage: number) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    }

    JumpOnPage(PageNumber: number) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.dashboards);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    }


    // Function For Close Widget

    CloseWidgetProfile()
    {
        $("#adminProfile").hide(1000);
    }

    CloseWidgetWorkSheet()
    {
        $("#worksheetwidget").hide(1000);
    }

    CloseWidgetAttendance()
    {
        $("#MyAttendance").hide(1000);
    }

    CloseWidgetLeave()
    {
        $("#MyLeave").hide(1000);
    }

    CloseWidgetAllocation()
    {
        $("#MyAllocation").hide(1000);
    }

    CloseWidgetTeam()
    {
        $("#MyTeam").hide(1000);
    }

    CloseWidgetAlert()
    {
        $("#MyAlert").hide(1000);
    }

    CloseWidgetSkill()
    {
        $("#MySkill").hide(1000);
    }


    // Function For Collapse & Expand Widget

    ToogleMyProfile()
    {
        $("#myprofiledata").slideToggle(1000);
    }

    ToogleWorkSheet()
    {
        $("#myworksheetdata").slideToggle(1000);
    }

    ToogleAttendance()
    {
        $("#myattendancedata").slideToggle(1000);
    }

    ToogleLeave()
    {
        $("#myleavedata").slideToggle(1000);
    }

    ToogleAllocation()
    {
        $("#myallocationdata").slideToggle(1000);
    }

    ToogleTeam()
    {
        $("#myteamdata").slideToggle(1000);
    }

    ToogleAlert()
    {
        $("#myalertdata").slideToggle(1000);
    }

    ToogleSkill()
    {
        $("#myskilldata").slideToggle(1000);
    }

    // Function For Full Screen & Actual Size Widget

    MyProfileFullScreen()
    {
        if ($("#adminProfile").hasClass("widgetfullscreen"))
        {
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
        else
        {
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
      
    }

    WorkSheetFullScreen()
    {
        if ($("#worksheetwidget").hasClass("widgetfullscreen"))
        {
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
        else
        {
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
      
    }

    AttendanceFullScreen()
    {
        if ($("#MyAttendance").hasClass("widgetfullscreen"))
        {
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

    }

    MyLeaveFullScreen()
    {
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

    }

    MyAllocationFullScreen()
    {
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

    }

    MyTeamFullScreen()
    {
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

    }

    MyAlertFullScreen()
    {
        if ($("#MyAlert").hasClass("widgetfullscreen"))
        {
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
        else
        {
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

    }

    MySkillFullScreen()
    {
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

    }

}