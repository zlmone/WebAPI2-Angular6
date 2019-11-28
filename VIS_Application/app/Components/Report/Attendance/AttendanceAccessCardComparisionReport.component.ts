import { Component, OnInit, ViewChild } from '@angular/core';
import { AttendanceAccessCardComparisionReportService } from '../../../Service/Report/Attendance/AttendanceAccessCardComparisionReport.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { DBOperation } from '../../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../../Shared/global';
import { PagerService } from '../../../Shared/pager.index';
import { IEmployee } from '../../../Model/Report/Attendance/AttendanceAccessCardComparisionReport';
import { IEmployeeAccessCardComparision } from '../../../Model/Report/Attendance/AttendanceAccessCardComparisionReport';
import { IParameterModel } from '../../../Model/Report/Attendance/AttendanceAccessCardComparisionReport';
import { IYear } from '../../../Model/Report/Attendance/AttendanceAccessCardComparisionReport';
import { CommonHelperService } from '../../../Shared/CommonHelper.service';

@Component
    ({
        providers: [AttendanceAccessCardComparisionReportService],
        templateUrl: 'app/Components/Report/Attendance/AttendanceAccessCardReportComparisionReport.component.html'
    })

    
export class AttendanceAccessCardComparisionReportComponent implements OnInit
{
    @ViewChild('modal') modal: ModalComponent;

    constructor(private fb: FormBuilder, private _AttendanceAccessCardComparisionReportService: AttendanceAccessCardComparisionReportService, private pagerService: PagerService, private _CommonHelperService: CommonHelperService) { }

    pager: any = {};
    pagedItems: any[];
    CurrentRecordsPerPage: number = 10;
    Employee: IEmployee[];
    EmployeeAccessCardComparision: IEmployeeAccessCardComparision;
    EmployeeAccessCardComparisions: IEmployeeAccessCardComparision[];
    ParameterModel: IParameterModel;
    Year: IYear[];
    modalTitle: string;
    InLoading: boolean;
    frommonth: number = new Date().getMonth() + 1;
    fromyear: number = new Date().getFullYear();

    tomonth: number = new Date().getMonth() + 1;
    toyear: number = new Date().getFullYear();
    fromdate: string;
    todate: string;


    ngOnInit()
    {
        this._CommonHelperService.ToogleMenu();
        this.InLoading = false;
        this.Employee =
            [({
                Id: 0,
                Employee_Name: ''
            })];

        this.ParameterModel =
            ({
                EmployeeId: 0,
                FromDate: '',
                LoginUserId: 0,
                OrderBy: '',
                ToDate: '',
                FromMonth: '',
                FromYear: '',
                ToMonth: '',
                IssueOnly: '',
                Search: '',
                ToYear: '',
                MonthWise: false
            })

        this.Year =
            [({
                CurrentYear: ''
            })]

        this.GetEmployee();

        this.GetYear();

    }

    HideShowPanel() {
        if ($("#rbtdate").prop("checked")) {
            $("#paneldatewise").show();
            $("#panelmonthwise").hide();
            $("#panelmonthwise2").hide();
            $("#panelmonthwise3").hide();
            $("#panelmonthwise4").hide();

        }
        else {
            $("#paneldatewise").hide();
            $("#panelmonthwise").show();
            $("#panelmonthwise2").show();
            $("#panelmonthwise3").show();
            $("#panelmonthwise4").show();
        }

        if ($("#rbtconsolidated").prop("checked")) {
            $("#panelconsolidate").show();
        }
        else {
            $("#panelconsolidate").hide();
        }

    }

    ToogleMyProfile() {
        $("#alltypeoutreportdata").slideToggle(300);
    }

    CloseWidgetProfile() {
        $("#alltypeoutreport").hide(300);
    }

    GetEmployee()
    {
        this._AttendanceAccessCardComparisionReportService.getemployee(Global.BASE_AttendanceAccessCardComparisionReportAPI_ENDPOINT).
            subscribe(employee =>
            {
                this.Employee = employee
            },

        );

    }

    GetYear()
    {
        this._AttendanceAccessCardComparisionReportService.getyear(Global.BASE_AttendanceAccessCardComparisionReportAPI_ENDPOINT).
            subscribe(year =>
            {
                this.Year = year
            },

        );

    }

    onSubmit(ParameterModel: IParameterModel)
    {
        ParameterModel.Search = '';
        if ($("#rbtdate").prop("checked"))
        {
            ParameterModel.MonthWise = false;
        }
        else
        {
            ParameterModel.MonthWise = true;
            ParameterModel.FromMonth = this.frommonth.toString();
            ParameterModel.FromYear = this.fromyear.toString();

            ParameterModel.ToMonth = this.tomonth.toString();
            ParameterModel.ToYear = this.toyear.toString();
        }

        if ($("#chkissueonly").prop("checked"))
        {
            ParameterModel.IssueOnly = '1';
        }
        else
        {
            ParameterModel.IssueOnly = '0';
        }

        ParameterModel.LoginUserId = 158;
        this.EmployeeAccessCardComparisions = null;
        this.InLoading = true;
        this._AttendanceAccessCardComparisionReportService.getoutreportdata(Global.BASE_AttendanceAccessCardComparisionReportAPI_ENDPOINT, ParameterModel).
            subscribe(employeescreencapture =>
            {
                this.EmployeeAccessCardComparisions = employeescreencapture;
                this.JumpOnPage(1);
                $("html, body").animate({ scrollTop: 310 }, 150);
                this.InLoading = false;
            },
        );
    }

    JumpOnPage(PageNumber: number)
    {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.EmployeeAccessCardComparisions);
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

    ImportAccessCardDetail()
    {
        alert("Import Access Card Detail");
    }

    ExportAccessCardDetail()
    {
        alert("Export Access Card Detail");
    }

    DownloadSampleAccessCardDetail()
    {
        alert("Download Sample Access Card Detail");
        
    }


}

