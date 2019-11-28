import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeDashboardHeartBeatReportService } from '../../../Service/Report/Attendance/EmployeeDashboardHeartBeat.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { DBOperation } from '../../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../../Shared/global';
import { PagerService } from '../../../Shared/pager.index';
import { IEmployee } from '../../../Model/Report/Attendance/EmployeeDashboardHeartBeatReport';
import { IEmployeeDashboardHeartBeat } from '../../../Model/Report/Attendance/EmployeeDashboardHeartBeatReport';
import { IParameterModel } from '../../../Model/Report/Attendance/EmployeeDashboardHeartBeatReport';
import { IYear } from '../../../Model/Report/Attendance/EmployeeDashboardHeartBeatReport';
import { CommonHelperService } from '../../../Shared/CommonHelper.service';
@Component
    ({
        providers: [EmployeeDashboardHeartBeatReportService],
        templateUrl: 'app/Components/Report/Attendance/EmployeeDashboardHeartBeatReport.component.html'
    })

export class EmployeeDashboardHeartBeatReportComponent implements OnInit
{


    @ViewChild('modal') modal: ModalComponent;

    constructor(private fb: FormBuilder, private _EmployeeDashboardHeartBeatReportService: EmployeeDashboardHeartBeatReportService, private pagerService: PagerService, private _CommonHelperService: CommonHelperService) { }

    pager: any = {};
    pagedItems: any[];
    CurrentRecordsPerPage: number = 10;
    Employee: IEmployee[];
    EmployeeDashboardHeartBeat: IEmployeeDashboardHeartBeat;
    EmployeeDashboardHeartBeats: IEmployeeDashboardHeartBeat[];
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
                ConsolidateBy: '',
                ViewBy:'',
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

        if ($("#rbtconsolidated").prop("checked"))
        {
            $("#panelconsolidate").show();
        }
        else
        {
            $("#panelconsolidate").hide();
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

    GetEmployee() {
        this._EmployeeDashboardHeartBeatReportService.getemployee(Global.BASE_EmployeeDashboarHeartBeatAPI_ENDPOINT).
            subscribe(employee =>
            {
                this.Employee = employee
            },

        );

    }

    GetYear()
    {
        this._EmployeeDashboardHeartBeatReportService.getyear(Global.BASE_EmployeeDashboarHeartBeatAPI_ENDPOINT).
            subscribe(year =>
            {
                this.Year = year
            },

        );

    }

    onSubmit(ParameterModel: IParameterModel)
    {
        if ($("#rbtconsolidated").prop("checked"))
        {
            $("#headerouttype").hide();
            $("#headerstarttime").hide();
            $(".inputcentetext").hide();
        }
        else
        {
            $("#headerouttype").show();
            $("#headerstarttime").show();
            $(".inputcentetext").show();
        }


        if ($("#rbtdate").prop("checked"))
        {
            ParameterModel.MonthWise = false;
        }
        else
        {
            ParameterModel.MonthWise = true;
        }

        if ($("#rbtdeatil").prop("checked"))
        {
            ParameterModel.ViewBy = 'detail';
        }
        else
        {
            ParameterModel.ViewBy = '';

            if ($("#rbtnone").prop("checked"))
            {
                ParameterModel.ConsolidateBy = 'None'
               
            }
            else if ($("#rbtname").prop("checked"))
            {
                ParameterModel.ConsolidateBy = 'Name'
            }
            else
            {
                ParameterModel.ConsolidateBy = 'Date'
            }
        }

        if ($("#rbtsortdate").prop("checked"))
        {
            ParameterModel.OrderBy = 'Date';
        }
        else
        {
            ParameterModel.OrderBy = 'Name';
        }

        ParameterModel.LoginUserId = 158;
        this.InLoading = true;
        this._EmployeeDashboardHeartBeatReportService.getemployeedashboardheartbeatreport(Global.BASE_EmployeeDashboarHeartBeatAPI_ENDPOINT, ParameterModel).
            subscribe(empdashboardheartbeat =>
            {
                this.EmployeeDashboardHeartBeats = empdashboardheartbeat;
                this.JumpOnPage(1);
                $("html, body").animate({ scrollTop: 500 }, 150);
                this.InLoading = false;
            }, );

    }

    JumpOnPage(PageNumber: number)
    {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.EmployeeDashboardHeartBeats);
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