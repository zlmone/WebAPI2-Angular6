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
var SalaryBreakupType_service_1 = require("../../../service/Masters/CompanyRelated/SalaryBreakupType.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../../../Shared/enum");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../../Shared/global");
//import * as _ from 'underscore';
var pager_index_1 = require("../../../Shared/pager.index");
var SalaryBreakupTypeComponent = (function () {
    function SalaryBreakupTypeComponent(fb, _SalaryBreakupTypeService, pagerService) {
        this.fb = fb;
        this._SalaryBreakupTypeService = _SalaryBreakupTypeService;
        this.pagerService = pagerService;
        this.indLoading = false;
        this.isDesc = false;
        this.column = 'Name';
        // pager object
        this.pager = {};
        this.CurrentRecordsPerPage = 10;
        this.ShowHideSearch = false;
    }
    SalaryBreakupTypeComponent.prototype.ngOnInit = function () {
        this.SalaryBreakupTypeFrm = this.fb.group({
            CompanyId: [''],
            Id: [''],
            Name: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(100)])],
            Type: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(100)])],
            FullName: [''],
            IsActive: 0,
            CreatedOn: [''],
            UpdatedOn: [''],
            CreatedBy: [''],
            UpdatedBy: [''],
            EntityMessage: [''],
        });
        this.LoadSalaryBreakupType();
    };
    SalaryBreakupTypeComponent.prototype.SalaryBreakupTypeFilterCriteriaChange = function (value) {
        if (value != '[object Event]')
            this.SalaryBreakupTypeFilter = value;
    };
    SalaryBreakupTypeComponent.prototype.SalaryBreakupTypeSort = function (property) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    };
    ;
    SalaryBreakupTypeComponent.prototype.LoadSalaryBreakupType = function () {
        var _this = this;
        this.indLoading = true;
        this._SalaryBreakupTypeService.get(global_1.Global.BASE_SalaryBreakupType_ENDPOINT)
            .subscribe(function (SalaryBreakupTypes) {
            _this.SalaryBreakupTypes = SalaryBreakupTypes;
            debugger;
            //Logic for searching - start
            if (_this.ShowHideSearch) {
                _this.strsearchName = document.getElementById("searchName").value;
                if (_this.strsearchName != '') {
                    _this.strsearchName = _this.strsearchName.toLocaleLowerCase();
                    _this.SalaryBreakupTypes = _this.SalaryBreakupTypes.filter(function (x) { return x.Name != null && x.Name.toLocaleLowerCase().indexOf(_this.strsearchName) != -1; });
                }
            }
            if (_this.ShowHideSearch) {
                _this.strsearchType = document.getElementById("searchType").value;
                if (_this.strsearchType != '') {
                    _this.strsearchType = _this.strsearchType.toLocaleLowerCase();
                    _this.SalaryBreakupTypes = _this.SalaryBreakupTypes.filter(function (x) { return x.Type != null && x.Type.toLocaleLowerCase().indexOf(_this.strsearchType) != -1; });
                }
            }
            if (_this.ShowHideSearch) {
                _this.strsearchFileName = document.getElementById("searchFileName").value;
                if (_this.strsearchFileName != '') {
                    _this.strsearchFileName = _this.strsearchFileName.toLocaleLowerCase();
                    _this.SalaryBreakupTypes = _this.SalaryBreakupTypes.filter(function (x) { return x.FullName != null && x.FullName.toLocaleLowerCase().indexOf(_this.strsearchFileName) != -1; });
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
    SalaryBreakupTypeComponent.prototype.AddSalaryBreakupType = function () {
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New SalaryBreakupType";
        this.modalBtnTitle = "Add";
        this.SalaryBreakupTypeFrm.reset();
        this.modal.open();
    };
    SalaryBreakupTypeComponent.prototype.EditSalaryBreakupType = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit SalaryBreakupType";
        this.modalBtnTitle = "Update";
        this.SalaryBreakupType = this.SalaryBreakupTypes.filter(function (x) { return x.Id == id; })[0];
        this.SalaryBreakupTypeFrm.setValue(this.SalaryBreakupType);
        this.modal.open();
    };
    SalaryBreakupTypeComponent.prototype.DeleteSalaryBreakupType = function (id, status) {
        this.dbops = enum_1.DBOperation.delete;
        this.SetControlsState(false);
        if (status == true) {
            this.modalTitle = "Confirm to Delete?";
            this.modalBtnTitle = "Delete";
        }
        else {
            this.modalTitle = "Confirm to Undo Delete?";
            this.modalBtnTitle = "Undo Delete";
        }
        this.SalaryBreakupType = this.SalaryBreakupTypes.filter(function (x) { return x.Id == id; })[0];
        this.SalaryBreakupTypeFrm.setValue(this.SalaryBreakupType);
        this.modal.open();
    };
    SalaryBreakupTypeComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.SalaryBreakupTypeFrm.enable() : this.SalaryBreakupTypeFrm.disable();
    };
    SalaryBreakupTypeComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    SalaryBreakupTypeComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.SalaryBreakupTypes);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    SalaryBreakupTypeComponent.prototype.ShowHideSearchControls = function () {
        this.ShowHideSearch = !this.ShowHideSearch;
    };
    SalaryBreakupTypeComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        debugger;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._SalaryBreakupTypeService.post(global_1.Global.BASE_SalaryBreakupType_ENDPOINT, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadSalaryBreakupType();
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
                this._SalaryBreakupTypeService.put(global_1.Global.BASE_SalaryBreakupType_ENDPOINT, formData._value.Id, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadSalaryBreakupType();
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
                this._SalaryBreakupTypeService.delete(global_1.Global.BASE_SalaryBreakupType_ENDPOINT, formData._value.Id).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = "SalaryBreakupType status changed successfully.";
                        _this.LoadSalaryBreakupType();
                    }
                    else {
                        _this.msg = "Error has occurred while changing status of existing SalaryBreakupType!";
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
    ], SalaryBreakupTypeComponent.prototype, "modal", void 0);
    SalaryBreakupTypeComponent = __decorate([
        core_1.Component({
            providers: [SalaryBreakupType_service_1.SalaryBreakupTypeService],
            templateUrl: 'app/Components/Masters/CompanyRelated/SalaryBreakupType.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, SalaryBreakupType_service_1.SalaryBreakupTypeService, pager_index_1.PagerService])
    ], SalaryBreakupTypeComponent);
    return SalaryBreakupTypeComponent;
}());
exports.SalaryBreakupTypeComponent = SalaryBreakupTypeComponent;
