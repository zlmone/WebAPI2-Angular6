import { Component, OnInit, ViewChild } from '@angular/core';
import { LateEarlyReportService } from '../../../Service/Report/Attendance/LateEarlyReport.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { DBOperation } from '../../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../../Shared/global';
import { PagerService } from '../../../Shared/pager.index';
import { IEmployee } from '../../../Model/Report/Attendance/LateEarlyReport';
import { ICompany } from '../../../Model/Report/Attendance/LateEarlyReport';
import { IDepartment } from '../../../Model/Report/Attendance/LateEarlyReport';
import { IYear } from '../../../Model/Report/Attendance/LateEarlyReport';
import { ILateEarlyReport } from '../../../Model/Report/Attendance/LateEarlyReport';
import { ParameterModel } from '../../../Model/Report/Attendance/LateEarlyReport';
import { Pipe } from '@angular/core';
import { CommonHelperService } from '../../../Shared/CommonHelper.service';
@Component
    ({
        providers: [LateEarlyReportService],
        templateUrl: 'app/Components/Report/Attendance/LateEarlyReport.component.html'
    })

export class LateEarlyReportComponent implements OnInit
{
    @ViewChild('modal') modal: ModalComponent;

    constructor(private fb: FormBuilder, private _LateEarlyReportService: LateEarlyReportService, private pagerService: PagerService, private _CommonHelperService: CommonHelperService ) { }

    pager: any = {};
    pagedItems: any[];
    CurrentRecordsPerPage: number = 10;
    Department: IDepartment[];
    Employee: IEmployee[];
    Employees: IEmployee[];
    Company: ICompany[];
    Year: IYear[];
    EmployeeId: number = 0;
    DepartmentId: number = 0;
    CompanyId: number = 0;

    LateEarlyReport: ILateEarlyReport;
    LateEarlyReports: ILateEarlyReport[];

    ParameterModel: ParameterModel;
    
    modalTitle: string;
    InLoading: boolean;
    frommonth: number = new Date().getMonth() + 1;
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

        this.Department =
            [({
            Department_Name: '',
            Id:0
            })]

        this.Company =
            [({
                CompanyName:'',
                Id: 0
            })]

        this.ParameterModel =
         {
            Id: 0,
            Fromdate: new Date(),
            Todate: new Date(),
            MonthWise: false,
            FromMonth: '',
            FromYear:''
        }

        this.GetDepartment();
        this.GetEmployee();
        this.GetCompany();
        this.GetYear();

    }

    ToogleMyProfile() {
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

    ToogleHideShowOption()
    {




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

    ToogleDateOption()
    {
        if ($("#rbtdate").prop("checked"))
        {
            $("#searchbydate").show();
            $("#searchbymonth").hide();
        }
        else
        {
            $("#searchbydate").hide();
            $("#searchbymonth").show();
        }
    }

    GetDepartment()
    {
        this._LateEarlyReportService.getdepartment(Global.BASE_LateEarlyReport_ENDPOINT).
            subscribe(department =>
            {
                this.Department = department;
            },

        );

    }

    GetEmployee()
    {
        this._LateEarlyReportService.getemployee(Global.BASE_LateEarlyReport_ENDPOINT).
            subscribe(employee =>
            {
                this.Employee = employee
            },

        );

    }

    GetCompany() {
        this._LateEarlyReportService.getcompany(Global.BASE_LateEarlyReport_ENDPOINT).
            subscribe(company =>
            {
                this.Company = company;
            },

        );

    }

    GetYear()
    {
        this._LateEarlyReportService.getyear(Global.BASE_LateEarlyReport_ENDPOINT).
            subscribe(year =>
            {
                this.Year = year
            },

        );

    }

    GetIdByDepartment(Id: number, Fromdate: Date, Todate: Date, MonthWise: boolean, FromMonth: string, FromYear: string)
    {
        this.LateEarlyReports = null;
        this.InLoading = true;
        this._LateEarlyReportService.getemployeeidbydepartment(Global.BASE_LateEarlyReport_ENDPOINT, Id, Fromdate, Todate, MonthWise, FromMonth, FromYear).
            subscribe(lateearlyreports =>
            {
                this.LateEarlyReports = lateearlyreports;
                this.JumpOnPage(1);
                this.InLoading = false;
            },
        );

    }

    GetIdByEmployee(Id: number, Fromdate: Date, Todate: Date, MonthWise: boolean, FromMonth:string,FromYear: string)
    {
        this.LateEarlyReports = null;
        this.InLoading = true;
        this._LateEarlyReportService.getemployeeidbyemployee(Global.BASE_LateEarlyReport_ENDPOINT, Id, Fromdate, Todate, MonthWise, FromMonth, FromYear).
            subscribe(lateearlyreports =>
            {
                this.LateEarlyReports = lateearlyreports;
                this.JumpOnPage(1);
                this.InLoading = false;
            },

        );

    }

    GetIdByCompany(Id: number, Fromdate: Date, Todate: Date, MonthWise: boolean, FromMonth: string, FromYear: string)
    {
        this._LateEarlyReportService.getemployeeidbycompany(Global.BASE_LateEarlyReport_ENDPOINT, Id, Fromdate, Todate, MonthWise, FromMonth, FromYear).
            subscribe(employees =>
            {
                this.Employees = employees
                this.JumpOnPage(1);
            },

        );

    }

    GetIdBySelectAll(Id: number, Fromdate: Date, Todate: Date, MonthWise: boolean, FromMonth: string, FromYear: string)
    {
        this._LateEarlyReportService.getemployeeidbyselectall(Global.BASE_LateEarlyReport_ENDPOINT, Id, Fromdate, Todate, MonthWise, FromMonth, FromYear).
            subscribe(employees =>
            {
                this.Employees = employees
                this.JumpOnPage(1);
            },
        );
    }

    onSubmit(formData: ParameterModel)
    {
        if (formData.Id != 0)
        {
            this.Employees = null;

            if ($("#rbtemployee").prop("checked"))
            {
                if ($("#rbtdate").prop("checked"))
                {
                    formData.MonthWise = false;
                }
                else
                {
                    formData.MonthWise = true;
                    formData.FromMonth = this.frommonth.toString();
                    formData.FromYear = this.fromyear.toString();
                }
                this.GetIdByEmployee(formData.Id, formData.Fromdate, formData.Todate, formData.MonthWise, formData.FromMonth, formData.FromYear);
                $("html, body").animate({ scrollTop: 500 }, 150);
            }
            else if ($("#rbtdepartment").prop("checked"))
            {
                if ($("#rbtdate").prop("checked"))
                {
                    formData.MonthWise = false;
                }
                else
                {
                    formData.MonthWise = true;
                    formData.FromMonth = this.frommonth.toString();
                    formData.FromYear = this.fromyear.toString();
                }
                this.GetIdByDepartment(formData.Id, formData.Fromdate, formData.Todate, formData.MonthWise, formData.FromMonth, formData.FromYear);
                $("html, body").animate({ scrollTop: 500 }, 150);
            }

            else if ($("#rbtcompany").prop("checked"))
            {
                if ($("#rbtdate").prop("checked"))
                {
                    formData.MonthWise = false;
                }
                else
                {
                    formData.MonthWise = true;
                    formData.FromMonth = this.frommonth.toString();
                    formData.FromYear = this.fromyear.toString();
                }
                this.GetIdByCompany(formData.Id, formData.Fromdate, formData.Todate, formData.MonthWise, formData.FromMonth, formData.FromYear);
                $("html, body").animate({ scrollTop: 500 }, 150);
            }
        }
        else
        {
            if ($("#rbtdate").prop("checked"))
                {
                    formData.MonthWise = false;
                }
                else
                {
                    formData.MonthWise = true;
                    formData.FromMonth = this.frommonth.toString();
                    formData.FromYear = this.fromyear.toString();
            }
                this.GetIdBySelectAll(formData.Id, formData.Fromdate, formData.Todate, formData.MonthWise, formData.FromMonth, formData.FromYear);
                $("html, body").animate({ scrollTop: 500 }, 150);
            }
    }

    JumpOnPage(PageNumber: number)
    {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.LateEarlyReports);
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

}


