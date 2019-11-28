import { Component, OnInit, ViewChild } from '@angular/core';
import { OutReportService } from '../../../Service/Report/Attendance/OutReport.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { DBOperation } from '../../../Shared/enum';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../../Shared/global';
import { PagerService } from '../../../Shared/pager.index';
import { IDepartment } from '../../../Model/Report/Attendance/OutReport';
import { IEmployeeId } from '../../../Model/Report/Attendance/OutReport';
import { IEmployee } from '../../../Model/Report/Attendance/OutReport';
import { ICompany } from '../../../Model/Report/Attendance/OutReport';;
import { ILineManager } from '../../../Model/Report/Attendance/OutReport';;
import { ICalTotalAttendance } from '../../../Model/Report/Attendance/OutReport';
import { IOutReport } from '../../../Model/Report/Attendance/OutReport';
import { IOutReportBindReport } from '../../../Model/Report/Attendance/OutReport';
import { ExcelService } from '../../../Shared/exportexcel.service';
import { DailyEntrysheetComponent } from '../../../Components/Report/Attendance/DailyEntrysheet.component';
import { CommonHelperService } from '../../../Shared/CommonHelper.service';

@Component
    ({
        providers: [OutReportService],
        templateUrl: 'app/Components/Report/Attendance/OutReport.component.html'
    })

export class OutReportComponent implements OnInit
{
    AttendanceDeparts: IDepartment;
    AttendanceDepart: IDepartment[];
    EmployeeIdByLM: IEmployeeId[];
    AttendanceEmployee: IEmployee[];
    AttendanceCompany: ICompany[];
    AttendanceLineManager: ILineManager[];
    AttendancebindData: ICalTotalAttendance[];
    AttendanceData: ICalTotalAttendance[];
    AttendanceCalculates: ICalTotalAttendance;

    // modal object

    outreports: IOutReportBindReport[];
    json: any[];
    outreport: IOutReport;

    @ViewChild('modal') modal: ModalComponent;

    msg: string;
    msgtimevalidation: string;
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
    pagedItemscount: IOutReportBindReport[];
    cnttotal: number;
    PagerInformation: string;
    nums: number[];

    fulldate: string;
    newdate: string;
    newmonth: string;
    newyear: string;
    Transaction_Id: number;
    Date: string;
    datetoday: string;
    InLoading: boolean;

    constructor(private fb: FormBuilder, private _OutReportService: OutReportService, private _ExcelService: ExcelService, private pagerService: PagerService, private _CommonHelperService: CommonHelperService )
    {

    }
    // Load Event Function
    
    ngOnInit()
    {
        this._CommonHelperService.ToogleMenu();
        this.InLoading = false;

        this.AttendanceDepart =
            [({
                Id: 0,
                Department_Name: '',
                mode: ''
            })];

        this.AttendanceEmployee =
            [({
                Id: 0,
                Employee_Name: '',
                mode: ''
            })];

        this.AttendanceCompany =
            [({
                Id: 0,
                CompanyName: '',
                mode: ''
            })];

        this.AttendanceLineManager =
            [({
                Id: 0,
                LineManager: '',
                mode: ''
            })];

        this.AttendancebindData =
            [({
                EmployeeID: 0,
                EmployeeName: '',
                Date: '',
                ToDate: '',
                InTimeID: 0,
                InTIme: null,
                OutTimeID: 0,
                OutTIme: null,
                LunchOutTimeID: 0,
                LunchOutTIme: null,
                LunchInTimeID: 0,
                LunchInTIme: null,
                OtherTimeID: 0,
                TotalOtherTime: '',
                TotalOfficeTime: '',
                TotalLunchTime: '',
                TotalBreakTime: '',
                TotalWorkingTime: '',
                TotalWorksheetHours: 0,
                IsInOffice: false,
                IsInBreak: false,
                IsInLunch: false,
                IsInMeeting: false,
                IsInOfficeWork: false,
                Days: '',
                ImportRemarks: '',
                EmployeeCode: '',
                MMDDYYYY_DateFormat: ''
            })];

        this.outreport =
            {
                EmployeeId: 0,
                Active: 0,
                AllDate: false,
                Consolidated: '',
                Employeelist: '',
                FromDate: new Date(),
                Minute: 0,
                OutType: '',
                Sort: '',
                ToDate: new Date()
            }

        this.GetEmployee();
        this.GetDepartment();
        this.GetCompany();
        this.GetLineManager();
    }

    // Hide & Show Element jQuery Function

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

        if ($("#rbtdepartment").prop('checked'))
        {
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
        else
        {
            $("#ddldepartment").hide();
            $("#ddlemployee").show();
            $("#chkallemployeediv").show();
            $("#ddlcompany").hide();
            $("#ddllinemanager").hide();
        }


    }

    ToogleAllDate() {
        if ($("#alldate").prop('checked')) {
            $("#fromdate").attr("disabled", "disabled");
            $("#todate").attr("disabled", "disabled");
        }
        else {
            $("#fromdate").removeAttr("disabled");
            $("#todate").removeAttr("disabled");
        }
    }

    ToogleAllTypesofOut() {
        if ($("#rbtall").prop('checked')) {

            $("#chkall").attr("disabled", "disabled");
            $("#chklunch").attr("disabled", "disabled");
            $("#chkother").attr("disabled", "disabled");
            $("#chkmeeting").attr("disabled", "disabled");
            $("#chkofficeout").attr("disabled", "disabled");
            $("#chkall").attr("checked", "checked");
            $("#chklunch").prop("checked", false);
            $("#chkother").prop("checked", false);
            $("#chkmeeting").prop("checked", false);
            $("#chkofficeout").prop("checked", false);

        }
        else {
            $("#chkall").attr("disabled", "disabled");
            $("#chkall").removeAttr("checked");
            $("#chklunch").removeAttr("disabled");
            $("#chkother").removeAttr("disabled");
            $("#chkmeeting").removeAttr("disabled");
            $("#chkofficeout").removeAttr("disabled");
        }
    }

    ToogleMinute() {
        if ($("#toogleminute").prop('checked'))
        {
            $("#txtminute").removeAttr("disabled");
        }
        else {
            $("#txtminute").attr("disabled", "disabled");
        }
    }

    // Dropdown bind Function

    GetEmployee()
    {
        this._OutReportService.getemployee(Global.BASE_OutReportApi_ENDPOINT).
            subscribe(employee =>
            {
                this.AttendanceEmployee = employee
            },

        );

    }

    GetAllEmployee() {
        if ($("#chkallemployee").prop("checked"))
        {
            this._OutReportService.getallemployee(Global.BASE_OutReportApi_ENDPOINT).
                subscribe(allemployee =>
                {
                    this.AttendanceEmployee = allemployee
                },

            );
        }
        else {
            this.GetEmployee();
        }



    }

    GetDepartment()
    {
        this._OutReportService.getdepartment(Global.BASE_OutReportApi_ENDPOINT).
            subscribe(department =>
            {
                this.AttendanceDeparts = department
            },

        );

    }

    GetCompany()
    {
        this._OutReportService.getcompany(Global.BASE_OutReportApi_ENDPOINT).
            subscribe(companydata =>
            {
                this.AttendanceCompany = companydata
            },

        );

    }

    GetLineManager()
    {
        this._OutReportService.getlinemanager(Global.BASE_OutReportApi_ENDPOINT).
            subscribe(linemanagaer =>
            {
                this.AttendanceLineManager = linemanagaer
            },

        );

    }

    GetEmployeeIdByLM(LineManager: number) {
        if ($("#ddllinemanager").val() != '0') {
            this._OutReportService.getemployeeidbylm(Global.BASE_OutReportApi_ENDPOINT, LineManager).
                subscribe(emplist => {
                    this.EmployeeIdByLM = emplist;
                },
            );
        }
    }

    GetEmployeeIdByCompany(Company: number) {
        if ($("#ddlcompany").val() != '0') {
            this._OutReportService.getemployeeidbycompany(Global.BASE_OutReportApi_ENDPOINT, Company).
                subscribe(emplist => {
                    this.EmployeeIdByLM = emplist;
                },
            );
        }
    }

    GetEmployeeIdByDepartment(ParentId: number)
    {
        if ($("#ddldepartment").val() != '0')
        {
            this._OutReportService.getemployeeidbydepartment(Global.BASE_OutReportApi_ENDPOINT, ParentId).
                subscribe(emplist =>
                {
                    this.EmployeeIdByLM = emplist;
                },
            );
        }
    }

    // Post Report By Selected Category

    onSubmit(entityobject: IOutReport)
    {
        $("html, body").animate({ scrollTop: 590 }, 250);
        entityobject.Employeelist = '';

        if ($("#rbtlinemanager").prop("checked") && $("#ddllinemanager").val() != '0' && $("#ddllinemanager").val() != '' && $("#ddllinemanager").val() != undefined)
        {
            for (let item of this.EmployeeIdByLM)
            {
                entityobject.Employeelist += item.Id + ','
            }
        }
        else if ($("#rbtcompany").prop("checked") && $("#ddlcompany").val() != '0' && $("#ddlcompany").val() != '' && $("#ddlcompany").val() != undefined)
        {
            
            for (let item of this.EmployeeIdByLM)
            {
                entityobject.Employeelist += item.Id + ','
            }
        }
        else if ($("#rbtdepartment").prop("checked") && $("#ddldepartment").val() != '0' && $("#ddldepartment").val() != '' && $("#ddldepartment").val() != undefined)
        {
            for (let item of this.EmployeeIdByLM)
            {
                entityobject.Employeelist += item.Id + ','
            }
        }
        else if ($("#ddlemployee").val() == '0' || $("#ddldepartment").val() == '0' || $("#ddlcompany").val() == '0' || $("#ddllinemanager").val() == '0' )
        {
            entityobject.EmployeeId = 0;
        }
        else
        {
            entityobject.Employeelist = entityobject.EmployeeId.toString();
        }




        if ($("#toogleminute").prop("checked"))
        {
            entityobject.Minute = $("#txtminute").val();
        }
        else
        {
            entityobject.Minute = 0;
        }


        if ($("#chkallemployee").prop("checked"))
        {
            entityobject.Active = 1;
        }
        else
        {
            entityobject.Active = 0;
        }


        if ($("#alldate").prop("checked"))
        {
            entityobject.AllDate = true;
        }


        if ($("#rbtall").prop("checked"))
        {
            entityobject.OutType = 'All'
        }
        else if ($("#rbtother").prop("checked"))
        {
            if ($("#chklunch").prop("checked") && $("#chkother").prop("checked") && $("#chkmeeting").prop("checked") && $("#chkofficeout").prop("checked"))
            {
                entityobject.OutType = 'Lunch' + ',' + 'Other Breaks' + ',' + 'Meeting' + ',' + 'office Out';
            }
            else if ($("#chklunch").prop("checked") && $("#chkother").prop("checked") && $("#chkmeeting").prop("checked")) {
                entityobject.OutType = 'Lunch' + ',' + 'Other Breaks' + ',' + 'Meeting';
            }
            else if ($("#chkother").prop("checked") && $("#chkmeeting").prop("checked") && $("#chkofficeout").prop("checked")) {
                entityobject.OutType = 'Other Breaks' + ',' + 'Meeting' + ',' + 'office Out';
            }
            else if ($("#chklunch").prop("checked") && $("#chkother").prop("checked")) {
                entityobject.OutType = 'Lunch' + ',' + 'Other Breaks';
            }
            else if ($("#chklunch").prop("checked") && $("#chkmeeting").prop("checked")) {
                entityobject.OutType = 'Lunch' + ',' + 'Meeting';
            }
            else if ($("#chklunch").prop("checked") && $("#chkofficeout").prop("checked")) {
                entityobject.OutType = 'Lunch' + ',' + 'office Out';
            }
            else if ($("#chkother").prop("checked") && $("#chkmeeting").prop("checked")) {
                entityobject.OutType = 'Other Breaks' + ',' + 'Meeting';
            }
            else if ($("#chkother").prop("checked") && $("#chkofficeout").prop("checked")) {
                entityobject.OutType = 'Other Breaks' + ',' + 'office Out';
            }
            else if ($("#chkmeeting").prop("checked") && $("#chkofficeout").prop("checked")) {
                entityobject.OutType = 'Meeting' + ',' + 'office Out';
            }
            else if ($("#chklunch").prop("checked")) {
                entityobject.OutType = 'Lunch'
            }
            else if ($("#chkother").prop("checked")) {
                entityobject.OutType = 'Other Breaks'
            }
            else if ($("#chkmeeting").prop("checked")) {
                entityobject.OutType = 'Meeting'
            }
            else if ($("#chkofficeout").prop("checked")) {
                entityobject.OutType = 'office Out'
            }

        }

        if (($("#toogleminute").prop("checked"))) {
            entityobject.Minute = ($("#txtminute").val());
            entityobject.Consolidated = 'Date';
            entityobject.Sort = 'Name';
        }
        else {
            entityobject.Minute = 0;
        }

        if ($("#alldate").prop("checked")) {
            entityobject.AllDate = true;
        }
        else {
            entityobject.AllDate = false;
        }



        if ($("#rbtdetailed").prop("checked")) {
            entityobject.Consolidated = 'All'
        }


        if ($("#rbtconsolidated").prop("checked")) {
            if ($("#rbtnone").prop("checked")) {
                entityobject.Consolidated = 'None';
            }
            else if ($("#rbtname").prop("checked")) {
                entityobject.Consolidated = 'Name'
            }
            else if ($("#rbttype").prop("checked")) {
                entityobject.Consolidated = 'Type'
            }
            else {
                entityobject.Consolidated = 'Date'
            }
        }

        if ($("#rbtsortname").prop("checked")) {
            entityobject.Sort = 'Name'
        }
        else if ($("#rbtsortdate").prop("checked")) {
            entityobject.Sort = 'Date'
        }
        else if ($("#rbtsorttype").prop("checked")) {
            entityobject.Sort = 'Type'
        }
        else {
            entityobject.Sort = 'Duration'
        }

        if ($("#toogleminute").prop("checked"))
        {
            entityobject.Consolidated = 'Date';
        }
        this.InLoading = true;
        this._OutReportService.getoutreportdata(Global.BASE_OutReportApi_ENDPOINT, entityobject).
            subscribe(reportdata =>
            {
                this.outreports = reportdata;
                this.JumpOnPage(1);
                $("html, body").animate({ scrollTop: 590 }, 250);
                this.InLoading = false;
            },

        );

        if (entityobject.Consolidated == 'None' || entityobject.Consolidated == 'Name' || entityobject.Consolidated == 'Type' || entityobject.Consolidated == 'Date')
        {
            $("#headerstarttime").hide();
            $("#headerendtime").hide();
            $("#headerremarks").hide();
            $("#col2starttime").hide();
            $("#col2endtime").hide();
            $("#col2remarks").hide();
        }
        else
        {
            $("#headerstarttime").show();
            $("#headerendtime").show();
            $("#headerremarks").show();
            $("#col2starttime").show();
            $("#col2endtime").show();
            $("#col2remarks").show();
        }
    }

    // pagination Function

    JumpOnPage(PageNumber: number)
    {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.outreports);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
        this.pagedItemscount = this.pagerService.pagedItems;
        var total = 0;
        for (let item of this.pagedItemscount)
        {
            total += item.Duration;
            this.cnttotal = total;
        }
    }

    ChangeRecordsPerPage(RecordsPerPage: number)
    {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0)
        {
            this.JumpOnPage(1);
        }
    }

    ExportToExcel()
    {
        if (this.outreports!=null && this.outreports.length > 0)
        {
            this._ExcelService.exportAsExcelFile(this.outreports, 'OutReport');
        }
        else
        {
            alert("No Record Found !");
        }

    }
    
}


