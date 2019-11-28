import { Component, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms'
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal'
import { SalaryGrievanceService } from '../../../Service/HumanResource/Grievance/SalaryGrievance.service'
import { Global } from '../../../../app/Shared/global';
import { PagerService } from '../../../../app/Shared/pager.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpModule, Http, Headers } from '@angular/http';
import { DBOperation } from '../../../Shared/enum';
import { ISalaryGrievance, IGrievanceDate, IAttendance, IDailyEntry } from '../../../Model/HumanResource/Grievance/SalaryGrievance';

@Component({
    providers: [SalaryGrievanceService],
    templateUrl: 'app/Components/HumanResource/Grievance/SalaryGrievance.component.html'
})

export class SalaryGrievanceComponent implements OnInit {
    @ViewChild('modalAddGrievance') modal: ModalComponent;
    msg: string;
    dbops: DBOperation;
    indLoading: boolean = false;
    Id: number;
    PayCutAmt: string;
    PayCutAmtRemark: string;
    RemarkBy: string;
    EmployeeId: number;
    SalaryGrievanceForm: FormGroup;
    CurrentRecordsPerPage: number = 10;
    pager: any = {};
    pagedItems: any[];
    objeditGrievance: ISalaryGrievance[];
    objGrievance: ISalaryGrievance;
    Grievance: ISalaryGrievance[];
    GrievanceDate: IGrievanceDate[];
    GrievanceDeductionDate: IGrievanceDate[];
    Attendance: IAttendance;
    DailyEntry: IDailyEntry;
    modalTitle: string;
    modalButton: string;


    constructor(private fb: FormBuilder, private _SalaryGrievanceService: SalaryGrievanceService, public http: Http, private router: Router, private pagerService: PagerService) { }

    ngOnInit(): void {

        this.objGrievance = ({
            Id: 0,
            Employee_Id: 0,
            Employee_Name: '',
            Deduction_Date: null,
            Grievance_Remarks: '',
            PaycutAmount: '',
            GrievanceType_PE: '',
            GrievanceType_PH: '',
            PE_Status: 0,
            PE_Remarks: '',
            PE_UpdatedBy: 0,
            PE_UpdatedDate: null,
            PH_Status: 0,
            PH_Remarks: '',
            PH_UpdatedBy: 0,
            PH_UpdatedDate: null,
            CreatedBy: 0,
            CreatedOn: null,
            UpdatedBy: 0,
            UpdatedOn: null,
            Active: false,
            verified_By: 0,
        })

        $("#txtDeductDate").hide();
        
        this.objGrievance.Employee_Id = Number(sessionStorage.getItem('Id'));
        this.objGrievance.Employee_Name = sessionStorage.getItem('UserFullName');

        this.LoadGrievanceDetails();

        // Add Grievance Method..
        $("#AttendanceData").hide();
        $("#DailyEntryData").hide();
        $("#txtempname").prop('disabled', true);
        $("#txtDeductionDate").prop('disabled', true);
        $("#txtpcremark").prop('disabled', true);
        $("#txtPCAmt").prop('disabled', true);
        $("#txtremark_by").prop('disabled', true);

        this.FillDeductionDate()
    }


    LoadGrievanceDetails(): void {
        this.indLoading = true;
        this._SalaryGrievanceService.GetGrievance(Global.BASE_SalaryGrievanceAPI_ENDPOINT, this.objGrievance.Employee_Id, "Pending")
            .subscribe(Grievance => {
                this.Grievance = Grievance;
                this.indLoading = false;
                this.JumpOnPage(1);
            });
    }

    GetPendingGrievance(event): void {
        this.LoadGrievanceDetails();
    }

    GetCompletedGrievance(event): void {
        this._SalaryGrievanceService.GetGrievance(Global.BASE_SalaryGrievanceAPI_ENDPOINT, this.objGrievance.Employee_Id, "Completed")
            .subscribe(Grievance => {
                this.Grievance = Grievance;
                this.indLoading = false;
                this.JumpOnPage(1);
            });
    }

    JumpOnPage(PageNumber: number) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.Grievance);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    }

    ChangeRecordsPerPage(RecordsPerPage: number) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    }

    //SetControlsState(isEnable: boolean) {
    //    isEnable ? this.SalaryGrievanceForm.enable() : this.SalaryGrievanceForm.disable();
    //}

    ResetModal(): void
    {
        this.objGrievance = ({
            Id: 0,
            Employee_Id: 0,
            Employee_Name: '',
            Deduction_Date: null,
            Grievance_Remarks: '',
            PaycutAmount: '',
            GrievanceType_PE: '',
            GrievanceType_PH: '',
            PE_Status: 0,
            PE_Remarks: '',
            PE_UpdatedBy: 0,
            PE_UpdatedDate: null,
            PH_Status: 0,
            PH_Remarks: '',
            PH_UpdatedBy: 0,
            PH_UpdatedDate: null,
            CreatedBy: 0,
            CreatedOn: null,
            UpdatedBy: 0,
            UpdatedOn: null,
            Active: false,
            verified_By: 0,
        });
    }
    GoToAddGrievance(): void {
        this.ResetModal();
        this.modalTitle = 'Add Grievance';
        this.modalButton = 'Save';
        this.dbops = DBOperation.create;
        this.modal.open();
    }

    // Add Grievance Functions...

    FillDeductionDate(): void {
        this._SalaryGrievanceService.FillDeductionDate(Global.BASE_SalaryGrievanceAPI_ENDPOINT, this.objGrievance.Employee_Id, "GetDeductDate")
            .subscribe(GetDeductionDate => {
                this.indLoading = false;
                this.GrievanceDate = GetDeductionDate;
            },
            error => {
                this.msg = error;
            });
    }

    LoadEmployeeAttendance(EmployeeId: number, DeductionDate: string): void {
        this._SalaryGrievanceService.LoadEmployeeAttendance(Global.BASE_SalaryGrievanceAPI_ENDPOINT, EmployeeId, DeductionDate)
            .subscribe(GetAttendance => {
                this.indLoading = false;
                this.Attendance = GetAttendance;
            },
            error => {
                this.msg = error;
            });
    }

    LoadEmployeeDailyEntry(EmployeeId: number, DeductionDate: string): void {
        this._SalaryGrievanceService.LoadEmployeeDailyEntry(Global.BASE_SalaryGrievanceAPI_ENDPOINT, EmployeeId, DeductionDate)
            .subscribe(GetDailyEntry => {
                debugger;
                this.indLoading = false;
                this.DailyEntry = GetDailyEntry;
            },
            error => {
                this.msg = error;
            });
    }

    GetAttendanceDetailOfEmployee(event): void {
        this._SalaryGrievanceService.FillDeductionDate(Global.BASE_SalaryGrievanceAPI_ENDPOINT, this.objGrievance.Employee_Id, "GetDeductDate")
            .subscribe(GetDeduction => {
                this.GrievanceDeductionDate = GetDeduction;

                if (this.GrievanceDeductionDate != null) {
                    $("#AttendanceData").show();
                    $("#DailyEntryData").show();
                    this.Id = event.target.value;
                    if (this.Id == 0) {
                        this.objGrievance.PaycutAmount = "";
                        this.PayCutAmtRemark = "";
                        this.RemarkBy = "";
                    }
                    else {
                        for (let item of this.GrievanceDeductionDate.filter(x => x.Id == this.Id)) {
                            this.objGrievance.PaycutAmount = item.PayrollCut;
                            this.PayCutAmtRemark = item.PayrollRemarks;
                            this.RemarkBy = item.LineManagerName;
                            this.LoadEmployeeAttendance(item.EmployeeId, item.Deduction_Date);
                            this.LoadEmployeeDailyEntry(item.EmployeeId, item.Deduction_Date);
                        }
                    }
                }
            });
    }

    EditGrievance(Id: number): void
    {
        $("#ddDeductDate").hide();
        $("#txtDeductDate").show();
        this.modalTitle = 'Edit Grievance';
        this.modalButton = 'Update';
        this.dbops = DBOperation.update;
        //this.SetControlsState(true);
        this.objGrievance = this.Grievance.filter(x => x.Id == Id)[0];
        this.modal.open();
    }

    onSubmit(objGrievance: ISalaryGrievance)
    {
        this.msg = "";

        debugger;
        var dateval = $("#ddlDeductDate option:selected").text()
        var Pc_AMT = $("#txtPCAmt").val();
        var GrievanceRemark = $("#txtGrievanceremark").val();
        this.EmployeeId = Number(sessionStorage.getItem('Id'));
        switch (this.dbops)
        {
            case DBOperation.create:
                this._SalaryGrievanceService.AddGrievance(Global.BASE_SalaryGrievanceAPI_ENDPOINT, this.EmployeeId, dateval, Pc_AMT, GrievanceRemark)
                    .subscribe(Success =>
                    {
                        this.modal.close();
                    },
                    error =>
                    {
                        this.msg = error;
                    });
                break;
            case DBOperation.update:
                this._SalaryGrievanceService.put(Global.BASE_SalaryGrievanceAPI_ENDPOINT, this.EmployeeId, objGrievance)
                    .subscribe(Success =>
                    {
                        this.modal.close();
                    },
                    error =>
                    {
                        this.msg = error;
                    });
        }
    }
}