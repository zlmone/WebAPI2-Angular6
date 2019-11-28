import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { DBOperation } from '../../../app/Shared/enum';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../../app/Shared/global';
import { PagerService } from '../../../app/Shared/pager.index';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpModule, Http, Headers } from '@angular/http';
import { AttendanceEntryService } from '../../Service/UserManagement/AttendanceEntry.Service';
import { IAttendanceEntry, IGetTimeDetails, IPunchOutOnNextDay, IGetEmployeeName } from '../../../app/Model/UserManagement/AttendanceEntry';
import { DatePipe } from '@angular/common';



@Component({
    providers: [AttendanceEntryService],
    templateUrl: 'app/Components/UserManagement/AttendanceEntry.component.html'
})

export class AttendanceEntryComponent implements OnInit {
    @ViewChild('modalAttendanceEntry') modal: ModalComponent;
    AttendanceEntrys: IAttendanceEntry[];
    AttendanceEntry: IAttendanceEntry;
    AttendanceEntryTimer: IGetTimeDetails[];
    AttendanceEntryTime: IGetTimeDetails;
    AttendancePunchOutonNextDay: IPunchOutOnNextDay[];
    AttendanceEmployeeName: IGetEmployeeName;
    AttendanceEmployee: IGetEmployeeName[];
    dbops: DBOperation;
    msg: string;
    AttendanceEntryFrm: FormGroup;
    Entry_Type: number;
    indLoading: boolean = false;
    Datetime: Date;
    Id: number;
    Date: string;
    BreakTime: Date;
    PunchInHours: Date;
    WorkingTime: Date;
    forewhichdate: string;
    EmployeeName: string;

    constructor(private fb: FormBuilder, private _AttendanceEntryService: AttendanceEntryService, public http: Http, private router: Router, private pagerService: PagerService) {

    }

    ngOnInit(): void {
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
        setInterval(() => {
            this.Datetime = new Date();
        }, 1000);

        this.Datetime = new Date();
        let month = this.Datetime.getMonth() + 1;
        let year = this.Datetime.getFullYear();
        let date1 = this.Datetime.getDate();
        this.Date = + month + '/' + this.Datetime.getDate() + '/' + this.Datetime.getFullYear();
        this.forewhichdate = + month + '/' + this.Datetime.getDate() + '/' + this.Datetime.getFullYear();
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
    }

    DisableEntry_Type() {
        var punchout = <HTMLInputElement>document.getElementById("rdbpunchout");
        var LunchOut = <HTMLInputElement>document.getElementById("rdbLunchout");
        var Lunchin = <HTMLInputElement>document.getElementById("rdbLunchin");
        var Otherchout = <HTMLInputElement>document.getElementById("rdbotherout");
        var OtherIn = <HTMLInputElement>document.getElementById("rdbotherin");
        var MeetingOut = <HTMLInputElement>document.getElementById("rdbmeetingout");
        var meetingIn = <HTMLInputElement>document.getElementById("rdbmeetingin");
        var Officialworkout = <HTMLInputElement>document.getElementById("rdbOffworkout");
        var Officialworkin = <HTMLInputElement>document.getElementById("rdbOffworkin");
        punchout.disabled = true;
        LunchOut.disabled = true;
        Lunchin.disabled = true;
        Otherchout.disabled = true;
        OtherIn.disabled = true;
        MeetingOut.disabled = true;
        meetingIn.disabled = true;
        Officialworkout.disabled = true;
        Officialworkin.disabled = true;

    }
    EnableEntry_Type() {
        var punchout = <HTMLInputElement>document.getElementById("rdbpunchout");
        var LunchOut = <HTMLInputElement>document.getElementById("rdbLunchout");
        var Lunchin = <HTMLInputElement>document.getElementById("rdbLunchin");
        var Otherchout = <HTMLInputElement>document.getElementById("rdbotherout");
        var OtherIn = <HTMLInputElement>document.getElementById("rdbotherin");
        var MeetingOut = <HTMLInputElement>document.getElementById("rdbmeetingout");
        var meetingIn = <HTMLInputElement>document.getElementById("rdbmeetingin");
        var Officialworkout = <HTMLInputElement>document.getElementById("rdbOffworkout");
        var Officialworkin = <HTMLInputElement>document.getElementById("rdbOffworkin");
        punchout.disabled = false;
        LunchOut.disabled = false;
        Lunchin.disabled = false;
        Otherchout.disabled = false;
        OtherIn.disabled = false;
        MeetingOut.disabled = false;
        meetingIn.disabled = false;
        Officialworkout.disabled = false;
        Officialworkin.disabled = false;
    }
    GetTimer(): void {
        this.indLoading = true;
        this._AttendanceEntryService.getTime(Global.BASE_AttendanceEntry_ENDPOINT, 21, this.Date)
            .subscribe(sucess => {
                this.AttendanceEntryTimer = sucess;
                this.AttendanceEntryTime = sucess;
                this.indLoading = false;

                this.AttendanceEntryTimer.forEach((sucess) => {
                    this.PunchInHours = sucess.TotalPunchInHours;
                    this.WorkingTime = sucess.TotalWorkingTime;
                    this.BreakTime = sucess.TotalBreakTime;

                    if (this.PunchInHours == null) {
                        document.getElementById("lblPunchTime").innerHTML = "00:00:00";
                    }
                    else {
                        this.PunchInHours;
                    }
                    if (this.WorkingTime == null) {
                        document.getElementById("lblWorkTime").innerHTML = "00:00:00";
                    }
                    else {
                        this.WorkingTime;
                    }
                    if (this.BreakTime == null) {
                        document.getElementById("lblBreakTime").innerHTML = "00:00:00";
                    }
                    else {
                        this.BreakTime;
                    }
                })
            },
            error => {
                alert("Error");
            });
    }
    CheckIsPunchOutOnNextDay(): void {
        this.indLoading = true;
        this._AttendanceEntryService.GetPunchOutNextDay(Global.BASE_AttendanceEntry_ENDPOINT, 199,'04/01/2016')
            .subscribe(data => {
                this.AttendancePunchOutonNextDay = data;
                this.indLoading = false;
            });
    }
    GetEmployeeName(): void {
        this.indLoading = true;
        this._AttendanceEntryService.GetEmployeeName(Global.BASE_AttendanceEntry_ENDPOINT, 21)
            .subscribe(success => {
                this.AttendanceEmployee = success;
                console.log(this.AttendanceEmployeeName);
            },
            error => {
                alert("error");
            });
    }
    onsubmit(formData: IAttendanceEntry) {
        this.msg = "";
        this._AttendanceEntryService.post(Global.BASE_AttendanceEntry_ENDPOINT, formData)
            .subscribe(data => {
                if (data.startsWith("Success: "))// Success
                {
                    this.msg = data;
                    this.AttendanceEntrys = data;
                }
                else {
                    alert(data);
                }
            },
            error => {
                this.msg = error;
            });
    }
}

