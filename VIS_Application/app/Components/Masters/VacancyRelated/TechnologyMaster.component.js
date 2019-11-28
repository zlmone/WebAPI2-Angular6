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
var TechnologyMaster_service_1 = require("../../../service/Masters/VacancyRelated/TechnologyMaster.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../../../Shared/enum");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../../Shared/global");
var pager_index_1 = require("../../../Shared/pager.index");
var TechnologyMasterComponent = (function () {
    function TechnologyMasterComponent(fb, _TechnologyMasterService, pagerService) {
        this.fb = fb;
        this._TechnologyMasterService = _TechnologyMasterService;
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
    TechnologyMasterComponent.prototype.ngOnInit = function () {
        this.TechnologyMasterFrm = this.fb.group({
            CompanyId: [''],
            Id: [''],
            TechnologyName: ['', forms_1.Validators.required],
            Remarks: ['', forms_1.Validators.required],
            Major: [''],
            CreatedOn: [''],
            CreatedBy: [''],
            UpdatedOn: [''],
            UpdatedBy: [''],
            IsActive: [''],
            EntityMessage: ['']
        });
        this.LoadTechnologyMasters();
    };
    TechnologyMasterComponent.prototype.TechnologyMasterFilterCriteriaChange = function (value) {
        if (value != '[object Event]')
            this.TechnologyMasterFilter = value;
    };
    TechnologyMasterComponent.prototype.TechnologyMasterSort = function (property) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    };
    ;
    TechnologyMasterComponent.prototype.LoadTechnologyMasters = function () {
        var _this = this;
        this.indLoading = true;
        this._TechnologyMasterService.get(global_1.Global.BASE_TECHNOLOGYMASTER_ENDPOINT)
            .subscribe(function (TechnologyMasters) {
            _this.TechnologyMasters = TechnologyMasters;
            _this.indLoading = false;
            // set items to json response
            //Logic for searching - start
            if (_this.ShowHideSearch) {
                _this.strSearchTechnologyName = document.getElementById("searchTechnologyName").value;
                if (_this.strSearchTechnologyName != '') {
                    _this.strSearchTechnologyName = _this.strSearchTechnologyName.toLocaleLowerCase();
                    _this.TechnologyMasters = _this.TechnologyMasters.filter(function (x) { return x.TechnologyName != null && x.TechnologyName.toLocaleLowerCase().indexOf(_this.strSearchTechnologyName) != -1; });
                }
                _this.strSearchRemarks = document.getElementById("searchRemarks").value;
                if (_this.strSearchRemarks != '') {
                    _this.strSearchRemarks = _this.strSearchRemarks.toLocaleLowerCase();
                    _this.TechnologyMasters = _this.TechnologyMasters.filter(function (x) { return x.Remarks != null && x.Remarks.toLocaleLowerCase().indexOf(_this.strSearchRemarks) != -1; });
                }
                //this.strSearchMajor = (<HTMLInputElement>document.getElementById("searchSub_Unit")).value;
                //if (this.strSearchMajor != '') {
                //    this.strSearchMajor = this.strSearchMajor.toLocaleLowerCase();
                //    this.TechnologyMasters = this.TechnologyMasters.filter(
                //        x => x.Major != null && x.Major.toLocaleLowerCase().indexOf(this.strSearchMajor) != -1);
                //}
            }
            //Logic for searching - End
            // initialize to page 1
            _this.JumpOnPage(1);
            _this.pager = _this.pagerService.pager;
            _this.pagedItems = _this.pagerService.pagedItems;
        }
        //,error => this.msg = <any>error
        );
    };
    TechnologyMasterComponent.prototype.addTechnologyMaster = function () {
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New TechnologyMaster";
        this.modalBtnTitle = "Add";
        this.TechnologyMasterFrm.reset();
        this.modal.open();
    };
    TechnologyMasterComponent.prototype.editTechnologyMaster = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit TechnologyMaster";
        this.modalBtnTitle = "Update";
        this.TechnologyMaster = this.TechnologyMasters.filter(function (x) { return x.Id == id; })[0];
        this.TechnologyMasterFrm.setValue(this.TechnologyMaster);
        this.modal.open();
    };
    TechnologyMasterComponent.prototype.deleteTechnologyMaster = function (id, status) {
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
        this.TechnologyMaster = this.TechnologyMasters.filter(function (x) { return x.Id == id; })[0];
        this.TechnologyMasterFrm.setValue(this.TechnologyMaster);
        this.modal.open();
    };
    TechnologyMasterComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.TechnologyMasterFrm.enable() : this.TechnologyMasterFrm.disable();
    };
    TechnologyMasterComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    TechnologyMasterComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.TechnologyMasters);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    TechnologyMasterComponent.prototype.ShowHideSearchControls = function () {
        this.ShowHideSearch = !this.ShowHideSearch;
    };
    TechnologyMasterComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._TechnologyMasterService.post(global_1.Global.BASE_TECHNOLOGYMASTER_ENDPOINT, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadTechnologyMasters();
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
                this._TechnologyMasterService.put(global_1.Global.BASE_TECHNOLOGYMASTER_ENDPOINT, formData._value.Id, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadTechnologyMasters();
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
                this._TechnologyMasterService.delete(global_1.Global.BASE_TECHNOLOGYMASTER_ENDPOINT, formData._value.Id).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = "TechnologyMaster status changed successfully.";
                        _this.LoadTechnologyMasters();
                    }
                    else {
                        _this.msg = "Error has occurred while changing status of existing TechnologyMaster!";
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
    ], TechnologyMasterComponent.prototype, "modal", void 0);
    TechnologyMasterComponent = __decorate([
        core_1.Component({
            providers: [TechnologyMaster_service_1.TechnologyMasterService],
            templateUrl: 'app/Components/Masters/VacancyRelated/TechnologyMaster.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, TechnologyMaster_service_1.TechnologyMasterService, pager_index_1.PagerService])
    ], TechnologyMasterComponent);
    return TechnologyMasterComponent;
}());
exports.TechnologyMasterComponent = TechnologyMasterComponent;
