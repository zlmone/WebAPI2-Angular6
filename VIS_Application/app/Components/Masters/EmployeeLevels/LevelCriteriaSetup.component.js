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
var LevelCriteriaSetup_service_1 = require("../../../service/Masters/EmployeeLevels/LevelCriteriaSetup.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../../../Shared/enum");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../../Shared/global");
var pager_index_1 = require("../../../Shared/pager.index");
var LevelCriteriaSetupComponent = (function () {
    function LevelCriteriaSetupComponent(fb, _LevelCriteriaSetupService, pagerService) {
        this.fb = fb;
        this._LevelCriteriaSetupService = _LevelCriteriaSetupService;
        this.pagerService = pagerService;
        this.indLoading = false;
        this.isDesc = false;
        this.column = 'Full_Name';
        // pager object
        this.pager = {};
        this.CurrentRecordsPerPage = 10;
        //Variables for Filter
        this.ShowHideSearch = false;
        this.ArbCriteriaType = "Automatic";
        this.ArbManualType = "PerformanceBased";
        this.ArbSubType = "Range";
    }
    LevelCriteriaSetupComponent.prototype.ngOnInit = function () {
        this.LevelCriteriaSetup = ({
            Id: 0,
            IsAutomatic: false,
            IsRange: false,
            IsRepeated: false,
            IsOnce: false,
            IsPerformanceBased: false,
            IsEnable: false,
            ArbSubType: "",
            ArbCriteriaType: "",
            ArbIsProgressive: "",
            ArbCascading: "",
            ArbEnable: "",
            CriteriaID: 0,
            Criteria: '',
            Category: '',
            AIsRange: "",
            FromLimit: 0,
            ToLimit: 0,
            AIsRepeated: "",
            Units: 0,
            AIsOnce: "",
            //   rbPerformanceBasedType: false,
            ArbManualType: "",
            IsPercentage: false,
            Point: 0,
            Active: false,
            IsProgressive: false,
            ProgressiveDays: 0,
            ProgressivePoints: 0,
            //CalculatedOn: 0,
            // CompanyId: 0,
            CreatedOn: null,
            CreatedBy: 0,
            UpdatedOn: null,
            UpdatedBy: 0,
            IsActive: false,
            dtFromDate: null,
            dtToDate: null,
            Name: '',
            CriteriaType: '',
            CalculatedOn: '',
            SelectPoint: 0,
            EntityMessage: ''
        });
        this.LoadLevelCriteriaSetups();
        this.LoadCriteria();
        this.LoadCalculatedOn();
        this.LoadCategory();
    };
    LevelCriteriaSetupComponent.prototype.ClearModel = function () {
        this.LevelCriteriaSetup = ({
            Id: 0,
            IsAutomatic: false,
            IsRange: false,
            IsRepeated: false,
            IsOnce: false,
            IsPerformanceBased: false,
            IsEnable: false,
            ArbSubType: "",
            ArbCriteriaType: "",
            ArbIsProgressive: "",
            ArbCascading: "",
            ArbEnable: "",
            CriteriaID: 0,
            Criteria: '',
            Category: '',
            AIsRange: "",
            FromLimit: 0,
            ToLimit: 0,
            AIsRepeated: "",
            Units: 0,
            AIsOnce: "",
            //   rbPerformanceBasedType: false,
            ArbManualType: "",
            IsPercentage: false,
            Point: 0,
            Active: false,
            IsProgressive: false,
            ProgressiveDays: 0,
            ProgressivePoints: 0,
            //CalculatedOn: 0,
            // CompanyId: 0,
            CreatedOn: null,
            CreatedBy: 0,
            UpdatedOn: null,
            UpdatedBy: 0,
            IsActive: false,
            dtFromDate: null,
            dtToDate: null,
            Name: '',
            CriteriaType: '',
            CalculatedOn: '',
            SelectPoint: 0,
            EntityMessage: ''
        });
    };
    LevelCriteriaSetupComponent.prototype.LoadCriteria = function () {
        var _this = this;
        this.indLoading = true;
        this._LevelCriteriaSetupService.getCriteria(global_1.Global.BASE_LEVELCRITERIASETUP_ENDPOINT)
            .subscribe(function (DATA) {
            _this.LevelCriteriaSetupForDll = DATA;
        }
        //,error => this.msg = <any>error
        );
    };
    LevelCriteriaSetupComponent.prototype.LoadCalculatedOn = function () {
        var _this = this;
        this.indLoading = true;
        this._LevelCriteriaSetupService.getCalculatedOn(global_1.Global.BASE_LEVELCRITERIASETUP_ENDPOINT)
            .subscribe(function (DATA) {
            _this.CalculatedOnDllData = DATA;
        }
        //,error => this.msg = <any>error
        );
    };
    LevelCriteriaSetupComponent.prototype.LoadCategory = function () {
        var _this = this;
        this.indLoading = true;
        this._LevelCriteriaSetupService.getCategory(global_1.Global.BASE_LEVELCRITERIASETUP_ENDPOINT)
            .subscribe(function (DATA) {
            _this.CategoryDllData = DATA;
        }
        //,error => this.msg = <any>error
        );
    };
    LevelCriteriaSetupComponent.prototype.LevelCriteriaSetupFilterCriteriaChange = function (value) {
        if (value != '[object Event]')
            this.LevelCriteriaSetupFilter = value;
    };
    LevelCriteriaSetupComponent.prototype.LevelCriteriaSetupSort = function (property) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    };
    ;
    LevelCriteriaSetupComponent.prototype.LoadLevelCriteriaSetups = function () {
        var _this = this;
        this.indLoading = true;
        this._LevelCriteriaSetupService.get(global_1.Global.BASE_LEVELCRITERIASETUP_ENDPOINT)
            .subscribe(function (LevelCriteriaSetups) {
            debugger;
            _this.LevelCriteriaSetups = LevelCriteriaSetups;
            //Logic for searching - start
            if (_this.ShowHideSearch) {
                _this.strSearchName = document.getElementById("searchName").value;
                if (_this.strSearchName != '') {
                    _this.strSearchName = _this.strSearchName.toLocaleLowerCase();
                    _this.LevelCriteriaSetups = _this.LevelCriteriaSetups.filter(function (x) { return x.Name != null && x.Name.toLocaleLowerCase().indexOf(_this.strSearchName) != -1; });
                }
                _this.strSearchType = document.getElementById("searchType").value;
                if (_this.strSearchType != '') {
                    _this.strSearchType = _this.strSearchType.toLocaleLowerCase();
                    _this.LevelCriteriaSetups = _this.LevelCriteriaSetups.filter(function (x) { return x.CriteriaType != null && x.CriteriaType.toLocaleLowerCase().indexOf(_this.strSearchType) != -1; });
                }
                _this.strCalculatedOn = document.getElementById("searchCalculatedOn").value;
                if (_this.strCalculatedOn != '') {
                    _this.strCalculatedOn = _this.strCalculatedOn.toLocaleLowerCase();
                    _this.LevelCriteriaSetups = _this.LevelCriteriaSetups.filter(function (x) { return x.CalculatedOn != null && x.CalculatedOn.toLocaleLowerCase().indexOf(_this.strCalculatedOn) != -1; });
                }
                //this.strPoints = (<HTMLInputElement>document.getElementById("searchPoints")).value;
                //if (this.strPoints != '') {
                //    this.strPoints = this.strPoints.toLocaleLowerCase();
                //    this.LevelCriteriaSetups = this.LevelCriteriaSetups.filter(
                //        x => x.Point != null && x.Point.toLocaleLowerCase().indexOf(this.strPoints) != -1);
                //}
            }
            //Logic for searching - End
            _this.indLoading = false;
            // initialize to page 1
            _this.JumpOnPage(1);
        }
        //,error => this.msg = <any>error
        );
    };
    LevelCriteriaSetupComponent.prototype.addLevelCriteriaSetup = function () {
        this.EditData = false;
        this.ClearModel();
        this.dbops = enum_1.DBOperation.create;
        //this.SetControlsState(true);
        this.modalTitle = "Add New Criteria";
        this.modalBtnTitle = "Add";
        // this.LevelCriteriaSetup.reset();
        this.modal.open();
    };
    LevelCriteriaSetupComponent.prototype.editLevelCriteriaSetup = function (id) {
        this.ClearModel();
        this.EditData = true;
        this.dbops = enum_1.DBOperation.update;
        this.modalTitle = "Edit Criteria";
        this.modalBtnTitle = "Update";
        this.LevelCriteriaSetup = this.LevelCriteriaSetups.filter(function (x) { return x.Id == id; })[0];
        this.ArbEnable = "Yes";
        if (this.LevelCriteriaSetup.IsAutomatic) {
            this.ArbCriteriaType = "Automatic";
            if (this.LevelCriteriaSetup.IsRange) {
                this.ArbSubType = "Range";
            }
            else if (this.LevelCriteriaSetup.IsRepeated) {
                this.ArbSubType = "Repeated";
            }
            else {
                this.ArbSubType = "once";
            }
        }
        else {
            this.ArbCriteriaType = "Manual";
        }
        //cascadding
        if (this.LevelCriteriaSetup.IsProgressive) {
            this.ArbIsProgressive = "Yes";
        }
        else {
            this.ArbIsProgressive = "No";
        }
        // this.LevelCriteriaSetupFrm.setValue(this.LevelCriteriaSetup);
        this.modal.open();
    };
    LevelCriteriaSetupComponent.prototype.deleteLevelCriteriaSetup = function (id, status) {
        this.dbops = enum_1.DBOperation.delete;
        // this.SetControlsState(false);
        if (status == true) {
            this.modalTitle = "Confirm to Delete?";
            this.modalBtnTitle = "Delete";
        }
        else {
            this.modalTitle = "Confirm to Undo Delete?";
            this.modalBtnTitle = "Undo Delete";
        }
        debugger;
        this.LevelCriteriaSetup = this.LevelCriteriaSetups.filter(function (x) { return x.Id == id; })[0];
        // this.LevelCriteriaSetupFrm.setValue(this.LevelCriteriaSetup);
        this.modal.open();
    };
    //SetControlsState(isEnable: boolean) {
    //    isEnable ? this.LevelCriteriaSetupFrm.enable() : this.LevelCriteriaSetupFrm.disable();
    //}
    LevelCriteriaSetupComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    LevelCriteriaSetupComponent.prototype.ChangeCriteria = function (CriteriaId) {
        this.LevelCriteriaSetupFilterDDL = this.LevelCriteriaSetups.filter(function (x) { return x.Id == CriteriaId; })[0];
        //this.SelectedCalculatedOn = this.LevelCriteriaSetupFilterDDL.CalculatedOn
        this.LevelCriteriaSetup.CalculatedOn = this.LevelCriteriaSetupFilterDDL.CalculatedOn;
    };
    LevelCriteriaSetupComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.LevelCriteriaSetups);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    LevelCriteriaSetupComponent.prototype.ShowHideSearchControls = function () {
        this.ShowHideSearch = !this.ShowHideSearch;
    };
    LevelCriteriaSetupComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        debugger;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                formData.CalculatedOn = this.LevelCriteriaSetup.CalculatedOn;
                this._LevelCriteriaSetupService.post(global_1.Global.BASE_LEVELCRITERIASETUP_ENDPOINT, formData).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadLevelCriteriaSetups();
                        _this.modal.dismiss();
                        _this.ClearModel();
                    }
                    else {
                        alert(data);
                    }
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.update:
                formData.Id = this.LevelCriteriaSetup.Id;
                formData.CriteriaID = this.LevelCriteriaSetup.CriteriaID;
                this._LevelCriteriaSetupService.put(global_1.Global.BASE_LEVELCRITERIASETUP_ENDPOINT, formData.Id, formData).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadLevelCriteriaSetups();
                        _this.modal.dismiss();
                        _this.ClearModel();
                        _this.EditData = false;
                    }
                    else {
                        alert(data);
                    }
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.delete:
                debugger;
                this._LevelCriteriaSetupService.delete(global_1.Global.BASE_LEVELCRITERIASETUP_ENDPOINT, this.LevelCriteriaSetup.Id).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = "LevelCriteriaSetup status changed successfully.";
                        _this.LoadLevelCriteriaSetups();
                    }
                    else {
                        _this.msg = "Error has occurred while changing status of existing LevelCriteriaSetup!";
                    }
                    _this.modal.dismiss();
                    _this.ClearModel();
                }, function (error) {
                    _this.msg = error;
                });
                break;
        }
    };
    __decorate([
        core_1.ViewChild('modal'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], LevelCriteriaSetupComponent.prototype, "modal", void 0);
    LevelCriteriaSetupComponent = __decorate([
        core_1.Component({
            selector: "level-criteria-setup",
            providers: [LevelCriteriaSetup_service_1.LevelCriteriaSetupService],
            templateUrl: 'app/Components/Masters/EmployeeLevels/LevelCriteriaSetup.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, LevelCriteriaSetup_service_1.LevelCriteriaSetupService, pager_index_1.PagerService])
    ], LevelCriteriaSetupComponent);
    return LevelCriteriaSetupComponent;
}());
exports.LevelCriteriaSetupComponent = LevelCriteriaSetupComponent;
