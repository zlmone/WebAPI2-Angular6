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
var ManualPointEntry_service_1 = require("../../../service/Masters/EmployeeLevels/ManualPointEntry.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../../../Shared/enum");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../../Shared/global");
var pager_index_1 = require("../../../Shared/pager.index");
var ManualPointEntryComponent = (function () {
    ////////////////////////////////
    function ManualPointEntryComponent(fb, _ManualPointEntryService, pagerService) {
        this.fb = fb;
        this._ManualPointEntryService = _ManualPointEntryService;
        this.pagerService = pagerService;
        this.indLoading = false;
        this.isDesc = false;
        this.column = 'Full_Name';
        // pager object
        this.pager = {};
        this.CurrentRecordsPerPage = 10;
        //Variables for Filter
        this.ShowHideSearch = false;
    }
    ManualPointEntryComponent.prototype.ngOnInit = function () {
        this.ManualPointEntry = {
            Id: 0,
            GroupID: 0,
            EmpName: "",
            Criteria: "",
            Points: 0,
            Point: 0,
            Month: null,
            Remarks: "",
            Category: "",
            Type: "",
            ForDate: null,
            CriteriaId: 0,
            IsPerformanceBadge: false,
            CategoryId: 0,
            CreatedOn: null,
            CreatedBy: 0,
            UpdatedOn: null,
            UpdatedBy: 0,
            IsActive: false,
            EntityMessage: ""
        };
        this.TestMultidll();
        this.LoadManualPointEntrys();
        this.LoadCriteria();
        this.LoadCategory();
        this.LoadEmployee();
    };
    ManualPointEntryComponent.prototype.LoadEmployee = function () {
        var _this = this;
        debugger;
        this._ManualPointEntryService.GetEmployeeList(global_1.Global.BASE_ManualPointEntry_ENDPOINT)
            .subscribe(function (DATA) {
            _this.IMultiSelectOption = DATA;
            debugger;
        }
        //,error => this.msg = <any>error
        );
    };
    ManualPointEntryComponent.prototype.TestMultidll = function () {
        debugger;
        this.myOptions = [
            { id: 6, name: 'Option 1' },
            { id: 7, name: 'Option 2' },
            { id: 8, name: 'Option 3' }
        ];
    };
    ManualPointEntryComponent.prototype.onChange = function () {
        console.log(this.optionsModel);
    };
    ManualPointEntryComponent.prototype.LoadCriteria = function () {
        var _this = this;
        this._ManualPointEntryService.getCriteria(global_1.Global.BASE_ManualPointEntry_ENDPOINT)
            .subscribe(function (DATA) {
            _this.ListCriteria = DATA;
        }
        //,error => this.msg = <any>error
        );
    };
    ManualPointEntryComponent.prototype.LoadCategory = function () {
        var _this = this;
        this._ManualPointEntryService.getCategory(global_1.Global.BASE_ManualPointEntry_ENDPOINT)
            .subscribe(function (DATA) {
            _this.ListCategory = DATA;
        }
        //,error => this.msg = <any>error
        );
    };
    ManualPointEntryComponent.prototype.ManualPointEntryFilterCriteriaChange = function (value) {
        if (value != '[object Event]')
            this.ManualPointEntryFilter = value;
    };
    ManualPointEntryComponent.prototype.ManualPointEntrySort = function (property) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    };
    ;
    ManualPointEntryComponent.prototype.LoadManualPointEntrys = function () {
        var _this = this;
        this.indLoading = true;
        this._ManualPointEntryService.get(global_1.Global.BASE_ManualPointEntry_ENDPOINT)
            .subscribe(function (ManualPointEntrys) {
            _this.ManualPointEntrys = ManualPointEntrys;
            //Logic for searching - start
            if (_this.ShowHideSearch) {
                _this.strsearchEmpName = document.getElementById("searchEmpName").value;
                if (_this.strsearchEmpName != '') {
                    _this.strsearchEmpName = _this.strsearchEmpName.toLocaleLowerCase();
                    _this.ManualPointEntrys = _this.ManualPointEntrys.filter(function (x) { return x.EmpName != null && x.EmpName.toLocaleLowerCase().indexOf(_this.strsearchEmpName) != -1; });
                }
            }
            if (_this.ShowHideSearch) {
                _this.strsearchCriteria = document.getElementById("searchCriteria").value;
                if (_this.strsearchCriteria != '') {
                    _this.strsearchCriteria = _this.strsearchCriteria.toLocaleLowerCase();
                    _this.ManualPointEntrys = _this.ManualPointEntrys.filter(function (x) { return x.Criteria != null && x.Criteria.toLocaleLowerCase().indexOf(_this.strsearchCriteria) != -1; });
                }
            }
            if (_this.ShowHideSearch) {
                _this.strsearchRemarks = document.getElementById("searchRemarks").value;
                if (_this.strsearchRemarks != '') {
                    _this.strsearchRemarks = _this.strsearchRemarks.toLocaleLowerCase();
                    _this.ManualPointEntrys = _this.ManualPointEntrys.filter(function (x) { return x.Remarks != null && x.Remarks.toLocaleLowerCase().indexOf(_this.strsearchRemarks) != -1; });
                }
            }
            //Logic for searching - End
            _this.indLoading = false;
            // initialize to page 1
            _this.JumpOnPage(1);
        }
        //,error => this.msg = <any>error
        );
    };
    ManualPointEntryComponent.prototype.addManualPointEntry = function () {
        this.dbops = enum_1.DBOperation.create;
        // this.SetControlsState(true);
        this.modalTitle = "Add New ManualPointEntry";
        this.modalBtnTitle = "Add";
        //this.ManualPointEntryFrm.reset();
        this.modal.open();
    };
    ManualPointEntryComponent.prototype.editManualPointEntry = function (id) {
        this.dbops = enum_1.DBOperation.update;
        // this.SetControlsState(true);
        this.modalTitle = "Edit ManualPointEntry";
        this.modalBtnTitle = "Update";
        this.ManualPointEntry = this.ManualPointEntrys.filter(function (x) { return x.Id == id; })[0];
        //  this.ManualPointEntryFrm.setValue(this.ManualPointEntry);
        this.modal.open();
    };
    ManualPointEntryComponent.prototype.deleteManualPointEntry = function (id, status) {
        this.dbops = enum_1.DBOperation.delete;
        //this.SetControlsState(false);
        if (status == true) {
            this.modalTitle = "Confirm to Delete?";
            this.modalBtnTitle = "Delete";
        }
        else {
            this.modalTitle = "Confirm to Undo Delete?";
            this.modalBtnTitle = "Undo Delete";
        }
        this.ManualPointEntry = this.ManualPointEntrys.filter(function (x) { return x.Id == id; })[0];
        // this.ManualPointEntryFrm.setValue(this.ManualPointEntry);
        this.modal.open();
    };
    //SetControlsState(isEnable: boolean) {
    //    isEnable ? this.ManualPointEntryFrm.enable() : this.ManualPointEntryFrm.disable();
    //}
    ManualPointEntryComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    ManualPointEntryComponent.prototype.ChangeCriteria = function (CriteriaId) {
        var _this = this;
        this._ManualPointEntryService.GetDataOnChange(global_1.Global.BASE_ManualPointEntry_ENDPOINT, CriteriaId)
            .subscribe(function (DATA) {
            _this.DataOnCriteria = DATA;
            // this.ManualPointEntry = this.DataOnCriteria;
            if (_this.DataOnCriteria.IsPerformanceBadge == false) {
                _this.ManualPointEntry.Type = "Manual";
            }
            else {
                _this.ManualPointEntry.Type = "Performance Badges";
            }
            _this.ManualPointEntry.Points = _this.DataOnCriteria.Point;
            _this.ManualPointEntry.CategoryId = _this.DataOnCriteria.CategoryId;
        }
        //,error => this.msg = <any>error
        );
    };
    ManualPointEntryComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.ManualPointEntrys);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    ManualPointEntryComponent.prototype.ShowHideSearchControls = function () {
        this.ShowHideSearch = !this.ShowHideSearch;
    };
    ManualPointEntryComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        debugger;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                debugger;
                formData.EmpName = formData.EmpName.toString();
                this._ManualPointEntryService.post(global_1.Global.BASE_ManualPointEntry_ENDPOINT, formData).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadManualPointEntrys();
                        _this.modal.dismiss();
                    }
                    else {
                        alert(data);
                    }
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.update:
                this._ManualPointEntryService.put(global_1.Global.BASE_ManualPointEntry_ENDPOINT, formData._value.Id, formData).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadManualPointEntrys();
                        _this.modal.dismiss();
                    }
                    else {
                        alert(data);
                    }
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.delete:
                this._ManualPointEntryService.delete(global_1.Global.BASE_ManualPointEntry_ENDPOINT, formData._value.Id).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = "ManualPointEntry status changed successfully.";
                        _this.LoadManualPointEntrys();
                    }
                    else {
                        _this.msg = "Error has occurred while changing status of existing ManualPointEntry!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
        }
    };
    __decorate([
        core_1.ViewChild('modal'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], ManualPointEntryComponent.prototype, "modal", void 0);
    ManualPointEntryComponent = __decorate([
        core_1.Component({
            //selector: 'ss-multiselect-dropdown',
            providers: [ManualPointEntry_service_1.ManualPointEntryService],
            templateUrl: 'app/Components/Masters/EmployeeLevels/ManualPointEntry.component.html',
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ManualPointEntry_service_1.ManualPointEntryService, pager_index_1.PagerService])
    ], ManualPointEntryComponent);
    return ManualPointEntryComponent;
}());
exports.ManualPointEntryComponent = ManualPointEntryComponent;
