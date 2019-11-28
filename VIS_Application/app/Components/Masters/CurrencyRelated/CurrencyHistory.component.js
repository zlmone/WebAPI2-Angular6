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
var CurrencyHistory_service_1 = require("../../../service/Masters/CurrencyRelated/CurrencyHistory.service");
var currency_service_1 = require("../../../service/Masters/CurrencyRelated/currency.service");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../../../Shared/enum");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../../Shared/global");
//import * as _ from 'underscore';
var pager_index_1 = require("../../../Shared/pager.index");
var CommonHelper_service_1 = require("../../../Shared/CommonHelper.service");
var CurrencyHistoryComponent = (function () {
    function CurrencyHistoryComponent(_CurrencyHistoryService, pagerService, _CurrencyService, _CommonHelperService) {
        this._CurrencyHistoryService = _CurrencyHistoryService;
        this.pagerService = pagerService;
        this._CurrencyService = _CurrencyService;
        this._CommonHelperService = _CommonHelperService;
        this.ToDayDate = new Date();
        this.YearNow = this.ToDayDate.getFullYear();
        this.indLoading = false;
        this.isDesc = false;
        this.column = 'Full_Name';
        this.CurrentRecordsPerPage = 10;
        // pager object
        this.pager = {};
        //Variables for Filter
        this.ShowHideSearch = false;
    }
    CurrencyHistoryComponent.prototype.ResetModel = function () {
        this.objICurrencyHistory =
            ({
                CompanyId: 0,
                CreatedBy: '',
                CreatedOn: null,
                Currency_Id: 0,
                Current_Exch_Rate: 0,
                Date_Entered: null,
                Default_Exch_Rate: 0,
                FromDate: null,
                Id: 0,
                IsActive: false,
                Month_Entered: 1,
                ToDate: null,
                UpdatedBy: '',
                UpdatedOn: null,
                Year_Entered: this.YearNow
            });
    };
    CurrencyHistoryComponent.prototype.ngOnInit = function () {
        this._CommonHelperService.ToogleMenu();
        this.ResetModel();
        this.listICurrencyHistory = [({
                CompanyId: 0,
                CreatedBy: '',
                CreatedOn: null,
                Currency_Id: 0,
                Current_Exch_Rate: 0,
                Date_Entered: null,
                Default_Exch_Rate: 0,
                FromDate: null,
                Id: 0,
                IsActive: false,
                Month_Entered: 0,
                ToDate: null,
                UpdatedBy: '',
                UpdatedOn: null,
                Year_Entered: 0
            })];
        this.LoadCurrencyHistory();
        this.BindCurrencyDropdown();
        this.GetYear();
    };
    CurrencyHistoryComponent.prototype.GetYear = function () {
        this.YearNow = new Date().getFullYear();
        this.Year = [];
        for (var i = 0; i < 100; i++) {
            this.Year.push(this.YearNow);
            this.YearNow++;
        }
    };
    CurrencyHistoryComponent.prototype.ChangeDefaultExchangeRateByCurrency = function (id) {
        var _this = this;
        this._CurrencyHistoryService.getbyid(global_1.Global.BASE_CurrencyHistoryAPI_ENDPOINT, id).
            subscribe(function (defaultexchangerate) {
            _this.objICurrencyHistory.Default_Exch_Rate = Number(defaultexchangerate);
        });
    };
    CurrencyHistoryComponent.prototype.CurrencyFilterCriteriaChange = function (value) {
        if (value != '[object Event]')
            this.CurrencyFilter = value;
    };
    CurrencyHistoryComponent.prototype.CurrencySort = function (property) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    };
    CurrencyHistoryComponent.prototype.LoadCurrencyHistory = function () {
        var _this = this;
        this.indLoading = true;
        this._CurrencyHistoryService.get(global_1.Global.BASE_CurrencyHistoryAPI_ENDPOINT)
            .subscribe(function (currencyhistorylist) {
            _this.listICurrencyHistory = currencyhistorylist;
            //Logic for searching - start
            if (_this.ShowHideSearch) {
                _this.DefaultExchangeRate = document.getElementById("txtDefaultExchangeRate").value;
                if (_this.DefaultExchangeRate != '') {
                    _this.DefaultExchangeRate = _this.DefaultExchangeRate.toLocaleLowerCase();
                    _this.listICurrencyHistory = _this.listICurrencyHistory.filter(function (x) { return x.Default_Exch_Rate != null && x.Default_Exch_Rate.toLocaleString().indexOf(_this.DefaultExchangeRate) != -1; });
                }
                _this.CurrentExchangeRate = document.getElementById("txtCurrentExchangeRate").value;
                if (_this.CurrentExchangeRate != '') {
                    _this.CurrentExchangeRate = _this.CurrentExchangeRate.toLocaleLowerCase();
                    _this.listICurrencyHistory = _this.listICurrencyHistory.filter(function (x) { return x.Current_Exch_Rate != null && x.Current_Exch_Rate.toLocaleString().indexOf(_this.CurrentExchangeRate) != -1; });
                }
                _this.FromDate = document.getElementById("txtfromdate").value;
                if (_this.FromDate != '') {
                    _this.FromDate = _this.FromDate.toLocaleLowerCase();
                    _this.listICurrencyHistory = _this.listICurrencyHistory.filter(function (x) { return x.FromDate != null && x.FromDate.toLocaleString().indexOf(_this.FromDate) != -1; });
                }
                _this.ToDate = document.getElementById("txttodate").value;
                if (_this.ToDate != '') {
                    _this.ToDate = _this.ToDate.toLocaleLowerCase();
                    _this.listICurrencyHistory = _this.listICurrencyHistory.filter(function (x) { return x.ToDate != null && x.ToDate.toLocaleString().indexOf(_this.ToDate) != -1; });
                }
            }
            //Logic for searching - End
            _this.indLoading = false;
            // initialize to page 1
            _this.JumpOnPage(1);
        });
        //,error => this.msg = <any>error
    };
    CurrencyHistoryComponent.prototype.BindCurrencyDropdown = function () {
        var _this = this;
        this._CurrencyService.get(global_1.Global.BASE_CURRENCY_ENDPOINT).
            subscribe(function (currencylist) {
            _this.lstCurrency = currencylist;
        });
    };
    CurrencyHistoryComponent.prototype.addCurrencyhistory = function () {
        this.dbops = enum_1.DBOperation.create;
        this.modalTitle = "Add New Currency History";
        this.modalBtnTitle = "Add";
        this.objICurrencyHistory.Currency_Id = 0;
        this.objICurrencyHistory.Default_Exch_Rate = 0;
        this.objICurrencyHistory.Current_Exch_Rate = 0;
        this.objICurrencyHistory.Month_Entered = 1;
        this.YearNow = this.ToDayDate.getFullYear();
        this.objICurrencyHistory.Year_Entered = this.YearNow;
        this.modal.open();
    };
    CurrencyHistoryComponent.prototype.editCurrencyhistory = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.modalTitle = "Edit Currency";
        this.modalBtnTitle = "Update";
        this.objICurrencyHistory = this.listICurrencyHistory.filter(function (x) { return x.Id == id; })[0];
        this.YearNow = this.ToDayDate.getFullYear();
        if (this.objICurrencyHistory.Year_Entered < this.YearNow) {
            this.objICurrencyHistory.Year_Entered = this.YearNow;
        }
        this.modal.open();
    };
    CurrencyHistoryComponent.prototype.deleteCurrencyhistory = function (id, status) {
        this.dbops = enum_1.DBOperation.delete;
        if (status == true) {
            this.modalTitle = "Confirm to Delete?";
            this.modalBtnTitle = "Delete";
        }
        else {
            this.modalTitle = "Confirm to Undo Delete?";
            this.modalBtnTitle = "Undo Delete";
        }
        this.objICurrencyHistory = this.listICurrencyHistory.filter(function (x) { return x.Id == id; })[0];
        this.YearNow = this.ToDayDate.getFullYear();
        if (this.objICurrencyHistory.Year_Entered < this.YearNow) {
            this.objICurrencyHistory.Year_Entered = this.YearNow;
        }
        this.modal.open();
    };
    CurrencyHistoryComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.currencyFrm.enable() : this.currencyFrm.disable();
    };
    CurrencyHistoryComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    CurrencyHistoryComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.listICurrencyHistory);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    CurrencyHistoryComponent.prototype.ShowHideSearchControls = function () {
        this.ShowHideSearch = !this.ShowHideSearch;
    };
    CurrencyHistoryComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        if (formData.Currency_Id != 0) {
            switch (this.dbops) {
                case enum_1.DBOperation.create:
                    this._CurrencyHistoryService.post(global_1.Global.BASE_CurrencyHistoryAPI_ENDPOINT, formData).subscribe(function (data) {
                        if (data.startsWith("Success: ")) {
                            _this.msg = data;
                            _this.LoadCurrencyHistory();
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
                    this._CurrencyHistoryService.put(global_1.Global.BASE_CurrencyHistoryAPI_ENDPOINT, formData.Id, formData).subscribe(function (data) {
                        if (data.startsWith("Success: ")) {
                            _this.msg = data;
                            _this.LoadCurrencyHistory();
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
                    this._CurrencyHistoryService.delete(global_1.Global.BASE_CurrencyHistoryAPI_ENDPOINT, formData.Id).subscribe(function (data) {
                        if (data.startsWith("Success: ")) {
                            _this.msg = "Currency status changed successfully.";
                            _this.LoadCurrencyHistory();
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
        }
        else {
            alert("Please Select Currency !");
        }
    };
    __decorate([
        core_1.ViewChild('modal'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], CurrencyHistoryComponent.prototype, "modal", void 0);
    CurrencyHistoryComponent = __decorate([
        core_1.Component({
            providers: [CurrencyHistory_service_1.CurrencyHistoryService, currency_service_1.CurrencyService],
            templateUrl: 'app/Components/Masters/CurrencyRelated/CurrencyHistory.component.html'
        }),
        __metadata("design:paramtypes", [CurrencyHistory_service_1.CurrencyHistoryService, pager_index_1.PagerService, currency_service_1.CurrencyService, CommonHelper_service_1.CommonHelperService])
    ], CurrencyHistoryComponent);
    return CurrencyHistoryComponent;
}());
exports.CurrencyHistoryComponent = CurrencyHistoryComponent;
