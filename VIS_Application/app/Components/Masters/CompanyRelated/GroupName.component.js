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
var GroupName_service_1 = require("../../../service/Masters/CompanyRelated/GroupName.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../../../Shared/enum");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../../Shared/global");
//import * as _ from 'underscore';
var pager_index_1 = require("../../../Shared/pager.index");
var GroupNameComponent = (function () {
    function GroupNameComponent(fb, _GroupNameService, pagerService) {
        this.fb = fb;
        this._GroupNameService = _GroupNameService;
        this.pagerService = pagerService;
        this.indLoading = false;
        this.isDesc = false;
        this.column = 'TypeName';
        // pager object
        this.pager = {};
        this.CurrentRecordsPerPage = 10;
        this.ShowHideSearch = false;
    }
    GroupNameComponent.prototype.ngOnInit = function () {
        this.GroupNameFrm = this.fb.group({
            CompanyId: [''],
            Id: [''],
            GroupNames: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(100)])],
            IsActive: [''],
            CreatedOn: [''],
            UpdatedOn: [''],
            CreatedBy: [''],
            UpdatedBy: [''],
            EntityMessage: [''],
        });
        this.LoadGroupName();
    };
    GroupNameComponent.prototype.GroupNameFilterCriteriaChange = function (value) {
        if (value != '[object Event]')
            this.GroupNameFilter = value;
    };
    GroupNameComponent.prototype.GroupNameSort = function (property) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    };
    ;
    GroupNameComponent.prototype.LoadGroupName = function () {
        var _this = this;
        this.indLoading = true;
        this._GroupNameService.get(global_1.Global.BASE_GroupName_ENDPOINT)
            .subscribe(function (GroupNames) {
            _this.GroupNames = GroupNames;
            //Logic for searching - start
            if (_this.ShowHideSearch) {
                _this.strSearchTypeName = document.getElementById("searchGroupNames").value;
                if (_this.strSearchTypeName != '') {
                    _this.strSearchTypeName = _this.strSearchTypeName.toLocaleLowerCase();
                    _this.GroupNames = _this.GroupNames.filter(function (x) { return x.GroupNames != null && x.GroupNames.toLocaleLowerCase().indexOf(_this.strSearchTypeName) != -1; });
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
    GroupNameComponent.prototype.AddGroupName = function () {
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New GroupName";
        this.modalBtnTitle = "Add";
        this.GroupNameFrm.reset();
        this.modal.open();
    };
    GroupNameComponent.prototype.EditGroupName = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit GroupName";
        this.modalBtnTitle = "Update";
        this.GroupName = this.GroupNames.filter(function (x) { return x.Id == id; })[0];
        this.GroupNameFrm.setValue(this.GroupName);
        this.modal.open();
    };
    GroupNameComponent.prototype.DeleteGroupName = function (id, status) {
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
        this.GroupName = this.GroupNames.filter(function (x) { return x.Id == id; })[0];
        this.GroupNameFrm.setValue(this.GroupName);
        this.modal.open();
    };
    GroupNameComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.GroupNameFrm.enable() : this.GroupNameFrm.disable();
    };
    GroupNameComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    GroupNameComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.GroupNames);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    GroupNameComponent.prototype.ShowHideSearchControls = function () {
        this.ShowHideSearch = !this.ShowHideSearch;
    };
    GroupNameComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._GroupNameService.post(global_1.Global.BASE_GroupName_ENDPOINT, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadGroupName();
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
                this._GroupNameService.put(global_1.Global.BASE_GroupName_ENDPOINT, formData._value.Id, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadGroupName();
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
                this._GroupNameService.delete(global_1.Global.BASE_GroupName_ENDPOINT, formData._value.Id).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = "GroupName status changed successfully.";
                        _this.LoadGroupName();
                    }
                    else {
                        _this.msg = "Error has occurred while changing status of existing GroupName!";
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
    ], GroupNameComponent.prototype, "modal", void 0);
    GroupNameComponent = __decorate([
        core_1.Component({
            providers: [GroupName_service_1.GroupNameService],
            templateUrl: 'app/Components/Masters/CompanyRelated/GroupName.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, GroupName_service_1.GroupNameService, pager_index_1.PagerService])
    ], GroupNameComponent);
    return GroupNameComponent;
}());
exports.GroupNameComponent = GroupNameComponent;
