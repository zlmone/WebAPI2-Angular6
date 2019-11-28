import { Component, OnInit, ViewChild } from '@angular/core';
import { DailyEntrysheetService } from '../../../Service/Report/Attendance/DailyEntrysheet.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IDailyEntrysheetEmployee } from '../../../Model/Report/Attendance/DailyEntrysheet';
import { IDailyEntrysheetTime, IBindAttendanceReportEmp } from '../../../Model/Report/Attendance/DailyEntrysheet';
import { DBOperation } from '../../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../../Shared/global';
import { PagerService } from '../../../Shared/pager.index';
import { IEmployees } from '../../../Model/Report/Attendance/DailyEntrysheet';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CommonHelperService } from '../../../Shared/CommonHelper.service';


@Component
    ({
        providers: [DailyEntrysheetService],
        templateUrl: 'app/Components/Report/Attendance/DailyEntrysheet.component.html'
    })

export class DailyEntrysheetComponent implements OnInit
{
    

    @ViewChild('modal') modal: ModalComponent;


    
    MM: number = new Date().getMonth() + 1 ;
    DD: number = new Date().getDate();
    YYYY: number = new Date().getFullYear();
    todaydate: string = this.MM + '/' + this.DD + '/' + this.YYYY ;

    employees: IEmployees[];
    dailyentrytimes: IDailyEntrysheetTime[];
    dailyentrytime: IDailyEntrysheetTime;
    dailyentryemployees: IDailyEntrysheetEmployee[];
    dailyentryemployee: IDailyEntrysheetEmployee;
    AttendanceReportEmp: IBindAttendanceReportEmp;
    msg: string;
    msgtimevalidation: string;
    indLoading: boolean = false;
    DailyEntrysheetFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    DailyEntryFilter: string;
    isDesc: boolean = false;
    column: any = 'EventName';
    direction: number;
    // pager object
    pager: any = {};
    CurrentRecordsPerPage: number = 10;
    // paged items
    pagedItems: any[];
    PagerInformation: string;
    nums: number[];

    fulldate: string;
    newdate: string;
    newmonth: string;
    newyear: string;
    Transaction_Id: number;
    Date: string;
    formbackup: IDailyEntrysheetEmployee;
    InLoading: boolean;
    EmployeeId: number;
    Dateval: Date;
    TempDD: string;
    TempMM: string;
    TempYYYY: string;
    CombineDate: string;

    constructor(private fb: FormBuilder, private _DailyEntrysheetService: DailyEntrysheetService, private pagerService: PagerService, private route: ActivatedRoute, private _CommonHelperService: CommonHelperService ) { }
    
    ngOnInit()
    {
        this._CommonHelperService.ToogleMenu();
        this.InLoading = false;
        this.BindEmployeeDropdownlist();
        this.LoadDailyEntryData();
        this.EmployeeId = this.route.snapshot.queryParams["EmployeeId"];
        let EmployeeName = this.route.snapshot.queryParams["EmployeeName"];
        this.Dateval = this.route.snapshot.queryParams["Date"];
        let EntryTime = this.route.snapshot.queryParams["EntryTime"];
        let Remarks = this.route.snapshot.queryParams["Remarks"];

        this.DailyEntrysheetFrm = this.fb.group
            ({
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
        })

        if (this.EmployeeId == undefined && this.Dateval == undefined)
        {
            this.EmployeeId = 0;
            this.Dateval = new Date();
        }
    }

    LoadDailyEntryData()
    {
        debugger;
        this.indLoading = true;
        this._DailyEntrysheetService.getalldailyentryreport(Global.BASE_DailyEntrysheet_ENDPOINT, Number(sessionStorage.getItem('Id')), this.todaydate)
            .subscribe(reportdata =>
            {
                this.dailyentryemployees = reportdata;
                this.indLoading = false;
                this.JumpOnPage(1);
            }
            );

        this.indLoading = true;
        this._DailyEntrysheetService.getalldailyentryreporttime(Global.BASE_DailyEntrysheet_ENDPOINT, Number(sessionStorage.getItem('Id')), this.todaydate)
            .subscribe(reportdatatime =>
            {
                this.dailyentrytime = reportdatatime;
                this.indLoading = false;
            }
            );
    }

    onSubmit(formData: any)
    {
        this.formbackup = formData;

        if (formData._value.Id == '0' && formData._value.Date != '')
        {
            debugger;
            this.msg = '';
            this.InLoading = true;
            this._DailyEntrysheetService.getalldailyentryreportallemp(Global.BASE_DailyEntrysheet_ENDPOINT, formData._value.Date)
                .subscribe(reportdata =>
                {
                    this.dailyentryemployees = reportdata;
                    this.dailyentrytime = null;
                    this.JumpOnPage(1);
                    $("html, body").animate({ scrollTop: 230 }, 150);
                    this.InLoading = false;
                }
                );
        }

        else
        {
            this.msg = '';
            if (formData._value.Id != '' && formData._value.Date != '')
            {
                debugger;
                this.InLoading = true;
                this._DailyEntrysheetService.getalldailyentryreport(Global.BASE_DailyEntrysheet_ENDPOINT, formData._value.Id, formData._value.Date)
                    .subscribe(reportdata =>
                    {
                        this.dailyentryemployees = reportdata;
                        this.JumpOnPage(1);
                    
                    }
                    );
                this.dailyentryemployees = null;
                this.indLoading = true;
                this._DailyEntrysheetService.getalldailyentryreporttime(Global.BASE_DailyEntrysheet_ENDPOINT, formData._value.Id, formData._value.Date)
                    .subscribe(reportdatatime =>
                    {
                        this.dailyentrytime = reportdatatime;
                        this.InLoading = false;
                    }
                    );

            }
            else
            {
                this.msg = "Please Select Date and Employee";
            }

        }
    }

    ToogleMyProfile() {
        $("#myprofiledata").slideToggle(300);
    }

    CloseWidgetProfile() {
        $("#adminProfile").hide(300);
    }

    BindEmployeeDropdownlist()
    {
            this.indLoading = true;
            this._DailyEntrysheetService.getemployee(Global.BASE_DailyEntrysheet_ENDPOINT)
                .subscribe(employeedata =>
                {
                    this.employees = employeedata;
                    this.indLoading = false;
                }
                //,error => this.msg = <any>error
                );
    }

    JumpOnPage(PageNumber: number)
    {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.dailyentryemployees);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;

    }

    ChangeRecordsPerPage(RecordsPerPage: number)
    {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }

    }

    SelectDate() {
        this.msg = '';
    }

    EditReport(Transaction_Id: number)
    {
        this.dbops = DBOperation.update;
        this.modalTitle = 'Edit Record';
        this.modalBtnTitle = 'Update';
        this.dailyentryemployee = this.dailyentryemployees.filter(asd => asd.Transaction_Id == Transaction_Id)[0];
        this.modal.open();
    }

    UpdateReport(formDataUpdate: IDailyEntrysheetEmployee)
    {
        this.msgtimevalidation = "";
        formDataUpdate.actualEntryTime = $("#actualEntryTimeHH").val() + ':' + $("#actualEntryTimeMM").val();
        formDataUpdate.Entry_Time = $("#Entry_TimeHH").val() + ':' + $("#Entry_TimeMM").val() + ':' + '00' + ' ' + $("#Entry_TimeAM").val();

        this._DailyEntrysheetService.updatereportdetail(Global.BASE_DailyEntrysheet_ENDPOINT, formDataUpdate).subscribe(
            data =>
            {
                if (data != null)
                {
                    if (this.formbackup!=null)
                    {
                        this.onSubmit(this.formbackup);
                    }
                    else
                    {
                        this.LoadDailyEntryData();
                    }
                    
                    this.modal.dismiss();
                    this.msg = "Data Saved Successfully....";

                }
                else
                {
                    this.msg = "Error has occurred while modifying existing Data!"
                }

            },
            error =>
            {
                this.msg = error;
            }
        );
    }

}
        

   