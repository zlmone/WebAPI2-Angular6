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
var LookupType_service_1 = require("../../../service/Masters/CompanyRelated/LookupType.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../../../Shared/enum");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../../Shared/global");
//import * as _ from 'underscore';
var pager_index_1 = require("../../../Shared/pager.index");
var CommonHelper_service_1 = require("../../../Shared/CommonHelper.service");
var LookupTypeComponent = (function () {
    function LookupTypeComponent(fb, _LookupTypeService, pagerService, _CommonHelperService) {
        this.fb = fb;
        this._LookupTypeService = _LookupTypeService;
        this.pagerService = pagerService;
        this._CommonHelperService = _CommonHelperService;
        this.indLoading = false;
        this.isDesc = false;
        this.column = 'TypeName';
        // pager object
        this.pager = {};
        this.CurrentRecordsPerPage = 10;
        this.ShowHideSearch = false;
    }
    LookupTypeComponent.prototype.ngOnInit = function () {
        this._CommonHelperService.ToogleMenu();
        this.LookupTypeFrm = this.fb.group({
            CompanyId: [''],
            Id: [''],
            TypeName: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(100)])],
            IsActive: [''],
            CreatedOn: [''],
            UpdatedOn: [''],
            CreatedBy: [''],
            UpdatedBy: [''],
            EntityMessage: [''],
        });
        this.LoadLookupType();
    };
    LookupTypeComponent.prototype.LookupTypeFilterCriteriaChange = function (value) {
        if (value != '[object Event]')
            this.LookupTypeFilter = value;
    };
    LookupTypeComponent.prototype.LookupTypeSort = function (property) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    };
    ;
    LookupTypeComponent.prototype.LoadLookupType = function () {
        var _this = this;
        this.indLoading = true;
        this._LookupTypeService.get(global_1.Global.BASE_LOOKUPTYPE_ENDPOINT)
            .subscribe(function (lookuptypes) {
            _this.lookuptypes = lookuptypes;
            debugger;
            //Logic for searching - start
            if (_this.ShowHideSearch) {
                _this.strSearchTypeName = document.getElementById("searchTypeName").value;
                if (_this.strSearchTypeName != '') {
                    _this.strSearchTypeName = _this.strSearchTypeName.toLocaleLowerCase();
                    _this.lookuptypes = _this.lookuptypes.filter(function (x) { return x.TypeName != null && x.TypeName.toLocaleLowerCase().indexOf(_this.strSearchTypeName) != -1; });
                }
            }
            //Logic for searching - End
            _this.indLoading = false;
            // initialize to page 1
            _this.JumpOnPage(1);
        }
        //,error => this.msg = <any>error
        );
        debugger;
        return this.lookuptypes;
    };
    LookupTypeComponent.prototype.AddLookupType = function () {
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New LookupType";
        this.modalBtnTitle = "Add";
        this.LookupTypeFrm.reset();
        this.modal.open();
    };
    LookupTypeComponent.prototype.EditLookupType = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit LookupType";
        this.modalBtnTitle = "Update";
        this.lookuptype = this.lookuptypes.filter(function (x) { return x.Id == id; })[0];
        this.LookupTypeFrm.setValue(this.lookuptype);
        this.modal.open();
    };
    LookupTypeComponent.prototype.DeleteLookupType = function (id, status) {
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
        this.lookuptype = this.lookuptypes.filter(function (x) { return x.Id == id; })[0];
        this.LookupTypeFrm.setValue(this.lookuptype);
        this.modal.open();
    };
    LookupTypeComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.LookupTypeFrm.enable() : this.LookupTypeFrm.disable();
    };
    LookupTypeComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    LookupTypeComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.lookuptypes);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    LookupTypeComponent.prototype.ShowHideSearchControls = function () {
        this.ShowHideSearch = !this.ShowHideSearch;
    };
    LookupTypeComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        debugger;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._LookupTypeService.post(global_1.Global.BASE_LOOKUPTYPE_ENDPOINT, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadLookupType();
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
                this._LookupTypeService.put(global_1.Global.BASE_LOOKUPTYPE_ENDPOINT, formData._value.Id, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadLookupType();
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
                this._LookupTypeService.delete(global_1.Global.BASE_LOOKUPTYPE_ENDPOINT, formData._value.Id).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = "LookupType status changed successfully.";
                        _this.LoadLookupType();
                    }
                    else {
                        _this.msg = "Error has occurred while changing status of existing LookupType!";
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
    ], LookupTypeComponent.prototype, "modal", void 0);
    LookupTypeComponent = __decorate([
        core_1.Component({
            providers: [LookupType_service_1.LookupTypeService],
            templateUrl: 'app/Components/Masters/CompanyRelated/LookupType.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, LookupType_service_1.LookupTypeService, pager_index_1.PagerService, CommonHelper_service_1.CommonHelperService])
    ], LookupTypeComponent);
    return LookupTypeComponent;
}());
exports.LookupTypeComponent = LookupTypeComponent;
