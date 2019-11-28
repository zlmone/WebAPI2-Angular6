"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var SalaryGrievance_service_1 = require("../../../Service/HumanResource/Grievance/SalaryGrievance.service");
var global_1 = require("../../../../app/Shared/global");
var pager_service_1 = require("../../../../app/Shared/pager.service");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var enum_1 = require("../../../Shared/enum");
var SalaryGrievanceComponent = (function () {
    function SalaryGrievanceComponent(fb, _SalaryGrievanceService, http, router, pagerService) {
        this.fb = fb;
        this._SalaryGrievanceService = _SalaryGrievanceService;
        this.http = http;
        this.router = router;
        this.pagerService = pagerService;
        this.indLoading = false;
        this.CurrentRecordsPerPage = 10;
        this.pager = {};
    }
    SalaryGrievanceComponent.prototype.ngOnInit = function () {
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
        this.FillDeductionDate();
    };
    SalaryGrievanceComponent.prototype.LoadGrievanceDetails = function () {
        var _this = this;
        this.indLoading = true;
        this._SalaryGrievanceService.GetGrievance(global_1.Global.BASE_SalaryGrievanceAPI_ENDPOINT, this.objGrievance.Employee_Id, "Pending")
            .subscribe(function (Grievance) {
            _this.Grievance = Grievance;
            _this.indLoading = false;
            _this.JumpOnPage(1);
        });
    };
    SalaryGrievanceComponent.prototype.GetPendingGrievance = function (event) {
        this.LoadGrievanceDetails();
    };
    SalaryGrievanceComponent.prototype.GetCompletedGrievance = function (event) {
        var _this = this;
        this._SalaryGrievanceService.GetGrievance(global_1.Global.BASE_SalaryGrievanceAPI_ENDPOINT, this.objGrievance.Employee_Id, "Completed")
            .subscribe(function (Grievance) {
            _this.Grievance = Grievance;
            _this.indLoading = false;
            _this.JumpOnPage(1);
        });
    };
    SalaryGrievanceComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.Grievance);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    SalaryGrievanceComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    //SetControlsState(isEnable: boolean) {
    //    isEnable ? this.SalaryGrievanceForm.enable() : this.SalaryGrievanceForm.disable();
    //}
    SalaryGrievanceComponent.prototype.ResetModal = function () {
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
    };
    SalaryGrievanceComponent.prototype.GoToAddGrievance = function () {
        this.ResetModal();
        this.modalTitle = 'Add Grievance';
        this.modalButton = 'Save';
        this.dbops = enum_1.DBOperation.create;
        this.modal.open();
    };
    // Add Grievance Functions...
    SalaryGrievanceComponent.prototype.FillDeductionDate = function () {
        var _this = this;
        this._SalaryGrievanceService.FillDeductionDate(global_1.Global.BASE_SalaryGrievanceAPI_ENDPOINT, this.objGrievance.Employee_Id, "GetDeductDate")
            .subscribe(function (GetDeductionDate) {
            _this.indLoading = false;
            _this.GrievanceDate = GetDeductionDate;
        }, function (error) {
            _this.msg = error;
        });
    };
    SalaryGrievanceComponent.prototype.LoadEmployeeAttendance = function (EmployeeId, DeductionDate) {
        var _this = this;
        this._SalaryGrievanceService.LoadEmployeeAttendance(global_1.Global.BASE_SalaryGrievanceAPI_ENDPOINT, EmployeeId, DeductionDate)
            .subscribe(function (GetAttendance) {
            _this.indLoading = false;
            _this.Attendance = GetAttendance;
        }, function (error) {
            _this.msg = error;
        });
    };
    SalaryGrievanceComponent.prototype.LoadEmployeeDailyEntry = function (EmployeeId, DeductionDate) {
        var _this = this;
        this._SalaryGrievanceService.LoadEmployeeDailyEntry(global_1.Global.BASE_SalaryGrievanceAPI_ENDPOINT, EmployeeId, DeductionDate)
            .subscribe(function (GetDailyEntry) {
            debugger;
            _this.indLoading = false;
            _this.DailyEntry = GetDailyEntry;
        }, function (error) {
            _this.msg = error;
        });
    };
    SalaryGrievanceComponent.prototype.GetAttendanceDetailOfEmployee = function (event) {
        var _this = this;
        this._SalaryGrievanceService.FillDeductionDate(global_1.Global.BASE_SalaryGrievanceAPI_ENDPOINT, this.objGrievance.Employee_Id, "GetDeductDate")
            .subscribe(function (GetDeduction) {
            _this.GrievanceDeductionDate = GetDeduction;
            if (_this.GrievanceDeductionDate != null) {
                $("#AttendanceData").show();
                $("#DailyEntryData").show();
                _this.Id = event.target.value;
                if (_this.Id == 0) {
                    _this.objGrievance.PaycutAmount = "";
                    _this.PayCutAmtRemark = "";
                    _this.RemarkBy = "";
                }
                else {
                    for (var _i = 0, _a = _this.GrievanceDeductionDate.filter(function (x) { return x.Id == _this.Id; }); _i < _a.length; _i++) {
                        var item = _a[_i];
                        _this.objGrievance.PaycutAmount = item.PayrollCut;
                        _this.PayCutAmtRemark = item.PayrollRemarks;
                        _this.RemarkBy = item.LineManagerName;
                        _this.LoadEmployeeAttendance(item.EmployeeId, item.Deduction_Date);
                        _this.LoadEmployeeDailyEntry(item.EmployeeId, item.Deduction_Date);
                    }
                }
            }
        });
    };
    SalaryGrievanceComponent.prototype.EditGrievance = function (Id) {
        $("#ddDeductDate").hide();
        $("#txtDeductDate").show();
        this.modalTitle = 'Edit Grievance';
        this.modalButton = 'Update';
        this.dbops = enum_1.DBOperation.update;
        //this.SetControlsState(true);
        this.objGrievance = this.Grievance.filter(function (x) { return x.Id == Id; })[0];
        this.modal.open();
    };
    SalaryGrievanceComponent.prototype.onSubmit = function (objGrievance) {
        var _this = this;
        this.msg = "";
        debugger;
        var dateval = $("#ddlDeductDate option:selected").text();
        var Pc_AMT = $("#txtPCAmt").val();
        var GrievanceRemark = $("#txtGrievanceremark").val();
        this.EmployeeId = Number(sessionStorage.getItem('Id'));
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._SalaryGrievanceService.AddGrievance(global_1.Global.BASE_SalaryGrievanceAPI_ENDPOINT, this.EmployeeId, dateval, Pc_AMT, GrievanceRemark)
                    .subscribe(function (Success) {
                    _this.modal.close();
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.update:
                this._SalaryGrievanceService.put(global_1.Global.BASE_SalaryGrievanceAPI_ENDPOINT, this.EmployeeId, objGrievance)
                    .subscribe(function (Success) {
                    _this.modal.close();
                }, function (error) {
                    _this.msg = error;
                });
        }
    };
    __decorate([
        core_1.ViewChild('modalAddGrievance'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], SalaryGrievanceComponent.prototype, "modal", void 0);
    SalaryGrievanceComponent = __decorate([
        core_1.Component({
            providers: [SalaryGrievance_service_1.SalaryGrievanceService],
            templateUrl: 'app/Components/HumanResource/Grievance/SalaryGrievance.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, SalaryGrievance_service_1.SalaryGrievanceService, http_1.Http, router_1.Router, pager_service_1.PagerService])
    ], SalaryGrievanceComponent);
    return SalaryGrievanceComponent;
}());
exports.SalaryGrievanceComponent = SalaryGrievanceComponent;
