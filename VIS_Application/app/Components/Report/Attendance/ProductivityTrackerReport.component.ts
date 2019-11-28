import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // fixed typo
import { Global } from '../../../Shared/global';
import { PagerService } from '../../../Shared/pager.index';
import { Router } from '@angular/router';
import { ProductivityTrackerReportService } from '../../../Service/Report/Attendance/ProductivityTrackerReport.service';
import { IDepartment, IEmployee, ILineManager, ILookup, IProductivityTracker } from '../../../Model/Report/Attendance/ProductivityTracker';

@Component
({
    providers: [ProductivityTrackerReportService],
    templateUrl: 'app/Components/Report/Attendance/ProductivityTrackerReport.component.html'
})

export class ProductivityTrackerReportcomponent implements OnInit {
    pager: any = {};
    pagedItems: any[];
    CurrentRecordsPerPage: number = 10;
    InLoading: boolean;
    msg: string;
    UserType: string;
    InActiveEmp: boolean;
    Department: IDepartment[];
    Employees: IEmployee[];
    LineManager: ILineManager[];
    Lookup: ILookup[];
    ProductivityTracker: IProductivityTracker[];
    FromDate: string;
    ToDate: string;
    Mode: string;
    OutIds: string;

    constructor(private fb: FormBuilder, private router: Router, private pagerService: PagerService, private _ProductivityTrackerReportService: ProductivityTrackerReportService) {

    }

    ngOnInit()
    {
        $("#radEmployee").prop("checked", true);
        $("#radDate").prop("checked", true);
        $("#radAll").prop("checked", true);
        $("#raddetail").prop("checked", true);
        $("#radsortname").prop("checked", true);
        this.HideLMDPOA();
        this.showfromtoDate();
        this.TypeAll();
        this.ViewDetailed();
        this.FillEmployee();
        this.FillDepartment();
        this.FillLineManager();
        this.FillLookup();
        this.FillOverall();
        this.FillYear();
    }
    HideLMDPOA(): void {
        if ($("#radEmployee").prop("checked", true)) {
            $('#emp').show();
            $('#empAll').show();
            $('#LineManager').hide();
            $('#Department').hide();
        }
    }
    HideDPOAEM(): void {
        $('#emp').hide();
        $('#empAll').hide();
        $('#Department').hide();
        $('#LineManager').show();
    }
    HideOAEMLM(): void {
        $('#LineManager').hide();
        $('#emp').hide();
        $('#empAll').hide();
        $('#Department').show();
    }
    HideEMLMDP(): void {
        $('#Department').hide();
        $('#LineManager').hide();
        $('#emp').hide();
        $('#empAll').hide();
    }

    showfromtoDate(): void
    {
        if ($("#radDate").prop("checked", true))
        {
            $('#date').show();
            $('#month').hide();
            //var Mon = new Date().getMonth();
            //var Year = new Date().getFullYear();
            //this.FromDate = new Date(Year, Mon, 1).toString();
            //this.ToDate = new Date(Year, Mon + 1,0).toString();
        }
    }
    ShowMonthYear(): void
    {
        $('#date').hide();
        $('#month').show();
    }
    ShowPreviousWorkday(): void
    {
        if ($("#radPrevious").prop("checked"))
        {
            $('#date').show();
            $('#month').hide();
            //var day = new Date().getDate() - 1;
            //var Mon = new Date().getMonth();
            //var Year = new Date().getFullYear();
            //this.FromDate = new Date(Year, Mon, day).toString();
            //this.ToDate = new Date(Year, Mon, day).toString();
        }
    }
    ShowToday(): void {
        if ($("#radToday").prop("checked", true))
        {
            $('#date').show();
            $('#month').hide();
            //this.FromDate = new Date().toString();
            //this.ToDate = new Date().toString();
        }
    }

    TypeAll(): void
    {
        if ($("#radAll").prop("checked", true))
        {
            $("#chkall").prop("checked", true);
            $("#chkall").prop("disabled", true);
            $("#chkouttype").prop("disabled", true);
            //$('#chkall').prop('disabled', true);
            //$('#chklunch').prop('disabled', true);
            //$('#chkother').prop('disabled', true);
            //$('#chkmeeting').prop('disabled', true);
            //$('#chkofficial').prop('disabled', true);
            //$('#chkidle').prop('disabled', true);
        }
    }

    TypeOther(): void
    {
        $("#chkall").prop("checked", false);
        $("#chkall").prop("disabled", true);
        $("#chkouttype").prop("disabled", false);
        //$("#chkall").prop("checked", false);
        //$('#chkall').prop('disabled', true);
        //$('#chklunch').prop('disabled', false);
        //$('#chkother').prop('disabled', false);
        //$('#chkmeeting').prop('disabled', false);
        //$('#chkofficial').prop('disabled', false);
        //$('#chkidle').prop('disabled', false);
    }

    ViewDetailed(): void {
        if ($("#raddetail").prop("checked", true))
        {
            $('#radnoneview').empty();
            $('#radnameview').empty();
            $('#radtypeview').empty();
            $('#radDateview').empty();
            $('#viewDetails').hide();
        }
    }
    ViewConsolidated(): void
    {
        if ($("#radconsolidated").prop("checked", true))
        {
            $('#viewDetails').show();
            $("#radnoneview").prop("checked", true);
        }
    }
    //-------------------- Change Event---------------------//
    AllEmployee(event)
    {
        if ($("#chkInActive").prop("checked", true))
        {
            this._ProductivityTrackerReportService.FillAllEmployees(Global.BASE_ProductivityTrackerAPI_ENDPOINT, 21, true)
                .subscribe(data =>
                {
                    this.Employees = data;
                    this.InLoading = false;
                },
                error =>
                {
                    this.msg = error;
                });
        }
    }
    //-------------------- Change Event---------------------//
    FillEmployee(): void
    {
        if (this.InActiveEmp == null)
        {
            this.InActiveEmp = true;
        }
        this.UserType = "admin";

        if (this.UserType.toLowerCase() == "gh" || this.UserType.toLowerCase() == "admin" || this.UserType.toLowerCase() == "hr" || this.UserType.toLowerCase() == "payroll")
        {
            this._ProductivityTrackerReportService.FillEmployee(Global.BASE_ProductivityTrackerAPI_ENDPOINT, 21, "allemp", this.InActiveEmp)
                .subscribe(data =>
                {
                    this.Employees = data;
                    this.InLoading = false;
                },
                error =>
                {
                    this.msg = error;
                });
        }
        else if (this.UserType.toLowerCase() == "bh" || this.UserType.toLowerCase() == "dh") {
            this._ProductivityTrackerReportService.FillEmployee(Global.BASE_ProductivityTrackerAPI_ENDPOINT, 21, "self", true)
                .subscribe(data => {
                    this.Employees = data;
                    this.InLoading = false;
                },
                error => {
                    this.msg = error;
                });
        }
        else if (this.UserType.toLowerCase() == "PMRole")  // else if (Session["PMRole"] != null) Use Session in this condition...
        {
            this._ProductivityTrackerReportService.FillEmployee(Global.BASE_ProductivityTrackerAPI_ENDPOINT, 21, "pmemp", true)
                .subscribe(data => {
                    this.Employees = data;
                    this.InLoading = false;
                },
                error => {
                    this.msg = error;
                });
        }
        else {
            this._ProductivityTrackerReportService.FillEmployee(Global.BASE_ProductivityTrackerAPI_ENDPOINT, 21, "self", true)
                .subscribe(data => {
                    this.Employees = data;
                    this.InLoading = false;
                },
                error => {
                    this.msg = error;
                });
        }
    }
    FillLineManager(): void {
        this._ProductivityTrackerReportService.FillLineManager(Global.BASE_ProductivityTrackerAPI_ENDPOINT, 21, true) // True Get From Employee_ModuleAccess -> ViewCompEvent value(In Old VIS Store in Session).
            .subscribe(data =>
            {
                this.LineManager = data;
                this.InLoading = false;
            },
            error => {
                this.msg = error;
            });
    }
    FillDepartment(): void {
        this._ProductivityTrackerReportService.FillDepartment(Global.BASE_ProductivityTrackerAPI_ENDPOINT)
            .subscribe(data =>
            {
                this.Department = data;
                this.InLoading = false;
            },
            error => {
                this.msg = error;
            });
    }
    FillOverall(): void
    {
        this._ProductivityTrackerReportService.FillOverall(Global.BASE_ProductivityTrackerAPI_ENDPOINT)
            .subscribe(data =>
            {
                this.Department = data;
                this.InLoading = false;
            },
            error => {
                this.msg = error;
            });
    }
    FillLookup(): void
    {
        this._ProductivityTrackerReportService.FillLookup(Global.BASE_ProductivityTrackerAPI_ENDPOINT)
            .subscribe(data =>
            {
                this.Lookup = data;
                this.InLoading = false;
            },
            error => {
                this.msg = error;
            });
    }
    FillYear(): void
    {
        this._ProductivityTrackerReportService.FillLookup(Global.BASE_ProductivityTrackerAPI_ENDPOINT)
            .subscribe(data =>
            {
                this.Lookup = data;
                this.InLoading = false;
            },
            error =>
            {
                this.msg = error;
            });
    }

    ToogleMyProfile()
    {
        $("#ProductivityTrackerReport").slideToggle(300);
    }
    CloseWidgetProfile()
    {
        $("#ProductivityTrackerReport").hide(300);
    }
    JumpOnPage(PageNumber: number)
    {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.ProductivityTracker);
        this.pager = this.pagerService.pager;
        this.pagedItems = null;
        this.pagedItems = this.pagerService.pagedItems;
    }
    ChangeRecordsPerPage(RecordsPerPage: number)
    {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    }

    GetoutId(): void
    {
        this.OutIds = '';
        for (var i = 0; i < this.Lookup.length; i++)
        {
            this.OutIds += this.Lookup[i].Id + ','; 
        }
        this.OutIds = this.OutIds.substring(1, this.OutIds.lastIndexOf(","));
    }
    validateDate(): void
    {
        if ($("#txtdatefrom").val() != '')
        {
            if ($("#txtdateto").val() != '')
            {
                if ($("txtdatefrom").val() > $("#txtdateto").val())
                {
                    alert("Select Proper Dates");
                }
                else
                {
                    alert("Please select To dates");
                }
            }
        }
    }
    onSubmit(formData: any)
    {
        var str;
        var chk;
        if (formData.Employee > 0)
        {
            str = formData.Employee;
        }
        if ($("#raddetail").val() == 'Detailed')
        {
            this.Mode = "Detail";
        }
        else if ($("#radconsolidated").val() == 'Consolidated')
        {
            this.Mode = "consolidate";
        }
        if ($("#chkall").prop("checked", true))
        {
            chk = "0";
        }
        else if ($("#chkouttype").prop("checked", true))
        {
            chk = "1";
        }
        if (!this.validateDate())
        {
            if ($("#radDate").prop("checked", true))
            {
                this.GetoutId();
                this._ProductivityTrackerReportService.GetProductivity(Global.BASE_ProductivityTrackerAPI_ENDPOINT, formData.sort, formData.fromDate, formData.ToDate, str, this.Mode, this.OutIds, formData.Consolidatedview, chk)
                    .subscribe(data =>
                    {
                        this.ProductivityTracker = data;
                        this.JumpOnPage(1);
                        this.InLoading = false;
                    },
                    error =>
                    {
                        this.msg = error;
                    });
            }
        }
    }
}