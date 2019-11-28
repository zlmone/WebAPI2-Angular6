import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeScreenCaptureReportService } from '../../../Service/Report/Attendance/EmployeeScreenCaptureReport.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { DBOperation } from '../../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../../Shared/global';
import { PagerService } from '../../../Shared/pager.index';
import { IEmployee } from '../../../Model/Report/Attendance/EmployeeScreenCaptureReport';
import { IEmployeeScreenCapture } from '../../../Model/Report/Attendance/EmployeeScreenCaptureReport';
import { IParameterModel } from '../../../Model/Report/Attendance/EmployeeScreenCaptureReport';
import { IYear } from '../../../Model/Report/Attendance/EmployeeScreenCaptureReport';
import { CommonHelperService } from '../../../Shared/CommonHelper.service';

@Component
    ({
        providers: [EmployeeScreenCaptureReportService],
        templateUrl: 'app/Components/Report/Attendance/EmployeeScreenCapture.component.html'
    })

export class EmployeeScreenCaptureReportComponent implements OnInit
{
    @ViewChild('modal') modal: ModalComponent;

    constructor(private fb: FormBuilder, private _EmployeeScreenCaptureReportService: EmployeeScreenCaptureReportService, private pagerService: PagerService, private _CommonHelperService : CommonHelperService) { }

    pager: any = {};
    pagedItems: any[];
    CurrentRecordsPerPage: number = 10;
    Employee: IEmployee[];
    EmployeeScreenCapture:IEmployeeScreenCapture;
    EmployeeScreenCaptures: IEmployeeScreenCapture[];
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
            FromDate:'',
            LoginUserId: 0,
            OrderBy: '',
            ToDate: '',
            FromMonth: '',
            FromYear: '',
            ToMonth: '',
            ToYear: '',
            MonthWise: false
            })

        this.Year =
            [({
            CurrentYear:''
            })]

        this.GetEmployee();

        this.GetYear();

    }

    HideShowPanel()
    {
        if ($("#rbtdate").prop("checked"))
        {
            $("#paneldatewise").show();
            $("#panelmonthwise").hide();
            $("#panelmonthwise2").hide();
            $("#panelmonthwise3").hide();
            $("#panelmonthwise4").hide();
            
        }
        else
        {
            $("#paneldatewise").hide();
            $("#panelmonthwise").show();
            $("#panelmonthwise2").show();
            $("#panelmonthwise3").show();
            $("#panelmonthwise4").show();
        }

    }

    ToogleMyProfile()
    {
        $("#alltypeoutreportdata").slideToggle(300);
    }

    CloseWidgetProfile()
    {
        $("#alltypeoutreport").hide(300);
    }

    GetEmployee()
    {
        this._EmployeeScreenCaptureReportService.getemployee(Global.BASE_EmployeeScreenCaptureReportAPI_ENDPOINT).
            subscribe(employee =>
            {
                this.Employee = employee
            },

        );

    }

    GetYear()
    {
        this._EmployeeScreenCaptureReportService.getyear(Global.BASE_EmployeeScreenCaptureReportAPI_ENDPOINT).
            subscribe(year =>
            {
                debugger;
                this.Year = year
            },

        );

    }

    onSubmit(ParameterModel: IParameterModel)
    {
        if ($("#rbtdate").prop("checked"))
        {
            ParameterModel.OrderBy = 'Name';
            ParameterModel.MonthWise = false;
        }
        else
        {
            ParameterModel.MonthWise = true;
            ParameterModel.FromMonth = this.frommonth.toString();
            ParameterModel.FromYear = this.fromyear.toString()

            ParameterModel.ToMonth = this.tomonth.toString();
            ParameterModel.ToYear = this.toyear.toString();
            

            if ($("#rbtsortdate").prop("checked"))
            {
                ParameterModel.OrderBy = 'Date';
            }
            else
            {
                ParameterModel.OrderBy = 'Name'
            }
        }

        ParameterModel.LoginUserId = 158;
        this.EmployeeScreenCaptures = null;
        this.InLoading = true;
        this._EmployeeScreenCaptureReportService.getoutreportdata(Global.BASE_EmployeeScreenCaptureReportAPI_ENDPOINT, ParameterModel).
            subscribe(employeescreencapture =>
            {
                this.EmployeeScreenCaptures = employeescreencapture;
                this.JumpOnPage(1);
                $("html, body").animate({ scrollTop: 310 }, 150);
                this.InLoading = false;
            },
        );


    }

    JumpOnPage(PageNumber: number)
    {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.EmployeeScreenCaptures);
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

    ShowPopup()
    {
        this.modal.open();
        this.modalTitle = 'Screen Capture Images';
    }

}