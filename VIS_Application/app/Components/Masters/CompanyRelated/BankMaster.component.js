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
var BankMaster_service_1 = require("../../../service/Masters/CompanyRelated/BankMaster.service");
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
var BankMasterComponent = (function () {
    function BankMasterComponent(fb, _BankMasterService, pagerService, _CommonHelperService) {
        this.fb = fb;
        this._BankMasterService = _BankMasterService;
        this.pagerService = pagerService;
        this._CommonHelperService = _CommonHelperService;
        this.indLoading = false;
        this.isDesc = false;
        this.column = 'BankName';
        // pager object
        this.pager = {};
        this.CurrentRecordsPerPage = 10;
        //Variables for Filter
        this.ShowHideSearch = false;
    }
    BankMasterComponent.prototype.Resetmodel = function () {
        this.bankmaster =
            {
                AccountNumber: '',
                BankAddress: '',
                BankAlias: '',
                BankDetail: '',
                BankName: '',
                BranchName: '',
                CompanyId: 0,
                CreatedBy: '',
                CreatedOn: null,
                CurrencyId: 0,
                Id: 0,
                IsActive: false,
                Status: false,
                UpdatedBy: '',
                UpdatedOn: null,
                EntityMessage: '',
            };
    };
    BankMasterComponent.prototype.ngOnInit = function () {
        this._CommonHelperService.ToogleMenu();
        this.BankMasterFrm = this.fb.group({
            Id: [''],
            BankAlias: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(1), forms_1.Validators.maxLength(50)])],
            BankName: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(50)])],
            BranchName: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(50)])],
            BankAddress: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(100)])],
            IsActive: [''],
            CreatedOn: [''],
            UpdatedOn: [''],
            BankDetail: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(50)])],
            CreatedBy: [''],
            UpdatedBy: [''],
            AccountNumber: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(1), forms_1.Validators.maxLength(50)])],
            Status: [''],
            CompanyId: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(1), forms_1.Validators.maxLength(50)])],
            CurrencyId: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(1), forms_1.Validators.maxLength(50)])],
            EntityMessage: ['']
        });
        this.LoadBankMaster();
        this.GetCompany();
        this.GetCurrency();
    };
    BankMasterComponent.prototype.BankFilterCriteriaChange = function (value) {
        if (value != '[object Event]')
            this.BankMasterFilter = value;
    };
    BankMasterComponent.prototype.BankMasterSort = function (property) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    };
    ;
    BankMasterComponent.prototype.LoadBankMaster = function () {
        var _this = this;
        this.indLoading = true;
        this._BankMasterService.get(global_1.Global.BASE_BANKMASTER_ENDPOINT)
            .subscribe(function (bankmasters) {
            _this.bankmasters = bankmasters;
            //Logic for searching - start
            if (_this.ShowHideSearch) {
                _this.strSearchBankAlias = document.getElementById("searchBankAlias").value;
                if (_this.strSearchBankAlias != '') {
                    _this.strSearchBankAlias = _this.strSearchBankAlias.toLocaleLowerCase();
                    _this.bankmasters = _this.bankmasters.filter(function (x) { return x.BankAlias != null && x.BankAlias.toLocaleLowerCase().indexOf(_this.strSearchBankAlias) != -1; });
                }
                _this.strSearchBankName = document.getElementById("searchBankName").value;
                if (_this.strSearchBankName != '') {
                    _this.strSearchBankName = _this.strSearchBankName.toLocaleLowerCase();
                    _this.bankmasters = _this.bankmasters.filter(function (x) { return x.BankName != null && x.BankName.toLocaleLowerCase().indexOf(_this.strSearchBankName) != -1; });
                }
                _this.strSearchBranchName = document.getElementById("searchBranchName").value;
                if (_this.strSearchBranchName != '') {
                    _this.strSearchBranchName = _this.strSearchBranchName.toLocaleLowerCase();
                    _this.bankmasters = _this.bankmasters.filter(function (x) { return x.BranchName != null && x.BranchName.toLocaleLowerCase().indexOf(_this.strSearchBranchName) != -1; });
                }
                _this.strSearchBankAddress = document.getElementById("searchBankAddress").value;
                if (_this.strSearchBankAddress != '') {
                    _this.strSearchBankAddress = _this.strSearchBankAddress.toLocaleLowerCase();
                    _this.bankmasters = _this.bankmasters.filter(function (x) { return x.BankAddress != null && x.BankAddress.toLocaleLowerCase().indexOf(_this.strSearchBankAddress) != -1; });
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
    BankMasterComponent.prototype.AddBankMaster = function () {
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New Bank";
        this.modalBtnTitle = "Add";
        this.Resetmodel();
        this.BankMasterFrm.setValue(this.bankmaster);
        this.modal.open();
    };
    BankMasterComponent.prototype.editBankMaster = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit Bank";
        this.modalBtnTitle = "Update";
        this.bankmaster = this.bankmasters.filter(function (x) { return x.Id == id; })[0];
        this.BankMasterFrm.setValue(this.bankmaster);
        this.modal.open();
    };
    BankMasterComponent.prototype.deleteBankMaster = function (id, status) {
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
        this.bankmaster = this.bankmasters.filter(function (x) { return x.Id == id; })[0];
        this.BankMasterFrm.setValue(this.bankmaster);
        this.modal.open();
    };
    BankMasterComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.BankMasterFrm.enable() : this.BankMasterFrm.disable();
    };
    BankMasterComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    BankMasterComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.bankmasters);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    BankMasterComponent.prototype.ShowHideSearchControls = function () {
        this.ShowHideSearch = !this.ShowHideSearch;
    };
    BankMasterComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._BankMasterService.post(global_1.Global.BASE_BANKMASTER_ENDPOINT, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadBankMaster();
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
                this._BankMasterService.put(global_1.Global.BASE_BANKMASTER_ENDPOINT, formData._value.Id, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadBankMaster();
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
                this._BankMasterService.delete(global_1.Global.BASE_BANKMASTER_ENDPOINT, formData._value.Id).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = "Bank status changed successfully.";
                        _this.LoadBankMaster();
                    }
                    else {
                        _this.msg = "Error has occurred while changing status of existing Bank!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
        }
    };
    BankMasterComponent.prototype.GetCompany = function () {
        var _this = this;
        this.indLoading = true;
        this._BankMasterService.getcompany(global_1.Global.BASE_BANKMASTER_ENDPOINT)
            .subscribe(function (companylist) {
            _this.company = companylist;
        });
    };
    BankMasterComponent.prototype.GetCurrency = function () {
        var _this = this;
        this.indLoading = true;
        this._BankMasterService.getcurrency(global_1.Global.BASE_BANKMASTER_ENDPOINT)
            .subscribe(function (currencylist) {
            _this.currency = currencylist;
        });
    };
    __decorate([
        core_1.ViewChild('modal'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], BankMasterComponent.prototype, "modal", void 0);
    BankMasterComponent = __decorate([
        core_1.Component({
            providers: [BankMaster_service_1.BankMasterService],
            templateUrl: 'app/Components/Masters/CompanyRelated/BankMaster.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, BankMaster_service_1.BankMasterService, pager_index_1.PagerService, CommonHelper_service_1.CommonHelperService])
    ], BankMasterComponent);
    return BankMasterComponent;
}());
exports.BankMasterComponent = BankMasterComponent;
