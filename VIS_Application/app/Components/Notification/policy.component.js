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
var Policy_service_1 = require("../../service/Notification/Policy.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../../Shared/enum");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../Shared/global");
//import * as _ from 'underscore';
var pager_index_1 = require("../../Shared/pager.index");
var PolicyComponent = (function () {
    function PolicyComponent(fb, _PolicyService, pagerService) {
        this.fb = fb;
        this._PolicyService = _PolicyService;
        this.pagerService = pagerService;
        this.indLoading = false;
        this.isDesc = false;
        this.column = 'Policy_Name';
        this.CurrentRecordsPerPage = 10;
        // pager object
        this.pager = {};
        //Variables for Filter
        this.ShowHideSearch = false;
    }
    PolicyComponent.prototype.ngOnInit = function () {
        this.PolicyFrm = this.fb.group({
            CompanyId: [''],
            Id: [''],
            Policy_Name: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(50)])],
            Description: ['', forms_1.Validators.required],
            IsNewPolicy: [''],
            CreatedOn: [''],
            CreatedBy: [''],
            UpdatedOn: [''],
            UpdatedBy: [''],
            IsActive: [''],
            EntityMessage: ['']
        });
        this.LoadPolicys();
    };
    PolicyComponent.prototype.PolicyFilterCriteriaChange = function (value) {
        if (value != '[object Event]')
            this.PolicyFilter = value;
    };
    PolicyComponent.prototype.PolicySort = function (property) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    };
    PolicyComponent.prototype.LoadPolicys = function () {
        var _this = this;
        this.indLoading = true;
        this._PolicyService.get(global_1.Global.BASE_POLICY_ENDPOINT)
            .subscribe(function (Policys) {
            _this.Policys = Policys;
            //Logic for searching - start
            if (_this.ShowHideSearch) {
                _this.strSearchPolicy_Name = document.getElementById("searchPolicy_Name").value;
                if (_this.strSearchPolicy_Name != '') {
                    _this.strSearchPolicy_Name = _this.strSearchPolicy_Name.toLocaleLowerCase();
                    _this.Policys = _this.Policys.filter(function (x) { return x.Policy_Name != null && x.Policy_Name.toLocaleLowerCase().indexOf(_this.strSearchPolicy_Name) != -1; });
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
    PolicyComponent.prototype.addPolicy = function () {
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New Policy";
        this.modalBtnTitle = "Add";
        this.PolicyFrm.reset();
        this.modal.open();
    };
    PolicyComponent.prototype.editPolicy = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit Policy";
        this.modalBtnTitle = "Update";
        this.Policy = this.Policys.filter(function (x) { return x.Id == id; })[0];
        this.PolicyFrm.setValue(this.Policy);
        this.modal.open();
    };
    PolicyComponent.prototype.deletePolicy = function (id, status) {
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
        this.Policy = this.Policys.filter(function (x) { return x.Id == id; })[0];
        this.PolicyFrm.setValue(this.Policy);
        this.modal.open();
    };
    PolicyComponent.prototype.ViewPolicy = function (id) {
        this.dbops = enum_1.DBOperation.View;
        this.SetControlsState(false);
        this.modalTitle = "View Policy";
        this.modalBtnTitle = "Back";
        this.Policy = this.Policys.filter(function (x) { return x.Id == id; })[0];
        this.PolicyFrm.setValue(this.Policy);
        this.modal1.open();
        this.LoadViewPolicy(id);
    };
    PolicyComponent.prototype.LoadViewPolicy = function (id) {
        var _this = this;
        this.indLoading = true;
        this._PolicyService.getViewPolicy(global_1.Global.BASE_POLICY_ENDPOINT, id)
            .subscribe(function (DATADP) {
            _this.ViewIPolicy = DATADP;
        });
    };
    PolicyComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.PolicyFrm.enable() : this.PolicyFrm.disable();
    };
    PolicyComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    PolicyComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.Policys);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    PolicyComponent.prototype.ShowHideSearchControls = function () {
        this.ShowHideSearch = !this.ShowHideSearch;
    };
    PolicyComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._PolicyService.post(global_1.Global.BASE_POLICY_ENDPOINT, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadPolicys();
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
                this._PolicyService.put(global_1.Global.BASE_POLICY_ENDPOINT, formData._value.Id, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadPolicys();
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
                this._PolicyService.delete(global_1.Global.BASE_POLICY_ENDPOINT, formData._value.Id).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = "Policy status changed successfully.";
                        _this.LoadPolicys();
                    }
                    else {
                        _this.msg = "Error has occurred while changing status of existing Policy!";
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
    ], PolicyComponent.prototype, "modal", void 0);
    __decorate([
        core_1.ViewChild('modal1'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], PolicyComponent.prototype, "modal1", void 0);
    PolicyComponent = __decorate([
        core_1.Component({
            providers: [Policy_service_1.PolicyService],
            templateUrl: 'app/Components/Notification/Policy.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, Policy_service_1.PolicyService, pager_index_1.PagerService])
    ], PolicyComponent);
    return PolicyComponent;
}());
exports.PolicyComponent = PolicyComponent;
