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
var ContactMaster_service_1 = require("../../../service/Masters/CompanyRelated/ContactMaster.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../../../Shared/enum");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../../Shared/global");
//import * as _ from 'underscore';
var pager_index_1 = require("../../../Shared/pager.index");
var ContactMasterComponent = (function () {
    function ContactMasterComponent(fb, _ContactMasterService, pagerService) {
        this.fb = fb;
        this._ContactMasterService = _ContactMasterService;
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
    ContactMasterComponent.prototype.ngOnInit = function () {
        this.ContactMasterFrm = this.fb.group({
            Id: [''],
            Name: ['', forms_1.Validators.required],
            Designation: ['', forms_1.Validators.required],
            Email: ['', forms_1.Validators.required],
            phone: ['', forms_1.Validators.required],
            SkypeId: ['', forms_1.Validators.required],
            MsnId: ['', forms_1.Validators.required],
            GtalkId: ['', forms_1.Validators.required],
            AolId: ['', forms_1.Validators.required],
            Other: ['', forms_1.Validators.required],
            ProspectId: ['', forms_1.Validators.required],
            CompanyId: [''],
            CreatedOn: [''],
            CreatedBy: [''],
            UpdatedOn: [''],
            UpdatedBy: [''],
            IsActive: [''],
            EntityMessage: ['']
        });
        this.LoadContactMasters();
    };
    ContactMasterComponent.prototype.ContactMasterFilterCriteriaChange = function (value) {
        if (value != '[object Event]')
            this.ContactMasterFilter = value;
    };
    ContactMasterComponent.prototype.ContactMasterSort = function (property) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    };
    ;
    ContactMasterComponent.prototype.LoadContactMasters = function () {
        var _this = this;
        this.indLoading = true;
        this._ContactMasterService.get(global_1.Global.BASE_CONTACTMASTER_ENDPOINT)
            .subscribe(function (ContactMasters) {
            _this.ContactMasters = ContactMasters;
            //Logic for searching - start
            if (_this.ShowHideSearch) {
                _this.strSearchName = document.getElementById("searchName").value;
                if (_this.strSearchName != '') {
                    _this.strSearchName = _this.strSearchName.toLocaleLowerCase();
                    _this.ContactMasters = _this.ContactMasters.filter(function (x) { return x.Name != null && x.Name.toLocaleLowerCase().indexOf(_this.strSearchName) != -1; });
                }
                _this.strSearchDesignation = document.getElementById("searchDesignation").value;
                if (_this.strSearchDesignation != '') {
                    _this.strSearchDesignation = _this.strSearchDesignation.toLocaleLowerCase();
                    _this.ContactMasters = _this.ContactMasters.filter(function (x) { return x.Designation != null && x.Designation.toLocaleLowerCase().indexOf(_this.strSearchDesignation) != -1; });
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
    ContactMasterComponent.prototype.addContactMaster = function () {
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New Contact";
        this.modalBtnTitle = "Add";
        this.ContactMasterFrm.reset();
        this.modal.open();
    };
    ContactMasterComponent.prototype.editContactMaster = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit Contact";
        this.modalBtnTitle = "Update";
        this.ContactMaster = this.ContactMasters.filter(function (x) { return x.Id == id; })[0];
        this.ContactMasterFrm.setValue(this.ContactMaster);
        this.modal.open();
    };
    ContactMasterComponent.prototype.deleteContactMaster = function (id, status) {
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
        this.ContactMaster = this.ContactMasters.filter(function (x) { return x.Id == id; })[0];
        this.ContactMasterFrm.setValue(this.ContactMaster);
        this.modal.open();
    };
    ContactMasterComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.ContactMasterFrm.enable() : this.ContactMasterFrm.disable();
    };
    ContactMasterComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    ContactMasterComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.ContactMasters);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    ContactMasterComponent.prototype.ShowHideSearchControls = function () {
        this.ShowHideSearch = !this.ShowHideSearch;
    };
    ContactMasterComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._ContactMasterService.post(global_1.Global.BASE_CONTACTMASTER_ENDPOINT, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadContactMasters();
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
                this._ContactMasterService.put(global_1.Global.BASE_CONTACTMASTER_ENDPOINT, formData._value.Id, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadContactMasters();
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
                this._ContactMasterService.delete(global_1.Global.BASE_CONTACTMASTER_ENDPOINT, formData._value.Id).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = "ContactMaster status changed successfully.";
                        _this.LoadContactMasters();
                    }
                    else {
                        _this.msg = "Error has occurred while changing status of existing ContactMaster!";
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
    ], ContactMasterComponent.prototype, "modal", void 0);
    ContactMasterComponent = __decorate([
        core_1.Component({
            providers: [ContactMaster_service_1.ContactMasterService],
            templateUrl: 'app/Components/Masters/CompanyRelated/ContactMaster.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ContactMaster_service_1.ContactMasterService, pager_index_1.PagerService])
    ], ContactMasterComponent);
    return ContactMasterComponent;
}());
exports.ContactMasterComponent = ContactMasterComponent;
