import { Component, OnInit, ViewChild } from '@angular/core';
import { OfficialWorkReportService } from '../../../Service/Report/Attendance/OfficialWorkReport.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { DBOperation } from '../../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../../Shared/global';
import { PagerService } from '../../../Shared/pager.index';
import { IEmployee } from '../../../Model/Report/Attendance/OfficialWorkReport';
import { IYear } from '../../../Model/Report/Attendance/OfficialWorkReport';
import { IParameterModel } from '../../../Model/Report/Attendance/OfficialWorkReport';
import { IOfficialWorkReportBind } from '../../../Model/Report/Attendance/OfficialWorkReport';
import { Pipe } from '@angular/core';
import { DatepickerOptions } from 'ng2-datepicker';
import * as frLocale from 'date-fns/locale/fr';
import { CommonHelperService } from '../../../Shared/CommonHelper.service';

@Component
    ({
        providers: [OfficialWorkReportService],
        templateUrl: 'app/Components/Report/Attendance/OfficialWorkReport.component.html'
    })

export class OfficialWorkReportComponent implements OnInit
{
    @ViewChild('modal') modal: ModalComponent;

    constructor(private fb: FormBuilder, private _OfficialWorkReportService: OfficialWorkReportService, private pagerService: PagerService, private _CommonHelperService: CommonHelperService) { }

    pager: any = {};
    pagedItems: any[];
    CurrentRecordsPerPage: number = 10;
    isDesc: boolean = false;
    column: any = 'Employee_Name';
    direction: number;
    Employee: IEmployee[];
    Year: IYear[];
    ShowHideSearch: boolean = false;
    ParameterModel: IParameterModel;
    OfficialWorkReportBindList: IOfficialWorkReportBind[];

    EmployeeId: number = 0;

    modalTitle: string;
    InLoading: boolean;
    frommonth: number = new Date().getMonth()+1;
    fromyear: number = new Date().getFullYear();
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

        this.Year =
            [({
                CurrentYear: ''
            })]
       
        this.ParameterModel =
            {
            EmployeeId: 0,
            FromDate: new Date(),
            ToDate: new Date(),
            ReportSort: '',
            Sort: 0,
            UserId: 0,
            UserType:'',
            FromMonth: '',
            FromYear: '',
            ToMonth: '',
            ToYear: '',
            MonthWise: false
            }

        this.GetEmployee();
        this.GetYear();

    }

    ToogleMyProfile()
    {
        $("#alltypeoutreportdata").slideToggle(300);
    }

    CloseWidgetProfile() {
        $("#alltypeoutreport").hide(300);
    }

    ViewStyleToogle() {
        if ($("#rbtconsolidated").prop('checked')) {
            $("#viewstyle").show();
        }
        else {
            $("#viewstyle").hide();
        }
    }

    ToogleHideShowOption() {




        if ($("#rbtdepartment").prop('checked')) {
            $("#ddlemployee").hide();
            $("#chkallemployeediv").hide();
            $("#ddlcompany").hide();
            $("#ddllinemanager").hide();
            $("#ddldepartment").show();



        }
        else if ($("#rbtcompany").prop('checked')) {
            $("#ddldepartment").hide();
            $("#ddlemployee").hide();
            $("#chkallemployeediv").hide();
            $("#ddlcompany").show();
            $("#ddllinemanager").hide();
        }
        else if ($("#rbtlinemanager").prop('checked')) {
            $("#ddldepartment").hide();
            $("#ddlemployee").hide();
            $("#chkallemployeediv").hide();
            $("#ddlcompany").hide();
            $("#ddllinemanager").show();
        }
        else {
            $("#ddldepartment").hide();
            $("#ddlemployee").show();
            $("#chkallemployeediv").show();
            $("#ddlcompany").hide();
            $("#ddllinemanager").hide();
        }


    }

    ToogleDateOption() {
        if ($("#rbtdate").prop("checked")) {
            $("#searchbydate").show();
            $("#searchbymonth").hide();
        }
        else {
            $("#searchbydate").hide();
            $("#searchbymonth").show();
        }
    }

   // function for bind dropdownlist

    GetEmployee()
    {
        this._OfficialWorkReportService.getemployee(Global.BASE_OfficialWorkReportAPI_ENDPOINT).
            subscribe(employee =>
            {
                this.Employee = employee
            },

        );
    }

    GetYear()
    {
        this._OfficialWorkReportService.getyear(Global.BASE_OfficialWorkReportAPI_ENDPOINT).
            subscribe(year =>
            {
                this.Year = year
            },

        );
    }

    GetOfficialWorkReport(entityobject : IParameterModel)
    {
        this._OfficialWorkReportService.getofficialworkreportdata(Global.BASE_OfficialWorkReportAPI_ENDPOINT, entityobject).
            subscribe(data =>
            {
                this.OfficialWorkReportBindList = data
                this.JumpOnPage(1);
            },

        );

    }

    onSubmit(entityobject : IParameterModel)
    {

        debugger;

        entityobject.UserId = 21;
        entityobject.UserType = 'Admin';

        
        // check search date wise or monthwise
        if ($("#rbtdate").prop("checked"))
        {
            entityobject.MonthWise = false;
        }
        else
        {
            entityobject.MonthWise = true;
            entityobject.FromMonth = this.frommonth.toString();
            entityobject.FromYear = this.fromyear.toString();
        }

         // check sorting date wise or name
        if ($("#rbtdatesort").prop("checked"))
        {
            entityobject.ReportSort = 'Date';
        }
        else
        {
            entityobject.ReportSort = 'Name';
        }


        // check approve status 
        if ($("#rbtall").prop("checked"))
        {
            entityobject.Sort = 3;
        }
        else if ($("#rbtapproved").prop("checked"))
        {
            entityobject.Sort = 1;
        }
        else if ($("#rbtunapproved").prop("checked"))
        {
            entityobject.Sort = 0;
        }
        else
        {
            entityobject.Sort = 2;
        }
        this.GetOfficialWorkReport(entityobject);
        $("html, body").animate({ scrollTop: 500 }, 150);
        
    }

    JumpOnPage(PageNumber: number)
    {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.OfficialWorkReportBindList);
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


}






