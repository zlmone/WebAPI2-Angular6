import { Component, OnInit, ViewChild} from '@angular/core';
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
import { AddEmployeeRecordService } from '../../../Service/Report/Attendance/AddEmployeeRecord.service';
import { IEmployee, IBindEmployeeDetails, IBindEmployeeAttendance, IHRAttendance, IAttendance } from '../../../Model/Report/Attendance/AddEmployeeRecord';

@Component({
    providers: [AddEmployeeRecordService],
    templateUrl: 'app/Components/Report/Attendance/AddEmployeeRecord.component.html'
})

export class AddEmployeeRecordcomponent implements OnInit
{
    AddEmployeeRecordFrm: FormGroup;
    Employees: IEmployee[];
    EmployeeDailyEntrySheet: IBindEmployeeDetails[];
    EmployeeEntrySheet: IBindEmployeeDetails;
    EmployeeAttendance: IBindEmployeeAttendance;
    HRAttendance: IHRAttendance[];
    Attendance: IAttendance[];
    indLoading: boolean = false;
    CurrentRecordsPerPage: number = 10;
    PagerInformation: string;
    pagedItems: any[];
    pager: any = {};
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    msg: string;
    Grace: number;
    Grade: string;
    Mode: string;
    InTime: string;
    OutTime: string;
    AMPM_Data: string;
    TransactionId: number;
    EntryTime: string;
    EmpId: number;
    Date: string;
    HR: string;
    MIN: string;
    EntryType: number;

    constructor(private fb: FormBuilder, public _AddEmployeeRecordService: AddEmployeeRecordService, private router: Router, private pagerService: PagerService, private route: ActivatedRoute) {
    }

    ngOnInit(): void
    {
        this.FillEmployee();
        this.EmpId = this.route.snapshot.queryParams["EmployeeId"];
        this.Date = this.route.snapshot.queryParams["Date"];
        if (this.EmpId != 0 && this.Date != null)
        {
            $("#Id").prop("disabled", true);
            $("#txtDate").prop("disabled", true);
        }
        this.BindEmployeeDetails();
        this.BindEmployeeAttendance();
        this.BindHRAttendanceDetails();
    }

    FillEmployee(): void
    {
        this._AddEmployeeRecordService.FillEmployee(Global.BASE_AddEmployeeRecord_ENDPOINT)
            .subscribe(data =>
            {
                this.indLoading = false;
                this.Employees = data;
            },
            error =>
            {
                this.msg = error;
            });
    }
    BindEmployeeDetails(): void
    {
        this._AddEmployeeRecordService.BindEmployeeDetails(Global.BASE_AddEmployeeRecord_ENDPOINT, this.EmpId, this.Date, 21)
            .subscribe(data =>
            {
                this.indLoading = false;
                this.EmployeeDailyEntrySheet = data;
                this.JumpOnPage(1);
            },
            error =>
            {
                this.msg = error;
            });
    }
    BindEmployeeAttendance(): void
    {
        this._AddEmployeeRecordService.BindEmployeeAttendance(Global.BASE_AddEmployeeRecord_ENDPOINT, this.EmpId, this.Date)
            .subscribe(data =>
            {
                this.indLoading = false;
                this.EmployeeAttendance = data;
            },
            error =>
            {
                this.msg = error;
            });
    }
    BindHRAttendanceDetails(): void {
        this._AddEmployeeRecordService.BindHRAttendanceDetails(Global.BASE_AddEmployeeRecord_ENDPOINT, this.EmpId, this.Date)
            .subscribe(data =>
            {
                this.indLoading = false;
                if (data != '')
                {
                    this.HRAttendance = data;
                    this.HRAttendance.forEach(data =>
                    {
                        this.Grade = data.Grade;
                        this.Grace = data.Grace;
                        this.InTime = data.HRInTime;
                        this.OutTime = data.HROutTime;
                        if (this.Grade == "A1" || this.Grade == "A2")
                        {
                            this.Mode = "Flexible";
                        }
                        else
                        {
                            this.Mode = "Non-Flexible";
                        }
                    });
                }
            },
            error =>
            {
                this.msg = error;
            });
    }

    JumpOnPage(PageNumber: number) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.EmployeeDailyEntrySheet);
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
    ClearFields(): void
    {
        $("#ddltype").empty();
        $("#txtHr").val('');
        $("#txtMinute").val('');
        $("#Remarks").val('Chirendu Gupta' + ':'); // Session Storage Login User Name
        $("#grace").val('');
    }
    EditReport(EmployeeEntrySheet: any): void
    {
        this.EmployeeEntrySheet = EmployeeEntrySheet;
        let HH = this.EmployeeEntrySheet.Entry_Time;
        let MM = this.EmployeeEntrySheet.Entry_Time;
        let AMPM = this.EmployeeEntrySheet.Entry_Time;
        
        if (this.EmployeeEntrySheet.Entry_Type == "In Time")
        {
            this.EntryType = 1;
        }
        else if (this.EmployeeEntrySheet.Entry_Type == "Out Time")
        {
            this.EntryType = 2;
        }
        else if (this.EmployeeEntrySheet.Entry_Type == "Lunch Out Time")
        {
            this.EntryType = 3;
        }
        else if (this.EmployeeEntrySheet.Entry_Type == "Lunch In Time")
        {
            this.EntryType = 4;
        }
        else if (this.EmployeeEntrySheet.Entry_Type == "Other Out Time")
        {
            this.EntryType = 5;
        }
        else if (this.EmployeeEntrySheet.Entry_Type == "Other In Time")
        {
            this.EntryType = 6;
        }
        else if (this.EmployeeEntrySheet.Entry_Type == "Meeting Out Time")
        {
            this.EntryType = 7;
        }
        else if (this.EmployeeEntrySheet.Entry_Type == "Meeting In Time")
        {
            this.EntryType = 8;
        }
        else if (this.EmployeeEntrySheet.Entry_Type == "Official Work Out Time (Approved)")
        {
            this.EntryType = 9;
        }
        else if (this.EmployeeEntrySheet.Entry_Type == "Official Work In Time (Approved)")
        {
            this.EntryType = 10;
        }
        if (HH.length <= 10)
        {
            HH.split(':');
            this.HR = HH[0];
        }
        else
        {
            HH.split(':');
            this.HR = HH[0] + HH[1];
        }
        if (MM.length <= 10)
        {
            MM.split(':');
            this.MIN = MM[2] + MM[3];
        }
        else
        {
            MM.split(':');
            this.MIN = MM[3] + MM[4];
        }
        if (AMPM.length <= 10)
        {
            AMPM.split(" ");
            this.AMPM_Data = AMPM[8] + AMPM[9];
        }
        else
        {
            AMPM.split(" ");
            this.AMPM_Data = AMPM[9] + AMPM[10];
        }
    }
    ReBindAllDetails(): void {
        this.BindEmployeeDetails();
        this.ClearFields();
        this.BindEmployeeAttendance();
        this.TransactionId = null;
    }
    onSubmit(formData: any)
    {
        if (formData.EmployeeId > 0)
        {
            if (formData.EntryType > 0)
            {
                let Hr = $("#txtHr").val();
                let Minute = $("#txtMinute").val();
                let Remarks = $("#Remarks").val();
                let Grace = $("#grace").val();
                if ((parseInt($("#txtHr").val()) < 13) && (parseInt($("#txtMinute").val())) < 60)
                {
                    this._AddEmployeeRecordService.BindEmployeeDetails(Global.BASE_AddEmployeeRecord_ENDPOINT, formData.EmployeeId, formData.Date,21)
                        .subscribe(data =>
                        {
                            this.indLoading = false;
                            let StrEntryType;
                            if (formData.EntryType == 1)
                            {
                                StrEntryType = "In Time";
                            }
                            else if (formData.EntryType == 2)
                            {
                                StrEntryType = "Out Time";
                            }
                            else if (formData.EntryType == 3)
                            {
                                StrEntryType = "Lunch Out Time";
                            }
                            else if (formData.EntryType == 4)
                            {
                                StrEntryType = "Lunch In Time";
                            }
                            this.EmployeeDailyEntrySheet = data;
                            var first;
                            var firstdata 
                            var EntryType
                            this.EmployeeDailyEntrySheet.forEach(data =>
                            {
                                first = function (element) { return !!element }
                                firstdata = this.EmployeeDailyEntrySheet.find(first);
                                EntryType = firstdata.Entry_Type;
                                StrEntryType == EntryType
                            });
                            let IsExist = false;
                            if (StrEntryType == EntryType)
                            {
                                first = function (element) { return !!element }
                                firstdata = this.EmployeeDailyEntrySheet.find(first);
                            }
                            else
                            {
                                IsExist = true;
                            }
                            if (IsExist)
                            {
                                this._AddEmployeeRecordService.GetAttendanceTransaction(Global.BASE_AddEmployeeRecord_ENDPOINT, formData.EmployeeId, formData.Date, formData.EntryType)
                                    .subscribe(success =>
                                    {
                                        this.indLoading = false;
                                        this.Attendance = success;
                                        var date = $("#txtEntryDate").val();
                                        var strDate = date.toString().split('-');
                                        var stDate = strDate[0] + strDate[1] + strDate[2];
                                        this.EntryTime = stDate + " " + $("#txtHr").val() + ":" + $("#txtMinute").val() + ":00" + " ";
                                        var strActualEntry = "";

                                        if (success != '')
                                        {
                                            let id;
                                            let actualEntryTime;
                                            this.Attendance.forEach(success =>
                                            {
                                                id = this.TransactionId != null ? this.TransactionId : parseInt(success.Id.toString());
                                                actualEntryTime = success.actualEntryTime;
                                            });
                                            if (formData.EntryType < 3)
                                            {
                                                var ActualHr = actualEntryTime.trim().toString();
                                                ActualHr.split(':');
                                                var A_HR = ActualHr[0] + ActualHr[1];
                                                var A_MIN = ActualHr[3] + ActualHr[4];

                                                if (this.AMPM_Data == "PM")
                                                {
                                                    if (A_HR <= 12)
                                                    {
                                                    }
                                                    else
                                                    {
                                                        A_HR += 12;
                                                    }
                                                    strActualEntry = A_HR.toString();
                                                }
                                                else
                                                {
                                                    strActualEntry = A_HR;
                                                }
                                                strActualEntry = strActualEntry + ":" + A_MIN;
                                            }
                                            this._AddEmployeeRecordService.GetUpdateEmployeeAttendance(Global.BASE_AddEmployeeRecord_ENDPOINT, id, formData.EmployeeId, formData.EntryType, Remarks, this.EntryTime, formData.Date, Grace, 21, strActualEntry)
                                                .subscribe(AddEmployee =>
                                                {
                                                    this.indLoading = false;
                                                    this.ReBindAllDetails();
                                                    alert("Record Updated");
                                                },
                                                error =>
                                                {
                                                    this.msg = error;
                                                });
                                        }
                                        else if (this.TransactionId != null)
                                        {
                                            let id;
                                            let actualEntryTime;
                                            this.Attendance.forEach(success =>
                                            {
                                                id = this.TransactionId != null ? this.TransactionId : parseInt(success.Id.toString());
                                                actualEntryTime = success.actualEntryTime;
                                            });
                                            if (formData.EntryType < 3)
                                            {
                                                if (this.AMPM_Data == "PM")
                                                {
                                                    var ActualHr = actualEntryTime.trim().toString();
                                                    ActualHr.split(':');
                                                    var A_HR = ActualHr[0] + ActualHr[1];
                                                    var A_MIN = ActualHr[3] + ActualHr[4];
                                                    if (A_HR <= 12)
                                                    {
                                                    }
                                                    else
                                                    {
                                                        A_HR += 12;
                                                    }
                                                    strActualEntry = A_HR.toString();
                                                }
                                                else
                                                {
                                                    strActualEntry = A_HR;
                                                }
                                                strActualEntry = strActualEntry + ":" + A_MIN;
                                            }
                                            this._AddEmployeeRecordService.GetUpdateEmployeeAttendance(Global.BASE_AddEmployeeRecord_ENDPOINT, id, formData.EmployeeId, formData.EntryType, Remarks, this.EntryTime, formData.Date, Grace, 21, strActualEntry)
                                                .subscribe(AddEmployee =>
                                                {
                                                    this.indLoading = false;
                                                    this.ReBindAllDetails();
                                                    alert("Record Updated");
                                                },
                                                error =>
                                                {
                                                    this.msg = error;
                                                });
                                        }
                                        else
                                        {
                                            this._AddEmployeeRecordService.BindHRAttendanceDetails(Global.BASE_AddEmployeeRecord_ENDPOINT, formData.EmployeeId, formData.Date)
                                                .subscribe(HRAttendance =>
                                                {
                                                    this.indLoading = false;
                                                    this.HRAttendance = HRAttendance;
                                                    var Time = "";
                                                    if (formData.EntryType == 1)
                                                    {
                                                        this.HRAttendance.forEach((HRAttendance) =>
                                                        {
                                                            Time = HRAttendance.HRInTime.toString();
                                                        });
                                                    }
                                                    else if (formData.EntryType == 2)
                                                    {
                                                        this.HRAttendance.forEach((HRAttendance) =>
                                                        {
                                                            Time = HRAttendance.HROutTime.toString();
                                                        });
                                                    }
                                                    else
                                                    {
                                                        Time = "";
                                                    }
                                                    this._AddEmployeeRecordService.AddEmployee(Global.BASE_AddEmployeeRecord_ENDPOINT, formData.EmployeeId, formData.EntryType, Remarks, this.EntryTime, formData.Date, Time, Grace)
                                                        .subscribe(Add =>
                                                        {
                                                            this.indLoading = false;
                                                            this.ReBindAllDetails();
                                                            alert("Record Saved");
                                                        },
                                                        error =>
                                                        {
                                                            this.msg = error;
                                                        });
                                                },
                                                error =>
                                                {
                                                    this.msg = error;
                                                });
                                        }
                                    },
                                    error =>
                                    {
                                        this.msg = error;
                                    });
                            }
                            else
                            {
                                this.ReBindAllDetails();
                                alert("Record Exist");
                            }
                        },
                        error =>
                        {
                            this.msg = error;
                        });
                }
                else
                {
                    alert("Invalid Time Information !")
                } 
            }
            else
            {
                alert("Select Type !")
            }
        }
        else
        {
            alert("Select Employee !");
        }
    }
}