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
var levels_service_1 = require("../../../service/Masters/EmployeeLevels/levels.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../../../Shared/enum");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../../Shared/global");
var pager_index_1 = require("../../../Shared/pager.index");
var LevelsComponent = (function () {
    function LevelsComponent(fb, _levelsService, pagerService) {
        this.fb = fb;
        this._levelsService = _levelsService;
        this.pagerService = pagerService;
        this.indLoading = false;
        this.isDesc = false;
        this.column = 'LevelName';
        // pager object
        this.pager = {};
        this.CurrentRecordsPerPage = 10;
        //Variables for Filter
        this.ShowHideSearch = false;
    }
    LevelsComponent.prototype.ngOnInit = function () {
        this.levelsFrm = this.fb.group({
            CompanyId: [''],
            Id: [''],
            LevelNumber: ['', forms_1.Validators.compose([forms_1.Validators.required])],
            LevelName: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(50)])],
            LevelIcon: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(50)])],
            StartPoint: ['', forms_1.Validators.compose([forms_1.Validators.required])],
            EndPoint: ['', forms_1.Validators.compose([forms_1.Validators.required])],
            CreatedOn: [''],
            CreatedBy: [''],
            UpdatedOn: [''],
            UpdatedBy: [''],
            IsActive: [''],
            EntityMessage: ['']
        });
        this.LoadLevelss();
    };
    LevelsComponent.prototype.LevelsSearchCriteriaChange = function (value) {
        if (value != '[object Event]')
            this.LevelsFilter = value;
    };
    LevelsComponent.prototype.LevelsSort = function (property) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    };
    LevelsComponent.prototype.ShowHideSearchControls = function () {
        this.ShowHideSearch = !this.ShowHideSearch;
    };
    LevelsComponent.prototype.LoadLevelss = function () {
        var _this = this;
        this.indLoading = true;
        this._levelsService.get(global_1.Global.BASE_LEVELS_ENDPOINT)
            .subscribe(function (levelss) {
            _this.levelss = levelss;
            //Logic for searching - start
            if (_this.ShowHideSearch) {
                //if (this.strSearchLevelNumber > 0 ) {
                //    this.strSearchLevelNumber = this.strSearchLevelNumber;
                //    this.levelss = this.levelss.filter(
                //        x => x.LevelNumber != null && x.LevelNumber>=this.strSearchLevelNumber);
                //}
                _this.strSearchLevelName = document.getElementById("searchLevelName").value;
                if (_this.strSearchLevelName != '') {
                    _this.strSearchLevelName = _this.strSearchLevelName.toLocaleLowerCase();
                    _this.levelss = _this.levelss.filter(function (x) { return x.LevelName != null && x.LevelName.toLocaleLowerCase().indexOf(_this.strSearchLevelName) != -1; });
                }
                //this.strSearchStartPoint = (<HTMLInputElement>document.getElementById("searchStartPoint")).value;
                //if (this.strSearchStartPoint > 0) {
                //    this.strSearchStartPoint = this.strSearchStartPoint;
                //    this.levelss = this.levelss.filter(
                //        x => x.StartPoint != null && x.StartPoint >= this.strSearchStartPoint);
                //}
                //this.strSearchEndPoint = (<HTMLInputElement>document.getElementById("searchEndPoint")).value;
                //if (this.strSearchEndPoint > 0) {
                //    this.strSearchEndPoint = this.strSearchEndPoint;
                //    this.levelss = this.levelss.filter(
                //        x => x.EndPoint != null && x.EndPoint<= this.strSearchEndPoint);
                //}
            }
            _this.indLoading = false;
            // initialize to page 1
            _this.JumpOnPage(1);
        }
        //,error => this.msg = <any>error
        );
    };
    LevelsComponent.prototype.addLevels = function () {
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New Levels";
        this.modalBtnTitle = "Add";
        this.levelsFrm.reset();
        this.modal.open();
    };
    LevelsComponent.prototype.editLevels = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit Levels";
        this.modalBtnTitle = "Update";
        this.levels = this.levelss.filter(function (x) { return x.Id == id; })[0];
        this.levelsFrm.setValue(this.levels);
        this.modal.open();
    };
    LevelsComponent.prototype.deleteLevels = function (id, status) {
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
        this.levels = this.levelss.filter(function (x) { return x.Id == id; })[0];
        this.levelsFrm.setValue(this.levels);
        this.modal.open();
    };
    LevelsComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.levelsFrm.enable() : this.levelsFrm.disable();
    };
    LevelsComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    LevelsComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.levelss);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    LevelsComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._levelsService.post(global_1.Global.BASE_LEVELS_ENDPOINT, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadLevelss();
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
                this._levelsService.put(global_1.Global.BASE_LEVELS_ENDPOINT, formData._value.Id, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadLevelss();
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
                this._levelsService.delete(global_1.Global.BASE_LEVELS_ENDPOINT, formData._value.Id).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = "Levels status changed successfully.";
                        _this.LoadLevelss();
                    }
                    else {
                        _this.msg = "Error has occurred while changing status of existing levels!";
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
    ], LevelsComponent.prototype, "modal", void 0);
    LevelsComponent = __decorate([
        core_1.Component({
            selector: "page-levels",
            providers: [levels_service_1.LevelsService],
            templateUrl: 'app/Components/Masters/EmployeeLevels/levels.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, levels_service_1.LevelsService, pager_index_1.PagerService])
    ], LevelsComponent);
    return LevelsComponent;
}());
exports.LevelsComponent = LevelsComponent;
