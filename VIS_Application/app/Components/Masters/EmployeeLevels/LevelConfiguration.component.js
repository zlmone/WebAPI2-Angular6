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
var LevelConfiguration_service_1 = require("../../../service/Masters/EmployeeLevels/LevelConfiguration.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../../../Shared/enum");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../../Shared/global");
var pager_index_1 = require("../../../Shared/pager.index");
var LevelConfigurationComponent = (function () {
    function LevelConfigurationComponent(fb, _LevelConfigurationService, pagerService) {
        this.fb = fb;
        this._LevelConfigurationService = _LevelConfigurationService;
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
    LevelConfigurationComponent.prototype.ngOnInit = function () {
        this.LevelConfigurationFrm = this.fb.group({
            Id: [''],
            Period: [''],
            PeriodName: [''],
            StartDate: [''],
            EndDate: [''],
            Active: [''],
            IsCurrentPeriod: [''],
            StartYear: [''],
            StartMonth: [''],
            CompanyId: [''],
            CreatedOn: [''],
            CreatedBy: [''],
            UpdatedOn: [''],
            UpdatedBy: [''],
            IsActive: [''],
            EntityMessage: ['']
        });
        this.LoadLevelConfigurations();
        this.YearforEdit = ((new Date()).getFullYear()) - 1;
    };
    LevelConfigurationComponent.prototype.LevelConfigurationFilterCriteriaChange = function (value) {
        if (value != '[object Event]')
            this.LevelConfigurationFilter = value;
    };
    LevelConfigurationComponent.prototype.LevelConfigurationSort = function (property) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    };
    ;
    LevelConfigurationComponent.prototype.LoadLevelConfigurations = function () {
        var _this = this;
        debugger;
        this.indLoading = true;
        this._LevelConfigurationService.get(global_1.Global.BASE_LEVELCONFIGURATION_ENDPOINT)
            .subscribe(function (LevelConfigurations) {
            debugger;
            _this.LevelConfigurations = LevelConfigurations;
            //Logic for searching - start
            if (_this.ShowHideSearch) {
                _this.strsearchPeriodName = document.getElementById("searchPeriodName").value;
                if (_this.strsearchPeriodName != '') {
                    _this.strsearchPeriodName = _this.strsearchPeriodName.toLocaleLowerCase();
                    _this.LevelConfigurations = _this.LevelConfigurations.filter(function (x) { return x.PeriodName != null && x.PeriodName.toLocaleLowerCase().indexOf(_this.strsearchPeriodName) != -1; });
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
    LevelConfigurationComponent.prototype.FillYear = function () {
        this.ArrayYear = [];
        var displayDate = (new Date()).getFullYear();
        var EndDate = displayDate;
        var j = 6;
        for (var i = 0; i < j; i++) {
            this.ArrayYear.push(EndDate);
            EndDate = EndDate + 1;
        }
    };
    LevelConfigurationComponent.prototype.addLevelConfiguration = function () {
        this.FillYear();
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New LevelConfiguration";
        this.modalBtnTitle = "Add";
        this.LevelConfigurationFrm.reset();
        this.modal.open();
    };
    LevelConfigurationComponent.prototype.editLevelConfiguration = function (id) {
        debugger;
        this.FillYear();
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit LevelConfiguration";
        this.modalBtnTitle = "Update";
        this.LevelConfiguration = this.LevelConfigurations.filter(function (x) { return x.Id == id; })[0];
        this.LevelConfigurationFrm.setValue(this.LevelConfiguration);
        this.modal.open();
    };
    LevelConfigurationComponent.prototype.deleteLevelConfiguration = function (id, status) {
        this.FillYear();
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
        this.LevelConfiguration = this.LevelConfigurations.filter(function (x) { return x.Id == id; })[0];
        this.LevelConfigurationFrm.setValue(this.LevelConfiguration);
        this.modal.open();
    };
    LevelConfigurationComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.LevelConfigurationFrm.enable() : this.LevelConfigurationFrm.disable();
    };
    LevelConfigurationComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    LevelConfigurationComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.LevelConfigurations);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    LevelConfigurationComponent.prototype.ShowHideSearchControls = function () {
        this.ShowHideSearch = !this.ShowHideSearch;
    };
    LevelConfigurationComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._LevelConfigurationService.post(global_1.Global.BASE_LEVELCONFIGURATION_ENDPOINT, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadLevelConfigurations();
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
                this._LevelConfigurationService.put(global_1.Global.BASE_LEVELCONFIGURATION_ENDPOINT, formData._value.Id, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadLevelConfigurations();
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
                this._LevelConfigurationService.delete(global_1.Global.BASE_LEVELCONFIGURATION_ENDPOINT, formData._value.Id).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = "LevelConfiguration status changed successfully.";
                        _this.LoadLevelConfigurations();
                    }
                    else {
                        _this.msg = "Error has occurred while changing status of existing LevelConfiguration!";
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
    ], LevelConfigurationComponent.prototype, "modal", void 0);
    LevelConfigurationComponent = __decorate([
        core_1.Component({
            providers: [LevelConfiguration_service_1.LevelConfigurationService],
            templateUrl: 'app/Components/Masters/EmployeeLevels/LevelConfiguration.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, LevelConfiguration_service_1.LevelConfigurationService, pager_index_1.PagerService])
    ], LevelConfigurationComponent);
    return LevelConfigurationComponent;
}());
exports.LevelConfigurationComponent = LevelConfigurationComponent;
