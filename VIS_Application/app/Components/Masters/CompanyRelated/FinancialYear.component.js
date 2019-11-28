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
var FinancialYear_service_1 = require("../../../service/Masters/CompanyRelated/FinancialYear.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../../../Shared/enum");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../../Shared/global");
//import * as _ from 'underscore';
var pager_index_1 = require("../../../Shared/pager.index");
var FinancialYearComponent = (function () {
    function FinancialYearComponent(fb, _FinancialYearService, pagerService) {
        this.fb = fb;
        this._FinancialYearService = _FinancialYearService;
        this.pagerService = pagerService;
        this.indLoading = false;
        this.isDesc = false;
        this.column = 'Full_Name';
        // pager object
        this.pager = {};
        this.CurrentRecordsPerPage = 10;
        //Variables for Filter
        this.ShowHideSearch = false;
        this.ArrayYear = new Array();
    }
    FinancialYearComponent.prototype.ngOnInit = function () {
        this.FinancialYear = ({
            Id: 0,
            FromMonth: '',
            ToMonth: '',
            CurrentYear: '',
            Nextyear: '',
            FinancialYear: '',
            CreatedOn: null,
            CreatedBy: 0,
            UpdatedOn: null,
            UpdatedBy: 0,
            IsActive: false,
            EntityMessage: ''
        });
        this.LoadFinancialYearsCM();
        this.LoadFinancialYears();
    };
    FinancialYearComponent.prototype.LoadFinancialYearsCM = function () {
    };
    FinancialYearComponent.prototype.GetNextYear = function () {
        this.ArrayYear = [];
        var displayDate = (new Date()).getFullYear();
        var EndDate = displayDate + 1;
        var j = 10;
        for (var i = 0; i < j; i++) {
            this.ArrayYear.push(EndDate);
            EndDate = EndDate - 1;
        }
    };
    FinancialYearComponent.prototype.FinancialYearFilterCriteriaChange = function (value) {
        if (value != '[object Event]')
            this.FinancialYearFilter = value;
    };
    FinancialYearComponent.prototype.FinancialYearSort = function (property) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    };
    ;
    FinancialYearComponent.prototype.ResetInputControls = function () {
        this.FinancialYear.FinancialYear = null;
        this.FinancialYear.FromMonth = null;
        this.FinancialYear.Nextyear = null;
        this.FinancialYear.ToMonth = null;
    };
    FinancialYearComponent.prototype.LoadFinancialYears = function () {
        var _this = this;
        this.indLoading = true;
        this._FinancialYearService.get(global_1.Global.BASE_FINANCIALYEAR_ENDPOINT)
            .subscribe(function (FinancialYears) {
            _this.FinancialYears = FinancialYears;
            //Logic for searching - start
            if (_this.ShowHideSearch) {
                _this.strSearchFromMonth = document.getElementById("searchFromMonth").value;
                if (_this.strSearchFromMonth != '') {
                    _this.strSearchFromMonth = _this.strSearchFromMonth.toLocaleLowerCase();
                    _this.FinancialYears = _this.FinancialYears.filter(function (x) { return x.FromMonth != null && x.FromMonth.toLocaleLowerCase().indexOf(_this.strSearchFromMonth) != -1; });
                }
                _this.strSearchToMonth = document.getElementById("searchToMonth").value;
                if (_this.strSearchToMonth != '') {
                    _this.strSearchToMonth = _this.strSearchToMonth.toLocaleLowerCase();
                    _this.FinancialYears = _this.FinancialYears.filter(function (x) { return x.ToMonth != null && x.ToMonth.toLocaleLowerCase().indexOf(_this.strSearchToMonth) != -1; });
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
    FinancialYearComponent.prototype.addFinancialYear = function () {
        //  this.ResetInputControls();
        $(function () {
            var year = $("#lblYear").val((new Date()).getFullYear());
        });
        this.GetNextYear();
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New Financial Year";
        this.modalBtnTitle = "Add";
        //this.FinancialYearFrm.reset();
        this.modal.open();
    };
    FinancialYearComponent.prototype.editFinancialYear = function (id) {
        this.GetNextYear();
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit Financial Year";
        this.modalBtnTitle = "Update";
        this.FinancialYear = this.FinancialYears.filter(function (x) { return x.Id == id; })[0];
        //this.FinancialYearFrm.setValue(this.FinancialYear);
        this.modal.open();
    };
    FinancialYearComponent.prototype.deleteFinancialYear = function (id, status) {
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
        this.FinancialYear = this.FinancialYears.filter(function (x) { return x.Id == id; })[0];
        //this.FinancialYearFrm.setValue(this.FinancialYear);
        this.modal.open();
    };
    FinancialYearComponent.prototype.SetControlsState = function (isEnable) {
        // isEnable ? this.FinancialYearFrm.enable() : this.FinancialYearFrm.disable();
    };
    FinancialYearComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    FinancialYearComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.FinancialYears);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    FinancialYearComponent.prototype.ShowHideSearchControls = function () {
        this.ShowHideSearch = !this.ShowHideSearch;
    };
    FinancialYearComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._FinancialYearService.post(global_1.Global.BASE_FINANCIALYEAR_ENDPOINT, formData).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadFinancialYears();
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
                this._FinancialYearService.put(global_1.Global.BASE_FINANCIALYEAR_ENDPOINT, formData.Id, formData).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadFinancialYears();
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
                this._FinancialYearService.delete(global_1.Global.BASE_FINANCIALYEAR_ENDPOINT, formData.Id).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = "Financial Year status changed successfully.";
                        _this.LoadFinancialYears();
                    }
                    else {
                        _this.msg = "Error has occurred while changing status of existing FinancialYear!";
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
    ], FinancialYearComponent.prototype, "modal", void 0);
    FinancialYearComponent = __decorate([
        core_1.Component({
            providers: [FinancialYear_service_1.FinancialYearService],
            templateUrl: 'app/Components/Masters/CompanyRelated/FinancialYear.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, FinancialYear_service_1.FinancialYearService, pager_index_1.PagerService])
    ], FinancialYearComponent);
    return FinancialYearComponent;
}());
exports.FinancialYearComponent = FinancialYearComponent;
