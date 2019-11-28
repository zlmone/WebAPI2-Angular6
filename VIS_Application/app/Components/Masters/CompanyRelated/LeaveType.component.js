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
var LeaveType_service_1 = require("../../../service/Masters/CompanyRelated/LeaveType.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../../../Shared/enum");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../../Shared/global");
//import * as _ from 'underscore';
var pager_index_1 = require("../../../Shared/pager.index");
var LeaveTypeComponent = (function () {
    function LeaveTypeComponent(fb, _LeaveTypeService, pagerService) {
        this.fb = fb;
        this._LeaveTypeService = _LeaveTypeService;
        this.pagerService = pagerService;
        this.indLoading = false;
        this.isDesc = false;
        this.column = 'LeaveType';
        // pager object
        this.pager = {};
        this.CurrentRecordsPerPage = 10;
        this.ShowHideSearch = false;
    }
    LeaveTypeComponent.prototype.ngOnInit = function () {
        this.LeaveTypeFrm = this.fb.group({
            CompanyId: [''],
            Id: [''],
            LeaveTypeName: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(100)])],
            IsActive: [''],
            CreatedOn: [''],
            UpdatedOn: [''],
            CreatedBy: [''],
            UpdatedBy: [''],
            EntityMessage: [''],
        });
        this.LoadLeaveType();
    };
    LeaveTypeComponent.prototype.LeaveTypeFilterCriteriaChange = function (value) {
        if (value != '[object Event]')
            this.LeaveTypeFilter = value;
    };
    LeaveTypeComponent.prototype.LeaveTypeSort = function (property) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    };
    ;
    LeaveTypeComponent.prototype.LoadLeaveType = function () {
        var _this = this;
        this.indLoading = true;
        this._LeaveTypeService.get(global_1.Global.BASE_LeaveType_ENDPOINT)
            .subscribe(function (LeaveTypes) {
            _this.LeaveTypes = LeaveTypes;
            //Logic for searching - start
            if (_this.ShowHideSearch) {
                _this.strSearchTypeName = document.getElementById("searchLeaveTypeName").value;
                if (_this.strSearchTypeName != '') {
                    _this.strSearchTypeName = _this.strSearchTypeName.toLocaleLowerCase();
                    _this.LeaveTypes = _this.LeaveTypes.filter(function (x) { return x.LeaveTypeName != null && x.LeaveTypeName.toLocaleLowerCase().indexOf(_this.strSearchTypeName) != -1; });
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
    LeaveTypeComponent.prototype.AddLeaveType = function () {
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New LeaveType";
        this.modalBtnTitle = "Add";
        this.LeaveTypeFrm.reset();
        this.modal.open();
    };
    LeaveTypeComponent.prototype.EditLeaveType = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit LeaveType";
        this.modalBtnTitle = "Update";
        this.LeaveType = this.LeaveTypes.filter(function (x) { return x.Id == id; })[0];
        this.LeaveTypeFrm.setValue(this.LeaveType);
        this.modal.open();
    };
    LeaveTypeComponent.prototype.DeleteLeaveType = function (id, status) {
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
        this.LeaveType = this.LeaveTypes.filter(function (x) { return x.Id == id; })[0];
        this.LeaveTypeFrm.setValue(this.LeaveType);
        this.modal.open();
    };
    LeaveTypeComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.LeaveTypeFrm.enable() : this.LeaveTypeFrm.disable();
    };
    LeaveTypeComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    LeaveTypeComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.LeaveTypes);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    LeaveTypeComponent.prototype.ShowHideSearchControls = function () {
        this.ShowHideSearch = !this.ShowHideSearch;
    };
    LeaveTypeComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._LeaveTypeService.post(global_1.Global.BASE_LeaveType_ENDPOINT, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadLeaveType();
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
                this._LeaveTypeService.put(global_1.Global.BASE_LeaveType_ENDPOINT, formData._value.Id, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadLeaveType();
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
                this._LeaveTypeService.delete(global_1.Global.BASE_LeaveType_ENDPOINT, formData._value.Id).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = "LeaveType status changed successfully.";
                        _this.LoadLeaveType();
                    }
                    else {
                        _this.msg = "Error has occurred while changing status of existing LeaveType!";
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
    ], LeaveTypeComponent.prototype, "modal", void 0);
    LeaveTypeComponent = __decorate([
        core_1.Component({
            providers: [LeaveType_service_1.LeaveTypeService],
            templateUrl: 'app/Components/Masters/CompanyRelated/LeaveType.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, LeaveType_service_1.LeaveTypeService, pager_index_1.PagerService])
    ], LeaveTypeComponent);
    return LeaveTypeComponent;
}());
exports.LeaveTypeComponent = LeaveTypeComponent;
