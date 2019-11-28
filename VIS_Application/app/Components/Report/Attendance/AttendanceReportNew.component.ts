import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { DBOperation } from '../../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../../Shared/global';
import { PagerService } from '../../../Shared/pager.index';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AttendanceReportNewService } from '../../../Service/Report/Attendance/AttendanceReportNew.service';
import { IDepartment, IEmployee, ICompany, ILineManager, IUserType, IYear, IAttendanceReport } from '../../../Model/Report/Attendance/AttendanceReportNew';

@Component({
    providers: [AttendanceReportNewService],
    templateUrl: 'app/Components/Report/Attendance/AttendanceReportNew.component.html'
})

export class AttendanceReportNewcomponent implements OnInit {
    @ViewChild('modalAttendanceApprovalPunchIn') modalAttendanceApprovalPunchIn: ModalComponent;
    @ViewChild('modalAttendanceApprovalPunchOut') modalAttendanceApprovalPunchOut: ModalComponent;
    @ViewChild('modalAttendanceApprovalLunchOut') modalAttendanceApprovalLunchOut: ModalComponent;
    @ViewChild('modalAttendanceApprovalLunchIn') modalAttendanceApprovalLunchIn: ModalComponent;
    @ViewChild('modalAttendanceApprovalOtherWork') modalAttendanceApprovalOtherWork: ModalComponent;
    Department: IDepartment[];
    Employee: IEmployee[];
    Company: ICompany[];
    LineManager: ILineManager[];
    User: IUserType[];
    Year: IYear[];
    Attendance: IAttendanceReport[];
    AttendanceReportNewFrm: FormGroup;
    indLoading: boolean = false;
    CurrentRecordsPerPage: number = 10;
    pager: any = {};
    pagedItems: any[];
    msg: string;
    Yearval: number;
    Month: number;
    StartDate: string;
    EndDate: string;
    SystemDate: Date;
    IsAdmin: boolean;
    ModeId: number;
    EmployeeName: string;
    Date: string;
    Grace: number;
    EntryHr: string;
    EntryMin: string;
    ActualEHr: string;
    ActualEMin: string;

    constructor(private fb: FormBuilder, public _AttendanceReportNewService: AttendanceReportNewService, private router: Router, private pagerService: PagerService) {
        this.GetSystemDateTime();
    }
    ngOnInit(): void {
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
    }

    HideECLU() {
        $("#emp").hide(-300);
        $("#empAll").hide(-300);
        $("#company").hide(-300);
        $("#LineManager").hide(-300);
        $("#usertType").hide(-300);
        $("#depart").show(-300);
    }
    HideDCLU() {
        $("#depart").hide(-300);
        $("#company").hide(-300);
        $("#LineManager").hide(-300);
        $("#usertType").hide(-300);
        $("#emp").show(-300);
        $("#empAll").show(-300);
    }
    HideDELU() {
        $("#depart").hide(-300);
        $("#emp").hide(-300);
        $("#empAll").hide(-300);
        $("#LineManager").hide(-300);
        $("#usertType").hide(-300);
        $("#company").show(-300);
    }
    HideDECU() {
        $("#depart").hide(-300);
        $("#emp").hide(-300);
        $("#empAll").hide(-300);
        $("#company").hide(-300);
        $("#usertType").hide(-300);
        $("#LineManager").show(-300);
    }
    HideDECL() {
        $("#depart").hide(-300);
        $("#emp").hide(-300);
        $("#empAll").hide(-300);
        $("#company").hide(-300);
        $("#LineManager").hide(-300);
        $("#usertType").show(-300);
    }
    HideDate() {
        $("#date").hide(-300);
        $("#month").show(-300);
    }
    HideMonth() {
        $("#date").show(-300);
        $("#month").hide(-300);
    }

    FillDepartMent(): void {
        this._AttendanceReportNewService.FillDepartMent(Global.BASE_AttendanceReportNew_ENDPOINT)
            .subscribe(data => {
                this.indLoading = false;
                this.Department = data;
            },
            error => {
                this.msg = error;
            });
    }
    FillEmployee(): void {
        var UserId = 21;
        var UserType = 'Admin';
        this._AttendanceReportNewService.FillEmployee(Global.BASE_AttendanceReportNew_ENDPOINT, UserId, UserType)
            .subscribe(data => {
                this.indLoading = false;
                this.Employee = data;
            },
            error => {
                this.msg = error;
            });
    }
    FillAllEmployee(event): void {
        if ($('#chkallemployee').is(':checked')) {
            this._AttendanceReportNewService.FillAllEmployee(Global.BASE_AttendanceReportNew_ENDPOINT, true, 21)
                .subscribe(data => {
                    this.indLoading = false;
                    this.Employee = data;
                },
                error => {
                    this.msg = error;
                });
        }
        else {
            this._AttendanceReportNewService.FillEmployee(Global.BASE_AttendanceReportNew_ENDPOINT, 21, 'Admin')
                .subscribe(data => {
                    this.indLoading = false;
                    this.Employee = data;
                },
                error => {
                    this.msg = error;
                });
        }
    }
    FillCompany(): void {
        this._AttendanceReportNewService.FillCompany(Global.BASE_AttendanceReportNew_ENDPOINT, true)
            .subscribe(data => {
                this.indLoading = false;
                this.Company = data;
            },
            error => {
                this.msg = error;
            });
    }
    FillAllLineManager(): void {
        this._AttendanceReportNewService.FillAllLineManager(Global.BASE_AttendanceReportNew_ENDPOINT, true, 21)
            .subscribe(data => {
                this.indLoading = false;
                this.LineManager = data;
            },
            error => {
                this.msg = error;
            });
    }
    FillUserType(): void {
        this._AttendanceReportNewService.FillUserType(Global.BASE_AttendanceReportNew_ENDPOINT)
            .subscribe(data => {
                this.indLoading = false;
                this.User = data;
            },
            error => {
                this.msg = error;
            });
    }

    FillYear(): void {
        this._AttendanceReportNewService.FillYear(Global.BASE_AttendanceReportNew_ENDPOINT)
            .subscribe(data => {
                this.indLoading = false;
                this.Year = data;
            },
            error => {
                this.msg = error;
            });
    }
    GetSystemDateTime(): void {
        this._AttendanceReportNewService.GetSystemDateTime(Global.BASE_AttendanceReportNew_ENDPOINT)
            .subscribe(data => {
                this.indLoading = false;
                this.SystemDate = data;
            },
            error => {
                this.msg = error;
            });
    }
    ChangeId(event): void
    {
        this.ModeId = event.target.value;
    }
    lastday = function (y, m) {
        return new Date(y, m + 1, 0).getDate();
    }

    JumpOnPage(PageNumber: number)
    {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.Attendance);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    }
    ChangeRecordsPerPage(RecordsPerPage: number)
    {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0)
        {
            this.JumpOnPage(1);
        }
    }

    btnAttendanceApprovePunchIn(ATRPNEW): void
    {
        if (ATRPNEW.IsAdmin == true)
        {
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
    }
    btnAttendanceApprovePunchOut(ATRPNEW): void
    {
        if (ATRPNEW.IsAdmin == true)
        {
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
    }
    btnAttendanceApproveLunchOut(ATRPNEW): void
    {
        if (ATRPNEW.IsAdmin == true)
        {
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
    }
    btnAttendanceApproveLunchIn(ATRPNEW): void
    {
        if (ATRPNEW.IsAdmin == true)
        {
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
    }
    btnAttendanceApproveOtherwork(ATRPNEW): void
    {
        if (ATRPNEW.IsAdmin == true)
        {
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
    }

    RedirectToTimeSheet(ATRPNEW): void
    {
        
    }
    RedirectToRecordPerEmp(ATRPNEW): void
    {
        this.router.navigate(['/DailyEntryReport'], { queryParams: { EmployeeId: ATRPNEW.EmployeeId, EmployeeName: ATRPNEW.EmployeeName, Date: ATRPNEW.Date, EntryTime: ATRPNEW.PunchIntime, Remarks: ATRPNEW.In_Remarks } });
    }
    RedirectToAddEmpRecord(ATRPNEW): void
    {
        var d1 = ATRPNEW.Date.split('/');
        var datval = d1[1] + '/' + d1[0] + '/' + d1[2];
        this.router.navigate(['/AddEmployeeRecord'], { queryParams: { EmployeeId: ATRPNEW.EmployeeId, EmployeeName: ATRPNEW.EmployeeName, Date: datval, EntryTime: ATRPNEW.PunchIntime, Remarks: ATRPNEW.In_Remarks } });
    }
    onSubmit(formData: any)
    {
        var month = formData.Month;
        var year = formData.year;
        year = jQuery("#ddlyear option:selected").text();
        var day = 1;
        var SortBy;
        var Mode;

        if ($('#rbtDate').is(':checked'))
        {
            if ($('#txtfromdate').val() != "")
            {
                this.StartDate = $('#txtfromdate').val();
            }
            else
            {
                this.StartDate = this.SystemDate.toString();
            }
            if ($('#txttodate').val() != "")
            {
                this.EndDate = $('#txttodate').val();
            }
            else
            {
                this.EndDate = this.StartDate;
            }
        }
        if ($('#rbtMonth').is(':checked'))
        {
            this.StartDate = year + '/' + month + '/' + day + ' '.concat('12:00:00 AM');
            var y = this.SystemDate.toString().trim();
            y = y.slice(6, 10);
            var dat = this.SystemDate.toString().trim();
            var mon = this.SystemDate.toString().trim();
            var lastDate = this.lastday(year, month).toString();
            if (year == y)
            {
                mon = mon.slice(0, 2);
                if (month == mon)
                {
                    dat = dat.slice(3, 5);
                    this.EndDate = year + '/' + month + '/' + lastDate + ' '.concat('12:00:00 AM');
                    var diff = Date.parse(this.EndDate) - Date.parse(this.StartDate);
                    day = diff / 1000 / 60 / 60 / 24;
                }
                else
                {
                    this.EndDate = year + '/' + month + '/' + lastDate + ' '.concat('12:00:00 AM');
                }
            }
            else
            {
                this.EndDate = year + '/' + month + '/' + lastDate + ' '.concat('12:00:00 AM');
            }
        }
        if ($('#rbtsortdate').is(':checked'))
        {
            SortBy = "Date";
        }
        else
        {
            SortBy = "Name";
        }
        if ($('#rbtdepartment').is(':checked'))
        {
            Mode = "department"
            this.ModeId = formData.Department;
        }
        else if ($('#rbtemployee').is(':checked'))
        {
            Mode = "employee";
            if (formData.Employee == '')
            {
                if ($('#chkallemployee').is(':checked'))
                {
                    this.ModeId = -1;
                }
                else
                {
                    this.ModeId = 0;
                }
            }
            else
            {
                this.ModeId = formData.Employee;
            }
        }
        else if ($('#rbtcompany').is(':checked'))
        {
            Mode = "company";
            if (formData.Company == '')
            {
                this.ModeId = 0;
            }
            else
            {
                this.ModeId = formData.Company;
            }
        }
        else if ($('#rbtlinemanager').is(':checked'))
        {
            Mode = "linemanager";
            if (formData.LineManager == '')
            {
                this.ModeId = 0;
            }
            else
            {
                this.ModeId = formData.LineManager;
            }
        }
        else if ($('#rbtusertype').is(':checked'))
        {
            Mode = "usertype";
            if (formData.UserType == '')
            {
                this.ModeId = 0;
            }
            else
            {
                this.ModeId = formData.UserType;
            }
        }
        this.IsAdmin = true;
        if ($('#rbtreport').is(':checked'))
        {
            this._AttendanceReportNewService.GetAllAttendanceReport(Global.BASE_AttendanceReportNew_ENDPOINT, Mode, this.ModeId, this.StartDate, this.EndDate, SortBy, this.IsAdmin)
                .subscribe(data =>
                {
                    this.indLoading = false;
                    this.Attendance = data;
                    if (data != '' && data.length > 0)
                    {
                        this.JumpOnPage(1);//Report Generated
                    }
                })
        }
        else
        {
            this._AttendanceReportNewService.GetAllAttendanceData(Global.BASE_AttendanceReportNew_ENDPOINT, Mode, this.ModeId, this.StartDate, this.EndDate, SortBy, this.IsAdmin)
                .subscribe(data =>
                {
                    this.indLoading = false;
                    this.Attendance = data;
                    if (data != '' && data.length > 0)
                    {
                        if ($('#rbtgrid').is(':checked'))
                        {
                            this.JumpOnPage(1);
                        }
                        else if ($('#rbtexcel').is(':checked'))
                        {
                            // Download
                        }
                        else
                        {
                            //rdlc Report Generate
                        }
                    }
                },
                error =>
                {
                    this.msg = error;
                });
        }
    }
}
