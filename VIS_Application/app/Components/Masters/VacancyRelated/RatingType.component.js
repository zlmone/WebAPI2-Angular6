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
var RatingType_service_1 = require("../../../service/Masters/VacancyRelated/RatingType.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../../../Shared/enum");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../../Shared/global");
//import * as _ from 'underscore';
var pager_index_1 = require("../../../Shared/pager.index");
var RatingTypeComponent = (function () {
    function RatingTypeComponent(fb, _RatingTypeService, pagerService) {
        this.fb = fb;
        this._RatingTypeService = _RatingTypeService;
        this.pagerService = pagerService;
        this.indLoading = false;
        this.isDesc = false;
        this.column = 'TypeName';
        // pager object
        this.pager = {};
        this.CurrentRecordsPerPage = 10;
        this.ShowHideSearch = false;
    }
    RatingTypeComponent.prototype.ngOnInit = function () {
        this.RatingTypeFrm = this.fb.group({
            CompanyId: [''],
            Id: [''],
            TypeName: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(100)])],
            IsActive: [''],
            CreatedOn: [''],
            UpdatedOn: [''],
            CreatedBy: [''],
            UpdatedBy: [''],
            EntityMessage: [''],
        });
        this.LoadRatingType();
    };
    RatingTypeComponent.prototype.LookupTypeFilterCriteriaChange = function (value) {
        if (value != '[object Event]')
            this.RatingTypeFilter = value;
    };
    RatingTypeComponent.prototype.RatingTypeSort = function (property) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    };
    ;
    RatingTypeComponent.prototype.LoadRatingType = function () {
        var _this = this;
        this.indLoading = true;
        this._RatingTypeService.get(global_1.Global.BASE_RATINGTYPE_ENDPOINT)
            .subscribe(function (lookuptypes) {
            _this.RatingTypes = lookuptypes;
            //Logic for searching - start
            if (_this.ShowHideSearch) {
                _this.strSearchTypeName = document.getElementById("searchTypeName").value;
                if (_this.strSearchTypeName != '') {
                    _this.strSearchTypeName = _this.strSearchTypeName.toLocaleLowerCase();
                    _this.RatingTypes = _this.RatingTypes.filter(function (x) { return x.TypeName != null && x.TypeName.toLocaleLowerCase().indexOf(_this.strSearchTypeName) != -1; });
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
    RatingTypeComponent.prototype.AddRatingType = function () {
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New RatingType";
        this.modalBtnTitle = "Add";
        this.RatingTypeFrm.reset();
        this.modal.open();
    };
    RatingTypeComponent.prototype.EditRatingType = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit RatingType";
        this.modalBtnTitle = "Update";
        this.RatingType = this.RatingTypes.filter(function (x) { return x.Id == id; })[0];
        this.RatingTypeFrm.setValue(this.RatingType);
        this.modal.open();
    };
    RatingTypeComponent.prototype.DeleteRatingType = function (id, status) {
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
        this.RatingType = this.RatingTypes.filter(function (x) { return x.Id == id; })[0];
        this.RatingTypeFrm.setValue(this.RatingType);
        this.modal.open();
    };
    RatingTypeComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.RatingTypeFrm.enable() : this.RatingTypeFrm.disable();
    };
    RatingTypeComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    RatingTypeComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.RatingTypes);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    RatingTypeComponent.prototype.ShowHideSearchControls = function () {
        this.ShowHideSearch = !this.ShowHideSearch;
    };
    RatingTypeComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        debugger;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._RatingTypeService.post(global_1.Global.BASE_RATINGTYPE_ENDPOINT, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadRatingType();
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
                this._RatingTypeService.put(global_1.Global.BASE_RATINGTYPE_ENDPOINT, formData._value.Id, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadRatingType();
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
                this._RatingTypeService.delete(global_1.Global.BASE_RATINGTYPE_ENDPOINT, formData._value.Id).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = "RatingType status changed successfully.";
                        _this.LoadRatingType();
                    }
                    else {
                        _this.msg = "Error has occurred while changing status of existing RatingType!";
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
    ], RatingTypeComponent.prototype, "modal", void 0);
    RatingTypeComponent = __decorate([
        core_1.Component({
            providers: [RatingType_service_1.RatingTypeService],
            templateUrl: 'app/Components/Masters/VacancyRelated/RatingType.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, RatingType_service_1.RatingTypeService, pager_index_1.PagerService])
    ], RatingTypeComponent);
    return RatingTypeComponent;
}());
exports.RatingTypeComponent = RatingTypeComponent;
