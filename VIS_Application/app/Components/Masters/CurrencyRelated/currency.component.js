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
var currency_service_1 = require("../../../service/Masters/CurrencyRelated/currency.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../../../Shared/enum");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../../Shared/global");
//import * as _ from 'underscore';
var pager_index_1 = require("../../../Shared/pager.index");
var CurrencyComponent = (function () {
    function CurrencyComponent(fb, _currencyService, pagerService) {
        this.fb = fb;
        this._currencyService = _currencyService;
        this.pagerService = pagerService;
        this.indLoading = false;
        this.isDesc = false;
        this.column = 'Full_Name';
        this.CurrentRecordsPerPage = 10;
        // pager object
        this.pager = {};
        //Variables for Filter
        this.ShowHideSearch = false;
    }
    CurrencyComponent.prototype.ngOnInit = function () {
        this.currencyFrm = this.fb.group({
            CompanyId: [''],
            Id: [''],
            Full_Name: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(50)])],
            Short_Name: ['', forms_1.Validators.required],
            Sub_Unit: ['', forms_1.Validators.required],
            Symbol: ['', forms_1.Validators.required],
            Is_Base_Currency: [''],
            Default_Exchange: ['', forms_1.Validators.required],
            CreatedOn: [''],
            CreatedBy: [''],
            UpdatedOn: [''],
            UpdatedBy: [''],
            IsActive: [''],
            EntityMessage: ['']
        });
        this.LoadCurrencys();
    };
    CurrencyComponent.prototype.CurrencyFilterCriteriaChange = function (value) {
        if (value != '[object Event]')
            this.CurrencyFilter = value;
    };
    CurrencyComponent.prototype.CurrencySort = function (property) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    };
    CurrencyComponent.prototype.LoadCurrencys = function () {
        var _this = this;
        this.indLoading = true;
        this._currencyService.get(global_1.Global.BASE_CURRENCY_ENDPOINT)
            .subscribe(function (currencys) {
            _this.currencys = currencys;
            //Logic for searching - start
            if (_this.ShowHideSearch) {
                _this.strSearchFull_Name = document.getElementById("searchFull_Name").value;
                if (_this.strSearchFull_Name != '') {
                    _this.strSearchFull_Name = _this.strSearchFull_Name.toLocaleLowerCase();
                    _this.currencys = _this.currencys.filter(function (x) { return x.Full_Name != null && x.Full_Name.toLocaleLowerCase().indexOf(_this.strSearchFull_Name) != -1; });
                }
                _this.strSearchShort_Name = document.getElementById("searchShort_Name").value;
                if (_this.strSearchShort_Name != '') {
                    _this.strSearchShort_Name = _this.strSearchShort_Name.toLocaleLowerCase();
                    _this.currencys = _this.currencys.filter(function (x) { return x.Short_Name != null && x.Short_Name.toLocaleLowerCase().indexOf(_this.strSearchShort_Name) != -1; });
                }
                _this.strSearchSub_Unit = document.getElementById("searchSub_Unit").value;
                if (_this.strSearchSub_Unit != '') {
                    _this.strSearchSub_Unit = _this.strSearchSub_Unit.toLocaleLowerCase();
                    _this.currencys = _this.currencys.filter(function (x) { return x.Sub_Unit != null && x.Sub_Unit.toLocaleLowerCase().indexOf(_this.strSearchSub_Unit) != -1; });
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
    CurrencyComponent.prototype.addCurrency = function () {
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New Currency";
        this.modalBtnTitle = "Add";
        this.currencyFrm.reset();
        this.modal.open();
    };
    CurrencyComponent.prototype.editCurrency = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit Currency";
        this.modalBtnTitle = "Update";
        this.currency = this.currencys.filter(function (x) { return x.Id == id; })[0];
        this.currencyFrm.setValue(this.currency);
        this.modal.open();
    };
    CurrencyComponent.prototype.deleteCurrency = function (id, status) {
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
        this.currency = this.currencys.filter(function (x) { return x.Id == id; })[0];
        this.currencyFrm.setValue(this.currency);
        this.modal.open();
    };
    CurrencyComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.currencyFrm.enable() : this.currencyFrm.disable();
    };
    CurrencyComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    CurrencyComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.currencys);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    CurrencyComponent.prototype.ShowHideSearchControls = function () {
        this.ShowHideSearch = !this.ShowHideSearch;
    };
    CurrencyComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._currencyService.post(global_1.Global.BASE_CURRENCY_ENDPOINT, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadCurrencys();
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
                this._currencyService.put(global_1.Global.BASE_CURRENCY_ENDPOINT, formData._value.Id, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadCurrencys();
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
                this._currencyService.delete(global_1.Global.BASE_CURRENCY_ENDPOINT, formData._value.Id).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = "Currency status changed successfully.";
                        _this.LoadCurrencys();
                    }
                    else {
                        _this.msg = "Error has occurred while changing status of existing currency!";
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
    ], CurrencyComponent.prototype, "modal", void 0);
    CurrencyComponent = __decorate([
        core_1.Component({
            providers: [currency_service_1.CurrencyService],
            templateUrl: 'app/Components/Masters/CurrencyRelated/currency.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, currency_service_1.CurrencyService, pager_index_1.PagerService])
    ], CurrencyComponent);
    return CurrencyComponent;
}());
exports.CurrencyComponent = CurrencyComponent;
