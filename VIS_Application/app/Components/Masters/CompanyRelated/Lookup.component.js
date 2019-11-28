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
var Lookup_service_1 = require("../../../service/Masters/CompanyRelated/Lookup.service");
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
var LookupComponent = (function () {
    function LookupComponent(fb, _LookupService, pagerService, _LookupTypeService, _CommonHelperService) {
        this.fb = fb;
        this._LookupService = _LookupService;
        this.pagerService = pagerService;
        this._LookupTypeService = _LookupTypeService;
        this._CommonHelperService = _CommonHelperService;
        this.indLoading = false;
        this.isDesc = false;
        this.column = 'Name';
        // pager object
        this.pager = {};
        this.CurrentRecordsPerPage = 10;
        //Variables for Filter
        this.ShowHideSearch = false;
    }
    //private lt: LookupTypeComponent = new LookupTypeComponent(this.fb, this._LookupTypeService, this.pagerService);
    LookupComponent.prototype.Resetmodel = function () {
        this.lookup =
            {
                ColorCode: '',
                Country: '',
                CreatedBy: '',
                CreatedOn: '',
                FullName: '',
                Id: 0,
                IsActive: '',
                Name: '',
                Type: '0',
                UpdatedBy: '',
                UpdatedOn: null,
                Value: '',
                CompanyId: 0,
                EntityMessage: ''
            };
    };
    LookupComponent.prototype.ngOnInit = function () {
        this._CommonHelperService.ToogleMenu();
        this.LookupFrm = this.fb.group({
            CompanyId: [''],
            Id: [''],
            Name: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(100)])],
            Type: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(100)])],
            Value: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(100)])],
            FullName: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(100)])],
            ColorCode: [''],
            Country: [''],
            IsActive: [''],
            CreatedOn: [''],
            UpdatedOn: [''],
            CreatedBy: [''],
            UpdatedBy: [''],
            EntityMessage: [''],
        });
        this.LoadLookup();
        this.LoadLookupType();
        debugger;
    };
    LookupComponent.prototype.LookupFilterCriteriaChange = function (value) {
        if (value != '[object Event]')
            this.LookupFilter = value;
    };
    LookupComponent.prototype.LookupSort = function (property) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    };
    ;
    LookupComponent.prototype.LoadLookup = function () {
        var _this = this;
        this.indLoading = true;
        this._LookupService.get(global_1.Global.BASE_LOOKUP_ENDPOINT)
            .subscribe(function (lookups) {
            _this.lookups = lookups;
            //Logic for searching - start
            if (_this.ShowHideSearch) {
                _this.strSearchName = document.getElementById("searchName").value;
                if (_this.strSearchName != '') {
                    _this.strSearchName = _this.strSearchName.toLocaleLowerCase();
                    _this.lookups = _this.lookups.filter(function (x) { return x.Name != null && x.Name.toLocaleLowerCase().indexOf(_this.strSearchName) != -1; });
                }
                _this.strSearchType = document.getElementById("searchType").value;
                if (_this.strSearchType != '') {
                    _this.strSearchType = _this.strSearchType.toLocaleLowerCase();
                    _this.lookups = _this.lookups.filter(function (x) { return x.Type != null && x.Type.toLocaleLowerCase().indexOf(_this.strSearchType) != -1; });
                }
                //this.strSearchValue = (<HTMLInputElement>document.getElementById("searchValue")).value;
                //if (this.strSearchValue != '')
                //{
                //    this.strSearchValue = this.strSearchValue.toLocaleLowerCase();
                //    this.lookups = this.lookups.filter
                //        (
                //        x => x.Value != null && x.Value.indexOf(this.strSearchValue) != -1);
                //}
                _this.strSearchFullName = document.getElementById("searchFullName").value;
                if (_this.strSearchFullName != '') {
                    _this.strSearchFullName = _this.strSearchFullName.toLocaleLowerCase();
                    _this.lookups = _this.lookups.filter(function (x) { return x.FullName != null && x.FullName.toLocaleLowerCase().indexOf(_this.strSearchFullName) != -1; });
                }
                _this.strSearchColorCode = document.getElementById("searchColorCode").value;
                if (_this.strSearchColorCode != '') {
                    _this.strSearchColorCode = _this.strSearchColorCode.toLocaleLowerCase();
                    _this.lookups = _this.lookups.filter(function (x) { return x.ColorCode != null && x.ColorCode.toLocaleLowerCase().indexOf(_this.strSearchColorCode) != -1; });
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
    LookupComponent.prototype.LoadLookupType = function () {
        var _this = this;
        this.indLoading = true;
        this._LookupTypeService.get(global_1.Global.BASE_LOOKUPTYPE_ENDPOINT)
            .subscribe(function (lookuptype) {
            _this.LookupTyeList = lookuptype;
        });
        return this.LookupTyeList;
    };
    LookupComponent.prototype.AddLookup = function () {
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New Lookup";
        this.modalBtnTitle = "Add";
        this.Resetmodel();
        this.LookupFrm.setValue(this.lookup);
        $("#ColorCode").css("background-color", "");
        this.modal.open();
    };
    LookupComponent.prototype.EditLookup = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit Lookup";
        this.modalBtnTitle = "Update";
        this.lookup = this.lookups.filter(function (x) { return x.Id == id; })[0];
        this.LookupFrm.setValue(this.lookup);
        $("#ColorCode").css("background-color", this.lookup.ColorCode);
        this.modal.open();
    };
    LookupComponent.prototype.DeleteLookup = function (id, status) {
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
        this.lookup = this.lookups.filter(function (x) { return x.Id == id; })[0];
        this.LookupFrm.setValue(this.lookup);
        $("#ColorCode").css("background-color", this.lookup.ColorCode);
        this.modal.open();
    };
    LookupComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.LookupFrm.enable() : this.LookupFrm.disable();
    };
    LookupComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    LookupComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.lookups);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    LookupComponent.prototype.ShowHideSearchControls = function () {
        this.ShowHideSearch = !this.ShowHideSearch;
    };
    LookupComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        formData.value.ColorCode = ($("#ColorCode").val());
        this.msg = "";
        debugger;
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._LookupService.post(global_1.Global.BASE_LOOKUP_ENDPOINT, formData.value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadLookup();
                        _this.modal.dismiss();
                        $("#ColorCode").val(null);
                    }
                    else {
                        alert(data);
                    }
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.update:
                this._LookupService.put(global_1.Global.BASE_LOOKUP_ENDPOINT, formData.value.Id, formData.value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadLookup();
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
                this._LookupService.delete(global_1.Global.BASE_LOOKUP_ENDPOINT, formData.value.Id).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = "Lookup status changed successfully.";
                        _this.LoadLookup();
                    }
                    else {
                        _this.msg = "Error has occurred while changing status of existing Lookup!";
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
    ], LookupComponent.prototype, "modal", void 0);
    LookupComponent = __decorate([
        core_1.Component({
            providers: [Lookup_service_1.LookupService, LookupType_service_1.LookupTypeService],
            templateUrl: 'app/Components/Masters/CompanyRelated/Lookup.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, Lookup_service_1.LookupService, pager_index_1.PagerService, LookupType_service_1.LookupTypeService, CommonHelper_service_1.CommonHelperService])
    ], LookupComponent);
    return LookupComponent;
}());
exports.LookupComponent = LookupComponent;
